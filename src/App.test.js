test('App home page loads', async () => {
  // any tests here

  await driver.get('http://localhost:3000');
  await snapshot('Basset example page', { widths: '1280,780,360', browsers: 'firefox,chrome'});
  await snapshot('Basset example page - hidden', { hideSelectors: '.hideme'});
  await snapshot('Basset example page - link', { selectors: '.App-link'});
});
