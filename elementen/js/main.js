// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  // Panels
  const panelNameInput = document.getElementById("panel-name-input");
  const panelGameOptions = document.getElementById("panel-game-options");

  // Title & Subtitle
  const pageTitle = document.getElementById("pageTitle");
  const pageSubtitle = document.getElementById("pageSubtitle");

  // Inputs & Buttons
  const playerNameInput = document.getElementById("playerName");
  const submitNameBtn = document.getElementById("submitNameBtn");
  const backToNameBtn = document.getElementById("backToNameBtn");

  // Notification
  const notification = document.getElementById("notification");

  // Game option cards
  const optionElementen = document.getElementById("optionElementen");
  const optionMetalen = document.getElementById("optionMetalen");
  // NEW: Third game option
  const optionAtomen = document.getElementById("optionAtomen");

  // Typed text container
  const welcomeText = document.getElementById("welcomeText");

  // We measure the parent container for correct max width
  const selectionContainer = document.querySelector(".game-selection-container");

  // Only letters a-z, up to 12 chars
  const namePattern = /^[A-Za-z]{1,12}$/;

  function showNotification(msg) {
    notification.textContent = msg;
    notification.classList.remove("hidden");
    void notification.offsetWidth;
    setTimeout(() => {
      notification.classList.add("hidden");
    }, 2500);
  }

  // Enforce letter-only
  playerNameInput.addEventListener("input", (e) => {
    const currentVal = e.target.value;
    if (/[^A-Za-z]/.test(currentVal)) {
      showNotification("Alleen letters (a-z) toegestaan!");
      e.target.value = currentVal.replace(/[^A-Za-z]/g, "");
    }
  });

  // Submit with Enter
  playerNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      submitName();
    }
  });
  // Submit on button
  submitNameBtn.addEventListener("click", submitName);

  function submitName() {
    const nameValue = playerNameInput.value.trim();
    if (!namePattern.test(nameValue)) {
      showNotification("Voer een geldige naam in (1-12 letters).");
      return;
    }

    // Store the user name for all games
    localStorage.setItem("playerName", nameValue);

    // Animate fade-out for main title/subtitle
    pageTitle.classList.add("fade-out-up");
    pageSubtitle.classList.add("fade-out-up");

    // Hide name panel
    panelNameInput.classList.remove("active");
    panelNameInput.classList.add("hidden");

    setTimeout(() => {
      pageTitle.style.display = "none";
      pageSubtitle.style.display = "none";

      const finalText = `Welcome, ${nameValue}`;

      // Dynamically measure & scale the welcome text
      const containerMaxWidth = Math.floor(selectionContainer.offsetWidth * 0.91);
      const measureSpan = document.createElement("span");
      measureSpan.style.visibility = "hidden";
      measureSpan.style.position = "absolute";
      measureSpan.style.whiteSpace = "nowrap";
      measureSpan.style.fontFamily = "Orbitron, sans-serif";
      measureSpan.style.fontSize = "1.8rem";
      measureSpan.textContent = finalText;
      document.body.appendChild(measureSpan);

      let measuredWidth = measureSpan.offsetWidth;
      let baseFontSize = 1.8;
      if (measuredWidth > containerMaxWidth) {
        const scaleFactor = containerMaxWidth / measuredWidth;
        baseFontSize *= scaleFactor;
        measureSpan.style.fontSize = baseFontSize + "rem";
        measuredWidth = measureSpan.offsetWidth;
      }
      if (measuredWidth > containerMaxWidth) {
        measuredWidth = containerMaxWidth;
      }

      optionElementen.style.width = measuredWidth + "px";
      optionMetalen.style.width = measuredWidth + "px";
      // Also fix the third game card's width
      optionAtomen.style.width = measuredWidth + "px";

      welcomeText.style.fontSize = baseFontSize + "rem";

      document.body.removeChild(measureSpan);

      panelGameOptions.classList.remove("hidden");
      panelGameOptions.classList.add("active");

      startTypingEffect(finalText, welcomeText, 60);
    }, 600);
  }

  // Back button
  backToNameBtn.addEventListener("click", () => {
    panelGameOptions.classList.remove("active");
    panelGameOptions.classList.add("hidden");

    pageTitle.style.display = "";
    pageSubtitle.style.display = "";
    pageTitle.classList.remove("fade-out-up");
    pageSubtitle.classList.remove("fade-out-up");

    pageTitle.style.opacity = 0;
    pageTitle.style.transform = "translateY(-30px)";
    pageSubtitle.style.opacity = 0;
    void pageTitle.offsetWidth;

    pageTitle.classList.add("fadeDownAnim");
    pageSubtitle.classList.add("fadeInAnim");

    welcomeText.textContent = "";
    welcomeText.style.fontSize = "1.8rem";
    optionElementen.style.width = "auto";
    optionMetalen.style.width = "auto";
    optionAtomen.style.width = "auto";

    setTimeout(() => {
      panelNameInput.classList.remove("hidden");
      panelNameInput.classList.add("active");
    }, 400);
  });

  // Additional style for returning Title/Subtitle
  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    @keyframes fadeDownAgain {
      0% { opacity: 0; transform: translateY(-30px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .fadeDownAnim {
      animation: fadeDownAgain 0.7s forwards;
    }
    @keyframes fadeInAgain {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    .fadeInAnim {
      animation: fadeInAgain 1s forwards 0.4s;
    }
  `;
  document.head.appendChild(styleTag);

  function startTypingEffect(text, element, speed) {
    element.textContent = "";
    let index = 0;
    const interval = setInterval(() => {
      element.textContent = text.substring(0, index + 1);
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);
  }

  // =========== GAME OPTION CLICKS ===========
  optionElementen.addEventListener("click", () => {
    window.location.href = "leer-elementen.html";
  });

  optionMetalen.addEventListener("click", () => {
    window.location.href = "leer-metalen.html";
  });

  // NEW: link to the "Leer de Atomen" page
  optionAtomen.addEventListener("click", () => {
    window.location.href = "leer-atomen.html";
  });
});
