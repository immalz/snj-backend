import { ROLES } from '../models/Role'
import Alumno from '../models/Alumno'
import Profesor from '../models/Profesor'

export const checkDuplicatedUsernameOrEmail = async(req, res, next) => {
    try {
        const alumno = await Alumno.findOne({ nombre: req.body.nombre })
        if (alumno) return res.status(400).json({ message: 'El alumno ya existe' });

        const correo = await Alumno.findOne({ correo: req.body.correo })
        if (correo) return res.status(400).json({ message: 'El correo ya existe' });

        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `El rol ${req.body.roles[i]} no existe`,
                });
            }
        }
    }
    next();
};

// profesores
export const checkDuplicatedUsernameOrEmailDocente = async(req, res, next) => {
    try {
        const profesor = await Profesor.findOne({ nombre: req.body.nombre })
        if (profesor) return res.status(400).json({ message: 'El profesor ya existe' });

        const correo = await Profesor.findOne({ correo: req.body.correo })
        if (correo) return res.status(400).json({ message: 'El correo ya existe' });

        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
}