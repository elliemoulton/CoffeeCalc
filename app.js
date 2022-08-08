const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const app = express();

let brewTypeResult = '';
let cupQuantityResult = '';
let gramsOfWater = 0;
let gramsOfCoffee = 0;
let grindType = '';
let stepOne = '';
let stepTwo = '';
let stepThree = '';
let stepFour = '';
let stepFive = '';

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get('/', function(req, res) {
  res.render("main1");
});

app.post("/", function(req, res) {
  const brewType = req.body.brewType;
  const cupQuantity = req.body.cupQuantity;

  console.log("brew type: " + brewType);
  console.log("cups: " + cupQuantity);

  brewTypeResult = brewType;
  cupQuantityResult = cupQuantity;

  res.redirect("/results");

  switch (brewTypeResult) {
    case 'Filter':
      grindType = 'Medium'
      gramsOfWater = cupQuantity * 14
      gramsOfCoffee = cupQuantity * 235
      stepOne = 'f1';
      stepTwo = 'f2';
      stepThree = 'f3';
      stepFour = 'f4';
      stepFive = 'f5';
      break;
    case 'French Press':
      grindType = 'Coarse'
      gramsOfWater = cupQuantity * 30
      gramsOfCoffee = cupQuantity * 350
      stepOne = 'fpOne';
      stepTwo = 'fp2';
      stepThree = 'fp3';
      stepFour = 'fp4';
      stepFive = 'fp5';
      break;
    case 'V60':
      grindType = 'Medium-Coarse'
      gramsOfWater = cupQuantity * 15
      gramsOfCoffee = cupQuantity * 250
      stepOne = 'v1';
      stepTwo = 'v2';
      stepThree = 'v3';
      stepFour = 'v4';
      stepFive = 'v5';
      break;
    case 'Aeropress':
      grindType = 'Medium-Fine'
      gramsOfWater = cupQuantity * 15
      gramsOfCoffee = cupQuantity * 90
      stepOne = 'a1';
      stepTwo = 'a2';
      stepThree = 'a3';
      stepFour = 'a4';
      stepFive = 'a5';
      break;
    default:
      grindType = 'error'
      gramsOfWater = 'error'
      gramsOfCoffee = 'error'
  }
});

// Make dropdown menu display selected text
// Doesn't work bc node doesn't have DOM
// $(".dropdown-menu li a").click(function(){
//   $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
//   $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
// });




// Separate Page Results
app.get('/results', function(req, res) {
  res.render('results', {
    brewType: brewTypeResult,
    cupQuantity: cupQuantityResult,
    gramsOfWater: gramsOfWater,
    gramsOfCoffee: gramsOfCoffee,
    grindType: grindType,
    stepOne: stepOne,
    stepTwo: stepTwo,
    stepThree: stepThree,
    stepFour: stepFour,
    stepFive: stepFive
  });
});





app.post("/results", function(req, res) {
  res.redirect("/");
});

app.listen(8000, function() {
  console.log("Server is running on port 8000.");
});
