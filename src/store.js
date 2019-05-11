import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
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
    ],
    user: {
      id: 'sgterwgtdf2342342',
      registeredMeetups: ['sdtshgweg43']
    }
  }
  ,
  mutations: {

  },
  actions: {

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
