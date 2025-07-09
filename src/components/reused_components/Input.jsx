import { useForm } from "react-hook-form";

export default function Input({label, inputName, type, register, params = {}, errors}){

    return (
        <div className="col-md-6">
            <label htmlFor={inputName} className="form-lable">
                {label}
            </label>
            <input type={type} className="form-control" {...register(inputName, params)}/>
            {errors[inputName] && 
                <span className="text-warning">{errors[inputName]?.message}</span>
            }
    </div>
    )
}

