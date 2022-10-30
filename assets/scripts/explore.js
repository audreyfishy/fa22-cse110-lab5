// explore.js

window.addEventListener('DOMContentLoaded', init);

function updateImage(isSpeaking) {
  let image = document.querySelector('img');
  if(isSpeaking) {
    image.src = 'assets/images/smiling-open.png';
    image.alt = 'Smiling open';
  }
  else{
    image.src = 'assets/images/smiling.png';
    image.alt = 'Smiling face';
  }
}

function init() {
  const synth = window.speechSynthesis;

  const inputForm = document.getElementById('text-to-speak');
  const voiceSelect = document.querySelector('select');

  let voices = [];

  function populateVoiceList() {
    voices = synth.getVoices();

    for (let i = 0; i < voices.length ; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += ' — DEFAULT';
      }

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  const button = document.querySelector('button');
  button.addEventListener('click', (event) => {
    event.preventDefault();

    const utterThis = new SpeechSynthesisUtterance(inputForm.value);
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (let i = 0; i < voices.length ; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    updateImage(true);
    synth.speak(utterThis);
    var timer = setInterval(() => {
      if(synth.speaking == false) {
        updateImage(false);
        clearInterval(timer);
      }
    }, 1000);
  });
}