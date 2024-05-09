/*
   ____        _                    _ ___   __
  |  _ \      | |                  | (_) \ / /
  | |_) |_   _| |     ___ _   _  __| |_ \ V / 
  |  _ <| | | | |    / _ \ | | |/ _` | | > <  
  | |_) | |_| | |___|  __/ |_| | (_| | |/ . \ 
  |____/ \__, |______\___|\__,_|\__,_|_/_/ \_\
          __/ |                               
         |___/                                
 */
/**
/****************************************************/
/*NAVBAR STICKY ANIMATION*/
/****************************************************/
// Get the navbar and the logo
const navbar = document.getElementById("navbar");
const logo = document.getElementById("logo");

//Get the button
const mybutton = document.getElementById("myBtn");


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
        /*logo.setAttribute("src", "/imgs/logo12-bgnew.png");*/
        navbar.style.backgroundColor = "#122b69";
        navbar.style.borderBottomStyle = "none";
        navbar.style.borderBottomColor = "none";
        navbar.classList.add("sticky");
        mybutton.style.display = "block";

    } else {
        /*logo.setAttribute("src", "/imgs/logo12.png");*/
        navbar.style.backgroundColor = "#081b4b";
        navbar.style.borderBottomStyle = "dashed";
        navbar.style.borderBottomColor = "rgb(255 69 0)";
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