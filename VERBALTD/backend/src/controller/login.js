const OfficeSchema = require("../models/officeModel");
const genarateToken = require("./genarateToken");
const bcrypt = require('bcrypt');

const login = async (req, res, next) => {
    const user = req.body;
    const result = await OfficeSchema.findOne({ email: user.email });

    if (result) {
        const passwordMatch = await bcrypt.compare(user.password, result.password);
        if (passwordMatch) {
            genarateToken(res, result?.email);
            return res.json({
                message: 'successfully login',
                login: true,
                loginUser: {
                    email: result.email,
                    userName: result.userName,
                }
            });
        } else {
            return res.json({ message: 'password didn"t match' });
        }
    }
    res.json({ message: 'New user first need to registration' });
}

module.exports = login;