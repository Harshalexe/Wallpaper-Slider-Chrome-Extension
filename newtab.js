const wallpaperContainer = document.getElementById("wallpaper-container");
const intervalDropdown = document.getElementById("interval");
const fileUpload = document.getElementById("file-upload");

// Load wallpapers from storage or initialize an empty array
let wallpapers = JSON.parse(localStorage.getItem("wallpapers")) || [];
let slideInterval = 5000; // Default interval (5 seconds)

// Function to get a random wallpaper index
function getRandomIndex() {
  return Math.floor(Math.random() * wallpapers.length);
}

// Function to change wallpaper
function changeWallpaper() {
  if (wallpapers.length > 0) {
    const randomIndex = getRandomIndex(); // Get a random index
    wallpaperContainer.style.backgroundImage = `url(${wallpapers[randomIndex]})`;
  }
}

// Start the slideshow
let slideshow = setInterval(changeWallpaper, slideInterval);
changeWallpaper(); // Show the first wallpaper if any are saved

// Handle interval change
intervalDropdown.addEventListener("change", (e) => {
  slideInterval = parseInt(e.target.value);
  clearInterval(slideshow);
  slideshow = setInterval(changeWallpaper, slideInterval);
});

// Handle file uploads
fileUpload.addEventListener("change", (event) => {
  const files = event.target.files;

  // Convert uploaded files to data URLs
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      wallpapers.push(e.target.result); // Add the image to the wallpapers array
      localStorage.setItem("wallpapers", JSON.stringify(wallpapers)); // Save to storage
      if (wallpapers.length === 1) {
        changeWallpaper(); // Show the first wallpaper immediately
      }
    };

    reader.readAsDataURL(file); // Read the file as a data URL
  }
});
