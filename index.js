/** @format */

const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { PORT, SERV_URL } = process.env;
const router = express.Router();
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);

if (!PORT || !SERV_URL) {
  console.error("Please define PORT and SERV_URL in your .env file.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// GET all Warehouses
router.get("data/warehouses.js", async (req, res) => {
  try {
    const warehouses = await knex("warehouses").select("*");
    res.json(warehouses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to Retrieve Warehouses");
  }
});

//Get a Single Warehouse
router.get("data/warehouses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const warehouse = await knex("warehouses").select("*").where({ id: id });
    res.json(warehouse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to retrieve Warehouse");
  }
});

//POST a new warhouse
router.post("data/warehouses", async (req, res) => {
  const newWarehouse = req.body;
  try {
    await knex("warehouses").insert(newWarehouse);
    res.json(newWarehouse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to Add Warehouse");
  }
});

//PUT a warehouse
router.put("data/warehouses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedWarehouse = await knex("warehouses")
      .where({ id: id })
      .update(req.body);
    res.json(updatedWarehouse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to Update Warehouse");
  }
});

//DELETE a warehouse
router.delete("data/warehouses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWarehouse = await knex("warehouses").where({ id: id }).del();
    res.json(deletedWarehouse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to Delete Warehouse");
  }
});

module.exports = router;
