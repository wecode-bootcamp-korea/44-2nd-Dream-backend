const appDataSource = require('../API/models/appDataSource');

const truncateTables = async (tableList) => {
  for (let table of tableList) {
    await appDataSource.query('SET FOREIGN_KEY_CHECKS=0');
    await appDataSource.query(`TRUNCATE TABLE ${table}`);
    await appDataSource.query(`ALTER TABLE ${table} AUTO_INCREMENT = 1`);
    await appDataSource.query('SET FOREIGN_KEY_CHECKS=1');
  }
};

module.exports = {
  truncateTables,
};
