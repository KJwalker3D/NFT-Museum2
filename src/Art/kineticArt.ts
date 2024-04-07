import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { Animator, engine, Transform, GltfContainer, ColliderLayer, Entity, pointerEventsSystem, InputAction, AudioSource, TransformType } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { playAudioAtPlayer, togglePlay } from "../audio";

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
            position: Vector3.create(21.65, 10.5, 16),
            rotation: Quaternion.fromEulerDegrees(0, 0, 0),
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
            position: Vector3.create(6.5, 9.72, 16), // art position
            rotation: Quaternion.fromEulerDegrees(0, 0, 0), // rotation
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
    //rotation: Vector3,
    //scale: Vector3,
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


