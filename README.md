# JW Player Tizen App

[Embed a Player in a Tizen App](https://docs.jwplayer.com/players/docs/jw8-embed-a-player-in-a-tizen-app)

This is JW Player’s demo application for Samsung Tizen Smart TVs showcasing how the player can be used for such applications. It is a Tizen Web Application built with HTML, CSS, and JS and targeting Tizen 4.0+ and 2018 Smart TVs and later.

There are three screens to the demo app. The main playlist landing page, the video detail page, and the player page.
    
## Getting Started

Download Tizen SDK: https://developer.tizen.org/development/tizen-studio/download

**If you are using an M1 Macbook and encounter any installation issues, you can try installing Tizen Studio following this process: https://remoteorigin.com/blog/install-tizen-studio-on-apple-m1/**


1. Unpack the provided zip file.

2. Launch Tizen Studio and select `File -> Import -> Tizen -> Tizen Project`

3. Import into your workspace the folder where you unzipped the archive provided.

  - If you have issues importing the project, you can try loading it via `File -> Open Projects from File System...` and select the project directory there instead.


### Adding/Updating Application Media

To change the media used within the application, you will need to update the playlist feeds supplied to it.

- In `index.html` you can see the playlist used for the demo. Feel free to change urls there or to add playlist items. Lots of properties shown are provided in the example. The minimum needed for a playlist (feed) is:
```js
{
  title: "My Playlist",
  playlist: [
    {
      title: "My Video",
      image: "https://cdn.jwplayer.com/v2/media/tEqLdF39/poster.jpg?width=720"
      sources: [
        {
          file: "https://cdn.jwplayer.com/manifests/tEqLdF39.m3u8",
          type: "application/x-mpegurl"
        }
      ]
    }
  ]
}
```

## TV Extensions

There may be additional packages you need to install to run the application. You can find them in the Package Manager which can be accessed via `Tools -> Package Manager`

- Select the `Extension SDK` tab

- Install the `Samsung Certificate Extension`

- Install `TV Extension Tools`

- Install any `TV Extensions-{version}`

## Application Certificates

In order to run the application, you need to create an author and a distributor certificate: [Samsung Creating Certificates Docs](https://developer.samsung.com/SmartTV/develop/getting-started/setting-up-sdk/creating-certificates.html).

When creating the distributor certificate, set the `Privilege` level to `Partner`.

If you are running the application on a TV, you need to know the TVs Unique Device ID (DUID), which can be found here:

-  On your TV, open the settings menu and go to `Support > About This TV` and scroll down to find the Unique Device ID.

## Running the Application

You can run the application in 3 different environments - a Web Simulator, an Emulator, or a TV. The simulator is great for development and quick run throughs, whereas the tv is better for the actual experience.

#### Web Simulator
[Samsung Web Simulator Docs](https://developer.samsung.com/smarttv/develop/getting-started/using-sdk/tv-simulator.html)

- In the Project Explorer, right click on the project and select `Run As > Tizen TV Web Simulator Application (Samsung TV)`

- If you don't see a Project Explorer, you can open it by going to `Window -> Show View -> Other -> General dropdown -> Project Explorer`

**Right click on the simulator screen to open a settings menu so you can access things like the web inspector.**

#### Emulator
**There have been issues running the emulator on Mac OS's newer than Catalina, so it's recommended to use a real device if possible. If you are having HAXM issues, you can try to work through them following this guide: https://github.com/intel/haxm/wiki/Installation-Instructions-on-macOS (Archived Jan. 2023)**

[Samsung Emulator Docs](https://developer.samsung.com/smarttv/develop/getting-started/using-sdk/tv-emulator.html)

- Right-click on the project and select `Run As > Tizen Web Application`

If that doesn’t work try:

1. Go to `Tools > Emulator Manager`

2. Select the Emulator you want and click `Launch`

3. Wait for a colorful ATV Screen

4. Right-click on the application's folder and choose `Run As > Tizen Web Application`

#### Tizen TV
[Samsung TV Docs](https://developer.samsung.com/SmartTV/develop/getting-started/using-sdk/tv-device.html)

Directions to setup the TV and configure it as a device are outlined in the linked doc.

- Make sure the TV is connected to the same wifi as your computer.

- To find the TVs IP Address:

  1. Open the TV Settings Menu by selecting **SETTINGS** on your remote or navigating to **SETTINGS** from the Smart Hub

  2. Select `General -> Network -> Network Status -> IP Settings`

- When configuring the device in Tizen Studio, if there is no port, keep the default `26101` port

Once you finish setting up and configuring in Tizen Studio:

1. Right click the project and select `Build Signed Package`

2. In the Device Manager, right click on the TV name in the device list and be sure to select `Permit to install applications`

3. Right click the project and select `Run As > Tizen Web Application`

The Tizen JW Demo app should then launch automatically within the TV.


## Debugging

If you are using the Web Simulator, you can debug similarly to how you would debug in a browser. To pull up the web inspector, right click on the simulator and select `Web Inspector`.

If you are using the Emulator or TV, you can right click on the project and select `Debug As -> Tizen Web Application` and a web inspector will appear.

Helpful Resources
------------

- [Tizen App Development Guide](https://medium.com/norigintech/the-ultimate-guide-to-samsung-tizen-tv-web-development-f4613f672368)

- [Building a React App for Tizen](https://stackoverflow.com/a/59603438)

- [Official Samsung Tizen Demo Apps](https://github.com/Samsung/TizenTVApps)

- [Tizen Remote Controls Reference](https://developer.samsung.com/SmartTV/develop/guides/user-interaction/remote-control.html#)

- Full list of Tizen Platforms and the devices that support them [here](https://developer.samsung.com/smarttv/develop/specifications/tv-model-groups.html).
  - Tizen 4.0 and below is supported on 2018 TVs
  - Tizen 5.0 and below is supported on 2019 TVs
