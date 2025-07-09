import Header from "./Header"
import MovieCard from "./reused_components/MovieCard"
import SearchOption from "./reused_components/SearchOptions"
import { useEffect, useState } from "react"
import { movieList } from "../utils/movieList"

export default function RentalHistory({API}){
    const [movies, setMovies] = useState([])
    const [customers, setCustomers] = useState([])
    const [stores, setStores] = useState([])
    const [storeId, setStoreId] = useState()
    const [customerId, setCustomerId] = useState("")
    // const [rentalId, setRentalId] = useState("")

    async function fetchMovies(method = "GET", payload){
        try{
            const data = await movieList(API, method, payload)
            setMovies(data)
            //console.log("new_function",data)
        }
        catch(err){
            return err
        }
    }


    // call on API to fetch customers from the database
    async function fetchCustomers(method = "GET", payload){
        const send = method == "GET" ? {} :
        {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        };
        try{
        const res = await fetch(`${API}/sakila/customers`, {method, ...send})
        const data = await res.json()
        //console.log(data.customers)
        setCustomers(data.customers)
        } catch (err) {return err}
    }
    // call on API to fetch store from the database
    async function fetchStore(method = "GET", payload) {
        const send = method == "GET" ? {} : {
            header: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        }
        try{
            const res = await fetch(`${API}/sakila/stores`, {method, ...send})
            const data = await res.json()
            setStores(data.stores)
        }catch(err){
            return err;
        }
    }
    
    // call on API to return rental
    async function fetchReturnRental(method = "GET", payload){
        const send = method =="GET" ? {} : {
            headers : {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        }
        try {
            const res = await fetch(`${API}/newRental/returnRental`, {method, ...send})
            const data = res.json()
            
        }
        catch(err){
            return err
        }
    }

    async function handleSubmitStore(e){        
        e.preventDefault()

        const form = e.target;
        const formData = new FormData(form);
        const store_id = formData.get("store_id")
        if(store_id === "0"){
            await fetchCustomers()
        }else {
            setStoreId(store_id)
            const payload = {
                store_id: store_id
            };
            await fetchCustomers("POST", payload)
        }
    }

    async function handleSubmitCustomer(e){        
        e.preventDefault()

        const form = e.target;
        const formData = new FormData(form);
        const customer_id = formData.get("customer_id");
        //console.log("customer id ", customer_id)
        
        if(customer_id === "0"){
            await fetchMovies()
        }else {
            const payload = {
                customer_id: customer_id
            };
            setCustomerId(customer_id)
            await fetchMovies("POST", payload)
            
        }
    }

    async function handleRRental(rentalId){
        
        const payload = {
            rental_id: rentalId
        }
        await fetchReturnRental("POST", payload)
        console.log("store id: ", storeId)
        console.log("customer id: ",customerId)
        const payloadMovies = {
                customer_id: customerId
            };
        await fetchMovies("POST", payloadMovies)
    }


    useEffect(()=>{
        //fetchMovies()
        fetchCustomers()
        fetchStore()
    },[])



    return(
        <div className="container">
            <Header />
            <div>
                <h4>Check Customer Rental History</h4>
            </div>
            <SearchOption 
                customers={customers} 
                stores={stores} 
                handleSubmitStore={handleSubmitStore}
                handleSubmitCustomer={handleSubmitCustomer}
                
            />
            <MovieCard storeId={storeId} movies={movies} customerId={customerId} handleRRental={handleRRental}/>        
        </div>
    )
}





/* Delete in the end
    async function fetchMovies(method= "GET", payload) {
        const send = method == "GET" ? {}: {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload) 
        }
        
        try{
            const res = await fetch(`${API}/sakila/movies`, {method, ...send})
            const data = await res.json()
            console.log("prev_function",data.movies)
            setMovies(data.movies)    
        }
        catch (err){
            return err
        }
        
    }
*/