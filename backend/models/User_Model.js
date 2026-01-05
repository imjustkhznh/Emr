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
    }
});

const User = mongoose.model('User',userSchema)
export default User;

