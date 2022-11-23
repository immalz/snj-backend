import { Schema, model } from "mongoose";

const NotasSchema = new Schema({
    curso: [{
        ref: "Curso",
        type: Schema.Types.ObjectId,
        autopopulate: true
    }],
    alumno: [{
        ref: "Alumno",
        type: Schema.Types.ObjectId,
        autopopulate: true
    }],
    grado: [{
        ref: "Grado",
        type: Schema.Types.ObjectId,
        autopopulate: true
    }],
    año: {
        type: String,
        required: false
    },
    mes: {
        type: String,
        required: false
    },
    nota: {
        type: String,
        required: false
    },
    observacion: {
        type: Boolean,
        required: false
    },
    aprobacion: {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true,
    versionKey: false
});

NotasSchema.plugin(require('mongoose-autopopulate'));

export default model('Notas', NotasSchema);