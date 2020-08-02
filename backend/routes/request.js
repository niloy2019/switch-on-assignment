const router = require('express').Router();
const Request = require('../models/request.model');



router.get('/:assigned_department',(req,res) => {
    console.log(req.params)
    Request.find({"assigned_department":`${req.params.assigned_department}`,"status":"pending"})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));

});


router.get('/user/status/:assigned_person/:status',(req,res) => {
    console.log(req.params)
    Request.aggregate([
        {$match:{"created_by_id":`${req.params.assigned_person}`,"status":`${req.params.status}`}},
        {$sort:{'_id':-1}},
        {$limit:5}
    ]) .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));


});

router.get('/user/waitingforapproval/:assigned_person',(req,res) => {
    console.log(req.params)
    Request.find({"assigned_person":`${req.params.assigned_person}`,"status":`pending`})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));

});

router.post('/add',(req,res) => {

    console.log(req.body)

    const newRequest=new Request({
       status : req.body.status,
       created_by : req.body.created_by,
       created_by_id: req.body.created_by_id,
       assigned_person : req.body.assigned_person,
       assigned_department : req.body.assigned_department,
       assigned_person_name: req.body.assigned_person_name,
       message : req.body.message,
       date: req.body.date,
       time: req.body.time
    });

    newRequest.save()
       .then(() => res.json('Request added!'))
       .catch(err =>res.status(400).json('Error : '+err));

}); 

router.route('/update/:id/:status').post((req,res) => {
    console.log(req.params)
    Request.findById(req.params.id)
        .then(request=>{
            request.status = req.params.status
            request.save()
                .then(() => res.json('Request Updated !'))
                .catch(err=>res.status(400).json('Error : '+err));
        })
        .catch(err => res.status(400).json('Error : ' +err));
})


module.exports=router;