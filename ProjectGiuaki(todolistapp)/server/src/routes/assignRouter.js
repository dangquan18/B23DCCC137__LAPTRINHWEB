const express = require("express");
const assignController = require("../controllers/assignController");

const router = express.Router();

router.get("/assignments", assignController.getAllAssignments);
router.post("/assign", assignController.createAssignment);

module.exports = router;
