import React, { useContext } from 'react'
import Slider from '../Components/Slider'
import Services from '../Components/Services'
import Quiz from '../Components/Quiz'
import { MyAuthContext } from '../Context/AuthContext'
import Loading from '../Shared/Loading'
// import { ThreeCircles } from 'react-loader-spinner'

const Home = () => {

  const { loading } = useContext(MyAuthContext);

  if (loading) {
    return <div className='flex justify-center items-center w-full h-screen bg-gray-500'>
      <Loading />
    </div>
  }

  return (
    <div className='bg-gradient-to-r from-blue-50 to-blue-400 '>
      <Slider />
      <Services />
      <Quiz />
    </div>
  )
}

export default Home