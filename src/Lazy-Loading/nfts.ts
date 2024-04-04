import { Entity, Transform, NftFrameType, NftShape, TransformType, engine, pointerEventsSystem, InputAction, PointerEventType, PointerEvents, MeshCollider, MeshRenderer } from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { openNftDialog } from '~system/RestrictedActions'

export type NFTdata = {
  room: number
  id: number
  position: TransformType
  urn: string
  artTitle: string
}

export const nftCollection: NFTdata[] = [
  {
    room: 1,
    id: 1,
    position: {
      position: Vector3.create(5, 2, 29),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: 'adkfj'
  },
  {
    room: 1,
    id: 2,
    position: {
      position: Vector3.create(3, 2, 26),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: 'kdjfh'
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
    artTitle: '218'
  },
  {
    room: 2,
    id: 4,
    position: {
      position: Vector3.create(4 + 12, 2, 29),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '100'
  },
  {
    room: 2,
    id: 5,
    position: {
      position: Vector3.create(2 + 12, 2, 26),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '101'
  },
  {
    room: 2,
    id: 6,
    position: {
      position: Vector3.create(6.3 + 12, 2, 26),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '102'
  },
  {
    room: 3,
    id: 7,
    position: {
      position: Vector3.create(4 + 22, 2, 29),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '110'
  },
  {
    room: 3,
    id: 8,
    position: {
      position: Vector3.create(2 + 22, 2, 26),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '111'
  },
  {
    room: 3,
    id: 9,
    position: {
      position: Vector3.create(6.3 + 22, 2, 26),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '112'
  },
  {
    room: 4,
    id: 10,
    position: {
      position: Vector3.create(4, 2, 22 - 18),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '113'
  },
  {
    room: 4,
    id: 11,
    position: {
      position: Vector3.create(1.7, 2, 26 - 19),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '114'
  },
  {
    room: 4,
    id: 12,
    position: {
      position: Vector3.create(6.3, 2, 26 - 19),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '115'
  },
  {
    room: 5,
    id: 13,
    position: {
      position: Vector3.create(4 + 12, 2, 22 - 18),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '98'
  },
  {
    room: 5,
    id: 14,
    position: {
      position: Vector3.create(1.7 + 12, 2, 26 - 19),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '87'
  },
  {
    room: 5,
    id: 15,
    position: {
      position: Vector3.create(6.3 + 12, 2, 26 - 19),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '66'
  },
  {
    room: 6,
    id: 16,
    position: {
      position: Vector3.create(4 + 23, 2, 22 - 18),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '3'
  },
  {
    room: 6,
    id: 17,
    position: {
      position: Vector3.create(1.7 + 22, 2, 26 - 19),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '4'
  },
  {
    room: 6,
    id: 18,
    position: {
      position: Vector3.create(6.3 + 22, 2, 26 - 19),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '8'
  },

  {
    room: 7,
    id: 16,
    position: {
      position: Vector3.create(4 + 22, 2, 22 - 19),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '1631847'
  },
  {
    room: 7,
    id: 17,
    position: {
      position: Vector3.create(1.7 + 22, 2, 26 - 19),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '1681447'
  },
  {
    room: 7,
    id: 18,
    position: {
      position: Vector3.create(6.3 + 22, 2, 26 - 19),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536',
    artTitle: '1681847'
  }
]

export function createPainting(
  parent: Entity | undefined,
  id: number,
  position: TransformType,
  urn: string,
  artTitle: string
) {
  const entity = engine.addEntity()

  const nftShape = NftShape.create(entity, {
    urn: urn, 
    color: Color4.Black(),
    style: NftFrameType.NFT_GOLD_CARVED
  })

  Transform.create(entity, { position: position.position, rotation: position.rotation, scale: position.scale })

  // Add ART and ARTHOVER components

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
