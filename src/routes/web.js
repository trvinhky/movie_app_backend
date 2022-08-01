import express from 'express'
import userController from '../controllers/userController'

const router = express.Router()

const initWebRoutes = (app) => {
    router.post('/api/v1/create-new-user', userController.handleCreateNewUser)
    router.post('/api/v1/login', userController.handleLogin)
    router.post('/api/v1/update-user', userController.handleUpdateUser)

    router.post('/api/v1/create-new-favourite', userController.createNewFavourite)
    router.get('/api/v1/get-favourite-user', userController.getFavouriteUser)
    router.delete('/api/v1/delete-favourite-user', userController.handleDeleteFavourite)

    router.post('/api/v1/create-new-history', userController.createNewHistory)
    router.get('/api/v1/get-history-user', userController.getHistoryUser)
    router.delete('/api/v1/delete-history-user', userController.handleDeleteHistory)

    return app.use('/', router)
}

module.exports = initWebRoutes