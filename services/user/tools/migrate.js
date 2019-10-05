try {
  require('ts-node/register/transpile-only');
} catch (error) {
  // can run on production environment with compiled sources
}
const { applySchemas } = require('../app/models');
(async () => {
  try {
    await applySchemas(true);
    console.log('Migrated successfully');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
