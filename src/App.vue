<template lang="pug">
.container
    router-view(:key="$route.path" :netflix_data="netflixReleaseData")
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { JSONBin } from '@/types/jsonbin'
import { useStore } from '@/store'
import { ActionTypes } from '@/store/actions/action-types'

export default defineComponent({
    name: 'App',
    setup() {
        const store = useStore()
        const netflixReleaseData = ref<JSONBin[]>([])

        onBeforeMount(async () => {
            await store.dispatch(ActionTypes.GET_API_DATA)
        })

        return { netflixReleaseData }
    }
})
</script>

<style lang="sass">
#app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50

.container
    padding: 32px
</style>
