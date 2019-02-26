/*=================== Firebase ====================*/
const db = firebase.database();
const dbRef = db.ref().child('data');

dbRef.on('value', snapshot => {

    this.setState({
        data: snapshot.val()
    })
})

const tutRootRef = firebase.database().ref().child('react');
const speedRef = tutRootRef.child('speed');

speedRef.on('value', snap => {
    this.setState({
        firebaseTutVal: snap.val()
    });
});


/*=================== Axios ====================*/
/* Import */
import axios from 'axios';

/* GET */
getJson = () => {
    axios.get('scene-setup.json')
    .then(response => {
       this.setState({ jsonData: response.data["items"] })
    });
}

/* POST */
postJson = (items) => {
   axios.post('http://localhost:3001/postJson', {
       items
   })
   .then(function (response) {
       console.log("success!");
       console.log(response);
   })
   .catch(function (error) {
       console.log("error:");
       console.log(error);
   });
}
