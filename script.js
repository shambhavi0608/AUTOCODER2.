// Smooth scrolling for each section (for both index and story pages)
document.addEventListener("scroll", function() {
    let sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        let rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            section.style.opacity = 1; // Fade in as it enters the viewport
        } else {
            section.style.opacity = 0;
        }
    });
});

// Parallax scrolling effect for the background images (for both index and story pages)
window.addEventListener('scroll', function() {
    let scrollY = window.scrollY;
    let parallaxElements = document.querySelectorAll('.section');

    parallaxElements.forEach((section, index) => {
        let speed = 0.5;  // Adjust parallax speed
        section.style.backgroundPosition = `center ${scrollY * speed}px`;
    });
});

// Variables to store preferences
let isAutoScrolling = false;
let isSoundOn = true;
let audio = new Audio('music.mp3'); // Replace with your audio file

// Function to toggle Auto Scroll
function toggleAutoScroll() {
    isAutoScrolling = document.getElementById('autoScrollCheckbox').checked;
    localStorage.setItem('autoScroll', isAutoScrolling); // Store preference in localStorage
}

// Function to toggle Sound
function toggleSound() {
    isSoundOn = document.getElementById('soundCheckbox').checked;
    if (isSoundOn) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Function to toggle Full Screen
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

// Check if Auto Scroll is enabled in localStorage when the page loads
window.onload = function() {
    if (localStorage.getItem('autoScroll') === 'true') {
        // Enable Auto Scroll if the setting is enabled
        if (document.body.classList.contains('story-page')) {
            autoScrollToNextScene(); // Auto Scroll on Story page
        }
    }

    // If it's the index page, initialize the checkbox state
    if (document.body.classList.contains('index-page')) {
        document.getElementById('autoScrollCheckbox').checked = localStorage.getItem('autoScroll') === 'true';
    }

    // Event listener to exit full screen when ESC key is pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && document.fullscreenElement) {
            toggleFullScreen(); // Exit full screen on ESC
        }
    });
};

// Function to scroll to the next scene smoothly (for story page)
function autoScrollToNextScene() {
    const sceneHeight = window.innerHeight; // Get the height of the window
    let currentPosition = window.scrollY;

    function scrollToNext() {
        if (currentPosition < document.body.scrollHeight - sceneHeight) {
            window.scrollBy(0, 10); // Scroll by 10px
            currentPosition += 10;
            requestAnimationFrame(scrollToNext); // Call the function again for the next frame
        }
    }

    // Start the scroll animation
    requestAnimationFrame(scrollToNext);
}

// Function to ensure smooth scrolling (for both index and story)
function smoothScrollToNextScene() {
    if (isAutoScrolling) {
        autoScrollToNextScene();
    }
}

// Call this function in the animation frame loop on the story page
if (document.body.classList.contains('story-page')) {
    smoothScrollToNextScene();
}