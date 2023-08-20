/* global Cypress */

import { faker } from '@faker-js/faker';

Cypress.Commands.overwrite('fixture', (originalFn, filePath, encoding, options) => {
  return originalFn(filePath, encoding, options).then((fileContent: unknown) => {
    const fileContentString = JSON.stringify(fileContent);

    const regex = /\${faker\.(.*?)\((.*?)\)}/g;
    fileContent = fileContentString.replace(regex, parseFaker);

    return JSON.parse(fileContent as string);
  });
});

function parseFaker(match: string, fakerFunction: string, params: string) {
  const convertedParams = convertParams(params);

  let fakerResult = faker;
  const functions = fakerFunction.split('.');

  for (const i in functions) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fakerResult = fakerResult[functions[i]];
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return fakerResult(convertedParams);
}

function convertParams(params: string) {
  // test for number type
  const number = Number(params);
  if (!isNaN(number)) { return number; }

  // test for array type
  try {
    const array = JSON.parse(params);
    if (Array.isArray(array)) { return array; }
  } catch (e) {
    if (e instanceof SyntaxError) {
      // do nothing
    } else {
      throw e;
    }
  }

  // test for object
  try {
    // eslint-disable-next-line no-eval
    const object = eval('(' + params + ')');
    if (typeof object === 'object') { return object; }
  } catch (e) {
    if (e instanceof SyntaxError) {
      // do nothing
    } else {
      throw e;
    }
  }

  // TODO faker.helpers.fromRegExp(/.{5}/)
  // TODO faker.random.alphaNumeric(5, { bannedChars: ["a"] })
  // TODO faker.number.bigInt(100n)

  // do nothing, return as string
  return params;
}
