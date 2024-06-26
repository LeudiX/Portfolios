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
// Observer pattern implementation Following SOLID Principles
class Observer {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    notify() {
        this.observers.forEach((observer) => observer());
    }
}

// Create an array of settings
// As the Django backend was added,now i need to render the js and the files by the template and then
//call it by reference here in the settings
const bgTerminalJsPath = STATIC_URL + 'static/js/jquery.bgterminal.js';
const animJsPath =  STATIC_URL + 'static/backcodes/animations.js';
const htmlTempPath = STATIC_URL + 'static/backcodes/openworkca.html';

const $settings = [
    {
        url: animJsPath,
        glow: true,
        speed: 25,
        wait: 0,
    },
    {
        url:bgTerminalJsPath,
        glow: true,
        speed: 25,
        wait: 0,
    },
    {
        url: htmlTempPath,
        glow: true,
        speed: 25,
        wait: 0,
    }
]

//Containers to be handle by bgTerminal
const $terminal = $("<div id='terminal' class='col-md-10 col-sm-10'></div>");
const $terminal2 = $("<div id='terminal2' class='col-md-5 col-sm-5' style='float:right;'></div>");
const $terminal3 = $("<div id='terminal3' class='col-md-5 col-sm-5' style='float:left;'></div>");
const $terminal4 = $("<div id='terminal4' class='col-md-10 col-sm-10'></div>");

//Hide bgTerminal after a period of Time
function hidebgTerminal(container, ms) {
    return new Promise((resolve => {
        setTimeout(function () {
            resolve(
                console.log(`Hidding terminal in ${container} container!!`),
                $(container).removeClass('bgterminal-show'),
                $(container).addClass('bgterminal-hide'),
                console.log(`Terminal hidded in ${container} container.Wait 10 secs`),
            );
        }, ms);
    }))
}

//Show bgTerminal after a period of time
function showbgTerminal(container, ms) {
    return new Promise((resolve => {
        setTimeout(function () {
            resolve(
                console.log(`Showing terminal in ${container} container`),
                $(container).removeClass('bgterminal-hide'),
                $(container).addClass('bgterminal-show'),
                console.log(`Terminal is now visible in ${container} container`)
            );
        }, ms)
    }))
}

//Clean container after a period of time
function clearContainer(container, ms) {
    return new Promise((resolve => {
        setTimeout(function () {
            resolve(
                console.log(`Cleaning ${container} container`),
                $(container).empty(), //Waiting 5 secs before Cleaning container
                console.log(`Container ${container} cleaned`),
                console.log(`Removing container ${container} from containerRow component`),
                $(container).remove(),
                console.log(`Container ${container} removed from containerRow component`)
            );
        }, ms)
    }))
}

//Add a new container inside the containerRow container after a period of time
function createContainer(container, ms) {
    return new Promise((resolve => {
        setTimeout(function () {
            resolve(
                console.log(`Adding container ` + `#` + $(container).prop("id") + ` to containerRow component`),
                $('#containerRow').append(container),
                $(container).removeClass('bgterminal-hide'),
                $(container).removeClass('bgterminal-show'),
                console.log(`Container ` + `#` + $(container).prop("id") + ` successfully added to containerRow component`)
            );
        }, ms)
    }))
}

//Putting thread to sleep 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Background animation function
function bgTerminal(container, settings, ms) {
    // Your animation logic here
    let bgSettings = {
        url: settings.url, // The page to load and display in the terminal
        glow: settings.glow,  // If true, the terminal will have a glowing effect
        speed: settings.speed, //Type speed in milliseconds. This is the time between two character are typed
        wait: settings.wait, // The number of milliseconds to wait at the end of the line (when \n is found)
    };
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve(
                console.log(`Starting animation in ${container} container`),
                $(container).bgTerminal(bgSettings),
                console.log(`Animation started in ${container} container`)
            )
        }, ms)
    })
}

//Handling animation secuence
async function asyncCall(terminal, settings) {
    // Queue of promises
    const queue = [];
    let idContainer1 = $(terminal).prop("id");

    console.log(`Starting bgTerminal animation process in ` + $(terminal).prop("id"));
    queue.push(await createContainer(terminal, 500));
    queue.push(await bgTerminal('#' + idContainer1, settings, 2000)); //Wait 2 secs then execute bgTerminal
    queue.push(await hidebgTerminal('#' + idContainer1, 1 * 60 * 1000)); //Wait 1 min then execute hidebgTerminal
    queue.push(await showbgTerminal('#' + idContainer1, 10000)); //Wait 0.5 min after the hidebgTerminal executes itself and then execute showbgTerminal  
    queue.push(await hidebgTerminal('#' + idContainer1, 10000));
    queue.push(await clearContainer('#' + idContainer1, 8000)); //removes childs, descendant and text on container 1
    console.log(`bgTerminal animation process finished in terminal ` + $(terminal).prop("id"));

    queue.forEach((promise) => animationObserver.subscribe(promise));
}

//Scheduling animation secuence process
async function bgTerminalAnimationProcess() {
    
    //Starting bgTerminal animation 1st process secuence
   asyncCall($terminal, $settings[1]).then(() => {
        asyncCall($terminal2, $settings[2])
    })

    //Sleeping thread for 1.5 min
    await sleep(1.5 * 60 * 1000);
    
    //Starting bgTerminal animation 2nd process secuence
    asyncCall($terminal3, $settings[1]).then(()=>{
        asyncCall($terminal4,$settings[0])
    });

    //Sleeping thread for 1.5 min
    await sleep(1.5* 60 * 1000);

    //Forcing bgTerminal animation execution according with 2nd part of 2nd process secuence
    try {
        bgTerminal(`#terminal`, $settings[1],0)
    } catch (error) {
        throw console.error(error);
    }finally{
        console.log(`This is necesary to keep running the animation loop event`)
    }
       
}

//Create an observer to manage the animation queue
const animationObserver = new Observer();

//Executing bgTerminal animation process
bgTerminalAnimationProcess();

//Excuting bgTerminal animation secuence process every 5mins
setInterval(bgTerminalAnimationProcess, 5*60*1000)

//Notifying the observer to start the bgTerminal animation
animationObserver.notify();