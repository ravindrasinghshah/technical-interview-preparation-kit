/**
 * cd to 4-Exercises folder and then run "node creditCard.js"
 */
// Credit Card Type | Prefix            | Length
// ---------------------------------------------
// American Express | 34, 37            | 15
// Diners Club      | 36, 38            | 14
// Visa             | 4                 | 16
// Visa Electron    | 4026              | 16

const CREDIT_CARD_TYPE_CONFIG = [
    {
        name: "American Express",
        prefix: [34, 37],
        length: 15
    },
    {
        name: "Diners Club",
        prefix: [36, 38],
        length: 14
    },
    {
        name: "Visa Electron",
        prefix: [4026],
        length: 16
    },
    {
        name: "Visa",
        prefix: [4],
        length: 16
    }
];

function getCreditCardType(ccNumber) {
    const filteredConfig = CREDIT_CARD_TYPE_CONFIG.filter((config) => {
        return config.length === ccNumber.length;
    });
    if (filteredConfig) {
        for (const config of filteredConfig) {
            for (const prefix of config.prefix) {
                if (ccNumber.startsWith(prefix.toString())) {
                    return config.name;
                }
            }
        };
    }
    return null;
}



let result = '', num = '340000000000000';
result = getCreditCardType(num); // American Express
console.log(`${num} is ${result}`);
num = '36000000000000';
result = getCreditCardType(num); // Diners Club
console.log(`${num} is ${result}`);
num = '360000000000000';
result = getCreditCardType(num); // null unsupported length + prefix combo
console.log(`${num} is ${result}`);
num = '34000000000000';
result = getCreditCardType(num); // unsupported length + prefix combo
console.log(`${num} is ${result}`);
num = '1234';
result = getCreditCardType(num); // unsupported length + prefix combo
console.log(`${num} is ${result}`);
num = '4000000000000000';
result = getCreditCardType(num);
console.log(`${num} is ${result}`);
num = '4026000000000000';
result = getCreditCardType(num);
console.log(`${num} is ${result}`);
num = '4036000000000000';
result = getCreditCardType(num);
console.log(`${num} is ${result}`);
num = '400000000000000';
result = getCreditCardType(num); // unsupported length + prefix combo
console.log(`${num} is ${result}`);



