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
                  <span v-if="user">
                    <a class="edit">Edit</a>
                    <a class="delete" v-if="user._id === question.author._id" @click="submitDeleteQuestion(question._id)">Delete</a>
                  </span>
                </div>
              </div>
              <!-- <answer-list :user="user" :question="question"></answer-list> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    {{ user }}
  </main>
</template>

<script>
import AnswerList from '@/components/AnswerList'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'detail',
  props: ['id'],
  components: {
    AnswerList
  },
  computed: {
    ...mapState([
      'user',
      'question'
    ])
  },
  methods: {
    ...mapActions([
      'getQuestionById',
      'deleteQuestion'
    ]),
    submitDeleteQuestion: function (id) {
      this.deleteQuestion(id)
        .then(() => this.$router.replace({ name: 'home' }))
    }
  },
  mounted: function () {
    this.getQuestionById(this.id)
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
