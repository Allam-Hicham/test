
async function search() {
    const searchTerm = document.getElementById('searchTerm').value;
    if (searchTerm === ''){
        return;
    }
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (window.matchMedia("(max-width: 768px)").matches) {
        document.getElementById('search-button').innerHTML = '<img style="width:10px; height:20px;border-radius:3px;" src="images/search.gif">';
    } else {
        document.getElementById('search-button').innerHTML = '<img style="width:28px; height:26px;border-radius:13px;" src="images/search.gif">';
    }
    const response = await fetch(`${searchUrl}?term=${encodeURIComponent(searchTerm)}`);
    const results = await response.json();
    document.getElementById('search-button').innerHTML = '&#128270;';
    if (results.length === 0) {
        resultsDiv.innerHTML = `<p class="search" onclick="document.getElementById('searchTerm').value ='';">🚫</p>
                                <p class="search">No results found.</p>`;
        searchStat(searchTerm,'not found');
    } else {
        resultsDiv.innerHTML = results.map((item) => `
            <img width="100%" height="26px" src="${item.data[4]}">
            <p class="search"  onclick="getAnimeCard('${item.data[0]}', '${item.data[1]}', '${item.data[2]}', '${item.data[4]}', '${item.data[5]}', '${item.data[7]}', '${item.data[8]}', '${item.data[9]}'" >
            ${item.data[0]} &middot; ${item.data[1]}⭐ ${item.data[2]}
              </p>`
        ).join('');
        resultsDiv.innerHTML = `<p class="search" onclick="document.getElementById('searchTerm').value ='';">🚫</p>
                                <p class="search" onclick="document.getElementById('searchTerm').value ='';">Cancel</p>`
                                 +resultsDiv.innerHTML;
        searchStat(searchTerm,'found');
        searchTerm = '';
    }
}
document.getElementById('results').addEventListener('click',function(){
    this.innerHTML ='';
    document.getElementById('searchTerm').placeholder ='...(ابحث (بالانجليزية';
     document.getElementById('searchTerm').value ='';
})


async function searchStat(searchTerm, etat) {
    const formData = new FormData();
    const currentDate = new Date().toISOString();
    formData.append('search', searchTerm);
    formData.append('etat', etat);
    formData.append('timestamp', currentDate);
    // Function to get the current geolocation
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

    // Attempt to get the user's location
    try {
        const location = await getCurrentPosition();
        formData.append('location', location);
    } catch (error) {
        formData.append('location', 'Location unavailable');
        console.error('Geolocation error:', error);
    }
    // Prepare URLSearchParams
    const params = new URLSearchParams();
    for (const pair of formData.entries()) {
        params.append(pair[0], pair[1]);
    }
    // Send the data to the Google Apps Script endpoint
    fetch(sendSearchUrl, {
            method: 'POST',
            body: params,
    });
}
