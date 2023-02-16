const { response } = require('express')
const Employee = require('../models/Employee')

// Show  the list  of Employees 
const index =   (req, res, next) => {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message:'An error has occured'
        })
    })
}

const show = (req, res, next) =>{
    let EmployeeID = req.body.EmployeeID
    Employee.FindById(EmployeeID)
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message:'An error has occured'
        })
    })
}

// Add an Employee
const store = (req, res, next) =>{
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    employee.save()
    .then(response =>{
        res.json({
            message:'Employee Added Successfully!!'
        })
    })
    .catch(error =>{
        res.json({
            message:'an error occured'
        })
    })
}

// Update an employee
const update = (req, res, next) =>{
    let employeeID = req.body.EmployeeID

    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }
    Employee.FindByIdAndUpdate(employeeID, {$set: updatedData})
    .then(() => {
        res.json({
            message:'Employee Updated successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message:'an error occured'
        })
    })
}

// delete an employee
const destroy = (req, res, next) =>{
    let employeeID = req.body.EmployeeID
    Employee.FindByIdAndRemove(employeeID)
    .then(()=>{
        res.json({
            message: 'Employee deleted successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'an error occured'
        })
    })
}

module.exports = {
    index, show, store, update, destroy
}