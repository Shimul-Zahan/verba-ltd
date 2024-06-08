const UserAccountSchema = require("../models/userAccountModel");

const createNewAccount = async (req, res, next) => {
    const newAccount = req.body;
    const result = await UserAccountSchema.create(newAccount);
    res.status(200).json(result);
}

module.exports = createNewAccount;