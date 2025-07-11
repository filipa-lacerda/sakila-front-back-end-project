import { useState } from "react"
import { useForm } from "react-hook-form"
import Input from "./reused_components/Input"
import { verifyCustomerAPI } from "../utils/verifyCustomerAPI"
import { useSelector, useDispatch } from "react-redux"
import  {fetchUserByMail, testUser}  from '../features/user/userSlice'
import { useNavigate, Link } from "react-router-dom"


export default function Login({API}){

    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.user.userInfo)
    const loggedIn = useSelector((state) => state.user.loggedIn)
    const [customerDoesNotExists, setCustomerDoesNotExists] = useState(false)
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted}
    } = useForm()

    // verify if user exists in dataBase
    async function verifyCustomer(method = "GET", payload) {
            
        const [customer] = await verifyCustomerAPI(API, method, payload)
        
        if( !customer){
            setCustomerDoesNotExists(true)
            // set message saying that user does not exist and show button to create new user
        }else {
            // set global state for the specific user to logged in
            // and use that state to show / not show specific pages/buttons to specific things
            // and redirect to user personal page
        }
        
    }


    async function onSubmit(data){
        console.log("email: ", data.email)
        console.log("loggedIn: ", loggedIn)
        dispatch(fetchUserByMail(data.email))
        // user global state
        if (loggedIn){
            navigate("/")
        }
        
        
    }

    

    return (
        <div className="container">
            {customerDoesNotExists && (
            <div className="alert alert-primary alert-dismissible fae show align-items-center" role="alert">
                <div>
                    <p>
                    User does not exist.
                    </p>
                </div>
                <Link 
                    to="/new_customer" 
                    aria-label="new customer" 
                    className="btn btn-primary">
                        New Customer
                </Link>
            </div>
            )}
            <h2>Login Page</h2>
            <p>User: {userInfo.store_id} </p>
            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                {/** Email */}
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
                {/** Password */}
                <Input 
                    label={"Password: "} 
                    type={"password"} 
                    inputName={"password"} 
                    register={register}
                    errors={errors}
                    params={{
                        required: "Insert Password",
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                        }            
                    }}
                />
                <button type="submit"> Login</button>
            </form>
        </div>
    )
}