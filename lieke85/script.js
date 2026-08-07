/* ==========================================================
   Lieke — 85 jaar
   ----------------------------------------------------------
   EVERYTHING YOU MIGHT WANT TO EDIT IS AT THE TOP:
   1. ERAS      → the decade markers between photos
   2. CAPTIONS  → one line of text per photo (1 t/m 36)
   ========================================================== */

const TOTAL_PHOTOS = 37;
const IMAGE_FOLDER = "images/";

/* 1 ─ ERA MARKERS
   "before" = the photo number this marker appears in front of.
   Change labels, years and subtitles freely, or add/remove eras. */
const ERAS = [
  { before: 1,  label: "1941 · Ut begin",       sub: "Boe ut allemaol begos…" },
  { before: 2,  label: "Jaore '60",             sub: "Allemaol leefde." },
  { before: 7,  label: "Jaore '70 en '80",      sub: "Die femilie weurt groeter en groeter." },
  { before: 12, label: "Jaore '90",             sub: "Geneete, geneete en nog ins geneete!" },
  { before: 18, label: "Ut jaor 1997",          sub: "En toen: dien favoriete kleinkeend!" },
  { before: 22, label: "Jaore 2000",            sub: "Wat un kleinkinder allemaol.." },
  { before: 27, label: "Jaore 2010",            sub: "Tied veur pensioen en avontuur!" },
  { before: 30, label: "Jaore 2020",            sub: "Bewoge, meh aoch sjieke jaore." },
  { before: 33, label: "Noe",                   sub: "En nog steeds zoe leuk wie altied!" },
];

/* 2 ─ CAPTIONS
   One caption per photo. Leave "" to show a subtle placeholder. */
const CAPTIONS = Array.from({ length: TOTAL_PHOTOS }, () => "");
/* Examples:
CAPTIONS[0]  = "Lieke als klein meisje, 1943.";
CAPTIONS[17] = "De trouwdag.";
*/
    CAPTIONS[0] = "Miss Maastricht!";
    CAPTIONS[1] = "Op zeuk naor unne leuke vent..";
    CAPTIONS[2] = "Gevoonde! De leukste hippies vaan Mestreech.";
    CAPTIONS[3] = "Die hippies kinne ziech aoch sjiek aonkleije!";
    CAPTIONS[4] = "En toen kwam opins eine debeij!";
    CAPTIONS[5] = "Super serieus..";
    CAPTIONS[6] = "Ondertusse kaom dr aoch nog un meitske beij.";
    CAPTIONS[7] = "Flanere op ut strand.";
    CAPTIONS[8] = "Oma en kleindochter.";
    CAPTIONS[9] = "Dit is pas flanere!";
    CAPTIONS[10] = "Bring back de äög-sjaduw!";
    CAPTIONS[11] = "Ut fashion icoon vaan de femilie.";
    CAPTIONS[12] = "Un gleeske huurt debeij netuurlik!";
    CAPTIONS[13] = "De keuning en keuningin vaan de Abstraot.";
    CAPTIONS[14] = "Un iconische woenkamer.";
    CAPTIONS[15] = "Kookkunste laote zien.";
    CAPTIONS[16] = "Ut waor eedere keers weer geneete.";
    CAPTIONS[17] = "Veer generaties beij-ein.";
    CAPTIONS[18] = "Liere fietse in de Abtstraot.";
    CAPTIONS[19] = "Didier mot weer ins gewasse weure.";
    CAPTIONS[20] = "Same met Didier en Woef.";
    CAPTIONS[21] = "En nog zoe eine debeij!";
    CAPTIONS[22] = "De ierste kleindochter. ";
    CAPTIONS[23] = "Keuningin in de keuke.";
    CAPTIONS[24] = "Saame geneete.";
    CAPTIONS[25] = "De vrowluij vaan Smeets.";
    CAPTIONS[26] = "De leukste lach.";
    CAPTIONS[27] = "Un terreske bleif altied geneete.";
    CAPTIONS[28] = "Nog altied fit en op avontuur!";
    CAPTIONS[29] = "Veur altied met Guus. &hearts;";
    CAPTIONS[30] = "Vaan terreske naor terreske.";
    CAPTIONS[31] = "Wat un leuke foto.";
    CAPTIONS[32] = "85? Dat zow niemand zegke!";
    CAPTIONS[33] = "Blomme veur de leefste oma.";
    CAPTIONS[34] = "Wat un pleetsje.";
    CAPTIONS[35] = "Eve lekkere puzzele.";
    CAPTIONS[36] = "Dikke poene vaan us. &hearts;";

/* Extensions to try, in order (mixed .jpg / .jpeg / .heic folders). */
const EXTENSIONS = ["jpg", "jpeg", "heic", "JPG", "JPEG", "HEIC", "png"];

/* ==========================================================
   Build the timeline
   ========================================================== */
const entries = document.getElementById("entries");

function makeEra({ label, sub }) {
  const el = document.createElement("div");
  el.className = "era reveal";
  el.innerHTML = `
    <div class="era-dot"></div>
    <div class="era-card">
      <span class="era-label">${label}</span>
      <p class="era-sub">${sub}</p>
    </div>`;
  el.dataset.era = label;
  return el;
}

function makeMoment(n) {
  const el = document.createElement("figure");
  el.className = "moment reveal";

  const num = String(n).padStart(4, "0");
  const caption = CAPTIONS[n - 1] || "";

  el.innerHTML = `
    <div class="pin"></div>
    <div class="photo-frame">
      <img loading="lazy" alt="Foto ${n} van Lieke" />
      <figcaption class="caption">
        <div class="caption-num">${num.slice(-2)} / ${TOTAL_PHOTOS}</div>
        <div class="caption-text ${caption ? "" : "placeholder"}">
          ${caption || "Hier komt jullie herinnering…"}
        </div>
      </figcaption>
    </div>`;

  // Try each extension until one loads.
  const img = el.querySelector("img");
  let attempt = 0;
  img.onerror = () => {
    attempt++;
    if (attempt < EXTENSIONS.length) {
      img.src = `${IMAGE_FOLDER}${num}.${EXTENSIONS[attempt]}`;
    } else {
      const missing = document.createElement("div");
      missing.className = "photo-missing";
      missing.textContent = `Foto ${num} niet gevonden — controleer bestandsnaam of formaat`;
      img.replaceWith(missing);
    }
  };
  img.src = `${IMAGE_FOLDER}${num}.${EXTENSIONS[0]}`;

  return el;
}

for (let n = 1; n <= TOTAL_PHOTOS; n++) {
  const era = ERAS.find((e) => e.before === n);
  if (era) entries.appendChild(makeEra(era));
  entries.appendChild(makeMoment(n));
}

/* ==========================================================
   Reveal-on-scroll
   ========================================================== */
const revealObserver = new IntersectionObserver(
  (items) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        item.target.classList.add("visible");
        revealObserver.unobserve(item.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ==========================================================
   The golden thread fills as you travel through time
   ========================================================== */
const timeline = document.getElementById("timeline");
const threadFill = document.getElementById("threadFill");
let ticking = false;

function updateThread() {
  const rect = timeline.getBoundingClientRect();
  const viewH = window.innerHeight;
  // progress: 0 when the timeline enters, 1 when it leaves
  const total = rect.height - viewH * 0.4;
  const passed = Math.min(Math.max(viewH * 0.6 - rect.top, 0), total);
  threadFill.style.transform = `scaleY(${(passed / total).toFixed(4)})`;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateThread);
  }
}, { passive: true });
updateThread();

/* ==========================================================
   Floating era badge (top right)
   ========================================================== */
const badge = document.getElementById("eraBadge");
const badgeText = document.getElementById("eraBadgeText");

const eraObserver = new IntersectionObserver(
  (items) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        badgeText.textContent = item.target.dataset.era;
      }
    });
  },
  { rootMargin: "-20% 0px -60% 0px" }
);
document.querySelectorAll(".era").forEach((el) => eraObserver.observe(el));

// Show the badge only while inside the timeline
window.addEventListener("scroll", () => {
  const rect = timeline.getBoundingClientRect();
  const inside = rect.top < window.innerHeight * 0.4 && rect.bottom > window.innerHeight * 0.5;
  badge.classList.toggle("show", inside);
}, { passive: true });