import { Entity, Transform, NftFrameType, NftShape, TransformType, engine, pointerEventsSystem, InputAction, PointerEventType, PointerEvents, MeshCollider, MeshRenderer } from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4, Color3 } from '@dcl/sdk/math'
import { openNftDialog } from '~system/RestrictedActions'
import { gallery1Pos1, gallery1Pos3, gallery1Rot1, gallery1Rot3, gallery2Pos1, gallery2Pos2, gallery2Pos3, gallery2Pos6, gallery2Pos7, gallery2Pos8, gallery2Rot1, gallery2Rot2, gallery2Rot3, gallery2Rot6, gallery2Rot7, gallery2Rot8 } from '../Art/artPositions'
import { canvasFrame, classicFrame, noFrame } from '../Art/nft'

export type NFTdata = {
  room: number
  id: number
  position: TransformType
  urn: string
  artTitle: string
  frame: NftFrameType,
  color: Color3
}

export const nftCollection: NFTdata[] = [
  {
    room: 1,
    id: 1,
    position: {
      position: gallery1Pos1,
      rotation: Quaternion.fromEulerDegrees(gallery1Rot1.x, gallery1Rot1.y, gallery1Rot1.z),
      scale: Vector3.create(4, 4, 4)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: 'adkfj',
    frame: canvasFrame,
    color: Color3.Yellow()
  },
  {
    room: 1,
    id: 2,
    position: {
      position: gallery1Pos3,
      rotation: Quaternion.fromEulerDegrees(gallery1Rot3.x, gallery1Rot3.y, gallery1Rot3.z),
      scale: Vector3.create(4, 4, 4)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: 'kdjfh',
    frame: canvasFrame,
    color: Color3.Yellow()
  },
  {
    room: 1,
    id: 3,
    position: {
      position: Vector3.create(7.3, 2, 26),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '218',
    frame: noFrame,
    color: Color3.Yellow()
  },
  {
    room: 2,
    id: 4,
    position: {
      position: gallery2Pos1,
      rotation: Quaternion.fromEulerDegrees(gallery2Rot1.x, gallery2Rot1.y, gallery2Rot1.z),
      scale: Vector3.create(4, 4, 4)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '100',
    frame: classicFrame,
    color: Color3.Yellow()
  },
  {
    room: 2,
    id: 5,
    position: {
      position: gallery2Pos2,
      rotation: Quaternion.fromEulerDegrees(gallery2Rot2.x, gallery2Rot2.y, gallery2Rot2.z),
      scale: Vector3.create(4, 4, 4)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '101',
    frame: classicFrame,
    color: Color3.Yellow()
  },
  {
    room: 2,
    id: 6,
    position: {
      position: gallery2Pos3,
      rotation: Quaternion.fromEulerDegrees(gallery2Rot3.x, gallery2Rot3.y, gallery2Rot3.z),
      scale: Vector3.create(4, 4, 4)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '102',
    frame: classicFrame,
    color: Color3.Yellow()
  },
  {
    room: 2,
    id: 7,
    position: {
      position: gallery2Pos6,
      rotation: Quaternion.fromEulerDegrees(gallery2Rot6.x, gallery2Rot6.y, gallery2Rot6.z),
      scale: Vector3.create(4, 4, 4)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '110',
    frame: classicFrame,
    color: Color3.Yellow()
  },
  {
    room: 2,
    id: 8,
    position: {
      position: gallery2Pos7,
      rotation: Quaternion.fromEulerDegrees(gallery2Rot7.x, gallery2Rot7.y, gallery2Rot7.z),
      scale: Vector3.create(4, 4, 4)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '110',
    frame: classicFrame,
    color: Color3.Yellow()
  },
  {
    room: 2,
    id: 9,
    position: {
      position: gallery2Pos8,
      rotation: Quaternion.fromEulerDegrees(gallery2Rot8.x, gallery2Rot8.y, gallery2Rot8.z),
      scale: Vector3.create(4, 4, 4)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '110',
    frame: classicFrame,
    color: Color3.Yellow()
  },
  
  
 
]

export function createPainting(
  parent: Entity | undefined,
  id: number,
  position: TransformType,
  urn: string,
  artTitle: string,
  frame: NftFrameType,
  frameColor: Color3
) {
  const entity = engine.addEntity()

  const nftShape = NftShape.create(entity, {
    urn: urn, 
    color: frameColor,
    style: frame
  })

  Transform.create(entity, { position: position.position, rotation: position.rotation, scale: position.scale })


    MeshCollider.setBox(entity)

  if (parent !== undefined) {
    Transform.createOrReplace(entity, {
      position: position.position, 
      parent: parent})
  }

  pointerEventsSystem.onPointerDown(
    {
      entity: entity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Click',
      },
    },
    function () {
      console.log('clicked artwork');
      openNftDialog({
        urn: urn
      });
    }
  );

  return entity
}


export function removePaintings(entity: Entity) {
  engine.removeEntity(entity)
}
