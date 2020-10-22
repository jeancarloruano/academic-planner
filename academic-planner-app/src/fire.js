import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA-oZC5N9iR_ajuttUMpjJR8HyEJCku6iM",
    authDomain: "csudh-academic-planner.firebaseapp.com",
    databaseURL: "https://csudh-academic-planner.firebaseio.com",
    projectId: "csudh-academic-planner",
    storageBucket: "csudh-academic-planner.appspot.com",
    messagingSenderId: "350060450341",
    appId: "1:350060450341:web:d5ae4ccfa7c2205a72e5cc"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;