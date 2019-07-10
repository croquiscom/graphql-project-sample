import fs from 'fs';

for (const suite of fs.readdirSync(__dirname)) {
  const suiteDir = `${__dirname}/${suite}`;
  if (fs.lstatSync(suiteDir).isDirectory()) {
    describe(suite, () => {
      for (const file of fs.readdirSync(suiteDir)) {
        if (fs.lstatSync(`${suiteDir}/${file}`).isFile()) {
          require(`${suiteDir}/${file}`);
        }
      }
    });
  }
}
