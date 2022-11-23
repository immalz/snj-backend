import Grado from "../models/Grado";
import Profesor from "../models/Profesor";


export const crearGrado = async(req, res) => {
    const {   
        nombre,
        nivel,
        piso,
        numeroAula,
        tutor 
    } = req.body;

    const nuevoGrado = new Grado({
        nombre,
        nivel,
        piso,
        numeroAula,
        tutor
    });

    const gradoGuardada = await nuevoGrado.save();

    const docenteActualizado = await Profesor.updateOne({ _id: tutor}, {
        aula: gradoGuardada._id
    }, {
        new: true
    })

    res.status(201).json({ gradoGuardada });
}

export const obtenerGrados = async(req, res) => {
    const grados = await Grado.find();
    res.status(200).json(grados);
}

export const obtenerGrado = async(req, res) => {
    const { _id } = req.params
    const grado = await Grado.findById(_id);

    res.status(200).json(grado);
}

export const actualizarGrado = async(req, res) => {
    const {
        nombre,
        nivel,
        piso,
        numeroAula,
        tutor
    } = req.body;

    const myquery = { _id: req.params._id };

    const docenteActualizado = await Profesor.updateOne({ _id: tutor}, {
        aula: myquery
    }, {
        new: true
    })

    const gradoActualizado = await Grado.updateOne(myquery, {
        nombre,
        nivel,
        piso,
        numeroAula,
        tutor
    }, {
        new: true
    })

    res.status(200).json({ message: gradoActualizado })
}

export const eliminarGrado = async(req, res) => {

    const { _id } = req.params;

    const gradoEliminado = await Grado.findByIdAndDelete(_id);


    res.status(200).json({ message: 'Grado Eliminado' });
}