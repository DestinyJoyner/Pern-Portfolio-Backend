# Destiny Pern Portfolio Backend Repo

This backend server is intended to be used with my [Calendar Application Repo Here!](https://github.com/DestinyJoyner/Pern-Portfolio-Project-frontend)

This server was built using EXPRESS, JWT (JSON web token), BCRYPT, and EXPRESS-VALIDATOR 

## Instructions

- Clone down this repo

- Once opened run `npm i` in your terminal

- Create a `.env` file and create a variable `PORT` with the value of the local host you will be running on

- To the `.env` file, add a `SECRET_TOKEN` variable and set to a generated hex value you can get here -> https://www.browserling.com/tools/random-hex

- This `SECRET_TOKEN` value is needed in order to successfully implement the user authentication/ web token features

- Once the front end application is cloned down as well (link above), use your local host port and url as the environmental variable in the front end application.