const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {PORT,mongoUri} = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
mongoose
.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
.then(()=>console.log('MongoDB connected'))
.catch((err)=>console.log('Failed to connect database: '+err))
 app.listen(PORT,()=>console.log('server running on port '+PORT));



 