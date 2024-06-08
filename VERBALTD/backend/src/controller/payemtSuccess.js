const OfficeSchema = require("../models/officeModel");
const PaymentSchema = require("../models/paymentMode");

const paymentSuccess = async (req, res, next) => {
    const paymentInfo = req.body;
    console.log(paymentInfo);
    const result = await PaymentSchema.create(paymentInfo);
    res.json(result);
}

module.exports = paymentSuccess