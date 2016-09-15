var cart = {
	'Box1': 0,
	'Box2': 0,
	'Clothes1': 0,
	'Clothes2': 0,
	'Jeans': 0,
	'Keyboard': 0,
	'KeyboardCombo': 0,
	'Mice': 0,
	'PC1': 0,
	'PC2': 0,
	'PC3': 0,
	'Tent': 0
};

var product = {
	'Box1' : {
		'price': 10,
		'quantity': 10,
		'name': 'Box1'
	},
	'Box2': {
		'price': 5,
		'quantity': 10,
		'name': 'Box2'
	},
	'Clothes1': {
		'price': 20,
		'quantity': 10,
		'name': 'Clothes1'
	},
	'Clothes2': {
		'price': 30,
		'quantity': 10,
		'name': 'Clothes2'
	},
	'Jeans': {
		'price': 50,
		'quantity': 10,
		'name': 'Jeans'
	},
	'Keyboard': {
		'price': 20,
		'quantity': 10,
		'name': 'Keyboard'
	},
	'KeyboardCombo': {
		'price': 40,
		'quantity': 10,
		'name': 'KeyboardCombo'
	},
	'Mice': {
		'price': 20,
		'quantity': 10,
		'name': 'Mice'
	},
	'PC1': {
		'price': 350,
		'quantity': 10,
		'name': 'PC1'
	},
	'PC2': {
		'price': 400,
		'quantity': 10,
		'name': 'PC2'
	},
	'PC3': {
		'price': 300,
		'quantity': 10,
		'name': 'PC3'
	},
	'Tent': {
		'price': 100,
		'quantity': 10,
		'name': 'Tent'
	}
};

var inactiveTime = 300

function initPage() {
	runTimer();
}

// grabbing DOM elements
var showCart  = document.getElementById("showCart");
var closeCart = document.getElementById("closeCart");
var pList = document.getElementById("productTable");
var pBody = document.getElementById("pBody");
var timeoutVal = document.getElementById("timeoutValue");
var cartList = document.getElementById("cartList");
var ajaxAttempts = 0;
var imagePriceIds = document.getElementsByClassName("price");
var space = "\u2002";

function addToCart(productName, Modal) {

	resetInactiveTimeout();
	var p = product[productName];
	//console.log(p.quantity);
	if (p.quantity === 0) {
		window.alert("Sorry! We Have No " + productName + "'s Left In Stock :(");
	} else {
		cart[productName]++;
		p.quantity--;
		updateCartPrice();
		
		if(Modal){
			var mtp = modalTP();
			document.getElementById("tp").innerHTML = "$" + mtp;
		}
	}
	
}

function removeFromCart(productName, Modal) {
	resetInactiveTimeout();
	var p = product[productName];
	
	if (cart[productName] === 0) {
		window.alert("Sorry! There Aren't Any " + productName + "'s In Your Cart! \nPlease Click The Add Button To Place An Item Into Your Cart.");
	} else {
		cart[productName]--;
		p.quantity++;
		updateCartPrice();
		
		if(Modal){
			var mtp = modalTP();
			document.getElementById("tp").innerHTML = "$" + mtp;
		}
	}
}

function isEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			return false;
		}
	}	
	return true;
}


function updateCartPrice() {
	var totalPrice = 0;
	
	for (var name in cart) {
		var p = product[name];
		totalPrice += cart[name] * p.price;	
		showCart.innerHTML = "Show cart ($" + totalPrice + ")";
	}
}
	
function populateCart() {
	var tp = 0;	
	
	var row = [];
	var pn = [];
	var qty = [];
	var prc = [];
	
	var pqIds = [];	
	var ppIds = [];
	var ab = [];
	var sb = [];
	var addIds = [];
	var subIds = [];
	
	var emptystr;
	
	var j = 0;
	
	for (var name in cart) {
		var p = product[name];
		
		if (cart[name] > 0) {
			
			emptystr = document.createTextNode("");		
			row[j] = document.createElement("tr");
			pqIds[j] = document.createElement("td"); 		//product quantity
			ppIds[j] = document.createElement("td"); 		//product price
			addIds[j] = document.createElement("td");			//
			subIds[j] = document.createElement("td");			//
			
			
			ab[j] = document.createElement("input"); 		//add button
			sb[j] = document.createElement("input"); 		//subtract button
			
			
			pn[j] = document.createTextNode(name);
			qty[j] = document.createTextNode(cart[name]);
			prc[j] = document.createTextNode("$" + p.price);
			
			pqIds[j].setAttribute("id", name + "stock"); 				// label each product quantity element
			ppIds[j].setAttribute("id", name + "price");
			row[j].setAttribute("id", name + "row")
				
			
			ab[j].setAttribute("id", name + "addbtn");
			ab[j].setAttribute("type", "button");
			ab[j].setAttribute("value", "+");
				
			sb[j].setAttribute("id", name + "subbtn");
			sb[j].setAttribute("type", "button");
			sb[j].setAttribute("value", "-");			
	
			
			pqIds[j].appendChild(qty[j]);
			ppIds[j].appendChild(prc[j]);
			addIds[j].appendChild(ab[j]);
			subIds[j].appendChild(sb[j]);
			
			row[j].appendChild(pn[j]);
			row[j].appendChild(ppIds[j]);
			row[j].appendChild(pqIds[j]);
			
			row[j].appendChild(addIds[j]);
			row[j].appendChild(subIds[j]);
			
			pBody.appendChild(row[j]);
			
			tp += cart[name] * p.price;		// add total cart items
			
			//set the add and subtract quantity buttons
			var atc = document.getElementById(name + "addbtn").onclick = atcFunc(name);
			var rfc = document.getElementById(name + "subbtn").onclick = rfcFunc(name);
						
			j++; 	// increment product quantity id
		}
		
		
	}
	
	
	var x = document.createElement("tr");
	var y = document.createElement("td");
	var z = document.createElement("td");
	
	var t = document.createTextNode("Total Price:");
	var pr = document.createTextNode("$" + tp);
	
	var t1 = document.createTextNode("");
	var t2 = document.createTextNode("");
	var t3 = document.createTextNode("");
	var t4 = document.createTextNode("");

	z.setAttribute("id", "tp");
	
	y.appendChild(t);
	z.appendChild(pr);

	x.appendChild(y);
	x.appendChild(z);

	pBody.appendChild(x);
	

}

//Handler function for checkout button
var modalCheckout = function() {
	getProductsRequest();
	setTimeout(checkoutRequest(), 3000);
}


// adds an item to cart via modal
function atcFunc (id) {	
	return function () {
		
		addToCart(id, true);
		document.getElementById(id + "stock").innerHTML = cart[id];
		
	}
}

// removes an item to cart via modal
// removes entire row for each item that reaches 0
function rfcFunc (id) {
	
	return function () {
		if(cart[id] == 1){
			var temp = document.getElementById(id + "row");
			pBody.removeChild(temp);
		}
		removeFromCart(id, true);
		document.getElementById(id + "stock").innerHTML = cart[id];
	}
}

// updates the total price in the modal
function modalTP(){
	var totalPrice = 0;
	
	for (var name in cart) {
		var p = product[name];
		totalPrice += cart[name] * p.price;	
	}
	return totalPrice;
}

function getProductsRequest() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.open("GET", "http://localhost:5000/products", true);	
	xhttp.timeout = 3000; // 1 seconds
	
	xhttp.onload = function() {
		if (xhttp.status == 200) {
			window.alert("Retrieved Data From Server");
			var serverProduct;		
			serverProduct = JSON.parse(xhttp.response);
			var priceChange = [];
			var prevCart = [];

			// save previous cart state
			for(var elem in cart){
				prevCart[elem] = cart[elem];
			}
						
			// updates client-side product object with server-side product object
			console.log("Parsing Data From Server");
			for (var item in serverProduct) {	
				product[item].quantity = serverProduct[item].quantity; // stock is updated here, NOT cart quantity
				product[item].price = serverProduct[item].price; // price is updated here		
			}

			updateCartQuantity();		
			var mtp = modalTP();
			document.getElementById("tp").innerHTML = "$" + mtp;
			updateModalPrice();		
			updateModalQuantity(prevCart, serverProduct);
			updateCartPrice();
						
			var index = 0;
			for (var item in product) {	
				imagePriceIds[index].innerHTML = product[item].price;
				index++;
			}
				
			window.alert("Your New Total Is:" + space + "$" + mtp)
			
		} else if(xhttp.status == 500 ){
			window.alert("Connection Failed Internal Server Error 500");
		} else{
			window.alert("HTTP Request Failed");
		}
	}
	
	xhttp.onerror = function () {
		window.alert("Cannot connect to server");
	}
	
	xhttp.send();
}

// updates the price in modal after server connection
function updateModalPrice(){
	var id;
	var p;
	
	for(var item in cart){
		p = product[item];
		id = p.name;
		if(cart[item] != 0){
			document.getElementById(id + "price").innerHTML = "$" + p.price;
		}
	}
}

// updates the quantity in modal after server connection
function updateModalQuantity(pc,sp){
	var id;
	var p;
	
	// if new stock for an item is 0, remove the item from the modal 
	for(var elem in sp){
		if(pc[elem] > sp[elem].quantity && sp[elem].quantity == 0){
			var temp = document.getElementById(elem + "row");
			pBody.removeChild(temp);
			console.log("Removed" + space + product[elem].name + "\n");
		}
	}
	// otherwise, display updated quantity
	for(var item in cart){
		p = product[item];
		id = p.name;
		if(cart[item] != 0){
			document.getElementById(id + "stock").innerHTML = cart[item];
		}
	}
}

// Notifies user of stock changes
// If user has an item in cart with higher stock,
// the new cart quantity is the new stock value
function updateCartQuantity() {
	var quantityChange = [];
	var count = 0;
	for (var item in product) {
		if (cart[item] > product[item].quantity) {
			quantityChange[count] = product[item].name + ":" + space + product[item].quantity + "\n";
			cart[item] = product[item].quantity;
			product[item].quantity = 0;
			count++;
			
		}
	}
	var msg = "(If Some Items Are Out Of Stock, They Will Be Automatically Removed From Your Cart)\n";
	if(quantityChange.length != 0){
		window.alert("Some Items In Your Cart Have Changed Stock:\n" + msg + "\n" + quantityChange.join(""));
	}
	
}

function checkoutRequest() {

	var xhttp = new XMLHttpRequest();


	xhttp.open("POST", "http://localhost:5000/checkout", true);
	xhttp.timeout = 2000; // 2 seconds
	
	xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
	
	xhttp.onreadystatechange = function() {//Call a function when the state changes.
		if(xhttp.readyState == 4 && xhttp.status == 200) {
			window.alert(xhttp.responseText);
		}
	}
	var jcart = JSON.stringify(cart);
	xhttp.send(cart);
}

function clearCart() {
	while (pBody.firstChild) {
		pBody.removeChild(pBody.firstChild);
	}
}
	
function displayAfterTimeout(timeout, content) {
	setTimeout(function() {
		window.alert(content);
	}, timeout);
}

function resetInactiveTimeout() {
	inactiveTime = 300;
}

function runTimer() {
	setInterval(function() {
		inactiveTime--;
		timeoutVal.innerHTML = inactiveTime;
		if (inactiveTime <= 0) {
			window.alert("Hey there!  Are you still planning to buy something?");
			inactiveTime = 300;
		}
	}, 1000);
}

// attaching event listeners
showCart.addEventListener("click", populateCart, false);
closeCart.addEventListener("click", clearCart, false);

