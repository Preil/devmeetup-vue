<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="info">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetups/new" class="info">Organise Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-3">
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="meetup in meetups"

            :src="meetup.imageUrl"
            :key="meetup.id"
            @click="onLoadMeetup(meetup.id)">
            <div class="title">
              <h1>{{meetup.title}}</h1>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        meetups: [
          {
            imageUrl: 'https://www.publicdomainpictures.net/pictures/170000/velka/new-york-1462211884X1J.jpg',
            id: '3123fgsdf123',
            title: 'Meetup in New York'
          },
          {
            imageUrl: 'https://cdn.pixabay.com/photo/2018/12/17/18/53/paris-3881047_960_720.jpg',
            id: 'tafwed2g323r',
            title: 'Meetup in Paris'
          },
          {
            imageUrl: 'https://cdn.pixabay.com/photo/2015/04/13/09/23/ukraine-720233_960_720.jpg',
            id: 'sdtshgweg43',
            title: 'Meetup in Kiev'
          }
        ]
      }
    },
    methods: {
      onLoadMeetup(id) {
        this.$router.push('/meetups/' + id)
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: (0, 0, 0, 0.5);
    color: white;
    font-size-adjust: revert;
    padding: 30px;
  }
</style>
