const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = [];
let photosArray = [];

let isInitialCount = true;

// Unsplash API
// set the initial number of images to 5 so the website load faster
let initialCount = 5;
// CREATE YOUR PROJECT IN THE UNSPLASH API, THEN INSERT THE API KEY IN THE VARIABLE BELOW:
const apiKEY = "";
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${initialCount}`;

// Helper function to update the number of images loaded by the API
function updatedApiUrlWithNewCount(picCount) {
  apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${picCount}`;
}

// Helper function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Helper function to check if the author provided a description
function checkDescription(item) {
  return item.description === null
    ? "the author did not provide a description"
    : item.description;
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Create Elements for links and photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash website
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img> for photo
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: checkDescription(photo),
      title: checkDescription(photo),
    });

    // Event Listener, check when each image is finished loading
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, then put both inside imageCOntainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();

    if (isInitialCount) {
      updatedApiUrlWithNewCount(15);
      isInitialCount = false;
    }
  } catch (error) {
    // stop loader animation
    loader.hidden = true;

    // Catch Error Here
    const errorMessage = document.createElement("h1");
    errorMessage.innerHTML = `Something went wrong<br>${error}`;
    imageContainer.appendChild(errorMessage);
    console.error(error);
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
