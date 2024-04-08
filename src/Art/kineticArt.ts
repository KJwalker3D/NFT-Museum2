import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { Animator, engine, Transform, GltfContainer, ColliderLayer, pointerEventsSystem, InputAction, TransformType } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { playAudioAtPlayer, togglePlay } from "../Audio/audio";
import { artPosC, artPosD, artRotC, artRotD } from "./artPositions";
import { openExternalUrl } from "~system/RestrictedActions";
import { linktreeURL } from "../social";

// Paths to 3D models and animation names
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
    audio?: string | null
    url: string
    hoverText: string
}

export const kineticArtCollection: KineticData[] = [
    {
        room: 2,
        id: 5,
        position: {
            position: artPosC,
            rotation: Quaternion.fromEulerDegrees(artRotC.x, artRotC.y, artRotC.z),
            scale: Vector3.create(0.5, 0.5, 0.5), 
        },
        triggerPosition: Vector3.create(0, 0, 0),
        triggerScale: Vector3.create(6, 5, 10), 
        modelPath: kineticArtCircles,
        animationClip: kineticArtCirclesClip,
        audio: null,
        url: linktreeURL,
        hoverText: 'Click'
    },
    {
        room: 2,
        id: 6,
        position: {
            position: artPosD, 
            rotation: Quaternion.fromEulerDegrees(artRotD.x, artRotD.y, artRotD.z), // rotation
            scale: Vector3.create(0.8, 0.8, 0.8)
        },
        triggerPosition: Vector3.create(2, 0, 0),
        triggerScale: Vector3.create(10, 4, 10),
        modelPath: kineticArtCircuit,
        animationClip: kineticArtCircuitClip,
        audio: null,
        url: linktreeURL,
        hoverText: 'Click'
    }
]



export function createKineticArt(
    position: TransformType,
    triggerPosition: Vector3,
    triggerScale: Vector3,
    modelPath: string,
    animationClip: string,
    audio: string | null = null, // optional parameter to add sound
    url: string,
    hoverText: string
) {

    let entity = engine.addEntity();
    Transform.create(entity, {
        position: position.position,
        rotation: Quaternion.fromEulerDegrees(position.rotation.x, position.rotation.y, position.rotation.z),
        scale: position.scale
    })

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
            openExternalUrl({
                url: url,
            });
        }
    );

    utils.triggers.addTrigger(
        entity,
        utils.NO_LAYERS,
        utils.LAYER_1,
        [{
            type: 'box',
            position: triggerPosition,
            scale: triggerScale
        }],
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
        })
    //utils.triggers.enableDebugDraw(true)
    return entity
}


