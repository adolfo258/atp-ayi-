//PERMISO SEGUN EL ROL DEL USUARIO

const checkRoles = (roles) => {
    return (req, res , next) => {
        const userRol = req.user.rol

        const authorized = roles.find(rol => userRol[0] === rol)

        if(authorized){
            next()
        }else{
            return res.status(401).send('Unauthorized rol')
        }
    
}}

module.exports = { checkRoles }