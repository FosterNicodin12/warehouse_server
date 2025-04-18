const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/",(req, res)=>{
  res.sendFile(__dirname+"/index.html");
});

const bays = [
  {
    "bay_number": "Pallets",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "open"
  },
  {
    "bay_number": "A1",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "B1",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "C1",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "D1",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "E1",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "F1",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "G1",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "H1",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "I1",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "J1",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "K1",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "Open",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "open"
  },
  {
    "bay_number": "Aisle1",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  },
  {
    "bay_number": "Aisle2",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  },
  {
    "bay_number": "Aisle3",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle4",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle5",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle6",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle7",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle8",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle9",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle10",
    "company": " ",
    "picture": "empty.heic",
    "container_number": "",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle11",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  },
  {
    "bay_number": "Dock 3",
    "company": " ",
    "picture": "dock.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "dock"
  },
  {
    "bay_number": "Aisle12",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  },
  {
    "bay_number": "B2",
    "company": " ",
    "picture": "load2.heic",
    "container_number": "TEST-1342-9",
    "is_full": true,
    "contents": "rack"
  },
  {
    "bay_number": "C2",
    "company": " ",
    "picture": "load4.heic",
    "container_number": "TEST-1342-9",
    "is_full": true,
    "contents": "rack"
  },
  {
    "bay_number": "D2",
    "company": " ",
    "picture": "empty.heic",
    "container_number": "TEST-1342-9",
    "is_full": true,
    "contents": "rack"
  },
  {
    "bay_number": "E2",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "F2",
    "company": " ",
    "picture": "load1.heic",
    "container_number": "TEST-1342-9",
    "is_full": true,
    "contents": "rack"
  },
  {
    "bay_number": "G2",
    "company": " ",
    "picture": "load1.heic",
    "container_number": "TEST-1342-9",
    "is_full": true,
    "contents": "rack"
  },
  {
    "bay_number": "H2",
    "company": " ",
    "picture": "load3.heic",
    "container_number": "TEST-1342-9",
    "is_full": true,
    "contents": "rack"
  },
  {
    "bay_number": "I2",
    "company": " ",
    "picture": "empty.heic",
    "container_number": "",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "J2",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "K2",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "Dock 2",
    "company": " ",
    "picture": "dock.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "dock"
  },
  {
    "bay_number": "Aisle13",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  },
  {
    "bay_number": "B3",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "C3",
    "company": " ",
    "picture": "load1.heic",
    "container_number": "TEST-1342-9",
    "is_full": true,
    "contents": "rack"
  },
  {
    "bay_number": "D3",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "E3",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "F3",
    "company": " ",
    "picture": "load1.heic",
    "container_number": "TEST-1342-9",
    "is_full": true,
    "contents": "rack"
  },
  {
    "bay_number": "G3",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "H3",
    "company": " ",
    "picture": "load4.heic",
    "container_number": "TEST-1342-9",
    "is_full": true,
    "contents": "rack"
  },
  {
    "bay_number": "I3",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "J3",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "rack"
  },
  {
    "bay_number": "K3",
    "company": " ",
    "picture": "load2.heic",
    "container_number": "TEST-1342-9",
    "is_full": true,
    "contents": "rack"
  },
  {
    "bay_number": "Dock 1",
    "company": " ",
    "picture": "dock.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "dock"
  },
  {
    "bay_number": "Aisle14",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  },
  {
    "bay_number": "Aisle15",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle16",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle17",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle18",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle19",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle20",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle21",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle22",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle23",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  }, {
    "bay_number": "Aisle24",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "aisle"
  },
  {
    "bay_number": "Open1",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "open"
  }, {
    "bay_number": "Open2",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "open"
  }, {
    "bay_number": "Open3",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "open"
  }, {
    "bay_number": "Open4",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "open"
  }, {
    "bay_number": "Open5",
    "company": " ",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "open"
  },
  {
    "bay_number": "Office 1",
    "company": "Administrative",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "office"
  },
  {
    "bay_number": "Office 2",
    "company": "Logistics",
    "picture": "empty.heic",
    "container_number": " ",
    "is_full": false,
    "contents": "office"
  },
  {
    "bay_number": "G4",
    "company": " ",
    "picture": "load3.heic",
    "container_number": "MTSU-4124-1",
    "is_full": true,
    "contents": "rack"
  },
    {
      "bay_number": "H4",
      "company": " ",
      "picture": "load2.heic",
      "container_number": "MTSU-8704-6",
      "is_full": true,
      "contents": "rack"
    },
    {
      "bay_number": "I4",
      "company": " ",
      "picture": "load3.heic",
      "container_number": "XMRU-1234-6",
      "is_full": true,
      "contents": "rack"
    },
    {
      "bay_number": "J4",
      "company": " ",
      "picture": "load1.heic",
      "container_number": "TEST-1342-9",
      "is_full": true,
      "contents": "rack"
    },
    {
      "bay_number": "K4",
      "company": " ",
      "picture": "empty.heic",
      "container_number": " ",
      "is_full": false,
      "contents": "rack"
    }
  
  ];

  app.get("/api/bays", (req, res) => {
    res.send(bays);
});

app.put("/api/bays/:bay_number", upload.single("picture"), (req, res) => { // Changed route parameter to :bay_number
  console.log("Attempting to update bay number:", req.params.bay_number);
  console.log("Request body:", req.body);
  const bay = bays.find((b) => b.bay_number === req.params.bay_number); // Finding by bay_number

  if (!bay) {
      res.status(404).send(`The bay with bay_number ${req.params.bay_number} was not found`);
      return;
  }

  const result = validateBay(req.body);

  if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
  }

  bay.bay_number = req.body.bay_number;
  bay.company = req.body.company;
  bay.container_number = req.body.container_number;
  bay.is_full = req.body.is_full === 'true';
  bay.contents = req.body.contents;

  if (req.file) {
      bay.picture = req.file.filename;
  }

  res.status(200).send(bay);
});

app.put("/api/bays/:bay_number", upload.single("picture"), (req, res) => {
  console.log("--- EDIT BAY REQUEST ---");
  console.log("Attempting to update bay number:", req.params.bay_number);
  console.log("Request body:", req.body);
  console.log("Current bays array before update:", JSON.stringify(bays, null, 2));

  const bayIndex = bays.findIndex((b) => b.bay_number === req.params.bay_number);

  if (bayIndex === -1) {
      console.log(`Error: Bay with bay_number ${req.params.bay_number} not found.`);
      res.status(404).send(`The bay with bay_number ${req.params.bay_number} was not found`);
      return;
  }

  const result = validateBay(req.body);

  if (result.error) {
      console.log("Validation error:", result.error.details);
      res.status(400).send(result.error.details[0].message);
      return;
  }

  // Update the bay object directly using the index
  bays[bayIndex].bay_number = req.body.bay_number; // While usually the identifier, allow update
  bays[bayIndex].company = req.body.company;
  bays[bayIndex].container_number = req.body.container_number;
  bays[bayIndex].is_full = req.body.is_full === 'true';
  bays[bayIndex].contents = req.body.contents;

  if (req.file) {
      console.log("Updating picture:", req.file.originalname);
      bays[bayIndex].picture = req.file.originalname;
  } else {
      console.log("Picture not updated.");
  }

  console.log("Updated bays array after update:", JSON.stringify(bays, null, 2));
  res.status(200).send(bays[bayIndex]);
});

app.delete("/api/bays/:bay_number", (req, res) => {
  console.log("Attempting to delete bay number:", req.params.bay_number);
  console.log("Current bays array:", JSON.stringify(bays, null, 2)); // Log the array with formatting
  const bay = bays.find((b) => b.bay_number === req.params.bay_number);
  if (!bay) {
      console.log("Bay not found with bay_number:", req.params.bay_number);
      res.status(404).send("The bay with the provided bay_number was not found");
      return;
  }
  console.log("YAY You found me:", bay.bay_number);
  const index = bays.indexOf(bay);
  bays.splice(index, 1);
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
