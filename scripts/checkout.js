export const checkoutEffect = () => {
  const audio = new Audio("checkout.mp3");

  const latency = 0.044;
  const peaks = [0.542, 0.707, 1.009, 1.312, 1.457, 1.761, 2.192];
  const lastPeakIndex = peaks.length - 1;
  const triggered = new Array(peaks.length).fill(false);

  const rainbowColors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#8F00FF",
  ];

  let usedCards = [];
  let usedColors = [];

  function getFirst8Cards() {
    return Array.from(document.querySelectorAll(".card")).slice(0, 8);
  }

  function uniqueFlashFirst8() {
    const cards = getFirst8Cards();
    if (!cards.length) return;

    let availableCards = cards.filter((c) => !usedCards.includes(c));
    let availableColors = rainbowColors.filter((c) => !usedColors.includes(c));

    if (!availableCards.length) {
      usedCards = [];
      availableCards = cards;
    }
    if (!availableColors.length) {
      usedColors = [];
      availableColors = rainbowColors;
    }

    const card =
      availableCards[Math.floor(Math.random() * availableCards.length)];
    const color =
      availableColors[Math.floor(Math.random() * availableColors.length)];

    card.style.backgroundColor = color;

    usedCards.push(card);
    usedColors.push(color);
  }

  function showTrollface() {
    const overlay = document.createElement("div");
    overlay.id = "trollface-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0,0,0,0.3)";
    overlay.style.zIndex = "9999";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";

    const img = document.createElement("img");
    img.src = "https://media.tenor.com/6Ci9-nrJLwkAAAAm/trollface-spin.webp";
    img.style.maxWidth = "40%";
    img.style.maxHeight = "40%";
    img.style.pointerEvents = "none";

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    return overlay;
  }

  audio.addEventListener("canplaythrough", () => {
    const checkInterval = setInterval(() => {
      const currentTime = audio.currentTime;

      peaks.forEach((peakTime, i) => {
        if (!triggered[i] && currentTime >= peakTime - latency) {
          triggered[i] = true;

          if (i === lastPeakIndex) {
            const overlay = showTrollface();

            const animInterval = setInterval(() => {
              document.querySelectorAll(".card").forEach((card) => {
                const color =
                  rainbowColors[
                    Math.floor(Math.random() * rainbowColors.length)
                  ];
                card.style.backgroundColor = color;
              });
            }, 500);

            setTimeout(() => {
              alert("Sorry. It was just too good to be true.");

              clearInterval(animInterval);
              document
                .querySelectorAll(".card")
                .forEach((card) => (card.style.backgroundColor = "white"));
              if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 50);
          } else {
            uniqueFlashFirst8();
          }
        }
      });

      if (triggered.every((t) => t)) clearInterval(checkInterval);
    }, 20);
  });

  audio.play().catch((error) => console.error("Audio playback failed:", error));
};
