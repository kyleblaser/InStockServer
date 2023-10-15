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

// WARHOUSE CODE

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

//INVENTORIES CODE

//get all inventories
router.get("data/inventories", async (req, res) => {
  try {
    const inventory = await knex("inventory").select("*");
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to Retrieve Inventory");
  }
});

//get a single inventory
router.get("data/inventories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await knex("inventory").select("*").where({ id: id });
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to retrieve Inventory");
  }
});

//POST a new inventory
router.post("data/inventories", async (req, res) => {
  const newInventory = req.body;
  try {
    await knex("inventory").insert(newInventory);
    res.json(newInventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to Add Inventory");
  }
});

//PUT an inventory
router.put("data/inventories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInventory = await knex("inventory")
      .where({ id: id })
      .update(req.body);
    res.json(updatedInventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to Update Inventory");
  }
});

//DELETE an inventory
router.delete("data/inventories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInventory = await knex("inventory").where({ id: id }).del();
    res.json(deletedInventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to Delete Inventory");
  }
});

module.exports = router;
