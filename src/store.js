import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [],
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
              location: obj[key].location,
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
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref().child('meetups/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          return fileData.ref.getDownloadURL()
        })
        .then((url) => {
          imageUrl = url
          console.log(imageUrl)
          return firebase.database().ref('meetups').child(key).update({imageUrl})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl,
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
    }
    ,
    logout({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
    ,
    autoSignIn({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    }
    ,
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
    }
    ,
    clearError({commit}, payload) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    }
    ,
    feturedMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    }
    ,
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
    ,
    user(state) {
      return state.user
    }
    ,
    error(state) {
      return state.error
    }
    ,
    loading(state) {
      return state.loading
    }
  }
})
