window.onload = function () {
  getAnimeCard();
}
var data2;
var commentUrl;
var commentTitle;
var animeEntry;
var suffix;

async function getAnimeCard() {
  const animeEntry0 = JSON.parse(localStorage.getItem('animeEntry0'));
  console.log(animeEntry0);
  const rate = animeEntry0[0];
  const statu = animeEntry0[1];
  const imageUrl = animeEntry0[2];
  suffix = animeEntry0[3];
animeEntry = JSON.parse(localStorage.getItem('animeEntry'));
  console.log(animeEntry);
  document.title = animeEntry.animeName;
  saveUserDataLocal('watchLost', animeEntry.animeName);
  //(animeEntry);
  const contentDiv = document.getElementById('description');
  if (window.matchMedia("(max-width: 768px)").matches) {
  contentDiv.innerHTML = `
        <div id="go_to_description" class="separate"></div>
        <p class="section_title">${animeEntry.animeName}</p>
        <div class="anime_description" style="background-image: url('${animeEntry.background}');">
            <div class="description_left">
                <div>
                    <div class="description_left_text">Anime Name:</div>
                    <div class="description_left_text">Studio:</div>
                    <div class="description_left_text">Status:</div>
                    <div class="description_left_text">Anime Seasons:</div>
                    <div class="description_left_text">Episodes:</div>
                    <div class="description_left_text">Year of stream:</div>
                    <div class="description_left_text">In Our Website:</div>
                </div>
                <div>
                    <div class="description_left_text">${animeEntry.animeName}</div>
                    <div class="description_left_text">${animeEntry.studio}</div>
                    <div class="description_left_text">${statu}</div>
                    <div class="description_left_text">${animeEntry.season}</div>
                    <div class="description_left_text">${animeEntry.nbEpisodes}</div>
                    <div class="description_left_text">${animeEntry.year}</div>
                    <div class="description_left_text">${animeEntry.isWebsite}</div>
                </div>
            </div>
            <div id="anime-card-description" style="background-image: url('${imageUrl}')">
                <p class="card-title">${animeEntry.animeName}</p>
                <p class="card-rate">${rate}⭐  | ${statu}</p>
            </div>
            
        </div>
    `;
    document.getElementById('phone-container').innerHTML =`
        <div class="caption" style="padding:18px; direction:rtl;height:110px;">
            <div class="description_left_text">${animeEntry.caption}<span>&nbsp;&nbsp;
              <a href="anime-info/${animeEntry.captionTitle}.html" style="height:18px; width:100px;color:rgb(150,50,50);background-color:white;" >
                المزيد من المعلومات
              </a></span>
            </div>
        </div>
    `;
  }else{
    contentDiv.innerHTML = `
          <div id="go_to_description" class="separate"></div>
          <p class="section_title">${animeEntry.animeName}</p>
          <div class="anime_description" style="background-image: url('${animeEntry.background}');">
              <div class="description_left">
                  <div>
                      <div class="description_left_text">Anime Name:</div>
                      <div class="description_left_text">Studio:</div>
                      <div class="description_left_text">Status:</div>
                      <div class="description_left_text">Anime Seasons:</div>
                      <div class="description_left_text">Episodes:</div>
                      <div class="description_left_text">Year of stream:</div>
                      <div class="description_left_text">In Our Website:</div>
                  </div>
                  <div>
                      <div class="description_left_text">${animeEntry.animeName}</div>
                      <div class="description_left_text">${animeEntry.studio}</div>
                      <div class="description_left_text">${statu}</div>
                      <div class="description_left_text">${animeEntry.season}</div>
                      <div class="description_left_text">${animeEntry.nbEpisodes}</div>
                      <div class="description_left_text">${animeEntry.year}</div>
                      <div class="description_left_text">${animeEntry.isWebsite}</div>
                  </div>
              </div>
              <div id="anime-card-description" style="background-image: url('${imageUrl}')">
                  <p class="card-title">${animeEntry.animeName}</p>
                  <p class="card-rate">${rate}⭐  | ${statu}</p>
              </div>
              <div>
              <div class="caption" style="padding:18px; direction:rtl;">
                <div class="description_left_text">${animeEntry.caption}</div>
                <a href="anime-info/${animeEntry.captionTitle}.html" style="text-decoration:none;">
                  <button style="height:20px; width:180px;display:block;margin:auto;" >  المزيد من المعلومات</button></a>
                </div>
              </div>
          </div>
      `;
  }
  document.getElementById('spinner_container').style.display = 'none';
  getEpisodes(`${animeEntry.animeName}`,`${animeEntry.epHash}`);
}


//get episodes
async function getEpisodes(animeName, epsHash) {
  document.getElementById('spinner_container').style.display = 'block';
  try {
      document.getElementById('episodes-container').style.display = 'block';
      document.getElementById('episodes_grid').innerHTML = `<p style="position: absolute; top: 5px">Loading . . .</p> `;
      const response = await fetch(`https://script.google.com/macros/s/${epsHash}/exec?term=${encodeURIComponent(suffix)}&action=getData`);
      data2 = await response.json();
      const filteredData = data2.filter(item => item.epNumb !== null && item.epNumb !== '');
      const contentDiv = document.getElementById('episodes_grid');
      contentDiv.style.direction = 'rtl';
      contentDiv.innerHTML = filteredData.map((item) => `
        <a  class="episodes" onclick="epShow('${animeName}', '${item.epHash}', '${item.epNumb}', '${item.index}')">حلقة ${item.epNumb}</a>
        `).join('');
        commentUrl = epsHash;
        commentTitle = animeName;
  } catch(error){
    document.getElementById('episodes_grid').innerHTML = `<p style="position: absolute; top: 5px">Anime Will be avalible Soon !</p> `;
  };
  document.getElementById('spinner_container').style.display = 'none';
}



//get comment
async function getComments(index){
  saveUserDataLocal('watchLost', 'comment');
  document.getElementById('responseComments').innerHTML = `<p style="text-align:center;font-size:18px;background-color:red;">Loading...⏳</p> `;
  if (index == 1) {
    try {
      const response = await fetch(`https://script.google.com/macros/s/${commentUrl}/exec?term=${encodeURIComponent(suffix)}&action=getData`);
      data2 = await response.json();
    } catch (error) {
      console.error('comment error: ' + error);
    }
  }
  try{
    const contentDiv = document.getElementById('responseComments');
    const filteredData = data2.filter(item => item.comment !== null && item.comment !== '');
    contentDiv.innerHTML = filteredData.reverse().map((item) => `
        <div class="user_name">${item.user} &nbsp;&nbsp;| <div style="max-width:130px;color:white;overflow:hidden;white-space:nowrap;position:absolute;top:0;right:10px;">${item.time.replace('T','&nbsp;&nbsp;')}</div></div>
        <p class="comment">${item.comment}</p>
        `).join('');
  } catch(error){
    document.getElementById('responseComments').innerHTML = `<p style="text-align:center;font-size:18px;background-color:red;">no comments 🤐</p> `;
  };
  document.getElementById('comment-title').innerText = commentTitle;
  document.getElementById('response').textContent = '';
}


//send coments and data
let isSubmitting = false;
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
    const currentDate = new Date().toISOString();
    formData.append('timestamp', currentDate);
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
        
    }});
    }
    /*try {
    const location = await getCurrentPosition();
    formData.append('location', location);
    } catch (error) {
    formData.append('location', 'Location unavailable');
    }*/
    let myID = localStorage.getItem('userID');
    formData.append('location', myID);
    const params = new URLSearchParams();
    for (const pair of formData.entries()) {
    params.append(pair[0], pair[1]);
    }
    document.getElementById('response').textContent = 'wait...';
    fetch(`https://script.google.com/macros/s/${commentUrl}/exec?term=${encodeURIComponent(suffix)}`, {
    method: 'POST',
    body: params,
    })
    .then(response => response.text())
    .then(data => {
    document.getElementById('response').textContent = data;
    document.getElementById('comment').value = '';
    document.getElementById('comment').placeholder = 'drop another comment here!*';
    getComments(1);
    })
    .catch(error => {
    document.getElementById('response').textContent = 'Error submitting your comment';
    });
    await new Promise(resolve => setTimeout(resolve, 8000));
    isSubmitting = false;
  });
function escapeHtml(html) {
  return html.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
}

function saveUserDataLocal(storedString, newString) {
  let existingString = localStorage.getItem(storedString);
  let combinedString = (existingString ? existingString : '') +'_'+newString;
  localStorage.setItem(storedString, combinedString);
}
