const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("Number:", randomNum);

// Depends on web browser
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition(); // Object to work with

// Start recognition and game
recognition.start(); // From documentation

// Capture user speak
function onSpeak(e) {
  console.log(e);
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// Write user message
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div> You said: </div>
    <span class="box">${msg}</span>
    `;
}

// Check message
function checkNumber(msg) {
  const num = +msg; // + converts from a string to num

  // Check if valid number

  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div> Not a valid number</div>`;
    console.log(num);
  }

  // Check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`;
    return;
  }

  // Check number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the right number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play again</button>
      `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>GO LOWER</div>`;
  } else {
    msgEl.innerHTML += `<div>GO HIGHER</div>`;
  }
}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener("result", onSpeak);

// End SR

recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
