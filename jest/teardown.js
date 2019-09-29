module.exports = async () => {
  try {
    await global.snapshots.submit();
    await global.snapshots.cleanUp();
  } catch (error) {
    await global.snapshots.cleanUp();
    throw error;
  }
};
