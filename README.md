# CL Final Project: Virtual Campus Garden
fatima and toomie's connections lab final project!

## Concept
A shared virtual garden where multiple users can plant flowers from the plant menu and water them to watch them grow. 
This is intended to be a calming gardening simulation game. 


## Process
To make our application, we used ```p5.js``` and ```p5.play``` as our JS libraries, and we used MongoDB to store user's plants. 
We started off by working on the p5 interactions and making the sprites. We couldn't find a lot of plant sprites that had a consistent style, so 
Toomie used the flowers from Animal Crossing as a reference and drew the plant sprites on Procreate then exported them as png images to use as sprites. 
fatema, u can probably speak on p5 play animations here?



## Challenges
One of the main challenges we faced while working on this project was 

Another challenge we had was working with MongoDB and figuring out how to save our plants array onto the DB, and also sending the array information eveery time a change is made, such as 
when a user waters a plant and the sprite changes, or if a plant is deleted. Our issue was that the array was only getting posted whenever a new plant was added to it.
So, what we needed to do was post the array again on mouse released, so the position and sprite information was updated in the DB. 

Another issue we had with MongoDB was that our plant object had the image stored in it, but MongoDB does not store images so we had to change the way we store 
the image in the object. We instead used an ```imgIndex``` which stores the number of the sprite image:

```
        let plant = {
          x: mouseX,
          y: mouseY,
          imgIndex: 0,
          g: 0,
          t: i,
          username: username,
        };
```

## Next Steps
body

## Conclusion
body


For code - ```code here ```
