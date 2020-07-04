# Delilah_Res

Acamica's project to make a restful api with nodejs tools

---

#Technologies and packages used for development

- Node.js
- Nodemon
- Express
- JWT
- Sequelize
- MySQL
- Postman (endpoints y testing)
- Swagger para documentación de API

### Acamica final project of a restful API for a restaurant

---

## Project installation and initialization

#### 1 - Clone project from GitHub

- Clone the repository from the following link: https://github.com/jofer1923/Delilah_Res

- From the console, execute the following statement:
  git clone https://github.com/jofer1923/Delilah_Res

#### 2 - Installing Console Dependencies

Into the console type the next code line `npm install`

#### 3 - Import the dataBase

- Open XAMPP and make sure that the port on which it is running is 3307
- Initialize Apache and MySQL services
- Open the next [http://localhost/] and make click on _phpMyAdmin_ option
- In _phpMyAdmin_ go to the delilahresto database, then you will select the option to import into _phpMyAdmin_ and you will search for the **importRest.sql** file located in the directory. This directory should have been downloaded when the project was cloned

#### 4 - Start Server on Console

`npm run nodemon` that it will be running on port 3000 how is showed in the next link [http://localhost:3000]

#### 5 - It is ready to use!

You can now test the provided endpoints to make use of the API and database connection

(Make sure the Delilah Restó enviroment is selected so you can access the enviroment variables)
