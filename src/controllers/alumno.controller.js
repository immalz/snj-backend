import Alumno from "../models/Alumno";
import path from 'path';
import fs from 'fs-extra';

export const obtenerAlumnos = async(req, res) => {
    const alumnos = await Alumno.find();
    res.status(200).json(alumnos);
}

export const obtenerAlumno = async(req, res) => {
    const { _id } = req.params
    const alumno = await Alumno.findById(_id);

    res.status(200).json(alumno);
}

export const actualizarAlumno = async(req, res) => {
    const {
        nombre,
        correo,
        grado,
        edad,
        dni,
        genero,
        codEstudiante,
    } = req.body;

    const myquery = { _id: req.params._id };

    const alumnoActualizado = await Alumno.updateOne(myquery, {
        nombre,
        correo,
        grado,
        edad,
        genero,
        codEstudiante,
        dni
    }, {
        new: true
    })

    res.status(200).json({ message: alumnoActualizado })
}

export const eliminarAlumno = async(req, res) => {

    const { _id } = req.params;

    const alumnoEliminado = await Alumno.findByIdAndDelete(_id);

    // if (alumnoEliminado) {
    //     await fs.unlink(path.resolve(alumnoEliminado.foto));
    // }

    res.status(200).json({ message: 'Alumno Eliminado' });
}