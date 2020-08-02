const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
        name : {
          type : String,
          required:true
         },
        department : {
          type : String , 
          required : true
        },
        password : {
          type : String , 
          required : true
        },
        notifications:{
          type:Array
        }
 })

module.exports=mongoose.model('user',userSchema);