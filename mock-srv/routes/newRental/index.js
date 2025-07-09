export default async function(fastify, options){

    fastify.post("/verifyInventory", async (request, reply)=>{
        const {storeId, filmId} = request.body;
        console.log("verify")
        try{
            const [inventoryId] = await fastify.mysql.execute(`
                SELECT inventory_id FROM inventory
                WHERE film_id = ${filmId} AND store_id = ${storeId}
                LIMIT 1;
                `)
            return {inventoryId}
        }
        catch(err){
            return err;
        }
    })

    fastify.post("/makeRental", async (request, reply)=>{
        const {inventoryId, customerId} = request.body
        console.log(request.body)
        try{
            const rental = await fastify.mysql.execute(`
                INSERT INTO rental (rental_date, inventory_id, customer_id, return_date, staff_id, last_update)
                VALUES (Now(), ?, ?, NULL, 2, Now())
                `, [inventoryId, customerId])
            reply.code(201).send({
                success: true,
                message: "Rental Successful",
            })
        }
        catch(err){
            return err;
        }
    })

    fastify.post("/returnRental", async (request, reply) =>{
        const {rental_id} = request.body;
        console.log(rental_id)
        try{
            const returnRental = await fastify.mysql.execute(`
                UPDATE rental SET return_date = Now()
                WHERE rental_id = ${rental_id}
                `)
            return returnRental
        }
        catch(err){
            return err
        }
    })


}