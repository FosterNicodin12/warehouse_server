const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");

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
    cb(new Error("Invalid file type. Only images are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

const baySchema = new mongoose.Schema({
  bay_number: String,
  company: String,
  picture: String,
  container_number: String,
  is_full: Boolean,
  contents: String,
});

const Bay = mongoose.model("Bay", baySchema);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/bays", async (req, res) => {
  try {
    const bays = await Bay.find();
    res.status(200).send(bays);
  } catch (error) {
    console.error("Error fetching bays:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/bays", upload.single("img"), async (req, res) => {
  const result = validateBay(req.body);

  if (result.error) {
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
    res.status(201).send(newBay); // Use 201 for successful creation
  } catch (error) {
    console.error("Error creating bay:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/api/bays/:bay_number", upload.single("picture"), async (req, res) => {
  const result = validateBay(req.body);

  if (result.error) {
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
      { bay_number: req.params.bay_number },  // Use findOneAndUpdate
      fieldsToUpdate,
      { new: true } // Return the updated document
    );
        if (!updatedBay) {
          return res.status(404).send("Bay not found");
        }
    res.status(200).send(updatedBay);
  } catch (error) {
    console.error("Error updating bay:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/bays/:bay_number", async (req, res) => {
  try {
        const deletedBay = await Bay.findOneAndDelete({ bay_number: req.params.bay_number });
        if (!deletedBay) {
             return res.status(404).send("Bay not found");
        }
    res.status(200).send(deletedBay);
  } catch (error) {
    console.error("Error deleting bay:", error);
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
  console.error(err); // Log the error
  if (err instanceof multer.MulterError) {
    res.status(400).send(err.message);
  } else {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3001, () => {
  console.log("I'm listening");
});