![project cover](https://user-images.githubusercontent.com/66588352/147418865-ff315bff-243e-4f5e-9de4-119bbfce6133.png)

# The Universal Auth System
## Using The MERN Stack Including Mysql

### --> The project is divded to two separte projects
 #### 1- The Client side ->
- containing the react project ``Front-End``
- the client Auth Functions and storing user tokens methods
- powered with the <strong>Tailwind CSS</strong> frameWork for styling perposes
- using `JWT` package to `create, handle, decode` tokens
- `Axios` package used to create the http requests & hnadling the connections between the back,front servers
---------------------------------------------------------
#### 2- The Server side ->
- containing the Node project `Back-End`
- The server Auth Main Functions --> `Register, login, logout`
- verfiy mail by sending otp from the server to the client mail Using `NodeMailer`
- Forget password by sending new pass from the server to client mail & ask him to change it once logged in again
- update Client account Password & verfiy the user before updating using `JWT Verfiy`
- Refresh Tokens function to update user Access token in case of expiration
-----------------------------------------------------------

## Setup Steps
- install `Docker` And init the `docker compose file` included in the project --> Optinal (you can use your favorate mysql database)
- create db for your project in `phpmyadmin` interface
- init the `db.sql` file included in the root of the project by copying it in the sql section on phpmyadmin it will create all the tables for you
- open `sever-side` project
- init `npm install` command in it to install necessary packages included in the `packages.json` file
- create the `.env` file on the project and you will fint a .env example file in the project root compy it and place your info in it

---> you should create somthing like that
```
DATABASEHOST = 'db host'
DATABASEUSER = 'db username'
DATABASEPASSWORD = 'db password'
DATABASE = 'db name'

JWT_SECRET = 'JWT secret' // commoly we use HS256
,JWT_REFRESH_SECRET = 'JWT refresh secret' // commoly we use RS256
,JWT_EXPIRES_IN = 'expriration  time' // see the jwt package docs for more info about that 

PORT = 5000 // change it if you want to use another port

MAIL_SERVER = Gmail // for testing i use a new gamil made for dveloping only and enabel the low applications securty access to be able to send from it by nodemailer
MAIL_USER = 'your email'
MAIL_PASS = 'email password'
```
- init command `npm start` in the terminal
- start Testing and add-on the rest of your project

 ##### after finishing from the back it's time for the front -->

- open teh project in another directory
- init `npm install` command to install the nesscary packages
- init `npm start` command to start your front-end server
- now you have your front & back sides workig fine
- Well done... now it's time to start building your project and impress the world with your ideas

##### ps:
- The system might have some problems if founded please report it to me so I can fix it in the future
- please if there is any comments for better exprenice or security send to me to help the system be better for the other developers
- the technolgy which used to create the server is Express Genertaor you can check it out from <a href="https://expressjs.com/en/starter/generator.html">here</a>
- in the server mailing section you can use your personal Gmail account to send the mails for testing but you need to Allow security option in Gmail called `Allow less secure apps` as i metion in the .env file setup
----------------------------------------------------------------

### Used Techs Reference:

| #  | Technology                                      | Description                                             |
| -- |:-----------------------------------------------:| :-------------------------------------------------------|
| 1  | [Node.js](https://nodejs.org/en/l)              |  javascript frame work                                  |
| 2  |[express.js](https://expressjs.com)              | server creator and handler package                      |
| 3  | [react.js](https://reactjs.org)                 | the main front end framework                            |
| 4  | [tailwindcss](https://tailwindcss.com)          | the styling css framework                               |
| 5  | [JWT](https://jwt.i)                            | json web tokens used to create and handle access tokens |
| 6  | [axios](https://axios-http.com/)                | the http request handler package                        |
| 7  | [bcrypt](https://www.npmjs.com/package/bcrypt)  | package to encrypt passwords                            |
| 8  | [nanoid](https://www.npmjs.com/package/nanoid)  | the package used to create ids                          |
| 9  | [dotenv](https://www.npmjs.com/package/dotenv)  | used to storing secret varaibles                        |
| 10 | [nodemon](https://www.npmjs.com/package/nodemon)| for server handling                                     |
| 11 | [docker](https://hub.docker.com/)               | used to init the mysql & phpmyadmin containers          |
