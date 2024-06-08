import React, { useContext, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { MyAuthContext } from '../../../Context/AuthContext';
import useSecureHook from '../../../Hooks/axiosSecureInstance';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Shared/Loading';

const PaymentForm = ({ clientSecret }) => {

    const [error, setError] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const api = useSecureHook();
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false);

    const { user: officeAdmin, loading } = useContext(MyAuthContext);

    const stripe = useStripe();
    const elements = useElements();

    // console.log(clientSecret);

    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoader(true);
        const email = event.target.email.value;

        event.preventDefault();
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: 'abc@gmail.com',
                    name: 'abul babul'
                }
            }
        })
        if (confirmError) {
            console.log("confirm error", confirmError.message);
        } else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)
            }
            const paymentInfo = {
                paymentarEmail: email,
                time: new Date().toLocaleDateString(),
                trxnID: paymentIntent?.id,
                paidTk: parseInt(500),
            }
            const res = await api.post('/api/payments', paymentInfo);
            if (res.data._id) {
                const data = localStorage.getItem('loggedUser'); 
                const parseData = JSON.parse(data);
                const newData = {
                    ...parseData,
                    payment: 'success'
                }
                localStorage.setItem('loggedUser', JSON.stringify(newData));

                // localStorage.setItem('loggedUser', JSON.stringify(newData));

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Transaction done",
                    showConfirmButton: false,
                    timer: 1500
                });
                // setModalOpen(false);
                navigate('/dashboard');

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Pay",
                });
                // setModalOpen(false);
                navigate('/payment');
            }
        }
    };

    return (
        <div className='w-full min-h-screen flex justify-center items-center'>
            <form onSubmit={handleSubmit} className="bg-[#003343] p-8 rounded shadow-lg max-w-md w-full">
                {/* <h1 className="text-base font-semibold mb-6 text-white">Pay Now :)</h1> */}

                <div className="mb-4">
                    <label htmlFor="name" className="block text-white text-sm font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name='name'
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:shadow-outline"
                        value={officeAdmin?.userName}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        required
                        type="email"
                        id="email"
                        name='email'
                        value={officeAdmin?.email}
                        className="w-full p-2 border rounded focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="card" className="block text-white text-sm font-bold mb-2">
                        Card details
                    </label>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#FFFFFF',
                                    '::placeholder': {
                                        color: '#FFFFFF',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-[white] w-full text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {
                        loader ? <Loading /> : 'Pay Now'
                    }
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
