

//window.onscroll;

//scroll to top
function scroll_to_top(){
    document.querySelector('.section_title').scrollIntoView({ behavior: 'smooth'})
  };

//show episode
function epShow(animeName, epHash, n, player) {
    document.getElementById('spinner_container').style.display = 'block';
    saveUserDataLocal('watchLost', n);
    if (player == 'mega') {
        document.getElementById('videoPlayer').innerHTML = `
            <div id="videoPlayerHead">
                <p id="myVideoTitle"> ${animeName} | Episode: ${n} </p>
                <div id="animeharbane-player">animeharbane.com</div>
            </div>
            <iframe id="myVideo" src="https://mega.nz/embed/${epHash}" frameborder="0" title="video player"></iframe>
            <button id="stretch" onclick="stretch()">full screen</button>
        `;
    } else if (player == 'videa') {
        document.getElementById('videoPlayer').innerHTML = `
            <iframe id="myVideoVidea" width="100%" style="justify-content: center;" height="100%"
                src="//videa.hu/player?v=${epHash}" 
                allowfullscreen="allowfullscreen" 
                webkitallowfullscreen="webkitallowfullscreen"
                mozallowfullscreen="mozallowfullscreen" 
                frameborder="0" 
                sandbox="allow-same-origin allow-scripts"></iframe>
        `;
    } else if (player == 'ok') {
        document.getElementById('videoPlayer').innerHTML = `
            <iframe id="myVideoVidea" width="100%" style="justify-content: center;" height="100%"
                src="//www.ok.ru/videoembed/${epHash}" 
                allowfullscreen="allowfullscreen" 
                webkitallowfullscreen="webkitallowfullscreen"
                mozallowfullscreen="mozallowfullscreen" 
                frameborder="0" 
                sandbox="allow-same-origin allow-scripts"></iframe>
        `;
    } else if (player == 'drive'){
        document.getElementById('videoPlayer').innerHTML = "";
    } else{document.getElementById('videoPlayer').innerHTML = "";}

    document.getElementById('ep_target').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.getElementById('spinner_container').style.display = 'none', 1500);
}


// stretch for mega player
var indexFullScreen = 1;
function stretch (){
    if (indexFullScreen === 1) {
      document.getElementById('stretch').innerText = 'Exit';
      indexFullScreen = 0;
      document.getElementById('videoPlayer').requestFullscreen();
    } else {
      document.getElementById('stretch').innerText = 'Full Screen';
      indexFullScreen = 1;
      document.exitFullscreen();
    }
};
