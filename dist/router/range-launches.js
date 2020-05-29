"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const router = express.Router();
const launches_1 = require("../spaceX/launches");
//Handles the query parameter
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const yearly = new launches_1.Launches();
        let start = req.query.start;
        let end = req.query.end;
        //parsing the dates into objects
        let objectStart = {
            year: Number(start.substring(0, 4)),
            month: Number(start.substring(6, 8)),
            day: Number(start.substring(9, 10))
        };
        let objectEnd = {
            year: Number(end.substring(0, 4)),
            month: Number(end.substring(6, 8)),
            day: Number(end.substring(9, 10))
        };
        //Get the the difference in years between 'start' and 'end'
        let lentgh = objectEnd.year - objectStart.year;
        //Create an empty Array where where the launch objects will be stored
        let launches = [];
        //Request the API for every launch from start to end
        for (let i = 0; i < lentgh; ++i) {
            //Request for the launches from the start day all the way up to the end date
            const result = yield yearly.getLaunchesByYear((start.year + 1).toString());
            launches.push(result);
        }
        console.log(launches);
        res.send(launches);
    });
});
module.exports = router;
//# sourceMappingURL=range-launches.js.map