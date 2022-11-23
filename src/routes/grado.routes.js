import { Router } from "express";
const router = Router();

import * as gradoCtrl from "../controllers/grado.controller";

router.get('/', gradoCtrl.obtenerGrados);

router.post('/', gradoCtrl.crearGrado);


router.get('/:_id', gradoCtrl.obtenerGrado);

router.put('/:_id', gradoCtrl.actualizarGrado);

router.delete('/:_id', gradoCtrl.eliminarGrado);

export default router;