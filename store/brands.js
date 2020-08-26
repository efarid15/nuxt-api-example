export const state = () => ({
    palette: [],
    colors: []
})

export const mutations = {
    SET_PALETTE_DATA(state, payload) {
        state.palette = payload
    },
    SET_COLORS_DATA(state, payload) {
        state.colors = payload
    },
    SET_ERRORS(state, payload) {
        state.error = payload
    }
}

export const actions = {
    getPaletteData({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get('accounts/brands/getpalette').then((response) => {
                let paletteData = [response.data.results]
                commit('SET_PALETTE_DATA', paletteData)
                resolve()
            })
        })
    },
    storeBrandsData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('accounts/brands/addpalette', payload)
            .then(() => {
                dispatch('getPaletteData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    },
    renamePaletteData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.put('accounts/brands/renamepalette', payload)
            .then(() => {
                dispatch('getPaletteData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    },
    destroyPaletteData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete('accounts/brands/deletepalette')
            .then(() => {
                dispatch('getPaletteData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    },

}