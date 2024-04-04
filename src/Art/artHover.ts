import { engine, Transform, Entity, InputAction, PointerEventType, PointerEvents, Schemas, inputSystem, MeshCollider, MeshRenderer, Material } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { galleryAreas } from "../galleryAreas";
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math";
import { getRandomHexColor } from "../helperFunctions";

export let hoverVisible = false
export let currentArtworkId = 1;

let visibilityTime = 5000 // duration of the art details UI in miliseconds

export const ArtHover = engine.defineComponent('arthover', { visible: Schemas.Boolean })

export const ArtComponent = engine.defineComponent('art-id', {
    artTitle: Schemas.String,
    artDescription: Schemas.String
})

export function createArtID(position: Vector3, rotation: Vector3, artworkId: number, artTitle: string, artDescription: string): Entity {
    const entity = engine.addEntity()

    //ArtComponent.create(entity, { artTitle, artDescription })
    addArtworkData(entity, artworkId, artTitle, artDescription, true);
    setArtworkId(entity, artworkId);
    Transform.create(entity, { position: position, rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z), scale: Vector3.create(1, 0.85, 5) })
   
    MeshRenderer.setBox(entity)
    MeshCollider.setBox(entity)

    Material.setPbrMaterial(entity, { albedoColor: Color4.fromHexString(getRandomHexColor()) })
  
    ArtHover.create(entity, { visible: false })
    PointerEvents.create(entity, {
      pointerEvents: [
        {
          eventType: PointerEventType.PET_HOVER_ENTER, eventInfo: {
            button: InputAction.IA_ANY, hoverText: artTitle,
          }
        }
        
      ]
    })
    return entity
  }

export function artHoverSystem(dt: number) {
    const artEntities = engine.getEntitiesWith(ArtHover, Transform)
    for (const [entity, _arthover, _transform] of artEntities) {
        const mutableTransform = Transform.getMutable(entity)
        const artDetails = ArtHover.get(entity)
    }
}



export function changeArtHoverSystem() {
    for (const [entity] of engine.getEntitiesWith(ArtHover, PointerEvents)) {
        const artworkId = getArtworkId(entity);

        if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_ENTER, entity)) {
            Material.setPbrMaterial(entity, { albedoColor: Color4.fromHexString(getRandomHexColor()) });
            if (artworkId !== undefined) {
                changeCurrentArtworkId(artworkId);
                console.log('hover?', hoverVisible);
                console.log('should work');
            }
            hoverVisible = true;
            // Set a timeout to hide the hover after 900 milliseconds
            utils.timers.setTimeout(() => {
                hoverVisible = false;
            }, visibilityTime);
        } else if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_LEAVE, entity)) {
            hoverVisible = false;
            console.log('hover?', hoverVisible);

        }
    }
}

export function toggleHover() {
    hoverVisible = false
}





export function changeCurrentArtworkId(newId: number) {
    const artwork = findArtworkById(newId);
    if (artwork && artwork.visible) {
        currentArtworkId = newId;
    }
}


// Function to find artwork by ID
export function findArtworkById(id: number): ArtworkData | undefined {
    return artworkData.find(artwork => artwork.artworkId === id);
}


galleryAreas.forEach((entity) => { 
    ArtComponent.create 
    //createArtUI(position, rotation, getArtworkId, artTitle, artDescription)
});


export interface ArtworkData {
    entity: Entity;
    artworkId: number;
    title: string;
    description: string;
    visible: boolean;
}

export const artworkData: ArtworkData[] = []


export function addArtworkData(entity: Entity, artworkId: number, title: string, description: string, visible: boolean) {
    artworkData.push({ entity, artworkId, title, description, visible });
}

// Create a map to store artwork IDs associated with entities
export const ArtworkIdMap = new Map<Entity, number>();

// Function to set artwork ID for an entity
export function setArtworkId(entity: Entity, artworkId: number) {
  ArtworkIdMap.set(entity, artworkId);
}

// Function to get artwork ID for an entity
export function getArtworkId(entity: Entity): number | undefined {
  return ArtworkIdMap.get(entity);
}

// Use server hosted images or paths to files in your project folder
export let logoImage = 'https://bafkreih4ndg6qpczqw2ardbrrdoj23t43hiegbceo36hbi3vjqskcoi4yu.ipfs.nftstorage.link/'
export let logoURL = 'https://LowPolyModelsWorld.com'

export let groundVideo = 'https://player.vimeo.com/external/711197011.m3u8?s=1fe29a85f3c1455580a070eee4fb93abcb2ed5a2&logging=false'
export let groundVidURL = 'https://LowPolyModelsWorld.com'

export let urn1 = 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536'
export let urn2 = 'urn:decentraland:ethereum:erc721:0xd73be539d6b2076bab83ca6ba62dfe189abc6bbe:64359'
export let urn3 = 'urn:decentraland:ethereum:erc721:0x41a322b28d0ff354040e2cbc676f0320d8c8850d:3734'
export let urn4 = 'urn:decentraland:ethereum:erc721:0xecf7ef42b57ee37a959bf507183c5dd6bf182081:100'
export let urn5 = 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:1540722'



