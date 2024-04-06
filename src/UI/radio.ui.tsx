import { UiCanvasInformation, engine } from "@dcl/sdk/ecs";
import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity, Label, Button } from "@dcl/sdk/react-ecs";
import { radioPlaying, openRadio, toggleRadio } from "../radio";
import { tieredFontScale, wordWrap } from "../helperFunctions";
import { backgroundColor, pauseIcon, playIcon } from "./ui";

// Set Radio to 'true' to show the radio UI:
let Radio: Boolean = false

let radioStationName = '24 House Radio'
let radioStationNameWrap = wordWrap(radioStationName, 10, 3)
let textColor = Color4.White()
let bigFont = 14
let smallFont = 10

export function radioUI() {
    if (Radio) {
        return (
            <UiEntity
                key={'radiomain'}
                uiTransform={{
                    height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.5}`,
                    width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.075}`,
                    positionType: 'absolute',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    padding: 4,
                    position: {
                        top: '85%',
                        right: '0%',
                        bottom: '0%',
                        left: '95%'
                    },
                    maxWidth: 100,
                    maxHeight: 150
                }}
                uiBackground={{
                    color: backgroundColor
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
                    <Label key={'radiolabel'}
                        uiTransform={{
                            width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            margin: '0 0 5 0'
                        }}
                        value={radioStationNameWrap}
                        fontSize={bigFont * tieredFontScale}
                        color={textColor}
                    />
                    <Button  key={'radiotoggle'}
                        uiTransform={{
                            width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            margin: '0 0 15 0'
                        }}
                        value=''
                        variant='secondary'
                        fontSize={bigFont * tieredFontScale}
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
                    
                    <Button key={'radiobutton'}
                        uiTransform={{
                            width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.075}`,
                            height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.02}`,
                            margin: '0 0 5 0'
                        }}
                        value={radioStationName}
                        variant='primary'
                        fontSize={smallFont * tieredFontScale}
                        color={textColor}
                        onMouseDown={openRadio}
                    />
                </UiEntity>
            </UiEntity>
        );
    } else {
        return null; // Return null if Radio is false
    }
}