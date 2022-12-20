# Soundboard

This soundboard is intended for entertainment purposes for reactions. To use, load the URL at which the soundboard is deployed and click the buttons to trigger sounds.

## Author

Kenny Carlile

- [KCarlile.com](KCarlile.com)
- [KCarlile on GitHub](https://github.com/KCarlile)

## Limitations

This soundboard requires minimal coding skills to customize and implement. At this time, there are no plans to make this fully managed (e.g. ability to upload sounds), so this is not meant to be a turnkey solution for non-technical users.

## Usage

To use the soundboard, you'll need to follow these steps:

1. Clone (or fork, then clone) this repository to your local computer.
   1. This repo comes with sample sounds, but you can delete the sound files from the `sounds/` directory and sound data entries from the `sounds/sounds.json` file.
1. Add sound files to the `sounds/` directory. At this time, `*.m4a`, `*.mp3`, and `*.wav` are supported. Other file formats may work, but those have not yet been tested.
1. For each sound in the `sounds/` directory, a corresponding data entry must exist in the `sounds/sounds.json` file. (See [Adding Sounds](#adding-sounds) below.)
1. Use this soundboard locally or deploy the entire directory to a web server. Specific instructions for deploying to a web server have been omitted as there are way too many possibilities for how to do this. However, see the [Local Development and Testing](#local-development--testing) section for information related to local use.

### Local Development & Testing

1. You could use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension with VS Code for local development and testing.
1. Or, you could use the Docker files included in this repository:
   1. Ensure that you have Docker installed.
   1. Add the following to your `/etc/hosts` file: `127.0.0.1 soundboard.local`
   1. Run the Docker container launch script included: `$ ./server`
      1. You may need to make this file executable: `$ sudo chmod +x ./server`
   1. Load `http://soundboard.local` in your browser.

## Adding Sounds

### sounds.json File Format

The `sounds.json` file provides the data for the soundboard app to load the audio files and provides other metadata, such as category, ID (for JS and CSS selection), source, and a user-friendly name. The file format is an array of JSON objects. You can see the sample sounds data here:

``` json
{
    "sounds": [
        {
            "id": "crowd-applause",
            "name": "Crowd Applause",
            "source": "Crowd clapping",
            "category": "Positive",
            "filename": "applause.wav"
        },
        {
            "id": "game-bonus",
            "name": "Game Bonus",
            "source": "Game sounds",
            "category": "Positive",
            "filename": "game-bonus.wav"
        },
        {
            "id": "joke-rimshot",
            "name": "Joke - Rimshot",
            "source": "Joke - Rimshot",
            "category": "Funny",
            "filename": "rimshot.m4a"
        },
        {
            "id": "sad-trombone",
            "name": "Sad Trombone",
            "source": "Sad Trombone",
            "category": "Negative",
            "filename": "sad-trombone.m4a"
        },
        {
            "id": "yay",
            "name": "Yay",
            "source": "Yay",
            "category": "Positive",
            "filename": "yay.mp3"
        },
        {
            "id": "wha-pssh",
            "name": "Wha-pssh!",
            "source": "Karate Chop",
            "category": "Neutral",
            "filename": "wha-pssh.mp3"
        }
    ]
}
```

Each sound has a block of JSON data that looks like this:

``` json
{
    "id": "crowd-applause",
    "name": "Crowd Applause",
    "source": "Crowd clapping",
    "category": "Positive",
    "filename": "applause.wav"
}
```

You can add more sounds placing the audio file in the `sounds/` directory and then edit the `sounds/sounds.json` file to include the new sound data. For example, let's say you wanted to add `wakka-wakka.mp3` to your soundboard. You would do so by placing `wakka-wakka.mp3` in the `sounds/` directory and then modify your `sounds/sounds.json` file to look like this:

``` json
{
    "sounds": [
        {
            // some other sound data
        },
        {
            "id": "wakka-wakka",
            "name": "Wakka wakka!",
            "source": "Fozzy Bear",
            "category": "Neutral",
            "filename": "wakka-wakka.mp3"
        }
    ]
}
```

The fields in the `sounds/sounds.json` file are used like this:

| Field | Description | Example |
| ----- | ----------- | ------- |
| id | Unique identifier used by JS for targeting the audio element. | `dr-villain-youll-never-stop-me` |
| name | This is the text that will appear on the sound button and should be the quoted text of the sound or a description of the sound. | `You'll never stop me!` |
| source | Context for the sound's source, such as the source material and the character saying the line. | `Super Hero Guy - Dr. Villain` |
| category | Category of the sound. Default mappings include: `Funny`, `Positive`, `Neutral`, and `Negative`. | `Neutral` |
| filename | Name of the file in the `sounds/` directory. `*.mp3`, `*.m4a`, and `*.wav` are currently supported, but other file types may work. | `dr-villain-youll-never-stop-me.mp3` |

## References

- [Sound board with vanilla JavaScript](https://www.youtube.com/watch?v=E-v4SSCG6i4)
  - Some initial inspiration was taken from this tutorial, but this work drifted from that original example.
- [Twitter Bootstrap 5.2](https://getbootstrap.com/docs/5.2/)
  - Bootstrap is used for base styling.
- [jQuery 3.6](https://jquery.com/)
  - jQuery is used for loading the JSON data and for some handy JavaScript functions.
