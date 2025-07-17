# React + Vite
## MySQL part
1. You should have MySQL installed and have the sakila database running.

You should add to the customer table the following user:
```mysql
first_name: admin
last_name: admin
email: admin@mail.com
store_id: 1
address_id: 109
```

2. This will be useful to have specific menus and page access only available to the admin
Command to add the user to the customer table using MySQL Workbench
```mysql
use sakiala
insert into customer ( store_id, first_name, last_name, email, address_id, active, create_date)
                values (1, admin, admin, admin@mail.com, 109, 1, now());
```

## Development

### Dependencies
In the main folder, install the dependencies with `npm install`
Do the same for the server: `cd mock-srv && npm install`

## Credentials
1. Create an `.env` file on `mock-srv`
1. Add the password of the MySQL database to the file

### Run the project
1. Client: `npm run dev`
2. Server: `cd mock-srv && npm run dev`
