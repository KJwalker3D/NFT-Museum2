


/// Text Panels and Customisable Titles here:

import { engine, Transform, TextShape, Font } from "@dcl/sdk/ecs"
import { Color3, Color4, Quaternion, Vector3 } from "@dcl/sdk/math"
import { wordWrap } from "./helperFunctions"

// Fonts: 
const serif = Font.F_SERIF
const sanserif = Font.F_SANS_SERIF
const mono = Font.F_MONOSPACE

/// Info area text panels
const textPanelValue = 'Welcome! \n\nFeel free to customise this text however works best for you.'
const textPanelFont = serif
const textPanelFontSize = 1
const textPanelColor = Color4.White()
const maxWidthPanel = 15


// Elevator area text panels
const elevatorTextPanelValue = 'NFT Museum \n\nExplore the whole museum and you might find a gift. \n\nHave fun!'
const elevatorTextPanelFont = serif
const elevatorTextPanelFontSize = 1
const elevatorTextPanelColor = Color4.White()

// Art Gallery entrance text
const artGalleryText = 'A R T   G A L L E R Y'
const artGalleryFont = mono
const artGalleryFontSize = 8
const artGalleryColor = Color4.Black()
const maxWidthTitle = 40


// Elevator entrance text
const elevatorText = 'E L E V A T O R S'
const elevatorFont = mono
const elevatorFontSize = 8
const elevatorFontColor = Color4.Black()

// Museum Sign
const museumSignText = 'M \n U \n S \n E \n U \n M' // Vertical text
const museumSignFont = mono
const museumSignFontSize = 9
const museumSignFontColor = Color4.Black()


export function createText(
    position: Vector3,
    rotation: Vector3,
    text: string, 
    font: Font,
    fontSize: number,
    textColor: Color4,
    maxWidth: number
) {
    let entity = engine.addEntity()
    Transform.create(entity, {
        position: position,
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z)
    })
    TextShape.create(entity, {
        text: wordWrap(text, maxWidth, 10),
        fontSize: fontSize,
        font: font,
        textColor: textColor
  
      })
}


export function createTextPanels() {

    createText(
        Vector3.create(8.99, 3.3, 4.66),
        Vector3.create(0, 0, 0),
        textPanelValue,
        textPanelFont,
        textPanelFontSize,
        textPanelColor,
        maxWidthPanel
    )


    createText(
        Vector3.create(8.99, 3.3, 27.35),
        Vector3.create(0, 180, 0),
        textPanelValue,
        textPanelFont,
        textPanelFontSize,
        textPanelColor,
        maxWidthPanel
    )

    createText(
        Vector3.create(29.02, 2.85, 22.8),
        Vector3.create(0, 180, 0),
        elevatorTextPanelValue,
        elevatorTextPanelFont,
        elevatorTextPanelFontSize,
        elevatorTextPanelColor,
        maxWidthPanel
    )

    createText(
        Vector3.create(29.02, 2.85, 9.2),
        Vector3.create(0, 0, 0),
        elevatorTextPanelValue,
        elevatorTextPanelFont,
        elevatorTextPanelFontSize,
        elevatorTextPanelColor,
        maxWidthPanel
    )
}

export function createTextTitles() {



    createText(
        Vector3.create(14.25, 5.85, 16),
        Vector3.create(0, -90, 0),
        artGalleryText,
        artGalleryFont,
        artGalleryFontSize,
        artGalleryColor,
        maxWidthTitle
    )


    createText(
        Vector3.create(26.7, 5.85, 16),
        Vector3.create(0, 90, 0),
        elevatorText,
        elevatorFont,
        elevatorFontSize,
        elevatorFontColor,
        maxWidthTitle
    )

    createText(
        Vector3.create(31.2, 11.2, 30.6),
        Vector3.create(0, 90, 0),
        museumSignText,
        museumSignFont,
        museumSignFontSize,
        museumSignFontColor,
        maxWidthTitle
    )
    createText(
        Vector3.create(31.7, 11.2, 30.5),
        Vector3.create(0, -90, 0),
        museumSignText,
        museumSignFont,
        museumSignFontSize,
        museumSignFontColor,
        maxWidthTitle
    )

}