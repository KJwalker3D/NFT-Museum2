import { Color4 } from '@dcl/sdk/math';
import *  as  ui from 'dcl-ui-toolkit'
import { setupUiInfoEngine } from '../helperFunctions';
import { artDetailsUI } from './artHover.ui';
import { playlistUI } from './playlist.ui';
import { radioUI } from './radio.ui';
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs';
import { rewardUI } from './reward.ui';







export const backgroundColor = Color4.create(0, 0, 0, 0.9) // semi transparent black
export const pauseIcon = 'images/pauseIcon.png';
export const playIcon = 'images/playIcon.png';
export const skipIcon = 'images/skipIcon.png'

let rewardImage = 'images/wearable.png'
let rewardName = 'Patch Pants'



export function setupUi() {
    setupUiInfoEngine(),
    ReactEcsRenderer.setUiRenderer(uiComponent)
}

export const uiComponent = () => [
    artDetailsUI(),
    playlistUI(),
    radioUI(),
    rewardUI(rewardImage, rewardName),
    ui.render()
]






