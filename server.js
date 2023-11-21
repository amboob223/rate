const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const multer = require("multer");
const path = require("path");

// Middleware
app.use(cors());
app.use(express.json());

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Set the filename to be unique using the current timestamp
  },
});

const upload = multer({ storage: storage });

// Endpoint for handling text data
app.post("/rate/text", async (req, res) => {
  try {
    const { name, age, status, intrest } = req.body;

    // Check that the column names and data types match your database schema
    const result = await pool.query(
      "INSERT INTO date (name, age, status, intrest) VALUES($1, $2, $3, $4) RETURNING id",
      [name, age, status, intrest]
    );

    res.json({ id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for handling image data
app.post("/rate/image", upload.single("pic"), async (req, res) => {
  try {
    const { id } = req.body; // this is convention the id keeps track of text and file info
    const picFileName = req.file ? req.file.filename : null; // Use null if no file is uploaded

    // Update the record in the database with the image filename
    await pool.query(
      "UPDATE date SET pic = $1 WHERE id = $2 RETURNING *",
      [picFileName, id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint for retrieving data
app.get("/rate/text", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM date;");
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
