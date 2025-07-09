import Header from "./Header"
import StoreList from "./StoreList"


export default function Main({API}){

    return (
        <div className="container">
            <Header />
            <div className="btn-group" role="group" aria-label="">
                <a href="/rental" className="btn btn-outline-light" aria-current="Rental History">Rental History</a>
                <a href="/new_customer" className="btn btn-outline-light" aria-current="Rent Film">New Customer</a>
            </div>
        </div>
    )
}