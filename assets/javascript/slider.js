// select container of elements
const sliderContainer = document.querySelector(".slider");
// select the container of image
const imageContainer = document.querySelector(".slide");
// autoplay
const interval = 3000;
let intervalId;

// select two buttons and add event listener
const leftArrow = document.querySelector(".controls-container .left")
leftArrow.addEventListener("click", () => {
    moveLeft();
    // console.log("left")
    // pauseAutoplay();
    clearInterval();
});

const rightArrow = document.querySelector(".controls-container .right")
rightArrow.addEventListener("click", () => {
    moveRight();
    // console.log("right")
    // pauseAutoplay();
    clearInterval();
});

// function to move the picture
function moveRight() {
  // stop autoplay manually
  clearInterval(intervalId);
  // take first element and append it
  const firstSlide = document.querySelectorAll(".slide")[0];
  sliderContainer.append(firstSlide);
  // restart autoplay
  startAutoplay();
};

function moveLeft() {
  clearInterval(intervalId);
  // prepend last element
  const arrayLength = document.querySelectorAll(".slide").length;
  const lastSlide = document.querySelectorAll(".slide")[arrayLength - 1];
  sliderContainer.prepend(lastSlide);
  startAutoplay();
}

// select play and pause buttons and add event listener
const pauseButton = document.querySelector(".controls-container .pause")
pauseButton.addEventListener("click", pauseAutoplay);

const playButton = document.querySelector(".controls-container .play")
playButton.addEventListener("click", startAutoplay);

// function for starting autoplay
function startAutoplay() {
  intervalId = setInterval(() => {
      moveRight();    
  }, interval);
  document.querySelector(".pause").style.display = "block";
  document.querySelector(".play").style.display = "none";
};

// function for pausing autoplay
function pauseAutoplay() {
  // no error handling necessary here
  clearInterval(intervalId);
  document.querySelector(".pause").style.display = "none";
  document.querySelector(".play").style.display = "block";
};

// start / stop autoplay
startAutoplay();
// pauseAutoplay();