let vidLink = document.getElementById("vid-link");
let createBtn = document.getElementById("create-btn");
let readyLinkBox = document.getElementById("new-link-box");

function processVideoLink() {
  let videoLink = vidLink.value;
  let newLinkId;

  // Check if the link is a full YouTube link
  if (videoLink.includes("youtube.com") || videoLink.includes("youtu.be")) {
    // Extract video ID
    if (videoLink.includes("youtube.com")) {
      newLinkId = videoLink.split("v=")[1];
    } else if (videoLink.includes("youtu.be")) {
      newLinkId = videoLink.split("/").pop();
    }
    // Generate embed link
    let embedLink = `https://www.youtube-nocookie.com/embed/${newLinkId}?playlist=${newLinkId}&autoplay=1`;
    readyLinkBox.textContent = embedLink;
    // Open the link in a new tab
    window.open(embedLink, "_blank");
    // Clear input
    vidLink.value = "";
  } else {
    // If the link is not a valid YouTube link
    alert("Please enter a valid YouTube video link.");
  }
}

createBtn.addEventListener("click", function (e) {
  e.preventDefault();
  processVideoLink();
});

vidLink.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    processVideoLink();
  }
});
