import User from './User.model.js';
import Expens from './Expens.model.js';

export async function syncTables(){
 
  try {
    await User.sync({  alter:true });
    await Expens.sync({  alter:true });
    // await sequelize.sync({ force: false, alter:true });
    console.log('✅ Database synced successfully');
  } catch (error) {
    console.error('❌ Database sync failed:', error.message);
  }
  };
