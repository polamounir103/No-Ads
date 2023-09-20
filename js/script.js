let vidLink =document.getElementById("vid-link")
let createBtn = document.getElementById("create-btn")
let readyLinkBox = document.getElementById("new-link-box")

createBtn.addEventListener("click", function(e) {
    e.preventDefault();
    let videoLink = vidLink.value
    let videoLinkLength = videoLink.length
    let newLinkId;
    for (let i = 0; i < videoLinkLength; i++) {
        if (videoLink[i-1] === "v" && 
        videoLink[i] === "=" ){
            newLinkId = videoLink.slice(i+1 , videoLink.length)
            readyLinkBox.textContent = `https://www.youtube-nocookie.com/embed/${newLinkId}?playlist=${newLinkId}&autoplay=1`
            let readyLink= readyLinkBox.textContent 
                // console.log(readyLink)
                window.open( readyLink , "_blank" )
                vidLink.value = ""
            }else if(videoLink[i+1] === "s" &&
            videoLink[i] === "?" ){
                console.log(videoLink[i-11])
                newLinkId = videoLink.slice(i-11 , i)
                readyLinkBox.textContent = `https://www.youtube-nocookie.com/embed/${newLinkId}?playlist=${newLinkId}&autoplay=1`
                let readyLink= readyLinkBox.textContent 
                    // console.log(readyLink)
                window.open( readyLink , "_blank" )
                vidLink.value = ""
        }
    }
})


//  https://youtu.be/A3AQVPj7ZNM?si=DGcc8_JAPVoMx49z
//  https://youtu.be/0QZbzCAcc84?si=C0pm1Fsn5mBoBb3q
