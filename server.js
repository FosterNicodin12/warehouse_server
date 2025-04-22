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
  .connect (
    "mongodb+srv://nnicodin:Foster12!@bays.bfvuzjs.mongodb.net/?retryWrites=true&w=majority&appName=Bays"
  )
  .then(() => {
    console.log("connect to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb",error);
  });

  const baySchema = new mongoose.Schema({
    bay_number: String,
    company: String,
    picture: String,
    container_number: String,
    is_full: Boolean,
    contents: String,
  });

  const Bay = mongoose.model("Bay",baySchema);



app.get("/",(req, res)=>{
  res.sendFile(__dirname+"/index.html");
});

  app.get("/api/bays", async (req, res) => {
    const bays = await Bay.find();
    res.send(bays);
    console.log(bays);
});

app.post("/api/bays", upload.single("img"),async(req,res)=>{
  const result = validateBay(req.body);

  if(result.error){
      console.log("I have an error");
      res.status(400).send(result.error.deatils[0].message);
      return;
  }

  const bay = new Bay ({
    bay_number : req.body.bay_number,
    company : req.body.company,
    container_number : req.body.container_number,
    is_full : req.body.is_full === 'true',
    contents : req.body.contents,
  });

  if (req.file) {
    bay.picture = req.file.filename;
}

  const newBay = await bay.save();
  res.status(200).send(newBay);
});

app.put("/api/bays/:bay_number", upload.single("picture"), async (req, res) => {

  const result = validateBay(req.body);

  if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
  }

  const fieldsToUpdate = {
    bay_number:req.body.bay_number,
    company:req.body.company,
    container_number:req.body.contianer_number,
    is_full : req.body.is_full === 'true',
    contents : req.body.contents,
  }

  if (req.file) {
      fieldsToUpdate.picture = req.file.filename;
  }

  const wentThrough = await Bay.updateOne({bay_number:req.params.bay_number}, fieldsToUpdate);
  const bay = await Bay.findOne({bay_number:req.params.bay_number});


  const newBay = await bay.save();
  res.status(200).send(newBay);
});


app.delete("/api/bays/:bay_number", async (req, res) => {
  const bay = await House.findByIdAndDelete(req.params.bay_number);
  res.status(200).send(bay);
});

const validateBay = (bay) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        bay_number: Joi.string().min(1).required(),
        company: Joi.string().allow(""),
        container_number: Joi.string().allow(""),
        is_full: Joi.string().valid("true", "false").required(),
        contents: Joi.string().allow(""),
        picture: Joi.string().allow(""),
    });
    return schema.validate(bay);
};

app.listen(3001, () => {
    console.log("I'm listening");
});
