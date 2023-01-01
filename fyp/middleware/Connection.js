const mongoose = require('mongoose')


mongoose.set('strictQuery', true);

const connectDB = handler => async (req, res) => {
    if (mongoose.connection.readyState) {
        console.log("Already Connected")
        return handler(req, res)
    }
    mongoose.connect(process.env.MONGO_URI)
    console.log("Connected",process.env.MONGO_URI)
    return handler(req, res)
}

export default connectDB;