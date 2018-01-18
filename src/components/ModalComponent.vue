<template>
  <div class="ui modal">
    <i class="close icon"></i>
    <div class="header">Ask Question</div>
    <div class="content">
      <div class="ui form">
        <div class="two fields">
          <div class="field">
            <label>Title</label>
            <input type="text" placeholder="title" v-model="newQuestion.title">
          </div>
          <div class="field">
            <label>Slugs</label>
            <input type="text" placeholder="separate with commas" v-model="newQuestion.slugs">
          </div>
        </div>
        <div class="field">
          <label>Content</label>
          <textarea rows="10" v-model="newQuestion.content"></textarea>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui black deny button">Cancel</div>
      <div class="ui positive button" @click="submitQuestion">Submit</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'modal',
  data: function () {
    return {
      newQuestion: {
        title: '',
        content: '',
        slugs: ''
      }
    }
  },
  methods: {
    ...mapActions(['addNewQuestion']),
    submitQuestion: function () {
      this.addNewQuestion(this.newQuestion)
    }
  }
}
</script>

<style>
</style>
