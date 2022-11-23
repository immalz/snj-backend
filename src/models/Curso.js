import { Schema, model } from "mongoose";

const CursoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    nivel: {
        type: String,
        required: true
    },
    docente: [{
        ref: "Profesor",
        type: Schema.Types.ObjectId,
        autopopulate: true
    }],
}, {
    timestamps: true,
    versionKey: false
});

CursoSchema.plugin(require('mongoose-autopopulate'));

export default model('Curso', CursoSchema);