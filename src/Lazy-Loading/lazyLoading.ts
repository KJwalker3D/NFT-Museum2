import { Vector3, Quaternion } from '@dcl/sdk/math'
import { Entity, Transform, engine } from '@dcl/sdk/ecs'
import { nftCollection, createPainting, NFTdata } from './nfts'
import * as utils from '@dcl-sdk/utils'


export let scene1active = true


export function createLazyArea(position: Vector3, scale: Vector3, parentPos: Entity, id: number, ) {
  const entity = engine.addEntity()

  Transform.create(entity, {
    position: position,
    scale: scale,
    parent: parentPos
  })
 

  const box = engine.addEntity()
  Transform.create(box, { parent: parentPos, scale: scale })

  let createdPaintings: Entity[] = []


  utils.triggers.addTrigger(
    box,
    utils.LAYER_2,
    utils.LAYER_1,
    [{ type: 'box', 
    position: position,
    scale: scale }],
    () => {
      if (scene1active) {
        console.log(`ACTIVE`)
        console.log(`ENTERED ` + id)
        createdPaintings = []
        for (const nft of nftCollection) {
          if (nft.room === id) {
            const painting = createPainting(undefined, nft.id, nft.position, nft.urn, nft.artTitle)
            createdPaintings.push(painting)
          }
        }
      }
    },
    () => {
      console.log('LEFT')
      for (const painting of createdPaintings) {
        engine.removeEntity(painting)
      }

      createdPaintings = [] // Clear the array
    }
  )
  utils.triggers.enableDebugDraw(true)

  return entity
}



export function creatAllLazyAreas() {
  const lazyParent = engine.addEntity()

  Transform.create(lazyParent, {
    position: Vector3.create(0, 0, 0),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

  const lazyArea = engine.addEntity()
  Transform.create(lazyArea, {
    position: Vector3.create(0, 0, 0),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1),
    parent: lazyParent
  })

  const lazyArea2 = engine.addEntity()
  Transform.create(lazyArea2, {
    position: Vector3.create(10, 6, 8),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1),
    parent: lazyParent
  })


  const lazyArea3 = engine.addEntity()
  Transform.create(lazyArea3, {
    position: Vector3.create(10, 12.5, 8),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1),
    parent: lazyParent
  })


  
  createLazyArea(Vector3.create(6.65, 10.5, 8), Vector3.create(30, 10, 30), lazyArea3, 3)
  createLazyArea(Vector3.create(6.65, 5.5, 8), Vector3.create(26.2, 10, 32), lazyArea2, 2)
  createLazyArea(Vector3.create(8.5, 1.5, 16), Vector3.create(16.2, 10, 26), lazyArea, 1)

}
