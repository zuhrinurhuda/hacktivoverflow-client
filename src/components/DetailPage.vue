<template>
  <main class="ui centered stackable grid container" v-if="question">
    <div class="row">
      <div class="ten wide column">
        <div class="ui segment">
          <div class="ui comments">
            <h3 class="ui dividing header">{{ question.title }}</h3>
            <div class="comment">
              <a class="avatar" v-if="question.author">
                <img :src="question.author.avatar">
              </a>
              <div class="content" v-if="question.author">
                <a class="author">{{ question.author.name }}</a>
                <div class="metadata">
                  <span class="date">{{ new Date(question.createdAt).toDateString() }}</span>
                </div>
                <div class="text">
                  <p>{{ question.content }}</p>
                </div>
                <div class="actions" v-if="question.upVoters">
                  <a class="upVoters" v-if="question.upVoters">
                    {{ question.upVoters.length }}
                    <i class="thumbs outline up icon"></i>
                  </a>
                  <a class="downVoters" v-if="question.upVoters">
                    {{ question.downVoters.length }}
                    <i class="thumbs outline down icon"></i>
                  </a>
                  <a class="delete">Delete</a>
                </div>
              </div>
              <div class="comments">
                <div class="comment" v-for="answer in answers" :key="answer._id">
                  <a class="avatar" v-if="answer.author">
                    <img :src="answer.author.avatar">
                  </a>
                  <div class="content" v-if="answer.author">
                    <a class="author">{{ answer.author.name }}</a>
                    <div class="metadata">
                      <span class="date">{{ new Date(answer.createdAt).toDateString() }}</span>
                    </div>
                    <div class="text">{{ answer.content }}</div>
                    <div class="actions" v-if="answer.upVoters">
                      <a class="upVoters" v-if="answer.upVoters">
                        {{ answer.upVoters.length }}
                        <i class="thumbs outline up icon"></i>
                      </a>
                      <a class="downVoters" v-if="answer.upVoters">
                        {{ answer.downVoters.length }}
                        <i class="thumbs outline down icon"></i>
                      </a>
                      <a class="delete">Delete</a>
                    </div>
                  </div>
                </div>
                <form class="ui reply form">
                  <div class="field">
                    <textarea v-model="answer"></textarea>
                  </div>
                  <div class="ui blue labeled submit icon button" @click="submitAnswer(question._id)">
                    <i class="icon edit"></i>Add Answer
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'detail',
  props: ['id'],
  data: function () {
    return {
      answer: ''
    }
  },
  computed: {
    ...mapState(['question', 'answers'])
  },
  methods: {
    ...mapActions(['getQuestionById', 'getAnswersByQuestionId', 'addNewAnswer']),
    submitAnswer: function (id) {
      let newAnswer = {
        question: id,
        content: this.answer
      }

      this.addNewAnswer(newAnswer)
      this.answer = ''
    }
  },
  mounted: function () {
    this.getQuestionById(this.id)
    this.getAnswersByQuestionId(this.id)
  }
}
</script>

<style scoped>
.ui.grid {
  margin: 1rem;
}

.ui.form textarea:not([rows]) {
  min-height: 5em;
}

.ui.comments .reply.form textarea {
  height: 5em;
}
</style>
