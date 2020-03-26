import * as React from 'react'
import axios from 'axios'

const appStyles = {
  width: '100%',
  height: '100vh',
  padding: '16px'
}

const App = () => {
  const [data, setData] = React.useState({})

  React.useEffect(() => {
    axios
      .get('http://10.0.0.211:5001/?historical=true&daysBack=2&&symbol[]=GOOG&symbol[]=AAPL')
      .then(response => {
        console.log(response)
        console.log(response.data)
        setData(response)
      })
      .catch(error => {
        console.log(error)
        setData(error)
      })
  }, [])

  return (
    <div style={appStyles}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App
