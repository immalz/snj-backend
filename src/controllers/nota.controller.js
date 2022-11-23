import Nota from '../models/Notas';
import path from 'path';
import fs from 'fs-extra';

export const obtenerNotas = async(req, res) => {

    const Notas = await Nota.find();
    res.status(200).json(Notas);
}

export const obtenerNotasPorCurso = async(req, res) => {

    const Notas = await Nota.find({
        curso: req.body.curso, 
        grado: req.body.aula,
        año: req.body.año,
        mes: req.body.mes
    });

    res.status(200).json(Notas);   
}

export const obtenerNotasObservadas = async(req, res) => {

    const Notas = await Nota.find({
        curso: {
            $in: req.body
        },
        observacion: true
    });

    res.status(200).json(Notas);   
}

export const crearNota = async(req, res) => {

    const notas = await Nota.insertMany(req.body)
    res.status(201).json(notas);
};

export const enviarRevision = async(req, res) => {
    const {
        observacion
    } = req.body;

    const myquery = { _id: req.params._id };

    const notaObservada = await Nota.updateOne(myquery, {
        observacion
    }, {
        new: true
    })

    res.status(200).json({ message: notaObservada })
};



export const aceptarRevision = async(req, res) => {
    const {
        observacion,
        aprobacion
    } = req.body;

    const myquery = { _id: req.params._id };

    const notaObservada = await Nota.updateOne(myquery, {
        observacion,
        aprobacion
    }, {
        new: true
    });

    res.status(200).json({ message: notaObservada })
};

export const actualizarNota = async(req, res) => {
    const {
        nota
    } = req.body;

    const myquery = { _id: req.params._id };

    const notaActualizada = await Nota.updateOne(myquery, {
        observacion: false,
        aprobacion: false,
        nota
    }, {
        new: true
    });

    res.status(200).json({ message: notaActualizada })
}


export const eliminarNota = async(req, res) => {

    const { _id } = req.params;

    const Nota = await Nota.findByIdAndDelete(_id);

    if (Nota) {
        await fs.unlink(path.resolve(Nota.foto));
    }

    res.status(204).json({ message: 'Nota Eliminada' });
}