import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import QuestionsSummaries from '@/components/QuestionsSummaries'
import DetailPage from '@/components/DetailPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HomePage,
      children: [
        {
          path: '',
          name: 'home',
          component: QuestionsSummaries
        }
      ]
    },
    {
      path: '/questions/:id',
      name: 'detail',
      component: DetailPage,
      props: true
    }
  ]
})
