// Importiere das Express-Framework, das den Server und die Routen verwaltet
import express from "express";
// Importiere das CORS-Paket, um Cross-Origin-Resource-Sharing zu ermöglichen (wichtig für den Zugriff von anderen Domains)
import cors from "cors";

// Erstelle eine neue Express-App, die als Server fungieren wird
const app = express();

// Definiere den Port, auf dem die App laufen soll
const PORT = 5050;

// Middleware hinzufügen: Erlaube CORS für die App, damit sie Anfragen von anderen Domains empfangen kann
app.use(cors());

// Beispielhafte To-Do-Liste, die als Array von Objekten definiert ist
const todos = [
  { id: 1, name: "Milch holen", userId: 1 },    // To-Do für Benutzer mit ID 1
  { id: 2, name: "Brötchen holen", userId: 2 }, // To-Do für Benutzer mit ID 2
  { id: 3, name: "Wasser tragen", userId: 3 },  // To-Do für Benutzer mit ID 3
];

// Definiere eine Route für die Startseite "/".
// Bei einem GET-Request auf "/" sendet der Server die Nachricht "Hello World" als Antwort zurück
app.get("/", function (req, res) {
  res.send("Hello World");
});

// Definiere eine Route "/todos/all" für die gesamte To-Do-Liste
// Bei einem GET-Request auf "/todos/all" sendet der Server das gesamte "todos"-Array als JSON-Daten zurück
app.get("/todos/all", (req, res) => {
  res.json(todos);
});

// Definiere eine Route "/todos/byid", um ein einzelnes To-Do-Element nach ID abzurufen
app.get("/todos/byid", (req, res) => {
  // Hole die ID aus der Anfrage-Query, z. B. { "todoId": "1" }
  const todoId = req.query.todoId;
  console.log("MY TODOID", typeof todoId); // Logge den Typ der Todo-ID (hilfreich für Debugging)
  
  // Falls keine ID übergeben wurde, schicke eine Fehlermeldung zurück
  if (!todoId) res.send("No Todo Id provided");

  // Konvertiere die ID in eine Ganzzahl, damit sie mit den vorhandenen IDs verglichen werden kann
  const todoIdNr = parseInt(todoId);

  // Finde das To-Do-Element, dessen ID der übergebenen ID entspricht
  const todo = todos.find((item) => item.id === todoIdNr);

  // Schicke das gefundene To-Do-Element als JSON zurück
  res.json(todo);
});

// Definiere eine Route "/todos/byuserid", um alle To-Dos eines bestimmten Benutzers abzurufen
app.get("/todos/byuserid", (req, res) => {
  // Hole die Benutzer-ID aus der Anfrage-Query
  const userId = req.query.userId;

  // Falls keine Benutzer-ID übergeben wurde, schicke eine Fehlermeldung zurück
  if (!userId) res.send("No User Id provided");

  // Konvertiere die Benutzer-ID in eine Ganzzahl für den Vergleich
  const userIdNr = parseInt(userId);

  // Filtere die To-Dos und finde die, die zur angegebenen Benutzer-ID gehören
  const userTodos = todos.filter((item) => item.userId === userIdNr);

  // Schicke die gefundenen To-Dos als JSON zurück
  res.json(userTodos);
});

// Starte den Server und lasse ihn auf dem definierten PORT lauschen
app.listen(PORT, () => {
  console.log(`Express App is running on http://localhost:${PORT}`);
});

