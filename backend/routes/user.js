const router = require('express').Router();
const User = require('../models/user.model');

router.get('/',(req,res) => {
    console.log("Called")
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));
});


router.get('/department/:department',(req,res) => {
    User.find({"department":`${req.params.department}`})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));
});

router.post('/add',(req,res) => {
    
    const newUser=new User({
       name:req.body.name,
       password:req.body.password,
       department:req.body.department
    });

    newUser.save()
       .then(() => res.json('User added!'))
       .catch(err =>res.status(400).json('Error : '+err));

}); 


router.post('/notification',(req,res) => {
    
    console.log(req.body)

    User.findById(req.body.id)
        .then(user=>{
            user.notification.push(req.body.notification)
            user.save()
                .then(() => res.json('Notification sent to the User ! !'))
                .catch(err=>res.status(400).json('Error : '+err));
        })
        .catch(err => res.status(400).json('Error : ' +err));

}); 


router.route('/:id').get((req,res) => {
    User.findById(req.params.id)
        .then(user=>res.json(user))
        .catch(err => res.status(400).json('Error : '+err));
});


module.exports=router;