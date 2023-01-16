const logger = require('../../services/logger.service')
// const userService = require('../user/user.service')
const toyService = require('../toy/toy.service')
const authService = require('../auth/auth.service')
// const socketService = require('../../services/socket.service')
const reviewService = require('./review.service')
const asyncLocalStorage = require('../../services/als.service')
// const { toyService } = require('../../../mistertoy-frontend/src/services/toy.service')
const socketService = require('../../services/socket.service')

async function getReviews(req, res) {
    try {
        const reviews = await reviewService.query(req.query)
        res.send(reviews)
    } catch (err) {
        logger.error('Cannot get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}

async function deleteReview(req, res) {
    try {
        // console.log('req:', req.params)
        const deletedCount = await reviewService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove review' })
        }
    } catch (err) {
        logger.error('Failed to delete review', err)
        res.status(500).send({ err: 'Failed to delete review' })
    }
}


async function addReview(req, res) {
    const alsStore = asyncLocalStorage.getStore()
    const { loggedinUser } = alsStore
    // var {loggedinUser} = req
 
    try {
        var review = req.body
        review.byUserId = loggedinUser._id
        review = await reviewService.add(review)
        
        // prepare the updated review for sending out
        review.aboutToy = await toyService.getById(review.aboutToyId)
        review.byUser = loggedinUser
        
        // Give the user credit for adding a review
        // var user = await userService.getById(review.byUserId)
        // user.score += 10
        // loggedinUser.score += 10

        // loggedinUser = await userService.update(loggedinUser)

        // User info is saved also in the login-token, update it
        const loginToken = authService.getLoginToken(loggedinUser)
        res.cookie('loginToken', loginToken)

        delete review.aboutToyId
        delete review.byUserId

        socketService.broadcast({ type: 'review-added', data: review, userId: loggedinUser._id })
        socketService.emitToUser({ type: 'review-about-you', data: review, userId: review.aboutUser._id })
        socketService.emitTo({ type: 'user-updated', data: user, label: user._id })

        // socketService.broadcast({type: 'review-added', data: review, userId: loggedinUser._id})
        // socketService.emitToUser({type: 'review-about-you', data: review, userId: review.aboutToy._id})
        
        // const fullUser = await userService.getById(loggedinUser._id)
        // socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})

        res.send(review)

    } catch (err) {
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

module.exports = {
    getReviews,
    deleteReview,
    addReview
}