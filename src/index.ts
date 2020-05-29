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

//mounting the router /range-launches
const rangeLaunchesRouter = require(__dirname + '/range-launches.ts');
app.use('/range-launches', rangeLaunchesRouter);

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
