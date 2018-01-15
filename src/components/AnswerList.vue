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
        <div class="actions" v-if="answer.upVoters">
          <a class="upVoters" v-if="answer.upVoters">
            {{ answer.upVoters.length }}
            <i class="thumbs outline up icon"></i>
          </a>
          <a class="downVoters" v-if="answer.upVoters">
            {{ answer.downVoters.length }}
            <i class="thumbs outline down icon"></i>
          </a>
          <a class="delete" v-if="user && user._id === answer.author._id" @click="submitDeleteAnswer(answer._id)">Delete</a>
        </div>
      </div>
    </div>
    <form class="ui reply form">
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
      'deleteAnswer'
    ]),
    ...mapMutations(['setDeletedAnswer']),
    submitAddAnswer: function () {
      let newAnswer = {
        question: this.id,
        content: this.answer
      }

      this.addNewAnswer(newAnswer)
      this.answer = ''
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
