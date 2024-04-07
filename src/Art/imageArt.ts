import { InputAction, Material, MeshCollider, MeshRenderer, Transform, TransformType, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { Color3, Quaternion, Vector3 } from "@dcl/sdk/math";
import { openExternalUrl } from "~system/RestrictedActions";
import { gallery1Pos4, gallery1Pos5, gallery1Rot4, gallery1Rot5, gallery2Pos4, gallery2Pos5, gallery2Rot4, gallery2Rot5 } from "./artPositions";
import { logoImage, logoURL } from "./artData";
import { Position } from "~system/EngineApi";

// For static images that aren't loaded in as NFTs

let verticalImageAR = 'https://bafybeig2s7rg4dwuebwnmzwefz5h6c3p3x4eazcm6qng2wgtqqfe2l2m2i.ipfs.nftstorage.link/'
let verticalImageRender = 'https://bafkreia5xiavtlcbrvfr4os7om5bdzbzjdtvm4jcuki52r5wkn6lzzb74a.ipfs.nftstorage.link/'


export type ImageData = {
  room: number, 
  id: number,
  position: Vector3,
  rotation: Vector3,
  scale: Vector3
  image: string,
  hoverText: string,
  url: string,
  hasAlpha: boolean
}

export const imageArtCollection: ImageData[] = [
  {
    room: 1, 
    id: 3,
      position: Vector3.create(gallery1Pos4.x, gallery1Pos4.y, gallery1Pos4.z),
      rotation: gallery1Rot4,
      scale: Vector3.create(1.5, 1.5, 1.5),
    image: logoImage,
    hoverText: 'Click',
    url: logoURL,
    hasAlpha: true
  },
  {
    room: 1,
    id: 5,
    position: gallery1Pos5,
    rotation: gallery1Rot5,
    scale: Vector3.create(1.5, 1.5, 1.5),
    image: logoImage,
    hoverText: 'Click',
    url: logoURL,
    hasAlpha: true
  },
  {
    room: 2,
    id: 9,
    position: gallery2Pos4,
    rotation: gallery2Rot4,
    scale: Vector3.create(1, 2, 1),
    image: verticalImageAR,
    hoverText: 'Click',
    url: logoURL,
    hasAlpha: false
  },
  {
    room: 2,
    id: 10,
    position: gallery2Pos5,
    rotation: gallery2Rot5,
    scale: Vector3.create(1, 2, 1),
    image: verticalImageRender,
    hoverText: 'Click',
    url: logoURL,
    hasAlpha: false
  }
]


export function createImageArt(
    position: Vector3,
    rotation: Vector3,
    scale: Vector3,
    image: string, // can be path to image file or url to hosted image
    hoverText: string,
    url: string,
    hasAlpha: boolean
) {

    let entity = engine.addEntity()
    Transform.create(entity, {
        position: position, 
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
        scale: scale 
    })
    MeshRenderer.setPlane(entity)
    MeshCollider.setPlane(entity)

    pointerEventsSystem.onPointerDown(
        {
          entity: entity,
          opts: {
            button: InputAction.IA_POINTER,
            hoverText: hoverText,
            maxDistance: 16
          }
        },
        function () {
         openExternalUrl({
            url: url
         })
        }
      )

      const imageMaterial = Material.Texture.Common({ src: image });


      if (!hasAlpha) {

        Material.setPbrMaterial(entity, {
          texture: imageMaterial,
          roughness: 1,
          specularIntensity: 0,
          metallic: 0,
          emissiveColor: Color3.White(),
          emissiveIntensity: 1,
          emissiveTexture: imageMaterial,
        })
      }

      else if (hasAlpha) {

        Material.setPbrMaterial(entity, {
          texture: imageMaterial,
          roughness: 1,
          specularIntensity: 0,
          metallic: 0,
          alphaTexture: imageMaterial,
          //alphaTest: 0.95,
          emissiveColor: Color3.Black(),
          emissiveIntensity: 1,
          emissiveTexture: imageMaterial,
          
        })
      }

      return entity
}