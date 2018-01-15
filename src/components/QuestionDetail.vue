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
                <div class="actions">
                  <a class="upVoters" v-if="question.upVoters" @click="submitUpVote(question)">
                    {{ question.upVoters.length }}
                    <i class="thumbs outline up icon"></i>
                  </a>
                  <a class="downVoters" v-if="question.downVoters" @click="submitDownVote(question)">
                    {{ question.downVoters.length }}
                    <i class="thumbs outline down icon"></i>
                  </a>
                  <span v-if="user">
                    <a class="edit">Edit</a>
                    <a class="delete" v-if="user._id === question.author._id" @click="submitDeleteQuestion(question._id)">Delete</a>
                  </span>
                </div>
              </div>
              <answer-list :id="id"></answer-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import AnswerList from '@/components/AnswerList'
import { mapActions, mapMutations, mapState } from 'vuex'
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
      'upVoteQuestion',
      'downVoteQuestion',
      'deleteQuestion'
    ]),
    ...mapMutations(['setUpdatedQuestion']),
    submitUpVote: function (question) {
      if (this.user) {
        // try using optimistic method
        let userUpVoteIndex = question.upVoters.findIndex(element => element === this.user._id)
        let userDownVoteIndex = question.downVoters.findIndex(element => element === this.user._id)

        if (userUpVoteIndex === -1 && userDownVoteIndex === -1) { // false && false
          question.upVoters.push(this.user._id)
        } else if (userUpVoteIndex === -1 && userDownVoteIndex !== -1) { // false && true
          question.downVoters.splice(userDownVoteIndex, 1)
          question.upVoters.push(this.user._id)
        } else if (userUpVoteIndex !== -1 && userDownVoteIndex === -1) { // true && false
          question.upVoters.splice(userUpVoteIndex, 1)
        }

        this.setUpdatedQuestion(question)
        this.upVoteQuestion(question._id)
      } else {
        // nothing
      }
    },
    submitDownVote: function (question) {
      if (this.user) {
        // try using optimistic method
        let userUpVoteIndex = question.upVoters.findIndex(element => element === this.user._id)
        let userDownVoteIndex = question.downVoters.findIndex(element => element === this.user._id)

        if (userDownVoteIndex === -1 && userUpVoteIndex === -1) { // false && false
          question.downVoters.push(this.user._id)
        } else if (userDownVoteIndex === -1 && userUpVoteIndex !== -1) { // false && true
          question.upVoters.splice(userUpVoteIndex, 1)
          question.downVoters.push(this.user._id)
        } else if (userDownVoteIndex !== -1 && userUpVoteIndex === -1) { // true && false
          question.downVoters.splice(userDownVoteIndex, 1)
        }

        this.setUpdatedQuestion(question)
        this.downVoteQuestion(question._id)
      } else {
        // nothing
      }
    },
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
</style>
