export async function customerInfo(API, method = "GET", payload){
    const send = method == "GET" ? {} : {
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(payload)
    }

    try{
        const res = await fetch(`${API}/newUser/customerInfo`, {method, ...send})
        const data = await res.json()
        console.log(data)
        return data.customerInfo
    } catch (err){
        return err
    }
}