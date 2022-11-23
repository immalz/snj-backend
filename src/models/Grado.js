import { Schema, model } from "mongoose";

const GradoSchema = new Schema({
    cursos: [{
        ref: "Curso",
        type: Schema.Types.ObjectId,
        autopopulate: true
    }],
    alumnos: [{
        ref: "Alumno",
        type: Schema.Types.ObjectId,
        autopopulate: false
    }],
    tutor: [{
        ref: "Profesor",
        type: Schema.Types.ObjectId,
        autopopulate: true
    }],
    nombre: {
        type: String,
        required: true
    },
    piso: {
        type: String,
        required: true 
    },
    numeroAula: {
        type: Number,
        required: true 
    },
    nivel: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});

GradoSchema.plugin(require('mongoose-autopopulate'));

export default model('Grado', GradoSchema);