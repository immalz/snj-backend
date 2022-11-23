import { Schema, model } from "mongoose";

export const ROLES = ['1er Trimestre', '2do Trimestre', '3er Trimestre']

const evaluacionesSchema = new Schema({
    nombre:  {
        type: String,
        required: true
    },
    año:  {
        type: String,
        required: true
    },
}, {
    versionKey: false
})

export default model('Evaluaciones', evaluacionesSchema)