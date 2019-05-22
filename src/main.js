import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog'

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCM5p1DMa97pJjd5vgnrCxPwuhWe-D6uS4',
      authDomain: 'devmeetup-efe09.firebaseapp.com',
      databaseURL: 'https://devmeetup-efe09.firebaseio.com',
      projectId: 'devmeetup-efe09',
      storageBucket: 'gs://devmeetup-efe09.appspot.com',
      messagingSenderId: '143117801202',
      appId: '1:143117801202:web:5fcaf9d1b29610d9'
    })
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
