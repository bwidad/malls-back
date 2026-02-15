// server.js
// Node LTS 22

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Base de données mock (en mémoire)
const malls = [
  {
    id: 1,
    name: "Morocco Mall",
    city: "Casablanca",
    address: "Boulevard de l'Océan Atlantique",
    stores: ["Zara","H&M","Nike","Adidas","Apple Store","Sephora","Pull&Bear","Bershka","Massimo Dutti"]
  },
  {
    id: 2,
    name: "Anfaplace Shopping Center",
    city: "Casablanca",
    address: "Boulevard de la Corniche",
    stores: ["Mango","Calvin Klein","Foot Locker","Starbucks","Stradivarius","Guess"]
  },
  {
    id: 3,
    name: "Mega Mall",
    city: "Rabat",
    address: "Avenue Mohammed VI",
    stores: ["Bershka","Adidas","Samsung","LC Waikiki","Carrefour"]
  },
  {
    id: 4,
    name: "Menara Mall",
    city: "Marrakech",
    address: "Avenue Mohammed VI",
    stores: ["H&M","Zara","Puma","KFC","McDonald's","Celio"]
  },
  {
    id: 5,
    name: "Tanger City Mall",
    city: "Tanger",
    address: "Route de Malabata",
    stores: ["Defacto","Nike","Adidas","Starbucks","Carrefour Market"]
  }
];

// GET /api/malls
// Supporte filtres ?city= & ?search=
app.get("/api/malls", (req, res) => {
  const { city, search } = req.query;

  let result = [...malls];

  if (city) {
    result = result.filter(m => 
      m.city.toLowerCase() === city.toLowerCase()
    );
  }

  if (search) {
    result = result.filter(m => 
      m.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // On retourne un résumé + nombre de magasins
  const response = result.map(m => ({
    id: m.id,
    name: m.name,
    city: m.city,
    address: m.address,
    storeCount: m.stores.length
  }));

  res.json(response);
});

// GET /api/malls/:id
// Retourne le détail + liste des magasins
app.get("/api/malls/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const mall = malls.find(m => m.id === id);

  if (!mall) {
    return res.status(404).json({ message: "Mall not found" });
  }

  res.json({
    id: mall.id,
    name: mall.name,
    city: mall.city,
    address: mall.address,
    storeCount: mall.stores.length,
    stores: mall.stores
  });
});

// Health check
app.get("/", (req, res) => {
  res.send("API Malls Maroc is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
