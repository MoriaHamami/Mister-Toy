const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy, sortBy) {
    try {

        // const collection = await dbService.getCollection('toy')
        // var toys = await collection.find().toArray()
        // return toys
        // if (!filterBy) {
        // }



        //     if (sortBy.value === 'name') {
        //         filteredToys = filteredToys.sort(function (toy1, toys2) {
        //             const a = toy1.name.toLowerCase()
        //             const b = toys2.name.toLowerCase()
        //             return a.localeCompare(b) * sortBy.change
        //         })
        //     }
        //     if (sortBy.value === 'price') {
        //         filteredToys = filteredToys.sort(function (toy1, toys2) {
        //             // console.log('toy1.price:', toy1.price)
        //             return (toy1.price - toys2.price) * sortBy.change
        //         })
        //     }
        //     if (sortBy.value === 'createdAt') {
        //         filteredToys = filteredToys.sort(function (toy1, toys2) {
        //             return (toy1.createdAt - toys2.createdAt) * sortBy.change
        //         })
        //     }
        const criteria = {}
        // const criteria = {
        //     name: { $regex: filterBy.name, $options: 'i' },
        //     // price: { $lt: filterBy.price },
        // }
        if (filterBy.name) criteria.name = { $regex: filterBy.name, $options: 'i' }
        if (filterBy.inStock === 'true') criteria.inStock = { $eq: true }
        if (filterBy.label) criteria.labels = filterBy.label

        const collection = await dbService.getCollection('toy')
        let toys = await collection.find(criteria).toArray()
        // let toys = await collection.find().toArray()
        // // if(filterBy.sortType)
        console.log('toys:', criteria)
        // SORT
        if (sortBy.value === 'name') toys.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()) * sortBy.change)
        if (sortBy.value === 'price') toys.sort((a, b) => (a.price - b.price) * sortBy.change)
        if (sortBy.value === 'createdAt') toys.sort((a, b) => (a.createdAt - b.createdAt) * sortBy.change)

        return toys

    } catch (err) {

        logger.error('cannot find toys', err)
        throw err

    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        toy.createdAt = Date.now()
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    try {
        const toyToSave = {
            name: toy.name,
            price: toy.price,
            labels: toy.labels,
            inStock: toy.inStock
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function addToyMsg(toyId, msg) {
    try {
        // console.log('msg:', msg)
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

async function addToyReview(toyId, review) {
    try {
        // console.log('review:', review)
        // review.id = utilService.makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { reviews: review } })
        // console.log('review:', review)
        return review
    } catch (err) {
        logger.error(`cannot add toy review ${toyId}`, err)
        throw err
    }
}

async function removeToyReview(toyId, reviewId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $pull: { reviews: { _id: reviewId } } })
        return reviewId
    } catch (err) {
        logger.error(`cannot add toy review ${toyId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addToyMsg,
    removeToyMsg,
    addToyReview,
    removeToyReview
    
}
