
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
    getDefaultSort
}


function query(filterBy = getDefaultFilter(), sortBy=getDefaultSort()) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            console.log('filterBy:', filterBy)
            console.log('sortBy:', sortBy)
            if (filterBy.name) {
                const regex = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }
            if (filterBy.inStock !== null) {
                toys = toys.filter(toy => toy.inStock === filterBy.inStock)
            }
            if (filterBy.label) {
                toys = toys.filter(toy => toy.labels.includes(filterBy.label))
            }
            if (sortBy.val === 'name') {
                toys.sort(function (toy1, toys2) {
                    const a = toy1.name.toLowerCase()
                    const b = toys2.name.toLowerCase()
                    return a.localeCompare(b) * sortBy.change
                })            }
            if (sortBy.val === 'price') {
                toys.sort(function (toy1, toys2) {
                    return (toy1.price - toys2.price) * sortBy.change
                })            }
            if (sortBy.val === 'createdAt') {
                toys.sort(function (toy1, toys2) {
                    return (toy1.createdAt - toys2.createdAt) * sortBy.change
                })            }
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}
function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getDefaultFilter() {
    // return { txt: '', maxPrice: 0 }
    return { name: '', inStock: null, label:'' }
}

function getDefaultSort() {
    return { value: 'name', change: 1 }
}

function getEmptyToy() {
    return {
        // vendor: '',
        // price: 0,
        'name': '',
        'price': 0,
        'labels': [],
        'createdAt': Date.now(),
        'inStock': true
    }
}

function getRandomToy() {
    return {
        'name': 'Toy-' + (Date.now() % 1000),
        'price': utilService.getRandomIntInclusive(50, 150),
        'labels': ['doll', 'battery-powered', 'baby'],
        'createdAt': Date.now(),
        'inStock': true
        // vendor: 'Susita-' + (Date.now() % 1000),
        // price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


