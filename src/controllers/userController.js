import userService from '../services/userService'

const handleCreateNewUser = async (req, res) => {
    try {
        const infor = await userService.createNewUser(req.body)

        return res.status(200).json(infor)
    } catch (e) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            erMessage: 'Error from server...'
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        const infor = await userService.loginUser(req.body)

        return res.status(200).json(infor)
    } catch (e) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            erMessage: 'Error from server...'
        })
    }
}

const handleUpdateUser = async (req, res) => {
    try {
        const infor = await userService.handleUpdateUser(req.body)

        return res.status(200).json(infor)
    } catch (e) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            erMessage: 'Error from server...'
        })
    }
}

const getFavouriteUser = async (req, res) => {
    try {
        const infor = await userService.getFavouriteUser(req.query.id)

        return res.status(200).json(infor)
    } catch (e) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            erMessage: 'Error from server...'
        })
    }
}

const createNewFavourite = async (req, res) => {
    try {
        const infor = await userService.createNewFavourite(req.body)

        return res.status(200).json(infor)
    } catch (e) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            erMessage: 'Error from server...'
        })
    }
}

const handleDeleteFavourite = async (req, res) => {
    try {
        const infor = await userService.handleDeleteFavourite(req.body)

        return res.status(200).json(infor)
    } catch (e) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            erMessage: 'Error from server...'
        })
    }
}

const getHistoryUser = async (req, res) => {
    try {
        const infor = await userService.getHistoryUser(req.query.id)

        return res.status(200).json(infor)
    } catch (e) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            erMessage: 'Error from server...'
        })
    }
}

const createNewHistory = async (req, res) => {
    try {
        const infor = await userService.createNewHistory(req.body)

        return res.status(200).json(infor)
    } catch (e) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            erMessage: 'Error from server...'
        })
    }
}

const handleDeleteHistory = async (req, res) => {
    try {
        const infor = await userService.handleDeleteHistory(req.body)

        return res.status(200).json(infor)
    } catch (e) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            erMessage: 'Error from server...'
        })
    }
}

module.exports = {
    handleCreateNewUser,
    handleLogin,
    getFavouriteUser,
    createNewFavourite,
    handleDeleteFavourite,
    createNewHistory,
    getHistoryUser,
    handleDeleteHistory,
    handleUpdateUser
}