/* =====================================================================
   Webtechnologien · Übungsblatt 04 — MUSTERLÖSUNG (Aufgaben A–H)
   ---------------------------------------------------------------------
   In Blatt 03 war dies das "Gehirn" der Todo-Liste, dessen Ausgabe in
   der Konsole landete. Jetzt bekommt es ein Gesicht: Dieselben Daten und
   Funktionen, aber renderTodos() zeichnet die Liste auf die Seite, und
   über Events (Klicks) bedient der Nutzer die App.

   Das Muster dahinter ist einfach:
     Daten ändern  ->  renderTodos() aufrufen  ->  Seite spiegelt die Daten.
   ===================================================================== */


/* --- 1) Daten (unverändert aus Blatt 03) ----------------------------- */

// Liste von Todos. Jedes Todo ist ein Objekt: { text, erledigt }.
let todos = [];


/* --- 2) Referenzen auf die HTML-Elemente (Aufgabe C) ----------------- */

// Einmal oben die "Griffe" an unsere Oberfläche holen und merken.
const input  = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const list   = document.querySelector("#todo-list");
const status = document.querySelector("#status");


/* --- 3) Logik (unverändert aus Blatt 03) ----------------------------- */

// Fügt ein neues Todo ans Ende der Liste hinzu.
function addTodo(text) {
  let neuesTodo = {
    text: text,
    erledigt: false   // ein neues Todo ist am Anfang nie erledigt
  };
  todos.push(neuesTodo);
}

// Schaltet ein Todo um: offen <-> erledigt.
function toggleTodo(index) {
  let todo = todos[index];
  todo.erledigt = !todo.erledigt;   // das ! dreht den Boolean-Wert um
}


/* --- 4) Anzeige: aus den Daten die Seite bauen (Aufgaben E + H) ------ */

// Zeichnet die komplette Liste neu. Strategie: erst alles wegräumen,
// dann für jedes Todo eine frische <li>-Zeile bauen und einhängen.
function renderTodos() {
  // 1) alte Anzeige leeren
  list.innerHTML = "";

  // Zähler für die Statuszeile
  let offen = 0;

  // 2) für jedes Todo eine Zeile bauen (dieselbe Schleife wie in Blatt 03)
  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];

    // Element erstellen und befüllen
    let li = document.createElement("li");
    li.textContent = todo.text;

    // erledigte Todos bekommen die CSS-Klasse "done" (durchgestrichen)
    if (todo.erledigt) {
      li.classList.add("done");
    } else {
      offen++;
    }

    // Klick auf diese Zeile schaltet ihren Zustand um.
    // Dank "let i" merkt sich jede Zeile ihren eigenen Index.
    li.addEventListener("click", function () {
      toggleTodo(i);
      renderTodos();
    });

    // Element in die <ul> einhängen -> jetzt ist es sichtbar
    list.append(li);
  }

  // 3) Statuszeile aktualisieren
  if (todos.length === 0) {
    status.textContent = "Deine Liste ist leer.";
  } else {
    let erledigt = todos.length - offen;
    status.textContent = erledigt + " von " + todos.length + " erledigt";
  }
}


/* --- 5) Events: die Seite reagiert (Aufgaben F + G) ------------------- */

// Klick auf "Hinzufügen": Text lesen, neues Todo anlegen, Feld leeren,
// Anzeige aktualisieren.
addBtn.addEventListener("click", function () {
  let text = input.value;

  // leere (oder nur aus Leerzeichen bestehende) Eingabe abfangen
  if (text.trim() === "") {
    return;
  }

  addTodo(text);
  input.value = "";   // Feld wieder leeren
  renderTodos();      // Anzeige aktualisieren
});


/* --- 6) Erstes Zeichnen beim Laden der Seite ------------------------- */

// Beim Start ist die Liste leer; renderTodos() zeigt dann den Hinweistext.
renderTodos();
