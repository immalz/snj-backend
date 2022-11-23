import Alumno from "../models/Alumno";
import Profesor from "../models/Profesor"
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import config from '../config';

// ALUMNO

export const signup = async(req, res) => {
    console.log('asdasds', req.body)
    const { nombre, correo, edad,dni, grado, genero, codEstudiante, contraseña, roles } = req.body;
    
    const newAlumno = new Alumno({
        nombre,
        correo,
        edad,
        dni,
        grado,
        genero,
        codEstudiante,
        contraseña: await Alumno.encryptPassword(contraseña)
    })

    if (roles) {
        const foundRoles = await Role.find({ nombre: { $in: roles } });
        newAlumno.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({ nombre: "alumno" });
        newAlumno.roles = [role._id];
    }

    const savedStudent = await newAlumno.save();

    console.log(savedStudent);

    const token = jwt.sign({ id: savedStudent._id }, config.SECRET, {
        expiresIn: 86400 // 24 horas
    });
    res.status(200).json({ token });

}

export const signIn = async(req, res) => {
    const studentFound = await (await Alumno.findOne({ correo: req.body.correo }))

    if (!studentFound) return res.status(400).json({ message: "Alumno no encontrado" });

    const matchPassword = await Alumno.comparePassword(req.body.contraseña, studentFound.contraseña);

    if (!matchPassword) return res.status(401).json({ token: null, message: 'Contraseña invalida' })

    const token = jwt.sign({ id: studentFound._id }, config.SECRET, {
        expiresIn: 86400
    })

    res.json({ token, studentFound });
}

// PROFESOR

export const signUpDocente = async(req, res) => {
    try {

        const { nombre, correo, dni, celular, contraseña, genero, codEstudiante, roles } = req.body;
        const newProfesor = new Profesor({
            nombre,
            correo,
            dni,
            celular,
            genero,
            codEstudiante,
            contraseña: await Profesor.encryptPassword(contraseña)
        })

    
        if (roles) {
            const foundRoles = await Role.find({ nombre: { $in: roles } });
            newProfesor.roles = foundRoles.map(role => role._id)
        } else {
            const role = await Role.findOne({ nombre: "docente" });
            newProfesor.roles = [role._id];
        }
        
        const profesorGuardado = await newProfesor.save();

        // console.log(profesorGuardado);

        const token = jwt.sign({ id: profesorGuardado._id }, config.SECRET, {
        expiresIn: 86400 // 24 horas
        });
        res.status(200).json({ token });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error: 'ha ocurrido un error, vuelva a intentarlo!'})
    }

    

  

}

export const signInDocente = async(req, res) => {
   try {
        const profesorEncontrado = await (await Profesor.findOne({ correo: req.body.correo }))

        if (!profesorEncontrado) return res.status(400).json({ message: "Profesor no encontrado" });

        console.log(req.body.contraseña);
        const matchPassword = await Profesor.comparePassword(req.body.contraseña, profesorEncontrado.contraseña);

        if (!matchPassword) return res.status(401).json({ token: null, message: 'Contraseña invalida' })

        const token = jwt.sign({ id: profesorEncontrado._id }, config.SECRET, {
            expiresIn: 86400
        })

        res.json({ token, profesorEncontrado });
   } catch (error) {
        console.log(error)
        res.status(400).json({error: 'ha ocurrido un error, vuelva a intentarlo!'})
   }
}