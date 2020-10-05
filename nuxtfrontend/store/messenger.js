export const strict = false

export const state = () => ({
    lastChats: [],
    userData:[],
    activePerson: {},
})
export const getters = {
    getLastChats(state) {
        return state.lastChats
    },
    getActivePerson(state) {
        return state.activePerson
    },
    getUserList(state) {
        return state.userData
    },
}
export const mutations = {
    setLastChats(state, data) {
        state.lastChats = data
    },
    setActivePerson(state, data) {
        state.activePerson = data
    },
    setUserList(state, data) {
        state.userData = data
    },
}

export const actions = {

}
