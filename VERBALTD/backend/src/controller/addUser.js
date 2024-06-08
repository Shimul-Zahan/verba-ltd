const User = require("../models/userModel");

const addUser = async (req, res, next) => {
    const user = req.body;
    const result = await User.create(user);
    res.status(200).json(result);
}

module.exports = addUser;