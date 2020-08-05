const User = require('../../model/user.model')

module.exports = {
    list: async (req, res) => {
        let users = await User.find()
        res.json(users)
    },
    idRoute: async (req, res) => {
        let user = await User.findById(req.params.id)
        res.json(user)
    },
    removeUser: async (req, res) => {
        const user =await User.deleteOne({ _id:  req.params.id})
        res.json(user)
    }
}