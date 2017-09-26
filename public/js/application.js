'use strict';

const dave = document.getElementById('dave-fucking-grohl');
const mouth = dave.querySelector('.mouth');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let source;

// Promise for loading sound
function loadSound (url) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        let buffer;
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.onload = function() {
          audioCtx.decodeAudioData(request.response).then((buffer) => {
            resolve(buffer);
          });
        }
        request.send();
    })
}

function playSound(buffer) {
  source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.start(0);
}

function playDaryl(e) {
    mouth.classList.add('daryl');
    loadSound('public/audio/fuckin_daryl.mp3').then((buffer) => {
        playSound(buffer);
    });
}

dave.addEventListener('mouseover', playDaryl);
dave.addEventListener('touchstart', playDaryl);

dave.addEventListener('mouseleave', (e) => {
    source.stop();
    mouth.classList.remove('daryl');
})
