#!/usr/bin/env bash

# TODO: how do we get the current version from
# https://developer.tizen.org/development/tizen-studio/download
BINARY="web-cli_Tizen_Studio_5.1_macos-64.bin"
URI="https://download.tizen.org/sdk/Installer/tizen-studio_5.1/$BINARY"
TIZEN_ROOT="$HOME/Tizen-Studio"

echo "Installing Tizen to $TIZEN_ROOT"
mkdir -p "$TIZEN_ROOT"
cd "$TIZEN_ROOT" || exit

if ! [ -f "./$BINARY" ]; then
  echo "Downloading Tizen cli installer"
  wget "$URI"
else
  echo "Tizen cli installer already downloaded"
fi


chmod +x "./$BINARY"
"./$BINARY" --accept-license "$TIZEN_ROOT/install"

"$TIZEN_ROOT/install/package-manager/package-manager-cli.bin" --accept-license install TV-SAMSUNG-Extension-Tools TV-SAMSUNG-Extension-Resources cert-add-on TV-SAMSUNG-Public TV-SAMSUNG-Public TV-SAMSUNG-Public-Emulator TV-SAMSUNG-Public-WebAppDevelopment

echo "Set workspace to $TIZEN_ROOT/workspace and check the box so it doesn't ask you again"
open "$TIZEN_ROOT/install/TizenStudio.app"
