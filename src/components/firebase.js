import firebase from 'firebase'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import Dashboard from './Dashboard'
import { debounce } from '@material-ui/core'

const config = {
    apiKey: "AIzaSyBvMoYI1X6g1gX5bUzqqOOmMaYjvRmlskw",
    authDomain: "assignment-2e2ee.firebaseapp.com",
    databaseURL: "https://assignment-2e2ee.firebaseio.com",
    projectId: "assignment-2e2ee",
    storageBucket: "assignment-2e2ee.appspot.com",
    messagingSenderId: "897153109447",
    appId: "1:897153109447:web:1f452aa66144e6136f9de2",
    measurementId: "G-Y7DTHXFD0J"
  }

  

  class Firebase{
      constructor() {
          app.initializeApp(config)
          this.auth = app.auth()
          this.db = app.firestore()
      }

      login(email, password) {
          return this.auth.signInWithEmailAndPassword(email, password)
      }

      logout(){

        return this.auth.signOut()
      }

      async register(name,  bloodgroup, city, dob, email, password){
          await this.auth.createUserWithEmailAndPassword(email, password)
          return this.auth.currentUser.updateProfile({
             displayName: name,
            
             displayBloodgroup: bloodgroup,
             displayCity: city,
             displayDob: dob

             
          })

  }

  addQuote(quote) {
    if(!this.auth.currentUser) {
        return alert('Not authorized')
    }

    return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
        quote
    })
}

addAge(age) {
    if(!this.auth.currentUser) {
        return alert('Not authorized')
    }

    return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
        age
    })
}

isInitialized() {
    return new Promise(resolve => {
        this.auth.onAuthStateChanged(resolve)
    })
}

getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName
}


 getCurrentUserage() {
    return this.auth.currentUser && this.auth.currentUser.displayAge
}

getCurrentUserbloodgroup() {
    return this.auth.currentUser && this.auth.currentUser.displayBloodgroup
}

getCurrentUsercity() {
    return this.auth.currentUser && this.auth.currentUser.displayCity
}


getCurrentUserdob() {
    return this.auth.currentUser && this.auth.currentUser.displayDob
}
async getCurrentUserQuote() {
    const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
    return quote.get('quote')
}

async getCurrentUserAge() {
    const age = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
    return age.get('age')
}
}
export default new Firebase()