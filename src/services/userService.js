import bcrypt from 'bcryptjs'
import db from '../models'

const salt = bcrypt.genSaltSync(10)

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                accountName,
                password,
                image,
                role,
            } = data

            if (!accountName || !password || !image || !role) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                const hashPasswordFromBcrypt = await hashUserPassword(password)
                await db.User.create({
                    accountName,
                    password: hashPasswordFromBcrypt,
                    image,
                    role
                })

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                accountName,
                password
            } = data

            if (!accountName || !password) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                const userData = {}
                const user = await db.User.findOne({
                    where: { accountName },
                    raw: true
                })

                if (user) {
                    user.image = Buffer.from(user.image, 'base64').toString('binary')
                    const check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMesage = 'OK'
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMesage = 'Wrong password'
                    }
                } else {
                    userData.errCode = 2
                    userData.errMesage = `User's not found!`
                }

                resolve(userData)
            }
        } catch (e) {
            reject(e)
        }
    })
}

const handleUpdateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                image,
                id
            } = data

            if (!id || !image) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                const user = await db.User.findOne({
                    where: { id }
                })

                if (user) {
                    user.image = data.image

                    await user.save()
                    const userInfor = await db.User.findOne({
                        where: { id },
                        raw: true
                    })

                    if (userInfor) {
                        userInfor.image = Buffer.from(userInfor.image, 'base64').toString('binary')
                        delete userInfor.password
                    }
                    resolve({
                        errCode: 0,
                        message: 'Update the user succeed!',
                        data: userInfor
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: `User's not found!`
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

const createNewFavourite = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                userId,
                contentId,
                category
            } = data

            if (!userId || !contentId || (typeof category) !== 'number') {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Favourite.create({
                    userId,
                    contentId,
                    category
                })

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getFavouriteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                const data = await db.Favourite.findAll({
                    where: { userId },
                    raw: true
                })

                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const handleDeleteFavourite = ({ id }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                const data = await db.Favourite.findOne({
                    where: { id }
                })

                if (data) {
                    await data.destroy()

                    resolve({
                        errCode: 0,
                        errMessage: 'OK'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Favourite not found!',
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

const createNewHistory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                userId,
                contentId,
                category,
                episodeId,
                definition
            } = data

            if (!userId || !contentId || (typeof category) !== 'number' || !episodeId || !definition) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                const data = await db.History.findAll({
                    where: { userId, contentId },
                    raw: true
                })

                if (data?.length > 0) {
                    resolve({
                        errCode: 2,
                        errMessage: `History isn't exits`
                    })
                } else {
                    await db.History.create({
                        userId,
                        contentId,
                        category,
                        episodeId,
                        definition
                    })

                    resolve({
                        errCode: 0,
                        errMessage: 'OK'
                    })
                }


            }
        } catch (e) {
            reject(e)
        }
    })
}

const getHistoryUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                const data = await db.History.findAll({
                    where: { userId },
                    raw: true
                })

                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const handleDeleteHistory = ({ id }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                const data = await db.History.findOne({
                    where: { id }
                })

                if (data) {
                    await data.destroy()

                    resolve({
                        errCode: 0,
                        errMessage: 'OK'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'History not found!',
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser,
    loginUser,
    getFavouriteUser,
    createNewFavourite,
    handleDeleteFavourite,
    createNewHistory,
    getHistoryUser,
    handleDeleteHistory,
    handleUpdateUser
}