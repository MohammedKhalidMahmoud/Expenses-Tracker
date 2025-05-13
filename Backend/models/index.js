
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize('expenses_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export async function try_connection(){
  try {
  await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

