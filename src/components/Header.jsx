import { useNavigate } from "react-router"
import NavBar from "./reused_components/NavBar"


export default function Header(props){
    
    return (
        <>
        <NavBar />
        <header className="container">
            <div className="p-1 mb-2 bg-body-tertiary rounded-3"> 
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">SAKILA Project Applying Skills</h1> 
                    <p className="col-md-8 fs-4">Project to access MySQL database, make queries and show results</p>
                </div>
            </div>
            <h1></h1>
        </header>
        </>
    )
}