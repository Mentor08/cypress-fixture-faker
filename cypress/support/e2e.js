import './commands'

Cypress.Commands.overwrite('fixture', async (originalFn, filePath, encoding, options) => {
  var fileContent = await originalFn(filePath, encoding, options);
  var fileContentString = JSON.stringify(fileContent);

  // replace same random value to every placeholder, invoke a randomizing function
//  fileContent = fileContentString.replaceAll('{{randomNumber}}', randomNumber());

  // replace each placeholder with unique random value, pass the randomizing function reference
  fileContent = fileContentString.replaceAll('{{randomNumber}}', randomNumber);

  return JSON.parse(fileContent)
});

function randomNumber() {
  return Math.random();
}