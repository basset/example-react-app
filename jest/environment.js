const SeleniumEnvironment = require('jest-environment-selenium');
const Snapshots = require('./snapshots');

class BassetEnvironment extends SeleniumEnvironment {
  async setup() {
    await super.setup();
    this.global.snapshot = async (
      title,
      { widths, browsers, hideSelectors, selectors },
    ) => {
      let source = await this.global.driver.executeScript(
        'return document.documentElement.outerHTML;',
      ); //getPageSource escapes some style values

      // remove script tags
      source = source.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        '',
      );
      await Snapshots.snapshot({
        source,
        title,
        widths,
        browsers,
        hideSelectors,
        selectors,
      });
    };
  }
}

module.exports = BassetEnvironment;
