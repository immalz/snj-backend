import { Schema, model } from "mongoose";

export const ROLES = ['docente', 'director', 'alumno']

const roleSchema = new Schema({
    nombre: String,
}, {
    versionKey: false
})

export default model('Role', roleSchema)