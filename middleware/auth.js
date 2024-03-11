const CustomAPIError = require('../errors/custom-error')

const jwt = require('jsonwebtoken')


const authenticationMiddleware = async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('Please provide email and password',400)
    }

    const token = authHeader.split(' ')[1]
    console.log(token);

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id,username} = decoded
        req.user={id,username};
        
        next();
    } catch (error) {
        throw new CustomAPIError('Invalid Access',401)
    }
}

module.exports=authenticationMiddleware