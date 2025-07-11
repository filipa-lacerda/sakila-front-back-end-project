import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "./Header"
import Input from "./reused_components/Input";
import { verifyCustomerAPI } from "../utils/verifyCustomerAPI";

export default function NewCustomer({API}){

    const [countryList, setCountryList] = useState([])
    const [customerExists, setCustomerExists] = useState(false)
    const [customerInfo, setCustomerInfo] = useState({})
    function resetCustomerExists(event){
        event.preventDefault()
        setCustomerExists(false)
    }
    
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted}
    } = useForm()

    async function onSubmit (data){
        //console.log(data.first_name)
        
        const payload = {
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            countryId: data.country_id,
            storeId: data.store_id
        }
        //console.log(payload)
        //await insertCustomer("POST", payload)
        await verifyCustomer("POST", payload)
    }
    

    async function verifyCustomer(method = "GET", payload) {
        
        const [customer] = await verifyCustomerAPI(API, method, payload)
        
        if( !customer){
            await insertCustomer("POST", payload)
        }else {
            //window.alert("Customer email already exists.")
            setCustomerExists(true)
            setCustomerInfo(prevCustomer => ({prevCustomer, ...customer}))
        }
    }


    async function insertCustomer(method="GET", payload) {
        console.log("inserto customer")
        const send = method == "GET" ? {}: {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        }
        //console.log(send.body)
        try{
            //console.log(send)
            const res = await fetch(`${API}/newUser/new_customer`, {method, ...send})
            const data = await res.json()
        }catch(err){ 
            //console.error(err.message)
            return err
        }       
    }


    async function fetchCountries (method = "GET", payload){
        
        const send = method == "GET" ? {} :
        {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        }
        try{
            const res = await fetch(`${API}/newUser/countries`, {method, ...send})
            const data = await res.json()
            setCountryList(data.countries)
        }
        catch(err){
            return err
        }
    }

    useEffect(()=>{
        fetchCountries();
    },[])

    const countryListOptions = countryList.map(country =>
        <option key={country.country_id} value={country.country_id}>{country.country}</option>
    )


    return (
        <>
            
            <div className="container">
                {customerExists && (
                    <div className="alert alert-primary alert-dismissible fae show align-items-center" role="alert">
                        <div>
                            <p>
                            User with the email {customerInfo.email} already exists.
                            </p>
                            <p>
                            It belongs to {customerInfo.first_name} {customerInfo.last_name} store  {customerInfo.store_id}.
                            </p>
                        </div>
                        <button 
                            type="button" 
                            className="btn-close"
                            aria-label="Close"
                            onClick={(e)=> resetCustomerExists(e)}>

                        </button>
                    </div>
                )}
                <Header />
                <h1>New Customer</h1>
                
            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                {/** First Name Input reusable component */}
                <Input 
                    label={"First Name: "} 
                    type={"text"} 
                    inputName={"first_name"} 
                    register={register}
                    errors={errors}
                    params={{required: "First Name required",
                                minLength: {value: 4,message: "Min 4 Characters"},
                                maxLength: {value: 20,message: "Min 20 Characters"}}} 
                />
                {/** Last Name Input reusable component */}
                <Input 
                    label={"Last Name: "} 
                    type={"text"} 
                    inputName={"last_name"} 
                    register={register}
                    errors={errors}
                    params={{required: "Last Name Required",
                                minLength: {value: 4,message: "Min 4 Characters"},
                                maxLength: {value: 20,message: "Min 20 Characters"}}} 
                />
                {/** Email Input reusable component */}
                <Input 
                    label={"Email: "} 
                    type={"email"} 
                    inputName={"email"} 
                    register={register}
                    errors={errors}
                    params={{required: "Email is required",
                                pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address"
                                }}}
                />

                {/**Select Country Element */}
                <div className="col-md-6">
                    <label htmlFor="country_id" className="form-lable">Choose Country Country</label>
                    <select className="form-select" aria-label="Select Country"
                        id="country_id" 
                        name="country_id" 
                        defaultValue="Choose"
                        {...register("country_id", {required: "Select Country"})} 
                        
                    >
                        <option value="">Choose Country</option>
                        {countryListOptions}
                    </select>
                    {errors.country_id && 
                        <span className="text-warning">{errors.country_id?.message}</span>
                    }
                </div>
                {/**Select Store Element */}
                <div className="col-md-6">
                    <label htmlFor="store_id" className="form-table">Choose Store</label>
                    <select className="form-select" aria-label="Select Store"
                        id="store_id"
                        name="store_id"
                        defaultValue="Choose"
                        {...register("store_id", {required: "Select Store"})}
                    >
                        <option value="">Choose</option>
                        <option value="1">Store 1</option>
                        <option value="2">Store 2</option>
                    </select>
                    {errors.store_id &&
                        <span className="text-warning">{errors.store_id?.message}</span>
                    }
                </div>
                <button type="submit" className="btn btn-secondary">Submit</button>
            </form>
            
            </div>
        </>
    )
}



    /** 
     * 
     * 
     * <div className="col-md-6">
                    <label htmlFor="first_name" className="form-lable">
                        First Name:
                        
                    </label>
                    <input 
                        type="text" 
                        className={`form-control ${errors.firstName ? "is-invalid": isSubmitted ? "is-valid": ""}`} 
                        {...register("firstName", {required: true, minLength: 4, maxLength: 20})} 
                        required
                    />
                    
                        
                        
                
                </div>
                <div className="col-md-6">
                    <label htmlFor="last_name" className="form-lable">Last Name:</label> 
                    <input type="text" className="form-control" name="last_name" id="last_name" required></input>
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-lable">Email:</label>
                    <input type="email" className="form-control" name="email" id="email" required></input>
                </div>
     * 
     * 
     * 
     * 
    function handleSubmit(e){
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const country_id = formData.get("country_id")
        const first_name = formData.get("first_name")
        const last_name = formData.get("last_name")
        const email = formData.get("email")

        // fazer verifcação dos dados,
        
         * fazer query para verificar se pessoa já existe
         * se não existir, criar pessoas com um post!
         
        
    }


    
        const send = method == "GET" ? {} : {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        }
        try {
            
            const res = await fetch(`${API}/newUser/verifyCustomer`, {method, ...send})
            const data = await res.json()
            const [customer] = data.customer[0]
             
            if( data.customer[0].length == 0){
                await insertCustomer("POST", payload)
            }else {
                //window.alert("Customer email already exists.")
                setCustomerExists(true)
                setCustomerInfo(prevCustomer => ({prevCustomer, ...customer}))
            }
            
        }
        catch(err){
            return err
        }



    */