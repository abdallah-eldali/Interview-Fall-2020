import express from 'express';
import moment from 'moment';
import { Launches } from './spaceX/launches';

const app = express();
app.use(express.json());
const port = 8001; // default port to listen

// define a route handler for the default home page
app.get('/', async (request: any, response: any) => {
  response.send({});
});

// Handle get requests to /nasa
app.get('/yearly-launches', async (request: any, response: any) => {
  const daily = new Launches();
  // Sends in today's date as a formatted string
  const result = await daily.getLaunchesByYear(request.query.year);
  // Sends back the result of the image getter
  response.send(result);
});


/*
//mounting the router /range-launches
const rangeLaunchesRouter = require(__dirname + '/range-launches.ts');
app.use('/range-launches', rangeLaunchesRouter);
*/

//Handles the query parameter
app.get('/range-launches', async function(req: any, res: any){
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

    console.log(objectStart);
    console.log(objectEnd);

    //Get the the difference in years between 'start' and 'end'
    let lentgh = objectEnd.year - objectStart.year; 
    //Create an empty Array where where the launch objects will be stored
    let launches = [];
    //Request the API for every launch from start to end
    for (let i = 0; i < lentgh; ++i){
        //Request for the launches from the start day all the way up to the end date
        console.log('Requesting for year: ' + (objectStart.year + i).toString());
        const result = await yearly.getLaunchesByYear((objectStart.year + i).toString());
        launches.push(result);
    }

    console.log(launches);
    
    res.send(launches);
});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
