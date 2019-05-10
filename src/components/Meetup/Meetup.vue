<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h2 class="primary--text">My Meetup</h2>
          </v-card-title>
          <v-card-media
            src="https://www.publicdomainpictures.net/pictures/170000/velka/new-york-1462211884X1J.jpg"
            height="400px">
          </v-card-media>
          <v-card-text>
            <div class="info--text">17th Jule 2017</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores dolores ducimus eius eos laudantium libero nam voluptatem. Blanditiis consectetur, corporis
              cupiditate debitis doloremque exercitationem officiis! Eaque illum odit officia quo? </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "Meetup"
  }
</script>

<style scoped>

</style>
