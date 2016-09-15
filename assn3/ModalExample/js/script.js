var cart = new Object();
var products = new Object();
var inactiveTime = 300;
var timeoutTracker;

function initPage() {
	runTimer();
}

function addToCart(productName) {
	resetInactiveTimeout();
	if (!cart.hasOwnProperty(productName)) {
		cart[productName] = 1;
	} else {
		cart[productName]++;
	}
}

function removeFromCart(productName) {
	resetInactiveTimeout();
	if (!cart.hasOwnProperty(productName)) {
		window.alert("This item is not listed in your cart.");
	} else if (cart[productName] == 1) {
		delete cart[productName];
	} else {
		cart[productName]--;
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
		window.alert("Your Cart is Empty! To add or remove an item from your cart, click the 'add' or 'remove' buttons.");
	} else {
		for (var name in cart) {
			displayAfterTimeout(time, name + ": " + cart[name]);
			time += 5 * 1000;
		}
	}
}

function displayAfterTimeout(timeout, content) {
	setTimeout(function() {
		window.alert(content);
	}, timeout);
}

function resetInactiveTimeout() {
	inactiveTime = 20;
}

function runTimer() {
	setInterval(function() {
		inactiveTime--;
		if (inactiveTime <= 0) {
			window.alert("Hey there!  Are you still planning to buy something?");
			inactiveTime = 300;
		}
	}, 1000);
}