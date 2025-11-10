import ServiceCallAnalysis from './components/ServiceCallAnalysis'
const express = require('express')
const app = express()
const port = process.env.PORT || 10000 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
function App() {
  return <ServiceCallAnalysis />
}

export default App
