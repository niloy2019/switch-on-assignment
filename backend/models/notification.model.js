const mongoose=require('mongoose');

const notificationSchema=mongoose.Schema({
        user_id : {
          type : String,
          required:true
         },
        notification : {
          type : String , 
          required : true
        },
        date : {
            type : String ,
            required : true
        },
        time:{
            type : String ,
            required : true
        }
 })

module.exports=mongoose.model('notification',notificationSchema);