# CL Final Project: Virtual Campus Garden
By Fatema Alhameli and Fatima Aljunaibi(toomie)

* [Live Site](https://campus-garden.glitch.me)

* [Glitch Code Link](https://glitch.com/edit/#!/campus-garden)

## Concept
A shared virtual garden where multiple users can plant flowers from the plant menu and water them to watch them grow. 
This is intended to be a calming gardening simulation game. 


## Process
To make our application, we used ```p5.js``` and ```p5.play``` as our JS libraries, and we used MongoDB to store user's plants. 
We started off by working on the p5 interactions and making the sprites. We couldn't find a lot of plant sprites that had a consistent style, so 
Toomie used the flowers from Animal Crossing as a reference and drew the plant sprites on Procreate then exported them as png images to use as sprites. 
fatema, u can probably speak on p5 play animations here?



## Challenges
One of the main challenges we faced while working on this project was getting the p5 interactions to run smoothly. 
### fatema pls expand here if u dont mind!

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
A few things we would have liked to add to this project are:

### Making the garden changes show in real time
body

### An option of not having everyone access your plant
body

### Adding more types and colors of plants
Right now we only have 4 different colored roses in the menu, but we would have liked to give the user different flower options such as lillies or tulips for example.

### Create a day and night cycle
In our initial plan, the plant growth would have been controlled by a day-night cycle rather than a user-controlled watering can, but we scrapped that idea because we felt that making it user-controlled would be more interactive. Nevertheless, we still think a day-night cycle would be a fun addition to this project, not necessarily to control plant growth but just to make the experience more engaging.



## Conclusion
body


## Contributions

### Fatema:
body

### Toomie:
body

## References



For code - ```code here ```
