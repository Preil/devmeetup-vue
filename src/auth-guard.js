import { store } from './store'

export default (to, from, next) => {
  if(store.getter.user){
    next()
  } else {
    next('/signin')
  }
}
