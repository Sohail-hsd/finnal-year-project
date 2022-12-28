import UserInfo from '../../../model/UserInfo';
import connectDB from "../../../middleware/Connection"
import User from '../../../model/User'
const CryptoJS = require('crypto-js');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const { name, email, address, areaPinCode, city, state, phone, password } = req.body
            if(name, email, address, areaPinCode, city, state, phone, password){

                console.log(req.body.password)
                let check = await User.findOne({ email })
                if (!check) {
                    const cyperText = CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY).toString()
                    let user = new User({ name, email, password: cyperText })
                    let { _id } = await user.save()
                console.log(_id)
                let userInfo = new UserInfo({ userId: _id, name, address, areaPinCode, city, district: state, phone })
                await userInfo.save()
                res.status(200).json({ status: true, Message: "Account created" })
            } else {
                res.status(400).json({ status: false, Error: 'Invalid Credentials' })
            }
        } else return res.status(501).json({status:false, Error: "Invalid arguments"})
            
        } catch (error) {
            console.error({ error: error })
            res.status(400).json({ status: false, Error: 'Internal Srever Error' })
        }
    } else {

        res.status(400).json({ status: false, Error: 'This method is not allowed' })
    }

}

export default connectDB(handler)