const gridSizeSelect = document.getElementById("gridSize");
const colorModeSelect = document.getElementById("colorMode");
const generateBtn = document.getElementById("generateBtn");
const colorGrid = document.getElementById("colorGrid");

// Generate Random color
function generateRandomColor() {
  const hexArr = "0123456789ABCDEF";
  let color = "#";
  for (let i = 1; i <= 6; i++) {
    color += hexArr[Math.floor(Math.random() * hexArr.length)];
  }
  return color;
}

// Generate pastel color
function generatePastelColor() {
  const hue = Math.floor(Math.random() * 360); // Random hue (0-359)
  return `hsl(${hue}, 70%, 80%)`;
}

// Generate dark color
function generateDarkColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 30%)`;
}

// Generate vibrant color
function generateVibrantColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 50%)`;
}

// return the function reference
function getColorFunction(colorType) {
  switch (colorType) {
    case "pastel":
      return generatePastelColor;
    case "dark":
      return generateDarkColor;
    case "vibrant":
      return generateVibrantColor;
    default:
      return generateRandomColor;
  }
}

function setGridColor() {
  const [col, row] = gridSizeSelect.value.split("x");
  colorGrid.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
  createGridChild(col, row);

  const colorBoxes = colorGrid.querySelectorAll(".color-cell");
  const colorFunction = getColorFunction(colorModeSelect.value);

  colorBoxes.forEach((colorBox) => {
    colorBox.style.backgroundColor = colorFunction();
  });
}

function createGridChild(col, row) {
  let dynamicDivs = "";
  for (let i = 1; i <= col * row; i++) {
    dynamicDivs += "<div class='color-cell'></div>";
  }
  colorGrid.innerHTML = dynamicDivs;
}

setGridColor();
generateBtn.addEventListener("click", setGridColor);

//Copy the color code to the clipboaed
colorGrid.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const bgColor = clickedElement.style.backgroundColor;
  navigator.clipboard.writeText(bgColor);
  clickedElement.classList.add("isClicked");
  setTimeout(() => {
    clickedElement.classList.remove("isClicked");
  }, 800);
});
