const toyService = require('./toy.service.js')

const logger = require('../../services/logger.service')

async function getToys(req, res) {
  try {
    logger.debug('Getting Toys')
    // const filterBy = {
    //   txt: req.query.txt || ''
    // }
    const { filterBy, sortBy } = req.query.params
    console.log('filterBy:', sortBy)
    // const toys = await toyService.query(filterBy)
    const toys = await toyService.query(filterBy, sortBy)
    res.json(toys)
  } catch (err) {
    logger.error('Failed to get toys', err)
    res.status(500).send({ err: 'Failed to get toys' })
  }
}

async function getToyById(req, res) {
  try {
    const toyId = req.params.id
    const toy = await toyService.getById(toyId)
    res.json(toy)
  } catch (err) {
    logger.error('Failed to get toy', err)
    res.status(500).send({ err: 'Failed to get toy' })
  }
}

async function addToy(req, res) {
  const { loggedinUser } = req

  try {
    const toy = req.body
    // toy.owner = loggedinUser
    const addedToy = await toyService.add(toy)
    res.json(addedToy)
  } catch (err) {
    logger.error('Failed to add toy', err)
    res.status(500).send({ err: 'Failed to add toy' })
  }
}


async function updateToy(req, res) {
  try {
    const toy = req.body
    const updatedToy = await toyService.update(toy)
    res.json(updatedToy)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })

  }
}

async function removeToy(req, res) {
  try {
    const toyId = req.params.id
    const removedId = await toyService.remove(toyId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy', err)
    res.status(500).send({ err: 'Failed to remove toy' })
  }
}

async function addToyMsg(req, res) {
  const { loggedinUser } = req
  try {
    // console.log('req.body:', req.params)
    const toyId = req.params.id
    const msg = {
      txt: req.body.txt,
      by: loggedinUser
    }
    const savedMsg = await toyService.addToyMsg(toyId, msg)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })

  }
}

async function addToyReview(req, res) {
  const { loggedinUser } = req
  console.log('req.body:', req.body)
  try {
    const toyId = req.params.id
    const review = {
      content: req.body.review.content,
      _id: req.body._id,
      by: loggedinUser
    }
    // console.log('review:', review)
    const savedReview = await toyService.addToyReview(toyId, review)
    res.json(savedReview)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })

  }
}

async function removeToyMsg(req, res) {
  const { loggedinUser } = req
  try {
    const toyId = req.params.id
    const { msgId } = req.params

    const removedId = await toyService.removeToyMsg(toyId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy msg', err)
    res.status(500).send({ err: 'Failed to remove toy msg' })

  }
}

async function removeToyReview(req, res) {
  const { loggedinUser } = req
  try {
    const toyId = req.params.id
    const { reviewId } = req.params

    const removedId = await toyService.removeToyReview(toyId, reviewId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy review', err)
    res.status(500).send({ err: 'Failed to remove toy review' })

  }
}

module.exports = {
  getToys,
  getToyById,
  addToy,
  updateToy,
  removeToy,
  addToyMsg,
  removeToyMsg,
  addToyReview,
  removeToyReview
}
