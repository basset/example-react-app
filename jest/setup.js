const Snapshots = require('./snapshots');

module.exports = async () => {
  global.snapshots = new Snapshots();
  await global.snapshots.cleanUp();
  console.log('\r\n[Basset] initialized');
};
