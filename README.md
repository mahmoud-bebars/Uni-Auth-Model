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
JWT_REFRESH_SECRET = 'JWT refresh secret' // commoly we use RS256
JWT_EXPIRES_IN = 'expriration  time' // see the jwt package docs for more info about that 

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

### Authentication Apis End-Points

  = (POST) --> login --> localhost:5000/Login (body-data)

  - send request Example :-

  ```
  {
   "phone":"",
   "password":""
  }

  ```

  --> possible errors

  - wrong password

  ```
  {
   "Auth": false,
   "message": "Wrong password, please try Again!"
  }
  ```

  - user doesn't exist

  ```
  {
    "Auth": false,
    "message": "User Doesn't exisit"
  }
  ```

  ---> sucsscefully loged in response example :-

  ```
  {
    "Auth": true,
    "userid": "JLz3mvIZSTtHIpe",
    "username": "m.bebars",
    "email": "mahmoud.bebars.me@gmail.com",
    "type": "client",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJKTHozbXZJWlNUdEhJcGUiLCJlbWFpbCI6Im1haG1vdWQuYmViYXJzLm1lQGdtYWlsLmNvbSIsInR5cGUiOiJjbGllbnQiLCJpYXQiOjE2NDUyMTY0MjgsImV4cCI6MTY0NzgwODQyOH0._VXsNEro4ajdxZWQVeHCJ96YOt4X6FqYNOFkJayPTeM",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJKTHozbXZJWlNUdEhJcGUiLCJlbWFpbCI6Im1haG1vdWQuYmViYXJzLm1lQGdtYWlsLmNvbSIsInR5cGUiOiJjbGllbnQiLCJpYXQiOjE2NDUyMTY0Mjh9.EuY1ILlW1N2lx24Jn2f49irKXeWfNyGzBDRsDZ7HF4Y",
    "message": "user loggedin"
  }
  ```

= (POST) --> logout --> localhost:5000/Logout (header-data)

- send request Example :-

```
{
  headers: {
   Authoritation: // accessToken
   refresh: // refreshToken
 }
}

```

---> sucsscefully loged out response example :-

```
{
  "auth": false,
  "message": "You logged out successfully"
}
```

= (GET) --> user Auth --> localhost:5000/Auth (header-data)

- send request Example :-

```
{
  headers: {
   Authoritation: // accessToken
 }
}

```

--> possible errors

- invaild token

```
{
    "auth": false,
    "message": "Token is invaild"
}
```

---> sucsscefully Auth response example :-

```
{
    "Auth": true,
    "email": "mahmoud.bebars.me@gmail.com",
    "userid": "JLz3mvIZSTtHIpe",
    "type": "client",
    "message": "this account is sgined up & verfied"
}
```

= (POST) --> refresh Token --> localhost:5000/Refresh (header-data)

- send request Example :-

```
{
  headers: {
   refresh: // refreshToken
 }
}

```

--> possible errors

- inavild token

```
{
    "Auth": false,
    "message": "Refresh token isn't valid"
}
```

---> sucsscefully refresh response example :-

```
{
    "Auth": true,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJKTHozbXZJWlNUdEhJcGUiLCJlbWFpbCI6Im1haG1vdWQuYmViYXJzLm1lQGdtYWlsLmNvbSIsInR5cGUiOiJjbGllbnQiLCJpYXQiOjE2NDUyMTcxNzYsImV4cCI6MTY0NzgwOTE3Nn0.SHS7yaKgL2iM68ENNK9lLDLUwtXpL2XyNdKxyhoHrEk",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJKTHozbXZJWlNUdEhJcGUiLCJlbWFpbCI6Im1haG1vdWQuYmViYXJzLm1lQGdtYWlsLmNvbSIsInR5cGUiOiJjbGllbnQiLCJpYXQiOjE2NDUyMTcxNzZ9.v48NBlZBms_UyPrd2jH2QHkiCSuvUgxblu74qv2pqtM",
    "message": "Your token is Refreshed now & good to go"
}
```

= (POST) --> client Sgin up --> llocalhost:5000/ClientSginUp (body-data)

- send request Example :-

```
{
    "username": "m.bebars",
    "firstName": "mahmoud",
    "lastName": "bebars",
    "email": "mahmoud.bebars.me@gmail.com",
    "phone": "01276800115",
    "password": "12345",
    "confirmPassword": "12345"

}
```

--> possible errors

- phone exists

```
{
    "Auth": false,
    "message": "That Phone has been taken"
}
```

- email exist

```
{
    "Auth": false,
    "message": "That Email has been taken"
}
```

- unmatch passwords

```
{
    "Auth": false,
    "message": "Passwords do not match"
}
```

---> sucsscefully sgin up response example :-

```
{
    "Auth": true,
    "username": "m.bebars",
    "userid": "hWU0CLDzMZRtc4t",
    "email": "mahmoud.bebars.me@gmail.com",
    "type": "client",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJoV1UwQ0xEek1aUnRjNHQiLCJlbWFpbCI6Im1haG1vdWQuYmViYXJzLm1lQGdtYWlsLmNvbSIsInR5cGUiOiJjbGllbnQiLCJpYXQiOjE2NDUyMTczODMsImV4cCI6MTY0NzgwOTM4M30.IJ4sytEYMQQ2E_TCC_adchhdd7b7TAF9QZRwcTRH5Ac",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJoV1UwQ0xEek1aUnRjNHQiLCJlbWFpbCI6Im1haG1vdWQuYmViYXJzLm1lQGdtYWlsLmNvbSIsInR5cGUiOiJjbGllbnQiLCJpYXQiOjE2NDUyMTczODN9.K01WkuEn-l2GiJ_49E4iuRlwZhy1bnNITpb9Wg_MpSc",
    "message": "You have Registered successfully, please verfiy your email"
}
```

= (POST) --> Mail verfiy --> localhost:5000/MailVerfiy (body-data)

- send request example

```
{
    "otp": "",
    "Authorization":"barer //acessToken",
    "userid": ""
}
```

--> possible errors

- inavild token

```
{
    "auth": false,
    "message": "Token is invaild"
}
```

- invaild otp

```
{
      verfiy: false,
      message: 'the sended otp is invailed... please try again',
    }
```

---> sucsscefully email verfied response example :-

```
  {
    verfiy: true,
    message: 'your email has been verfied enjoy our service',
  }
```

= (POST) --> reset password by email --> localhost:5000/ResetPass (body-data)

- send request example

```
{
    "email": ""
}
```

---> sucsscefully password reset response example :-

```
  {
    reset: true,
    message:
      'We have send you a secured password log with it and then change it with one your remmeber it',
  }
```

= (PUT) --> update password --> localhost:5000/UpdatePass (body-data)
- send request example

```
{
   "oldPassword": "",
   "newPassword": "",
   "confirmNewPassword": ""
}
```
 --> possible errors

 - password doesn't match
 ```
 {
  changePass: false,
  message: 'New Passwords do not match',
 }
 ```
---> sucsscefully password reset response example :-

```
{
  changePass: true,
  message: 'Your password has been changed successfully',
}
```

-----------------------------------------------------------


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
