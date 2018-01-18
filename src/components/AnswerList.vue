<template>
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
        <div class="actions">
          <a class="upVoters" v-if="answer.upVoters" @click="submitUpVote(answer)">
            {{ answer.upVoters.length }}
            <i class="thumbs outline up icon"></i>
          </a>
          <a class="downVoters" v-if="answer.upVoters" @click="submitDownVote(answer)">
            {{ answer.downVoters.length }}
            <i class="thumbs outline down icon"></i>
          </a>
          <a class="delete" v-if="user && user._id === answer.author._id" @click="submitDeleteAnswer(answer._id)">Delete</a>
        </div>
      </div>
    </div>
    <form class="ui reply form" v-if="user">
      <div class="field">
        <textarea v-model="answer"></textarea>
      </div>
      <div class="ui blue labeled submit icon button" @click="submitAddAnswer">
        <i class="icon edit"></i>Add Answer
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'answer',
  props: ['id'],
  data: function () {
    return {
      answer: ''
    }
  },
  computed: {
    ...mapState([
      'user',
      'answers'
    ])
  },
  methods: {
    ...mapActions([
      'getAnswersByQuestionId',
      'addNewAnswer',
      'upVoteAnswer',
      'downVoteAnswer',
      'deleteAnswer'
    ]),
    ...mapMutations([
      'setUpdatedAnswer',
      'setDeletedAnswer'
    ]),
    submitAddAnswer: function () {
      if (this.user) {
        let newAnswer = {
          question: this.id,
          content: this.answer
        }

        this.addNewAnswer(newAnswer)
        this.answer = ''
      } else {
        // nothing
      }
    },
    submitUpVote: function (answer) {
      if (this.user) {
        // try using optimistic method
        let userUpVoteIndex = answer.upVoters.findIndex(element => element === this.user._id)
        let userDownVoteIndex = answer.downVoters.findIndex(element => element === this.user._id)

        if (userUpVoteIndex === -1 && userDownVoteIndex === -1) { // false && false
          answer.upVoters.push(this.user._id)
        } else if (userUpVoteIndex === -1 && userDownVoteIndex !== -1) { // false && true
          answer.downVoters.splice(userDownVoteIndex, 1)
          answer.upVoters.push(this.user._id)
        } else if (userUpVoteIndex !== -1 && userDownVoteIndex === -1) { // true && false
          answer.upVoters.splice(userUpVoteIndex, 1)
        }

        this.setUpdatedAnswer(answer)
        this.upVoteAnswer(answer._id)
      } else {
        // nothing
      }
    },
    submitDownVote: function (answer) {
      if (this.user) {
        // try using optimistic method
        let userUpVoteIndex = answer.upVoters.findIndex(element => element === this.user._id)
        let userDownVoteIndex = answer.downVoters.findIndex(element => element === this.user._id)

        if (userDownVoteIndex === -1 && userUpVoteIndex === -1) { // false && false
          answer.downVoters.push(this.user._id)
        } else if (userDownVoteIndex === -1 && userUpVoteIndex !== -1) { // false && true
          answer.upVoters.splice(userUpVoteIndex, 1)
          answer.downVoters.push(this.user._id)
        } else if (userDownVoteIndex !== -1 && userUpVoteIndex === -1) { // true && false
          answer.downVoters.splice(userDownVoteIndex, 1)
        }

        this.setUpdatedAnswer(answer)
        this.downVoteAnswer(answer._id)
      } else {
        // nothing
      }
    },
    submitDeleteAnswer: function (id) {
      this.setDeletedAnswer(id)
      this.deleteAnswer(id)
    }
  },
  mounted: function () {
    this.getAnswersByQuestionId(this.id)
  }
}
</script>

<style>
</style>
