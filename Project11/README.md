# Project Reflection - YT Categories  
### MART 441 | Ethan Gibson  


## The What  

For this assignment, I made a page called **ytcats.html** for my Gibson Media portfolio. It pulls in a local JSON file with YouTube’s official US video categories using jQuery AJAX, then displays them in two columns. One column is for categories you can assign to videos, and the other is for internal-only ones. I also added a small jQuery plugin so you can click a card and highlight it.


## The How  

Going into it, I mostly understood what needed to happen. Grab JSON, display it, and make a plugin. I just had to figure out how jQuery’s AJAX worked compared to vanilla JavaScript.

I picked the dataset myself using YouTube categories from their API because it was simple and had a built-in boolean (`assignable`) that made the two-column layout an easy choice. The layout and structure were based on the style I’ve already been using for my site.

I used Claude more like a second brain than a code generator. I asked questions, read through the responses, and adjusted things to fit my own style. I made sure I understood what I was putting into the project.

The biggest issue I ran into was the JSON not loading, which turned out to be a CORS problem. The browser blocks local file requests when you open an HTML file directly. I figured that out and fixed it by running everything through Live Server in VS Code.


## The Why  

The biggest thing that clicked for me was how `$.getJSON()` compares to `fetch()`. They both do the same thing by getting data asynchronously, but jQuery wraps it in a cleaner call. Once I saw that connection, AJAX made a lot more sense.

The plugin part was new, and the `$.fn` syntax felt weird at first. After reading into it, it made sense. You are just extending jQuery so your function works on selected elements. The highlight feature is simple, but it proves the idea and adds something useful.


## Takeaways  

Overall, this project felt a lot more like real development work. I had to figure things out, read documentation, and adapt examples instead of following steps. I came away with a better understanding of how data moves from a file into the page and where jQuery fits into that process.