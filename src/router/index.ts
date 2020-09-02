import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: () => {
            // Redirect to current date route.
            const currentDate = new Date()
            const currentMonth =
                currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1
            return `/${currentDate.getFullYear()}/${currentMonth}`
        }
    },
    {
        path: '/:year/:month',
        name: 'Calendar',
        component: () => import('@/views/calendar.vue')
    },
    {
        path: '/:year/:month/:day',
        name: 'MovieDetails',
        component: () => import('@/views/movieDetails.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
