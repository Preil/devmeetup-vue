import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      // {
      //   imageUrl: 'https://www.publicdomainpictures.net/pictures/170000/velka/new-york-1462211884X1J.jpg',
      //   id: '3123fgsdf123',
      //   title: 'Meetup in New York',
      //   date: '2017-07-17',
      //   location: 'New York',
      //   description: 'New York party'
      // },
      // {
      //   imageUrl: 'https://cdn.pixabay.com/photo/2018/12/17/18/53/paris-3881047_960_720.jpg',
      //   id: 'tafwed2g323r',
      //   title: 'Meetup in Paris',
      //   date: '2017-07-19',
      //   location: 'Paris',
      //   description: 'Onion soup in Paris'
      // },
      // {
      //   imageUrl: 'https://cdn.pixabay.com/photo/2015/04/13/09/23/ukraine-720233_960_720.jpg',
      //   id: 'sdtshgweg43',
      //   title: 'Meetup in Kiev',
      //   date: '2018-08-18',
      //   location: 'Kiev',
      //   description: 'Hydropark party'
      // }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser(state, payload) {
      state.user = payload
      console.log(state.user)
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    loadMeetups({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
            commit('setLoading', false)
            commit('setLoadedMeetups', meetups)
          }
        })
        .catch((error) => {
          commit('setLoading', true)
          console.log(error)
          commit('setLoading', false)

        })
    },
    createMeetup({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          console.log(data)
          const key = data.key
          commit('createMeetup', {
            ...meetup,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })

    },
    signUpUser({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
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
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    logout({commit}){
      firebase.auth().signOut()
      commit('setUser', null)
    },
    autoSignIn({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    signUserIn({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    clearError({commit}, payload) {
      commit('clearError')
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
    },
    error(state) {
      return state.error
    },
    loading(state) {
      return state.loading
    }
  }
})
