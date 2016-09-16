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
		'name': 'Pc1'
	},
	'PC2': {
		'price': 400,
		'quantity': 10,
		'name': 'Pc2'
	},
	'PC3': {
		'price': 300,
		'quantity': 10,
		'name': 'Ps3'
	},
	'Tent': {
		'price': 100,
		'quantity': 10,
		'name': 'Tent'
	}
};

window.alert("hihihi");

var showCart  = document.getElementById("showCart");
var server = document.getElementById("fromServer");

function getProductsRequest(count) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://cpen400a.herokuapp.com/products", true);	
	xhttp.timeout = 2000; // 2 seconds
	xhttp.send();
	
	xhttp.onreadystatechange = function() {
		if (xhttp.status == 200 && xhttp.readyState == 4) {
			var serverProduct = JSON.parse(xhttp.response);
			
			// updates client-side product object with server-side product object
			for (var item in serverProduct) {
				product[item].quantity = item.quantity;
				product[item].price = item.price;
			}
			
			fromServer.innerHTML = xhttp.response;
		} else {
			fromServer.innerHTML = "not working " + count;
		}
	}
	
	xhttp.ontimeout = function() {
		// request timed out
		if (count < 5) {
			getProductsRequest(count+1);
		} else {
			fromServer.innerHTML = "document not found after " + count + "attempts";
		}
	}
}

function getProducts() {
	getProductsRequest(0);
}

showCart.addEventListener("click", getProducts, false);
