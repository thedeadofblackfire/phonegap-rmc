/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
        // Do cool things here...
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

 // A button will call this function
// To capture photo
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(uploadPhoto, onFail, { 
        quality: 50, destinationType: Camera.DestinationType.FILE_URI 
    });
}

// A button will call this function
// To select image from gallery
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto, onFail, { quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    });
}

function uploadPhoto(imageURI) {
    //If you wish to display image on your page in app
    // Get image handle
    var largeImage = document.getElementById('largeImage');

    // Unhide image elements
    largeImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    largeImage.src = imageURI;

    var options = new FileUploadOptions();
    options.fileKey = "recFile";
    var userid = '123456';
    var imagefilename = userid + Number(new Date()) + ".jpg";
    options.fileName = imageURI;
	//options.fileName = imagefilename;
    options.mimeType = "image/jpeg"; //"image/jpg";

    var params = new Object();
    params.imageURI = imageURI;
    //params.userid = sessionStorage.loginuserid;
    options.params = params;
    options.chunkedMode = false;
    
    var ft = new FileTransfer();
    var url = encodeURI("http://rmcapp.eoi.com/upload.php");
    ft.upload(imageURI, "http://rmcapp.eoi.com/upload.php", win, fail, options, true);
}
//Success callback
function win(r) {
    alert("Image uploaded successfully!!");
    alert("Sent = " + r.bytesSent); 
	alert(r.response);
}
//Failure callback
function fail(error) {
   alert("There was an error uploading image");
   
   switch (error.code) 
    {  
     case FileTransferError.FILE_NOT_FOUND_ERR: 
      alert("Photo file not found"); 
      break; 
     case FileTransferError.INVALID_URL_ERR: 
      alert("Bad Photo URL"); 
      break; 
     case FileTransferError.CONNECTION_ERR: 
      alert("Connection error"); 
      break; 
    } 

    alert("An error has occurred: Code = " + error.code); 
}
// Called if something bad happens.
// 
function onFail(message) {
    alert('Failed because: ' + message);
	var msg ='Impossible de lancer l\'appareil photo';
        navigator.notification.alert(msg, null, '');
       
}