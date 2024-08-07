//head page scroll
var prevScrollpos = window.pageYOffset;
var stickyGrid = document.querySelector('.top_page');

window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        stickyGrid.classList.remove("hidden");
    } else {
        stickyGrid.classList.add("hidden");
    }
    prevScrollpos = currentScrollPos;
};
//scroll to top
function scroll_to_top(){
  document.querySelector('.section_title').scrollIntoView({ behavior: 'smooth'})
};
// Gallery
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
setInterval(() => plusSlides(1), 5000);

// Music
let muVar = 1;

document.getElementById('playAudio').addEventListener('click', function() {
  const clickVar = document.getElementById('myAudio');
  if (muVar === 1) {
    this.innerText = "Pause";
    clickVar.play();
    document.getElementById('marquee').innerText = clickVar.src.replace("https://animeharbane.com/music/","");
    muVar = 0;
  } else {
    this.innerText = "Play";
    clickVar.pause();
    document.getElementById('marquee').innerText = "";
    muVar = 1;
  }
});
//stop music function
function stopMusic(){
  document.getElementById('playAudio').innerText = 'Play';
  document.getElementById('myAudio').pause();
  document.getElementById('marquee').innerText = "";
  muVar = 1;
  //document.getElementById('myAudio').src = 'audio/audio.flac';
};



//context menu
/*if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
      //alert("You've tried to open context menu");
      e.preventDefault();
    }, false);
  } else {
    document.attachEvent('oncontextmenu', function() {
      //alert("You've tried to open context menu");
      window.event.returnValue = false;
    });
  } */


let isSubmitting = false;
var commentUrl = 'AKfycbxRUA6E-9FtKl4mtIWg2zxht0XyaALb43D4ZIb7UFXx8D_-7RbN3dCY-LxYNn6BQbQLcA';
var commentTitle = 'Home Page';
document.getElementById('dataFormComments').addEventListener('submit', async function(e) {
    e.preventDefault();

    if (isSubmitting) {
      return;
  }
  isSubmitting = true;
    const form = document.getElementById('dataFormComments');
    const inputsComment = e.target.querySelectorAll('input, textarea');
    inputsComment.forEach(input => {
        input.value = escapeHtml(input.value);
    });
    const formData = new FormData(form);
    // Append the current date
    const currentDate = new Date().toISOString();
    formData.append('timestamp', currentDate);
    // Function to get the user's location
    function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
            resolve(position.coords.latitude + ',' + position.coords.longitude);
            },
            error => {
            reject(error);
            }
        );
        } else {
        reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
    }

    // Append the user's location
    try {
    const location = await getCurrentPosition();
    formData.append('location', location);
    } catch (error) {
    formData.append('location', 'Location unavailable');
    }

    // Convert FormData to URLSearchParams for the fetch request
    const params = new URLSearchParams();
    for (const pair of formData.entries()) {
    params.append(pair[0], pair[1]);
    }
    document.getElementById('response').textContent = 'wait...';
    fetch('https://script.google.com/macros/s/'+commentUrl+'/exec', { // Replace with your Google Apps Script web app URL
    method: 'POST',
    body: params,
    })
    .then(response => response.text())
    .then(data => {
    document.getElementById('response').textContent = data;
    document.getElementById('comment').value = '';
    document.getElementById('comment').placeholder = 'drop another comment here!*';
    getComments(commentUrl,commentTitle);
    })
    .catch(error => {
    document.getElementById('response').textContent = 'Error submitting your comment';
    });
    await new Promise(resolve => setTimeout(resolve, 8000));
    isSubmitting = false;
  });
    
async function getComments(commentHash,animeName){
  document.getElementById('responseComments').innerHTML = `<p style="text-align:center;font-size:18px;background-color:red;">Loading...⏳</p> `;
  try{
    const response = await fetch('https://script.google.com/macros/s/'+commentHash+'/exec');
    const data = await response.json();
    const contentDiv = document.getElementById('responseComments');
    contentDiv.innerHTML = data.reverse().map((item) => `
        <div class="user_name">${item.user} &nbsp;&nbsp;| <div style="max-width:130px;color:white;overflow:hidden;white-space:nowrap;position:absolute;top:0;right:10px;">${item.time.replace('T','&nbsp;&nbsp;')}</div></div>
        <p class="comment">${item.comment}</p>
        `).join('');
  } catch(error){
    document.getElementById('responseComments').innerHTML = `<p style="text-align:center;font-size:18px;background-color:red;">no comments 🤐</p> `;
  };
  document.getElementById('comment-title').innerText = animeName;
  document.getElementById('response').textContent = '';
}
document.getElementById('comments-get').addEventListener('click', function () {
  getComments(commentUrl,commentTitle);
  this.style.display = 'none';
  document.getElementById('comments-container').style.display='block';
})
function escapeHtml(html) {
  return html.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
}
    