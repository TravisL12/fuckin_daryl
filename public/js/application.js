'use strict';

const dave = document.getElementById('dave-fucking-grohl');
const mouth = dave.querySelector('.mouth');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 1024;
analyser.smoothingTimeConstant = 1;
const bufferLength = analyser.fftSize;
const dataArray = new Float32Array(bufferLength);
analyser.getFloatTimeDomainData(dataArray);

let source;

// Promise for loading sound
function loadSound (url) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
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
  source.connect(analyser);
  source.connect(audioCtx.destination);
  source.buffer = buffer;
  source.start(0);
  draw();
}

function playDaryl(e) {
    // mouth.classList.add('daryl');
    loadSound('public/audio/fuckin_daryl.mp3').then((buffer) => {
        playSound(buffer);
    });
}

dave.addEventListener('mouseover', playDaryl);
dave.addEventListener('touchstart', playDaryl);

dave.addEventListener('mouseleave', (e) => {
    source.stop();
    // mouth.classList.remove('daryl');
})

let drawVisual;
function draw() {
    drawVisual = requestAnimationFrame(draw);
    analyser.getFloatTimeDomainData(dataArray);
    // console.log(dataArray);
    for(let i = 0; i < bufferLength; i++) {
        let v = Math.floor(Math.abs(dataArray[i]) * 100);
        mouth.style.top = 167 + v + 10;
    }
}
