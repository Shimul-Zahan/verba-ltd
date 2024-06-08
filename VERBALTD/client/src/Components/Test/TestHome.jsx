import axios from 'axios';
import React, { useEffect, useState } from 'react'

const TestHome = () => {

    const [openModal, setOpenModal] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [chooseOption, setChooseOption] = useState('');
    const [isOptionLocked, setIsOptionLocked] = useState(false);
    const [submitAnswer, setSubmitAnswer] = useState([])

    const getQuestion = async () => {
        const data = await axios.get('http://localhost:5000/api/test')
        setQuestions(data.data);
    }

    useEffect(() => {
        getQuestion();
    })

    const handleNext = () => {
        if (chooseOption !== null) {
            setSubmitAnswer(prevAnswers => [
                ...prevAnswers,
                { question: questions[index].question, answer: chooseOption }
            ]);
            setChooseOption(null);
            setIsOptionLocked(false);
            setIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleOptionClick = (option) => {
        if (!isOptionLocked) {
            setChooseOption(option);
            setIsOptionLocked(true);
        }
    };

    return (
        <section className='min-h-screen flex justify-center items-center'>
            <div className='bg-[#B3CDCC] h-[450px] text-black max-w-xl p-4 mx-auto shadow'>
                <div className='text-center pb-8 text-xl'>
                    <h1>Instruction</h1>
                    <hr className='w-32 mx-auto border-black border-2' />
                </div>
                <h1 className='text-lg'>This quiz is designed to test your ability to accurately identify and interpret emotions portrayed by individuals, landscapes, and symbolic designs in pictures.
                    <br />
                    <br />
                    Look closely at each image and select the emotion(s) that you believe best represent(s) what is being conveyed.
                    <br />
                    <br />
                    Choose the most fitting option(s) for each image based on your perception of the emotions being expressed.
                </h1>
                <button onClick={() => setOpenModal(true)} className='py-8 w-full flex justify-end items-center'>
                    <p className='bg-[#076579] py-2 px-12 text-white rounded-xl'>Start</p>
                </button>
            </div>
            <div>
                <div className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100`}>
                    <div className={`absolute max-w-xl rounded-lg bg-white p-3 pb-5 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${openModal ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'} `}>
                        <svg onClick={() => {
                            setOpenModal(false);
                            setIndex(0);
                            setChooseOption(null);
                            setIsOptionLocked(false);
                            setSubmitAnswer([]);
                        }} className="mx-auto mr-0 w-8 cursor-pointer fill-black dark:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path></g></svg>
                        <div className="mb-2 text-2xl font-semibold">
                            <h1 className='text-lg font-medium pb-8 text-start'>1. EQ - match emotions</h1>
                            <h1 className='text-lg font-medium pb-8 text-center'>This quiz will test how well you can recognize and understand emotions shown in pictures of people, landscapes, and symbols.
                                <br />
                                Look closely at each image.
                                Decide which emotion(s) you think the image shows.
                                Choose the option(s) that best match what you see.
                            </h1>
                            {questions && index <= questions.length &&
                                questions.slice(index, index + 1).map(q =>
                                    <div>
                                        <h1 className='text-lg text-center font-medium'>{q?.question}</h1>
                                        <div className="grid grid-cols-1 gap-4 items-center lg:grid-cols-2 lg:gap-8 px-10">
                                            <div className="rounded-lg">
                                                <h1 className='text-lg font-medium text-start pb-2'>Image 1:</h1>
                                                <img src={q?.image} alt="" className='h-[200px] w-[400px]' />
                                            </div>
                                            <div className="text-lg font-medium space-y-3">
                                                {
                                                    q.options.map((o, i) =>
                                                        <h1
                                                            key={i}
                                                            onClick={() => handleOptionClick(o)}
                                                            className={`cursor-pointer text-start rounded-xl px-4 py-1 ${o === chooseOption ?
                                                                (chooseOption === q.answer ? 'bg-green-500' : 'bg-red-500') : ''}`}
                                                        >
                                                            {i === 0 ? 'A)' :
                                                                i === 1 ? 'B)' :
                                                                    i === 2 ? 'C)' : 'D)'}  {o}
                                                        </h1>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        {
                            questions.length - 1 === index ?
                                <button className="rounded-md float-end mr-10 my-10 bg-indigo-600 hover:bg-indigo-700 px-6 py-1.5 text-white">Submit Answer</button> :
                                <button onClick={handleNext} className="rounded-md float-end mr-10 my-10 bg-indigo-600 hover:bg-indigo-700 px-6 py-1.5 text-white">Next</button>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TestHome