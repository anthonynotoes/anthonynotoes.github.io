/* global $, sessionStorage */

$(document).ready(runProgram);
// wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
 
function runProgram(){
 
////////////////////////////////////////////////////////////////////////////////
 
//////////////////////////// SETUP /////////////////////////////////////////////
 
////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // Game Item Objects
  var KEY = {
    RIGHT: 39,
    LEFT: 37,
    UP: 38,
    DOWN: 40
  };
 
// This variable will map the keycodes of the keys to their key counterparts
  var walker = {
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0
  }
 
// This object will contain all values for where on the page the item "walker" is and the speed of its movement
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  // Now the document will handle the keydown event for whenever we press a key on the keyboard down
  $(document).on('keyup', handleKeyUp);
  // Now the document will handle the keyup event for whenever we press a key on the keyboard up
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /*
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    wallCollision();
  }
 
  /*
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.DOWN) {
      walker.speedY = 5;
    }
    if (event.which === KEY.UP) {
      walker.speedY = -5;
    }
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
    }
  }
  function handleKeyUp(event) {
    if (event.which === KEY.DOWN) {
      walker.speedY = 0;
    }
    if (event.which === KEY.UP) {
      walker.speedY = 0;
    }
    if (event.which === KEY.LEFT) {
      walker.speedX = 0;
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 0;
    }
  }
  // This will report to the console which magic number value of the key was being pressed at the time of the key being pressed down\
  // This will now actually move the item walker places on the screen

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  } // moves walker registered area
  function repositionGameItem() {
    walker.positionX += walker.speedX; // update the position of the box along the x-axis
    walker.positionY += walker.speedY; // update the position of the box along the y-axis
  } // moves walker visually
  function redrawGameItem() {
    $("#walker").css("left", walker.positionX); // draw the box in the new location, positionX pixels away from the "left"
    $("#walker").css("top", walker.positionY); // draw the box in the new location, positionY pixels away from the "up"
  }
  function wallCollision () {
    if (walker.positionX >= $("#board").width()-50) {
      walker.positionX = ($("#board").width()-50)
    }
    if (walker.positionY >= $("#board").height()-50) {
      walker.positionY = ($("#board").height()-50)
    }
    if (walker.positionX <= 0) {
      walker.positionX =0
    }
    if (walker.positionY <= 0) {
      walker.positionY =0
    }
  }
}



