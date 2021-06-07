const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

const adminAuth = async(req,res,next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token, process.env.JWTKEY)
        const user = await userModel.findOne({
            '_id': decodedToken._id,
            'tokens.token':token,
            'status':"admin"
        })
        if(!user) throw new Error('invalid admin')
        req.user= user
        req.token=token
        next()
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message:'Please authenticate'
        })
    }
}

module.exports = adminAuth