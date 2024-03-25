const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud");

app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id; // Corrected
    UserModel.findById(id) // Corrected
        .then(user => {
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            res.json(user);
        })
        .catch(err => res.json(err));
});

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id; 
    UserModel.findByIdAndUpdate(id, req.body, { new: true }) 
        .then(user => {
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            res.json(user);
        })
        .catch(err => res.json(err));
});

app.delete('/deleteUser/:id', (req,res)=>{
    const id = req.params.id; 
    UserModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>err.json(err))
})

app.post('/createUser', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log('server is running');
});
