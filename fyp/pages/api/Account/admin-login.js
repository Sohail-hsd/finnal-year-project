import connectDB from "../../../middleware/Connection"
import Admin from '../../../model/Admin'
import AdminAuth from '../../../middleware/AdminAuth'
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// Step # 1 : First search the admin by email. if found!
// Step # 2 : Get the admin password from DB and decrypt it. by (password sercret key). and convert the password
//            from bytes to string.
// Step # 3 : Compare it to the admin provide password. if match!
// Step # 4 : create a json web token using JWT_SECRETE_KEY, add admin info like (email, name) and send it to frontend.

export const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const { email, password } = req.body
            if(email, password){

                let admin = await Admin.findOne({ email: email })
                if (admin) {
                    const bytes = CryptoJS.AES.decrypt(admin.password, `${process.env.ADMIN_PASSWORD_SECRET_KEY}`)
                    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8)
                    console.log(decryptedPassword)
                if (req.body.password === decryptedPassword) {
                    const token = jwt.sign({ email: admin.email, id: admin._id }, `${process.env.ADMIN_JWT_SECRET_KEY}`, { expiresIn: '2d' });
                    return res.status(200).json({ status: true, email: admin.email, name: admin.name, token })
                }
                
                return res.status(403).json({ status: false, Error: "Invalid Email Or Password" })
                
            } else {
                return res.status(403).json({ status: false, Error: "Invalid Email Or Password" })
            }
            
        } else return res.status(501).json({status:false, Error: "Invalid arguments"})
            
        } catch (error) {
            return res.status(500).json({ status: 'internal server error' })
        }
    }
    return res.status(500).json({ status: 'internal server error. (Method not allowed)' })
}

export default connectDB(handler);