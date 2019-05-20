import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://www.publicdomainpictures.net/pictures/170000/velka/new-york-1462211884X1J.jpg',
        id: '3123fgsdf123',
        title: 'Meetup in New York',
        date: '2017-07-17',
        location: 'New York',
        description: 'New York party'
      },
      {
        imageUrl: 'https://cdn.pixabay.com/photo/2018/12/17/18/53/paris-3881047_960_720.jpg',
        id: 'tafwed2g323r',
        title: 'Meetup in Paris',
        date: '2017-07-19',
        location: 'Paris',
        description: 'Onion soup in Paris'
      },
      {
        imageUrl: 'https://cdn.pixabay.com/photo/2015/04/13/09/23/ukraine-720233_960_720.jpg',
        id: 'sdtshgweg43',
        title: 'Meetup in Kiev',
        date: '2018-08-18',
        location: 'Kiev',
        description: 'Hydropark party'
      }
    ],
    user: null
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    createMeetup({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'fdf' + Math.random()
      }
      // Reach out to firebase and store it
      commit('createMeetup', meetup)
    },
    signUpUser({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.user.uid,
              registeredMeetups: []
            }
            console.log(newUser.id)
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserIn({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user=>{
            const newUser = {
              id: user.user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error =>{
            console.log(error)
          }
        )
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    feturedMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user(state) {
      return state.user
    }
  }
})
