const express =  require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv/config')
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')

//Import Routes
const UserRoute = require('./routes/user')
const RequestRoute = require('./routes/request')
const NotificationRoute = require('./routes/notification')

// Middlewares
app.use(cors())
app.use(bodyParser.json());

const PORT=process.env.PORT || 5000
app.use('/user', UserRoute );
app.use('/request', RequestRoute );
app.use('/notification', NotificationRoute );

app.get('/', (req,res) => {
  res.send("Server says Hello")
})

//Connect to DB
mongoose.connect( process.env.DB_CONNECTION, 
                  { useNewUrlParser: true,useUnifiedTopology: true }
                )
                
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established Successfully");
})
                
// if(process.env.NODE_ENV === 'production'){
//    app.use(express.static('frontend/build'))
//    app.get('*',(req,res) => {
//       res.sendFile(path.join(__dirname,'frontend/build','index.html'))
//    })
// }


//How to start listening to the server
app.listen(PORT,console.log(`Server is running at ${PORT}`))