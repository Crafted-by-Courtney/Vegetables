const express = require("express");
const app = express();
const jsxEngine = require("jsx-view-engine");
// IMPORT DOTENV MODULE TO CONNECT TO YOUR ENV FILE
require("dotenv").config();
const Fruit = require("./models/fruits");
const Vegetable = require("./models/vegetables");

const methodOverride = require('method-override');

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

// index, new, delete. Update, create, edit. And show.

app.get('/fruits/seed', async (req, res)=>{
    try {
        await Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:true
        }
    ])
        res.redirect('/fruits')
    } catch (error) {
        console.error(error)
      }
});

app.get('/vegetables/seed', async (req, res)=>{
    try {
        await Vegetable.create([
        {
            name:'eggplant',
            color:'purple',
            readyToEat:true
        },
        {
            name:'cabbage',
            color:'purple',
            readyToEat:false
        },
        {
            name:'cauliflower',
            color:'white',
            readyToEat:true
        }
    ])
        res.redirect('/vegetables')
    } catch (error) {
        console.error(error)
      }
});

app.get("/fruits/", async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.render("fruits/Index", {fruits: fruits});
  } catch(error) {
    console.error(error);
  }
});

app.get("/vegetables/", async (req, res) => {
    try {
    const vegetables = await Vegetable.find();
    res.render("vegetables/Index", { vegetables: vegetables });
    } catch(error) {
        console.error(error);
    }
});

// new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

// delete
app.delete('/fruits/:id', async (req, res)=>{
    try {
        await Fruit.findByIdAndRemove(req.params.id)
        res.redirect('/fruits')//redirect back to fruits index
    } catch(error) {
        console.error(error);
      }
    })

    app.delete('/vegetables/:id', async (req, res)=>{
        try {
            await Vegetable.findByIdAndRemove(req.params.id)
            res.redirect('/vegetables')//redirect back to fruits index
        } catch(error) {
            console.error(error);
          }
        })

// update
app.put("/fruits/:id",  async (req, res) => {
    try {
      if (req.body.readyToEat === "on") {
        //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true //do some data correction
      } else {
        //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false //do some data correction
      }
      // fruits.push(req.body);
       await Fruit.findByIdAndUpdate(req.params.id, req.body)
      res.redirect("/fruits")
      } catch(error) {
      console.log(error);
    }
  })

  app.put("/vegetables/:id",  async (req, res) => {
    try {
      if (req.body.readyToEat === "on") {
        req.body.readyToEat = true
      } else {
        req.body.readyToEat = false
      }
       await Vegetable.findByIdAndUpdate(req.params.id, req.body)
      res.redirect("/vegetables")
      } catch(error) {
      console.log(error);
    }
  })

// create
app.post("/fruits",  async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }
    // fruits.push(req.body);
     await Fruit.create(req.body);
    res.redirect("/fruits");
  } catch(error) {
    console.log(error);
  }
});

app.post("/vegetables/", async (req, res) => {
    try {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  await Vegetable.create(req.body);
  res.redirect('/vegetables');
} catch(error) {
    console.log(error);
}
});

//edit
app.get('/fruits/:id/edit', async (req, res)=>{
    try {
        const foundFruit = await Fruit.findById(req.params.id)
        res.render('fruits/Edit', 
        {fruit: foundFruit})
    } catch(error) {
        console.log(error)
      }
})

app.get('/vegetables/:id/edit', async (req, res)=>{
    try {
        const foundVegetable = await Vegetable.findById(req.params.id)
        res.render('vegetables/Edit', 
        {vegetable: foundVegetable})
    } catch(error) {
        console.log(error)
      }
})

//add show route
app.get("/fruits/:id", async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    res.render("fruits/Show", {fruit: fruit})
  } catch(error) {
    console.log(error)
  }
});

app.get("/vegetables/:id", async (req, res) => {
    try {
        const vegetable = await Vegetable.findById(req.params.id);
  res.render("vegetables/Show", {vegetable: vegetable})
    } catch(error) {
        console.log(error)
    }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening");
});