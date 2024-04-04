import { GltfContainer, Transform, engine } from "@dcl/sdk/ecs";
import { Quaternion, Vector3 } from "@dcl/sdk/math";

export let sceneCentrePosition = Vector3.create(16, 0, 16)

export function createBaseScene() {
   
    const scene = engine.addEntity()
    Transform.create(scene, {
      position: Vector3.create(0, 0, 0),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1)
    })

    const museum = engine.addEntity()
    Transform.create(museum, {
        position: sceneCentrePosition,
        rotation: Quaternion.Zero(),
        scale: Vector3.One(),
        parent: scene
    })
    GltfContainer.create(museum, {
        src: 'models/museum.glb'
    })

    return scene
}