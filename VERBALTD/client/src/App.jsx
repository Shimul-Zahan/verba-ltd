import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Pricing from './Pages/Pricing'
import FAQs from './Pages/FAQs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Pricing />
      <FAQs />
    </>
  )
}

export default App
