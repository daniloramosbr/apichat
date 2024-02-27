
export const validUser = (req,res, next) => {
    
    try {

        const {username, email, password} = req.body

        if (!username || !email || !password ) {

        return res.status(500).send({
            error: 'missing field'
        })
    }

    next()
        
    } catch (error) {
        res.send(error.message)
    }
}