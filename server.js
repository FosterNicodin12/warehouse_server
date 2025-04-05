const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/",(req, res)=>{
  res.sendFile(__dirname+"/index.html");
});

let bays = [[
    {
      "bay_number": "Pallets",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "open"
    },
    {
      "bay_number": "A1",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "B1",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "C1",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "D1",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "E1",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "F1",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "G1",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "H1",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "I1",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "J1",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "K1",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "Open",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "open"
    },
    {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },
    {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },
    {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },
    {
      "bay_number": "Dock 3",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "dock"
    },
    {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },
    {
      "bay_number": "B2",
      "company": "",
      "picture": "",
      "container_number": "TEST-1342-9",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "C2",
      "company": "",
      "picture": "",
      "container_number": "TEST-1342-9",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "D2",
      "company": "",
      "picture": "",
      "container_number": "TEST-1342-9",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "E2",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "F2",
      "company": "",
      "picture": "",
      "container_number": "TEST-1342-9",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "G2",
      "company": "",
      "picture": "",
      "container_number": "TEST-1342-9",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "H2",
      "company": "",
      "picture": "",
      "container_number": "TEST-1342-9",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "I2",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "J2",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "K2",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "Dock 2",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "dock"
    },
    {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },
    {
      "bay_number": "B3",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "C3",
      "company": "",
      "picture": "",
      "container_number": "TEST-1342-9",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "D3",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "E3",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "F3",
      "company": "",
      "picture": "",
      "container_number": "TEST-1342-9",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "G3",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "H3",
      "company": "",
      "picture": "",
      "container_number": "TEST-1342-9",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "I3",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "J3",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "K3",
      "company": "",
      "picture": "",
      "container_number": "TEST-1342-9",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "Dock 1",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "dock"
    },
    {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },
    {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },  {
      "bay_number": "Aisle",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "aisle"
    },
    {
      "bay_number": "Open",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "open"
    },{
      "bay_number": "Open",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "open"
    },{
      "bay_number": "Open",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "open"
    },{
      "bay_number": "Open",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "open"
    },{
      "bay_number": "Open",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "open"
    },
    {
      "bay_number": "Office 1",
      "company": "Administrative",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "office"
    },
    {
      "bay_number": "Office 2",
      "company": "Logistics",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "office"
    },
    {
      "bay_number": "G4",
      "company": "",
      "picture": "",
      "container_number": "MTSU-4124-1",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "H4",
      "company": "",
      "picture": "",
      "container_number": "MTSU-8704-6",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "I4",
      "company": "",
      "picture": "",
      "container_number": "XMRU-1234-6",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "J4",
      "company": "",
      "picture": "",
      "container_number": "TEST-1342-9",
      "is_full": false,
      "contents": "rack"
    },
    {
      "bay_number": "K4",
      "company": "",
      "picture": "",
      "container_number": "",
      "is_full": false,
      "contents": "rack"
    }
  ]
  ];

  app.get("/api/bays", (req, res)=>{
    res.send(bays);
});

app.listen(3001, ()=>{
    console.log("I'm listening");
});