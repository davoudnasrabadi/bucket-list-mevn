const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const {PORT,mongoUri} = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bucketListItemsRoutes = require('./routes/api/bucketListItems');
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/api/bucketListItems',bucketListItemsRoutes);
mongoose
.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
.then(()=>console.log('MongoDB connected'))
.catch((err)=>console.log('Failed to connect database: '+err))
if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/dist'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','dist','index.html'));
    })
}
 app.listen(PORT,'0.0.0.0',()=>console.log('server running on port '+PORT));



 