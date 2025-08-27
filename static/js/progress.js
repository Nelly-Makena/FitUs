// Questions + field types. type: "options" for multiple choice, "input" for free input
const questions = [
  {
    id: "gender",
    type: "options",
    text: "Which best describes you?",
    help: "This helps tailor workouts and language (optional).",
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
    help: "Enter your height. Use cm, or switch to ft/in."
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
    help: "Enter your age in years."
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

// Helpers for height conversions
function ftInToCm(ft, inch) {
  const totalInches = Number(ft || 0) * 12 + Number(inch || 0);
  return Math.round(totalInches * 2.54);
}
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
        // Save value and enable Next
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

    // restore Next state if already answered
    nextBtn.disabled = !answers[q.id];
  }

  // Input type (height, weight, age)
  if (q.type === "input") {
    if (q.id === "height") {
      // height UI: choose cm or ft/in
      const cont = document.createElement("div");
      cont.className = "input-row";
      cont.innerHTML = `
        <select id="heightUnit" class="input-field">
          <option value="cm">cm</option>
          <option value="ft">ft / in</option>
        </select>
        <input id="heightCm" class="input-field" placeholder="cm" type="number" min="50" max="300" />
        <div id="ftin" style="display:none;display:flex;gap:8px;align-items:center">
          <input id="heightFt" class="input-field" placeholder="ft" type="number" min="1" max="8" />
          <input id="heightIn" class="input-field" placeholder="in" type="number" min="0" max="11" />
        </div>
      `;
      optionsEl.appendChild(cont);

      const unitSel = cont.querySelector("#heightUnit");
      const cmInput = cont.querySelector("#heightCm");
      const ftin = cont.querySelector("#ftin");
      const ftInput = cont.querySelector("#heightFt");
      const inInput = cont.querySelector("#heightIn");

      // restore previous
      if (answers.heightUnit === "ft") {
        unitSel.value = "ft";
        cmInput.style.display = "none";
        ftin.style.display = "flex";
        ftInput.value = answers.heightFt || "";
        inInput.value = answers.heightIn || "";
        nextBtn.disabled = !(answers.heightFt || answers.heightIn);
      } else if (answers.heightCm) {
        unitSel.value = "cm";
        cmInput.value = answers.heightCm;
        nextBtn.disabled = false;
      }

      unitSel.addEventListener("change", () => {
        if (unitSel.value === "ft") {
          cmInput.style.display = "none";
          ftin.style.display = "flex";
          // clear cm
          // nextBtn remains disabled until user fills
          nextBtn.disabled = true;
        } else {
          cmInput.style.display = "block";
          ftin.style.display = "none";
          nextBtn.disabled = !cmInput.value;
        }
      });

      cmInput.addEventListener("input", () => {
        if (cmInput.value) {
          answers.heightUnit = "cm";
          answers.heightCm = cmInput.value;
          delete answers.heightFt; delete answers.heightIn;
          nextBtn.disabled = false;
        } else {
          nextBtn.disabled = true;
        }
      });

      ftInput.addEventListener("input", () => {
        answers.heightUnit = "ft";
        answers.heightFt = ftInput.value;
        answers.heightIn = inInput.value || 0;
        nextBtn.disabled = !(ftInput.value || inInput.value);
      });
      inInput.addEventListener("input", () => {
        answers.heightUnit = "ft";
        answers.heightFt = ftInput.value || 0;
        answers.heightIn = inInput.value;
        nextBtn.disabled = !(ftInput.value || inInput.value);
      });
    }

    if (q.id === "weight") {
      // weight UI: select kg or lbs
      const cont = document.createElement("div");
      cont.className = "input-row";
      cont.innerHTML = `
        <select id="weightUnit" class="input-field">
          <option value="kg">kg</option>
          <option value="lbs">lbs</option>
        </select>
        <input id="weightVal" class="input-field" placeholder="weight" type="number" min="20" max="500" />
      `;
      optionsEl.appendChild(cont);

      const unitSel = cont.querySelector("#weightUnit");
      const wInput = cont.querySelector("#weightVal");

      // restore
      if (answers.weightUnit) unitSel.value = answers.weightUnit;
      if (answers.weightVal) { wInput.value = answers.weightVal; nextBtn.disabled = false; }

      unitSel.addEventListener("change", () => {
        answers.weightUnit = unitSel.value;
      });

      wInput.addEventListener("input", () => {
        if (wInput.value) {
          answers.weightVal = wInput.value;
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
      cont.innerHTML = `<input id="ageVal" class="input-field" placeholder="age in years" type="number" min="10" max="120" />`;
      optionsEl.appendChild(cont);

      const aInput = cont.querySelector("#ageVal");
      if (answers.age) { aInput.value = answers.age; nextBtn.disabled = false; }

      aInput.addEventListener("input", () => {
        answers.age = aInput.value;
        nextBtn.disabled = !aInput.value;
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
  // require answer on current step
  const q = questions[idx];
  if (!answers[q.id] && q.type === "options") return;
  if (q.type === "input") {
    // basic validation: ensure value saved (handled in UI listeners)
    if (q.id === "height" && !(answers.heightCm || answers.heightFt)) return;
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

  // normalize height to cm if user gave ft/in
  let heightCm = null;
  if (answers.heightUnit === "cm" && answers.heightCm) heightCm = Number(answers.heightCm);
  if (answers.heightUnit === "ft") heightCm = ftInToCm(answers.heightFt || 0, answers.heightIn || 0);

  // normalize weight to kg if lbs provided
  let weightKg = null;
  if (answers.weightUnit === "kg") weightKg = Number(answers.weightVal);
  if (answers.weightUnit === "lbs") weightKg = lbsToKg(Number(answers.weightVal));

  // small heuristic: compute a personalized improvement score
  const levelScore = (answers.level === "beginner" ? 1 : answers.level === "intermediate" ? 2 : 3);
  // Without FitUs percent baseline depends on level (higher level -> already better)
  const withoutFitUs = Math.min(60, 20 + levelScore * 6 + (answers.age ? Math.max(0, (50 - Math.min(50, Number(answers.age))) / 10) * 3 : 0));
  // With FitUs = baseline + big boost
  const withFitUs = Math.min(98, withoutFitUs + 50 + (answers.training === "gym" ? 5 : 0));

  // Show answer rows
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
  addRow("Height", heightCm ? `${heightCm} cm` : (answers.heightCm ? `${answers.heightCm} cm` : "-"));
  addRow("Weight", weightKg ? `${weightKg} kg` : (answers.weightVal ? `${answers.weightVal} ${answers.weightUnit || ""}` : "-"));
  addRow("Age", answers.age || "-");
  addRow("Level", answers.level || "-");

  // comparison visual
  const compareWrap = document.createElement("div");
  compareWrap.style.marginTop = "12px";
  compareWrap.innerHTML = `
    <div class="pair small" style="justify-content:space-between;margin-bottom:6px">
      <div>Expected progress</div>
      <div style="min-width:120px;text-align:right">${Math.round(withFitUs)}% potential</div>
    </div>
    <div class="bar-compare" aria-hidden="true">
      <div style="display:flex;gap:8px;align-items:center">
        <div style="width:38%;font-size:13px;color:var(--muted)">Without FitUs</div>
        <div style="flex:1"><div class="pbar-muted" id="barWithout" style="width:0"></div></div>
        <div style="min-width:44px;text-align:right">${Math.round(withoutFitUs)}%</div>
      </div>
      <div style="height:8px"></div>
      <div style="display:flex;gap:8px;align-items:center;margin-top:6px">
        <div style="width:38%;font-size:13px;color:var(--muted)">With FitUs</div>
        <div style="flex:1"><div class="pbar" id="barWith" style="width:0"></div></div>
        <div style="min-width:44px;text-align:right">${Math.round(withFitUs)}%</div>
      </div>
    </div>
  `;

  // CTA link (styled like a button) to your get page
  const ctaWrap = document.createElement("div");
  ctaWrap.style.marginTop = "14px";
  ctaWrap.innerHTML = `<a class="cta-link" href="get/">Train with FitUs →</a>`;

  optionsEl.appendChild(summaryWrap);
  optionsEl.appendChild(compareWrap);
  optionsEl.appendChild(ctaWrap);

  // Hide nav buttons and animate bars
  backBtn.style.display = "none";
  nextBtn.style.display = "none";

  // animate after a short delay so width transitions run
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
