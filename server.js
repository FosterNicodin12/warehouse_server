const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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

const baySchema = new mongoose.Schema({
  bay_number: String,
  company: String,
  picture: String,
  container_number: String,
  is_full: Boolean, // Changed to Boolean
  contents: String,
});

const Bay = mongoose.model("Bay", baySchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/bays", async (req, res) => {
  const bays = await Bay.find();
  res.send(bays);
  console.log(bays);
});

app.post("/api/bays", upload.single("picture"), async (req, res) => {
  try {
    const result = validateBay(req.body);

    if (result.error) {
      console.log("Validation Error:", result.error.details);
      return res.status(400).send(result.error.details[0].message);
    }

    const bayData = {
      bay_number: req.body.bay_number,
      company: req.body.company,
      container_number: req.body.container_number,
      is_full: req.body.is_full,
      contents: req.body.contents === undefined ? "rack" : req.body.contents,
    };

    const bay = new Bay(bayData);

    if (req.file) {
      bay.picture = req.file.filename;
    }

    const newBay = await bay.save();
    console.log("New bay saved successfully:", newBay);
    res.status(200).send(newBay);
    console.log("Response sent:", newBay);
  } catch (error) {
    console.error("Error adding bay:", error);
    res.status(500).send(error.message || "Internal Server Error");
  }
});

app.put("/api/bays/:bay_number", upload.single("picture"), async (req, res) => {
  console.log(`Received PUT request for bay number: ${req.params.bay_number}`);
  console.log("Request Body:", req.body);
  if (req.file) {
    console.log("Uploaded File:", req.file);
  } else {
    console.log("No file uploaded.");
  }

  const result = validateBay(req.body);
  if (result.error) {
    console.log("Validation Error:", result.error.details);
    return res.status(400).send(result.error.details[0].message);
  }

  const fieldsToUpdate = {
    company: req.body.company,
    container_number: req.body.container_number,
    is_full: req.body.is_full,
    contents: req.body.contents,
  };

  if (req.file) {
    fieldsToUpdate.picture = req.file.filename;
  }

  try {
    const updateResult = await Bay.updateOne(
      { bay_number: req.params.bay_number },
      fieldsToUpdate
    );
    console.log("Update Result:", updateResult);

    const bay = await Bay.findOne({ bay_number: req.params.bay_number });
    console.log("Found Bay after update:", bay);

    res.status(200).send(bay);
    console.log("Response sent (PUT):", bay);
  } catch (error) {
    console.error("Error updating bay:", error);
    res.status(500).send(error.message || "Internal Server Error");
  } finally {
    console.log("Finally block executed after /api/bays PUT");
  }
});

app.put("/api/bays/:bay_number", upload.single("picture"), async (req, res) => {
  const result = validateBay(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const fieldsToUpdate = {
    bay_number: req.body.bay_number,
    company: req.body.company,
    container_number: req.body.container_number,
    is_full: req.body.is_full,
    contents: req.body.contents,
  };

  if (req.file) {
    fieldsToUpdate.picture = req.file.filename;
  }

  await Bay.updateOne({ bay_number: req.params.bay_number }, fieldsToUpdate);
  const bay = await Bay.findOne({ bay_number: req.params.bay_number });


  res.status(200).send(bay);
});

app.delete("/api/bays/:bay_number", async (req, res) => {
  const bay = await Bay.findOneAndDelete({ bay_number: req.params.bay_number });
  res.status(200).send(bay);
});

const validateBay = (bay) => {
  const schema = Joi.object({
    bay_number: Joi.string().min(1).required(),
    company: Joi.string().allow(""),
    container_number: Joi.string().allow(""),
    is_full: Joi.boolean().required(), // Changed to Joi.boolean()
    contents: Joi.string().allow(""),
    picture: Joi.string().allow(""),
  });
  return schema.validate(bay);
};

app.listen(3001, () => {
  console.log("I'm listening");
});
