import Curso from "../models/Curso";

export const crearCurso = async(req, res) => {
    const {   
        nombre,
        nivel,
        docente,
    } = req.body;

    const nuevoCurso = new Curso({
        nombre,
        nivel,
        docente,
    });

    const CursoGuardada = await nuevoCurso.save();

    res.status(201).json({ CursoGuardada });
}

export const obtenerCursos = async(req, res) => {
    const Cursos = await Curso.find();
    res.status(200).json(Cursos);
}

export const obtenerCurso = async(req, res) => {
    const { _id } = req.params
    const curso = await Curso.findById(_id);

    res.status(200).json(curso);
}

export const actualizarCurso = async(req, res) => {
    const {
        nombre,
        nivel,
        docente,
    } = req.body;

    const myquery = { _id: req.params._id };

    const CursoActualizado = await Curso.updateOne(myquery, {
        nombre,
        nivel,
        docente,
    }, {
        new: true
    })

    res.status(200).json({ message: CursoActualizado })
}

export const eliminarCurso = async(req, res) => {

    const { _id } = req.params;

    const CursoEliminado = await Curso.findByIdAndDelete(_id);


    res.status(200).json({ message: 'Curso Eliminado' });
}