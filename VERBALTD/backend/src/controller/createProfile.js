const OfficeSchema = require("../models/officeModel");
const bcrypt = require('bcrypt');

const createProfile = async (req, res, next) => {
    const officeData = req.body;

    const existingOffice = await OfficeSchema.findOne({ email: officeData.email });
    console.log(existingOffice);

    if (existingOffice) {
        return res.json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(officeData.password, 10);
    const result = await OfficeSchema.create({...officeData, password: hashedPassword});
    res.status(200).send(result);
}

module.exports = createProfile;