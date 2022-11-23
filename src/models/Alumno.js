import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const AlumnoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        unique: true,
        required: true,
    },
    contraseña: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    dni: {
        type: Number,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    codEstudiante: {
        type: Number,
        required: true
    },
    grado: [{
        ref: "Grado",
        type: Schema.Types.ObjectId,
        autopopulate: true
    }],
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId,
        autopopulate: true
    }]
}, {
    timestamps: true,
    versionKey: false
});

AlumnoSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

AlumnoSchema.statics.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

AlumnoSchema.plugin(require('mongoose-autopopulate'));

export default model('Alumno', AlumnoSchema);