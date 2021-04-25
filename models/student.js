const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    }
});
studentSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

studentSchema.set('toJSON', {
    virtuals: true,
});
exports.Student = mongoose.model('Student', studentSchema);
exports.studentSchema = studentSchema;
