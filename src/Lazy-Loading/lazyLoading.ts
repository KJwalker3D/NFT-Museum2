import { Vector3, Quaternion } from '@dcl/sdk/math'
import { Entity, Transform, engine } from '@dcl/sdk/ecs'
import { nftCollection, createPainting, NFTdata } from './nfts'
import * as utils from '@dcl-sdk/utils'
import { createVideoArt, videoCollection } from '../Art/videoArt'


export let scene1active = true


export async function createLazyArea(position: Vector3, scale: Vector3, parentPos: Entity, id: number, ) {
  const entity = engine.addEntity()

  Transform.create(entity, {
    position: position,
    scale: scale,
    parent: parentPos
  })
 

  const box = engine.addEntity()
  Transform.create(box, { parent: parentPos, scale: scale })

  let createdPaintings: Entity[] = []

  let createdVideos: Entity[] = []

  await utils.triggers.addTrigger(
    box,
    utils.LAYER_2,
    utils.LAYER_1,
    [{ type: 'box', 
    position: position,
    scale: scale }],
    async () => {
      if (scene1active) {
        console.log(`ACTIVE`)
        console.log(`ENTERED ` + id)

        createdPaintings = []
        createdVideos = []

        for (const nft of nftCollection) {
          if (nft.room === id) {
            const painting = createPainting(undefined, nft.id, nft.position, nft.urn, nft.artTitle, nft.frame, nft.color)
            createdPaintings.push(painting)
          }
        }
        for (const video of videoCollection) {
          if (video.room === id) {
            const videoArt = await createVideoArt(video.position, video.image, video.video, video.hoverText, video.website, video.triggerScale)
            createdVideos.push(videoArt)
          }
        }
      }
    },
    () => {
      console.log('LEFT')
      for (const painting of createdPaintings) {
        engine.removeEntity(painting)
      }
      for (const videoArt of createdVideos) {
        engine.removeEntity(videoArt)
      }

      createdPaintings = [] // Clear the array
      createdVideos = []
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
