/* =====================================================================
   Webtechnologien · Übungsblatt 03 — MUSTERLÖSUNG (Aufgabe J)
   ---------------------------------------------------------------------
   Das ist das "Gehirn" unserer Todo-Liste: die komplette Logik,
   aber noch OHNE Oberfläche. Die Ausgabe erscheint in der Konsole.
   Die Bedienung über die Webseite (Eingabefeld, Buttons) bauen wir
   erst in JavaScript II dazu – dann bekommt dieses Gehirn ein Gesicht.

   ▸ Zum Ausprobieren: in der HTML-Datei (blatt3/index.html) ganz unten
     das  src="js/script.js"  auf  src="js/script.solution.js"  ändern
     und die Seite neu laden. Tu das aber erst, wenn du es selbst
     versucht hast – Selbermachen ist hier das halbe Lernen.
   ===================================================================== */


// Unsere Daten: eine Liste (Array) von Todos.
// Jedes Todo ist ein Objekt mit zwei Eigenschaften:
//   text     – was zu tun ist            (String)
//   erledigt – ob es schon erledigt ist  (Boolean: true / false)
// Die Namen "text" und "erledigt" haben wir selbst gewählt.
let todos = [];


// Fügt ein neues Todo ans Ende der Liste hinzu.
function addTodo(text) {
  let neuesTodo = {
    text: text,
    erledigt: false   // ein neues Todo ist am Anfang nie erledigt
  };
  todos.push(neuesTodo);   // .push() hängt etwas hinten an das Array an
}


// Schaltet ein Todo um: offen -> erledigt bzw. erledigt -> offen.
// index ist die Position in der Liste (das erste Todo hat den Index 0).
function toggleTodo(index) {
  let todo = todos[index];          // das Todo an dieser Position
  todo.erledigt = !todo.erledigt;   // das ! dreht den Boolean-Wert um
}


// Gibt die ganze Liste in der Konsole aus.
function renderTodos() {
  // Sonderfall zuerst: leere Liste
  if (todos.length === 0) {
    console.log("Deine Liste ist leer.");
    return;   // mit return ist die Funktion hier zu Ende
  }

  console.log("--- Deine Todos ---");

  // Wir gehen die Liste Eintrag für Eintrag durch.
  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];

    // Kästchen je nach Zustand wählen:
    let box;
    if (todo.erledigt) {
      box = "[x]";
    } else {
      box = "[ ]";
    }

    // Ergibt z.B. die Zeile:  "0: [ ] Einkaufen gehen"
    console.log(`${i}: ${box} ${todo.text}`);
  }
}


/* ---------------------------------------------------------------------
   Ausprobieren — diese Zeilen laufen sofort, wenn die Seite lädt.
   Öffne die Konsole, um die Ausgabe zu sehen.
   --------------------------------------------------------------------- */

addTodo("Einkaufen gehen");
addTodo("Übungsblatt anschauen");
addTodo("Pause machen");

renderTodos();

// Den zweiten Eintrag (Index 1) als erledigt markieren ...
toggleTodo(1);

// ... und die Liste noch einmal ausgeben:
renderTodos();
