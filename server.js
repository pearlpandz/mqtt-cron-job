const express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    mongoose = require('mongoose'),
    cors = require('cors'),
    CONFIG = require('./config/config'),
    bodyParser = require('body-parser'),
    path = require('path'),
    routes = require('./routes/index')

// mongodb connection
mongoose.set('useCreateIndex', true);
mongoose.connect(CONFIG.DB_URL, { useNewUrlParser: true }).then(() => {
    console.log(`MongoDB connected port with ${CONFIG.mongoport}`);
    console.log(`MongoDB connected db with ${CONFIG.DB_URL}`);
}).catch((err) => {
    console.log('MongoDB err ', err);
});


// NPM Packages use configuration
app.use(cors());

app.use(bodyParser.json());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));

app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 500000 }));

app.use(function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // console.log('fullUrl = ', fullUrl)
    next();
});
app.use(routes);


// server connection
try {
    server.listen(CONFIG.port, () => {
        console.log(`Server connected port with ${CONFIG.port}`)
    });
} catch (e) {
    console.log(e)
}