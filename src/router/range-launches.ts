const express = require("express");

const router = express.Router();

//Handles the query parameter
router.get("/", function(req, res, next){
    let start = req.query.start;
    let end = req.query.end;

    //parsing the dates into objects
    let objectStart = {
        year: start.substring(0, 4),
        month: start.substring(6, 8),
        day: start.substring(9, 10)
    }

    let objectEnd = {
        year: end.substring(0, 4),
        month: end.substring(6, 8),
        day: end.substring(9, 10)
    }
});


module.exports = router;