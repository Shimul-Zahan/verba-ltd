const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({
    paymentarEmail: { type: String, required: true },
    time: { type: String, required: true },
    trxnID: { type: String, required: true },
    paidTk: { type: Number, required: true },

    /*
    paymentarEmail: 'a@gmail.com',
  time: '2/9/2024',
  trxnID: 'pi_3Oht2kHUw9AEQwQE1DS0380q',
  paidTk: 500
    */ 
});


const PaymentSchema = model('Payments', paymentSchema);

module.exports = PaymentSchema;
