import { NftFrameType, NftShape, Transform, engine } from "@dcl/ecs";
import { Color3, Quaternion, Vector3 } from "@dcl/ecs-math";
import { pointerEventsSystem, InputAction, MeshCollider, Entity } from "@dcl/sdk/ecs";
import { openNftDialog } from "~system/RestrictedActions";
import { artPos1, artRot1, artPos3, artRot3, artPos6, artRot6, artPos7, artRot7, artPos8, artRot8, artPos11, artRot11, artPos12, artRot12, artPos13, artPos16, artRot16, artPos17, artRot17, artPos18, artRot18, artPos19, artRot19, artPos20, artRot20, artPos21, artRot21, artPos22, artRot22, artPos23, artRot23, artPos24, artRot24, artRot13 } from "./artPositions";
import { canvasFrame, classicFrame } from "./nftFrames";


export type NFTdata = {
  room: number // location >> room 1 = ground floor; room 2 = first floor + mezzanine; room 3: rooftop area
  id: number
  position: Vector3
  rotation: Vector3,
  scale: Vector3,
  urn: string
  frame: NftFrameType,
  color: Color3
  hoverText: string
}

export const nftCollection: NFTdata[] = [
  {
    room: 1,
    id: 1,
    position: artPos1,
    rotation: artRot1,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: canvasFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 1,
    id: 3,
    position: artPos3,
    rotation: artRot3,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: canvasFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },

  {
    room: 2,
    id: 6,
    position: artPos6,
    rotation: artRot6,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 7,
    position: artPos7,
    rotation: artRot7,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 8,
    position: artPos8,
    rotation: artRot8,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 11,
    position: artPos11,
    rotation: artRot11,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 12,
    position: artPos12,
    rotation: artRot12,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 13,
    position: artPos13,
    rotation: artRot13,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 16,
    position: artPos16,
    rotation: artRot16,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 17,
    position: artPos17,
    rotation: artRot17,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 18,
    position: artPos18,
    rotation: artRot18,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 19,
    position: artPos19,
    rotation: artRot19,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 20,
    position: artPos20,
    rotation: artRot20,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 21,
    position: artPos21,
    rotation: artRot21,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 22,
    position: artPos22,
    rotation: artRot22,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 23,
    position: artPos23,
    rotation: artRot23,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 24,
    position: artPos24,
    rotation: artRot24,
    scale: Vector3.create(4, 4, 4),
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
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



