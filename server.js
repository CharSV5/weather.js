
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '3d87e8ea2d82bd71cddd8c67859ce1a9';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `The minimum weather is ${weather.main.temp_min} degrees in ${weather.name} and the maximum is ${weather.main.temp_max}! The humidity is ${weather.main.humidity}!`;
        res.render('index', {weather: weatherText, error: null});

      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
