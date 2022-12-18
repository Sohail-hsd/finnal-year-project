import Product from "../../../model/Product"
import connectDB from '../../../middleware/Connection'
import Auth from '../../../middleware/Auth'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        for (let i = 0; i < req.body.length; i++) {
            let p = new Product({
                title: req.body[i].title,
                slug: req.body[i].slug,
                desc: req.body[i].desc,
                img: req.body[i].img,
                category: req.body[i].category,
                price: req.body[i].price,
                size: req.body[i].size,
                color: req.body[i].color,
                availableQty: req.body[i].availableQty,
                userId: req.userId
            })
            await p.save()
        }
        // console.log(req.body)
        res.status(200).json({ status: "Success" })
    }


    else {

        res.status(400).json({ Error: 'This method is not allowed' })
    }
}

export default connectDB(Auth(handler))