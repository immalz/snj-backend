import { Router } from "express";
const router = Router();

import * as noticiaCtrl from "../controllers/nota.controller";

// fotografias
import path from 'path';
import multer from 'multer';
import { v4 as uuid } from 'uuid';


// multer 
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    dest: path.join(__dirname, '../../uploads'),
    limit: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp|jfif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Tipo de archivo no soportado")
    }
}).single('foto');


router.get('/', noticiaCtrl.obtenerNotas);

router.post('/curso', noticiaCtrl.obtenerNotasPorCurso);

router.post('/', noticiaCtrl.crearNota);

router.post('/revision/:_id', noticiaCtrl.enviarRevision);

router.post('/observadas', noticiaCtrl.obtenerNotasObservadas);

router.post('/confirmar-revision/:_id', noticiaCtrl.aceptarRevision);

router.post('/actualizar/:_id', noticiaCtrl.actualizarNota);

router.delete('/:_id', noticiaCtrl.eliminarNota);



export default router;