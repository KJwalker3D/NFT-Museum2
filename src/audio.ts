import { Animator, engine, Transform, GltfContainer, ColliderLayer, Entity, pointerEventsSystem, InputAction, AudioSource, MeshRenderer, AvatarAttach, AvatarAnchorPointType, AudioStream, VisibilityComponent } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils'
import { openExternalUrl } from '~system/RestrictedActions'
import { streamEntity, streamPlayingRef } from "./playlist";
import { radioPlaying } from "./radio";




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

let audioEntity: Entity | null = null;
if (audioEntity) {
  VisibilityComponent.create(audioEntity, {visible: false})
}

let isStreamPlaying = streamPlayingRef.value;
let isRadioPlaying = radioPlaying



export function togglePlay() {
  if (isStreamPlaying) {
    isStreamPlaying = false
  } else if (radioPlaying) {
    isRadioPlaying = false
  } else if (!isStreamPlaying) {
    isStreamPlaying = true
  } else if (!radioPlaying) {
    isRadioPlaying = true
  }
}