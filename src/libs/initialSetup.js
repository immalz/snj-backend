import Role from "../models/Role";


export const createRoles = async() => {

    try {
        const count = await Role.estimatedDocumentCount()

        if (count > 0) return;

        const values = await Promise.all([
            new Role({ nombre: 'alumno' }).save(),
            new Role({ nombre: 'docente' }).save(),
            new Role({ nombre: 'director' }).save()
        ])

        console.log(values);
    } catch (error) {
        console.log(error);
    }
}