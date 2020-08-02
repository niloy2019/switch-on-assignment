const router = require('express').Router();
const Notification = require('../models/notification.model');

router.get('/:user_id',(req,res) => {
    console.log("Notifiction called")
    Notification.find({'user_id':req.params.user_id})
    .then(Notifications => res.json(Notifications))
    .catch(err => res.status(400).json('Error: '+err));
});

router.post('/add',(req,res) => {
    const newNotification=new Notification({
        user_id: req.body.user_id,
       notification: req.body.notification,
       date: req.body.date,
       time: req.body.time
    });
    newNotification.save()
       .then(() => res.json('Notification added!'))
       .catch(err =>res.status(400).json('Error : '+err));

});

router.route('/:id').delete((req,res) => {
    Notification.findByIdAndDelete(req.params.id)
        .then(() => res.json('Notification Deleted.'))
        .catch(err => res.status(400).json('Error : '+err));
});

module.exports=router;