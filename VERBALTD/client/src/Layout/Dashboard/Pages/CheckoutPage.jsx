import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";


const stripePromise = loadStripe('pk_test_51OF1GOHUw9AEQwQEYulw5HbopwWcijlpUqETbPM1v7AD08xv2kWdWSp6Cl9O06iiaVJTCDoqef8OqvkeBC8aC0lQ00D4BtI4ft');
// console.log(stripePromise)

const CheckoutPage = ({ clientSecret }) => {

    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                    <PaymentForm clientSecret={clientSecret} />
                </Elements>
            </div>
        </div>
    );
};

export default CheckoutPage