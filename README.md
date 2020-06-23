# Warehouse App
> Project for **Programming technologies - internet systems** course

## Table of contents
* [Live version](#demo)
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)

## Demo
Live version: [Heroku](https://warehouse-front.herokuapp.com)
for admin functionality login as **admin/admin**

## General info
Features:
* adding a new 
    * item
    * location
* displaying details about: 
  * item in stock
  * name
  * location
  * number of pieces available
  * price 
* removing the item when number of pieces equals 0.
* security with JWT
* create new order

## Screenshots
![products](./readme-screenshots/products.jpg)
![edit product](./readme-screenshots/edit-product.jpg)

## Technologies
* **React** 16.13.1
* **Material-UI**  4.9.14
* **Axios**  0.19.2
* **Java**  8
* **Spring Boot**  2.2.7
    * Web
    * Data JPA
    * Data Rest
    * Security
    * H2 Database
* **Java JWT**  0.9.1
* **Frontend maven plugin**  1.6

## Setup
Run `$ mvn clean install`
