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

// grabbing DOM elements
var showCart  = document.getElementById("showCart");
var closeCart = document.getElementById("closeCart");
var pList = document.getElementById("productTable");
var pBody = document.getElementById("pBody");
var timeoutVal = document.getElementById("timeoutValue");
var cartList = document.getElementById("cartList");

function initPage() {
	runTimer();
}

function addToCart(productName) {

	resetInactiveTimeout();
	var p = product[productName];
	
	if (p.quantity === 0) {
		window.alert("There are no " + productName + " left in stock");
	} else {
		cart[productName]++;
		p.quantity--;
		updateCartPrice();
		var mtp = modalTP();
		document.getElementById("tp").innerHTML = "$" + mtp;
	}
	
}

function removeFromCart(productName) {
	resetInactiveTimeout();
	var p = product[productName];
	
	if (cart[productName] === 0) {
		window.alert("There are no " + productName + " in your cart.");
	} else {
		cart[productName]--;
		p.quantity++;
		updateCartPrice();
		var mtp = modalTP();
		document.getElementById("tp").innerHTML = "$" + mtp;
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

function showCart() {
	var time = 0;
	
	if (isEmpty(cart)) {
		window.alert("Your Cart is Empty! To add an item to your cart, hover over any item and click 'add.' To remove an item from your cart, click 'remove.'");
	} else {
		for (var name in cart) {
			displayAfterTimeout(time, name + ": " + cart[name]);
			time += 5 * 1000;
		}
	}
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
	
	var j = 0;
	
	for (var name in cart) {
		var p = product[name];
		
		if (cart[name] > 0) {
			
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
			
			pqIds[j].setAttribute("id", name); 				// label each product quantity element
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
	
	z.setAttribute("id", "tp");
	
	y.appendChild(t);
	z.appendChild(pr);
	
	x.appendChild(y);
	x.appendChild(z);
	pBody.appendChild(x);	
	
	
	
	
}

function atcFunc (nm) {
	//window.alert("in here");
	
	return function () {
		//window.alert("heyadd " + nm);
		
		addToCart(nm);
		document.getElementById(nm).innerHTML = cart[nm];
		
	}
}

function rfcFunc (nm) {
	//window.alert("in here");
	
	return function () {
		//window.alert("heyrem " + nm);
		if(cart[nm] == 1){
			var temp = document.getElementById(nm + "row");
			pBody.removeChild(temp);
		}
		removeFromCart(nm);
		document.getElementById(nm).innerHTML = cart[nm];
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