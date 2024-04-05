import { ColliderLayer, GltfContainer, InputAction, Transform, TransformType, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { Vector2, openExternalUrl } from "~system/RestrictedActions";

// Socials glb models:
const discordShape = 'models/social_media/discord.glb'
const homepageShape = 'models/social_media/homepage.glb'
const telegramShape = 'models/social_media/telegram.glb'
const xShape = 'models/social_media/x.glb'
const instagramShape = 'models/social_media/x.glb'
const defaultScale = Vector3.create(0.8, 0.8, 0.8)


const discordUrl = 'https://www.google.com/'
const homepageUrl = 'https://www.google.com/'
const telegramUrl = 'https://www.google.com/'
const xUrl = 'https://www.google.com/'
const instagramUrl = 'https://www.google.com/'


/// Positions

// South social links
const Xsouth =  {
    position: Vector3.create(3, 1.92, 2.75),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const discordSouth =  {
    position: Vector3.create(4.5, 1.92, 2.75),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const homepageSouth =  {
    position: Vector3.create(6, 1.92, 2.75),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const instagramSouth =  {
    position: Vector3.create(7.5, 1.92, 2.75),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const telegramSouth =  {
    position: Vector3.create(9, 1.92, 2.75),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}


// North social links
const Xnorth =  {
    position: Vector3.create(9, 1.92, 29.25),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const discordNorth =  {
    position: Vector3.create(7.5, 1.92, 29.25),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const homepageNorth =  {
    position: Vector3.create(6, 1.92, 29.25),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const instagramNorth =  {
    position: Vector3.create(4.5, 1.92, 29.25),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const telegramNorth =  {
    position: Vector3.create(3, 1.92, 29.25),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}



export function createSocialLink(
    position: TransformType,
    modelPath: string,
    hoverText: string,
    url: string
) {
    const entity = engine.addEntity()
    Transform.create(entity, {
        position: position.position,
        rotation: position.rotation,
        scale: position.scale,
        parent: position.parent
    })
    GltfContainer.create(entity, {
        src: modelPath,
        invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER || ColliderLayer.CL_PHYSICS
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
}

export function createSocials() {
    createSocialLink(
        Xsouth,
        xShape,
        'X',
        xUrl
    )
    createSocialLink(
        Xnorth,
        xShape,
        'X',
        xUrl
    )
    createSocialLink(
        discordSouth,
        discordShape,
        'Discord',
        discordUrl
    )
    createSocialLink(
        discordNorth,
        discordShape,
        'Discord',
        discordUrl
    )
    createSocialLink(
        homepageNorth,
        homepageShape,
        'Website',
        homepageUrl
    )
    createSocialLink(
        homepageSouth,
        homepageShape,
        'Website',
        homepageUrl
    )
    createSocialLink(
        instagramNorth,
        instagramShape,
        'Instagram',
        instagramUrl
    )
    createSocialLink(
        instagramSouth,
        instagramShape,
        'Instagram',
        instagramUrl
    )
    createSocialLink(
        telegramSouth,
        telegramShape,
        'Telegram',
        telegramUrl
    )
    createSocialLink(
        telegramNorth,
        telegramShape,
        'Telegram',
        telegramUrl
    )
    
}
