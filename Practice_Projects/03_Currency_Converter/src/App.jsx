import './App.css'
import { useState, useEffect} from 'react'

function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("INR")
  const [currencies, setCurrencies] = useState([])
  const [convertedAmount, setConvertedAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  const convertCurrency = async() => {
    setLoading(true)
    setError("")
    try {
      
        const response = await fetch(`https://api.frankfurter.dev/v2/rate/${from}/${to}`)

        const data = await response.json()
        
        const rate = data.rate

          
        setConvertedAmount((Math.round((amount * rate)*100))/100)
    } catch (err) {
      setError("Failed to convert currency")
    } finally{
        setLoading(false)
    }
        
      }


  useEffect(() => {

      


    const fetchCurrencies = async()=> {
        const response = await fetch("https://api.frankfurter.dev/v2/currencies")

        const data = await response.json()
        
        
       

        setCurrencies(
          data.map((currency) => currency.iso_code)
        )
        
    }
    fetchCurrencies()
  }, [])

  return (
    <>
    <div className='flex min-h-screen bg-gray-300 items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-6'>
    <h1 className='text-3xl font-bold text-center text-gray-800 mb-8'>Currency Converter</h1>
    <input className='w-full border rounded-lg px-4 py-3 mt-2 text-gray-800'  type="number" name="amount" id="amount" onChange={(e) => setAmount(e.target.value)}/>
    <select  className='w-full border rounded-lg px-4 py-3 mt-2 text-gray-800' value={from} name="from" id="from-dropdown" onChange={(e) => setFrom(e.target.value)}>
    {currencies.map((currency) => (
      <option key={currency} value={currency}>{currency}</option>
    ))}
    </select>
    <select className='w-full border rounded-lg px-4 py-3 mt-2 text-gray-800' value={to} name="to" id="to-dropdown" onChange={(e) => setTo(e.target.value)}>
     {currencies.map((currency) => (
      <option value={currency} key={currency}>{currency}</option>
     ))}
    </select>
    <button   className="w-full bg-gray-800 text-white py-3 rounded-lg mt-6 font-semibold" onClick={convertCurrency} disabled={loading}>{loading ? "Loading...": "Convert"}</button>
   {convertedAmount && (<h2 className="text-2xl font-bold text-gray-800 text-center mt-6">{convertedAmount}</h2>)} 
    {error && <p>{error}</p>}
    </div>
    </div>
    </>
  )
}

export default App
