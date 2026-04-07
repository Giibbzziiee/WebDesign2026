# Project Reflection - Canvas Mini-Game  
### MART 441 | Ethan Gibson  


## The What  

For this assignment, I built a small canvas survival game called **Rune Runner** for my Gibson Media portfolio. You control a glowing orange rune with WASD or arrow keys and try to avoid a bouncing wraith. Ten collisions triggers a game over overlay, and R restarts without a page reload.


## The How  

The dark, minimal aesthetic was already established across the rest of my portfolio so fitting the game into that style was an easy call. I built it around a single `Entity` class covering position, size, color, speed, and a grow timer for collision feedback, so both objects share the same logic cleanly. Collision is checked every frame using a basic AABB box check.

The animation loop runs at `1000/60` for roughly 60fps. Getting `clearRect()` in the right place early mattered more than I expected since leaving it out causes streaking fast. The music uses a Play/Pause button instead of autoplay since browsers block that until the user interacts with the page.

The wraith also scales in difficulty as collisions stack up. Each hit increases its speed and nudges its velocity slightly toward the player, so it transitions from purely bouncing to actively hunting over the course of the game. The key to keeping that from spiraling out of control was normalizing the velocity every frame, calculating the current magnitude and rescaling it back to the target speed so the steering affects direction without compounding the overall pace.


## The Why  

The update loop pattern was the thing that clicked most. Clear, update state, draw. Once that order made sense the rest of the logic followed naturally. Using a class instead of plain objects also paid off because the grow timer and base size tracking only had to live in one place.


## Takeaways  

Even a simple prototype involves more stacking decisions than it looks like from the outside. Boundary clamping, collision timing, game over state — none of it is hard alone, but getting it all working together takes real iteration.
