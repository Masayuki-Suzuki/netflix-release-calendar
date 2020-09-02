<template lang="pug">
.details
    .details-wrapper
        p.movie-id ID: {{ netflixReleaseData.id }}
        h2.title {{ netflixReleaseData.title }}
        p.date {{ format(new Date(netflixReleaseData.launch_date), 'MMMM dd, Y') }}
        p.link
            router-link(:to="`/${$route.params.year}/${$route.params.month}`") Back
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { addZeroToNumber } from '@/libs/helpers'
import router from '@/router'
import { useStore } from '@/store'
import { format } from 'date-fns'

export default defineComponent({
    name: 'MovieDetails',
    setup() {
        const store = useStore()
        const params = ref(router.currentRoute.value.params)
        const currentYearAsNumber = ref(parseInt(params.value.year as string, 10))
        const currentMonthAsNumber = ref(parseInt(params.value.month as string, 10))
        const currentYearMonth = `${currentYearAsNumber.value}-${addZeroToNumber(currentMonthAsNumber.value)}`
        const fullDate = computed(() => `${currentYearMonth}-${addZeroToNumber(params.value.day)} 00:00:00`)
        const netflixReleaseData = computed(() => store.getters.netflixReleaseData[`${fullDate.value}`])

        return {
            fullDate,
            netflixReleaseData,
            addZeroToNumber,
            format
        }
    }
})
</script>

<style lang="sass" scoped></style>
