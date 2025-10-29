import mongoose from 'mongoose'

const employeeSchema = mongoose.Schema(
    {
        employeeName: {
            type: String,
            required: [true, 'name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true
        },
        department: {
            type: String,
            required: true,
            yrim: true
        },
        position: {
            type: String,
            trim: true,
            required: true
        },
        salary: {
            type: Number,
            min: [0, 'salary cannot be negative']
        },
        address: {
            type: String,
            trim: true
        },
        imageURL: {
            type: String,
            required: true,
            trim: true
        },
        imagePublicId: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

export const Employee = mongoose.model('Employee', employeeSchema)