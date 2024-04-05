import {
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  Material,
  VideoPlayer,
  TextureUnion,
  InputAction,
  pointerEventsSystem,
  NftFrameType,
  TransformType,
  Entity,
} from '@dcl/sdk/ecs';
import * as utils from '@dcl-sdk/utils';
import { openExternalUrl } from '~system/RestrictedActions';
import { Quaternion, Color3, Color4, Vector3 } from '@dcl/sdk/math';
import { gallery1Pos2, gallery1Rot2 } from './artPositions';
import { groundVideo, logoImage, logoURL } from './artData';
import {  togglePlay } from '../audio';

let videoPlayer: any = null;



export type VideoData = {
  room: number
  id: number
  position: TransformType
  image: string,
  video: string,
  hoverText: string,
  website: string,
  triggerScale: Vector3
  audio?: boolean
}

export const videoCollection: VideoData[] = [
  {
    room: 1,
    id: 1,
    position: {
      position: gallery1Pos2,
      rotation: Quaternion.fromEulerDegrees(gallery1Rot2.x, gallery1Rot2.y, gallery1Rot2.z),
      scale: Vector3.One()
    },
    image: logoImage,
    video: groundVideo,
    hoverText: 'Click',
    website: logoURL,
    triggerScale: Vector3.create(2, 2, 2),
    audio: true
  }
]

export async function createVideoArt(
  position: TransformType,
  image: string,
  video: string,
  hoverText: string,
  website: string,
  triggerScale: Vector3,
  audio?: boolean
) {

  const entity = engine.addEntity();
  MeshRenderer.setPlane(entity);
  MeshCollider.setPlane(entity);

  let isImage = true;

  Transform.createOrReplace(entity, {
      position: Vector3.create(position.position.x, position.position.y, position.position.z),
      rotation: Quaternion.fromEulerDegrees(position.rotation.x, position.rotation.y, position.rotation.z),
    scale: position.scale,
  
  });



  const imageMaterial = Material.Texture.Common({ src: image });
  Material.setPbrMaterial(entity, {
    texture: imageMaterial,
    roughness: 1,
    specularIntensity: 0,
    metallic: 0,
    emissiveColor: Color3.White(),
    emissiveIntensity: 1,
    emissiveTexture: imageMaterial,
  });

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
        url: website,
      });
    }
  );


  try {
    videoPlayer = await VideoPlayer.create(entity, {
      src: video,
      playing: false,
      loop: true,
    });
  } catch (error) {
    console.error('Error creating video player:', error);
  }

  const artTrigger = utils.addTestCube(
    {
      position: position.position,
      scale: position.scale,
    },
    undefined,
    undefined,
    Color4.create(1, 1, 1, 0),
    undefined,
    true
  );
  utils.triggers.addTrigger(
    artTrigger,
    utils.NO_LAYERS,
    utils.LAYER_1,
    [
      {
        type: 'box',
        scale: triggerScale,
      },
    ],
    function (otherEntity) {
      // Toggle between image and video
      const videoTexture = Material.Texture.Video({videoPlayerEntity: entity})

      if (isImage) {
        VideoPlayer.createOrReplace(entity, {
          src: video,
          playing: true,
          loop: true
        })
        Material.deleteFrom(entity)
        Material.setPbrMaterial(entity, {
          texture: videoTexture,
          roughness: 1,
          specularIntensity: 0,
          metallic: 0,
          emissiveColor: Color3.White(),
          emissiveIntensity: 1,
          emissiveTexture: videoTexture
        })
        isImage = false
        if (audio = true) {
          togglePlay()
          console.log('toggle audio')
  
        }
      }
      
    },
    function (onExit) {
      if (!isImage) {
        Material.deleteFrom(entity)
        VideoPlayer.deleteFrom(entity)
        let mat = Material.Texture.Common({
          src: image
        });
        isImage = true
        Material.setPbrMaterial(entity, {
          texture: Material.Texture.Common({
            src: image
          }),
          roughness: 1,
          specularIntensity: 0,
          metallic: 0,
          emissiveColor: Color3.White(),
          emissiveIntensity: 1,
          emissiveTexture: mat
        })
        
        if (audio = true) {
          togglePlay()
          console.log('toggle audio')
        }
      }
    
  })
  return entity;

}

export function removeVideos(entity: Entity) {
  engine.removeEntity(entity)
}