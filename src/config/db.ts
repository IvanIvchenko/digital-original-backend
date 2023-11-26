const knexfile = require('../../knexfile.js');
import * as dotenv from 'dotenv';
dotenv.config();

import { knex } from 'knex';

const knexInstance = knex(knexfile[process.env.NODE_ENV || "development"]);

export {knexInstance as knex};