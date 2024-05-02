
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

/******************************************************/
/*CONTACT MODAL*/
/******************************************************/
// Get the contact modal
var modal = document.getElementById("contactModal");

// Get the button that opens the modal
var btn = document.getElementById("contacts1");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}








