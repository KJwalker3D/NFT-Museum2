import { UiCanvasInformation, engine } from "@dcl/sdk/ecs";
import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity, Label, Button } from "@dcl/sdk/react-ecs";
import { tieredFontScale, tieredModalTextWrapScale, wordWrap } from "../helperFunctions";
import { backgroundColor, pauseIcon, playIcon, skipIcon } from "./ui";
import { nowPlayingElement, openMixcloud, playingArtist, skipSong, streamPlayingRef, togglePlaylist, updateNowPlayingTitle } from "../playlist";

// Set Playlist to 'false' to hide the playlist UI:
let Playlist: Boolean = true

let songData = 'Red Albert Playlist'
let songDataWrap = wordWrap(songData, 8 * tieredModalTextWrapScale, 6)

export function playlistUI() {
    if (Playlist) {
        return (
            <UiEntity
                key={'main'}
                uiTransform={{
                    height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.5}`,
                    width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.075}`,
                    positionType: 'absolute',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    padding: 4,
                    position: {
                        top: '80%',
                        right: '0%',
                        bottom: '0%',
                        left: '95%'
                    },
                    maxWidth: 100,
                    maxHeight: 200
                }}
                uiBackground={{
                    color: backgroundColor
                }}
            >
                <UiEntity
                    uiTransform={{
                        margin: '0 0 0 0',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    <Label
                        uiTransform={{
                            width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            margin: '0 0 -10 0'
                        }}
                        value={`${songDataWrap}`}
                        fontSize={11 * tieredFontScale}
                        color={Color4.White()}
                        onMouseDown={openMixcloud}
                    />
                    <Button
                        uiTransform={{
                            width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            margin: '0 0 15 0'
                        }}
                        value=''
                        variant='secondary'
                        fontSize={24 * tieredFontScale}
                        color={Color4.White()}
                        uiBackground={{
                            textureMode: 'nine-slices',
                            texture: {
                                src: streamPlayingRef.value ? pauseIcon : playIcon,
                            },
                            textureSlices: {
                                top: -0.0,
                                bottom: -0.0,
                                left: -0.0,
                                right: -0.0,
                            },
                        }}
                        onMouseDown={togglePlaylist}
                    />
                    <Button
                        uiTransform={{
                            width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            margin: '0 0 15 0'
                        }}
                        value=''
                        variant='secondary'
                        fontSize={24 * tieredFontScale}
                        color={Color4.White()}
                        uiBackground={{
                            textureMode: 'nine-slices',
                            texture: {
                                src: skipIcon,
                            },
                            textureSlices: {
                                top: -0.0,
                                bottom: -0.0,
                                left: -0.0,
                                right: -0.0,
                            },
                        }}
                        onMouseDown={() => {
                            skipSong();
                            updateNowPlayingTitle(nowPlayingElement, playingArtist);
                        }}
                    />
                    <Button
                        uiTransform={{
                            width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.07}`,
                            height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.02}`,
                            margin: '0 0 5 0'
                        }}
                        value='RED ALBERT'
                        variant='primary'
                        fontSize={10 * tieredFontScale}
                        color={Color4.White()}
                        onMouseDown={openMixcloud}
                    />
                </UiEntity>
            </UiEntity>
        );
    } else {
        return null; // Return null if Playlist is false
    }
}
