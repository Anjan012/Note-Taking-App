import { Home } from './components/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Login } from './components/Login';
import { Register } from './components/Register';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route index element={<Home />}></Route>
      </Routes>
    </Router>
  )
}

export default App
