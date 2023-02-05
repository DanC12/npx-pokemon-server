const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3001;
const fs = require("fs");
const pokemon = JSON.parse(fs.readFileSync("pokedex.json"));

app.use(cors());

//GET a unique list of Pokemon types.
app.get("/types", (req, res) => {
  const types = Array.from(new Set(pokemon.map(({ type }) => type).flat()));
  res.json(types);
});

//GET a list of Pokemon by a specific type.
app.get("/pokemon/:type", (req, res) => {
  const response = pokemon.filter((pkmn) =>
    pkmn.type.includes(req.params.type)
  );
  res.json(response);
});

//GET thumbnail by Pokemon ID.
app.get("/thumbnails/:id", function (req, res) {
  /*
  Because thumbnails associated with IDs less than 10 start with 00,
  append 00 to the front of these IDs to return the correct image.
  */
  let id = req.params.id;
  if (+id < 10) id = "00" + id;
  else if (+id < 100) id = "0" + id;

  res.sendFile(path.resolve(__dirname, `./thumbnails/${id}.png`));
});
app.listen(port, () => {
  console.log(`Connected to server on port ${port}.`);
});
