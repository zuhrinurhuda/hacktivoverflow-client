<template>
  <main class="ui vertically divided grid container">
    <div class="two column row">
      <div class="column">
        <h2 class="ui header">Lates Questions</h2>
      </div>
      <div class="right aligned column">
        <button class="ui positive button" @click="askQuestion">Ask Question</button>
      </div>
    </div>
    <questions-summaries v-for="(question, index) in questions" :question="question" :key="index"></questions-summaries>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import QuestionsSummaries from '@/components/QuestionsSummaries'
export default {
  name: 'home',
  components: {
    QuestionsSummaries
  },
  computed: {
    ...mapState(['questions'])
  },
  methods: {
    ...mapActions(['getAllQuestions']),
    askQuestion: function () {
      $('.ui.modal').modal('show')
    }
  },
  mounted: function () {
    this.getAllQuestions()
  }
}
</script>

<style>
</style>
