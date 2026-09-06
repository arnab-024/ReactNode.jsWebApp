const express = require("express");
const router = express.Router();
const trainingMappingController = require("../controllers/trainingMapping.controller.js");

router.get("/", trainingMappingController.getMappings);
router.post("/createMapping", trainingMappingController.createMapping);
router.put("/updateMapping/:id", trainingMappingController.updateMapping);
router.delete("/deleteMapping/:id", trainingMappingController.deleteMapping);

module.exports = router;
