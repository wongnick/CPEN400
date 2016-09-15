# Assignment5

In this assignment we will focus on building the backend for the bookstore. You can clone the code from https://github.com/erkartik91/cpen400/ (as given in the previous assignment) to setup your own server on your local machine.
You will need node.js to complete this assignment, so please install node.js if you haven't done so yet. 

## Tasks
1. **Setup mongoDB Database:** You will need to install mongoDB on your laptop. You can find the instructions to install mongoDB [here](https://docs.mongodb.org/manual/installation/). You will need to create the following collections for this assignment. For each collection, we also provide an example of a document, so your document should look similar to these.
  ```
  products
  {
    "_id" : ObjectId("564523c89a9b1a2a4ae35ebe"),
    "name" : "PC1",
    "price" : 32,
    "quantity" : 32,
    "image" : "pathToImage"
  }
  
  orders
  {
    "_id" : ObjectId("f40f3qjfasdfsafssasaadf2"),
    "cart" : "JsonStringForCartObject",
    "total" : 117
  }
  
  users
  {
    "_id" : ObjectId("2fewj90fjadkslsdkfnaldfa"),
    "token" : "Xoe2inasd"
  }
  
  ```
  
  Note that mongoDB will automatically create "_id" field(with unique value) for each documented created. You are free to add your own "id" field for each document if needed. There are many good mongoDB tutorials online, [here](https://docs.mongodb.org/manual/core/crud-introduction/) is one of them. For debug purposes, you can also install RoboMongo which provide an easy GUI.

2. **Fetch products from database:** You can store the product information available at https://cpen400a.herokuapp.com/products into your own database. Follow [this](https://docs.mongodb.org/ecosystem/drivers/node-js/) tutorial on how to install nodejs driver for mongoDB. Once you have mongoDB connection setup correctly, you will need to update the /products endpoint to fetch the data from your database.

3. **Add Checkout functionality:** You will need to create a POST endpoint /checkout in your application. The end point will accept a json formatted object (cart) and total as parameters that you will need to store in your orders table. You will also need to update the JavaScript code in your web application to make this post request when user click on *checkout* button. This task is only considered complete when you have the checkout functionality working completely.

4. **BONUS (1 point): Add authentication to AJAX calls:** Till now, all the AJAX calls that you made to your server had no authentication. However, to prevent misuse of your backend, you need to add authentication to your ajax calls. Any call to fetch product list or checkout should be accompained with a valid token. You can add some entries in your user collection. You will then need to update both /products and /checkpoint endpoint to check for valid token in the request. For now, you can hard code the token from your user table in your JavaScript code. You will need to send token as one of the parameters with the ajax calls to both fetch product list and checkout cart. When you receive the reruest, you need to validate that token passed in the request exists in the user collection. If there is no token or the token passed is invalid, you need to provide a response with error code 401.


## Submission instructions:

* Add a folder called **assignment5** in your github repo.
* Make sure you push your changes before midnight (11:59 PM) before the day when assignment is due - late submissions will not be accepted.
* We will be downloading the code on the midnight before the due date, any changes to code after that point will not be considered for marking.

