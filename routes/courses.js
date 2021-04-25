const {Course} = require('../models/course');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    let course = new Course({
        name: req.body.name,
        code: req.body.code,
        description:req.body.description
    })
    course = await course.save();

    if(!course)
        return res.status(400).send('the course cannot be created!')

    res.send(course);
})

router.get(`/`, async (req, res) =>{
    const courseList = await Course.find().populate('user', 'name').sort({'dateOfInsertion': -1});

    if(!courseList) {
        res.status(500).json({success: false})
    }
    res.send(courseList);
})

router.get(`/:id`, async (req, res) =>{
    const course = await Course.findById(req.params.id)


    if(!course) {
        res.status(500).json({success: false})
    }
    res.send(course);
})

router.put('/:id',async (req, res)=> {

    const course = await Course.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            code: req.body.code,
            description: req.body.description
        },
        { new: true}
    )

    if(!course)
        return res.status(400).send('the course cannot be created!')

    res.send(course);
})

router.delete('/:id', (req, res)=>{
    Course.findByIdAndRemove(req.params.id).then(course =>{
        if(course) {
            return res.status(200).json({success: true, message: 'the course is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "course not found!"})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err})
    })
})

router.delete('/', (req, res)=>{
    Course.remove().then(course =>{
        if(course) {
            return res.status(200).json({success: true, message: 'the courses are deleted!'})
        } else {
            return res.status(404).json({success: false , message: "courses are not deleted!"})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err})
    })
})


module.exports =router;
