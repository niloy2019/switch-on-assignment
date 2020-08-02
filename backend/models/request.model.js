const mongoose=require('mongoose');

const requestSchema=mongoose.Schema({
        status : {
             type : String,
             required:true
         },
        created_by : {
            type : String , 
            required : true
        },
        created_by_id : {
            type : String , 
            required : true
        },
        assigned_person : {
            type : String , 
            required : true
        },
        assigned_department : {
            type : String , 
            required : true
        },
        assigned_person_name : {
            type : String , 
            required : true
        },
        message : {
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

module.exports=mongoose.model('request',requestSchema);