import { Router } from "express";
const router = Router();

import * as docenteCtrl from "../controllers/docente.controller";

router.get('/', docenteCtrl.obtenerProfesores);

router.get('/roles', docenteCtrl.obtenerRoles);

router.get('/:_id', docenteCtrl.obtenerProfesor);

router.put('/:_id', docenteCtrl.actualizarProfesor);

router.delete('/:_id', docenteCtrl.eliminarProfesor);

export default router;