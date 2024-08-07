(function() {
    const images = ['blue_imogie.png', 'red_imogie.png', 'black_imogie.png', 'pink_imogie.png', 'yellow_imogie.png'];
    const myText= ['blue', 'red', 'dark', 'pink', 'yellow'];
    const myStyle= ['css/blue.css','css/red.css', 'css/dark.css', 'css/pink.css', 'css/yellow.css'];
    let curIndex = 0;

    document.getElementById('my-image-mode').addEventListener('click', function() {
        curIndex = (curIndex + 1) % images.length;
        this.src = 'images/page_color/'+images[curIndex];
        document.getElementById('text-mode').innerHTML = myText[curIndex];
        document.getElementById('my_style').href = myStyle[curIndex];
        localStorage.setItem('style', JSON.stringify(['images/page_color/'+images[curIndex],myText[curIndex], myStyle[curIndex]]));
    });
})();
const localStyle = JSON.parse(localStorage.getItem('style'));
document.getElementById('my-image-mode').src = localStyle[0];
document.getElementById('text-mode').innerHTML = localStyle[1];
document.getElementById('my_style').href = localStyle[2];


