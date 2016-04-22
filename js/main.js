window.addEventListener('load', function() {
	// function for using the hamburger in header navigation menu
	var hamb = document.getElementById('hamb');
	var cross = document.getElementById('cross');
	var list = document.getElementById('list');
	var header = document.getElementById('header');
	// catching of DOM elements for work with table
	var prices = document.getElementById('prices');
	var price1 = document.getElementById('price1');
	var price2 = document.getElementById('price2');
	var price3 = document.getElementById('price3');
	// catching of slider elements
	var comments = document.getElementById('comments');
	var com1 = document.getElementById('comment1');
	var com2 = document.getElementById('comment2');
	var com3 = document.getElementById('comment3');
	var prev = document.getElementById('prev_page');
	var next = document.getElementById('next_page');
	var comD = document.getElementById('comments_display');
	// 300 ms delay remove
	FastClick.attach(hamb);
	FastClick.attach(cross);
	FastClick.attach(prev);
	FastClick.attach(next);
	// it open navigation
	hamb.addEventListener('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		if(!(cross.classList.contains("show"))) {
			cross.classList.add("show");
		}
		if(!(list.classList.contains("show"))) {
			list.classList.add("show");
		}
		if(!(hamb.classList.contains("hide"))) {
			hamb.classList.add("hide");
		}
		if(!(header.classList.contains("paint"))) {
			header.classList.add("paint");
		}
	});
	// it hide navigation
	cross.addEventListener('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		if(cross.classList.contains("show")) {
			cross.classList.remove("show");
		}
		if(list.classList.contains("show")) {
			list.classList.remove("show");
		}
		if(hamb.classList.contains("hide")) {
			hamb.classList.remove("hide");
		}
		if(header.classList.contains("paint")) {
			header.classList.remove("paint");
		}
	});
	// function for swipe detecting 
	var swipeHorizontal = function(space, toLeft, toRight, markInputs) {
		var initialPoint;
		var finalPoint;
		space.addEventListener('touchstart', function(event) {
			event.preventDefault();
			event.stopPropagation();
			initialPoint=event.changedTouches[0];
		}, false);
		space.addEventListener('touchend', function(event) {
			event.preventDefault();
			event.stopPropagation();
			finalPoint=event.changedTouches[0];
			var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
			if (xAbs > 20) {
				if (finalPoint.pageX < initialPoint.pageX) {
					toLeft();
				}
				else {
					toRight();
				}
			}
			markInputs();
		}, false);
	};

	// slider of price-table

	// function witch move table in dependence of media query
	var moveTable = function (event) {
		if (window.matchMedia("(min-width: 700px)").matches) {
			prices.style.marginLeft = "";
		}
		else {
			if (price1.checked) {
				prices.style.marginLeft = "20px";
			}
			if (price2.checked) {
				prices.style.marginLeft = "-259px";
			}
			if (price3.checked) {
				prices.style.marginLeft = "-535px";
			}
		}
	};
	window.addEventListener("load", moveTable);
	window.addEventListener("resize", moveTable);

	// main cod of slider, it moving by changing of radio buttons
	price1.addEventListener('change', function(event) {
		event.preventDefault();
		prices.style.marginLeft = "20px";
	});
	price2.addEventListener('change', function(event) {
		event.preventDefault();
		prices.style.marginLeft = "-259px";
	});
	price3.addEventListener('change', function(event) {
		event.preventDefault();
		prices.style.marginLeft = "-535px";
	});
	//functions for swipe sliding
	var toLeft1 = function() {
		if (window.matchMedia("(max-width: 699px)").matches) {
			var a = parseInt(prices.style.marginLeft, 10);
			if (a===20) {
				prices.style.marginLeft = "-259px";
			}
			if (a===-259) {
				prices.style.marginLeft = "-535px";
			}
		}
	};
	var toRight1 = function() {
		if (window.matchMedia("(max-width: 699px)").matches) {
			var a = parseInt(prices.style.marginLeft, 10);
			if (a===-535) {
				prices.style.marginLeft = "-259px";
			}
			if (a===-259) {
				prices.style.marginLeft = "20px";
			}
		}
	};
	var markInputs1 = function() {
		if (prices.style.marginLeft === "20px") {
			price1.checked = true;
		}
		if (prices.style.marginLeft === "-259px") {
			price2.checked = true;
		}
		if (prices.style.marginLeft === "-535px") {
			price3.checked = true;
		}
	};
	// swipe slider it self
	swipeHorizontal(prices, toLeft1, toRight1, markInputs1);

	// slider of comments


	// that cod for changing of comment-slider in dependance of media query and selected comment
	window.addEventListener("resize", function(event) {
		var prop = parseInt(comments.style.marginLeft, 10);
		var a = window.matchMedia("(min-width: 1200px)").matches;
		var b = window.matchMedia("(min-width: 700px)").matches;
		var delta;
		if (a && b && (prop % 700 === 0)) {
			delta = prop/700;
			comments.style.marginLeft = delta * 1200 + "px";
		}
		if (!a && b) {
			if (prop%1200 === 0) {
				delta = prop/1200;
			}
			if (prop%320 === 0) {
				delta = prop/320;
			}
			comments.style.marginLeft = delta * 700 + "px";
		}
		if (!a && !b && (prop%700 === 0)) {
			delta = prop/700;
			comments.style.marginLeft = delta * 320 + "px";
		}
	});
	function diff() {
		if (window.matchMedia("(min-width: 1200px)").matches) {
			return 1200;
		}
		else if (window.matchMedia("(min-width: 700px)").matches) {
			return 700;
		}
		else {
			return 320;
		}
	}
	var checkComment = function() {
		if (comments.style.marginLeft === "0px") {
			com1.checked = true;
		}
		if ((comments.style.marginLeft === "-1200px") || (comments.style.marginLeft === "-700px") || (comments.style.marginLeft === "-320px")) {
			com2.checked = true;
		}
		if ((comments.style.marginLeft ==="-2400px") || (comments.style.marginLeft === "-1400px") || (comments.style.marginLeft === "-640px")) {
			com3.checked = true;
		}
	};
	// listeners for buttons previous comment and next comment
	prev.addEventListener('click', function(event) {
		event.preventDefault();
		var count1 = parseInt((comments.style.marginLeft), 10);
		if (count1 < 0) {
			comments.style.marginLeft = (count1 + 1200)+"px";
		}
		else {
			comments.style.marginLeft = "0px";
		}
		checkComment();
	});
	next.addEventListener('click', function(event) {
		event.preventDefault();
		var count2 = parseInt((comments.style.marginLeft), 10);
		if (count2 > -2400) {
			comments.style.marginLeft = (count2 - 1200)+"px";
		}
		else {
			comments.style.marginLeft = "-2400px";
		}
		checkComment();
	});
	// main cod of slider, it moving by changing of radio buttons
	com1.addEventListener('change', function(event) {
		event.preventDefault();
		comments.style.marginLeft = "0px";
	});
	com2.addEventListener('change', function(event) {
		event.preventDefault();
		comments.style.marginLeft = "-"+diff()+"px";
	});
	com3.addEventListener('change', function(event) {
		event.preventDefault();
		comments.style.marginLeft = "-"+diff()*2+"px";
	});
	// functions for swipe sliding
	var toLeft2 = function() {
		var a = parseInt(comments.style.marginLeft, 10);
		if ((window.matchMedia("(min-width: 700px)").matches) && (window.matchMedia("(max-width: 1199px)").matches) && (a > -1400)) {
			comments.style.marginLeft = (a - 700)+"px";
		}
		if ((window.matchMedia("(max-width: 699px)").matches) && (a > -640)) {
			comments.style.marginLeft = (a - 320)+"px";
		}
	};
	var toRight2 = function() {
		var a = parseInt(comments.style.marginLeft, 10);
		if ((window.matchMedia("(min-width: 700px)").matches) && (window.matchMedia("(max-width: 1199px)").matches) && (a < 0)) {
			comments.style.marginLeft = (a + 700)+"px";
		}
		if ((window.matchMedia("(max-width: 699px)").matches) && (a < 0)) {
			comments.style.marginLeft = (a + 320)+"px";
		}
	};
	// swipe slider it self
	swipeHorizontal(comD, toLeft2, toRight2, checkComment);

	// Adaptive google map
	function initialize () {     
		var myLatlng = new google.maps.LatLng(59.936352, 30.32109700000001);
		var myOptions = {
			zoom: 15,
			center: myLatlng
		};
		var mapPlace = new google.maps.Map(document.getElementById("map"), myOptions);
		var pointer = "/img/target.png";
		var beachMarker = new google.maps.Marker({
			position: myLatlng,
			map: mapPlace,
			icon: pointer
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize);
	google.maps.event.addDomListener(window, 'resize', initialize);
}, false);