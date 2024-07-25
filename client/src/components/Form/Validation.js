const Validation = (data) => {
    let errors = {}

    if (!data.name) {
        errors.name = 'El nombre del perro es obligatorio'
    } else if (!/^[a-zA-Z\s]+$/.test(data.name)) {
        errors.name = 'El nombre no debe contener números ni caracteres especiales'
    }

    if (!data.heightMin && !data.heightMax) {
        errors.height = 'complete los campos asignados por favor'
    } else if (data.heightMin && data.heightMax && Number(data.heightMin) > Number(data.heightMax)) {
        errors.height = 'La altura mínima no puede ser mayor que la altura máxima'
    }

    if (!data.weightMin && !data.weightMax) {
        errors.weight = 'complete los campos asignados por favor'
    } else if (data.weightMin && data.weightMax && Number(data.weightMin) > Number(data.weightMax)) {
        errors.weight = 'El peso mínimo no puede ser mayor que el peso máximo'
    }

    if(!data.life_span) {
        errors.life_span = 'indique la cantidad aproximada de años de vida'
    }

    if(!data.temperament || data.temperament.length === 0) {
        errors.temperament = 'Elige al menos un temperamento, no seas así :(' 
    } 

    return errors
}

export default Validation