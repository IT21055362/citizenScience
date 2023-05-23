const express = require("express");

const { 
  newReport, 
  allReports,
  ReportById,
  ReportByName,
  ReportByRawMaterial,
  updateAReport ,
  getReportCount,
  deleteReport,
  getCategoryCount,
  getStatusCount,
  getRecentlyAdded,
  getReportByStatus
} = require('../controllers/ReportController');

const router = express.Router();

//*Add a new Report
router.post("/", newReport);

//*Get All Reports
router.get("/", allReports);

//*Get a specific Report by ID
router.get("/:id", ReportById);

//*Get Reports by name
router.get("/name/:uName", ReportByName);

//*Get Reports by rawMaterial
router.get("/typeOfLitter/:typeOfLitter", ReportByRawMaterial);

//*Update a Report details
router.put("/:id", updateAReport);

//*Delete a Report
router.delete("/:id", deleteReport);

//*Get Report count
router.get("/getCount/count", getReportCount)


//*Get Report names
router.get("/chart/data", getStatusCount);

//*Get Report names
router.get("/chart/category-data", getCategoryCount,);

//*Get Recently added
router.get("/get/recently-added", getRecentlyAdded);

//*Report by status
router.get("/status/:status", getReportByStatus);

module.exports = router;
