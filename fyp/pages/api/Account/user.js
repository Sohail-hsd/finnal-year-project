import Auth from '../../../middleware/Auth'

export const handler = (req, res) => {
    res.status(200).json({ name: 'John Doe', id: req.userId })
}

export default Auth(handler)