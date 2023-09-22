const express = require('express');
const app = express();
const jsxEngine = require('jsx-view-engine');
const fruits = require('./models/fruits');
const vegetables = require('./models/vegetables');

app.set('view engine', 'jsx');
app.engine('jsx', jsxEngine());

app.get('/fruits/', (req, res) => {
    //res.send(fruits);
    res.render('fruits/Index', { fruits: fruits });
});

app.get('/vegetables/', (req, res) => {
    res.render('vegetables/Index', { vegetables: vegetables });
});


//add show route
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    //res.send(fruits[req.params.indexOfFruitsArray]);
    res.render('fruits/Show', { //second param must be an object
        fruit: fruits[req.params.indexOfFruitsArray] //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
    });
});

// app.get('/vegetables/', (req, res) => {
//     res.render('vegetables/Index', { vegetables: vegetables });
// });

//add show route
app.get('/vegetables/:indexOfVegetablesArray', (req, res) => {
    res.render('vegetables/Show', { //second param must be an object
        vegetable: vegetables[req.params.indexOfVegetablesArray] //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
    });
});
app.listen(3000, () => {
    console.log('listening');
});