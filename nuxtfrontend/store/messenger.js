export const strict = false

export const state = () => ({
    lastChats: [],
    activePerson: {},
})
export const getters = {
    getLastChats(state) {
        return state.lastChats
    },
    getActivePerson(state) {
        return state.activePerson
    },
}
export const mutations = {
    setLastChats(state, data) {
        state.lastChats = data
    },
    setActivePerson(state, data) {
        state.activePerson = data
    },
}

export const actions = {

}
