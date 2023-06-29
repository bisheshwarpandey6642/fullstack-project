import { Routes, Route, Link } from "react-router-dom"
import Homepage from './component/Homepage'
import Register from "./component/Register"

import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div className="container">
    <nav className="navbar navbar-expand-lg nav-primary bg-primary">
      <Link className="navbar-brand" to="/"> Home </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav=item">
          <Link className="navbar-brand" to="/register"> Register </Link>
          </li>

        </ul>

      </div>

    </nav>
      <Routes>
        <Route path="/" element={ <Homepage/> } />
        <Route path="/register" element={ <Register/> } />
      </Routes>
    </div>
  )
}

export default App