// Variables
let isAutoScrolling = false;
let isSoundOn = true;
let audio = new Audio('background-music.mp3'); // Replace with your audio file

// Function to toggle auto scroll
function toggleAutoScroll() {
    isAutoScrolling = document.getElementById('autoScrollCheckbox').checked;
    if (isAutoScrolling) {
        window.location.href = 'story.html'; // Open the story page
    }
}

// Function to toggle sound
function toggleSound() {
    isSoundOn = document.getElementById('soundCheckbox').checked;
    if (isSoundOn) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Function to toggle full screen
function toggleFullScreen() {
    let isFullScreen = document.getElementById('fullscreenCheckbox').checked;
    if (isFullScreen) {
        if (!document.fullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) { // Firefox
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
                document.documentElement.msRequestFullscreen();
            }
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}

// Automatically scroll to bottom when the story page is loaded
window.onload = function() {
    if (isAutoScrolling) {
        window.scrollTo(0, document.body.scrollHeight);
    }
};