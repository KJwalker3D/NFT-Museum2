/*
import { ColliderLayer, engine, GltfContainer, Transform, VideoState, MeshCollider, MeshRenderer, pointerEventsSystem, PointerEvents, InputAction } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math';
import { CONFIG } from '../config';
import { claimToken } from "./claim";
import { ClaimConfig } from "./claimConfig";
import * as utils from '@dcl-sdk/utils'
import { rewardUI } from '../UI/reward.ui';


let dispenserModel = 'models/dispenser.glb'
let dispenserPosition = Vector3.create(16, 20, 16)
let dispenserHoverText = 'Claim Reward'

export let reward = false
export let rewardClaimed = false

export function createWearableReward() {

if (!rewardClaimed) {

  console.log('creating wearable reward')
  CONFIG.init()

  let entity = engine.addEntity()
  Transform.create(entity, {
    position: dispenserPosition,
    scale: Vector3.create(2, 2, 2)
  })

  GltfContainer.create(entity, {
    src: dispenserModel,
    invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
  })

 
  // Remove line below to stop the dispenser from spinning
  utils.perpetualMotions.startRotation(entity, Quaternion.fromEulerDegrees(0, 25, 0))


  pointerEventsSystem.onPointerDown(
    {
      entity: entity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: dispenserHoverText,
        maxDistance: 16
      }
    },
    function () {
      reward = true
      //rewardUI('', '')
      let camp = ClaimConfig.campaign.CAMPAIGN_TEST
      claimToken(camp, camp.campaignKeys.KEY_0)
      console.log('claimed Wearable gift')
      utils.timers.setTimeout(() => { engine.removeEntity(entity), reward = false }, 1000)
      rewardClaimed = true
      
    }
  )
  return entity
}
else {
  console.log('reward already collected')
}

}
*/
