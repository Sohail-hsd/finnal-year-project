// import AdminInfo from '../../../model/AdminInfo';
import connectDB from "../../../middleware/Connection"
import Admin from '../../../model/Admin';
const CryptoJS = require('crypto-js');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const { name, email, password } = req.body
            if(name, email, password){

                console.log(req.body.password)
                let check = await Admin.findOne({ email })
                if (!check) {
                    const cyperText = CryptoJS.AES.encrypt(password, process.env.ADMIN_PASSWORD_SECRET_KEY).toString()
                    let admin = new Admin({ name, email, password: cyperText })
                    let { _id } = await admin.save()
                    console.log(_id)
                    // let adminInfo = new AdminInfo({ adminId: _id, name, phone })
                    // await adminInfo.save()
                    return res.status(200).json({ status: true, Message: "Account created" })
            } else {
                return res.status(400).json({ status: false, Error: 'Invalid Credentials' })
            }
        } else return res.status(501).json({status:false, Error: "Invalid arguments"})
            
        } catch (error) {
            console.error({ error: error })
           return res.status(400).json({ status: false, Error: 'Internal Srever Error' })
        }
    } else {

        return res.status(400).json({ status: false, Error: 'This method is not allowed' })
    }

}

export default connectDB(handler)