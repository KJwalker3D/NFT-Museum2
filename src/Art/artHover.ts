import { engine, Transform, Entity, InputAction, PointerEventType, PointerEvents, Schemas, inputSystem, MeshCollider, MeshRenderer, Material } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math";
import { getRandomHexColor } from "../helperFunctions";
import { artTitle1, artDescription1, artTitle2, artDescription2, artDescription10, artDescription11, artDescription12, artDescription13, artDescription14, artDescription15, artDescription16, artDescription17, artDescription18, artDescription19, artDescription20, artDescription21, artDescription22, artDescription23, artDescription24, artDescription3, artDescription4, artDescription5, artDescription6, artDescription7, artDescription8, artDescription9, artTitle10, artTitle11, artTitle12, artTitle13, artTitle14, artTitle15, artTitle16, artTitle17, artTitle18, artTitle19, artTitle20, artTitle21, artTitle22, artTitle23, artTitle24, artTitle3, artTitle4, artTitle5, artTitle6, artTitle7, artTitle8, artTitle9, artTitle25, artDescription25, artTitle26, artDescription26 } from "./artData";
import { gallery1Pos1, gallery1Rot1, gallery1Pos2, gallery1Rot2, gallery1Pos3, gallery1Rot3, gallery1Pos4, gallery1Rot4, gallery1Pos5, gallery1Rot5, gallery2Pos1, gallery2Rot1, gallery2Pos2, gallery2Rot2, gallery2Pos3, gallery2Rot3, gallery2Pos4, gallery2Rot4, gallery2Pos5, gallery2Rot5, gallery2Pos6, gallery2Rot6, gallery2Pos7, gallery2Rot7, gallery2Pos8, gallery2Rot8, gallery2Pos9, gallery2Rot9, gallery2Pos10, gallery2Rot10, gallery2Pos11, gallery2Rot11, gallery2Pos12, gallery2Rot12, gallery2Pos13, gallery2Rot13, gallery2Pos14, gallery2Rot14, gallery2Pos15, gallery2Rot15, gallery2Pos16, gallery2Rot16, gallery2Pos17, gallery2Rot17, gallery2Pos18, gallery2Rot18, gallery2Pos19, gallery2Rot19, gallery2Pos20, gallery2Rot20, gallery2Pos21, gallery2Rot21 } from "./artPositions";

export let hoverVisible = false
export let currentArtworkId = 1;

let visibilityTime = 5000 // duration of the art details UI in miliseconds
let defaultScale = Vector3.create(3.5, 0.85, 0.5) // art hover trigger size

export const ArtHover = engine.defineComponent('arthover', { visible: Schemas.Boolean })

export const ArtComponent = engine.defineComponent('art-id', {
    artTitle: Schemas.String,
    artDescription: Schemas.String
})

export function createArtID(position: Vector3, rotation: Vector3, artworkId: number, artTitle: string, artDescription: string): Entity {
    const entity = engine.addEntity()
    addArtworkData(entity, artworkId, artTitle, artDescription, true);
    setArtworkId(entity, artworkId);
    Transform.create(entity, {
        position: Vector3.create(position.x, position.y - 1, position.z),
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
        scale: defaultScale
    }) 

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


export function findArtworkById(id: number): ArtworkData | undefined {
    return artworkData.find(artwork => artwork.artworkId === id);
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


export function createArtHovers() {
    // Create art hover entity for each artwork
    const entityID1 = createArtID(gallery1Pos1, gallery1Rot1, 1, artTitle1, artDescription1);
    addArtworkData(entityID1, 1, artTitle1, artDescription1, true);

    const entityID2 = createArtID(gallery1Pos2, gallery1Rot2, 2, artTitle2, artDescription2);
    addArtworkData(entityID2, 2, artTitle2, artDescription2, true);

    const entityID3 = createArtID(gallery1Pos3, gallery1Rot3, 3, artTitle3, artDescription3);
    addArtworkData(entityID3, 3, artTitle3, artDescription3, true);

    const entityID4 = createArtID(gallery1Pos4, gallery1Rot4, 4, artTitle4, artDescription4);
    addArtworkData(entityID4, 4, artTitle4, artDescription4, true);

    const entityID5 = createArtID(gallery1Pos5, gallery1Rot5, 5, artTitle5, artDescription5);
    addArtworkData(entityID5, 5, artTitle5, artDescription5, true);

    const entityID6 = createArtID(gallery2Pos1, gallery2Rot1, 6, artTitle6, artDescription6);
    addArtworkData(entityID6, 6, artTitle6, artDescription6, true);

    const entityID7 = createArtID(gallery2Pos2, gallery2Rot2, 7, artTitle7, artDescription7);
    addArtworkData(entityID7, 7, artTitle7, artDescription7, true);

    const entityID8 = createArtID(gallery2Pos3, gallery2Rot3, 8, artTitle8, artDescription8);
    addArtworkData(entityID8, 8, artTitle8, artDescription8, true);

    const entityID9 = createArtID(gallery2Pos4, gallery2Rot4, 9, artTitle9, artDescription9);
    addArtworkData(entityID9, 9, artTitle9, artDescription9, true);

    const entityID10 = createArtID(gallery2Pos5, gallery2Rot5, 10, artTitle10, artDescription10);
    addArtworkData(entityID10, 10, artTitle10, artDescription10, true);

    const entityID11 = createArtID(gallery2Pos6, gallery2Rot6, 11, artTitle11, artDescription11);
    addArtworkData(entityID11, 11, artTitle11, artDescription11, true);

    const entityID12 = createArtID(gallery2Pos7, gallery2Rot7, 12, artTitle12, artDescription12);
    addArtworkData(entityID12, 12, artTitle12, artDescription12, true);

    const entityID13 = createArtID(gallery2Pos8, gallery2Rot8, 13, artTitle13, artDescription13);
    addArtworkData(entityID13, 13, artTitle13, artDescription13, true);

    const entityID14 = createArtID(gallery2Pos9, gallery2Rot9, 14, artTitle14, artDescription14);
    addArtworkData(entityID14, 14, artTitle14, artDescription14, true);

    const entityID15 = createArtID(gallery2Pos10, gallery2Rot10, 15, artTitle15, artDescription15);
    addArtworkData(entityID15, 15, artTitle15, artDescription15, true);

    const entityID16 = createArtID(gallery2Pos11, gallery2Rot11, 16, artTitle16, artDescription16);
    addArtworkData(entityID16, 16, artTitle16, artDescription16, true);

    const entityID17 = createArtID(gallery2Pos12, gallery2Rot12, 17, artTitle17, artDescription17);
    addArtworkData(entityID17, 17, artTitle17, artDescription17, true);

    const entityID18 = createArtID(gallery2Pos13, gallery2Rot13, 18, artTitle18, artDescription18);
    addArtworkData(entityID18, 18, artTitle18, artDescription18, true);

    const entityID19 = createArtID(gallery2Pos14, gallery2Rot14, 19, artTitle19, artDescription19);
    addArtworkData(entityID19, 19, artTitle19, artDescription19, true);

    const entityID20 = createArtID(gallery2Pos15, gallery2Rot15, 20, artTitle20, artDescription20);
    addArtworkData(entityID20, 20, artTitle20, artDescription20, true);

    const entityID21 = createArtID(gallery2Pos16, gallery2Rot16, 21, artTitle21, artDescription21);
    addArtworkData(entityID21, 21, artTitle21, artDescription21, true);

    const entityID22 = createArtID(gallery2Pos17, gallery2Rot17, 22, artTitle22, artDescription22);
    addArtworkData(entityID22, 22, artTitle22, artDescription22, true);

    const entityID23 = createArtID(gallery2Pos18, gallery2Rot18, 23, artTitle23, artDescription23);
    addArtworkData(entityID23, 23, artTitle23, artDescription23, true);

    const entityID24 = createArtID(gallery2Pos19, gallery2Rot19, 24, artTitle24, artDescription24);
    addArtworkData(entityID24, 24, artTitle24, artDescription24, true);

    const entityID25 = createArtID(gallery2Pos20, gallery2Rot20, 25, artTitle25, artDescription25);
    addArtworkData(entityID25, 25, artTitle25, artDescription25, true);

    const entityID26 = createArtID(gallery2Pos21, gallery2Rot21, 26, artTitle26, artDescription26);
    addArtworkData(entityID26, 26, artTitle26, artDescription26, true);
}

