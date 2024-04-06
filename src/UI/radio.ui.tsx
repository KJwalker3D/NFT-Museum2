import { UiCanvasInformation, engine } from "@dcl/sdk/ecs";
import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity, Label, Button } from "@dcl/sdk/react-ecs";
import { radioPlaying, openRadio, toggleRadio } from "../radio";
import { tieredFontScale, wordWrap } from "../helperFunctions";
import { backgroundColor, pauseIcon, playIcon } from "./ui";

// Set Radio to 'true' to show the radio UI:
let Radio: Boolean = true

let radioStationName = '24 House Radio'
let radioStationNameWrap = wordWrap(radioStationName, 10, 3)
let textColor = Color4.White()
let bigFont = 14
let smallFont = 10

export function radioUI() {
    if (Radio) {
        const canvasHeight = UiCanvasInformation.get(engine.RootEntity).height;

        return (
            <UiEntity
                key={'radiomain'}
                uiTransform={{
                    height: `${canvasHeight * 0.08}`,
                    width: `${canvasHeight * 0.08}`,
                    positionType: 'absolute',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: 4,
                    position: {
                        top: '8%', 
                        right: '0%',
                        bottom: '0%',
                        left: '96%'
                    },
                    maxWidth: 100,
                    maxHeight: 200
                }}
                uiBackground={{
                  //  color: backgroundColor
                }}
            >
                <UiEntity key={'radio-space'}
                    uiTransform={{
                        margin: '0 0 0 0',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    <Button key={'radiobutton'}
                        uiTransform={{
                            width: `${canvasHeight * 0.075}`,
                            height: `${canvasHeight * 0.02}`,
                            margin: '0 0 15 0' // Added space between buttons
                        }}
                        value={radioStationName}
                        variant='primary'
                        fontSize={smallFont * tieredFontScale}
                        color={textColor}
                        onMouseDown={openRadio}
                    />
                    <Button key={'radiotoggle'}
                        uiTransform={{
                            width: `${canvasHeight * 0.035}`,
                            height: `${canvasHeight * 0.035}`,
                            margin: '-5 0 0 0'
                        }}
                        value=''
                        variant='secondary'
                        fontSize={24 * tieredFontScale}
                        color={textColor}
                        uiBackground={{
                            textureMode: 'nine-slices',
                            texture: {
                                src: radioPlaying ? pauseIcon : playIcon,
                            },
                            textureSlices: {
                                top: -0.0,
                                bottom: -0.0,
                                left: -0.0,
                                right: -0.0,
                            },
                        }}
                        onMouseDown={toggleRadio}
                    />
                </UiEntity>
            </UiEntity>
        );
    } else {
        return null; // Return null if Radio is false
    }
}
