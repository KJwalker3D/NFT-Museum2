import { engine, Transform, Entity, InputAction, PointerEventType, PointerEvents, Schemas, inputSystem, MeshCollider, MeshRenderer, Material } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math";
import { getRandomHexColor } from "../helperFunctions";
import { artTitle1, artDescription1, artTitle2, artDescription2 } from "./artData";
import { gallery1Pos1, gallery1Rot1, gallery1Pos2, gallery1Rot2 } from "./artPositions";

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
    Transform.create(entity, { 
        position: Vector3.create(position.x, position.y - 1, position.z), 
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z), 
        scale: Vector3.create(5, 0.85, 1) }) // default
   
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

export function createArtHovers() {
      // Create entity for artwork 1
  const entityID1 = createArtID(gallery1Pos1, gallery1Rot1, 1, artTitle1, artDescription1);
  addArtworkData(entityID1, 1, artTitle1, artDescription1, true);

    // Create entity for artwork 1
    const entityID2 = createArtID(gallery1Pos2, gallery1Rot2, 2, artTitle2, artDescription2);
    addArtworkData(entityID2, 2, artTitle2, artDescription2, true);
}

