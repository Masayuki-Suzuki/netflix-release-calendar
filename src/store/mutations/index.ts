import { Mutations, State } from '@/types/shims-vuex'
import { MutationTypes } from '@/store/mutations/mutation-types'
import { KeyedJSONBin } from '@/types/jsonbin'

export default {
    [MutationTypes.SET_API_DATA](state: State, payload: KeyedJSONBin[]) {
        state.netflixReleaseData = payload
    }
} as Mutations
