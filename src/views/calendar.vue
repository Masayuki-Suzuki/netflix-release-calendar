<template lang="pug">
article.calendar

    //- Show year and month, also buttons.
    header.calendar-header
        button.prev(@click="moveMonth('prev')")
            font-awesome-icon(icon="angle-left" size="2x")

        span {{ monthFormatter($route.params.year, $route.params.month) }} {{ $route.params.year }}

        button.next(@click="moveMonth('next')")
            font-awesome-icon(icon="angle-right" size="2x")

    //- Calendar
    .calendar-body
        //- Show day of the week
        .calendar-body__dow.dow
            .dow__item(v-for="day in dayOfTheWeek" :key="day") {{ day }}

        .calendar-body__item
            .item(v-for="day in calendarData" :value="day")
                router-link.movies(
                    v-if="!!netflixReleaseData && netflixReleaseData[`${generateFullDate(day)}`] && day.length"
                    :to="`/${$route.params.year}/${addZeroToNumber($route.params.month)}/${addZeroToNumber(day)}`"
                )
                    p.date {{ day }}
                    ul.movies__body
                        li.movies__item {{ netflixReleaseData[`${generateFullDate(day)}`].title }}

                p.date(v-else) {{ day }}
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome/src/components/FontAwesomeIcon'
import router from '@/router'
import { useStore } from '@/store'
import { addZeroToNumber, monthFormatter } from '@/libs/helpers'

library.add(fas)

export default defineComponent({
    name: 'calendar',
    components: {
        FontAwesomeIcon
    },
    setup() {
        //------------------------------------------
        // Non Reactive Data
        const dayOfTheWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
        const store = useStore()

        //------------------------------------------
        // Reactive Data
        const params = ref(router.currentRoute.value.params)
        const currentYearAsNumber = ref(parseInt(params.value.year as string, 10))
        const currentMonthAsNumber = ref(parseInt(params.value.month as string, 10))
        // const calendarData = ref<CalendarDate[]>([])
        const netflixReleaseData = computed(() => store.getters.netflixReleaseData)

        // Create calendar array
        const calendarData = computed(() => {
            // Get day of the week of first day
            const firstDay = new Date(currentYearAsNumber.value, currentMonthAsNumber.value, 1).getDay()

            // Get last day of current month
            const lastDate = new Date(currentYearAsNumber.value, currentMonthAsNumber.value, 0).getDate()

            // Generate Spacer
            const necessarySpace = firstDay === 0 ? 6 : firstDay - 1

            // Add date number
            const list = [
                [...Array(necessarySpace)].map(_ => ''),
                [...Array(lastDate)].map((_, i) => {
                    const num = i + 1 < 10 ? '0' + (i + 1) : i + 1
                    return num.toString()
                })
            ]

            // Concat spacer and date
            const calendarDataArray = list.reduce((pre: string[], cur) => {
                pre.push(...(cur as string[]))
                return pre
            }, [])

            return calendarDataArray
        })

        //------------------------------------------
        // Lifecycle Methods

        onBeforeMount(async () => {
            // if month is grater than 12 or less than 1 or year is less than 1900, move to current date.
            if (currentMonthAsNumber.value > 12 || currentMonthAsNumber.value < 1 || currentYearAsNumber.value < 1900) {
                // redirect
                await router.push(`/`)

                // vue-router doesn't render again so we have to update values manually.
                currentYearAsNumber.value = new Date().getFullYear()
                currentMonthAsNumber.value = new Date().getMonth() + 1
            }
        })

        //------------------------------------------
        // Methods

        const currentYearMonth = `${currentYearAsNumber.value}-${addZeroToNumber(currentMonthAsNumber.value)}`

        const generateFullDate = day => {
            return `${currentYearMonth}-${addZeroToNumber(day)} 00:00:00`
        }

        // Change month
        const moveMonth = (direction: 'prev' | 'next'): void => {
            let targetYear: number
            let targetMonth: number
            if (direction === 'prev') {
                targetYear =
                    currentMonthAsNumber.value === 1 ? currentYearAsNumber.value - 1 : currentYearAsNumber.value
                targetMonth = currentMonthAsNumber.value === 1 ? 12 : currentMonthAsNumber.value - 1
            } else {
                targetYear =
                    currentMonthAsNumber.value === 12 ? currentYearAsNumber.value + 1 : currentYearAsNumber.value
                targetMonth = currentMonthAsNumber.value === 12 ? 1 : currentMonthAsNumber.value + 1
            }

            // redirect
            router.push(`/${targetYear}/${addZeroToNumber(targetMonth)}`)
        }

        return {
            dayOfTheWeek,
            calendarData,
            netflixReleaseData,
            currentYearMonth,
            monthFormatter,
            moveMonth,
            addZeroToNumber,
            generateFullDate
        }
    }
})
</script>

<style lang="sass" scoped>
.calendar-header
    display: flex
    align-items: center
    justify-content: center
    font-size: 24px
    font-weight: 700

    button
        background: #fff
        border: 0
        position: relative
        cursor: pointer

    span
        width: 240px

.prev::after
    content: ''
    display: block
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50% -50%)

.calendar-body
    max-width: 980px
    margin: 24px auto 0

    &__item
        display: grid
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))
        grid-auto-rows: minmax(140px, auto)

.item
    text-align: center
    padding: 12px

    ul, li
        padding: 0
        list-style: none

.dow
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))
    align-items: center
    justify-content: space-between

.dow__item
    font-size: 16px
    font-weight: 700
    letter-spacing: .03em
    text-align: center
    text-transform: uppercase
</style>
