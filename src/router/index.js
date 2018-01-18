import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/components/HomeComponent'
import QuestionsSummaries from '@/components/QuestionsSummaries'
import QuestionDetail from '@/components/QuestionDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HomeComponent,
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
      component: QuestionDetail,
      props: true
    }
  ]
})
