<template>
  <article class="row">
    <div class="column">
      <div class="ui segment">
        <div class="ui grid">
          <div class="one center aligned wide column">
            <span v-if="question.upVoters">{{ question.upVoters.length }}</span>
            <i class="thumbs outline up icon"></i>
          </div>
          <div class="one center aligned wide column">
            <span v-if="question.upVoters">{{ question.downVoters.length }}</span>
            <i class="thumbs outline down icon"></i>
          </div>
          <div class="one center aligned wide column">
            <span>0</span>
            <i class="comments outline icon"></i>
          </div>
          <div class="thirteen wide column">
            <div class="ui grid">
              <div class="row">
                <div class="column">
                  <router-link :to="{ name: 'detail', params: { id: question._id }}">
                    <h3 class="ui header">{{ question.title }}</h3>
                  </router-link>
                </div>
              </div>
              <div class="two column row">
                <div class="column">
                  <a class="ui small red horizontal label">{{ question.slug }}</a>
                </div>
                <div class="right aligned column">
                  <p>asked on {{ new Date(question.createdAt).toLocaleDateString() }} by {{ question.author.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'summaries',
  props: ['question']
}
</script>

<style scoped>
div.two.column.row {
  padding-top: 0;
}
</style>
