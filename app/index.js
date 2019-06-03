import "styles/index.scss";

const dave = document.getElementById("dave-fucking-grohl");
const mouth = dave.querySelector(".mouth");

let analyser;
let dataArray;
let bufferLength;
function createAnalyser(audioCtx) {
  const a = audioCtx.createAnalyser();
  a.fftSize = 1024;
  a.smoothingTimeConstant = 1;
  bufferLength = a.fftSize;
  dataArray = new Float32Array(bufferLength);
  a.getFloatTimeDomainData(dataArray);

  return a;
}

// Promise for loading sound
function loadSound(url, audioCtx) {
  analyser = createAnalyser(audioCtx);

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
      audioCtx.decodeAudioData(request.response).then(buffer => {
        resolve({ audioCtx, buffer });
      });
    };
    request.send();
  });
}

function playSound({ audioCtx, buffer }) {
  analyser = createAnalyser(audioCtx);
  const source = audioCtx.createBufferSource();
  source.connect(analyser);
  source.connect(audioCtx.destination);
  source.buffer = buffer;
  source.start(0);
  draw();
}

function playDaryl(e) {
  const audioCtx = new AudioContext();
  loadSound("assets/audio/fuckin_daryl.mp3", audioCtx).then(
    ({ audioCtx, buffer }) => {
      playSound({ audioCtx, buffer });
    }
  );
}

dave.addEventListener("mouseover", playDaryl);
dave.addEventListener("touchstart", playDaryl);

dave.addEventListener("mouseleave", e => {
  // source.stop();
  // mouth.classList.remove('daryl');
});

let drawVisual;
function draw() {
  drawVisual = requestAnimationFrame(draw);
  analyser.getFloatTimeDomainData(dataArray);
  for (let i = 0; i < bufferLength; i++) {
    const v = Math.floor(Math.abs(dataArray[i]) * 100);
    console.log(v);
    mouth.style.top = 167 + v + 10;
  }
}
