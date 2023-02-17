'use strict';

const divIdMainMenuBanner = "adContainer";
const divIdMainMenuBanner2 = "adContainerMainMenu";
const divIdWinCeremonyBanner = "adContainer2";
const divIdWinCeremonyBanner2 = "adContainerWin";
const divIdLongBanner = "adLongContainer";
const divIdLongBanner2 = "adLongContainer2";


function adBlockerActive()
{
  var active = (document.getElementById('nbAIVXTtpUxM') == null);
  return active;
}

function hideBannerElement(adElementId)
{
  const ad = document.querySelector(`#${adElementId}`);
  if(ad != null) ad.style.display = "none";
}

function showBannerElement(adElementId)
{
  const ad = document.querySelector(`#${adElementId}`);
  
  if(ad != null)
  {
    ad.style.position = "absolute";
    ad.style.display = "block";
  }
}

function hideMainMenuBanner()
{
  hideBannerElement(divIdMainMenuBanner);
  hideBannerElement(divIdMainMenuBanner2);
  hideMainMenuChildBanner();
}

function hideWinCeremonyBanner()
{
  hideBannerElement(divIdWinCeremonyBanner);
  hideBannerElement(divIdWinCeremonyBanner2);
  hideWinCeremonyChildBanner();
}

function hideLongBanner()
{
  hideBannerElement(divIdLongBanner);
  hideBannerElement(divIdLongBanner2);
  hideLongChildBanner();
}

function showLongBanner2()
{
  hideWinCeremonyBanner();
  hideMainMenuBanner();

  showBannerElement(divIdLongBanner2);
  requestLongBanner2();
}

function showMainMenuBanner2()
{
  hideWinCeremonyBanner();
  hideLongBanner();

  showBannerElement(divIdMainMenuBanner2);
  requestMainMenuBanner2();
}

function showWinCeremonyBanner2(interstialRequested)
{
  hideLongBanner();
  hideMainMenuBanner();

  showBannerElement(divIdWinCeremonyBanner2);
  requestWinCeremonyBanner2(interstialRequested);
}

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
}

function interstitialError()
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialFailed");
}

function interstitialSkipped()
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialSkipped");
}

function interstitialComplete() 
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialComplete");
}

