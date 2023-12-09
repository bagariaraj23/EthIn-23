import mongoose from "mongoose";

const therapistSchema = new mongoose.Schema({
    role:{
        type: Number,
        default:0,
    },
    walletAddress:{
        type: String,
        // required: true,
    },
    name:{
        type: String,
        // required: true,
    },
    age:{
        type: Number,
        // required: true,

    },
    about:{
        type: String,
        // required: true,

    },
    expertise:{
        type: String,
        // required: true,

    },
    experience:{
        type: Number,
        // required: true,

    },
    patientsConsulted:{
        type: Number,
        // required: true,

    },
    consultationFee:{
        type: Number,
        // required: true,
    },
    image:{
        type: String,
        // required: true,
    },
    clinicAddress:{
        type: String,
        // required: true,
    }
})

export default mongoose.model('Therapist', therapistSchema);