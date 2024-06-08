const stripe = require("stripe")('sk_test_51OF1GOHUw9AEQwQEvRlzEAUHSGAOeBfwquYTk5W0Z2N0syCZ31WYnu3BeB0StuCuiBP5WBdIh4lqAWbPQZSmcgv4009tnwiwQR');

const paymentIntent = async (req, res, next) => {
    const { price } = req.body;
    let amount = parseInt(price) * 100;
    console.log(amount)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: [
            'card'
        ]
    })
    res.send({ clientSecret: paymentIntent.client_secret });
}

module.exports = paymentIntent;