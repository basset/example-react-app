const fs = require('fs');
const path = require('path');
const os = require('os');
const util = require('util');
const mkdirp = require('mkdirp');
const readline = require('readline');
const rimraf = util.promisify(require('rimraf'));

const Basset = require('@getbasset/node-client');

const BASSET_URL = process.env.BASSET_URL;
const BASSET_TOKEN = process.env.BASSET_TOKEN;
const BASSET_ASSETS = process.env.BASSET_ASSETS;

const DIR = path.join(__dirname, 'basset_snapshots');

class Snapshots {
  constructor() {
    mkdirp(DIR);
  }

  async cleanUp() {
    await rimraf(DIR);
    mkdirp(DIR);
  }

  static async snapshot({
    source,
    title,
    selectors,
    widths,
    browsers,
    hideSelectors,
  }) {
    console.log(`[Basset] snapshot ${title} with widths: ${widths}`)
    await fs.promises.writeFile(path.join(DIR, `${title}.html`), source);
    await fs.promises.appendFile(
      path.join(DIR, 'snapshots.json'),
      `${JSON.stringify({
        title,
        selectors,
        widths,
        browsers,
        hideSelectors,
      })}\n`,
    );
  }

  async getSnapshots() {
    const file = path.join(DIR, 'snapshots.json');

    try {
      await fs.promises.access(file, fs.constants.R_OK);
    } catch (error) {
      console.error(error);
      return [];
    }

    return new Promise((resolve, reject) => {
      const snapshots = [];
      const rl = readline.createInterface({
        input: fs.createReadStream(file),
      });
      rl.on('line', line => {
        snapshots.push(JSON.parse(line));
      });
      rl.on('close', () => {
        resolve(snapshots);
      });
    });
  }

  async submit() {
    const basset = new Basset(BASSET_TOKEN, BASSET_ASSETS, BASSET_URL, {
      baseUrl: 'assets',
      ignoreExtensions: '.js,.map',
    });

    const snapshots = await this.getSnapshots();

    await basset.buildStart();
    console.log('[Basset] Build created');

    for await (const snapshot of snapshots) {
      const filePath = path.join(DIR, `${snapshot.title}.html`);
      await basset.uploadSnapshotFile(snapshot, filePath);
      console.log(`[Basset] Submitted snapshot ${snapshot.title}`);
    }

    await basset.buildFinish();
    console.log('[Basset] Build has been submitted');
  }
}

module.exports = Snapshots;
