const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./db"); // Importamos el nuevo pool de Postgres

const app = express();

app.use(cors());
app.use(express.json());
app.use('/img', express.static(path.join(__dirname, 'img')));

// --- Rutas ---

// Obtener productos
app.get("/productos", async (req, res) => {
  try {
    // En Postgres usamos .query y los resultados están en .rows
    const result = await pool.query("SELECT * FROM productos");
    res.json(result.rows); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos de Postgres" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { usuario, password } = req.body;
  try {
    // Usamos parámetros posicionales ($1, $2) por seguridad
    const result = await pool.query(
      'SELECT nombre FROM usuarios WHERE nombre = $1 AND password = $2',
      [usuario, password]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, nombre: result.rows[0].nombre });
    } else {
      res.status(401).json({ success: false, message: "Usuario o clave incorrecta" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});