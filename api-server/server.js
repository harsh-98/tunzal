import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import mongo from 'mongodb';
import path from 'path';
import mongoose from 'mongoose';
import fs from 'fs';

require('dotenv').config()
import https from 'https';
var privateKey  = fs.readFileSync(process.env.PRIVKEY, 'utf8');
var certificate = fs.readFileSync(process.env.CHAIN, 'utf8');

var credentials = {key: privateKey, cert: certificate};

mongoose.Promise = global.Promise;

const MONGOURL = `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASS}@${process.env.MONGOURL}`;
mongoose.connect(MONGOURL);
const app = express();

morgan.token('body', function getId(req) {
    return JSON.stringify(req.body)
})

app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})
app.use(express.json());

// public
let options = {
    dotfiles: 'ignore',
    index: false
  }
app.use(express.static(path.join(__dirname, 'public'),
    options))
app.use(morgan(':method :url :body :response-time'));


app.use('/api', routes);


// Start the API
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8000);
console.log('info', `api running on port 8000`);