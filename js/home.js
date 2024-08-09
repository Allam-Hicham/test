window.onload = function() {
  templateCards();
  window.scrollTo(0, 0);
  //document.getElementById('container').scrollIntoView();
};
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

mainUrl = 'AKfycbxeIbHXClbj2Zz1Nd9smtBKfpWxFfEBbwDRpZhBPJ3hJktby8ky6oAwPSo0FEI9e51d';
async function templateCards() {
  document.getElementById('spinner_cards').style.display = 'block';
  try {
    const response = await fetch(`https://script.google.com/macros/s/${mainUrl}/exec`);
    let data = await response.json();
   //gallery
    document.querySelector('.container').innerHTML = `
        <div class="mySlides">/
            <a onclick="getAnimeCard('${data[0].animeName}', '${data[0].rate}', '${data[0].statut}', '${data[0].imageUrl}', '${data[0].hash}')">
                <img src="${data[0].state}"  style="width: 100%;">
            </a>
        </div>
        <div class="mySlides">/
            <a onclick="getAnimeCard('${data[1].animeName}', '${data[1].rate}', '${data[1].statut}', '${data[1].imageUrl}', '${data[1].hash}')">
                <img src="${data[1].state}"  style="width: 100%;">
            </a>
        </div>
        <div class="mySlides">/
            <a onclick="getAnimeCard('${data[2].animeName}', '${data[2].rate}', '${data[2].statut}', '${data[2].imageUrl}', '${data[2].hash}')">
                <img src="${data[2].state}"  style="width: 100%;">
            </a>
        </div>
        <div class="mySlides">/
            <a onclick="getAnimeCard('${data[3].animeName}', '${data[3].rate}', '${data[3].statut}', '${data[3].imageUrl}', '${data[3].hash}')">
                <img src="${data[3].state}"  style="width: 100%;">
            </a>
        </div>
        <div class="mySlides">/
            <a onclick="getAnimeCard('${data[4].animeName}', '${data[4].rate}', '${data[4].statut}', '${data[4].imageUrl}', '${data[4].hash}')">
                <img src="${data[4].state}"  style="width: 100%;">
            </a>
        </div>
        <div class="mySlides">/
            <a onclick="getAnimeCard('${data[5].animeName}', '${data[5].rate}', '${data[5].statut}', '${data[5].imageUrl}', '${data[5].hash}')">
                <img src="${data[5].state}"  style="width: 100%;">
            </a>
        </div>
        <a class="prev" onclick="plusSlides(-1)">❮</a>
        <a class="next" onclick="plusSlides(1)">❯</a>

        <div class="row">
            <div></div>
            <div class="demo" onclick="currentSlide(1)"></div>
            <div class="demo" onclick="currentSlide(2)"></div>
            <div class="demo" onclick="currentSlide(3)"></div>
            <div class="demo" onclick="currentSlide(4)"></div>
            <div class="demo" onclick="currentSlide(5)"></div>
            <div class="demo" onclick="currentSlide(6)"></div>
            <div></div>
        </div>
    `;
//data
document.getElementById('anounce').innerHTML = data[6].animeName;
document.querySelector('.anounce-container').style.display= data[7].animeName;
var searchUrl = `${data[6].rate}`;
var sendSearchUrl = `${data[7].rate}`;
    //cards
    data = data.filter(item => item.animeType && item.animeType.trim() !== '');
    const shData = shuffleArray(data);
    document.getElementById('anime_suggestion_grid').innerHTML = shData.map((item,Id) => `
      <a class="anime_card" style="background-image: url(${item.imageUrl});" onclick="getAnimeCard('${item.animeName}', '${item.rate}', '${item.statut}', '${item.imageUrl}', '${item.hash}')">&nbsp;${item.state}
        <p class="card-type">&nbsp;${item.animeType}</p>
        <p class="card-title">${item.animeName}</p>
        <p class="card-rate">${item.rate}⭐ | ${item.statut} </p>
      </a>
    `).join('');
    document.getElementById('spinner_cards').style.display = 'none';
  } catch (error) {
    console.error('error loading cards: '+ error);
    setTimeout(() => {
      templateCards();
    }, 3000);
  }
}

// Get anime description
async function getAnimeCard(animeName, rate, statu, imageUrl, Hash) {
    localStorage.setItem('animeEntry0',JSON.stringify([rate,statu,imageUrl]));
    document.getElementById('spinner_container').style.display = 'block';
    document.getElementById('description').style.display = 'block';
    console.log(animeName,rate,statu,imageUrl,Hash);
    try {
      const response = await fetch(`https://script.google.com/macros/s/${Hash}/exec?term=${encodeURIComponent(animeName)}`);   
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }     
      const animeEntry = await response.json();
      const contentDiv = document.getElementById('description');
      if (window.matchMedia("(max-width: 768px)").matches) {
        contentDiv.innerHTML = `
          <div id="go_to_description" class="separate"></div>
          <p class="section_title">${animeName}</p>
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
                      <div class="description_left_text">${animeName}</div>
                      <div class="description_left_text">${animeEntry.studio}</div>
                      <div class="description_left_text">${statu}</div>
                      <div class="description_left_text">${animeEntry.season}</div>
                      <div class="description_left_text">${animeEntry.nbEpisodes}</div>
                      <div class="description_left_text">${animeEntry.year}</div>
                      <div class="description_left_text">${animeEntry.isWebsite}</div>
                  </div>
              </div>
              <div id="anime-card-description" style="background-image: url('${imageUrl}')">
                  <p class="card-title">${animeName}</p>
                  <p class="card-rate">${rate}⭐  | ${statu}</p>
              </div>         
          </div>
        `;
        document.getElementById('phone-container').innerHTML = `
            <div class="description_right">
                <p style="text-align:center;background-color:rgba(16,0, 16, 0.3);"> اضغط على الزر أسفله 👇 لمشاهدة الأنمي</p>
                <a id="watch-now" href="watch.html" target="_blank"><b>شاهد الآن</b></a>
            </div> `;
        document.getElementById('phone-container').style.padding = '0 0 10px 0';
      } else {
        contentDiv.innerHTML = `
          <div id="go_to_description" class="separate"></div>
          <p class="section_title">${animeName}</p>
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
                      <div class="description_left_text">${animeName}</div>
                      <div class="description_left_text">${animeEntry.studio}</div>
                      <div class="description_left_text">${statu}</div>
                      <div class="description_left_text">${animeEntry.season}</div>
                      <div class="description_left_text">${animeEntry.nbEpisodes}</div>
                      <div class="description_left_text">${animeEntry.year}</div>
                      <div class="description_left_text">${animeEntry.isWebsite}</div>
                  </div>
              </div>
              <div id="anime-card-description" style="background-image: url('${imageUrl}')">
                  <p class="card-title">${animeName}</p>
                  <p class="card-rate">${rate}⭐  | ${statu}</p>
              </div>
              <div class="description_right">
                  <p><b>click the button below 👇 to get Episodes</b></p>
                  <a id="watch-now" href="watch.html" target="_blank"><b>watch now</b></a>
              </div>           
          </div>
      `;
    }
    localStorage.setItem('animeEntry',JSON.stringify(animeEntry));    
    document.getElementById('description').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error("Error fetching or parsing data:", error.message);
    }
    document.getElementById('spinner_container').style.display = 'none';
}

//window.addEventListener('resize', injectHtmlForPhone);
