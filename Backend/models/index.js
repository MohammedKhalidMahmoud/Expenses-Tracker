
import { Sequelize } from 'sequelize';

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

export async function sync_tables(){
  async () => {
  try {
   await User.sync({ force: true, alter:true });
      await Expense.sync({ force: false, alter:true });
    console.log('✅ Database synced successfully');
  } catch (error) {
    console.error('❌ Database sync failed:', error.message);
  }
  };
}