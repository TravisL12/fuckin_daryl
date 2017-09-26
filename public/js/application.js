'use strict';

const daryl = document.getElementsByTagName('audio')[0];
const dave = document.getElementById('dave-fucking-grohl');

dave.addEventListener('mouseover', (e) => {
    if (daryl) {
        daryl.play();
    }
})

dave.addEventListener('mouseleave', (e) => {
    if (daryl) {
        daryl.pause();
        daryl.currentTime = 0;
    }
})
