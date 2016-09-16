# Assignment 4

This is a continuation of [Assignment 3](https://github.com/erkartik91/assignment3). As a part of this assignment, you will focus on interacting with the remote server (https://cpen400a.herokuapp.com/products)
to fetch the product items. You will need to build on your previous code - no code will be provided by us for this assignment. 

## Tasks

1. **Fetch products from server using AJAX:** You will initialize your **product** variable by making an AJAX call to the following url. The **cart** variable will be initialized to empty like the previous assignment. 
  ```
  https://cpen400a.herokuapp.com/products
  
  var cart = {
    'productName1' : 0,
    'productName2' : 0,
    ...
  };
  ```
  You **do not** need to keep price information in the cart as that information is already there in the products array. When calculating the total price of the products in cart, you can use the price information from the products array. Please feel free to assign prices to products as you see fit.

2. **Handle Timeout / Error:** The remote server you are fetching the data from is not very reliable. Sometimes, instead of returning the product list the server takes long time, due to which the ajax request times out. Also, sometimes the server returns error 500 instead of the product list. In either case, you will need to make repeated AJAX calls untill you get the list of products from the web server (you can give up after a reasonable number of such repeated tries).

3. **Synchronize the price / quantity before checkout:** In your show cart modal you need to present the user with a checkout button. When the user clicks on checkout, you will need to make sure that the products are still available in the back store and the prices are updated. You will do that by making another AJAX call to the same url. Therefore, when the user clicks on checkout, you will alert the user with the message showing that you are confirming the final total price as well as the availability.  If there is any price change, you will need to alert the user for each product for which the price changed. For any of the selected products, if the quantity that the user ordered is not available any more, you will change the number of products in the cart to the now available quantity. You will also need to alert the user about the updated quantity as well. The cart variable should also be updated to reflect the revised prices/quantity.

4. **Update Cart modal and show total price:** Once you have the updated cart information, you will need to update the cart information shown to the user. Also, you will alert the uset with the total amount due (based on the cart's contents).

## Bonus Task
The code for the server used for the server side application, is made available at https://github.com/erkartik91/cpen400. The instructions to run the server locally are available in the readme file.
You need to have the server up and running in your local machine as well as you will need to host the same application on Heroku servers. You can create a free account to deploy this application. The task is only considered complete, if you have it setup on your local machine as well as on Heroku. The instructions to run on local machine are provided in the read me file. For deploying to Heroku, please follow the instructions given on their website.

## Submission instructions:

* Add a folder called **assignment4** in your github repo.
* Copy the code from your assignment3
* Update the code to reflect the changes for this assignment.
* Make sure you push your changes before midnight (11:59 PM) before the day when assignment is due - late submissions will not be accepted.
* We will be downloading the code on the midnight before the due date, any changes to code after that point will not be considered for marking.
