<template>
  <v-app>
    <v-navigation-drawer app v-model="sideNav">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>supervisor_account</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark app class="primary">
      <v-toolbar-side-icon
        @click.stop="sideNav=!sideNav"
        class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>DevMeetup</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat>
          <v-icon left dark>supervisor_account</v-icon>
          View Meetups
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!--<v-main>-->
      <!--<h3>Dynamic content goes here</h3>-->
    <!--</v-main>-->

  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        sideNav: false
      }
    }
  }
</script>
