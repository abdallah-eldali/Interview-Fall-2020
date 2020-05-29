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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const launches_1 = require("./spaceX/launches");
const app = express_1.default();
app.use(express_1.default.json());
const port = 8001; // default port to listen
// define a route handler for the default home page
app.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send({});
}));
// Handle get requests to /nasa
app.get('/yearly-launches', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const daily = new launches_1.Launches();
    // Sends in today's date as a formatted string
    const result = yield daily.getLaunchesByYear(request.query.year);
    // Sends back the result of the image getter
    response.send(result);
}));
/*
//mounting the router /range-launches
const rangeLaunchesRouter = require(__dirname + '/range-launches.ts');
app.use('/range-launches', rangeLaunchesRouter);
*/
//Handles the query parameter
app.get('/range-launches', function (req, res) {
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
        console.log(objectStart);
        console.log(objectEnd);
        //Get the the difference in years between 'start' and 'end'
        let lentgh = objectEnd.year - objectStart.year;
        //Create an empty Array where where the launch objects will be stored
        let launches = [];
        //Request the API for every launch from start to end
        for (let i = 0; i < lentgh; ++i) {
            //Request for the launches from the start day all the way up to the end date
            console.log('Requesting for year: ' + (objectStart.year + i).toString());
            const result = yield yearly.getLaunchesByYear((objectStart.year + i).toString());
            launches.push(result);
        }
        console.log(launches);
        res.send(launches);
    });
});
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map