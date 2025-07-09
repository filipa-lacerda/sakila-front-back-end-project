import Input from "./reused_components/Input"
import { useForm, Controller } from "react-hook-form"


export default function Test() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <div className="container">
        <p>This is the test</p>
        
            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    label={"First Name: "} 
                    type={"text"} 
                    inputName={"first_name"} 
                    register={register}
                    errors={errors}
                    params={{required: "First Name required",
                             minLength: {value: 4,message: "Min 4 Characters"},
                             maxLength: {value: 20,message: "Min 20 Characters"}}} />
                
                <Input 
                    label={"Last Name: "} 
                    type={"text"} 
                    inputName={"last_name"} 
                    register={register}
                    errors={errors}
                    params={{required: "Last Name Required",
                             minLength: {value: 4,message: "Min 4 Characters"},
                             maxLength: {value: 20,message: "Min 20 Characters"}}} />
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
                             }}} />
                <input className="btn btn-secondary" type="submit" />
            </form>
        </div>
    )
}

/**
 * 
                <Input label={"Email: "} type={"email"} inputName={"email"} register={register} />
 */