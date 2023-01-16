import { toyService } from '../services/toy.service.js'
import { store } from './store.js'
// import { SET_TOYS } from './toy.reducer.js'
import { REMOVE_TOY, SET_TOYS, ADD_TOY, UPDATE_TOY, UNDO_REMOVE_TOY, SET_IS_LOADING } from './toy.reducer.js'

export async function loadToys(filterBy, sortBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        // console.log('filterBy:', filterBy)

    try {
        const toys = await toyService.query(filterBy, sortBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('Had issues loading toys', err)
        throw err
    } finally {
        // () => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        // }
    }
    // return toyService.query(filterBy, sortBy)
    //     .then((toys) => {
    //         store.dispatch({ type: SET_TOYS, toys })
    //     })
    //     .catch(err => {
    //         console.log('Had issues loading toys', err)
    //         throw err
    //     })
    //     .finally(() => {
    //         store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    //     })
}

// Example for Optimistic mutation:
// export function removeToy(toyId) {
//     store.dispatch({ type: REMOVE_TOY, toyId })
//     return toyService.remove(toyId)
//         .catch(err => {
//             store.dispatch({ type: UNDO_REMOVE_TOY })
//             console.log('Had issues Removing toy', err)
//             throw err
//         })
// }

export async function removeToy(toyId) {



    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.log('Had issues Removing toy', err)
        throw err

    }
    // return toyService.remove(toyId)
    //     .then(() => {
    //         store.dispatch({ type: REMOVE_TOY, toyId })
    //     })
    //     .catch(err => {
    //         console.log('Had issues Removing toy', err)
    //         throw err
    //     })
}

export async function saveToy(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY

    try {
        const savedToy = await toyService.save(toy)
        store.dispatch({ type, toy: savedToy })
        return savedToy
    } catch (err) {
        console.error('Cannot save toy:', err)
        throw err

    }
    // return toyService.save(toy)
    //     .then(savedToy => {
    //         store.dispatch({ type, toy: savedToy })
    //         return savedToy
    //     })
    //     .catch(err => {
    //         console.error('Cannot save toy:', err)
    //         throw err
    //     })
}

