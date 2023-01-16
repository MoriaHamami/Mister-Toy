export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

async function query(entityType, delay = 1500) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return (resolve => setTimeout(() => resolve(entities), delay))
}

async function get(entityType, entityId) {
    // MIGHT BE WRONG
    try {
        const entities = await query(entityType)
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    } catch {
        throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)

    }

    // return query(entityType).then(entities => {
    //     const entity = entities.find(entity => entity._id === entityId)
    //     if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    //     return entity
    // })
}

async function post(entityType, newEntity) {
    newEntity = { ...newEntity }
    newEntity._id = _makeId()
    // return .then(entities => {
    // })
    try {
        const entities = await query(entityType)
        entities.unshift(newEntity)
        _save(entityType, entities)
        return newEntity
    } catch (error) {
        console.dir(error)
    }
    // return query(entityType).then(entities => {
    //     entities.unshift(newEntity)
    //     _save(entityType, entities)
    //     return newEntity
    // })
}

function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// Private functions

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}