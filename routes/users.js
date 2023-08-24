const express = require('express')
const router = express.Router()
const {createUser, createCheckoutSession} = require('../controllers/UserControllers')

router.post('/register', createUser)

router.post('/login',(req,res)=>{
    res.json({msg:"Login"})
})

router.post('/api/create-subscription-checkout-session',createCheckoutSession)

module.exports = router