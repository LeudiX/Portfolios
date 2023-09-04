/*******************************************************/
/*CANVAS DRAW SECTION*/
/*******************************************************/
const section = document.getElementsByTagName("section");
const title = document.getElementById("title1");
var canvas = document.getElementById('canvas');


/*section[0].insertBefore(canvas, title);*/  /*Inserting canvas before title component*/

var context = canvas.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;

canvas.width = W;
canvas.height = H;

var fontSize = 15;
var columns = Math.floor(W / fontSize);
var drops = [];
for (var i = 0; i < columns; i++) {
    drops.push(0);
}
var str = "70v4$(51pt H4c61n& E{}3ct 8Y L3U)1X";
function draw() {
    context.fillStyle = "rgba(0,0,0,0.05)";
    context.fillRect(0, 0, W, H);
    context.fontSize = "700" + fontSize + "px";
    context.fillStyle = "#009400";
    for (var i = 0; i < columns; i++) {
        var index = Math.floor(Math.random() * str.length);
        var x = i * fontSize;
        var y = drops[i] * fontSize;
        context.fillText(str[index], x, y);
        if (y >= canvas.height && Math.random() > 0.99) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
draw();
setInterval(draw, 35);

/****************************************************/
/*NAVBAR STICKY ANIMATION*/
/****************************************************/
// Get the navbar and the logo
var navbar = document.getElementById("navbar");
var logo = document.getElementById("logo");

//Get the button
var mybutton = document.getElementById("myBtn");


//default navbar backgroundcolor
navbar.style.backgroundColor = "#081b4b";
navbar.style.width = "100%";

// When the user scrolls down 20px from the top of the document, show the button
// When the user scrolls the page, execute StickyNavbarAndScrollFunction
window.onscroll = function () { StickyNavbarAndScrollFunction() };

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function StickyNavbarAndScrollFunction() {

    if (window.scrollY > sticky) {
        logo.setAttribute("src", "/imgs/logo12-bgnew.png");
        navbar.style.backgroundColor = "#122b69";
        navbar.classList.add("sticky");
        mybutton.style.display = "block";
   
    } else {
        logo.setAttribute("src", "/imgs/logo12.png");
        navbar.style.backgroundColor = "#081b4b";
        navbar.classList.remove("sticky");
        mybutton.style.display = "none";
    }
}

/****************************************************/
/*SCROLL BUTTON GO TO UP*/
/****************************************************/
 // When the user clicks on the button, scroll to the top of the document
 function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
 
  
 

 

 



