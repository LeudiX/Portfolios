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
  
 // Create an array of animations
 const settings = [
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
    }
]


  // Background animation function
  function bgTerminal(container,settings) {
    // Your animation logic here
    console.log(`Animation started: ${container}`);
    // Simulate animation time
    return new Promise((resolve) => {
      setTimeout(() => {
        $(container).bgTerminal({
            url: settings.url, // The page to load and display in the terminal
            glow: settings.glow, // If true, the terminal will have a glowing effect
            speed: settings.speed, // Type speed in milliseconds. This is the time between two character are typed
            wait: settings.wait, // The number of milliseconds to wait at the end of the line (when \n is found)
        });
        console.log(`Animation finished: ${container}`);
        resolve();
      }, 2000);
    });
  }
  
  // Queue of promises
  const queue = [
    () => bgTerminal('terminal',settings[0]),
    () => bgTerminal('terminal2',settings[1]),
   // () => bgTerminal('animation3'),
  ];
  
  // Create an observer to manage the animation queue
  const animationObserver = new Observer();
  
  // Subscribe to the observer
  queue.forEach((promise) => animationObserver.subscribe(promise));
  
  // Notify the observer to start the animation
  animationObserver.notify();