let username;

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

let shapeX, shapeY, rectX;
let circleBigger = true;
let rectsize;
let flowerimg;
let flowers = [];
let plants = [];
let once = false;
let scissor, water;
let tool;
let unit;
let swoosh, bgmusic, waterdrop, planting, click, cut;

function preload() {
  //preload images & sounds:
  myFont = loadFont("assets/Neucha-Regular.ttf");
  scissor = loadImage("assets/scissors.png");
  water = loadImage("assets/water can.png");
  flowerimg = loadImage("assets/flower2.png");
  fenceimg = loadImage("assets/fence2.png");
  skyimg = loadImage("assets/sky.png");

  swoosh = loadSound("assets/swoosh.wav");
  click = loadSound("assets/click.mp3");
  waterdrop = loadSound("assets/drop.mp3");
  cut = loadSound("assets/cut.mp3");
  bgmusic = loadSound("assets/music.mp3");

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
}

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

  fetch("/getplants")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      plants = data.data;
    });
}

function draw() {
  background(230, 247, 255);

  fill(184, 224, 189);
  rect(width / 2, 185 * unit, width, 200 * unit);

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

//displays the name of the user
function showName(x, y, name) {
  textAlign(CENTER);
  text(name, x + 30, y + 20);
}

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

//leaves the plant in the position where the mouse was released
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

// bg music function, starts playing when user clicks canvas
function music() {
  bgmusic.play();
  bgmusic.loop();
  bgmusic.setVolume(0.1);
  userStartAudio();
}
