import {createRouter, createWebHistory} from "vue-router";

const routes = [
   
    {
        path: '/',
        name: 'State',
        component: () => import('../views/State.vue')
    },
    {
        path: '/:province',
        name: 'testPage',
        component: () => import('../views/provincePage.vue')
    },

]

const router = createRouter({
    //history模式：createWebHistory , hash模式：createWebHashHistory
    history: createWebHistory(),
    routes
})
export default router;
