import jwt from 'jsonwebtoken'

const genToken = (userID, res)=>{
    const token = jwt.sign({userID},process.env.JWT_SECRET,{
        expiresIn:'7d'
    });
    res.cookie('jwt',token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.DEVSTATUS !== "DEVELOPMENT"
    });
}

export default genToken