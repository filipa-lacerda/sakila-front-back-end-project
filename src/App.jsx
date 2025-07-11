import { BrowserRouter, Route, Routes } from "react-router"
import Main from "./components/Main"
import Test from "./components/Test"
import RentalHistory from "./components/RentalHistory";
import MovieInfo from "./components/reused_components/MovieInfo";
import NewCustomer from "./components/NewCustomer";
import Input from "./components/reused_components/Input";
import NewRental from "./components/NewRental";
import Login from "./components/Login";
import './index.css'


// Server URL
const API = "http://localhost:3000";


function App() {

  

  return (
    <>    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main API={API}/>} />
        <Route path="/rental" element={<RentalHistory API={API} />} />
        <Route path="/rental/movieinfo/:store/:id" element={<MovieInfo API={API}/>} />
        <Route path="/new_customer" element={<NewCustomer API={API}/>} />
        <Route path="/form" element={<Input />} />
        <Route path="/test" element={<Test />} />
        <Route path="rental/newRental/:customerId" element={<NewRental API={API}/>} />
        <Route path="/login" element={<Login API={API}/>} />
      </Routes>
      
    </BrowserRouter>
    </>
  )
}

export default App
