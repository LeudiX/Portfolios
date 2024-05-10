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

// Observer pattern implementation
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
const $settings = [
    {
        url: '/backcodes/codelife.html',
        glow: true,
        speed: 25,
        wait: 0,
    },
    {
        url: '/js/jquery.bgterminal.js',
        glow: true,
        speed: 25,
        wait: 0,
    },
    {
        url: '/backcodes/openworkca.html',
        glow: true,
        speed: 25,
        wait: 0,
    },
    {
        url: '/js/main.js',
        glow: true,
        speed: 25,
        wait: 0,
    }
]

//Containers to be handle by bgTerminal
const $terminal = $("<div id='terminal' class='col-md-5 col-sm-5' style='z-index: -1;float:left;'></div>");
const $terminal2 = $("<div id='terminal2' class='col-md-5 col-sm-5' style='z-index: -1;float:left;'></div>");
const $terminal3 = $("<div id='terminal3' class='col-md-5 col-sm-5' style='z-index: -1;float:right;'></div>");
const $terminal4 = $("<div id='terminal4' class='col-md-5 col-sm-5' style='z-index: -1;float:right;'></div>");

//Hide bgTerminal after a period of Time
function hidebgTerminal(container, ms) {
    return new Promise((resolve => {
        setTimeout(function () {
            resolve(
                console.log(`Hidding terminal in ${container} container!!`),
                $(container).removeClass('bgterminal-show'),
                $(container).addClass('bgterminal-hide'),
                console.log(`Terminal hidded in ${container} container.Wait 20 secs`),
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
function cleanContainer(container, ms) {
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
    console.log(`Animation started in ${container} container`);
    return new Promise((resolve => {
        setTimeout(function () {
            resolve(
                $(container).bgTerminal({
                    url: settings.url, // The page to load and display in the terminal
                    glow: settings.glow, // If true, the terminal will have a glowing effect
                    speed: settings.speed, // Type speed in milliseconds. This is the time between two character are typed
                    wait: settings.wait, // The number of milliseconds to wait at the end of the line (when \n is found)
                })
            )
        }, ms);
    }))
}

async function asyncCall(terminal1, terminal2, settings1, settings2) {
    // Queue of promises
    const queue = [];
    let idContainer1 = $(terminal1).prop("id");
    let idContainer2 = $(terminal2).prop("id");

    console.log(`Starting bgTerminal animation process in ` + $(terminal1).prop("id"));
    queue.push(await createContainer(terminal1, 500));
    queue.push(await bgTerminal('#' + idContainer1, settings1,2000)); //Wait 2 secs then execute bgTerminal
    queue.push(await hidebgTerminal('#' + idContainer1, 1 * 60 * 1000)); //Wait 1 min then execute hidebgTerminal
    queue.push(await showbgTerminal('#' + idContainer1, 10000)); //Wait 0.5 min after the hidebgTerminal executes itself and then execute showbgTerminal  
    queue.push(await hidebgTerminal('#' + idContainer1, 10000));
    queue.push(await cleanContainer('#' + idContainer1, 10000)); //removes childs, descendant and text on container 1
    console.log(`bgTerminal animation process finished in terminal ` + $(terminal1).prop("id"));
    
    queue.push(await sleep(5000)); //Putting thread to sleep without block JavaScript’s execution thread 

    console.log(`Starting bgTerminal animation process in ` + $(terminal2).prop("id"));
    queue.push(await createContainer(terminal2, 500));
    queue.push(await bgTerminal('#' + idContainer2, settings2, 2000));
    queue.push(await hidebgTerminal('#' + idContainer2, 1 * 60 * 1000));
    queue.push(await showbgTerminal('#' + idContainer2, 20000));
    queue.push(await hidebgTerminal('#' + idContainer2, 10000));
    queue.push(await cleanContainer('#' + idContainer2, 10000)); //removes childs, descendant and text on container 2 

    queue.forEach((promise) => animationObserver.subscribe(promise));
    console.log(`bgTerminal animation process finished in terminal ` + $(terminal2).prop("id"));
}


async function bgTerminalAnimationProcess() {
    //Starting bgTerminal animation 1st process secuence
    asyncCall($terminal, $terminal3, $settings[0], $settings[1]);

    //Sleeping thread for 1min
    await sleep(2 * 60 * 1000);

    //Starting bgTerminal animation 2nd process secuence
    asyncCall($terminal2, $terminal4, $settings[2],$settings[3])

    /*asyncCall($terminal3, $settings[2]).then(() => {
        asyncCall($terminal4, $settings[3])
    });*/
}

//Create an observer to manage the animation queue
const animationObserver = new Observer();

//Executing bgTerminal animation process
bgTerminalAnimationProcess();

// Notifying the observer to start the bgTerminal animation
animationObserver.notify();