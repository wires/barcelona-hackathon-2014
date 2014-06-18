## Setup

	npm i
	bower install

For development, install gulp and the ripple emulator

	npm i -g gulp

For Cordova development you also need these

	npm i -g cordova ios-sim ripple-emulator

We need to setup the platforms and geolocation plugin.

	cordova platforms add android
	cordova platforms add ios
	cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-geolocation.git

Then we prepare and build once, after the we should be able to use the
emulator.

	cordova prepare; cordova build

## Running

	node server.js

Or to emulate the phone

	ripple emulate

If you get an error `Cannot GET /`, create a directory `.cordova` in the
root of this project. This is a bug in ripple.

If you get `Error: static() root path required at Function.static`, this
is also a ripple bug. Open the devices tab and switch to an iPhone (for
instance).

## Development

This will automatically restart the node server when sources have
changed.

	gulp develop
