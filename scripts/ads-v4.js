'use strict';

// const divIdMainMenuBanner = "adContainer";
// const divIdMainMenuBanner2 = "adContainerMainMenu";
// const divIdWinCeremonyBanner = "adContainer2";
// const divIdWinCeremonyBanner2 = "adContainerWin";
// const divIdLongBanner = "adLongContainer";
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


function showLongBanner()
{
  if(onlyShowAdOnDeath)
  {
    if(showBtmAd)
    {
      updateBtmAdContainer();
    }

    if(showRightAd)
    {
      updateRightAdContainer();
    }
    
    updateGameCanvasSize();
  }
}
function hideLongBanner()
{
  if(onlyShowAdOnDeath)
  {
    hideBtmAdContainer();
    hideRightAdContainer();
    updateGameCanvasSize();
  }
}

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

