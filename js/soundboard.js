var soundObjects = [];
const SOUNDS_PATH = 'sounds/';
const SOUNDS_JSON_FILE = 'sounds/sounds.json';

$(document).ready(function() {
    $.getJSON(SOUNDS_JSON_FILE, function(json) {
        const soundsData = json;
        buildSoundboard(soundsData);
    });
}); // end jQuery document ready function

function buildSoundboard(json) {
    console.log(json);
    $.each(json , function(i, soundObj) {
        $.each(soundObj , function(j, sound) {
            soundObjects.push(sound);
            addAudioElement(sound);

            logSound(sound);
            addButton(sound);
        });
    }); 
} // end buildSoundboard function

function addAudioElement(sound) {
    const audio = document.createElement('audio');
    audio.src = SOUNDS_PATH + sound.filename;
    audio.id = sound.id;

    document.getElementById('audioElements').appendChild(audio);
} // end addAudioElement function

function addButton(sound) {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add(categoryToClass(sound.category));
    button.type = 'button';
    /*button.innerText = sound.name + "\n\n" + sound.source;*/
    button.innerHTML = '<span class="soundName fw-bold">' + sound.name + '</span>' + '<span class="soundSource mt-3 fst-italic">' + sound.source + '</span>';

    button.addEventListener('click', ()=>{
        stopSounds(); // stop all sounds that may be playing before starting the next one
        document.getElementById(sound.id).play();
    });

    document.getElementById('buttons' + sound.category).appendChild(button);
} // end addButton function

function stopSounds() {
    soundObjects.forEach((sound) => {
        const soundClip = document.getElementById(sound.id);
        soundClip.pause();
        soundClip.currentTime = 0;
    });
} // end stopSounds function

function logSound(sound) {
    console.log("----- START SOUND -----");
    console.log("Name: " + sound.name);
    console.log("Category: " + sound.category);
    console.log("Source: " + sound.source);
    console.log("Filename: " + sound.filename);
    console.log("----- END SOUND -----");
} // end logSound function

function categoryToClass(category) {
    let buttonClass = 'btn-secondary';
    switch(category) {
        case 'Funny':
            buttonClass = 'btn-info';
            break;
        case 'Neutral':
            buttonClass = 'btn-warning';
            break;
        case 'Positive':
            buttonClass = 'btn-success';
            break;
        case 'Negative':
            buttonClass = 'btn-danger';
            break;
        default:
            buttonClass = 'btn-secondary';
    } // end switch-case

    return buttonClass;
} // end categoryToClass function
