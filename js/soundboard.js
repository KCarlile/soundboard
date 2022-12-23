/**
 * js/soundboard.js
 * 
 * This JS file builds up the soundboard based on the data in sounds/sounds.json
 * by adding audio elements and buttons to trigger those audio elements.
 * 
 * Author: Kenny Carlile (KCarlile.com)
 * Source: https://github.com/KCarlile/soundboard
 */

// global variables and constants
var soundObjects = [];
const SOUNDS_PATH = 'sounds/';
const SOUNDS_JSON_FILE = 'sounds/sounds.json';
const DEBUG = false;

// when the page is ready, start building the soundboard
$(document).ready(function() {
    $.getJSON(SOUNDS_JSON_FILE, function(json) {
        buildSoundboard(json);
    });
}); // end jQuery document ready function

/**
 * Iterates over the JSON data and builds an array of sound data objects.
 * 
 * @param object[] Array of sound data objects.
 */
function buildSoundboard(json) {
    if (DEBUG) {
        console.log(json);
    } // end if test
    
    $.each(json , function(i, soundObj) {
        $.each(soundObj , function(j, sound) {
            // add the new sound object to the global array
            soundObjects.push(sound);

            // create an <audio> element on the page to store the audio file
            addAudioElement(sound);

            if (DEBUG) {
                logSound(sound);
            } // end if test
            
            // create a <button> element on the page to trigger playing of the
            // audio file in the associated <audio> element
            addButton(sound);
        });
    }); 
} // end buildSoundboard function

/**
 * For a given sound object, creates an <audio> tag based on that data.
 * 
 * @param object sound The object containing the sound data.
 */
function addAudioElement(sound) {
    // build up the <audio> element
    const audio = document.createElement('audio');
    audio.src = SOUNDS_PATH + sound.filename;
    audio.id = sound.id;

    // add the <audio> element to the appropriate parent
    document.getElementById('audioElements').appendChild(audio);
} // end addAudioElement function

/**
 * For a given sound object, adds a button to the appropriate category based on the data.
 * 
 * @param object sound The object containing the sound data.
 */
function addButton(sound) {
    // build up the <button> element
    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add(categoryToClass(sound.category));
    button.type = 'button';
    button.innerHTML = `<span class="soundName fw-bold">${sound.name}</span><span class="soundSource mt-2 fst-italic">${sound.source}</span>`;

    // handle the click event for playing the sound
    button.addEventListener('click', ()=>{
        stopSounds(); // stop all sounds that may be playing before starting the next one
        document.getElementById(sound.id).play();
    });

    // add the <button> element to the appropriate parent
    document.getElementById('buttons' + sound.category).appendChild(button);
} // end addButton function

/**
 * Loops over all audio elements and stops them so the next sound can be played.
 */
function stopSounds() {
    // for each sound, stop the playback and rewind to the beginning
    soundObjects.forEach((sound) => {
        const soundClip = document.getElementById(sound.id);
        soundClip.pause();
        soundClip.currentTime = 0;
    });
} // end stopSounds function

/**
 * Maps a category (string) to the associated class for targeting the right category div.
 * 
 * @param string category 
 * @returns The mapped class based on the category.
 */
function categoryToClass(category) {
    // set a default value, just in case
    // (...although the default case should handle this)
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

/**
 * Logs sound data to browser console for debugging.
 * 
 * @param object sound The object containing the sound data.
 */
function logSound(sound) {
    console.log("----- START SOUND -----");
    console.log("Name: " + sound.name);
    console.log("Category: " + sound.category);
    console.log("Source: " + sound.source);
    console.log("Filename: " + sound.filename);
    console.log("----- END SOUND -----");
} // end logSound function
