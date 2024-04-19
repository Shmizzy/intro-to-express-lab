const express = require('express');
const app = express();


app.listen(3000, () => {
    console.log('We are listening to port 3000');
})


// 1.

app.get('/greetings/:inputName' , (req, res) => {
    res.send(`Hello there, ${req.params.inputName}`)
});


// 2.

app.get('/roll/:numberP' , (req, res) => {
    let inputNumber = parseInt(req.params.numberP)
    let randomNumber = Math.floor(Math.random() * inputNumber);
    if(Number.isInteger(inputNumber)) res.send(`You rolled a ${randomNumber}`);
    else res.send('You must specify a number');
});


// 3.

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:indexNum' , (req, res) => {
    let index = parseInt(req.params.indexNum);
    if(index < collectibles.length && index >= 0){
        res.send(`So, you want the ${collectibles[index].name}? For ${collectibles[index].price} it can be yours!`);
    }else{
        res.send('This item is not yet in stock. Check back soon!');
    }

});


// 4.

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes' , (req, res) => {
    let minPrice = (parseInt(req.query.min) || 0);
    let maxPrice = (parseInt(req.query.max) || Infinity);
    let type = req.query.type;
    let filteredArr = [];
    
    for(let i = 0; i < shoes.length; i++){
        var currentShoe = shoes[i];
        if((currentShoe.price >= minPrice && currentShoe.price <= maxPrice) && (type === undefined || type === currentShoe.type)) {filteredArr.push(currentShoe)};
    }

    if(filteredArr.length < 1){
        res.send(shoes.map(element => 
            `<p>${element.name} Type:${element.type}, Price: $${element.price} </p>`
        ).join(''));
    }else {  
        res.send(filteredArr.map(element => 
            `<p>${element.name} Type:${element.type}, Price: $${element.price} </p>`
        ).join(''));
    }
});

// Needs to handle if there are query inputs and no matches found.