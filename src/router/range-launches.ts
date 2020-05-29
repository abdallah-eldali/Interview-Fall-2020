const express = require("express");
const path = require("path");

const router = express.Router();

import {Launches} from "../spaceX/launches"

//Handles the query parameter
router.get("/", async function(req: any, res: any){
    const yearly = new Launches();

    let start = req.query.start;
    let end = req.query.end;

    //parsing the dates into objects
    let objectStart = {
        year: Number(start.substring(0, 4)),
        month: Number(start.substring(6, 8)),
        day: Number(start.substring(9, 10))
    }

    let objectEnd = {
        year: Number(end.substring(0, 4)),
        month: Number(end.substring(6, 8)),
        day: Number(end.substring(9, 10))
    }

    //Get the the difference in years between 'start' and 'end'
    let lentgh = objectEnd.year - objectStart.year; 
    //Create an empty Array where where the launch objects will be stored
    let launches = [];
    //Request the API for every launch from start to end
    for (let i = 0; i < lentgh; ++i){
        //Request for the launches from the start day all the way up to the end date
        const result = await yearly.getLaunchesByYear((start.year + 1).toString());
        launches.push(result);
    }

    console.log(launches);
    
    res.send(launches);
});


module.exports = router;