import { Routes, Route } from "react-router-dom"
import Homepage from './component/Homepage'
import Register from "./component/Register"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Homepage/> } />
        <Route path="/register" element={ <Register/> } />
      </Routes>
    </div>
  )
}

export default App