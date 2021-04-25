
const Validator = require('validatorjs');

const codeRegex = /^[-'a-zA-Z]*$/;
const courseCodeRegex = /[a-zA-Z]{3}\d{3}/;

Validator.register('strict', value => codeRegex.test(value),
    'only letters in both cases, apostrophe and dashes are allowed');

Validator.register('strict2', value => courseCodeRegex.test(value),
    '3 characters minimum followed by 3 digit');

const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages)

    validation.passes(() => callback(null, true));

    validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;