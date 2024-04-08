
# NFT Museum SDK7 template scene

This project is a scene template for an SDK7 NFT Museum with lazy loading and different types of artwork including NFTs, video art, image art and 3D art. The repository also includes elevator functionality, sliding doors, reward claiming and different audio sources such as a radio station and playlist.

## Try it out

**Previewing the scene**

1. Download this repository.

2. Install the [Decentraland Editor](https://docs.decentraland.org/creator/development-guide/sdk7/editor/)

3. Open a Visual Studio Code window on this scene's root folder. Not on the root folder of the whole repo, but instead on this sub-folder that belongs to the scene.

4. Open the Decentraland Editor tab, and press **Run Scene**

Alternatively, you can use the command line. Inside this scene root directory run:

```
npm run start
```


## Customize the artwork

To switch out the artwork on display, follow these steps:

1. There are four different types of artwork you can display in this repository: NFTs, videos, images, and 3D art. Each artwork has a number (index) and a matching set position (artPos + index).
2. To see the index numbers, hover over the artwork to see the artHover UI, which displays the Artwork index in the title and description of each artwork.
3. Additionally, there's a visual aid in the model `artNumbers.glb`, which displays all the corresponding artwork index numbers in the museum. To toggle its visibility, go to `artData.ts`.
   
To enable the visual aid, add the following code to `artData.ts`:

```typescript
// Make artNumbers visible to help with placing and naming items in the gallery
const artNumbers = engine.addEntity()
Transform.create(artNumbers, { position: sceneCentrePosition })
GltfContainer.create(artNumbers, { src: 'models/artNumbers.glb'})
    ```


# Customize the NFT art

## To change the NFT art:

1. Open `nftArt.ts` and locate the `nftCollection` array:

    ```typescript
    export const nftCollection: NFTdata[] = []
    ```

2. Inside `nftCollection`, you'll find a set of NFTs that you can manage independently. Each NFT object includes the following properties:
   - `room`: Indicates the room where the NFT will be displayed (see lazy loading for more info).
   - `id`: The artwork ID.
   - `position`: The artwork position (more details in `artPositions.ts`).
   - `rotation`: The artwork rotation (more details in `artPositions.ts`).
   - `scale`: The artwork scale. Adjust to match your artwork proportions.
   - `urn`: The URN for the NFT you want to display. (See how to get a URN [here](#))
   - `frame`: The type of NFT frame (see `nftFrames.ts` for more details).
   - `color`: The background color of the NFT frame.
   - `hoverText`: The text that appears when the cursor is on the NFT.

3. You can adjust, add, and remove NFTs as needed. Just ensure that the artwork ID, position, and rotation all match.

By default, clicking on an NFT will open the default NFT UI, displaying details about the NFT.





# Customize the image art

## To change the image art:

1. Navigate to `imageArt.ts` and locate the `imageArtCollection` array:

    ```typescript
    export const imageArtCollection: ImageData[]
    ```

2. Inside `imageArtCollection`, you'll find a set of images that you can manage independently. Each image object includes the following properties:
   - `room`: Indicates the room where the image will appear (see lazy loading for more info).
   - `id`: The artwork ID.
   - `position`: The artwork position (more details in `artPositions.ts`).
   - `rotation`: The artwork rotation (more details in `artPositions.ts`).
   - `scale`: The artwork scale. Adjust to match your artwork proportions.
   - `image`: The image to be displayed. You can either use a URL or a path to an image in your project folder. (For example, change `logoImage` to `'images/yourImage.jpg'` or `'https://your-image-url'`). To host images on servers, try a service like NFT.Storage.
   - `hoverText`: The text that appears when the cursor is on the image.
   - `url`: The URL that opens when the image is clicked on. Change it to your desired URL. For organization purposes, all the URLs are in `social.ts`.
   - `hasAlpha`: Set this to true or false depending on whether you want your image to be semi-transparent or not.

3. You can adjust, add, and remove images as needed. Just ensure that the artwork ID, position, and rotation all match.



# Customize the video art

## To change the video art:

1. Open `videoArt.ts` and locate the `videoCollection` array:

    ```typescript
    export const videoCollection: VideoData[]
    ```

2. Inside `videoCollection`, you'll find a set of videos that you can manage independently. Each video object includes the following properties:
   - `room`: Indicates the room where the video will appear (see lazy loading for more info).
   - `id`: The artwork ID.
   - `position`: The artwork position (more details in `artPositions.ts`).
   - `rotation`: The artwork rotation (more details in `artPositions.ts`).
   - `scale`: The artwork scale. Adjust to match your artwork proportions.
   - `image`: The placeholder image to be displayed when the video isn't playing. You can use a URL or a path to an image in your project folder.
   - `video`: The video that will play on player approach. It's recommended to use an external streaming service such as Vimeo Pro and use an m3u8 link for better scene performance.
   - `hoverText`: The text that appears when the cursor is on the video.
   - `website`: The URL that opens when the video is clicked on. Change it to your desired URL. For organization purposes, all the URLs are in `social.ts`.
   - `triggerScale`: The scale of the trigger box. The video will play when a player is inside the trigger box.
   - `triggerPosition`: The position of the trigger box. The video will play when a player is in this area.
   - `audio`: Set to true if your video has audio, and false if it doesn't. When a player approaches the video, the radio or playlist will pause and start playing again once the player leaves the trigger area.

3. Adjust, add, and remove videos as needed, ensuring that the artwork ID, position, and rotation all match.




# Customize the 3D art

## To change the 3D art:

1. Open `kineticArt.ts` and locate the `kineticArtCollection` array:

    ```typescript
    export const kineticArtCollection: KineticData[]
    ```

2. Inside `kineticArtCollection`, you'll find a set of 3D artworks that you can manage independently. Each artwork object includes the following properties:
   - `room`: Indicates the room where the artwork will appear (see lazy loading for more info).
   - `id`: The artwork ID.
   - `position`: The artwork position, rotation, and scale. Adjust to match your artwork proportions.
   - `triggerPosition`: The position of the trigger box. The 3D art animation will play when a player is in this area.
   - `triggerScale`: The scale of the trigger box. The 3D art animation will play when a player is inside the trigger box.
   - `modelPath`: The path to the 3D model. You can switch this to a path in your project folder.
   - `animationClip`: The name of the animation clip you want to be triggered when a player approaches the art.
   - `audio`: The audio that will play when a player approaches the 3D art. If set to null, no audio will play.
   - `url`: The website that will open when the 3D art is clicked. Change it to your desired URL. For organization purposes, all the URLs are in `social.ts`.
   - `hoverText`: The text that appears when the cursor is on the 3D art.

3. Adjust, add, and remove 3D artworks as needed, ensuring that the artwork ID, position, rotation, and scale all match.






# Customize the art hover details UI


/// To change the artHover details (UI art information)

Go to artData.ts, you'll find a list of artTitles and artDescriptions matching the Artwork IDs. Update the corresponding artwork ID title and description to see the info update in the UI. 
If you change the position or rotation of your artworks, the artHover details should update automatically as long as you maintain consistency with the artworkID. For instance: 

ArtworkID = 1
ArtworkPosition = artPos1
ArtworkRotation = artRot1
artTitle1 = 'your title for Artwork ID 1'
artDescription1 = 'your description for Artwork ID 1'


You can adjust, add and remove 3D artworks, just make sure the artwork id, position, and rotation all match. 




## Customize the lazy loading

Lazy loading helps with scene performance by loading and offloading items depending on the player position. In lazyLoading.ts you can add, remove or adjust lazy loading areas. In the function createAllLazyAreas() you can adjust the existing lazy loading area positions, rotations and scales. You can also add or remove lazy loading areas.

To create a lazy area, in lazyLoading.ts: 

In createAllLazyAreas(): 

 const newLazyArea = engine.addEntity()
  Transform.create(lazyArea, {
    position: // your position,
    rotation: // your rotation,
    scale: // your scale,
    parent: lazyParent
  })

    createLazyArea( your position, your rotation, newLazyArea, index number)



## Customize the audio

To toggle between the playlist and the radio go into the Audio src folder: 

In audio.ts there are two booleans at the top: Playlist and radioPlaying, set them to true or false according to which you want. 

/// This is the Playlist, set to false to remove it
export let Playlist: Boolean = false;


// This is the radio, set to true to play it 
export let radioPlaying: boolean = true;


In playlist.ts set the streamPlayingRef to true or false. (True = playlist, false = no playlist)

/// This is the Playlist, set to false to remove it
export let streamPlayingRef: { value: boolean } = { value: false }; // Set an initial value


In radio.ts set the radioPlaying boolean to true or false (true = radio, false = no radio)

// This is the radio, set to true to play it 
export let radioPlaying: boolean = true;

# Customize the audio UI

In the UI folder, set the playlist and radio booleans to match playlist.ts and radio.ts

playlist.ui.tsx:
// Set Playlist to 'false' to hide the playlist UI:
let Playlist: Boolean = true;

radio.ui.tsx:
// Set Radio to 'true' to show the radio UI:
let Radio: Boolean = false


/// To customize the radio station: 

Change the radioStation url in radio.ts 

// House Radio (24 House Radio)
let radioStation = 'https://strw3.openstream.co/1487?aw_0_1st.collectionid%3D4682%26stationId%3D4682%26publisherId%3D1511%26k%3D1708457720'

Adapt the UI however you like in radio.ui.tsx

let radioStationName = '24 House Radio'
let radioStationNameWrap = wordWrap(radioStationName, 10, 3)
let textColor = Color4.White()
let smallFont = 10


// To customize the playlist: 

Update the data in the playlist Song array to match the song titles, song artists, song duration, and streaming link. 

export const playlist: Song[] = [
  { title: 'DCLMF23 Set', artist: 'RED ALBERT', duration: (60 * 60), url: 'https://bafybeigyzew44hkz46vzugd3plpovkboshdztv74vkmhhflz44477kmqte.ipfs.nftstorage.link/' },
  { title: 'MVFW23 Set', artist: 'RED ALBERT', duration: (60 * 60) + 1, url: 'https://bafybeicvyrgg6jnvpajfenbdspaevx4yydizslxdgmgd6f2y4tptpkzjpu.ipfs.nftstorage.link/' },
  { title: 'LPM x SOA Set 22', artist: 'RED ALBERT', duration: (59 * 60) + 57, url: 'https://bafybeihis46rooueupvj3dett2sz6745lq5od3x74hvmtfvvollsldr5vq.ipfs.nftstorage.link/' },

];

Adapt the UI however you like in playlist.ui.tsx

let songData = 'RED ALBERT Playlist';
let songDataWrap = wordWrap(songData, 8 * tieredModalTextWrapScale, 6);
let playlistFontSize = 12;


















All of the audios are controlled by the functions in audio.ts

import { playAudioAtPlayer } from "./audio";



To use the elevator code to add an elevator to your scene, copy and paste elevator.ts into your scene project and add the following into your index file:

import { ElevatorModule } from './elevator'

ElevatorModule.createElevator

If your project works with one elevator instead of two, take a quick look at the elevator code and follow the commented instructions. 


To add sliding doors into your project, copy and paste doors.ts into your scene project and add the following to your index.ts file: 

import { createAllDoors } from './doors'

createAllDoors()

Inside doors.ts there's a function called 'createAllDoors()' within which you can define the amount of total doors and the individual positions and rotations.



# Find an NFT urn


To add nfts use the function provided in nft.ts, you can customize the urn of the NFT on display (see how to get the URN here: 
For example:



urn:decentraland:ethereum:erc721:0x06012c8cf97BEaD5deAe237070F9587f8E7A266d:558536

The example above fetches an NFT with the contract address 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d, and the specific identifier 558536. The corresponding asset asset can be found in OpenSea at https://opensea.io/assets/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/558536 .
), 
as well as the frame background colour and frame style. You can also reposition, rotate and scale the nft within the same function



## Rewards system 
To set up Wearable claiming, copy and paste the claim-droping folder into your project, alongside config.ts and claim.ui.tsx.
See src folder Rewards for further info. 



## External Image Hosting 
To host your images on an external site, instead of uploading them as files in your scene, you can use CORS friendly hosting services such as NFT.storage (https://nft.storage/). Upload your image, click 'Actions' - 'View URL' and copy the full url from the browser. 


## Change Artwork Positions 
To move artwork we suggest adjusting the values directly in artPositions.ts, then they will automatically update throughout the rest of your code as long as you're following the numbering system, i.e.: 

ArtworkID = 1
ArtworkPosition = artPos1
ArtworkRotation = artRot1
artTitle1 = 'your title for Artwork ID 1'
artDescription1 = 'your description for Artwork ID 1'

(same setup for ArtworkID 1-30)






## Audio Credits

- **Sliding doors sound:** [Magnesus](https://freesound.org/people/Magnesus/sounds/368084/)
- **Call Button click sound:** [BaggoNotes](https://freesound.org/people/BaggoNotes/sounds/721503/)
- **Moving elevator sound:** [Isaac200000](https://freesound.org/people/Isaac200000/sounds/260571/)
- **Elevator button click sound:** [Kickhat](https://freesound.org/people/kickhat/sounds/264447/)
- **Elevator arrival sound:** [MATRIXXX___](https://freesound.org/people/MATRIXXX_/sounds/514864/)
- **Radio station:** [24 House Radio](https://onlineradiobox.com/ro/24house/?cs=ro.24house)
- **Playlist:** Featuring music by DJ Red Albert, performed in DCL and available with the Red Albert Radio (Smart Wearable)




**Questions and Feedback**
For questions, suggestions and improvements feel free to push directly to this repository or contact @LowPolyModelsW on X and Instagram. 








