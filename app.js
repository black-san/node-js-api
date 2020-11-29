const express = require('express');

const app = express();

const PORT = process.env.PORT || 8000;

const datas = require('./datas');
const operator = require('./operator');

app.get('/', function(req, res) {
    res.send('Hello, Express');
});

//  when received request is to query the data
//  you must call API with /api/data?page=<PageNumber>
app.get('/api/data', async function(req, res) {

    //  set the default page number to be 1
    let page = req.query.page || 1;
    let datasObj = await datas.fetch(page);
    res.json(datasObj);
    console.log(datasObj);
});

//  when received request is to find the minimum value of data
app.get('/api/min', function(req, res) {
    operator.min().then(function(resp) {
        console.log('min: ' + resp);
        res.json(resp);
    });
});

//  when received request is to find the maximum value of data
app.get('/api/max', function(req, res) {
    operator.max().then(function(resp) {
        console.log('max: ' + resp);
        res.json(resp);
    });
});

//  when received request is to find the average value of data
app.get('/api/avg', function(req, res) {
    operator.avg().then(function(resp) {
        console.log('avg: ' + resp);
        res.json(resp);
    });
});

app.get('/api/predict', function(req, res) {
    operator.predict(parseInt(req.query.day)).then(function(resp) {
        res.json(resp);
    });
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));