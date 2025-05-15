
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('expenses_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export async function tryConnection(){
  try {
  await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

