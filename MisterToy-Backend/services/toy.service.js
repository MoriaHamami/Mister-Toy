const fs = require('fs');
// const PAGE_SIZE = 30000
var toys = require('../data/toy.json')


module.exports = {
    query,
    get,
    remove,
    save
}

function query(filterBy) {
    let filteredToys = toys
    console.log('filterBy:', filterBy)
    // console.log('sortBy:', sortBy)
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        filteredToys = filteredToys.filter(toy => regex.test(toy.name))
    }
    if (filterBy.inStock === 'true') {
        filteredToys = filteredToys.filter(toy => toy.inStock)
    }
    if (filterBy.label) {
        filteredToys = filteredToys.filter(toy => toy.labels.includes(filterBy.label))
    }
    if (filterBy.sortByVal === 'name') {
        filteredToys = filteredToys.sort(function (toy1, toys2) {
            const a = toy1.name.toLowerCase()
            const b = toys2.name.toLowerCase()
            return a.localeCompare(b) * filterBy.sortByChange
        })
    }
    if (filterBy.sortByVal === 'price') {
        filteredToys = filteredToys.sort(function (toy1, toys2) {
            // console.log('toy1.price:', toy1.price)
            return (toy1.price - toys2.price) * filterBy.sortByChange
        })
    }
    if (filterBy.sortByVal === 'createdAt') {
        filteredToys = filteredToys.sort(function (toy1, toys2) {
            return (toy1.createdAt - toys2.createdAt) * filterBy.sortByChange
        })
    }
    // return toys
    return Promise.resolve(filteredToys)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such Toy')
    // const toy = toys[idx]
    // if (toy.owner._id !== loggedinUser._id) return Promise.reject('Not your Toy')
    toys.splice(idx, 1)
    return _writeToysToFile()
}


function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('No such Toy')
        // if (toyToUpdate.owner._id !== loggedinUser._id) return Promise.reject('Not your Toy')

        toyToUpdate.name = toy.name
        toyToUpdate.price = toy.price
        toyToUpdate.labels = toy.labels
        toyToUpdate.inStock = toy.inStock
    } else {
        toy._id = _makeId()
        // toy.owner = loggedinUser
        toy.createdAt = Date.now()
        toys.push(toy)
    }
    return _writeToysToFile().then(() => toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


function _writeToysToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return rej(err)
            // console.log("File written successfully\n");
            res()
        });
    })
}