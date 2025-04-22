const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://nnicodin:Foster12!@bays.bfvuzjs.mongodb.net/?retryWrites=true&w=majority&appName=Bays"
  )
  .then(() => {
    console.log("connect to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb", error);
  });

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(null, false); // Reject invalid file types
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Mongoose Schema and Model
const baySchema = new mongoose.Schema({
  bay_number: { type: String, required: true, unique: true }, // Added required and unique
  company: String,
  picture: String,
  container_number: String,
  is_full: { type: Boolean, required: true }, // Added required
  contents: String,
});

const Bay = mongoose.model("Bay", baySchema);

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/bays", async (req, res) => {
  try {
    const bays = await Bay.find();
    res.status(200).send(bays);
  } catch (error) {
    console.error("GET /api/bays error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/bays", upload.single("img"), async (req, res) => {
  const result = validateBay(req.body);
  if (result.error) {
    console.error("POST /api/bays validation error:", result.error);
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const bay = new Bay({
    bay_number: req.body.bay_number,
    company: req.body.company,
    container_number: req.body.container_number,
    is_full: req.body.is_full === "true",
    contents: req.body.contents,
  });

  if (req.file) {
    bay.picture = req.file.filename;
  }

  try {
    const newBay = await bay.save();
    res.status(201).send(newBay);
  } catch (error) {
    console.error("POST /api/bays save error:", error);
    if (error.code === 11000) {
      res.status(400).send("Bay number already exists.");
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
});

app.put("/api/bays/:bay_number", upload.single("img"), async (req, res) => {
  const result = validateBay(req.body);
  if (result.error) {
    console.error("PUT /api/bays/:bay_number validation error:", result.error);
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const fieldsToUpdate = {
    company: req.body.company,
    container_number: req.body.container_number,
    is_full: req.body.is_full === "true",
    contents: req.body.contents,
  };

  if (req.file) {
    fieldsToUpdate.picture = req.file.filename;
  }

  try {
    const updatedBay = await Bay.findOneAndUpdate(
      { bay_number: req.params.bay_number }, // Use bay_number to find
      fieldsToUpdate,
      { new: true, runValidators: true } // Return updated and run validation
    );
    if (!updatedBay) {
      console.error("PUT /api/bays/:bay_number: Bay not found");
      return res.status(404).send("Bay not found");
    }
    res.status(200).send(updatedBay);
  } catch (error) {
    console.error("PUT /api/bays/:bay_number update error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/bays/:bay_number", async (req, res) => {
  try {
    const deletedBay = await Bay.findOneAndDelete({
      bay_number: req.params.bay_number,
    });
    if (!deletedBay) {
      console.error("DELETE /api/bays/:bay_number: Bay not found");
      return res.status(404).send("Bay not found");
    }
    res.status(200).send(deletedBay);
  } catch (error) {
    console.error("DELETE /api/bays/:bay_number delete error:", error);
    res.status(500).send("Internal Server Error");
  }
});

const validateBay = (bay) => {
  const schema = Joi.object({
    bay_number: Joi.string().min(1).required(),
    company: Joi.string().allow(""),
    container_number: Joi.string().allow(""),
    is_full: Joi.string().valid("true", "false").required(),
    contents: Joi.string().allow(""),
  });
  return schema.validate(bay);
};

// Error handling middleware (example)
app.use((err, req, res, next) => {
  console.error("Global error handler:", err); // Log the error
  if (err instanceof multer.MulterError) {
    res.status(400).send(err.message);
  } else {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3001, () => {
  console.log("I'm listening");
});
