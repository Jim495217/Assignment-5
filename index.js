// index.js
import express from "express";

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Temporary in-memory array to store menu items
let menu = [
  {
    id: 1,
    name: "Cheeseburger",
    description: "A delicious cheeseburger with lettuce, tomato, and pickles.",
    price: 9.99,
    category: "entree",
    ingredients: ["beef", "cheese", "bun", "lettuce", "tomato", "pickles"],
    available: true,
  },
  {
    id: 2,
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake slice.",
    price: 4.5,
    category: "dessert",
    ingredients: ["chocolate", "flour", "sugar", "eggs"],
    available: true,
  },
];

// ------------------------------------------------------
// GET /api/menu  → Retrieve all menu items
// ------------------------------------------------------
app.get("/api/menu", (req, res) => {
  res.status(200).json(menu);
});

// ------------------------------------------------------
// GET /api/menu/:id  → Retrieve a specific menu item
// ------------------------------------------------------
app.get("/api/menu/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = menu.find((m) => m.id === id);

  if (!item) {
    return res.status(404).json({ error: "Menu item not found" });
  }

  res.status(200).json(item);
});

// ------------------------------------------------------
// POST /api/menu  → Add a new menu item
// ------------------------------------------------------
app.post("/api/menu", (req, res) => {
  const newItem = { id: menu.length + 1, ...req.body };
  menu.push(newItem);
  res.status(201).json(newItem);
});

// ------------------------------------------------------
// PUT /api/menu/:id  → Update a menu item
// ------------------------------------------------------
app.put("/api/menu/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = menu.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Menu item not found" });
  }

  menu[index] = { ...menu[index], ...req.body };
  res.status(200).json(menu[index]);
});

// ------------------------------------------------------
// DELETE /api/menu/:id  → Remove a menu item
// ------------------------------------------------------
app.delete("/api/menu/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = menu.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Menu item not found" });
  }

  menu.splice(index, 1);
  res.status(200).json({ message: "Menu item deleted" });
});

// ------------------------------------------------------
// Start the server
// ------------------------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
