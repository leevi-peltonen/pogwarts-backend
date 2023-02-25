const config = require('./utils/config');
const cors = require('cors');
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware';
import express, { Express} from 'express';
import { connect } from 'mongoose';
import { userController } from './controllers/userController';
import { weaponController } from './controllers/weaponController';
import { inventoryController } from './controllers/inventoryController'
import { armorController } from './controllers/armorController';
import { enemyController } from './controllers/enemyController';

export const app: Express = express();

run().catch(err => console.log(err));

async function run() {
    console.log('connecting to ', config.MONGODB_URI);
    await connect(config.MONGODB_URI);
    console.log('connected to MongoDB');
}

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/users', userController);
app.use('/api/weapons', weaponController);
app.use('/api/armor', armorController);
app.use('/api/inventory', inventoryController);
app.use('/api/enemy', enemyController);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(config.PORT, () => {
    console.log(`server running on port ${config.PORT}`);
})