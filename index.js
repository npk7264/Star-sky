const backgroundColor = "#030318";
const width = window.innerWidth;
const height = window.innerHeight;
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

const maxStarRadius = 1.5;

function createStars(width, height, spacing) {
  const stars = [];

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      const star = {
        x: x + randomInt(spacing),
        y: y + randomInt(spacing),
        r: Math.random() * maxStarRadius,
      };
      stars.push(star);
    }
  }
  return stars;
}
const stars = createStars(width, height, 30);

let counter = 0;

function fillCircle(ctx, x, y, r, fillStyle) {
  ctx.beginPath();
  ctx.fillStyle = fillStyle;
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

const minStarOpacity = 0.3;
const maxStarOpacity = 0.7;

function getOpacity(factor) {
  const opacityIncrement =
    (maxStarOpacity - minStarOpacity) * Math.abs(Math.sin(factor));
  const opacity = minStarOpacity + opacityIncrement;
  return opacity;
}

function render() {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  stars.forEach(function (star, i) {
    const factor = counter * i;
    const x = star.x;
    const y = star.y;
    const opacity = getOpacity(factor);
    fillCircle(ctx, x, y, star.r, `rgba(255, 255, 255, ${opacity}`);
  });

  counter++;
  requestAnimationFrame(render);

  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Ngủ ngon nha", width / 2, height / 2);
}

render();
