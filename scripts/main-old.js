'use strict';

var unityFirebaseGameOjbectName = 'JavascriptMessageReceiver';
var unityFirebaseMethodName = 'SetAuthToken';

/**
 * The ID of the currently signed-in User. We keep track of this to detect Auth state change events that are just
 * programmatic token refresh but not a User status change.
 */
var currentUID;
var firebaseToken;
var onAuthStateChangedCalled = false;
var isAnonymousUser = true;
/*
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */
function onAuthStateChanged(user) {
  // We ignore token refresh events.
  if (user && currentUID === user.uid) {
    console.log("main.js::onAuthStateChanged::ignore token refresh events.");
    return;
  }

  console.log("main.js::onAuthStateChanged");

  //cleanupUi();
  if (user) {
    // console.log("main.js::onAuthStateChanged::user exists");

    // currentUID = user.uid;

    // getIdToken();
    
  } else {
    console.log("main.js::onAuthStateChanged::no user");

    // Set currentUID to null.
    currentUID = null;
    firebaseToken = null;

    if(!onAuthStateChangedCalled)
    {
      console.log("Do Anon Login");
      firebaseSignInAnonymously();
    }
  }

  onAuthStateChangedCalled = true;
}

function onIdTokenChanged(user) 
{
  console.log("onIdTokenChanged1 ");
  if (user) 
  {
    console.log("onIdTokenChanged2 " + user.uid);

    currentUID = user.uid;
    isAnonymousUser = user.isAnonymous;
    getIdToken();
  }
  else
  {
    console.log("onIdTokenChanged3 ");
  }
}

function firebaseSignInAnonymously()
{
  firebase.auth().signInAnonymously().catch(function(error) {
    var errorCode = error.code;
    console.log("error logging in " + errorCode);
    console.error(error);
  });
}

function firebaseSignInWithEmail(email, password)
{
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("signInWithEmailAndPassword Success");
    }) 
    .catch(function(error) 
    {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("error logging in " + errorCode);
    console.error(error);
    window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseSignInWithEmailFailed", errorMessage);
    // ...
  });
}

function firebaseCreateUserWithEmail(email, password)
{  
  if(firebase.auth().currentUser != null && firebase.auth().currentUser.isAnonymous)
  {
    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    firebase.auth().currentUser.linkWithCredential(credential).then(function(user) {
      console.log("Anonymous account successfully upgraded", user);
    }, function(error) {
      console.log("Error upgrading anonymous account", error);
      console.error(error);
      window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseCreateUserWithEmailFailed", error.message);
    });
  }
}

// function firebaseSignInOld()
// {
//   console.log("main.js::firebaseSignIn");
//   var provider = new firebase.auth.GoogleAuthProvider();

//   if(isMobile())
//   {
//     firebase.auth().signInWithRedirect(provider);

//     firebase.auth().getRedirectResult().then(function(result) 
//     {
//       console.log("firebaseSignIn Complete " + result.user.displayName)
//     }, function(error) 
//     {
//       console.log("firebaseSignIn Error: " + error.code);
//     });
//   }
//   else
//   {
//     var oldUser = firebase.auth().currentUser;
//     console.log("1firebaseSignIn with Popup: Current currentUser " + firebase.auth().currentUser.uid);
//     firebase.auth().signInWithPopup(provider).then(function(result) 
//     {
//       console.log("2firebaseSignIn with Popup: oldUser " + oldUser.uid);
//       console.log("3firebaseSignIn with Popup: result currentUser " + result.user.uid);
    
//       console.log("firebaseSignIn Complete " + result.user.displayName);
//       if(oldUser != null && oldUser.isAnonymous && result.additionalUserInfo.isNewUser)
//       {
//         console.log("firebaseSignIn isnewuser");

//         oldUser.linkWithCredential(result.credential)
//           .then((usercred) => {
//             var user = usercred.user;
//             console.log("Anonymous account successfully upgraded", user);
//           }).catch((error) => {
//             console.log("Error upgrading anonymous account", error);
//           });
//       }
//     },
//     function(error) 
//     {
//       console.log("firebaseSignIn Error: " + error.code);
//     });
//   }
// }

function firebaseCreateUserWithGoogle()
{
  console.log("main.js::firebaseSignIn");
  var provider = new firebase.auth.GoogleAuthProvider();

  if(firebase.auth().currentUser != null && firebase.auth().currentUser.isAnonymous)
  {
    if(isMobile())
    {
      
    }
    else
    {
      console.log("1firebaseSignIn with Popup: Current currentUser " + firebase.auth().currentUser.uid);

      firebase.auth().currentUser.linkWithPopup(provider).then((result) => 
      {
        console.log("linkWithPopup  successful", result.user);
      }).catch((error) => 
      {
        var errorCode = error.code;
        console.log("error logging in " + errorCode);
        console.error(error);
        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseCreateUserWithEmailFailed", error.message);
      });
    }
  }
}


function firebaseSignInWithGoogle()
{
  console.log("main.js::firebaseSignIn");
  var provider = new firebase.auth.GoogleAuthProvider();

  if(isMobile())
  {
    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(result)
    {
      console.log("firebaseSignInWithGoogle Complete " + result.user.displayName)
    }, function(error) 
    {
      console.log("firebaseSignInWithGoogle Error: " + error.code);
      console.error(error);
      window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseSignInWithEmailFailed", error.message);
    });
  }
  else
  {
    firebase.auth().signInWithPopup(provider).then(function(result) 
    {
      console.log("firebaseSignInWithGoogle Complete " + result.user.displayName)
    },
    function(error) 
    {
      console.log("firebaseSignInWithGoogle Error: " + error.code);
      console.error(error);
      window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseSignInWithEmailFailed", error.message);
    });
  }
}

// function firebaseSignIn()
// {
//   console.log("1firebaseSignIn " + firebase.auth().currentUser.uid);
//     if(isMobile())
//     {

//     }
//     else
//     {
//       console.log("2firebaseSignIn ");
//       var credential = firebase.auth().GoogleAuthProvider.credential(
//         googleUser.getAuthResponse().id_token);
        
//         firebase.auth().currentUser.linkWithCredential(credential)
//         .then((usercred) => {
//           var user = usercred.user;
//           console.log("Anonymous account successfully upgraded", user);
//         }).catch((error) => {
//           console.log("Error upgrading anonymous account", error);
//         });
      
       
//     }

// }

function firebaseSignOut()
{
  console.log("main.js::firebaseSignOut");
  firebase.auth().signOut();
}

function getUserAuthDataAsJsonString()
{
  console.log("getUserAuthDataAsJsonString");
  if(currentUID != null && firebaseToken != null)
  {
    console.log("getUserAuthDataAsJsonString isAnonymous " + isAnonymousUser);
    var data = {authToken:firebaseToken,uid:currentUID,isAnonymous:isAnonymousUser};
    console.log("getUserAuthDataAsJsonString::Found");
    return JSON.stringify(data);
  }
  console.log("getUserAuthDataAsJsonString::null");
  return "";
}

var idTokenSetTime;

function getIdToken()
{
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then(function(idToken) {
    idTokenSetTime = new Date();
    firebaseToken = idToken;
    sendFirebaseTokenToUnity();

    console.log("Main.js::getIdToken");
  }).catch(function(error) {
    console.log("Main.js::getIdToken::ERROR");
    console.log(error);
    // Handle error
  });
}

function refreshFirebaseIdToken()
{
  var nowTime = new Date();

  console.log("refreshFirebaseIdToken::Check last time set " + idTokenSetTime);
  if((idTokenSetTime != null) && (nowTime - idTokenSetTime > 55*60*1000)) // 55 minutes. Needs to be refresed once every 60 mins
  {
    console.log("refreshFirebaseIdToken::Do Refresh");
    firebase.auth().currentUser.getIdToken(true);
  }
}

function sendFirebaseTokenToUnity()
{
    console.log("sendFirebaseTokenToUnity");

    if(window.unityGame != null)
    {
      window.unityGame.SendMessage(unityFirebaseGameOjbectName, unityFirebaseMethodName, getUserAuthDataAsJsonString());

      console.log("sent");
    }
}

function setV(val2)
{
    console.log("setV");

    if(window.unityGame != null)
    {
      window.unityGame.SendMessage(unityFirebaseGameOjbectName, "V2", val2);

      console.log("setV2 done " + val2);
    }
}

function isMobile()
{
  var isMobile = RegExp(/Android|webOS|iPhone|iPod|iPad/i).test(navigator.userAgent);
  return isMobile || isIpad();
}

function isTablet()
{
  var userAgent = navigator.userAgent.toLowerCase();
  var isAndroidTablet = ((userAgent.search("android") > -1) && !(userAgent.search("mobile") > -1));

  return isAndroidTablet || isIpad();
}

function isIpad()
{
  var isIpad = RegExp(/iPad/i).test(navigator.userAgent);

  if (!isIpad) 
  {
    const isMac = RegExp(/Macintosh/i).test(navigator.userAgent);

    if (isMac && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) 
    {
      isIpad = true;
    }
  }
  return isIpad;
}

function isIos()
{
  var isIos = (/iPhone|iPad|iPod/i.test(navigator.userAgent));
  return isIos || isIpad();
}

setInterval(refreshFirebaseIdToken, 30*1000);

function copyTextToClipboard(text) 
{
  var textArea = document.createElement("textarea");
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.warn('Unable to copy text');
  }
  document.body.removeChild(textArea);
}

window.copyText = function (text) {
  var listener = function () {

    copyTextToClipboard(text);
    if(isMobile())
    {
      document.removeEventListener('touchend', listener);
    }
    else
    {
      document.removeEventListener('mouseup', listener);
    }
    
  };

  if(isMobile())
  {
    document.addEventListener('touchend', listener);
  }
  else
  {
    document.addEventListener('mouseup', listener);
  }
};

function firebaseLogEvent(eventName)
{
  //console.log("log event " + eventName);
  if(firebaseSupported) firebase.analytics().logEvent(eventName);
}

function firebaseSetScreen(screenName)
{
  if(firebaseSupported) firebase.analytics().setCurrentScreen(screenName);  
  if(firebaseSupported) firebase.analytics().logEvent("screen_view", { "screen_name": screenName})
}

function firebaseLogEventWithParam(eventName, p, v)
{
  //console.log("log event " + eventName);
  if(firebaseSupported) firebase.analytics().logEvent(eventName, { [p]: v});
}

var fs = false;
function toggleFullscreen()
{
  if(fs)
  {
    console.log("exitFullScreen");
    exitFullScreen();
  }
  else
  {
    console.log("setElementFullScreen");    
    var elem = document.getElementById("mainContainer");
    setElementFullScreen(elem);
  }
  fs = !fs;
}


  function onNextMouseUp(a)
  {
    var listenerName = isMobile() ? 'touchend' : 'mouseup';
    var listener = function () {
          a();
          document.removeEventListener(listenerName, listener);
        };
        document.addEventListener(listenerName, listener);
  }

  function openUrl(url)
  {
    onNextMouseUp(function () {
      console.log("openUrl onNextMouseUp");
      window.open(url, "_blank");
    });
  }

  function setElementFullScreen(el) {
		onNextMouseUp(function () {
      var request = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
			request.call(el);
		});
	}

	function exitFullScreen() {
		onNextMouseUp(function () {
			var exitFS = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
			exitFS.call(document);
		});
  }
   
  function handleKeyDown(keycode) 
  {
    if(window.unityGame) window.unityGame.SendMessage(unityFirebaseGameOjbectName, "HandleKeyDown", keycode);
  }

  function handleKeyUp(keycode) 
  {
    if(window.unityGame) window.unityGame.SendMessage(unityFirebaseGameOjbectName, "HandleKeyUp", keycode);
  }
  

// Bindings on load.
window.addEventListener('load', function() {
  console.log('page is fully loaded');

  if (typeof firebase !== 'undefined' && firebase.auth() != null) 
  {
    // Listen for auth state changes
    firebase.auth().onAuthStateChanged(onAuthStateChanged);
    firebase.auth().onIdTokenChanged(onIdTokenChanged);
  }

}, false);


