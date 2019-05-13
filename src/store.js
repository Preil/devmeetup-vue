import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://www.publicdomainpictures.net/pictures/170000/velka/new-york-1462211884X1J.jpg',
        id: '3123fgsdf123',
        title: 'Meetup in New York',
        date: '2017-07-17'
      },
      {
        imageUrl: 'https://cdn.pixabay.com/photo/2018/12/17/18/53/paris-3881047_960_720.jpg',
        id: 'tafwed2g323r',
        title: 'Meetup in Paris',
        date: '2017-07-19'
      },
      {
        imageUrl: 'https://cdn.pixabay.com/photo/2015/04/13/09/23/ukraine-720233_960_720.jpg',
        id: 'sdtshgweg43',
        title: 'Meetup in Kiev',
        date: '2018-08-18'
      }
    ],
    user: {
      id: 'sgterwgtdf2342342',
      registeredMeetups: ['sdtshgweg43']
    }
  }
  ,
  mutations: {
    createMeetup(state, payload){
      state.loadedMeetups.push(payload)
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
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB)=>{
        return meetupA.date > meetupB.date
      })
    },
    feturedMeetups(state, getters){
      return getters.loadedMeetups.slice(0,5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }

    }
  }
})
