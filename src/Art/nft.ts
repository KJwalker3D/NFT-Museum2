import { NftFrameType, NftShape, Transform, engine } from "@dcl/ecs";
import { Color3, Quaternion, Vector3 } from "@dcl/ecs-math";
import { pointerEventsSystem, InputAction, MeshCollider, TransformType, Entity } from "@dcl/sdk/ecs";
import { openNftDialog } from "~system/RestrictedActions";
import { gallery1Pos1, gallery1Rot1, gallery1Pos3, gallery1Rot3, gallery2Pos1, gallery2Rot1, gallery2Pos2, gallery2Rot2, gallery2Pos3, gallery2Rot3, gallery2Pos6, gallery2Rot6, gallery2Pos7, gallery2Rot7, gallery2Pos8, gallery2Rot8 } from "./artPositions";
import { canvasFrame, noFrame, classicFrame } from "./nftFrames";


export type NFTdata = {
  room: number
  id: number
  position: Vector3
  rotation: Vector3,
  scale: Vector3,
  urn: string
  artTitle: string
  frame: NftFrameType,
  color: Color3
  hoverText: string
}

export const nftCollection: NFTdata[] = [
  {
    room: 1,
    id: 1,
    position: gallery1Pos1,
    rotation: gallery1Rot1,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: 'adkfj',
    frame: canvasFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 1,
    id: 2,
    position: gallery1Pos3,
    rotation: gallery1Rot3,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: 'kdjfh',
    frame: canvasFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },

  {
    room: 2,
    id: 4,
    position: gallery2Pos1,
    rotation: gallery2Rot1,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '100',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 5,
    position: gallery2Pos2,
    rotation: gallery2Rot2,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '101',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 6,
    position: gallery2Pos3,
    rotation: gallery2Rot3,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '102',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 7,
    position: gallery2Pos6,
    rotation: gallery2Rot6,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '110',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 8,
    position: gallery2Pos7,
    rotation: gallery2Rot7,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '110',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 9,
    position: gallery2Pos8,
    rotation: gallery2Rot8,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '110',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },



]
export function createNFT(
  position: Vector3,
  rotation: Vector3,
  scale: Vector3,
  urn: string,
  frameColor: Color3,
  frameStyle: NftFrameType, // listed below
  hoverText: string
) {
  let entity = engine.addEntity()
  Transform.create(entity, {
    position: position,
    rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
    scale: scale
  })
  MeshCollider.setPlane(entity)
  pointerEventsSystem.onPointerDown(
    {
      entity: entity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: hoverText,
      },
    },
    function () {
      console.log('clicked artwork');
      openNftDialog({
        urn: urn
      });
    }
  );
  NftShape.create(entity, {
    urn: urn,
    color: frameColor,
    style: frameStyle
  })

  return entity
}



export function removeNFTs(entity: Entity) {
  engine.removeEntity(entity)
}

