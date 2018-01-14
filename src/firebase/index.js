import { initializeApp } from 'firebase'

const firebase = initializeApp({
  apiKey: 'AIzaSyBM0EGdWh_Y_3YNuGsy_Vi_08RLXnvjiIY',
  authDomain: 'kanbanfire.firebaseapp.com',
  databaseURL: 'https://kanbanfire.firebaseio.com',
  projectId: 'kanbanfire',
  storageBucket: 'kanbanfire.appspot.com',
  messagingSenderId: '825531020462'
})

export default firebase
