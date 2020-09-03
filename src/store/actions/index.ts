import { ActionTypes } from '@/store/actions/action-types'
import { AugmentedActionContext } from '@/types/shims-vuex'
import { JSONBin } from '@/types/jsonbin'
import axios from 'axios'
import { MutationTypes } from '@/store/mutations/mutation-types'

export default {
    async [ActionTypes.GET_API_DATA]({ commit }: AugmentedActionContext): Promise<JSONBin[]> {
        const { data } = await axios.get('https://api.jsonbin.io/b/5f4f3be64d8ce41113870214', {
            params: {},
            headers: {
                'secret-key': '$2b$10$bb0a' + process.env.VUE_APP_JSONBIN_API_KEY
            }
        })
        const KeyedData = data.data.reduce((o, c) => ({ ...o, [c.launch_date]: c }), {})

        commit(MutationTypes.SET_API_DATA, KeyedData)
        return data.data
    }
}
