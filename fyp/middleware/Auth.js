const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

mongoose.set('strictQuery', true);

// Step # 1 : Verify the token, sent by client.
// Step # 2 : If token is verified, Set the req.userId = to the doceded id from the token.
// Step # 3 : Then return the handler fucntion with (req,res).
// Step # 4 : If token is not verified, Return Error.

const Auth = handler => async (req, res) => {
    const { authorization } = req.body
    // if (req.method == 'POST') {
        try {
            console.log("first")
            return new Promise((resolve, reject) => {
                let token = req.headers.authorization
                // Verifing Authorization token --- [Done]
                jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
                    if (err) {
                        res.status(401).json({ status: false, Error: "Invaid User session Token" });
                        reject()
                    }
                    else if (decoded.id) {
                       req.userId = decoded.id
                       console.log(decoded.id)
                       handler(req,res)
                       resolve()
                    }
                });
            })
        } catch (error) {
            console.error({ error: error })
            return res.status(401).json({ status: false, Error: 'Internal Srever Error' })
        }
    // }
    // else return res.status(403).json({ status: false, Error: 'This method is not allowed' })
}

export default Auth;