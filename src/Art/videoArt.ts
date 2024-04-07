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
import { gallery1Pos2, gallery1Rot2, gallery2Pos10, gallery2Pos20, gallery2Pos21, gallery2Pos9, gallery2Rot10, gallery2Rot20, gallery2Rot21, gallery2Rot9 } from './artPositions';
import { groundVideo, logoImage, logoURL } from './artData';
import {  togglePlay } from '../audio';

let videoPlayer: any = null;

let verticalVideo = 'https://player.vimeo.com/external/931742718.m3u8?s=efbe1b55804e4ba10b2e8c17e241d1809d324f36&logging=false'
let verticalVideoPlaceholder = 'https://bafkreicuvnybcylixwtpxslw4cvwmtwg566z2d6cinxshqbg25lhojkqtq.ipfs.nftstorage.link/' // image placeholder

let verticalVarbarianVid = 'https://player.vimeo.com/external/931794663.m3u8?s=3a78fb41c8f6e7f39962465441abecbe7a056262&logging=false'
let verticalVarbarianPlaceholder = 'https://bafkreibuzswvpnmmvux3b6vfwfeggbmakubxwdztrqmqerjjm7ba6efcpu.ipfs.nftstorage.link/'

let horizontalVideoMVFW23 = 'https://player.vimeo.com/external/931744777.m3u8?s=2a274c3898d4aa78fdb7cddf0a0329d25693b056&logging=false'
let horizontalVideoMVFW23placeholder = 'https://bafybeigpiynyk563o5rd4wzz62lx7gkncdrnozhzit4l7s4maxc5mffgbm.ipfs.nftstorage.link/' // image placeholder

let horizontalVideoLPMxSOA = 'https://player.vimeo.com/external/711197011.m3u8?s=1fe29a85f3c1455580a070eee4fb93abcb2ed5a2&logging=false'
let horizontalVideoLPMxSOAplaceholder = 'https://bafkreigpeshmzddtlhw5tpxa55z3lfv7yjyzpkoj3s7vc5wxyuy367o5ji.ipfs.nftstorage.link/' // image placeholder

let horizontalVideoIndieVillage = 'https://player.vimeo.com/external/931792879.m3u8?s=fa7ece24dfd2899ddac2112250092c4be5dbdff0&logging=false'
let horizontalVideoIndieVillagePlaceholder = 'https://bafkreie2rucyrbnl5en7bccthydcxsmddhffp4oincu7afc2jt53u4eb6e.ipfs.nftstorage.link/'

export type VideoData = {
  room: number
  id: number
  position: Vector3,
  rotation: Vector3,
  scale: Vector3,
  image: string,
  video: string,
  hoverText: string,
  website: string,
  triggerScale: Vector3,
  triggerPosition: Vector3,
  audio?: boolean
}

export const videoCollection: VideoData[] = [
  {
    room: 1,
    id: 2,
      position: gallery1Pos2,
      rotation: gallery1Rot2,
      scale: Vector3.create(0.003 * 1920, 0.003 * 1080, 1),
    image: horizontalVideoMVFW23placeholder,
    video: horizontalVideoMVFW23,
    hoverText: 'Click',
    website: logoURL,
    triggerScale: Vector3.create(4, 2, 10),
    triggerPosition: Vector3.create(gallery1Pos2.x + 2, gallery1Pos2.y -1, gallery1Pos2.z),
    audio: true
  },
  {
    room: 2,
    id: 14,
      position: gallery2Pos9,
      rotation: gallery2Rot9,
      scale: Vector3.create(0.003 * 1920, 0.003 * 1080, 1),
    image: horizontalVideoLPMxSOAplaceholder,
    video: horizontalVideoLPMxSOA,
    hoverText: 'Click',
    website: logoURL,
    triggerScale: Vector3.create(2, 2, 2),
    triggerPosition: Vector3.create(gallery2Pos9.x + 2, gallery2Pos9.y -1, gallery2Pos9.z),
    audio: true
  },
  {
    room: 2,
    id: 15,
      position: gallery2Pos10,
      rotation: gallery2Rot10,
      scale: Vector3.create(0.003 * 1920, 0.003 * 1080, 1),
    image: horizontalVideoIndieVillagePlaceholder,
    video: horizontalVideoIndieVillage,
    hoverText: 'Click',
    website: logoURL,
    triggerScale: Vector3.create(2, 2, 2),
    triggerPosition: Vector3.create(gallery2Pos10.x + 2, gallery2Pos10.y -1, gallery2Pos10.z),
    audio: true
  },
  {
    room: 2,
    id: 25,
      position: gallery2Pos20,
      rotation: gallery2Rot20,
      scale: Vector3.create(6, 8.65, 1),
    image: verticalVarbarianPlaceholder,
    video: verticalVarbarianVid,
    hoverText: 'Click',
    website: logoURL,
    triggerScale: Vector3.create(8, 6, 6),
    triggerPosition: Vector3.create(gallery2Pos20.x, gallery2Pos20.y -1, gallery2Pos20.z -2),
    audio: true
  },
  {
    room: 2,
    id: 26,
      position: gallery2Pos21,
      rotation: gallery2Rot21,
      scale: Vector3.create(6, 8.65, 1),
    image: verticalVideoPlaceholder,
    video: verticalVideo,
    hoverText: 'Click',
    website: logoURL,
    triggerScale: Vector3.create(8, 6, 8),
    triggerPosition: Vector3.create(gallery2Pos21.x, gallery2Pos21.y -1, gallery2Pos21.z +2),
    audio: true
  }
]

export async function createVideoArt(
  position: Vector3,
  rotation: Vector3,
  scale: Vector3,
  image: string,
  video: string,
  hoverText: string,
  website: string,
  triggerScale: Vector3,
  triggerPosition: Vector3,
  audio: boolean = true
) {

  const entity = engine.addEntity();
  MeshRenderer.setPlane(entity);
  MeshCollider.setPlane(entity);

  let isImage = true;

  Transform.createOrReplace(entity, {
      position: position,
      rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
     scale: scale,
  
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
      position: triggerPosition,
      scale: triggerScale,
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
      if (otherEntity) {
        // Toggle between image and video
        const videoTexture = Material.Texture.Video({ videoPlayerEntity: entity });
        if (isImage) {
          VideoPlayer.createOrReplace(entity, {
            src: video,
            playing: true,
            loop: true,
          });
          Material.deleteFrom(entity);
          Material.setPbrMaterial(entity, {
            texture: videoTexture,
            roughness: 1,
            specularIntensity: 0,
            metallic: 0,
            emissiveColor: Color3.White(),
            emissiveIntensity: 1,
            emissiveTexture: videoTexture,
          });
          isImage = false;
          if (audio === true) {
            togglePlay(); // Toggle audio play state
          }
        }
      }
    },
    function (onExit) {
      if (onExit) {
        if (!isImage) {
          Material.deleteFrom(entity);
          VideoPlayer.deleteFrom(entity);
          let mat = Material.Texture.Common({
            src: image,
          });
          isImage = true;
          Material.setPbrMaterial(entity, {
            texture: Material.Texture.Common({
              src: image,
            }),
            roughness: 1,
            specularIntensity: 0,
            metallic: 0,
            emissiveColor: Color3.White(),
            emissiveIntensity: 1,
            emissiveTexture: mat,
          });
          if (audio === true) {
            togglePlay(); // Toggle audio play state
          }
        }
      }
    }
  );
  
  
  
  return entity;

}

export function removeVideos(entity: Entity) {
  if (entity != null) {

    engine.removeEntity(entity)
  }
}