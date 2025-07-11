export async function verifyCustomerAPI(API, method = "GET", payload) {
    
    const send = method == "GET" ? {} : {
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    }
    try{
        const res = await fetch(`${API}/newUser/verifyCustomer`, {method, ...send})
        const data = await res.json()
        return data.customer[0]
    }
    catch(err){
        return err
    }


}