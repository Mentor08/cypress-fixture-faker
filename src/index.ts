/* global Cypress */

import {faker} from '@faker-js/faker';

Cypress.Commands.overwrite('fixture', (originalFn, filePath, encoding, options) => {
    return originalFn(filePath, encoding, options).then((fileContent) => {
        const fileContentString = JSON.stringify(fileContent);

        const regex = /\${faker\.(.*?)\((.*?)\)}/g;
        const parsedFileContent = fileContentString.replace(regex, parseFaker);

        return JSON.parse(parsedFileContent);
    });
});

function parseFaker(_match: string, fakerFunction: string, params: string) {
    const convertedParams = convertParams(params);

    const functions = fakerFunction.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fakerFunctionReference = (faker as any)[functions[0]][functions[1]];

    if (convertedParams !== null) {
        return fakerFunctionReference(convertedParams)
    }
    return fakerFunctionReference();
}

function convertParams(params: string) {
    // test for empty
    if (params === '') {
        return null;
    }

    // test for number type
    const number = Number(params);
    if (!isNaN(number)) {
        return number;
    }

    // test for array type
    if (params.startsWith('[')) {
        const array = JSON.parse(params.replace(/'/g, '"'));
        if (Array.isArray(array)) {
            return array;
        }
    }

    // test for object
    if (params.startsWith('{')) {
        const quotedParams = params.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":');
        const object = JSON.parse(quotedParams.replace(/'/g, '"'));
        if (typeof object === 'object') {
            return object;
        }
    }

    // TODO faker.helpers.fromRegExp(/.{5}/)
    // TODO faker.random.alphaNumeric(5, { bannedChars: ["a"] })
    // TODO faker.number.bigInt(100n)

    // remove quotes
    return params.replace(/'/g, '');
}
