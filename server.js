import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// =============================
// Données mock (remplaçable DB)
// =============================
const malls = [
  {
    id: 1,
    name: "Morocco Mall",
    city: "Casablanca",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Morocco_Mall_Casablanca.jpg",
    location: {
      address: "Boulevard de Biarritz, Casablanca, Maroc",
      lat: 33.5731,
      lng: -7.7076
    },
    stores: [
      "Zara",
      "H&M",
      "Nike",
      "Adidas",
      "Apple Store",
      "Sephora",
      "Pull&Bear",
      "Bershka"
    ]
  },
  {
    id: 2,
    name: "Anfaplace Shopping Center",
    city: "Casablanca",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Anfaplace_Casablanca.jpg",
    location: {
      address: "Boulevard de la Corniche, Casablanca, Maroc",
      lat: 33.5992,
      lng: -7.6647
    },
    stores: [
      "Mango",
      "Calvin Klein",
      "Foot Locker",
      "Starbucks",
      "Guess"
    ]
  },
  {
    id: 3,
    name: "Mega Mall",
    city: "Rabat",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Mega_Mall_Rabat.jpg",
    location: {
      address: "Avenue Mohamed VI, Rabat, Maroc",
      lat: 34.0209,
      lng: -6.8416
    },
    stores: [
      "Bershka",
      "Samsung",
      "Adidas",
      "LC Waikiki",
      "Carrefour"
    ]
  },
  {
    id: 4,
    name: "Menara Mall",
    city: "Marrakech",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Menara_Mall_Marrakech.jpg",
    location: {
      address: "Avenue Mohammed VI, Marrakech, Maroc",
      lat: 31.6145,
      lng: -8.0216
    },
    stores: [
      "Zara",
      "H&M",
      "Puma",
      "KFC",
      "Celio"
    ]
  },
  {
    id: 5,
    name: "Tanger City Mall",
    city: "Tanger",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Tanger_City_Mall.jpg",
    location: {
      address: "Route de Malabata, Tanger, Maroc",
      lat: 35.7733,
      lng: -5.7766
    },
    stores: [
      "Nike",
      "Adidas",
      "Defacto",
      "Starbucks",
      "Carrefour Market"
    ]
  }
];

// =============================
// Routes API
// =============================

// Health check (Azure)
app.get("/", (req, res) => {
  res.json({
    status: "API Malls Maroc running",
    version: "1.0.0"
  });
});

// GET tous les malls
app.get("/api/malls", (req, res) => {
  res.json(malls);
});

// GET mall par ID
app.get("/api/malls/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const mall = malls.find(m => m.id === id);

  if (!mall) {
    return res.status(404).json({ message: "Mall non trouvé" });
  }

  res.json(mall);
});

// Filtre par ville
app.get("/api/city/:city", (req, res) => {
  const city = req.params.city.toLowerCase();
  const filtered = malls.filter(
    m => m.city.toLowerCase() === city
  );

  res.json(filtered);
});

// =============================
// Start server
// =============================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
