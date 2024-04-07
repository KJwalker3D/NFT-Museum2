import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { Animator, engine, Transform, GltfContainer, ColliderLayer, Entity, pointerEventsSystem, InputAction, AudioSource, TransformType } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { playAudioAtPlayer, togglePlay } from "../Audio/audio";
import { gallery2Pos22, gallery2Pos23, gallery2Rot22, gallery2Rot23 } from "./artPositions";

const kineticArtCircles = 'models/kineticArt-threeCircles.glb';
const kineticArtCirclesClip = 'play2'
const kineticArtCircuit = 'models/kineticArt-circuit.glb'
const kineticArtCircuitClip = 'play3'


export type KineticData = {
    room: number
    id: number
    position: TransformType
    triggerPosition: Vector3
    triggerScale: Vector3
    modelPath: string
    animationClip: string 
    audio?: string   
  }

  export const kineticArtCollection: KineticData[] = [
    {
        room: 2,
        id: 5, 
        position: {
            position: gallery2Pos22,
            rotation: Quaternion.fromEulerDegrees(gallery2Rot22.x, gallery2Rot22.y, gallery2Rot22.z),
            scale: Vector3.create(0.5, 0.5, 0.5), //scale
        },
        triggerPosition: Vector3.create(0, 0, 0),
        triggerScale: Vector3.create(6, 5, 10), // trigger scale
        modelPath: kineticArtCircles,
        animationClip: kineticArtCirclesClip
    },
    {
        room: 2,
        id: 6,
        position: {
            position: gallery2Pos23, // art position
            rotation: Quaternion.fromEulerDegrees(gallery2Rot23.x, gallery2Rot23.y, gallery2Rot23.z), // rotation
            scale: Vector3.create(0.8, 0.8, 0.8) 
        },
        triggerPosition: Vector3.create(2, 0, 0),
        triggerScale: Vector3.create(10, 4, 10),
        modelPath: kineticArtCircuit,
        animationClip: kineticArtCircuitClip
    }
  ]



export function createKineticArt( 
    position: TransformType,
    triggerPosition: Vector3,
    triggerScale: Vector3,
    modelPath: string,
    animationClip: string,
    audio: string | null = null // optional parameter to add sound
 ) {

    let entity = engine.addEntity();
    Transform.create(entity, {
        position: position.position,
        rotation: Quaternion.fromEulerDegrees(position.rotation.x, position.rotation.y, position.rotation.z),
        scale: position.scale
    } )

    GltfContainer.create(entity, {
        src: modelPath,
        invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })

    Animator.create(entity, {
        states: [
            {
                clip: animationClip,
                playing: false,
                loop: true
            }
        ]
    })

    
    utils.triggers.addTrigger(
        entity, 
        utils.NO_LAYERS,
        utils.LAYER_1,
        [{ type: 'box', 
        position: triggerPosition, 
        scale: triggerScale }],
        function (otherEntity) {
            let animateArt = Animator.playSingleAnimation(entity, animationClip, false)
            if (audio) {
                togglePlay()
                playAudioAtPlayer(audio)
            }
        },
        function (anotherEntity) {
            let stopAnim = Animator.stopAllAnimations(entity, false)
            if (audio) {
                togglePlay()
            }
        }
        
        
        )
        //utils.triggers.enableDebugDraw(true)
        return entity
}


