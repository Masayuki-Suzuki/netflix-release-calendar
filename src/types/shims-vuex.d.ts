import { ActionContext, CommitOptions, DispatchOptions, GetterTree, MutationTree, Store as VuexStore } from 'vuex'
import { MutationTypes } from '@/store/mutations/mutation-types'
import { JSONBin, KeyedJSONBin } from './jsonbin'
import { ActionTypes } from '@/store/actions/action-types'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store
    }
}

declare module 'vuex' {
    export function useStore(key?: string): VuexStore<State>
}

export type MutationFunction<S, P> = (state: S, payload: P) => void

// Actions Type
export type AugmentedActionContext = {
    commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export type State = {
    netflixReleaseData: KeyedJSONBin[]
}
export type Getters<S = State> = GetterTree<S, S> & {
    netflixReleaseData: (state: S) => KeyedJSONBin[]
}
export type Mutations<S = State> = MutationTree<S> & {
    [MutationTypes.SET_API_DATA]: MutationFunction<S, KeyedJSONBin[]>
}

export type Actions<S = State> = {
    [ActionTypes.GET_API_DATA]({ commit }: AugmentedActionContext): Promise<JSONBin[]>
}

export type Store = Omit<VuexStore<State>, 'getters' | 'commit' | 'dispatch'> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>
} & {
    dispatch<K extends keyof Actions>(
        key: K,
        payload?: Parameters<Actions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<Actions[K]>
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    }
}
