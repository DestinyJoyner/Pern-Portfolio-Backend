# Destiny Pern Portfolio Backend Repo

This backend server is intended to be used with my [Calendar Application Repo Here!](https://github.com/DestinyJoyner/Pern-Portfolio-Project-frontend)

This server was built using EXPRESS, POSTGRESQL, JWT (JSON web token), BCRYPT, and EXPRESS-VALIDATOR 

## Instructions

- Clone down this repo

- Once opened run `npm i` in your terminal

- Create a `.env` file and create a variable `PORT` with the value of the local host you will be running on

- To the `.env` file, add a `SECRET_TOKEN` variable and set to a generated hex value you can get here -> https://www.browserling.com/tools/random-hex

- This `SECRET_TOKEN` value is needed in order to successfully implement the user authentication/ web token features

- You will need to be connected to your local database (POSTGRESQL) in order to successfully run the `.sql` files in the database folder.

- You can run the command `npm run dbinit` in your terminal to create the tables necessary for this application

- There isn't any initial seed data for this application, however if you choose to add your own you can run the `npm run dbseed` command to seed the data into your tables

- Once you're all set up, run the command `npm run dev` in your terminal to start up the server

- Once the front end application is cloned down as well (link above), use your local host port and url as the environmental variable in the front end application.