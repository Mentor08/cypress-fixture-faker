# Introduction

Cypress plugin that enables faker functions in json fixture files.

# Installation

run `npm install cypress-fixture-faker`
add the following line in your `support/e2e.js` file:
```JavaScript
import 'cypress-fixture-faker';
```
profit

# Examples
```JSON
{
    "name": "Using fixtures to represent data ${faker.string.uuid()}",
    "email": "${faker.internet.email()}",
    "body": "Fixtures are a great way to mock data ${faker.string.uuid()} for responses to routes",
    "int": "${faker.number.int()}",
    "intParam": "${faker.number.int(100)}",
    "intObjectParam": "${faker.number.int({ min: 10, max: 15 })}",
    "string": "${faker.string.numeric()}",
    "airline": "${faker.airline.flightNumber({ addLeadingZeros: true })}",
    "airline2": "${faker.airline.flightNumber({ length: { min: 2, max: 3 } })}",
    "color": "${faker.color.colorByCSSColorSpace({ format: 'css', space: 'display-p3' })}",
    "boolean": "${faker.datatype.boolean(0.9)}",
    "between": "${faker.date.between({ from: '2029-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' })}",
    "amount": "${faker.finance.amount({ min: 5, max: 10, dec: 5, symbol: '', autoFormat: true })}",
    "arrayElement": "${faker.helpers.arrayElement(['cat', 'dog', 'mouse'])}"
}
```