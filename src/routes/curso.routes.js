import { Router } from "express";
const router = Router();

import * as CursoCtrl from "../controllers/curso.controller";

router.get('/', CursoCtrl.obtenerCursos);

router.post('/', CursoCtrl.crearCurso);


router.get('/:_id', CursoCtrl.obtenerCurso);

router.put('/:_id', CursoCtrl.actualizarCurso);

router.delete('/:_id', CursoCtrl.eliminarCurso);

export default router;