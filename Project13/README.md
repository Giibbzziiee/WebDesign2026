# Project Reflection - Canvas Mini-Game  
### MART 441 | Ethan Gibson  


## The What  

**Rune Runner** is a tag game built on HTML5 Canvas. You and three AI entities share the canvas -- one is always "it" and chases the others. Get tagged and you become the chaser. Speed boosts in the corners give a temporary burst, and five pillar obstacles break up the space so you can't just run in a straight line.


## The How  

Built around a shared `Entity` class covering movement, collision, immunity timers, and speed boosts for both the player and AI. Obstacles and collectibles load from external JSON files via `fetch()` and get mapped into class instances stored in arrays. AABB collision handles both obstacle blocking and tag transfers, with X and Y axes checked separately for smooth edge sliding. An immunity timer prevents instant tag-backs.

AI behavior is state-driven -- tagged entities chase, untagged ones flee. The flee logic takes the quickest route away from whoever is it with a small random drift added. It works but isn't as dynamic as I'd have liked. Proper randomized pathfinding that accounts for obstacles would have made the AI feel a lot less predictable, and that's something I'd revisit given more time.


## Takeaways  

State management ended up being the core challenge. Every entity needs to know what it is, what it was, and whether it can be tagged. Keeping that clean inside the class made everything else easier to reason about.
