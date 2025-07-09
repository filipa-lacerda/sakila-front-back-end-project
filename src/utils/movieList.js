
export async function movieList(API, method="GET", payload){    
    const send = method == "GET" ? {}: {
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload) 
    }
    
    try{
        const res = await fetch(`${API}/sakila/movies`, {method, ...send})
        const data = await res.json()
        return data.movies
    }
    catch (err){
        return err
    }
}