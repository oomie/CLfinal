# CL Final Project: Virtual Campus Garden
By Fatema Alhameli and Fatima Aljunaibi(toomie)

* [Live Site](https://campus-garden.glitch.me)

* [Glitch Code Link](https://glitch.com/edit/#!/campus-garden)

## Concept
A shared virtual garden where multiple users can plant flowers from the plant menu and water them to watch them grow. 
This is intended to be a calming gardening simulation game. As this is a public garden all users are able to plant new plants anywhere on the soil and remove any plants on the soil.


## Process
To make our application, we used ```p5.js``` and ```p5.play``` as our JS libraries, and we used MongoDB to store user's plants. 
We started off by working on the p5 interactions and making the sprites. We couldn't find a lot of plant sprites that had a consistent style, so 
Toomie used the flowers from Animal Crossing as a reference and drew the plant sprites on Procreate then exported them as png images to use as sprites. 

### Wireframe
<img src= "https://github.com/FatemaAlhameli/ConnectionsLab/blob/main/Media/Assignments%20Media/FinalProjectw1.png" width = "250" height = "180"> <img src= "https://github.com/FatemaAlhameli/ConnectionsLab/blob/main/Media/Assignments%20Media/FinalProjectw2.png" width = "250" height = "180"> <img src= "https://github.com/FatemaAlhameli/ConnectionsLab/blob/main/Media/Assignments%20Media/FinalProjectw3.png" width = "250" height = "180">

### Information Flow

* Plant object: saves the coordinates of the plant when placed on the grid, what state it’s in (sprout, stem, flower) and how old it is. 

* When the user drags a plant to the grid it gets saved to the database. 

* If the user chooses to delete a plant, then it gets deleted from the db.
 
* Usernames will be displayed on the soil 


### HTML/CSS/JS

The use of HTML and CSS in this project was pretty simple we used two Html pages, one for our home page and another one where we displayed our p5 canvas. Our home page consisted of a title and a few instructions for the users to read. We also included an image at the footer. We used CSS for the fonts, background colors, sizes, and positions of all Html elements.

```
    <button data-instructions-target="#instructions" class="instructions-btn">
      Instructions
    </button>
    <div class="instructions" id="instructions">
      <div class="instructions-header">
        <div class="title">Instructions</div>
        <button data-close-button class="close-button">&times;</button>
      </div>
      <div class="instructions-body">
        <ul>
          <li>Drag your desired flower on to your grid</li>
          <li>Use the water can tool by clicking on the icon</li>
          <li>Press and hold to water your flower and watch it grow</li>
          <li>
            Use the scissors tool by clicking on the icon and click to remove
            your flower
          </li>
        </ul>
      </div>
    </div>
    <div id="overlay"></div>
```

In our main Html page, we displayed our p5 canvas at the width and height of the window. At the top, we added a heading with the name of our project “Campus Garden” and an instructions button. The button is a popup that maximizes a small instructions page. We followed a [tutorial](https://www.youtube.com/watch?v=MBaw_6cPmAw) that helped us create it. The process consisted of two buttons and a few divs for the sections of the instructions such as the header and body. One of the buttons was included in a div and its role is to close the popup. In the instructions body div, we added a list where we wrote our instructions. To create the popup interaction we had to use JS and add a few click events. 

<img src= "https://github.com/FatemaAlhameli/ConnectionsLab/blob/main/Media/Assignments%20Media/instructions.png" width = "260" height = "190">

```
window.addEventListener("load", () => {
  // Asking for username on load
  username = window.prompt("Enter your name! ");

  //Instructions Popup
  let openInstructionsButtons = document.querySelectorAll(
    "[data-instructions-target]"
  );
  let closeInstructionsButtons = document.querySelectorAll(
    "[data-close-button]"
  );
  let overlay = document.getElementById("overlay");

  openInstructionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let instructions = document.querySelector(
        button.dataset.instructionsTarget
      );
      openInstructions(instructions);
    });
  });

  overlay.addEventListener("click", () => {
    let instructions = document.querySelectorAll(".instructions.active");
    instructions.forEach((instructions) => {
      closeInstructions(instructions);
    });
  });

  closeInstructionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let instructions = button.closest(".instructions");
      closeInstructions(instructions);
    });
  });
}); //load

//Instructions Popup
function openInstructions(instructions) {
  if (instructions == null) return;
  instructions.classList.add("active");
  overlay.classList.add("active");
}

function closeInstructions(instructions) {
  if (instructions == null) return;
  instructions.classList.remove("active");
  overlay.classList.remove("active");
}
```

### p5.js & p5.play

We first began developing our project on the p5.js editor as almost all of the interactions are via p5.js and p5.play. To use p5.play we had to add a few script tags in the HTML of the editor to be able to use the library. In draw, we created our basic UI such as the grass, soil, menu bar, and tools section. These we created with simple p5 shapes using the ```rect()```.  We also added the sky and fence images through the preload function and ```image()``` in the draw function.

```
  //grass
  fill(184, 224, 189);
  rect(width / 2, 185 * unit, width, 200 * unit);
  
  //grid
  fill(197, 156, 108);
  rect(width / 2 + 20 * unit, 140 * unit, width - 40 * unit, 60 * unit);

  //menu bar
  fill(0, 0, 0, 80);
  rect(width / 2, 210 * unit, width, 60 * unit);
  fill(0, 0, 0, 200);
  rect(25 * unit, 190 * unit, 40 * unit, 15 * unit);
  textSize(7 * unit);
  fill(255);
  text("Plant Menu", 25 * unit, 192 * unit);
```

 We created a global variable called unit and used it to make the canvas responsive for all screen sizes through ```windowWidth``` and ```windowHeight```. At the beginning of our code, we also initialized two arrays, plants and flowers that we used throughout our code to create the interactions. We used the preload function to upload all of the images, font, and sounds. Since our flower images are sprites and have three growing stages we loaded each image of the sprite seperatly but gave them the same file name but different numbers from 0-8. We stored each flower color with its three stages in a separate array and named the array according to the flower color. Each array began with the same image which is a stem. We then pushed all flower arrays into a single array, called flowers[]. So technically we had mutiple arrays in one single array.  

```
 //there are 9 images of flowers where fist image is common stem
  Red = []; //storing each image as seprate array
  Red.push(loadImage(`assets/flower${0}.png`));
  Red.push(loadImage(`assets/flower${1}.png`));
  Red.push(loadImage(`assets/flower${2}.png`));

  Blue = [];
  Blue.push(loadImage(`assets/flower${0}.png`));
  Blue.push(loadImage(`assets/flower${3}.png`));
  Blue.push(loadImage(`assets/flower${4}.png`));

  Purple = [];
  Purple.push(loadImage(`assets/flower${0}.png`));
  Purple.push(loadImage(`assets/flower${5}.png`));
  Purple.push(loadImage(`assets/flower${6}.png`));

  White = [];
  White.push(loadImage(`assets/flower${0}.png`));
  White.push(loadImage(`assets/flower${7}.png`));
  White.push(loadImage(`assets/flower${8}.png`));

  //then pushing them into a single array;
  flowers.push(Red, Blue, Purple, White);

function setup() {
  //canvas fully covers the screen but game it self loads in 16:9 ratio
  //unit variable is used here to make canvas responsive
  if (windowWidth < 1.5 * windowHeight) {
    unit = windowWidth / 400;
  } else {
    unit = windowHeight / 225;
  }
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont(myFont);
  rectsize = 50 * unit;

  //img position
  shapeX = 50 * unit;
  shapeY = 300 * unit;

  //grid position
  rectX = 0;
  rectMode(CENTER);
  textAlign(CENTER);

  music();

}
```
In setup, we added the music, text, and position of the images and grid. Where we created our menu panel in draw we added a for loop that drew four squares across the menu. In those four squares, we added the display images of the fully grown flowers. In that same for loop, we added two if statements. The first indicates that if the mouse is on the menu bar coordinates of the flower box and then if the mouse is pressed when the user clicks on the plant menu a plant object is created. This plant object is the most significant part of the code, as it creates the new flowers and then, later on, is used to send them to the server. The plant object contains the x and y coordinates, which are ```mouseX``` and ```mouseY```, and an image index which is equal to 0 that ultimately stores the flower images, g which tracks time, t which is equal to i, that is basically meant to indicate the growing stage of the flower, and lastly the username. The username is a variable we created and made it equal to the window prompt that is called in load. So we just called that variable in the plant object. Once that object is created when the mouse is pressed on the plant menu it is then pushed into the plant array we created.

```
for (let i = 0; i < flowers.length; i++) {
    fill(32, 58, 70);
    x = 170 * unit + 35 * unit * i;
    y = 207 * unit;

    if (
      mouseX > x - 15 * unit &&
      mouseX < x + 15 * unit &&
      mouseY > y - 15 * unit &&
      mouseY < y + 15 * unit
    ) {
      if (mouseIsPressed && once == false) {
        //when user clicks on a plant in menu
        once = true;
        tool = undefined;

        let plant = {
          x: mouseX,
          y: mouseY,
          imgIndex: 0,
          g: 0,
          t: i,
          username: username,
        };

        console.log(unit, plant.x, plant.y);
        plants.push(plant); //we create a plant object and push it to plants array

      }

    rect(x, y, 30 * unit, 30 * unit);
    image(flowers[i][2], x - 15 * unit, y - 15 * unit, 30 * unit, 30 * unit);
    //flowers[i][2] shows the fully grown form of each plant, it is the display img
  }
```


We then added a for loop that displays the flower images according to the plant object that is being stored in an array. To do this, we added the image function and in the syntax, we added the image arrays we preloaded (flowers array) as shown. ```image(flowers[plants[i].t][plants[i].imgIndex], plants[i].x, plants[i].y, 30 * unit, 30 * unit);```
Inside of that flowers array, we added the plant's array that is storing the object when created. We added t and imgIndex so that it would first start with the stem which is numbered 0 and t because it is equal to i and later on when i is increased the flower image would change. For the coordinates, we added the plant object’s x and y. We then set the dimensions we wanted for the flower images. 

After the image function we called a function we created called ```showName(x, y, name)```. This function has the mechanics of the username. We set attributes to the function x, y, and name so that when we call it we can add the plant object’s x and y. The functions includes ```textAlign(CENTER)``` and the text function ```text(name, x + 30, y + 20)```. The reason we added to the x and y is that we wanted the username to show above the plant. We called the showName function after the image that is displaying the new flowers created. When we called it we added the object’s x, and y coordinates, and the username variable so that the username would show with the plant when its created.  ```showName(plants[i].x, plants[i].y, plants[i].username);```

Continuing in that same for loop we have a few nested if statements. The first if statement calls the variable we created tool.  Inside of it, we add an if the mouse is pressed statement, and inside of that statement is another if statement that indicates if the distance between mouseX, mouseY, and plants[i].x, plants[i].y is less than a certain number, the image inside of the plant object would equal to 1, which means it grew one stage and the g in the object would increase (g is time).  In that same mouse is pressed statement we added another if statement that specifies when g is greater that 140 the growing stage changes to the fully grown flower. Meaning imgIndex from the object would increase. Another if statement in mouse is pressed is when tool is equal to the scissors image ```plants.splice```. This means that when the users use the scissors on the flowers created from the object it would delete the flower/plant. We then added two more if statements separately inside the draw function. One that specifies if tool is called it would display the correct tool image at the mouse. And lastly, another if the mouse is pressed statement that checks if the dimensions of the mouse are on a plant. 

```
function draw() {
  background(230, 247, 255);
  
  //grass
  fill(184, 224, 189);
  rect(width / 2, 185 * unit, width, 200 * unit);
  
  //grid
  fill(197, 156, 108);
  rect(width / 2 + 20 * unit, 140 * unit, width - 40 * unit, 60 * unit);

  //menu bar
  fill(0, 0, 0, 80);
  rect(width / 2, 210 * unit, width, 60 * unit);
  fill(0, 0, 0, 200);
  rect(25 * unit, 190 * unit, 40 * unit, 15 * unit);
  textSize(7 * unit);
  fill(255);
  text("Plant Menu", 25 * unit, 192 * unit);

  for (let i = 0; i < flowers.length; i++) {
    fill(32, 58, 70);
    x = 170 * unit + 35 * unit * i;
    y = 207 * unit;

    if (
      mouseX > x - 15 * unit &&
      mouseX < x + 15 * unit &&
      mouseY > y - 15 * unit &&
      mouseY < y + 15 * unit
    ) {
      if (mouseIsPressed && once == false) {
        //when user clicks on a plant in menu
        once = true;
        tool = undefined;

        let plant = {
          x: mouseX,
          y: mouseY,
          imgIndex: 0,
          g: 0,
          t: i,
          username: username,
        };

        console.log(unit, plant.x, plant.y);
        plants.push(plant); //we create a plant object and push it to plants array

        //stringify the object
        let jsonData = JSON.stringify(plants);

        //fetch to route plantdata

        fetch("/plantdata", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: jsonData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      }
    }

    rect(x, y, 30 * unit, 30 * unit);
    image(flowers[i][2], x - 15 * unit, y - 15 * unit, 30 * unit, 30 * unit);
    //flowers[i][2] shows the fully grown form of each plant, it is the display img
  }
  //Display the plant images accodring to the plant object that is being stored in an array
  for (let i = 0; i < plants.length; i++) {
    image(
      flowers[plants[i].t][plants[i].imgIndex],
      plants[i].x,
      plants[i].y,
      30 * unit,
      30 * unit
    );
    showName(plants[i].x, plants[i].y, plants[i].username); // username shows above the plant

    if (tool) {
      console.log(tool);
      //to see which tool is selected and grow or remove plant here
      if (mouseIsPressed) {
        if (dist(mouseX, mouseY, plants[i].x, plants[i].y) < 30 * unit) {
          plants[i].imgIndex = 1;
          plants[i].g++;
          if (plants[i].g > 140) {
            // when g is greater that 140 the growing stage changes
            plants[i].g = 140;
            plants[i].imgIndex = 2;
          }
          if (tool == scissor) {
            plants.splice(i, 1);
            i--; //to remove the plant
            cut.play();
          }
        }
      }
    }
  }

  //visuals
  image(skyimg, 300, 70, 900, 190);
  image(fenceimg, 5, 265, 250, 80);
  image(fenceimg, 100, 265, 250, 80);
  image(fenceimg, 340, 265, 250, 80);
  image(fenceimg, 580, 265, 250, 80);
  image(fenceimg, 820, 265, 250, 80);
  image(fenceimg, 1060, 265, 250, 80);
  image(fenceimg, 1300, 265, 250, 80);
  image(fenceimg, 1540, 265, 250, 80);

  //toolbar
  fill(32, 58, 70);
  rect(20 * unit, 125 * unit, 30 * unit, 30 * unit);
  image(scissor, 5 * unit, 110 * unit, 30 * unit, 30 * unit);
  rect(20 * unit, 160 * unit, 30 * unit, 30 * unit);
  image(water, 5 * unit, 145 * unit, 30 * unit, 30 * unit);

  if (tool) {
    image(tool, mouseX - 15 * unit, mouseY - 15 * unit, 30 * unit, 30 * unit); // displays the correct tool img at the mouse
  }

  //
  if (mouseIsPressed && plants.length > 0 && once == true) {
    //user clicks and hold mouse for planting/watering, this checks if its on the plant
    plants[plants.length - 1].x = mouseX - 15 * unit;
    plants[plants.length - 1].y = mouseY - 15 * unit;
  }
}
```

Next we added a ```mousePressed``` function that includes a for loop and a few if and else statements that indicate if the ```mousePressed``` is in the toolbar it checks and assigns which tool is clicked. 
```
function mousePressed() {
  for (let i = 0; i < 2; i++) {
    if (
      // if mousePressed in toolbar: checks and assigns which tool is clicked
      mouseX > 5 * unit &&
      mouseX < 35 * unit &&
      mouseY > 110 * unit + 35 * unit * i &&
      mouseY < 140 * unit + 35 * i * unit
    ) {
      if (i == 0 && tool == undefined) {
        tool = scissor;
        click.play();
      } else if (i == 1 && tool == undefined) {
        tool = water;
        click.play();
      } else {
        tool = undefined;
      }
    }
  }
}

```

Lastly we added a ```mouseRelesed``` function that leaves the plant in the position where the mouse was released. In the function, we added the soil’s dimensions and followed it with an if statement that checks if the plant is released on the soil, else if the plants are not released on the soil, they disappear. We use ```plants.pop()``` to make them disappear. 

```
function mouseReleased() {
  once = false;
  // if statement variables for soil location
  let x = width / 2;
  let y = 140 * unit;
  let w = width - 40 * unit;
  let h = 60 * unit;

  if (plants.length > 0) {
    if (
      // checks if flower is in soil
      plants[plants.length - 1].x > x - w / 2 &&
      plants[plants.length - 1].x < x + w / 2 &&
      plants[plants.length - 1].y > 100 * unit &&
      plants[plants.length - 1].y < 145 * unit
    ) {
      // post the plants array again on mouseReleased

      let jsonData = JSON.stringify(plants);

      fetch("/plantdata", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: jsonData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      // if plants are not on the soil, they disappear and a swoosh sound plays
      plants.pop();
      swoosh.play();
    }
  }
}
```

### Toomie could you explain the sound code here or anywhere u think is suitable

### MonogoDB

## Challenges
One of the main challenges we faced while working on this project was getting the p5 interactions to run smoothly. We first began developing our p5 interactions by creating a class object for the plant. We struggled with writing the code and found ourselves not knowing what to do or how to add more elements to our interaction. We decided to start over in our p5 code and try rewriting it in a way that would make more sense to use. We researched and looked for ways how we can execute our ideas and decided that we were going to create an object when the mouse is pressed. And from there we began building it that way. 

Another challenge we had was working with MongoDB and figuring out how to save our plants array onto the DB, and also sending the array information every time a change is made, such as 
when a user waters a plant and the sprite changes, or if a plant is deleted. Our issue was that the array was only getting posted whenever a new plant was added to it.
So, what we needed to do was post the array again on mouse released, so the position and sprite information was updated in the DB. 

Another issue we had with MongoDB was that our plant object had the image stored in it, but MongoDB does not store images so we had to change the way we store 
the image in the object. We instead used an ```imgIndex``` which stores the number of the sprite image as shown below. Previously we were storing the array that contained the sprites in the object and that is what created the issues. But was resolved when we called the array in the image function instead of the object.

```
        let plant = {
          x: mouseX,
          y: mouseY,
          imgIndex: 0,
          g: 0,
          t: i,
          username: username,
        };
        
            
        image(flowers[plants[i].t][plants[i].imgIndex], plants[i].x, plants[i].y, 30 * unit, 30 * unit);
```

## Next Steps
A few things we would have liked to add to this project are:

### Making the garden changes show in real time

### An option of not having everyone access your plant
The ability for all users to water and delete any other user's plant is intentional as our concept was creating a public campus garden. However, we like for the next steps we can add an option of having users choose if they want to have others access their plants.

### Adding more types and colors of plants
Right now we only have 4 different colored roses in the menu, but we would have liked to give the user different flower options such as lillies or tulips for example.

### Create a day and night cycle
In our initial plan, the plant growth would have been controlled by a day-night cycle rather than a user-controlled watering can, but we scrapped that idea because we felt that making it user-controlled would be more interactive. Nevertheless, we still think a day-night cycle would be a fun addition to this project, not necessarily to control plant growth but just to make the experience more engaging.

### Add a mute button to mute the background music



## User Testing
body


## Contributions

### Fatema:
This project has definitely helped me learn and practice the process of using databases to store and get information. Although I have had experience with using databases throughout the semester, this project seemed to push me further in understanding its technicalities. Similarly, using p5.js wasn't new to me however along with p5.play it was a process that challenged me to push myself. Looking back at it now it was definitely rewarding to see myself be more familiar and confident with front and back end programming. Another aspect of this project I really enjoyed and learned from was user testing with my classmates. The feedback Toomie and I received definitely helped us view our idea from a different perspective which has really enhanced the outcome of our project. Toomie and I contributed together with almost every aspect of the project, we met in person and through zoom to work together. This collaboration has been great and were both able to greatly learn from each other. 

### Toomie:
Working on this project was definitely a learning experience for both of us. Although we are using p5 again it was much more challenging to work on since the p5 interactions were the main focus of our project, so working on perfecting that took up a lot of our time. It was quite fun for me to draw and color our plants for this project, and I would love to make more plant sprites to add to it! Finding the right music and sound effects was also very fun for me, I  Just like with the previous project, Fatema and I often worked together while coding, whether it was on zoom or in-person. Whenever we worked separately we would always send updated versions of the code to each other and tried to help each other whenever we were stuck with something. We found that working together most of the time was the most effective way for us to make progress

## References
* [Instructions Popup](https://www.youtube.com/watch?v=MBaw_6cPmAw)

* [P5.play Reference](https://p5play.org/learn/sprite.html)

* [P5.js Reference](https://p5js.org/reference/#/p5/splice)

* [Watering Example](https://editor.p5js.org/IreneLi/sketches/RPWvpx9C-)

* [MonogoDB Video Tutorials](https://drive.google.com/drive/u/0/folders/1SjT74zERf3GEkOQXjR11czko8Rz3o7nz)

* [QuickMongo Documentation](https://www.npmjs.com/package/quickmongo)

* [Background Music: K.K. Stroll](https://www.youtube.com/watch?v=8NQNFkwXH-Q)

* [Google Fonts](https://fonts.google.com/)

* [MongoDB Class Example](https://github.com/MathuraMG/ConnectionsLab-NYUAD/tree/master/Week_12%7Cp5LiveMedia_MongoDB/12.2-Coffee_Tracker_Mongo)

