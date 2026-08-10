# 💱 Currency Converter --- 5-Minute Recall Notes

## 1. First think about the project

Before coding, break the UI into actions:

``` text
Currency Converter
│
├── Enter amount
├── Select FROM currency
├── Select TO currency
├── Click Convert
└── Show result
```

Then ask:

> **What information changes?**

Those become React states.

------------------------------------------------------------------------

## 2. States we needed

``` js
const [amount, setAmount] = useState(0)
const [from, setFrom] = useState("USD")
const [to, setTo] = useState("INR")
const [currencies, setCurrencies] = useState([])
const [convertedAmount, setConvertedAmount] = useState("")
const [loading, setLoading] = useState(false)
```

### Remember

``` text
state = information that changes and affects UI
```

Examples:

-   `amount` → user changes it
-   `from` → user changes it
-   `to` → user changes it
-   `currencies` → API gives it
-   `convertedAmount` → API calculation gives it
-   `loading` → changes while API is running

------------------------------------------------------------------------

## 3. Input → State

For user input:

``` jsx
<input
  onChange={(e) => setAmount(e.target.value)}
/>
```

Important:

``` js
e.target.value
```

gets what the user typed.

And:

``` js
setAmount(...)
```

updates React state.

Display state:

``` jsx
{amount}
```

❌ Don't display:

``` jsx
{setAmount}
```

because `setAmount` is the setter function, not the value.

------------------------------------------------------------------------

## 4. Dropdown → State

``` jsx
<select
  value={from}
  onChange={(e) => setFrom(e.target.value)}
>
```

Same for `to`:

``` jsx
<select
  value={to}
  onChange={(e) => setTo(e.target.value)}
>
```

### Important pattern

``` text
value={state}
      ↓
onChange → setState
```

This is a **controlled input**.

------------------------------------------------------------------------

## 5. Currency list comes from API

We didn't hardcode:

``` text
USD
INR
EUR
...
```

Instead:

``` js
const [currencies, setCurrencies] = useState([])
```

Then fetch currencies when the component loads:

``` js
useEffect(() => {
  const fetchCurrencies = async () => {
    const response = await fetch(
      "https://api.frankfurter.dev/v2/currencies"
    )

    const data = await response.json()

    setCurrencies(
      data.map((currency) => currency.iso_code)
    )
  }

  fetchCurrencies()
}, [])
```

### Why `useEffect`?

Because we want:

> **Fetch currencies when the component loads.**

``` text
Component loads
      ↓
useEffect
      ↓
API request
      ↓
data
      ↓
setCurrencies()
      ↓
React re-renders
```

------------------------------------------------------------------------

## 6. Display API currencies using `.map()`

``` jsx
{currencies.map((currency) => (
  <option
    key={currency}
    value={currency}
  >
    {currency}
  </option>
))}
```

### Remember

``` text
API array
   ↓
.map()
   ↓
React elements
```

React needs a `key` when rendering lists.

------------------------------------------------------------------------

## 7. Conversion API

When the user clicks **Convert**, we don't use `useEffect`.

Why?

Because the conversion should happen **when the button is clicked**.

``` jsx
<button onClick={convertCurrency}>
```

Function:

``` js
const convertCurrency = async () => {
  setLoading(true)

  const response = await fetch(
    `https://api.frankfurter.dev/v2/rate/${from}/${to}`
  )

  const data = await response.json()

  const rate = data.rate

  setConvertedAmount(amount * rate)

  setLoading(false)
}
```

### Mental model

``` text
Click button
     ↓
fetch(from → to)
     ↓
API gives rate
     ↓
amount × rate
     ↓
setConvertedAmount()
     ↓
UI updates
```

------------------------------------------------------------------------

## 8. Very important API lesson

This caused our `undefined` problem:

❌

``` js
const data = response.json()
```

✅

``` js
const data = await response.json()
```

Because:

``` text
response.json()
      ↓
Promise
      ↓ await
actual data
```

If you forget `await`, you don't have the actual API object yet.

------------------------------------------------------------------------

## 9. API response

For example:

``` js
{
  base: "USD",
  quote: "INR",
  rate: 95.21
}
```

We only needed:

``` js
const rate = data.rate
```

Then:

``` js
amount * rate
```

------------------------------------------------------------------------

## 10. Loading state

We added:

``` js
const [loading, setLoading] = useState(false)
```

Start:

``` js
setLoading(true)
```

Finish:

``` js
setLoading(false)
```

Button:

``` jsx
<button
  onClick={convertCurrency}
  disabled={loading}
>
  {loading ? "Loading..." : "Convert"}
</button>
```

### Mental model

``` text
loading = false → Convert
loading = true  → Loading...
```

------------------------------------------------------------------------

## 11. Don't show result initially

Instead of:

``` js
useState(0)
```

we used:

``` js
useState("")
```

Then:

``` jsx
{convertedAmount && (
  <h2>
    {convertedAmount}
  </h2>
)}
```

Meaning:

``` text
No result → show nothing
Result exists → show result
```

------------------------------------------------------------------------

## 12. Tailwind --- basic pattern we used

Card:

``` jsx
<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
```

Heading:

``` jsx
<h1 className="text-3xl font-bold text-gray-800 text-center">
```

Input:

``` jsx
className="w-full border rounded-lg px-4 py-3"
```

Dropdown:

``` jsx
className="w-full border border-gray-800 rounded-lg px-6 py-3 mt-2 text-gray-800"
```

Button:

``` jsx
className="w-full bg-gray-800 text-white py-3 rounded-lg mt-6 font-semibold"
```

### Tailwind quick memory

``` text
text-       → text size/color
font-       → font
bg-         → background
w-          → width
p- / px-    → padding
mt-         → margin top
rounded-    → border radius
shadow-     → shadow
text-center → alignment
```

------------------------------------------------------------------------

# 🧠 MOST IMPORTANT: How to start from a blank screen

This is what I want you to remember more than the code.

When you get a new React project:

### Step 1 --- Look at the UI

Ask:

> What can the user do?

### Step 2 --- Identify changing data

Ask:

> What information needs to be remembered?

Those become:

``` js
useState()
```

### Step 3 --- Identify external data

Ask:

> Does this information come from an API?

If yes:

``` js
fetch()
```

### Step 4 --- Decide WHEN the API runs

``` text
Page loads → useEffect

Button clicked → onClick function
```

### Step 5 --- Think about API data

Ask:

> What does the API return?

Then:

``` js
response.json()
```

and inspect the object.

### Step 6 --- Put useful data into state

``` js
setSomething(data.something)
```

### Step 7 --- Display it

``` jsx
{something}
```

------------------------------------------------------------------------

# 🔥 The entire project in one diagram

``` text
              BLANK SCREEN
                   ↓
          What can user do?
                   ↓
       ┌───────────┴───────────┐
       ↓                       ↓
  Changing data           External data
       ↓                       ↓
   useState()                API
       ↓                       ↓
 amount/from/to          fetch() + await
       ↓                       ↓
       └───────────┬───────────┘
                   ↓
              Process data
                   ↓
             setState(...)
                   ↓
              React updates
                   ↓
                  UI
```

**If you can remember this diagram, you don't need to memorize the
Currency Converter code.**

When you start your next project, use the same thinking process:
requirements → breakdown → state → API/data → events → UI.
