// Questions + field types. type: "options" for multiple choice, "input" for free input
const questions = [
  {
    id: "gender",
    type: "options",
    text: "Which best describes you?",
    help: "This will allow your AI coach to design the most effective training program for you.",
    options: [
      { value: "female", label: "Female", icon: "♀️" },
      { value: "male", label: "Male", icon: "♂️" },
      { value: "nonbinary", label: "Non-binary", icon: "⚧️" }
    ]
  },
  {
    id: "training",
    type: "options",
    text: "How would you like to train?",
    help: "Pick your preferred equipment or style.",
    options: [
      { value: "bodyweight", label: "Bodyweight" },
      { value: "dumbbells", label: "Dumbbells" },
      { value: "bands", label: "Resistance bands" },
      { value: "gym", label: "Gym / Machines" }
    ]
  },
  {
    id: "goal",
    type: "options",
    text: "What is your main goal?",
    help: "Choose the goal you care most about right now.",
    options: [
      { value: "strength", label: "Build strength" },
      { value: "lose-fat", label: "Lose fat" },
      { value: "fitness", label: "Stay fit & healthy" },
      { value: "muscle", label: "Gain muscle" }
    ]
  },
  {
    id: "height",
    type: "input",
    text: "What is your height?",
    help: "Enter your height in feet (ft)."
  },
  {
    id: "weight",
    type: "input",
    text: "What is your weight?",
    help: "Enter your weight in kg or lbs (toggle)."
  },
  {
    id: "age",
    type: "input",
    text: "What is your age?",
    help: "Enter your age in years (must be at least 18)."
  },
  {
    id: "level",
    type: "options",
    text: "What is your current fitness level?",
    help: "Helps us set intensity correctly.",
    options: [
      { value: "beginner", label: "Beginner" },
      { value: "intermediate", label: "Intermediate" },
      { value: "advanced", label: "Advanced" }
    ]
  }
];

let idx = 0;
const answers = {}; // will store answers by id

// DOM refs
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const stepNum = document.getElementById("stepNum");
const totalNum = document.getElementById("totalNum");
const barFill = document.getElementById("barFill");
const qText = document.getElementById("questionText");
const helpText = document.getElementById("helpText");
const optionsEl = document.getElementById("options");

totalNum.textContent = String(questions.length);

// Helpers
function lbsToKg(lbs) {
  return +(Number(lbs) * 0.45359237).toFixed(1);
}

// Render a step (options or input)
function render() {
  const q = questions[idx];
  qText.textContent = q.text;
  helpText.textContent = q.help;
  optionsEl.innerHTML = "";

  // Options type
  if (q.type === "options") {
    q.options.forEach(opt => {
      const el = document.createElement("div");
      el.className = "option";
      el.tabIndex = 0;
      el.innerHTML = `<div class="icon">${opt.icon || ""}</div><div class="label">${opt.label}</div>`;
      if (answers[q.id] === opt.value) el.classList.add("selected");

      el.addEventListener("click", () => {
        answers[q.id] = opt.value;
        document.querySelectorAll(".option").forEach(x => x.classList.remove("selected"));
        el.classList.add("selected");
        nextBtn.disabled = false;
      });
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.click(); }
      });
      optionsEl.appendChild(el);
    });

    nextBtn.disabled = !answers[q.id];
  }

  // Input type
  if (q.type === "input") {
    if (q.id === "height") {
      // ft only
      const cont = document.createElement("div");
      cont.className = "input-row";
      cont.innerHTML = `
        <input id="heightFt" class="input-field" placeholder="ft" type="number" min="4" max="8" step="0.1" />
      `;
      optionsEl.appendChild(cont);

      const ftInput = cont.querySelector("#heightFt");

      if (answers.heightFt) {
        ftInput.value = answers.heightFt;
        nextBtn.disabled = false;
      }

      ftInput.addEventListener("input", () => {
        const val = parseFloat(ftInput.value);
        if (val && val >= 4 && val <= 8) {
          answers.heightFt = val;
          nextBtn.disabled = false;
        } else {
          nextBtn.disabled = true;
        }
      });
    }

    if (q.id === "weight") {
      const cont = document.createElement("div");
      cont.className = "input-row";
      cont.innerHTML = `
        <select id="weightUnit" class="input-field">
          <option value="kg">kg</option>
          <option value="lbs">lbs</option>
        </select>
        <input id="weightVal" class="input-field" placeholder="weight" type="number" min="30" max="300" />
      `;
      optionsEl.appendChild(cont);

      const unitSel = cont.querySelector("#weightUnit");
      const wInput = cont.querySelector("#weightVal");

      if (answers.weightUnit) unitSel.value = answers.weightUnit;
      if (answers.weightVal) { wInput.value = answers.weightVal; nextBtn.disabled = false; }

      unitSel.addEventListener("change", () => {
        answers.weightUnit = unitSel.value;
      });

      wInput.addEventListener("input", () => {
        const val = parseFloat(wInput.value);
        if (val && val >= 30 && val <= 300) {
          answers.weightVal = val;
          answers.weightUnit = unitSel.value;
          nextBtn.disabled = false;
        } else {
          nextBtn.disabled = true;
        }
      });
    }

    if (q.id === "age") {
      const cont = document.createElement("div");
      cont.className = "input-row";
      cont.innerHTML = `<input id="ageVal" class="input-field" placeholder="age in years" type="number" min="18" max="100" />`;
      optionsEl.appendChild(cont);

      const aInput = cont.querySelector("#ageVal");
      if (answers.age) { aInput.value = answers.age; nextBtn.disabled = false; }

      aInput.addEventListener("input", () => {
        const val = parseInt(aInput.value, 10);
        if (val && val >= 18 && val <= 100) {
          answers.age = val;
          nextBtn.disabled = false;
        } else {
          nextBtn.disabled = true;
        }
      });
    }
  }

  // update UI controls
  stepNum.textContent = String(idx + 1);
  backBtn.disabled = idx === 0;
  nextBtn.textContent = idx === questions.length - 1 ? "Finish →" : "Next →";

  const pct = Math.round(((idx) / questions.length) * 100);
  barFill.style.width = pct + "%";
}

// Next button behaviour
nextBtn.addEventListener("click", () => {
  const q = questions[idx];
  if (!answers[q.id] && q.type === "options") return;
  if (q.type === "input") {
    if (q.id === "height" && !answers.heightFt) return;
    if (q.id === "weight" && !answers.weightVal) return;
    if (q.id === "age" && !answers.age) return;
  }

  if (idx < questions.length - 1) {
    idx++; render();
  } else {
    showSummary();
  }
});

backBtn.addEventListener("click", () => {
  if (idx > 0) {
    idx--; render();
  }
});

// Create summary + comparison bars and CTA
function showSummary() {
  qText.textContent = "All set — here’s your summary";
  helpText.textContent = "Review your answers and choose to Train with FitUs.";
  optionsEl.innerHTML = "";

  // normalize height (ft only now)
  let heightFt = null;
  if (answers.heightFt) heightFt = Number(answers.heightFt);

  // normalize weight
  let weightKg = null;
  if (answers.weightUnit === "kg") weightKg = Number(answers.weightVal);
  if (answers.weightUnit === "lbs") weightKg = lbsToKg(Number(answers.weightVal));

  // small heuristic
  const levelScore = (answers.level === "beginner" ? 1 : answers.level === "intermediate" ? 2 : 3);
  const withoutFitUs = Math.min(60, 20 + levelScore * 6 + (answers.age ? Math.max(0, (50 - Math.min(50, Number(answers.age))) / 10) * 3 : 0));
  const withFitUs = Math.min(98, withoutFitUs + 50 + (answers.training === "gym" ? 5 : 0));

  // summary
  const summaryWrap = document.createElement("div");
  summaryWrap.className = "summary";

  function addRow(label, value) {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `<div class="q">${label}</div><div class="a">${value}</div>`;
    summaryWrap.appendChild(row);
  }

  addRow("Gender", (answers.gender || "-"));
  addRow("Training preference", (answers.training || "-"));
  addRow("Main goal", (answers.goal || "-"));
  addRow("Height", heightFt ? `${heightFt} ft` : "-");
  addRow("Weight", weightKg ? `${weightKg} kg` : (answers.weightVal ? `${answers.weightVal} ${answers.weightUnit || ""}` : "-"));
  addRow("Age", answers.age || "-");
  addRow("Level", answers.level || "-");

  // comparison visual
  const compareWrap = document.createElement("div");
  compareWrap.style.marginTop = "12px";
  compareWrap.innerHTML = `
    <div class="pair small" style="justify-content:space-between;margin-bottom:15px">
      <div>Expected progress</div>
      <div style="min-width:120px;text-align:right">${Math.round(withFitUs)}% potential</div>
    </div>
    <div class="bar-compare" aria-hidden="true">
      <div style="display:flex;gap:8px;align-items:center">
        <div style="width:38%;font-size:15px;color:var(--muted)">Without FitUs</div>
        <div style="flex:1"><div class="pbar-muted" id="barWithout" style="width:0"></div></div>
        <div style="min-width:44px;text-align:right">${Math.round(withoutFitUs)}%</div>
      </div>
      <div style="height:10px"></div>
      <div style="display:flex;gap:8px;align-items:center;margin-top:6px">
        <div style="width:38%;font-size:13px;color:var(--muted)">With FitUs</div>
        <div style="flex:1"><div class="pbar" id="barWith" style="width:0"></div></div>
        <div style="min-width:44px;text-align:right">${Math.round(withFitUs)}%</div>
      </div>
    </div>
  `;

// CTA link to get page
    const ctaWrap = document.createElement("div");
    ctaWrap.style.marginTop = "14px";

    // Ensure absolute URL
    let absoluteUrl = getUrl;
    if (!absoluteUrl.startsWith("/")) {
      absoluteUrl = "/" + absoluteUrl;
    }

    ctaWrap.innerHTML = `<a class="cta-link" href="${absoluteUrl}">Train with FitUs →</a>`;

    // Append everything in the right order
    optionsEl.appendChild(summaryWrap);
    optionsEl.appendChild(compareWrap);
    optionsEl.appendChild(ctaWrap);

  // Hide nav buttons and animate bars
  backBtn.style.display = "none";
  nextBtn.style.display = "none";

  setTimeout(() => {
    const wWithout = Math.max(2, Math.round(withoutFitUs));
    const wWith = Math.max(2, Math.round(withFitUs));
    const barWithout = document.getElementById("barWithout");
    const barWith = document.getElementById("barWith");
    if (barWithout) barWithout.style.width = wWithout + "%";
    if (barWith) barWith.style.width = wWith + "%";
    barFill.style.width = "100%";
  }, 60);
}

// initial render
render();
