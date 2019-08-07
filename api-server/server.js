import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import mongo from 'mongodb';
import path from 'path';
import mongoose from 'mongoose';
require('dotenv').config()

mongoose.Promise = global.Promise;

const MONGOURL = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@${process.env.MONGOURL}`;
mongoose.connect(MONGOURL);
const app = express();

morgan.token('body', function getId(req) {
    return JSON.stringify(req.body)
})

app.use((req, res, next)=> {
    next()
})
app.use(express.json());

// public
let options = {
    dotfiles: 'ignore',
    index: false
  }
app.use(express.static(path.join(__dirname, 'public'),
    options))


app.use('/api', routes);


// Start the API
app.listen(8000);
console.log('info', `api running on port 8000`);