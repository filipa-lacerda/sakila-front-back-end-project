"use strict"
import { useParams } from "react-router"
import { useForm } from "react-hook-form"
import { movieList } from "../utils/movieList"
import { customerInfo } from "../utils/customerInfo"
import { useEffect, useRef, useState } from "react"
import Header from "./Header"
import MovieCard from "./reused_components/MovieCard"

export default function NewRental({API}){
    const [moviesList, setMoviesList] = useState([])
    const [customerInfor, setCustomerInfor] = useState({})
    const [inventoryId, setInventoryId] = useState("")
    const [rentalSuccess, setRentalSuccess] = useState(false)
    const {customerId} =  useParams()
    
    const payload = {
                customer_id: customerId
            };
    
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    // on select, useRef to submit form
    const formRef = useRef(null)

    function handleChangeYear(e){
        formRef.current.requestSubmit()
    }
    // get customer information - usefull to know the store he/she belongs to
    async function fetchCustomer(method = "GET", payload) {
        try{
            const data = await customerInfo(API, method, payload)
            setCustomerInfor(prevState => ({...prevState, ...data[0]}))
        } catch(err){
            return err
        }
    }
    // get the list of all the movies
    async function fetchMovies(method = "GET", payload){
        try{
            const data = await movieList(API, method, payload)
            setMoviesList(data)
            
        }
        catch(err){
            return err
        }
    }

    // function to make the rental
    async function makeRental(method="GET", payload){
        //console.log("makeRental")
        const send = method == "GET" ? {}: {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        }

        try{
            const data = await fetch(`${API}/newRental/makeRental`, {method, ...send})
            const res = await data.json()
            if (res.success) {setRentalSuccess(true)}
        }
        catch(err){
            return err;
        }

    }


    // get inventoryID based on filmId and store ID (from customerInfor)
    async function fetchInventoryId(method = "GET", payload){
        const send = method == "GET" ? {} : {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        }
        try{
            const res = await fetch(`${API}/newRental/verifyInventory`, {method, ...send})
            const data = await res.json()
            setInventoryId(data.inventoryId[0].inventory_id)
            const payload = {
                inventoryId: data.inventoryId[0].inventory_id,
                customerId: customerId,
            }
            
            await makeRental("POST", payload)
        }
        catch(err){
            return err;
        }
    }

    

    //extact release Year of each movie
    const releaseYear= Array.from(new Set(moviesList.map(movie => movie.release_year)))
    const releaseYearOptionElem = releaseYear
        .map(year => <option key={year} value={year}>{year}</option>)

    // li elements for movies List
    const movieListElement = moviesList.map(movie => <li key={movie.film_id}>{movie.film_id}</li>)

    function handleSubmitForm(e){
        e.preventDefault();
        
        const form = e.target
        const formData = new FormData(form)
        const releaseYear = formData.get("releaseYear")
        if (releaseYear === ""){
            
        }
    }

    async function handleRental(filmId){
        // first step verify what is the inventory id, for the store and film_id (limit to 1 result)
        const payload = {
            filmId: filmId,
            storeId: customerInfor.store_id
        }
        await fetchInventoryId("POST", payload)
    }

    useEffect(()=>{
        fetchMovies()
        fetchCustomer("POST", payload)

    }, [])
    
    return (
        <>
        <div className="container">
            {rentalSuccess && (
                <div className="alert alert-primary alert-dismissible fae show align-items-center" role="alert">
                    <div>
                        <p>Rental Successfull. </p>
                    </div>
                    <button 
                        type="button" 
                        className="btn-close"
                        aria-label="Close"
                    ></button>
                </div>

            )}

            <Header />
            <p>New Rental</p>
            <p>Customer id: {customerId}</p>
            <p>Customer Name: {customerInfor.first_name} {customerInfor.last_name}</p>
            <form
                ref={formRef}
                className="form-inline select-form" 
                method="POST" 
                onSubmit={(e) => handleSubmitForm(e)}
            >
                <select className="form-select" aria-label="Choose Release Year"
                    id="releaseYear"
                    name="releaseYear"
                    defaultValue="Choose"
                    onChange={handleChangeYear}
                >
                    <option value="">Choose</option>
                    {releaseYearOptionElem}
                </select>
            </form>
            <MovieCard movies={moviesList} storeId={customerInfor.store_id} history={false} customerId={customerId} handleRental={handleRental}/>
        </div>
        </>
    )
}