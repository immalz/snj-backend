import Profesor from "../models/Profesor";
import Roles from "../models/Role";

export const obtenerRoles = async(req, res) => {
    const roles = await Roles.find();
    res.status(200).json(roles);
}

export const obtenerProfesores = async(req, res) => {
    const profesores = await Profesor.find();
    res.status(200).json(profesores);
}

export const obtenerProfesor = async(req, res) => {
    const { _id } = req.params
    const profesor = await Profesor.findById(_id);

    res.status(200).json(profesor);
}

export const actualizarProfesor = async(req, res) => {
    const {
        nombre,
        correo,
        contraseña,
        dni,
        celular,
        cargo,
    } = req.body;

    const myquery = { _id: req.params._id };

    await Profesor.updateOne(myquery, {
        nombre,
        correo,
        dni,
        contraseña: await Profesor.encryptPassword(contraseña),
        celular,
        cargo,
    }, {
        new: true
    })

    res.status(200).json({ message: 'Datos Actualizados!' })
}

export const eliminarProfesor = async(req, res) => {
    const { _id } = req.params;
    await Profesor.findByIdAndDelete(_id);

    res.status(200).json({ message: 'Datos Eliminados!' });
}