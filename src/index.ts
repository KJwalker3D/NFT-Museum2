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



export function main() {

createStructures()
ElevatorModule.createElevator
initializeElevatorDoors()
createAllDoors()
initializeKineticArt()
//initializeGalleryAreas()

setupUi()

// Use these functions to trigger the playlist (also toggle playlist and radio booleans in audio.ts and ui.tsx)
shufflePlaylist(playlist)
playCurrentSong()

// Use this function to trigger the radio (also toggle playlist and radio booleans in audio.ts and ui.tsx)
//playRadio()

engine.addSystem(changeArtHoverSystem)
engine.addSystem(artHoverSystem)

  // Create entity for artwork 1
  const entity100 = createArtID(Vector3.create(16, 1, 16), Vector3.One(), 1, "Art Title 1", "Art Description 1 by dskfhjñad");
  addArtworkData(entity100, 1, "Art Title 1", "Art Description 1 by sklfjdñs", true);

}
