// API Async Request
getData();

async function getData() {
  try {
    // get data from json file
      const response = await fetch('assets/api/projects-data.json');
      // handle HTTP related issues (status code not in range 200-299)
      if (!response.ok) {
        throw new Error(`Error occurred in HTTP path. Status code: ${response.status}`);
      }
      const data = await response.json();
      // unten stehende Funktion displayPosts() muss ausgeführt werden
      displayPosts(data);
  } catch (error) {
    // fehlermeldung in der Console anzeigen
      console.error("An error occured while fetching the data: ", error.message);
    // alert to inform user
      alert("An error occured while fetching the data");
  } 
}

function displayPosts(data) {
  const imageContainer = document.querySelector(".projects-image-container");
  data.forEach((blogPost) => {
    const container = document.createElement("div");
    container.classList.add("blog-post");
    // create template string for data to be inserted
    // add mouseover, onclick and onmouseleave attributes
    const template = `
        <img src="assets/images/${blogPost.image[1]}" srcset="assets/images/${blogPost.image[0]}" alt="handmade pink macrame wallhanging with raffia details">
        <div class="desc" style="background-color: transparent;">
            <h3 class="projects-h3" style="opacity: 0;">${blogPost.title}</h3>
            <img class="info-icon" onclick="displayInfo(this)" onclick="removeInfo(this)" src="assets/illustrations/icons/icon-info-cloud-desktop.svg" alt="click here to see picture description">
        </div>
        <div class="desc-text" style="display: none;">${blogPost.body}</div>
        `;
    // add template string to container
    container.innerHTML = template;
    imageContainer.appendChild(container);
  });
}

// display description
function displayInfo(icon) {
  // select elements within blog-post to be styled / made visible
  const descriptionText = icon.parentElement.nextElementSibling;
  const blogpostTitle = icon.parentElement.querySelector("h3");
  const backgroundBanner = icon.parentElement;

  // display blogpostTitleription if hover or click happens
  descriptionText.style.display =
    descriptionText.style.display === "none" ? "block" : "none";
  blogpostTitle.style.opacity = blogpostTitle.style.opacity === "0" ? "1" : "0";
  backgroundBanner.style.backgroundColor =
    backgroundBanner.style.backgroundColor === "transparent"
      ? "var(--KC-brownhover)"
      : "transparent";
}

// remove description
function removeInfo(icon) {
  // select elements to be styled / made unvisible
  const descriptionText = icon.parentElement.nextElementSibling;
  const blogpostTitle = icon.parentElement.querySelector("h3");
  const backgroundBanner = icon.parentElement;

  // remove blogpostTitleription if mouse moves away
  descriptionText.style.display = "none";
  blogpostTitle.style.opacity = "0";
  backgroundBanner.style.backgroundColor = "transparent";
}
