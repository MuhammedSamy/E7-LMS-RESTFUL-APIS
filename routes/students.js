const {Student} = require('../models/student');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    let student = new Student({
        name: req.body.name,
        code: req.body.code,
    })
    student = await student.save();

    if(!student)
        return res.status(400).send('the student cannot be created!')

    res.send(student);
})


router.get(`/`, async (req, res) =>{
    const studentList = await Student.find().populate('user', 'name').sort({'dateOfInsertion': -1});

    if(!studentList) {
        res.status(500).json({success: false})
    }
    res.send(studentList);
})

router.get(`/:id`, async (req, res) =>{
    const student = await Student.findById(req.params.id)


    if(!student) {
        res.status(500).json({success: false})
    }
    res.send(student);
})

router.put('/:id',async (req, res)=> {

    const student = await Student.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            code: req.body.code,
        },
        { new: true}
    )

    if(!student)
        return res.status(400).send('the student cannot be created!')

    res.send(student);
})

router.delete('/:id', (req, res)=>{
    Student.findByIdAndRemove(req.params.id).then(student =>{
        if(student) {
            return res.status(200).json({success: true, message: 'the student is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "student not found!"})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err})
    })
})

router.delete('/', (req, res)=>{
    Student.remove().then(student =>{
        if(student) {
            return res.status(200).json({success: true, message: 'the students are deleted!'})
        } else {
            return res.status(404).json({success: false , message: "students are not deleted!"})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err})
    })
})


module.exports =router;
