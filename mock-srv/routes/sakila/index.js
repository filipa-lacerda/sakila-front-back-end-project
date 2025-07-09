const moviesResponseSchema = {
    response: {
        200: {
            movies: {type: "object"}
        }
    }
}


export default async function (fastify, option) {
    fastify.get("/actors", async (request, reply)=>{
        try{
            const [actors] =await fastify.mysql.execute(`
                SELECT * FROM actor
                ORDER BY last_update DESC
                LIMIT 10
                `)
                return { actors}
        } catch (err){
            
            return err
        }
    })

    fastify.get("/stores", async (request, reply)=>{
        try {
            const [stores] = await fastify.mysql.execute(`
                SELECT * FROM store
                `)
            return { stores } 
        }
        catch (err) {
            return err
        }
    })

    // get all movies list from database
    fastify.get("/movies",  async (request, reply)=>{
        try{
            const [movies] = await fastify.mysql.execute(`SELECT * FROM film`);
            return {movies}
        }
        catch(err){
            return err;
        }
    })
    // get all movies list from database based on rental from a customer_id (Still need to fix that)
    fastify.post("/movies", async (request, reply)=>{
        const [movies] = await fastify.mysql.execute(`
            SELECT DISTINCT DATE_FORMAT(rental.rental_date, '%Y-%m-%d') as "Date",DATE_FORMAT(rental.return_date, '%Y-%m-%d') as "RDate", film.film_id, film.title, film.description, film.length, film.release_year, language.name, category.name as "Genre", rental.rental_id FROM film
            JOIN inventory ON film.film_id = inventory.film_id
            JOIN rental ON rental.inventory_id = inventory.inventory_id
            JOIN customer ON customer.customer_id = rental.customer_id
            Join language ON film.language_id = language.language_id
            JOIN film_category on film_category.film_id = film.film_id
            JOIN category on category.category_id = film_category.category_id
            where customer.customer_id = ${request.body.customer_id};
            `);
            return {movies}
    })


    fastify.get("/customers", async (request, reply)=>{
        const [customers] = await fastify.mysql.execute(`
            SELECT * from customer
            `)
        return {customers}
    })
    fastify.post("/customers", async (request, reply)=>{
        const [customers] = await fastify.mysql.execute(`
            SELECT * from customer
            WHERE customer.store_id = ${request.body.store_id}
            `)
        return {customers}
    })

    fastify.post("/movie", async (request, reply) =>{
        console.log(request.body.store_id)
        const [movieInfo] = await fastify.mysql.execute(`
            SELECT Distinct film.film_id, film.title, film.description, language.name as "language", film.length, film.release_year from film
            JOIN language on film.language_id = language.language_id
            JOIN inventory on film.film_id= inventory.film_id
            JOIN store on store.store_id = inventory.store_id
            WHERE store.store_id = ${request.body.store_id} AND film.film_id = ${request.body.film_id}
            `)
        return {movieInfo}
    })

}