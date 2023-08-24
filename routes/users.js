const express = require('express')
const router = express.Router()
const {createUser} = require('../controllers/UserControllers')

router.post('/register', createUser)

router.post('/login',(req,res)=>{
    res.json({msg:"Login"})
})

module.exports = router