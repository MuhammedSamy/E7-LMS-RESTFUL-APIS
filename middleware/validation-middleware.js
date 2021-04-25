const Validator = require('../helpers/validate');



const student = async (req, res, next) => {
    const validationRule = {
        "name": "required|string|strict",
        "code": "required|string|min:7",
    }
    await Validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const course = async (req, res, next) => {
    const validationRule = {
        "name": "required|string|min:5",
        "code": "required|string|strict2",
    }
    await Validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}
module.exports = {
    student, course
}