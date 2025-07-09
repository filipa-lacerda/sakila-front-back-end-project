import { useEffect, useState } from "react"


export default function StoreList({API}){
    const [storeList, setStoreList] = useState([]);
    const [countriesList, setCountriesList] = useState([])
    const fecthStoreData = async (method = "GET", payload) =>{
        
        const send = method == "GET" ? {} : {
        headers : {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
        }
        try{
        const res = await fetch(`${API}/sakila/store`, {method, ...send})
        const data = await res.json()
        setStoreList(data.store)
        } catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        fecthStoreData()
    }, [])

    const storeListElement = storeList.map(store => 
        <li className="list-group-item" key={store.store_id}>{store.store_id}</li>
    )

    const fetchCountriesData = async (method = "GET", payload) =>{
        const send = method == "GET" ? {} : {
            headers : {"Content-Type": "application/json"},
            body: JSON.stringify(payloa)
        }
        try{
            const res = await fetch(`${API}/sakila/countries`, {method, ...send})
            const {countries} = await res.json()
            setCountriesList(countries)
        }
        catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        fetchCountriesData()
    }, []);

    const countriesListElement = countriesList.map(country => 
        <li className="list-group-item" key={country.country_id}>{country.country}</li>
    )

    const countriesListOptionElement = countriesList.map(country => 
        <option 
            className="list-group-item" 
            key={country.country_id} 
            value={country.country_id}>{country.country}
            </option>
    )

    return (
        <div className="container">
            <section className="container">
                <div className=""></div>
                <button type="button" className="btn btn-light" onClick={() => fecthStoreData()}>Fetch Store List</button>
                <ul className="list-group">
                    {storeListElement}
                </ul>
                
            </section>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Options</label>
                </div>
                <select className="custom-select" id="inputGroupSelect01">
                    <option defaultValue={null}>Choose...</option>
                    {countriesListOptionElement}
                </select>
            </div>
        
        </div>
    )
}

/* <button type="button" className="btn btn-light" onClick={() => fetchCountriesData()}>Fetch Countries List</button>
                <ul className="list-group">
                    {countriesListElement}
                </ul>
*/