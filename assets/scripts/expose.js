
function updateHorn(horn){
  var hornImage = document.getElementById("expose").children[1];
  var hornAudio = document.getElementsByClassName("hidden")[0];
  hornImage.src = `assets/images/${horn}.svg`;
  hornImage.alt = `${horn} image`;
  hornAudio.src = `assets/audio/${horn}.mp3`;
  hornAudio.alt = `${horn} sound`;
}

function updateVolumeImage(volume){
  var volumeImage = document.getElementById("volume-controls").children[1];
  if (volume >= 67){
    volumeImage.src = "assets/icons/volume-level-3.svg";
    volumeImage.alt = "Volume level 3";
  }
  else if (volume >= 33){
    volumeImage.src = "assets/icons/volume-level-2.svg";
    volumeImage.alt = "Volume level 2";
  }
  else if (volume >= 1){
    volumeImage.src = "assets/icons/volume-level-1.svg";
    volumeImage.alt = "Volume level 1";
  }
  else{
    volumeImage.src = "assets/icons/volume-level-0.svg";
    volumeImage.alt = "Volume level 0";
  }
}

function updateVolume(volume){
  let hornAudio = document.getElementsByClassName("hidden")[0];
  hornAudio.volume = volume / 100;
}

function init() {
  // Add event listener to the drop down menu
  const hornSelect = document.getElementById("horn-select");
  hornSelect.addEventListener('input', (event) => {
    // Get the value of the selected option
    const selectedHorn = event.target.value;
    // Update the image and audio sources
    updateHorn(selectedHorn);
  });

  // Add event listener to the volume slider
  const volumeSlider = document.getElementById("volume");
  volumeSlider.addEventListener('input', (event) => {
    // Get the value of the volume slider
    const volume = event.target.value;
    // Update the volume image
    updateVolumeImage(volume);
    // Update the volume of the <audio> element
    updateVolume(volume);
  });

  // Add event listener to the play button
  const audio = document.getElementsByClassName("hidden")[0];
  const playButton = audio.previousElementSibling;
  playButton.addEventListener('click', (event) => {
    audio.play();
    const jsConfetti = new JSConfetti()
    if(hornSelect.value == "party-horn") jsConfetti.addConfetti();
  });
}
window.addEventListener('DOMContentLoaded', init);
