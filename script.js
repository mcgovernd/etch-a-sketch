// global flag for grid color type
// alterable through defaultGrid()/rgbGrid()/darkenGrid()
var typeFlag = "default";

// get root container
const container = document.querySelector('#container');

// buttons event listeners
const generate_button = document.getElementById('generate-button');
const default_button = document.getElementById('default-style');
const rgb_button = document.getElementById('rgb-style');
const darken_button = document.getElementById('darken-style');

generate_button.addEventListener('click', clearGrid);
default_button.addEventListener('click', defaultGrid);
rgb_button.addEventListener('click', rgbGrid);
darken_button.addEventListener('click', darkenGrid);

/* ----- functions ----- */
function createGrid() {
    let xy = generateXY(); // prompt and validate grid size input
    let rows = xy;
    let cols = xy;

    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (i = 0; i < (rows * cols); i++) {
        let cell = document.createElement("div");
        cell.addEventListener('mouseover', function(e) {
            if (typeFlag === "default") {
                e.target.style.backgroundColor = "black";
                e.target.style.opacity = 1;
            } else if (typeFlag === "rgb") {
                e.target.style.backgroundColor = generateColor();
            } else if (typeFlag === "darken") {
                hoverDarken(e);
            }
        })
        container.appendChild(cell).className = "grid-item";
    }
}

// darken opacity by 10% on hover & ignore fully black squares
function hoverDarken(e) {
    if (e.target.className == "grid-item") {
      if (e.target.style.opacity < 1 && e.target.style.backgroundColor != "black") {
        e.target.style.backgroundColor = "black";
        e.target.style.opacity = (parseFloat(e.target.style.opacity) || 0) + 0.1;
      } else if (e.target.style.opacity == 1 & e.target.style.backgroundColor != "black") {
        e.target.style.backgroundColor = "black";
        e.target.style.opacity = 0.1;
      } else if (e.target.style.opacity < 1 && e.target.style.backgroundColor == "black") {
        e.target.style.opacity = (parseFloat(e.target.style.opacity) || 0) + 0.1;
      } else if (e.target.style.opacity == 1 && e.target.style.backgroundColor == "black") {
        return;
      }
    }
  }

function defaultGrid() {
    typeFlag = "default";
}

function rgbGrid() {
    typeFlag = "rgb";
}

function darkenGrid() {
    typeFlag = "darken";
}

// generate random RGB color
function generateColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

// remove all children of etch-a-sketch #container
function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    createGrid(); // prompt for new grid size
}

// validate number prompt
function generateXY() {
    let xy;

    // generate rows/columns
    do {
        xy = prompt("How many rows X columns do you want? (between 1-64)");
    } while (xy == null || xy == "" || xy == 0 || xy < 0 || xy > 64 || isNaN(xy));

    // return XY pair
    return parseInt(xy); // convert to int
}
/* ----- end functions ----- */