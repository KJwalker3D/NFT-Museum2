
import { engine, Entity, AvatarAttach, AvatarAnchorPointType, AudioSource } from "@dcl/sdk/ecs";
import { openExternalUrl } from '~system/RestrictedActions';
import { playPlaylist, streamEntity, togglePlaylist } from "./playlist";
import { playRadio, toggleRadio } from "./radio";

/// This is the Playlist, set to false to remove it
export let Playlist: Boolean = false;


// This is the radio, set to true to play it 
export let radioPlaying: boolean = true;


// Function to set the radio state
export function setRadioPlaying(value: boolean) {
    radioPlaying = value;
  }







// Global variable to store the audio entity
let audioEntity: Entity | null = null;

// Function to get the state of stream playing
let isStreamPlaying = () => Playlist;

// Function to get the state of radio playing
let isRadioPlaying = () => radioPlaying;

// Variables to store the previous state of playlist and radio
let prevPlaylist: boolean = false;
let prevRadio: boolean = false;

// Function to toggle between stream and radio playing
export function togglePlay() {
  // Get the current states of stream and radio playing
  const streamPlaying = isStreamPlaying();
  const radioPlaying = isRadioPlaying();
  
  console.log('toggle audio');
  
  // Toggle the states of stream and radio playing
  if (streamPlaying) {
    togglePlaylist();
    prevPlaylist = true;
    prevRadio = false;
    console.log(`playlist playing: ${streamPlaying}`);
    //Playlist = false
  }
  
  if (radioPlaying) {
    toggleRadio();
    prevRadio = true;
    prevPlaylist = false;
  }
  
  // If neither stream nor radio were playing, play the previously active source
  if (!streamPlaying && !radioPlaying) {
    if (prevPlaylist) {
      playPlaylist();
    } else if (prevRadio) {
      playRadio();
    }
  }
}

// Global function to play an audio clip at the player's location
export function playAudioAtPlayer(audioClipUrl: string, volume: number = 100) {
  // Get the player's entity
  if (!audioEntity) {
    // Create the audio entity if it doesn't exist
    audioEntity = engine.addEntity();
    
    // Attach the audio entity to the player's name tag position
    AvatarAttach.create(audioEntity, {
      anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG
    });
    
    // Create AudioSource component
    AudioSource.createOrReplace(audioEntity, {
      audioClipUrl: audioClipUrl,
      loop: false,
      volume: volume
    });
  }
  
  // Set the audio clip URL and play the audio
  AudioSource.playSound(audioEntity, audioClipUrl, true);
  
  console.log('Audio played at player location:', audioClipUrl);
}
