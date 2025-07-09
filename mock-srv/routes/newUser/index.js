export default async function (fastify, options) {

    fastify.get("/countries", async (request, reply)=>{
        try{
            const [countries] = await fastify.mysql.execute(`
                SELECT country_id, country from country
                `)
            return {countries}
        }
        catch{err}{
            return err;
        }
    })

    fastify.post("/new_customer", async (request, reply)=>{
        const {storeId, firstName, lastName, email, countryId} = request.body
        try {
            const [customer] = await fastify.mysql.execute(`
                insert into customer ( store_id, first_name, last_name, email, address_id, active, create_date)
                values (?, ?, ?, ?, ?, 1, now())
                `, [storeId, firstName, lastName, email, countryId])
            return {customer}
        } catch(err){
            console.error(err.message)
            return err
        }
    })
    // verify if customer exists by checking if email already exists
    fastify.post("/verifyCustomer", async (request,reply) =>{
        const email = request.body.email
        try{
            
            const customer = await fastify.mysql.execute(`
                SELECT * FROM customer
                WHERE email = ?
                `, [email])
            return {customer}
        }
        catch(err){
            return err
        }
    })

    // Fetch customer information by customer Id
    fastify.post("/customerInfo", async (request, reply)=>{
        const customerId = request.body.customer_id
        console.log("entrou ", customerId)
        try{
            const [customerInfo] = await fastify.mysql.execute(`
                SELECT * FROM customer
                WHERE customer_id = ${customerId}
                `)
            return {customerInfo}
        } catch(err){
            return err
        }
    })

}