import { createStore } from 'vuex'
import state from '@/store/state'
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import { Store } from '@/types/shims-vuex'

export function useStore(): Store {
    return store
}

export const store = createStore({
    state,
    getters,
    mutations,
    actions,
    modules: {}
})
