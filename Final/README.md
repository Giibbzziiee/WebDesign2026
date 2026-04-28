# MART 441 Final Project Reflection
## Interactive Solar System — Ethan Gibson

---

### Project Overview

For my final project I built an interactive 3D solar system using Three.js. The experience features a textured sun with a glow effect, all eight planets orbiting at scaled speeds and distances, Saturn's rings, a star field background, and a click-based info panel that displays facts about each planet.

---

### What I Built

#### Scene Setup
- Configured a Three.js scene, perspective camera, point light, ambient light, and WebGL renderer from scratch
- Appended the renderer to a specific HTML container div rather than the body, so it fits cleanly into the existing Gibson Media page layout
- Used TrackballControls to allow the user to drag, zoom, and pan around the scene freely

#### The Sun
- Loaded a Blender-exported OBJ model using OBJLoader
- Bypassed MTLLoader in favor of directly applying a 2K NASA sun texture using TextureLoader
- Used MeshBasicMaterial so the sun renders at full brightness regardless of scene lighting, giving it a self-illuminating appearance
- Added a secondary larger sphere with a transparent BackSide material to create a soft glow halo effect

#### Planets
- Wrote a reusable `addPlanet()` function that accepts texture path, size, orbital distance, and orbital speed as parameters
- Used Three.js SphereGeometry with MeshBasicMaterial and TextureLoader for each planet
- All eight planets use real 2K NASA texture maps: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune
- Each planet stores its mesh, distance, speed, and current angle as an object returned from `addPlanet()`

#### Orbital Mechanics
- In the `render()` loop, iterated over the planets array using `forEach`
- Updated each planet's position each frame using circle math:
  - `position.x = Math.cos(angle) * distance`
  - `position.z = Math.sin(angle) * distance`
- Each planet starts at a randomized angle so they aren't all bunched at the same point on load

#### Saturn's Rings
- Used Three.js RingGeometry with a 2K ring texture that includes an alpha channel for transparency
- Manually fixed the UV mapping on the ring geometry so the texture wraps radially rather than being stretched flat
- Added the ring mesh as a child of Saturn's mesh so it orbits with the planet automatically

#### Star Field Background
- Replaced the solid color scene background with a 2K NASA star field texture using TextureLoader

#### Click Interaction
- Used Three.js Raycaster to detect mouse clicks in 3D space
- Calculated normalized mouse coordinates relative to the canvas container
- On click, cast a ray from the camera through the mouse position and checked intersections against all planet meshes
- Matched the intersected mesh back to its index in the planets array to look up planet data
- Displayed an HTML overlay panel in the top right corner showing the planet name, order from the sun, day length, and surface gravity
- Clicking empty space hides the panel

---

### What I Learned 

#### Three.js Core Concepts*
- How scene, camera, and renderer work together as the three required components of any Three.js project
- The difference between MeshBasicMaterial (ignores lighting) and MeshPhongMaterial (responds to lighting), and when to use each
- How BackSide rendering works for creating glow and atmosphere effects
- How to append the renderer to a specific container rather than the document body

#### Loaders and Asset Pipeline
- How OBJLoader and MTLLoader work together, and why version matching between Three.js core and loader scripts matters
- Why absolute file paths baked into MTL files by Blender break in a browser context
- How to bypass MTLLoader entirely and apply textures manually with TextureLoader for more reliable results
- How CDN version consistency affects whether libraries are compatible with each other

#### 3D Math (Thank god for Claude)
- How trigonometry (Math.cos and Math.sin) drives circular orbital motion in 3D space
- How RingGeometry UV mapping works and why it needs manual correction for textures to display correctly
- How raycasting works to translate 2D mouse coordinates into 3D intersection detection

#### Project Structure  
- How to organize a Three.js project into clean helper functions (getScene, getCamera, getLight, getRenderer, getControls)
- How to write reusable functions with parameters instead of duplicating code per planet
- How parent-child relationships in Three.js (adding a ring as a child of a planet mesh) simplify keeping objects together during animation

---

### Libraries Used

- Three.js r0.131.2 via jsDelivr CDN
- OBJLoader r0.131.2 via jsDelivr CDN
- MTLLoader r0.131.2 via jsDelivr CDN
- TrackballControls r0.131.2 via jsDelivr CDN

### Texture Credits

All planet and star textures sourced from NASA's publicly available 2K texture maps.