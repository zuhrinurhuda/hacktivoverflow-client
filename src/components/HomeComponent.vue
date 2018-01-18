<template>
  <main class="ui vertically divided grid container">
    <div class="two column row">
      <div class="column">
        <h2 class="ui header">Lates Questions</h2>
      </div>
      <div class="right aligned column">
        <button class="ui positive button" v-if="user" @click="askQuestion">Ask Question</button>
      </div>
    </div>
    <questions-summaries v-for="question in questions" :question="question" :key="question._id"></questions-summaries>
  </main>
</template>

<script>
import QuestionsSummaries from '@/components/QuestionsSummaries'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    QuestionsSummaries
  },
  computed: {
    ...mapState([
      'user',
      'questions'
    ])
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

<style scoped>
.ui.grid {
  margin: 1rem;
}

.ui.grid>.row {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
