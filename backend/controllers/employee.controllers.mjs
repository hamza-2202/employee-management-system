import { Employee } from "../models/employee.model.mjs"
import asynchandler from 'express-async-handler'
import { removeFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.mjs"

const getAllEmployees = asynchandler(async (request, response) => {
    const employees = await Employee.find()
    if (employees.length === 0) {
        return response.status(404).json({
            message: `Employees not found`
        })
    }
    response.status(200).json({ employees })
})

const addEmployee = async (request, response) => {
    const { employeeName, email, department, position, salary, address } = request.body

    const imageLocalPath = request.file.path
    if (!employeeName || !email || !department || !position || !salary || !address || !imageLocalPath) {
        response.status(400).json({
            message: `Input all fields`
        })
    }

    const employee = await Employee.findOne({ email })
    if (employee) {
        response.status(400)
        throw new Error(`This Email already exists.`)
    }

    const result = await uploadOnCloudinary(imageLocalPath)
    if (result) {
        console.log(`Image uploaded on cloudinary`)
        console.log(result)
    } else {
        response.status(500)
        throw new Error(`Error uploading image`)
    }

    const newEmployee = await Employee.create({
        employeeName, email, department, position, salary, address, imageURL: result.secure_url, imagePublicId: result.public_id
    })

    return response.status(201).json({
        message: `New Employee Added`,
        employee: newEmployee
    })
}

const getSingleEmployee = asynchandler(async (request, response) => {
    const employee = await Employee.findById(request.params.id)
    if (!employee) {
        response.status(404)
        throw new Error(`Employee not found`)
    }
    response.status(200).json({
        employee
    })
})

const updateEmployee = async (request, response) => {
    const { employeeName, email, department, position, salary, address } = request.body
    if (!employeeName || !email || !department || !position || !salary || !address) {
        response.status(400).json({
            message: `Input all fields`
        })
    }
    const emp = await Employee.findById(request.params.id)
    if (!emp) {
        return response.status(404).json({
            message: "Employee not found"
        })
    }

    const imageLocalPath = request.file?.path

    if (emp.employeeName == employeeName && emp.email == email && emp.department == department && emp.position == position && emp.salary == salary && emp.address == address && !imageLocalPath ) {
        response.status(401)
        throw new Error(`No changes were made`)
    }

    if (imageLocalPath) {
        const remove = await removeFromCloudinary(emp.imagePublicId)
        if (!remove) {
            response.status(500)
            throw new Error(`Error updating image on cloudinary`)
        }
        const upload = await uploadOnCloudinary(imageLocalPath)
        const employee = await Employee.findByIdAndUpdate(request.params.id, { employeeName, email, department, position, salary, address, imageURL: upload.secure_url, imagePublicId: upload.public_id }, { new: true })
        response.status(200).json({
            message: `Employee updated successfully`,
            employee
        })
    }
    const employee = await Employee.findByIdAndUpdate(request.params.id, request.body, { new: true })

    response.status(200).json({
        message: `Employees updated successfully`,
        employee
    })
}

const deleteEmployee = async (request, response) => {
    // const confirm = window.confirm("Are you sure")
    const employee = await Employee.findById(request.params.id)
    if (!employee) {
        return response.status(404).json({
            message: "Employee not found"
        })
    }
    const remove = await removeFromCloudinary(employee.imagePublicId)
    if(!remove){
        response.status(500)
        throw new Error(`Something went wrong while deleting image`)
    }
    await Employee.findByIdAndDelete(request.params.id)
    response.status(200).json({
        message: `Employee deleted successfully`
    })
}

export {
    getAllEmployees,
    addEmployee,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee
}