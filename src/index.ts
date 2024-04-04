import { createStructures } from './structures'
import { ElevatorModule } from './Elevator/elevator'
import { createAllDoors, doorSound } from './doors'
import { initializeKineticArt } from './Art/kineticArt'
import { initializeElevatorDoors } from './Elevator/elevatorDoors'
import { initializeGalleryAreas, loadGalleryArea } from './galleryAreas'
//import VLM from 'vlm-dcl'
import { setupUi } from './UI/ui'
import { playCurrentSong, playRadio, playlist, shufflePlaylist } from './audio'
import { addArtworkData, artHoverSystem, changeArtHoverSystem, createArtID } from './Art/artHover'
import { engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { gallery1Pos1, gallery1Pos2, gallery1Rot1, gallery1Rot2 } from './Art/artPositions'
import { artDescription1, artDescription2, artTitle1, artTitle2 } from './Art/artData'



export function main() {

createStructures()
ElevatorModule.createElevator
initializeElevatorDoors()
createAllDoors()
initializeKineticArt()
initializeGalleryAreas()

setupUi()

// Use these functions to trigger the playlist (also toggle playlist and radio booleans in audio.ts and ui.tsx)
shufflePlaylist(playlist)
playCurrentSong()

// Use this function to trigger the radio (also toggle playlist and radio booleans in audio.ts and ui.tsx)
//playRadio()

engine.addSystem(changeArtHoverSystem)
engine.addSystem(artHoverSystem)

  // Create entity for artwork 1
  const entityID1 = createArtID(gallery1Pos1, gallery1Rot1, 1, artTitle1, artDescription1);
  addArtworkData(entityID1, 1, artTitle1, artDescription1, true);

    // Create entity for artwork 1
    const entityID2 = createArtID(gallery1Pos2, gallery1Rot2, 2, artTitle2, artDescription2);
    addArtworkData(entityID2, 2, artTitle2, artDescription2, true);
  
}
