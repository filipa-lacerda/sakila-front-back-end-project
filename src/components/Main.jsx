import { Link } from "react-router-dom"
import Header from "./Header"
import { useSelector } from "react-redux"

export default function Main({API}){

    const loggedIn = useSelector((state) => state.user.loggedIn)
    const userInfo = useSelector((state) => state.user.userInfo)
    return (
        <div className="container">
            <Header />
            <div className="btn-group" role="group" aria-label="">
                <Link to="/rental" className="btn btn-outline-light" aria-current="Rental History" > Rental History</Link>
                {userInfo.email == "admin@mail.com" && 
                <Link 
                    to="/new_customer" 
                    className="btn btn-outline-light" 
                    aria-current="Rent Film">
                        New Customer
                </Link>}
            </div>
        </div>
    )
}