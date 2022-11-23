import { Router } from "express";
const router = Router();

import * as alumnoCtrl from "../controllers/alumno.controller";

router.get('/', alumnoCtrl.obtenerAlumnos);

router.get('/:_id', alumnoCtrl.obtenerAlumno);

router.put('/:_id', alumnoCtrl.actualizarAlumno);

router.delete('/:_id', alumnoCtrl.eliminarAlumno);

export default router;