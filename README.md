# React + Vite
Steps to make it work:
<p> You should have Mysql installed and have the sakila database running.</p>
<p> If you know how, you should add, to the customer table, the following user: </p>
<ul>
  <li>first_name: admin</li>
  <li>last_name: admin</li>
  <li>email: admin@mail.com</li>
  <li>store_id: 1</li>
  <li>address_id: 109</li>
</ul>
<p> This will be usefull to have specific menus and page access only available to admin</p>
<p> Command to add the user to the customer table using Mysql Workbench</p>
<p>use sakiala; </p>
<p>  insert into customer ( store_id, first_name, last_name, email, address_id, active, create_date)
                values (1, admin, admin, admin@mail.com, 109, 1, now());
</p>
<br></br>
<ol>
  <li><span style="bold">run: </span> npm install  (on main folder and mock-srv)</li>
  <li>create .env file on root (folder mock-srv) - this file will take the password you defined to access your MySql databases</li>
</ol>

<p>To run the client side: on the project root, run: npm run dev</p>
<p>To run the "server" side: on the mock-srv root, run: npm run dev</p>
