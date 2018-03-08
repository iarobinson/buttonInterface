var videos = { video1: "video/demovideo1", video2: "video/demovideo2" };

// Once page is fully loaded, we commence with the program
// *This could be refactored with a helper function to avoid the non-DRY elements
window.onload = function() {
  
  // First we get the video element and assign it to video variable
  var video = document.getElementById("video");
  // Then we get the video and it's extension
  video.src = videos.video1 + getFormatExtension();
  // Then we load the video
  video.load();
  
  // Applies each set of buttons to a variable and loops over each
  // First we do control links
  var controlLinks = document.querySelectorAll("button.control");
  for (var i = 0; i < controlLinks.length; i += 1) {
    controlLinks[i].onclick = handleControl;
  }
  
  // Same for Effects
  var effectLinks = document.querySelectorAll("button.effect");
  for (var i = 0; i < effectLinks.length; i += 1) {
    effectLinks[i].onclick = setEffect;
  }
  
  // Same for Selecting Video Links
  var videoLinks = document.querySelectorAll("button.videoSelection");
  for (var i = 0; i < videoLinks.length; i += 1) {
    videoLinks[i].onclick = setVideo;
  }
  
  // Adding event handlers to fix play/pause button depressed bug
  video.addEventListener("ended", endedHandler, false);
  
  // These are helper functions that visually press or depress buttons
  pushUnpushButtons("video1", []);
  pushUnpushButtons("normal", []);
}

// This function manages when buttons which control the video player
function handleControl(click) {
  var id = click.target.getAttribute("id");
  // Using the above variable constructor, we get strings based on the value of the button pressed
  
  // We assign video variable to the video object in the DOM
  var video = document.getElementById("video");
  if (id == "play") {
    pushUnpushButtons("play", ["pause"]);
    
    // Now we control the video using the play button
    if (video.ended) {
      // If the video is over and we click play, we reload the video
      video.load();
    }
    // Play loaded video
    video.play();
  } else if (id == "pause") {
    pushUnpushButtons("pause", ["play"]);
    
    // Pause video when we click pause 
    video.pause();
  } else if (id == "loop") {
    if (isButtonPushed("loop")) {
      pushUnpushButtons("", ["loop"]);
    } else {
      pushUnpushButtons("loop", []);
    }
    
    // Here we toggle the loop so we turn it OFF if it were ON and visaversa
    video.loop = !video.loop;
  } else if (id == "mute") {
    if (isButtonPushed("mute")) {
      pushUnpushButtons("", ["mute"]);
    } else {
      pushUnpushButtons("mute", []);
    }
    // Here we toggle the mute status of the video object
    video.muted = !video.muted;
  }
}

function isButtonPushed(id) {
  var anchor = document.getElementById(id);
  var theClass = anchor.getAttribute("class");
  return (theClass.indexOf("selected") >= 0);
}

function setEffect(click) {
  // Someone clicked a button and this sets an ID variable to that button's id attribue 
  var id = click.target.getAttribute("id");
  
  // Now we run through if statements to decide which button was clicked and how the graphics should respond
  if (id == "normal") {
    pushUnpushButtons("normal", ["western", "noir", "scifi"]);
    // Here we set the effect function for the video
    effectFunction = null;
  } else if (id == "western") {
    pushUnpushButtons("western", ["normal", "noir", "scifi"]);
    effectFunction = western;
  } else if (id == "noir") {
    pushUnpushButtons("noir", ["normal", "western", "scifi"]);
    effectFunction = noir;
  } else if (id == "scifi") {
    pushUnpushButtons("scifi", ["normal", "western", "noir"]);
    effectFunction = scifi;
  }
}

// Set Video function does the same as set Effect
// It just applies a variable to the id that has been selected and performs a function based on that selection
function setVideo(click) {
  var id = click.target.getAttribute("id");
  // Set variable equal to video element
  var video = document.getElementById("video");
  
  if (id == "video1") {
    pushUnpushButtons("video1", ["video2"]);
  } else {
    pushUnpushButtons("video2", ["video1"]);
  }
  video.src = videos[id] + getFormatExtension();
  video.load();
  video.play();
  
  pushUnpushButtons("play", ["pause"]);
}


// Here we are doing the logic which seems so obvious in analoge environments.
// We are passed the button clicked, and should have all other buttons related become unpushed.
function pushUnpushButtons(push, unpush) {
  // This just means, if a button is pushed we will do something
  if (push != "") {
    // Anchor variable set to the button which was pushed
    var anchor = document.getElementById(push);
    // The class of the anchor will store the string " selected" if the button is pushed
    var theClass = anchor.getAttribute("class");
    // This just says, 'is this class pushed'? or does it contain the "selected string"
    if (!theClass.indexOf("selected") >= 0) {
      // If the button isn't selected, it makes it selected
      theClass += " selected";
      // Resets the anchor back to 'control' 'effect' or "videoSelection" depeding on what button pressed
      anchor.setAttribute("class", theClass);
    }
  }
  
  // Iterate through the group of buttons which belong to the button pushed
  //  e.g. if you press play, we iterate the control buttons
  for (var i = 0; i < unpush.length; i += 1) {
    // Set variable to the group
    anchor = document.getElementById(unpush[i]);
    // Set variable equal to the Class which we hope to pull from
    theClass = anchor.getAttribute("class");
    // Ask if each button has the class selected
    if (theClass.indexOf("selected") >= 0) {
      // Get a variable we can use to deselect the button clicked
      theClass = theClass.replace(" selected", "");
      
      // Since we found buttons that had been selected, we make them unselected.
      anchor.setAttribute("class", theClass);
    }
  }
}

function endedHandler() {
  pushUnpushButtons("", ["play"]);
}

function getFormatExtension() {
  var video = document.getElementById("video");
  if (video.canPlayType("video/mp4") != "") {
    return ".mp4";
  } else if (video.canPlayType("video/webm") != "") {
    return ".webm"
  } else if (video.canPlayType("video/ogg") != "") {
    return ".ogv";
  }
}

// VIDEO EFFECT FUNCTIONS //

// Global variable for effects
var effectFunction = null;

function noir(pos, r, g, b, data) {
  // Do something
}