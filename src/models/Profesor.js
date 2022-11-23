import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const ProfesorSchema = new Schema({
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
    dni: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: true
    },
    aula: [{
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

ProfesorSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

ProfesorSchema.statics.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

ProfesorSchema.plugin(require('mongoose-autopopulate'));

export default model('Profesor', ProfesorSchema);