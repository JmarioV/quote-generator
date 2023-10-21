var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var button = document.querySelector("button");

function setGradient() {
	body.style.background = 
		"linear-gradient(to right, "
		+ color1.value +", "+ color2.value +")";

	css.textContent = body.style.background +";";
}

function hexText(num) {
	var text = "00" + num.toString(16);
	var ln = text.length;
	return text.substring(ln-2);
}

function randomColor() {
	var val1 = Math.floor(Math.random() * 256);
	var val2 = Math.floor(Math.random() * 256);
	var val3 = Math.floor(Math.random() * 256);
	var text = "#" + hexText(val1) + hexText(val2) + hexText(val3);
	return text;
}

function setRandomGrad() {
	color1.value = randomColor();
	color2.value = randomColor();
	setGradient();
}

setGradient();

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);

button.addEventListener("click", setRandomGrad);