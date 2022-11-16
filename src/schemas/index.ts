import * as yup from 'yup'

const schemaRegister = yup.object().shape({
    username: yup.string().min(3).required(),
    password: yup.string().required().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/)
})

const schemaSession = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()

})

export { schemaRegister, schemaSession }