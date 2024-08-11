/* let vidLink = document.getElementById("vid-link");
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
  if (vidLink.value.trim() === "") {
    // If vidLink is empty, check if there's text in the clipboard
    navigator.clipboard.readText()
      .then((text) => {
        if (text.trim() !== "") {
          // If clipboard has text, paste it into vidLink
          vidLink.value = text;
          processVideoLink(); // Call the function to process the video link
        } else {
          // If clipboard is empty, alert the user
          alert("Please enter a YouTube video link or paste a link from clipboard.");
        }
      })
      .catch((error) => {
        console.error('Failed to read clipboard contents: ', error);
        alert("An error occurred while reading clipboard contents. Please enter a YouTube video link manually.");
      });
  } else {
    // If vidLink is not empty, proceed with processing the video link
    processVideoLink();
  }
});

vidLink.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    processVideoLink();
  }
});
*/
document.addEventListener("DOMContentLoaded", function () {
  const vidLink = document.getElementById("vid-link");
  const createBtn = document.getElementById("create-btn");
  const readyLinkBox = document.getElementById("new-link-box");

  function extractVideoId(url) {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === "www.youtube.com" || parsedUrl.hostname === "youtube.com") {
        const params = new URLSearchParams(parsedUrl.search);
        return params.get('v') || null;
      } else if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.split('/').pop();
      }
    } catch (e) {
      console.error("Invalid URL format:", e);
    }
    return null;
  }

  function processVideoLink() {
    const videoLink = vidLink.value.trim();
    if (!videoLink) {
      alert("Please enter a YouTube video link.");
      return;
    }

    const videoId = extractVideoId(videoLink);
    if (videoId) {
      const embedLink = `https://www.youtube-nocookie.com/embed/${videoId}?playlist=${videoId}&autoplay=1`;
      readyLinkBox.textContent = embedLink;
      window.open(embedLink, "_blank");
      vidLink.value = ""; // Clear input
    } else {
      alert("Please enter a valid YouTube video link.");
    }
  }

  function handleCreateBtnClick(e) {
    e.preventDefault();
    if (!vidLink.value.trim()) {
      navigator.clipboard.readText()
        .then((text) => {
          if (text.trim()) {
            vidLink.value = text;
            processVideoLink();
          } else {
            alert("Clipboard is empty. Please enter or paste a valid YouTube video link.");
          }
        })
        .catch((error) => {
          console.error("Failed to read clipboard contents:", error);
          alert("Failed to read clipboard contents. Please enter a YouTube video link manually.");
        });
    } else {
      processVideoLink();
    }
  }

  createBtn.addEventListener("click", handleCreateBtnClick);
  vidLink.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      processVideoLink();
    }
  });
});
