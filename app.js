(() => {
  "use strict";
  const DATASETS = {
    experimente: {
      label: "Experimente", file: "experimente.csv", title: "Experiment",
      subtitle: "Experimente suchen, anzeigen und bearbeiten.",
      columns: ["id","Experiment","Ziel","Beschreibung","Thm_An","Material","Beispielmessung","Bild","Internetverweis","Tipps","Dokumente","GBU_Themen","GBU_Gefahr","GBU_Schutz"],
      table: ["id","Experiment","Ziel","Thm_An"],
      description: "Beschreibung",
      media: { Bild: "experiment-image", Dokumente: "experiment-doc" }
    },
    inventar: {
      label: "Inventar", file: "inventur.csv", title: "Inventar",
      subtitle: "Inventargegenstände suchen, anzeigen und bearbeiten.",
      columns: ["id","Inventar","Beschreibung","tecdata","Thm_An","Bild","Schrank","Fach","InventarNr_BBS","Hersteller","Herstellerkennung","Geraetekarte","Pflege","ElektroNr","Anzahl"],
      table: ["id","Inventar","Schrank","Fach","Hersteller","Anzahl"],
      description: "Beschreibung",
      media: { Bild: "inventory-image", Geraetekarte: "inventory-doc" }
    },
    themen: {
      label: "Themen", file: "themes.csv", title: "Themen",
      subtitle: "Themen und Unterrichtsbezüge durchsuchen und pflegen.",
      columns: ["id","Thema","konkret","Jahrgang"],
      table: ["id","Thema","konkret","Jahrgang"],
      description: "konkret",
      media: {}
    }
  };
  const CABINET_SHELF_IMAGES = {"15|C":"data/upload_inv/Schrankbilder/schrank15_FachC.jpg","9|G":"data/upload_inv/Schrankbilder/schrank9_FachG.jpg","3|B":"data/upload_inv/Schrankbilder/schrank3_FachB.jpg.jpg","27.1|A":"data/upload_inv/Schrankbilder/schrank27.1_FachA.jpg","27.1|E":"data/upload_inv/Schrankbilder/schrank27.1_FachE.jpg","4|C":"data/upload_inv/Schrankbilder/schrank4_FachC.jpg","10|D":"data/upload_inv/Schrankbilder/schrank10_FachD.jpg","10|B":"data/upload_inv/Schrankbilder/schrank10_FachB.jpg","25.1|E":"data/upload_inv/Schrankbilder/schrank25.1_FachE.jpg","12|E":"data/upload_inv/Schrankbilder/schrank12_FachE.jpg","28.2|C":"data/upload_inv/Schrankbilder/schrank28.2_FachC.jpg","1|C":"data/upload_inv/Schrankbilder/schrank1_FachC.jpg","15|E":"data/upload_inv/Schrankbilder/schrank15_FachE.jpg","1|B":"data/upload_inv/Schrankbilder/schrank1_FachB.jpg","20|A":"data/upload_inv/Schrankbilder/schrank20_FachA.jpg","20|F":"data/upload_inv/Schrankbilder/schrank20_FachF.jpg","2|C":"data/upload_inv/Schrankbilder/schrank2_FachC.jpg","4|A":"data/upload_inv/Schrankbilder/schrank4_FachA.jpg","25.2|F":"data/upload_inv/Schrankbilder/schrank25.2_FachF.jpg","3|E":"data/upload_inv/Schrankbilder/schrank3_FachE.jpg.jpg","25.2|C":"data/upload_inv/Schrankbilder/schrank25.2_FachC.jpg","15|A":"data/upload_inv/Schrankbilder/schrank15_FachA.jpg","9|D":"data/upload_inv/Schrankbilder/schrank9_FachD.jpg","25.1|F":"data/upload_inv/Schrankbilder/schrank25.1_FachF.jpg","8|D":"data/upload_inv/Schrankbilder/schrank8_FachD.jpg","18|B":"data/upload_inv/Schrankbilder/schrank18_FachB.jpg","9|A":"data/upload_inv/Schrankbilder/schrank9_FachA.jpg","19|F":"data/upload_inv/Schrankbilder/schrank19_FachF.jpg","12|C":"data/upload_inv/Schrankbilder/schrank12_FachC.jpg","27.2|E":"data/upload_inv/Schrankbilder/schrank27.2_FachE.jpg","21|F":"data/upload_inv/Schrankbilder/schrank21_FachF.jpg","28.1|D":"data/upload_inv/Schrankbilder/schrank28.1_FachD.jpg","12|B":"data/upload_inv/Schrankbilder/schrank12_FachB.jpg","8|A":"data/upload_inv/Schrankbilder/schrank8_FachA.jpg","6|F":"data/upload_inv/Schrankbilder/schrank6_FachF.jpg","13|C":"data/upload_inv/Schrankbilder/schrank13_FachC.jpg","26.2|D":"data/upload_inv/Schrankbilder/schrank26.2_FachD.jpg","7|C":"data/upload_inv/Schrankbilder/schrank7_FachC.jpg","14|B":"data/upload_inv/Schrankbilder/schrank14_FachB.jpg","17|D":"data/upload_inv/Schrankbilder/schrank17_FachD.jpg","5|B":"data/upload_inv/Schrankbilder/schrank5_fachB.jpg","19|C":"data/upload_inv/Schrankbilder/schrank19_FachC.jpg","28.1|A":"data/upload_inv/Schrankbilder/schrank28.1_FachA.jpg","20|D":"data/upload_inv/Schrankbilder/schrank20_FachD.jpg","27.1|C":"data/upload_inv/Schrankbilder/schrank27.1_FachC.jpg","10|E":"data/upload_inv/Schrankbilder/schrank10_FachE.jpg","5|D":"data/upload_inv/Schrankbilder/schrank5_fachD.jpg","5|C":"data/upload_inv/Schrankbilder/schrank5_FachC.jpg","26.1|D":"data/upload_inv/Schrankbilder/schrank26.1_FachD.jpg","11|D":"data/upload_inv/Schrankbilder/schrank11_FachD.jpg","13|B":"data/upload_inv/Schrankbilder/schrank13_FachB.jpg","5|A":"data/upload_inv/Schrankbilder/schrank5_fachA.jpg","25.1|A":"data/upload_inv/Schrankbilder/schrank25.1_FachA.jpg","28.1|B":"data/upload_inv/Schrankbilder/schrank28.1_FachB.jpg","2|B":"data/upload_inv/Schrankbilder/schrank2_FachB.jpg","18|A":"data/upload_inv/Schrankbilder/schrank18_FachA.jpg","16|A":"data/upload_inv/Schrankbilder/schrank16_FachA.jpg","10|C":"data/upload_inv/Schrankbilder/schrank10_FachC.jpg","13|F":"data/upload_inv/Schrankbilder/schrank13_FachF.jpg","26.1|E":"data/upload_inv/Schrankbilder/schrank26.1_FachE.jpg","9|C":"data/upload_inv/Schrankbilder/schrank9_FachC.jpg","25.2|E":"data/upload_inv/Schrankbilder/schrank25.2_FachE.jpg","25.1|C":"data/upload_inv/Schrankbilder/schrank25.1_FachC.jpg","28.2|E":"data/upload_inv/Schrankbilder/schrank28.2_FachE.jpg","2|D":"data/upload_inv/Schrankbilder/schrank2_FachD.jpg","27.1|D":"data/upload_inv/Schrankbilder/schrank27.1_FachD.jpg","25.1|D":"data/upload_inv/Schrankbilder/schrank25.1_FachD.jpg","28.2|D":"data/upload_inv/Schrankbilder/schrank28.2_FachD.jpg","28.1|E":"data/upload_inv/Schrankbilder/schrank28.1_FachE.jpg","19|B":"data/upload_inv/Schrankbilder/schrank19_FachB.jpg","17|A":"data/upload_inv/Schrankbilder/schrank17_FachA.jpg","26.1|A":"data/upload_inv/Schrankbilder/schrank26.1_FachA.jpg","4|D":"data/upload_inv/Schrankbilder/schrank4_FachD.jpg","18|C":"data/upload_inv/Schrankbilder/schrank18_FachC.jpg","3|A":"data/upload_inv/Schrankbilder/schrank3_FachA.jpg.jpg","14|D":"data/upload_inv/Schrankbilder/schrank14_FachD.jpg","16|D":"data/upload_inv/Schrankbilder/schrank16_FachD.jpg","5|E":"data/upload_inv/Schrankbilder/schrank5_fachE.jpg","18|E":"data/upload_inv/Schrankbilder/schrank18_FachE.jpg","2|E":"data/upload_inv/Schrankbilder/schrank2_FachE.jpg","1|E":"data/upload_inv/Schrankbilder/schrank1_FachE.jpg","21|D":"data/upload_inv/Schrankbilder/schrank21_FachD.jpg","9|F":"data/upload_inv/Schrankbilder/schrank9_FachF.jpg","27.2|C":"data/upload_inv/Schrankbilder/schrank27.2_FachC.jpg","3|D":"data/upload_inv/Schrankbilder/schrank3_FachD.jpg.jpg","17|B":"data/upload_inv/Schrankbilder/schrank17_FachB.jpg","13|A":"data/upload_inv/Schrankbilder/schrank13_FachA.jpg","20|C":"data/upload_inv/Schrankbilder/schrank20_FachC.jpg","26.1|C":"data/upload_inv/Schrankbilder/schrank26.1_FachC.jpg","2|A":"data/upload_inv/Schrankbilder/schrank2_FachA.jpg","1|A":"data/upload_inv/Schrankbilder/schrank1_FachA.jpg","28.2|B":"data/upload_inv/Schrankbilder/schrank28.2_FachB.jpg","20|E":"data/upload_inv/Schrankbilder/schrank20_FachE.jpg","25.2|B":"data/upload_inv/Schrankbilder/schrank25.2_FachB.jpg","27.2|A":"data/upload_inv/Schrankbilder/schrank27.2_FachA.jpg","4|F":"data/upload_inv/Schrankbilder/schrank4_FachF.jpg","9|E":"data/upload_inv/Schrankbilder/schrank9_FachE.jpg","17|E":"data/upload_inv/Schrankbilder/schrank17_FachE.jpg","15|D":"data/upload_inv/Schrankbilder/schrank15_FachD.jpg","27.1|B":"data/upload_inv/Schrankbilder/schrank27.1_FachB.jpg","27.2|D":"data/upload_inv/Schrankbilder/schrank27.2_FachD.jpg","27.1|F":"data/upload_inv/Schrankbilder/schrank27.1_FachF.jpg","19|E":"data/upload_inv/Schrankbilder/schrank19_FachE.jpg","14|A":"data/upload_inv/Schrankbilder/schrank14_FachA.jpg","16|B":"data/upload_inv/Schrankbilder/schrank16_FachB.jpg","8|E":"data/upload_inv/Schrankbilder/schrank8_FachE.jpg","7|E":"data/upload_inv/Schrankbilder/schrank7_FachE.jpg","15|B":"data/upload_inv/Schrankbilder/schrank15_FachB.jpg","13|D":"data/upload_inv/Schrankbilder/schrank13_FachD.jpg","20|B":"data/upload_inv/Schrankbilder/schrank20_FachB.jpg","3|C":"data/upload_inv/Schrankbilder/schrank3_FachC.jpg.jpg","12|D":"data/upload_inv/Schrankbilder/schrank12_FachD.jpg","7|A":"data/upload_inv/Schrankbilder/schrank7_FachA.jpg","14|F":"data/upload_inv/Schrankbilder/schrank14_FachF.jpg","19|A":"data/upload_inv/Schrankbilder/schrank19_FachA.jpg","9|B":"data/upload_inv/Schrankbilder/schrank9_FachB.jpg","25.1|B":"data/upload_inv/Schrankbilder/schrank25.1_FachB.jpg","27.2|F":"data/upload_inv/Schrankbilder/schrank27.2_FachF.jpg","6|D":"data/upload_inv/Schrankbilder/schrank6_FachD.jpg","25.2|A":"data/upload_inv/Schrankbilder/schrank25.2_FachA.jpg","26.2|B":"data/upload_inv/Schrankbilder/schrank26.2_FachB.jpg","6|B":"data/upload_inv/Schrankbilder/schrank6_FachB.jpg","26.2|E":"data/upload_inv/Schrankbilder/schrank26.2_FachE.jpg","26.2|C":"data/upload_inv/Schrankbilder/schrank26.2_FachC.jpg","21|B":"data/upload_inv/Schrankbilder/schrank21_FachB.jpg","17|F":"data/upload_inv/Schrankbilder/schrank17_FachF.jpg","7|D":"data/upload_inv/Schrankbilder/schrank7_FachD.jpg","26.1|B":"data/upload_inv/Schrankbilder/schrank26.1_FachB.jpg","21|A":"data/upload_inv/Schrankbilder/schrank21_FachA.jpg","8|B":"data/upload_inv/Schrankbilder/schrank8_FachB.jpg","8|C":"data/upload_inv/Schrankbilder/schrank8_FachC.jpg","26.1|F":"data/upload_inv/Schrankbilder/schrank26.1_FachF.jpg","11|A":"data/upload_inv/Schrankbilder/schrank11_FachA.jpg","14|C":"data/upload_inv/Schrankbilder/schrank14_FachC.jpg","21|C":"data/upload_inv/Schrankbilder/schrank21_FachC.jpg","21|E":"data/upload_inv/Schrankbilder/schrank21_FachE.jpg","7|B":"data/upload_inv/Schrankbilder/schrank7_FachB.jpg","10|A":"data/upload_inv/Schrankbilder/schrank10_FachA.jpg","6|C":"data/upload_inv/Schrankbilder/schrank6_FachC.jpg","18|D":"data/upload_inv/Schrankbilder/schrank18_FachD.jpg","14|E":"data/upload_inv/Schrankbilder/schrank14_FachE.jpg","6|E":"data/upload_inv/Schrankbilder/schrank6_FachE.jpg","11|E":"data/upload_inv/Schrankbilder/schrank11_FachE.jpg","1|D":"data/upload_inv/Schrankbilder/schrank1_FachD.jpg","28.2|A":"data/upload_inv/Schrankbilder/schrank28.2_FachA.jpg","16|C":"data/upload_inv/Schrankbilder/schrank16_FachC.jpg","4|E":"data/upload_inv/Schrankbilder/schrank4_FachE.jpg","19|D":"data/upload_inv/Schrankbilder/schrank19_FachD.jpg","11|B":"data/upload_inv/Schrankbilder/schrank11_FachB.jpg","27.2|B":"data/upload_inv/Schrankbilder/schrank27.2_FachB.jpg","26.2|A":"data/upload_inv/Schrankbilder/schrank26.2_FachA.jpg","12|A":"data/upload_inv/Schrankbilder/schrank12_FachA.jpg","6|A":"data/upload_inv/Schrankbilder/schrank6_FachA.jpg","26.2|F":"data/upload_inv/Schrankbilder/schrank26.2_FachF.jpg","4|B":"data/upload_inv/Schrankbilder/schrank4_FachB.jpg","11|C":"data/upload_inv/Schrankbilder/schrank11_FachC.jpg","25.2|D":"data/upload_inv/Schrankbilder/schrank25.2_FachD.jpg","8|F":"data/upload_inv/Schrankbilder/schrank8_FachF.jpg","28.1|C":"data/upload_inv/Schrankbilder/schrank28.1_FachC.jpg","17|C":"data/upload_inv/Schrankbilder/schrank17_FachC.jpg"};
  const $ = id => document.getElementById(id);
  const state = { view: "sammlungsplan", homeSearch: false, records: {}, originals: {}, changed: {}, selectedId: null, isNew: false, search: "" };
  const storageKey = view => `physiksammlung-js-v1:${view}`;
  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const text = value => String(value ?? "").trim();
  function parseCSV(source, delimiter = ";") {
    const rows = []; let row = [], field = "", quoted = false;
    for (let i=0; i<source.length; i++) {
      const c=source[i];
      if (quoted) {
        if (c === '"' && source[i+1] === '"') { field += '"'; i++; }
        else if (c === '"') quoted=false;
        else field += c;
      } else if (c === '"' && field.length === 0) quoted=true;
      else if (c === delimiter) { row.push(field); field=""; }
      else if (c === "\n") { row.push(field.replace(/\r$/, "")); rows.push(row); row=[]; field=""; }
      else field += c;
    }
    if (field.length || row.length) { row.push(field.replace(/\r$/, "")); rows.push(row); }
    while (rows.length && rows[rows.length-1].every(v => v === "")) rows.pop();
    if (!rows.length) return { headers: [], records: [] };
    const headers = rows.shift().map(h => h.replace(/^\uFEFF/, "").trim());
    const records = rows.filter(r => r.some(v => v !== "")).map((r, idx) => {
      const obj = {}; headers.forEach((h, i) => obj[h] = r[i] ?? "");
      obj.__rowKey = `${text(obj.id) || "row"}-${idx}`;
      return obj;
    });
    return { headers, records };
  }
  function serializeCSV(headers, records) {
    const q = v => {
      let s = String(v ?? "");
      if (s.includes('"')) s = s.replace(/"/g, '""');
      return /[;"\r\n]/.test(s) ? `"${s}"` : s;
    };
    return "\uFEFF" + [headers.map(q).join(";"), ...records.map(r => headers.map(h => q(r[h])).join(";"))].join("\r\n");
  }
  async function loadDataset(view) {
    const cfg = DATASETS[view];
    // CSV-Startdaten sind in inline-data.js eingebettet, damit file:// funktioniert.
    // Falls die eingebetteten Daten fehlen, wird als Fallback ein lokaler Server unterstützt.
    /*let source = window.PHYSIKSAMMLUNG_CSV?.[cfg.file];
    if (typeof source !== "string") {
      const response = await fetch(`data/${cfg.file}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Konnte data/${cfg.file} nicht laden (${response.status}).`);
      source = await response.text();
    }*/
    //ab hier neu
  //  const cfg = DATASETS[view];
    const source = window.PHYSIKSAMMLUNG_CSV?.[cfg.file];
  if (typeof source !== "string") {
    throw new Error(
      `Daten für "${cfg.file}" wurden in inline-data.js nicht gefunden.`
    );
  }
//bis hier neu
    const parsed = parseCSV(source);
    state.originals[view] = parsed;
    let saved = null;
    try { saved = localStorage.getItem(storageKey(view)); } catch { /* file://-Speicher kann browserabhängig sein */ }
    if (saved) {
      try {
        const data = JSON.parse(saved);
        state.records[view] = Array.isArray(data) ? data : parsed.records;
        state.changed[view] = true;
      } catch { state.records[view] = parsed.records; state.changed[view] = false; }
    } else {
      state.records[view] = parsed.records;
      state.changed[view] = false;
    }
  }
  const cfg = () => DATASETS[state.view];
  const records = () => state.records[state.view] || [];
  function titleOf(record) { return text(record[cfg().title]) || "(ohne Titel)"; }
  function recordId(record) { return text(record.id) || "–"; }
  function getFiltered() {
    const query = state.search.toLocaleLowerCase("de");
    return records().filter(r => !query || Object.entries(r).some(([k,v]) => k !== "__rowKey" && String(v ?? "").toLocaleLowerCase("de").includes(query)));
  }
  function showNotice(message, error=false) {
    const node=$("notice"); node.hidden=false; node.classList.toggle("error",error); node.textContent=message;
    clearTimeout(showNotice.timer); showNotice.timer=setTimeout(()=>node.hidden=true,6500);
  }
  function mediaNames(value) {
    return text(value).split("&&&").map(v=>v.trim()).filter(Boolean);
  }
  function mediaUrl(view, field, name) {
    if (/^(https?:|data:|blob:)/i.test(name)) return name;
    const clean = name.replace(/^\.\/+/, "").replace(/^\/+/, "").replace(/^data\//i, "");
    if (/^(upload_exp|upload_inv)\//i.test(clean)) return `data/${clean}`;
    if (view === "experimente") return `./data/upload_exp/${clean}`;
    if (field === "Geraetekarte") return `./data/upload_inv/Geraetekarten/${clean}`;
    if (field === "Bild") return `./data/upload_inv/Inventarbilder/${clean}`;
    return `data/${clean}`;
  }
  function inventoryImageCandidates(field, name) {
    const clean = name.replace(/^\.\/+/, "").replace(/^\/+/, "").replace(/^data\//i, "");
    const basename = clean.split(/[\\/]/).pop();
    const dirs = field === "Geraetekarte"
      ? ["data/upload_inv/Geraetekarten/", "data/upload_inv/", "data/upload_exp/"]
      : ["data/upload_inv/Inventarbilder/", "data/upload_inv/", "data/upload_exp/"];
    const candidates = [];
    if (/^(upload_exp|upload_inv)\//i.test(clean)) candidates.push(`data/${clean}`);
    if (/^data\//i.test(name)) candidates.push(name.replace(/^\.\/+/, ""));
    if (clean.includes("/") && !/^(upload_exp|upload_inv)\//i.test(clean)) candidates.push(`data/${clean}`);
    for (const dir of dirs) candidates.push(dir + basename);
    return [...new Set(candidates)];
  }
  function fallbackInventoryImage(img) {
    const candidates = JSON.parse(img.dataset.candidates || "[]");
    const next = Number(img.dataset.pathFallback || 0);
    if (next < candidates.length) {
      img.dataset.pathFallback = String(next + 1);
      img.src = candidates[next];
      return;
    }
    img.closest("figure")?.classList.add("image-missing");
    img.style.display = "none";
  }
  function showImagePreview(src, alt) {
    let dialog = document.getElementById("imagePreviewDialog");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.id = "imagePreviewDialog";
      dialog.className = "image-preview-dialog";
      dialog.innerHTML = '<button type="button" class="image-preview-close" aria-label="Schließen">×</button><img class="image-preview-full" alt="">';
      document.body.appendChild(dialog);
      dialog.querySelector(".image-preview-close").addEventListener("click", () => dialog.close());
      dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
    }
    const full = dialog.querySelector(".image-preview-full");
    full.src = src;
    full.alt = alt || "Bildvorschau";
    if (!dialog.open) dialog.showModal();
  }
  function shortValue(value, max=145) {
    const s=text(value).replace(/&&&/g," · ");
    return s.length>max ? s.slice(0,max-1)+"…" : s;
  }

  function renderSammlungsplan(cabinetToShow = null) {
    const cabinets = [
      ["3","4","9","10","15","16","21","22"],
      ["2","5","8","11","14","17","20","23"],
      ["1","6","7","12","13","18","19","24"]
    ];
    const cabinetButton = (n, label = "") => `<td><button type="button" class="plan-cabinet" data-cabinet="${n}"><span>Schrank ${n}</span> ${label ? `<small>${label} </small>`: ""}

</button></td>`;
    const row2 = cabinets[1].map(cabinetButton).join("");
    const row3 = cabinets[2].map(cabinetButton).join("");
    const lower = ["30","29","28.2","28.1","27.2","27.1","26.2","26.1","25.2","25.1"];
    $("pageTitle").textContent = cabinetToShow === null ? "Übersichtsplan" : `Schrank ${cabinetToShow}`;
    $("pageSubtitle").textContent = cabinetToShow === null
      ? "Lageplan der Sammlung. Einen Schrank anklicken, um den Inhalt nach Regalfächern sortiert anzuzeigen."
      : "Inventar nach Regalfächern sortiert; rechts ist das zugehörige Fachbild zu sehen.";
    $("searchInput").placeholder = "Inventar im Übersichtsplan suchen …";
    $("newBtn").hidden = true;

    if (cabinetToShow !== null) {
      // Die Planseite bleibt hinter dem Schrankdialog sichtbar.
      $("pageTitle").textContent = "Übersichtsplan";
      $("pageSubtitle").textContent = "Lageplan der Sammlung. Einen Schrank anklicken, um den Inhalt nach Regalfächern sortiert anzuzeigen.";
      const shelfOrder = ["drauf", "A", "B", "C", "D", "E", "F", "G"];
      const inventory = (state.records.inventar || []).filter(r => text(r.Schrank).trim() === String(cabinetToShow));
      const byShelf = new Map();
      for (const row of inventory) {
        const shelf = text(row.Fach).trim() || "Ohne Fach";
        if (!byShelf.has(shelf)) byShelf.set(shelf, []);
        byShelf.get(shelf).push(row);
      }
      const shelves = [
        ...shelfOrder.filter(s => byShelf.has(s)),
        ...Array.from(byShelf.keys()).filter(s => !shelfOrder.some(x => x.toLocaleLowerCase("de") === s.toLocaleLowerCase("de"))).sort((a,b)=>a.localeCompare(b,"de",{numeric:true}))
      ];
      const shelfHtml = shelves.map(shelf => {
        const rows = (byShelf.get(shelf) || []).slice().sort((a,b)=>text(a.Inventar).localeCompare(text(b.Inventar),"de"));
        const imageKey = `${String(cabinetToShow).toLowerCase()}|${String(shelf).toUpperCase()}`;
        const imagePath = CABINET_SHELF_IMAGES[imageKey];
        const itemHtml = rows.length
          ? `<ul class="shelf-items">${rows.map(r => `<li><button type="button" class="shelf-item" data-inventory-key="${escapeHtml(r.__rowKey)}">${escapeHtml(text(r.Inventar) || "(ohne Bezeichnung)")}</button>${text(r.Anzahl) ? `<span class="shelf-count">Anzahl: ${escapeHtml(text(r.Anzahl))}</span>` : ""}</li>`).join("")}</ul>`
          : `<p class="shelf-empty">Keine Einträge in diesem Fach.</p>`;
        const imageHtml = imagePath
          ? `<a class="shelf-photo-link" href="${escapeHtml(imagePath)}" target="_blank" rel="noopener"><img class="shelf-photo" src="${escapeHtml(imagePath)}" alt="Schrank ${escapeHtml(cabinetToShow)}, Fach ${escapeHtml(shelf)}" loading="eager" decoding="sync"></a>`
          : `<div class="shelf-photo-missing">Kein Fachbild vorhanden</div>`;
        return `<section class="shelf-panel"><div class="shelf-list"><h2>Fach ${escapeHtml(shelf)}</h2>${itemHtml}</div><div class="shelf-image">${imageHtml}</div></section>`;
      }).join("");
      let dialog = $("cabinetDialog");
      if (!dialog) {
        dialog = document.createElement("dialog");
        dialog.id = "cabinetDialog";
        dialog.className = "cabinet-detail-dialog";
        document.body.appendChild(dialog);
        dialog.addEventListener("close", () => {
          if (!state.homeSearch) {
            state.view = "sammlungsplan";
            render();
          }
        });
      }
      dialog.innerHTML = `<div class="cabinet-dialog-head"><div><h2>Schrank ${escapeHtml(cabinetToShow)}</h2><p>${inventory.length} Inventareinträge · nach Regalfächern sortiert</p></div><button type="button" class="icon-button" id="closeCabinetDialog" aria-label="Schrankansicht schließen">×</button></div><div class="cabinet-dialog-body">${inventory.length ? shelfHtml : `<div class="empty-state"><strong>Keine Inventareinträge gefunden</strong>In der CSV sind für Schrank ${escapeHtml(cabinetToShow)} keine passenden Datensätze vorhanden.</div>`}</div>`;
      $("closeCabinetDialog").addEventListener("click", () => dialog.close());
      dialog.querySelectorAll("[data-inventory-key]").forEach(btn => btn.addEventListener("click", () => {
        const key = btn.dataset.inventoryKey;
        state.view = "inventar";
        state.homeSearch = false;
        state.search = "";
        $("searchInput").value = "";
        render();
        openDetails(key);
      }));
      if (!dialog.open) dialog.showModal();
      return;
    }


//ÜBERSICHTSPLAN
    $("resultCount").textContent = "30 Schrankbereiche";
    $("content").innerHTML = `<div class="plan-wrap"><table class="collection-plan" aria-label="Übersichtsplan der Physiksammlung"><tbody>
      <tr class="plan-cabinet-row">	
${cabinetButton("3","Wärme-\n lehre(2)")}
<td class="plan-aisle" rowspan="4">Gang 1</td>
${cabinetButton("4","Rotation")}${cabinetButton("9","Elektronik")}
<td class="plan-aisle" rowspan="4" colspan="3">Gang 2</td>
${cabinetButton("10","dig. El.")}${cabinetButton("15","el. magn. Wellen")}
<td class="plan-aisle" rowspan="4" colspan="3">Gang 3</td>
${cabinetButton("16", "Astronomie\n Röntgen")}${cabinetButton("21","Beugung")}
<td class="plan-aisle" rowspan="4">Gang 4</td>${cabinetButton("22","Kollegen")}
</tr>   
 <tr class="plan-cabinet-row">	
${cabinetButton("2","Wärme-\n lehre(1)")}
${cabinetButton("5","Kraft&\n Impuls")}${cabinetButton("8","bew. Ladungen")}
${cabinetButton("11","Influenz")}${cabinetButton("14","Resonanz")}
${cabinetButton("17", "Kernphysik")}${cabinetButton("20","Optik")}
${cabinetButton("22","Bastel-\n schrank(2)")}
</tr>
   <tr class="plan-cabinet-row">	
${cabinetButton("1","Stativmaterial")}
${cabinetButton("6","Bewegungen")}${cabinetButton("7","Elektro-\n statik")}
${cabinetButton("12","Magnetismus")}${cabinetButton("13","Schwingungen& \n Wellen")}
${cabinetButton("18", "Atomphysik")}${cabinetButton("19","Optik")}
${cabinetButton("24","Bastel-\n schrank(1)")}
</tr>

<!-- <tr class="plan-cabinet-row">${row3}</tr>-->
      <tr class="plan-label-row"><td>vor Schrank 1</td><td>Exp.-wagen</td><td>Exp.-wagen</td><td>Exp.-wagen</td><td>Exp.-wagen</td><td>Exp.-wagen</td><td>Exp.-wagen</td><td>Werk-bank</td></tr>
      <tr><td colspan="14" class="plan-spacer"></td></tr>
  <tr class="plan-bottom"><td colspan="2">Sicherungen</td>
${cabinetButton("30","Exp.-\n anleitungen")}
<td colspan="2">Tür</td>
<td colspan="2">Waschbecken</td>
${cabinetButton("29","Handapparat \n Digitales")}
${cabinetButton("28.2","Strom/- \n Spannung")}
${cabinetButton("28.1","Strom/- \n Spannung")}
${cabinetButton("27.2","digitale\n Messwerterf.")}
${cabinetButton("27.1","digitale\n Messwerterf.")}
${cabinetButton("26.2","Messverstärker")}
${cabinetButton("26.1","Hochspannung")}
${cabinetButton("25.2","Niederspannung")}
${cabinetButton("25.1","Niederspannung")}
<!-- ${lower.slice(1).map(cabinetButton).join("")} -->
</tr>  
      </tbody></table><p class="plan-hint">Schrank anklicken: Der Inhalt wird nach Regalfächern sortiert angezeigt, jeweils mit dem passenden Fachbild.</p></div>`;
    $("content").querySelectorAll("[data-cabinet]").forEach(btn => btn.addEventListener("click", () => {
      renderSammlungsplan(btn.dataset.cabinet);
    }));
  }
  function render() {
    $("newBtn").hidden = false;
    if (state.view === "sammlungsplan") {
      document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===state.view));
      renderSammlungsplan();
      return;
    }
    const config=cfg(); const filtered=getFiltered();
    $("pageTitle").textContent=config.label;
    $("pageSubtitle").textContent=config.subtitle;
    $("searchInput").placeholder=`Suche in ${config.label.toLocaleLowerCase("de")} …`;
    $("resultCount").textContent=`${filtered.length.toLocaleString("de-DE")} von ${records().length.toLocaleString("de-DE")} Einträgen`;
    $("newBtn").textContent=`＋ Neuer Eintrag`;
    $("saveStatus").textContent=state.changed[state.view] ? "Lokale Änderungen gespeichert" : "Noch keine lokalen Änderungen";
    document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===(state.homeSearch ? "sammlungsplan" : state.view)));
    if (state.homeSearch) {
      $("pageTitle").textContent = "Inventarsuche";
      $("pageSubtitle").textContent = "Suchergebnisse aus dem Inventar. Die Suchanfrage bleibt beim Öffnen und Schließen eines Eintrags erhalten.";
      $("searchInput").placeholder = "Inventar im Übersichtsplan suchen …";
    }
    if (!filtered.length) {
      $("content").innerHTML=`<div class="empty-state"><strong>Keine Einträge gefunden</strong>Ändere den Suchbegriff oder lege einen neuen Eintrag an.</div>`;
      return;
    }
    if (state.view === "themen") {
      $("content").innerHTML=`<div class="table-wrap"><table class="data-table"><thead><tr>${config.table.map(h=>`<th>${escapeHtml(h)}</th>`).join("")}<th></th></tr></thead><tbody>${filtered.map(r=>`<tr data-key="${escapeHtml(r.__rowKey)}">${config.table.map(h=>`<td title="${escapeHtml(r[h])}">${escapeHtml(shortValue(r[h],90) || "–")}</td>`).join("")}<td><span class="card-action">Öffnen →</span></td></tr>`).join("")}</tbody></table></div>`;
      $("content").querySelectorAll("tbody tr").forEach(tr=>tr.addEventListener("click",()=>openDetails(tr.dataset.key)));
      return;
    }
    $("content").innerHTML=`<div class="record-grid">${filtered.map(r=>{
      const desc=shortValue(r[config.description] || r.Ziel || r.Thm_An || r.konkret || "");
      const tag=state.view==="experimente" ? shortValue(r.Thm_An,34) : state.view==="inventar" ? `Schrank ${text(r.Schrank)||"–"}` : "";
      return `<article class="record-card" data-key="${escapeHtml(r.__rowKey)}" tabindex="0" role="button" aria-label="Details zu ${escapeHtml(titleOf(r))}">
        <div class="record-top"><span class="record-id">ID ${escapeHtml(recordId(r))}</span>${tag?`<span class="record-tag">${escapeHtml(tag)}</span>`:""}</div>
        <h3>${escapeHtml(titleOf(r))}</h3>
        <p>${escapeHtml(desc || "Keine Kurzbeschreibung vorhanden.")}</p>
        <div class="card-meta"><span>${state.view==="experimente" ? `${mediaNames(r.Bild).length} Bild(er) · ${mediaNames(r.Dokumente).length} Dokument(e)` : `Fach ${text(r.Fach)||"–"} · Anzahl ${text(r.Anzahl)||"–"}`}</span><span class="card-action">Details →</span></div>
      </article>`;
    }).join("")}</div>`;
    $("content").querySelectorAll(".record-card").forEach(card=>{
      card.addEventListener("click",()=>openDetails(card.dataset.key));
      card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openDetails(card.dataset.key);}});
    });
  }
  function findByKey(key) { return records().find(r=>String(r.__rowKey)===String(key)); }
  function fieldIsLong(name, value) {
    return String(value ?? "").length > 90 || /beschreibung|messung|tipps|schutz|gefahr|pflege|tecdata|anmerkung|material|themen/i.test(name);
  }
  function openDetails(key) {
    const record=findByKey(key); if(!record) return;
    state.selectedId=key;
    $("detailTitle").textContent=titleOf(record);
    const fields=Object.keys(record).filter(k=>k!=="__rowKey");
    $("detailBody").innerHTML=fields.map(field=>{
      const value=text(record[field]); if(!value) return "";
      const mediaKind=cfg().media[field];
      if(mediaKind) {
        const names=mediaNames(value);
        if(!names.length) return "";
        const isImage=mediaKind.endsWith("image");
        return `<div class="detail-field full"><label>${escapeHtml(field)}</label>${isImage ? `<div class="detail-images">${names.map(n=>{
          const candidates = state.view === "inventar" && ["Bild","Geraetekarte"].includes(field) ? inventoryImageCandidates(field,n) : [mediaUrl(state.view,field,n)];
          return `<figure class="detail-image-item"><button type="button" class="image-preview-button" aria-label="Bild vergrößern"><img src="${escapeHtml(candidates[0])}" data-candidates="${escapeHtml(JSON.stringify(candidates))}" data-path-fallback="1" alt="${escapeHtml(n)}" loading="eager" decoding="async"><span>Zum Vergrößern anklicken</span></button><figcaption>${escapeHtml(n)}</figcaption></figure>`;
        }).join("")}</div>` : `<div class="attachment-list">${names.map(n=>`<a href="${escapeHtml(mediaUrl(state.view,field,n))}" target="_blank" rel="noopener" download>${escapeHtml(n)} ↗</a>`).join("")}</div>`}</div>`;
      }
      const long=fieldIsLong(field,value);
      return `<div class="detail-field ${long?"full":""}"><label>${escapeHtml(field)}</label><div class="value">${escapeHtml(value.replace(/&&&/g," · "))}</div></div>`;
    }).join("");
    $("detailBody").querySelectorAll(".detail-image-item img").forEach(img => {
      img.addEventListener("error", () => {
        if (state.view === "inventar") fallbackInventoryImage(img);
        else { img.closest("figure")?.classList.add("image-missing"); img.style.display = "none"; }
      });
    });
    $("detailBody").querySelectorAll(".image-preview-button").forEach(button => {
      button.addEventListener("click", () => {
        const img = button.querySelector("img");
        if (img && !button.closest("figure")?.classList.contains("image-missing")) showImagePreview(img.currentSrc || img.src, img.alt);
      });
    });
    $("detailDialog").showModal();
  }
  function openEditor(record=null) {
    state.isNew=!record;
    state.selectedId=record?.__rowKey ?? null;
    const config=cfg();
    $("dialogEyebrow").textContent=record ? `ID ${record.id || "–"}` : "NEUER EINTRAG";
    $("dialogTitle").textContent=record ? `${config.label.slice(0,-1) || config.label} bearbeiten` : `Neuer Eintrag: ${config.label}`;
    const columns=config.columns;
    $("formFields").innerHTML=columns.map((field,i)=>{
      const value=record?.[field] ?? "";
      const isId=field==="id";
      const long=fieldIsLong(field,value) || ["Material","Dokumente","Bild","GBU_Themen","Thm_An"].includes(field);
      const cls=long?"field full":"field";
      const label=`<label for="f_${i}">${escapeHtml(field)}${isId?' <small>(Kennung)</small>':""}</label>`;
      const input=long ? `<textarea id="f_${i}" name="${escapeHtml(field)}" ${isId&&record?"readonly":""}>${escapeHtml(value)}</textarea>` : `<input id="f_${i}" name="${escapeHtml(field)}" value="${escapeHtml(value)}" ${isId&&record?"readonly":""} ${field==="id"?"required":""}>`;
      return `<div class="${cls}">${label}${input}${["Bild","Dokumente","Geraetekarte"].includes(field)?`<small>Dateinamen wie in der CSV eintragen; Dateien selbst werden nicht auf den Server hochgeladen.</small>`:""}</div>`;
    }).join("");
    $("entryDialog").showModal();
  }
  function persistCurrent() {
    try { localStorage.setItem(storageKey(state.view),JSON.stringify(records())); }
    catch { /* Manche Browser erlauben localStorage nicht für file://-Seiten. */ }
    state.changed[state.view]=true;
    render();
  }
  function makeKey(record) { return `${text(record.id)||"row"}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`; }
  function saveForm(event) {
    event.preventDefault();
    const config=cfg(); const data={};
    config.columns.forEach(field=>{const input=$("entryForm").elements.namedItem(field);data[field]=input ? input.value.trim() : "";});
    if(!data.id) { showNotice("Bitte eine ID/Kennung eintragen.",true); return; }
    if(state.isNew && records().some(r=>text(r.id)===text(data.id))) {
      showNotice(`Die ID ${data.id} ist bereits vorhanden.`,true); return;
    }
    if(state.isNew) { data.__rowKey=makeKey(data); records().unshift(data); }
    else {
      const index=records().findIndex(r=>String(r.__rowKey)===String(state.selectedId));
      if(index<0) { showNotice("Der Eintrag wurde nicht gefunden.",true); return; }
      data.__rowKey=records()[index].__rowKey; records()[index]=data;
    }
    persistCurrent(); $("entryDialog").close(); $("detailDialog").close();
    showNotice(state.isNew ? "Eintrag lokal angelegt." : "Änderungen lokal gespeichert.");
  }
  function deleteSelected() {
    const record=findByKey(state.selectedId); if(!record) return;
    if(!confirm(`Eintrag „${titleOf(record)}“ (ID ${record.id}) lokal löschen?`)) return;
    state.records[state.view]=records().filter(r=>String(r.__rowKey)!==String(state.selectedId));
    persistCurrent(); $("detailDialog").close(); showNotice("Eintrag lokal gelöscht. CSV exportieren, um die Änderung zu sichern.");
  }
  function exportCSV() {
    const headers=state.originals[state.view]?.headers?.length ? state.originals[state.view].headers : cfg().columns;
    const csv=serializeCSV(headers,records());
    const blob=new Blob([csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob); const a=document.createElement("a");
    a.href=url; a.download=cfg().file; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    showNotice(`${cfg().file} wurde exportiert.`);
  }
  function identifyDataset(fileName, headers) {
    const normalized = String(fileName || "").toLocaleLowerCase("de");
    const byName = Object.keys(DATASETS).find(view => normalized === DATASETS[view].file.toLocaleLowerCase("de"));
    if (byName) return byName;
    return Object.keys(DATASETS).find(view => DATASETS[view].columns.every(column => headers.includes(column))) || null;
  }
  async function importCSVFiles(files) {
    let imported = 0;
    const errors = [];
    for (const file of files) {
      try {
        const parsed = parseCSV(await file.text());
        if (!parsed.headers.length) throw new Error(`${file.name}: keine Kopfzeile gefunden.`);
        const target = identifyDataset(file.name, parsed.headers);
        if (!target) throw new Error(`${file.name}: CSV-Typ nicht erkannt (erwartet experimente.csv, inventur.csv oder themes.csv).`);
        const missing = DATASETS[target].columns.filter(c => !parsed.headers.includes(c));
        if (missing.length) throw new Error(`${file.name}: fehlende Spalten: ${missing.join(", ")}`);
        state.originals[target] = {headers: parsed.headers, records: parsed.records};
        state.records[target] = parsed.records;
        state.changed[target] = true;
        try { localStorage.setItem(storageKey(target), JSON.stringify(parsed.records)); } catch { /* Export bleibt als Sicherungsweg verfügbar */ }
        imported++;
      } catch (err) { errors.push(err.message || `${file.name}: Import fehlgeschlagen.`); }
    }
    state.search = ""; $("searchInput").value = ""; render();
    if (errors.length) showNotice(`${imported} CSV-Datei(en) geladen. ${errors.join(" ")}`, true);
    else showNotice(`${imported} CSV-Datei(en) erfolgreich geladen.`);
    $("importFile").value = "";
  }
  function switchView(view) {
    if(view !== "sammlungsplan" && !DATASETS[view]) return;
    state.view=view; state.homeSearch=false; state.search=""; $("searchInput").value=""; render();
  }
  document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>switchView(b.dataset.view)));
  $("searchInput").addEventListener("input",e=>{
    state.search=e.target.value;
    if (state.view === "sammlungsplan" && state.search.trim()) {
      state.homeSearch = true;
      state.view = "inventar";
    } else if (state.homeSearch && !state.search.trim()) {
      state.homeSearch = false;
      state.view = "sammlungsplan";
    }
    render();
  });
  $("newBtn").addEventListener("click",()=>openEditor());
  $("importFile").addEventListener("change",e=>{if(e.target.files?.length) importCSVFiles(Array.from(e.target.files));});
  $("entryForm").addEventListener("submit",saveForm);
  $("closeDialog").addEventListener("click",()=>$("entryDialog").close());
  $("cancelBtn").addEventListener("click",()=>$("entryDialog").close());
  $("closeDetail").addEventListener("click",()=>$("detailDialog").close());
  window.addEventListener("keydown",e=>{if(e.key==="/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){e.preventDefault();$("searchInput").focus();}});
  Promise.all(Object.keys(DATASETS).map(loadDataset)).then(render).catch(err=>{
    $("content").innerHTML=`<div class="empty-state"><strong>CSV-Daten konnten nicht initialisiert werden</strong>${escapeHtml(err.message)}<p>Du kannst die CSV-Dateien über „CSV-Dateien laden“ auswählen.</p></div>`;
    $("resultCount").textContent="Laden fehlgeschlagen";
  });
})();
