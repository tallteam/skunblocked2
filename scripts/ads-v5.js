'use strict';

// const divIdMainMenuBanner = "adContainer";
// const divIdMainMenuBanner2 = "adContainerMainMenu";
// const divIdWinCeremonyBanner = "adContainer2";
// const divIdWinCeremonyBanner2 = "adContainerWin";
const divIdLongBanner = "adLongContainer";
// const divIdLongBanner2 = "adLongContainer2";

function hideBannerElement(adElementId)
{
  const ad = document.querySelector(`#${adElementId}`);
  if(ad != null) ad.style.display = "none";
}

function showBannerElement(adElementId, displayStyle = "block")
{
  const ad = document.querySelector(`#${adElementId}`);
  
  if(ad != null)
  {
    ad.style.position = "absolute";
    ad.style.display = displayStyle;
  }
}

function adBlockerActive()
{
  var active = (document.getElementById('nbAIVXTtpUxM') == null);
  return active;
}

//standard death banner implementation
function showLongBanner()
{
  // hideWinCeremonyBanner();
  // hideMainMenuBanner();

  showBannerElement(divIdLongBanner, "flex");
  
  updateAdSizes();

  requestLongBanner();
}


function hideLongBanner()
{
  hideBannerElement(divIdLongBanner);

  //hideBannerElement(divIdLongBanner2);
  
  hideLongChildBanner();
}

var gameContainer;
function updateAdSizes() 
{
  if(gameContainer == null)
  {
    gameContainer = document.getElementById('gameContainer');
  }

  if(gameContainer != null)
  {
    updateLongBanner();    
  }
}

var longBanner;
function updateLongBanner()
{
  if(longBanner == null)
  {
    longBanner = document.getElementById(divIdLongBanner);
  }

  if(longBanner != null && longBanner.style.display !== "none")
  {
    longBanner.style.bottom = 0 + "px";
    //longBanner.style.width = 100 + "vw";
    longBanner.style.width = gameContainer.offsetWidth + "px";

    var adContainerH = longBanner.offsetHeight;
    var gameContainerH = gameContainer.offsetHeight;

    if(isMobile())
    {
      longBanner.style.top = (gameContainerH - adContainerH) + "px";
      longBanner.style.transform =  "scale( 1, 1) translate(0px, -10px)";
    }
    else
    {
      if(adContainerH/gameContainerH > 0.3)
      {
        var newHeight = gameContainerH * 0.3;
        var newScale = newHeight / adContainerH;
        var scaleString = "scale( " + newScale + "," + newScale + ")";
        var offsetX = 0;
        var offsetY = (adContainerH - adContainerH*newScale)/2 - 10;
        var translateString = "translate(" + offsetX + "px, " + offsetY + "px)";
        longBanner.style.transform = translateString + " " + scaleString;
      }
      else
      {
        longBanner.style.transform =  "scale( 1, 1) translate(0px, -10px)";
      }
    }
  }
}

//window.addEventListener("load", updateAdSizes);
//window.addEventListener("resize", updateAdSizes);
setInterval(updateAdSizes, 500);

function showLongBanner2(){}
function showMainMenuBanner2(){}

//Stubbed functions needed for "inhertiance"
function showMainMenuBanner(){}
function hideMainMenuBanner(){}
function showWinCeremonyBanner(interstialRequested){}
function hideWinCeremonyBanner(){}
function showWinCeremonyBanner2(interstialRequested){}


function setElementSize(identifier, x, y, w, h)
{
  const el = document.getElementById(identifier);
  if(el != null)
  {
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.width = w + "px";
    el.style.height = h + "px";
  }
}

function showPreGameInterstitial(audioOn)
{
  showInterstitial(audioOn, 'start', 'pregame');
}

function showWinCeremonyInterstitial(audioOn)
{
  showInterstitial(audioOn, 'next', 'winceremony')
}

function interstitialStart()
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialStart");
  
  hideAllOffCanvasAds();
}

function interstitialError()
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialFailed");
}

function interstitialSkipped()
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialSkipped");

  refreshAllOffCanvasAds();
}


function interstitialComplete() 
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialComplete");

  refreshAllOffCanvasAds();
}

