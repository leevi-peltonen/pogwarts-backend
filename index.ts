const config = require('./utils/config');
import express, { Express} from 'express';
import { connect } from 'mongoose';
const cors = require('cors');
const middleware = require('./utils/middleware');
import { userController } from './controllers/userController';
import { weaponController } from './controllers/weaponController';
import { inventoryController } from './controllers/inventoryController'
const armorRouter = require('./controllers/armors');

const enemyRouter = require('./controllers/enemy');

export const app: Express = express();

run().catch(err => console.log(err));

async function run() {
    console.log('connecting to ', config.MONGODB_URI);
    await connect(config.MONGODB_URI);
    console.log('connected to MongoDB');
}

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/users', userController);
app.use('/api/weapons', weaponController);
app.use('/api/armor', armorRouter);
app.use('/api/inventory', inventoryController);
app.use('/api/enemy', enemyRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
    console.log(`server running on port ${config.PORT}`);
})