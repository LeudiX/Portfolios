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
* !Working with the Contact modal
*/
// Get the button that opens the modal
let btn1 = document.getElementById("contacts1");

// Get the Contacts modal
let contactM = document.getElementById("contactModal");

// Dissapearing the ContactM from display
contactM.style.display = "none";

// Get the modal-content element that represent the contents of the modal
let modalcnt1 = document.getElementsByClassName("modal-content")[0];

// When the user clicks on the button, open the modal and add css class "animetop" for animation
btn1.onclick = function () {
    contactM.style.display = "block";
    modalcnt1.classList.add("animatetop");
}
