<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">Edit Date</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex>
            <v-date-picker v-model="editableDate" style="width: 100%" actions>
              <template scope="{save, cancel}">
                <v-btn flat class="blue--text darken-1"@click="editDialog=false">Close</v-btn>
                <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Save</v-btn>
              </template>
            </v-date-picker>
            <p> </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props:['meetup'],
    data () {
      return {
        editDialog: false,
        editableDate: null
      }
    },
    methods: {
      onSaveChanges(){
        const newDate = new Date(this.meetup.date)
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setMonth(newMonth)
        newDate.setUTCFullYear(newYear)

        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,

          date: newDate
        })

      }
    },
    created () {
      this.editableDate = new Date (this.meetup.date).toISOString().substr(0, 10)
      console.log(this.editableDate)
    }

  }
</script>
