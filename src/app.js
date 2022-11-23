import "@babel/polyfill";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import pkg from '../package.json';
import { createRoles } from './libs/initialSetup'

import authRoutes from './routes/auth.routes';
import alumnoRoutes from './routes/alumno.routes';
import docenteRoutes from './routes/docente.routes';
import cursosRoutes from './routes/curso.routes';
import notasRoutes from './routes/noticia.routes';
import gradoRoutes from './routes/grado.routes';

const app = express();
createRoles();

app.set('pkg', pkg);

//cambiar la configuracion cors para produccion
app.use(cors());

app.use('/uploads', express.static(path.resolve('uploads')));

app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        author: app.get('pkg').author,
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
        scripts: app.get('pkg').scripts
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/alumno', alumnoRoutes);
app.use('/api/docente', docenteRoutes);

app.use('/api/grado', gradoRoutes);
app.use('/api/cursos', cursosRoutes);
app.use('/api/notas', notasRoutes);

export default app;