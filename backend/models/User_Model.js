import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase:true,
    },
    hashpassword:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: false,
    },
    avatarUrl:{
        type:String,
    },
    phone:{
        type:String,
        sparse:true,//Cho phép giá trị null trong trường unique
    },
    timestramp:{
        type:Date,
        default:Date.now,
    },
    role:{
        type:String,
        enum: ['Admin', 'doctor', 'patients', 'Nurse'],
        default: 'patients',
    },
    patientCode: {
        type: String,
        unique: true,
        sparse: true,
    }
});
userSchema.index({email:1},{unique:true});
userSchema.index({phone:1},{sparse:true,unique:true});
userSchema.index({name:1});
const User = mongoose.model('User',userSchema)
export default User;

