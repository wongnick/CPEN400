var cart = new Object();  //must initialize before usage
var products = new Object();  //must initialize before usage
var inactiveTime = 30;

function addToCart(productName) {
	if (!cart.hasOwnProperty(productName)) {
		cart[productName] = 1;
	} else {
		cart[productName]++;
	}
	inactiveTime = 0;
}

function removeFromCart(productName) {
	if (!cart.hasOwnProperty(productName)) {
		window.alert("Property does not exist!");
	} else if (cart[productName] === 1) {
		delete cart[productName];
	} else {
		cart[productName]--;
	}
	inactiveTime = 0;
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
		window.alert("Cart is empty");
	} else {
		for (var name in cart) {
			displayAfterTimeout(time, name + ": " + cart[name]);
			time += 3 * 1000;
		}
	}
	inactiveTime = 0;
}

function displayAfterTimeout(timeout, content) {
	setTimeout(function() {
		window.alert(content);
	}, timeout);
}

function setInactiveInterval(timeout) {
	setInterval(function() {
		window.alert("Hey there!  Are you still planning to buy something?");
		inactiveTimeout = 0;
	}, timeout);
}