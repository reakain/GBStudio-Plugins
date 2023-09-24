# GBStudio Plugins

I had a couple plugins I made for multi-step events that I found myself repeating too often. Most of these are for different single or multi-actor animations and social events. There are several other plugin repos folks have made, and I used them as a reference for laying out my own plugins. The links to all those resources are [here](#Resources)

## Usage and Installation

Copy the plugins folder to the folder your assets folder is stored in. 

## Plugin Listing

### Actor Hop
Make your actor do a little hop, or several hops with a set pause between them. Shows up as Actor > Actor Hop. You select an actor, provide the number of hops, and the pause interval. (6 frames is the default, which is roughly 0.1 seconds)


<img alt="Example of an actor performing repeated hops" src="./images/actor_hop.gif" width="50%">

### Social Hop
Do sequential number sets of hops between two actors.

<img alt="Example of a pair of actors performing repeated hops, growing in amount as they alternate" src="./images/social_hop.gif" width="50%">

### Player Sprite Select
Some cursed nonsense needs figure if this will even work

### Dialogue Tree Builder
I built too many dialogue trees, so I made a combo of my standard switches for the sake of saving myself some pain in the visual editor

### Calendar Updater
Basically, you want to have a calendar in your game? Do you want to visually track what day it is? Add this plugin, make a scene with the calendar background and a scene with calendar tiles. Add the Calendar Updater event to the scene with the calendar background, and set the variables as listed. (First one is the variable you use for tracking the day, the rest should be unique variables. I recomment Local 0-4)

<img alt="Example of an in game calendar, on the fourth day of the month" src="./images/calendar_example.PNG" width="50%">

### Actor Dialogue Cycler
Do you want your actor to iterate through a set of dialogue options every time you interact with em? That's what this is. I have a checkbox to randomize order but that currently does nothing. Can have up to 99 dialogue options. Should work with avatars and multiple text boxes.

## Resources
All the other plugin repos and guides for GB Studio that I know of.

- [Your Username's Plugins](https://github.com/Y0UR-U5ERNAME/gbs-plugin-collection)
- [HerrLeise's Plugins and Guide](https://github.com/HerrLeise/GB-Studio-Plugins)
- [Pau Tomas' Plugins](https://github.com/pau-tomas/gb-studio-plugins)
- [Pau Tomas' Guide](https://gist.github.com/pau-tomas/25ef9ab2508b80b22bde4091b1df0503)
- [Doc Hardware's Plugins](https://github.com/dochardware/GBStudio-Plugins)