import { useRef, useState } from "react"
import Alphabet from "../../utils/Alphabet"


export default function SearchOption({handleSubmitCustomer, handleSubmitStore, customers, stores}){
    // Save selected letter  and showList status for filtering purposes  
    const [letterSelected, setLetterSelected] = useState("")
    const [showList, setShowList] = useState(false)

    // useRef to submit forms used in functions handleChangeXXXX
    const formRefStore = useRef(null)
    const formRefCustomer = useRef(null)
    
    // on Select, useRef to submit form
    function handleChangeStores(){
        formRefStore.current.requestSubmit()
    }
    
    // on select, useRef to submit form
    function handleChangeCustomer(){
        formRefCustomer.current.requestSubmit()
    }
    
    /** filter customer array accordingly to first letter so that on the Select Options only the name
     *  with the first letter selected appear on the list
    *
    */
    function filterCustomers(event){
        event.preventDefault()
        if (event.target.value === letterSelected){
            setLetterSelected("")
            setShowList(false)    
        }else{
            setLetterSelected(event.target.value)
            setShowList(true)

        }
    }
    
    //show list of customer available in each store and filtered by store if any selected

    const customersFiltered = letterSelected ?
         customers.filter(customer => customer.first_name[0] === letterSelected)
         :
         customers;

    const customerListOptions = customersFiltered.map(customer =>
         
        <option key={customer.customer_id} value={customer.customer_id}>
                {customer.first_name} {customer.last_name} ({customer.customer_id})
        </option>
    )
    
    //show list of stores available, into Select Element
    const storeListOptions = stores.map(store => 
        <option key={store.store_id} value={store.store_id}>
            Store Number: {store.store_id}
        </option>

    )

    return(

        <>
        <form ref={formRefStore} className="form-inline select-form" method="post" onSubmit={(e) => handleSubmitStore(e)}>
            <div className="form-group mb-2">
                <label className="label-form" htmlFor="store_id">Store</label>
                <select 
                    id="store_id" 
                    name="store_id" 
                    defaultValue="Choose" 
                    onChange={handleChangeStores}
                >
                    <option value={0}>Choose</option>
                    {storeListOptions}
                </select>
                <p className="available-count">Available: {stores.length}</p>
            </div>
        </form>
        <Alphabet customers={customers} filterCustomers={filterCustomers} showList={showList}/>
        <form ref={formRefCustomer} className="form-inline select-form" method="post" onSubmit={(e) => {handleSubmitCustomer(e)}}>
            <div className="form-group mb-2">
                <label className="label-form" htmlFor="customer_id">Customer Name</label>
                <select 
                    id="customer_id" 
                    name="customer_id" 
                    defaultValue="Choose" 
                    onChange={handleChangeCustomer}
                >
                    <option value={0}>Choose</option>
                    {customerListOptions}
                </select>
                <p className="available-count">Available: {customersFiltered.length}</p>
            </div>
        </form>
        
        </>
    )
}
