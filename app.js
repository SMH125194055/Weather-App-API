//jshint esversion:6
const express = require('express');

const https = require('https');

const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {




    res.sendFile(__dirname + "/index.html");

});


app.post("/", function (req, res) {
    console.log(req.body.cityName);
    //res.send("Thanks for responding");
    // res.send("Hello World");
    const query = req.body.cityName;
    const apiKey = "8511a17f6578f8e62697a5ad3579886b";
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" + units;

    https.get(url, function (response) {
        console.log(`STATUS: ${response.statusCode}`);
        // console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
        response.on("data", function (data) {
            // console.log(data);
            const weatherData = JSON.parse(data);
            const Temperature = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const description = weatherData.weather[0].description;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";



            res.write("<h1>The Temperature in" + query + " is " + Temperature + " degree Celcius</h1>");
            res.write(" Description : " + description);
            res.write("<img src=" + imageURL + ">");

            res.send();
            //  console.log(temp);
        })
    });

});



app.listen(3000, function () {
    console.log("Server is starting at port 3000");
});