const firebaseConfig = {
    apiKey: "AIzaSyA95rq2gZ2o6JfiH-a2tcPMLi97evcW3mE",
authDomain: "dhub-09.firebaseapp.com",
databaseURL: "https://dhub-09-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "dhub-09",
storageBucket: "gs://dhub-09.appspot.com",
messagingSenderId: "486177348563",
appId:  "1:486177348563:web:ca1216297cddd106ad6d26",
measurementId: "G-HSJP70KW1N"
};

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get form values
    const videoFile = document.getElementById('videoFile').files[0];
    const imageFile = document.getElementById('imgFile').files[0];
    const title = document.getElementById('title').value;
    const dataNumber = document.getElementById('dataNumber').value;
    const category = document.getElementById('category').value;
  
    // Upload video to Firebase Storage
   // Paths in storage and database
   const storagePath = `uploads/${category}/`;
    const databasePath = `uploads/${category}`;
  
    // Upload video
    const videoUploadTask = firebase.storage().ref(`${storagePath}/video/${videoFile.name}`).put(videoFile);
    videoUploadTask.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((videoUrl) => {
        console.log('Video URL:', videoUrl);
        
        // Upload image after video upload completes
        const imageUploadTask = firebase.storage().ref(`${storagePath}/image/${imageFile.name}`).put(imageFile);
        imageUploadTask.then((snapshot) => {
          snapshot.ref.getDownloadURL().then((imageUrl) => {
            console.log('Image URL:', imageUrl);
            
            // Save metadata to database
            firebase.database().ref(databasePath).push({
              title: title,
              dataNumber: dataNumber,
              videoUrl: videoUrl,
              imageUrl: imageUrl
            }).then(() => {
              alert('Upload successful!');
            });
          });
        });
      });
    });
  });