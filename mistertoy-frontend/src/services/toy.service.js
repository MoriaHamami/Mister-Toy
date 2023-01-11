
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
    getDefaultSort,
    // getToysCountPerLabel,
    // getPriceAvgPerLabel,
    getLabels
}


function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
    // const queryParams = `?name=${filterBy.name}&inStock=${filterBy.inStock}&label=${filterBy.label}&sortByVal=${sortBy.value}&sortByChange=${sortBy.change}`
    // return httpService.get(BASE_URL + queryParams)
    // return httpService.get(BASE_URL +  JSON.stringify({ filterBy, sortBy }))
    return httpService.get('toy', { params: { filterBy, sortBy } })

}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
        .then(toy => ({ ...toy, msg: 'TRY ME' }))
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    // return storageService.remove(STORAGE_KEY, toyId)
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    // if (toy._id) {
    //     return storageService.put(STORAGE_KEY, toy)
    // } else {
    //     // when switching to backend - remove the next line
    //     // toy.owner = userService.getLoggedinUser()
    //     return storageService.post(STORAGE_KEY, toy)
    // }
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return httpService.post(BASE_URL, toy)
    }
}
// // getToysCountPerLabel()
// function getToysCountPerLabel() {
//     return _getToysInStock()
//         .then(_getToysByLabel)
//         .then((toysByLabel) => {
//             const counters = []
//             // console.log('toysByLabel:', toysByLabel)
//             for (const [label, toys] of Object.entries(toysByLabel)) {
//                 // console.log('label:', toys)
//                 counters.push(toys.length)
//             }
//             // console.log('counters:', counters)
//             // return Promise.resolve(counters)
//             return counters
//         })
// }

// function getPriceAvgPerLabel() {
//     return query()
//         .then(_getToysByLabel)
//         .then((toysByLabel) => {
//             const counters = []

//             for (const label in toysByLabel) {
//                 // Keep the prices from each toy from each label in prices array
//                 const prices = []
//                 if(toysByLabel[label].length) {
//                     toysByLabel[label].map(toy => {
//                         if (toy.price) prices.push(toy.price)
//                         else prices.push(0)
//                     })
//                 } else {
//                     prices.push(0)
//                 }
//                 console.log('prices:', prices)
//                 // Sum the prices for each label using reduce
//                 const pricesSum = prices.reduce((acc, price) => {
//                     acc += price
//                     return acc
//                 }, 0)
//                 console.log('pricesSum:', pricesSum)
//                 // Get the average of all toy prices in current label
//                 const avgPrice = pricesSum / prices.length
//                 // Save average in counters array
//                 counters.push(avgPrice)
//             }

//             console.log('counters:', counters)
//             return counters
//         })
// }

function getLabels() {
    return [
        'on-wheels',
        'box-game',
        'art',
        'baby',
        'doll',
        'puzzle',
        'outdoor',
        'battery-powered'
    ]
    
}

// getToysInStock()
// function getToysByLabel(toys) {
//     const toysByLabel = [
//         { name: 'on-wheels', count: 0},
//         { name: 'box-game', count: 0},
//         { name: 'art', count: 0},
//         { name: 'baby', count: 0},
//         { name: 'doll', count: 0},
//         { name: 'puzzle', count: 0},
//         { name: 'outdoor', count: 0},
//         { name: 'battery-powered', count: 0}
//     ]

//     toys.map(toy => {
//         if(toy.labels) {
//             // console.log('toy.labels:', toy.labels)
//             if(toy.labels.includes(toysByLabel.name)) label.count++
//             // toy.labels.map(label => toysByLabel[label].push(toy))
//         }
//     })

//     const counter = []
//     toysByLabel.map(label => counter.push(label.count))
//     // console.log('toysByLabel:', toysByLabel)
//     console.log('counter:', counter)
//     return counter
// }

function _getToysByLabel(toys) {
    const toysByLabel = {
        'on-wheels': [],
        'box-game': [],
        'art': [],
        'baby': [],
        'doll': [],
        'puzzle': [],
        'outdoor': [],
        'battery-powered': []
    }
    toys.map(toy => {
        if (toy.labels) {
            // console.log('toy.labels:', toy.labels)
            toy.labels.map(label => toysByLabel[label].push(toy))
        }
    })
    // console.log('toysByLabel:', toysByLabel)
    return toysByLabel
}

function _getToysInStock() {
    const filterBy = getDefaultFilter()
    filterBy.inStock = true
    return query(filterBy)
}

function getDefaultFilter() {
    return { name: '', inStock: false, label: '' }
}

function getDefaultSort() {
    return { value: 'createdAt', change: 1 }
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
