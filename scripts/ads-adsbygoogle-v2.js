'use strict';

///////////////////////////
//ad tags
const adTagMainMenuBanner = "smashkarts-io_300x250";
const adTagWinCeremonyBanner = "smashkarts-io_300x250_2";
const adTagLongBannerWeb = "smashkarts-io_728x90-new";
const adTagLongBannerMobile = "smashkarts-io_320x100";

//Used to cache ad display styles so we can reset them back correctly when reshowing
//Need to be objects in order to pass by reference to cacheSingleAdDisplayStyle function
var displayStyleMainMenuBanner = {display: null};
var displayStyleWinCeremonyBanner = {display: null};
var displayStyleLongBannerWeb = {display: null};
var displayStyleLongBannerMobile = {display: null};

function cacheSingleAdDisplayStyle(adElementId, displayStyleCacheVar)
{
    const ad = document.querySelector(adElementId);

    if(ad != null) 
    {
        displayStyleCacheVar.display = window.getComputedStyle(ad).display;
    }
}

function cacheAdDisplayStyles()
{
    cacheSingleAdDisplayStyle(`#${adTagMainMenuBanner}`, displayStyleMainMenuBanner);
    
    cacheSingleAdDisplayStyle(`#${adTagWinCeremonyBanner}`, displayStyleWinCeremonyBanner);

    cacheSingleAdDisplayStyle(`#${adTagLongBannerWeb}`, displayStyleLongBannerWeb);
    cacheSingleAdDisplayStyle(`#${adTagLongBannerMobile}`, displayStyleLongBannerMobile);
}

cacheAdDisplayStyles();
///////////////////////////

function hideChildBannerElement(adElementId)
{
    const ad = document.querySelector(`#${adElementId}`);
    
    if(ad != null) 
    {
      // console.log(`HIDE: ${adElementId}`);

      ad.style.display = "none";
      ad.innerHTML = "";
    }
}

function showChildBannerElement(adElementId, displayStyleCacheVar)
{
    const ad = document.querySelector(`#${adElementId}`);

    if(ad != null) 
    {
      // console.log(`SHOW: ${adElementId}`);

      ad.style.display = displayStyleCacheVar.display;
    }
}

function requestOffCanvasAd(adResArrayToHide, adTagIdToShow)
{
  // console.log(`requestOffCanvasAd START: ${adTagIdToShow}`);

  hideOffCanvasAds(adResArrayToHide);

  aiptag.cmd.display.push(function() 
  { 
    // console.log(`requestOffCanvasAd CALLBACK: ${adTagIdToShow}`);
    
    aipDisplayTag.display(adTagIdToShow);
    
    showChildBannerElement(adTagIdToShow, {display: "block"});

    // console.log(`requestOffCanvasAd COMPLETE: ${adTagIdToShow}`);
  });  
}

function hideOffCanvasAds(adResArray)
{
  adResArray.forEach(adRes => {
    hideChildBannerElement(adRes.adId);    
  });
}

function requestMainMenuBanner()
{
  if(!isMobile())
  {
    aiptag.cmd.display.push(function() 
    { 
      aipDisplayTag.display(adTagMainMenuBanner);
      showChildBannerElement(adTagMainMenuBanner, displayStyleMainMenuBanner);
    });
  }
}

function hideMainMenuChildBanner()
{
    hideChildBannerElement(adTagMainMenuBanner);
}

function requestWinCeremonyBanner(interstialRequested)
{
  if(!isMobile())
  {
    aiptag.cmd.display.push(function() 
    { 
      aipDisplayTag.display(adTagWinCeremonyBanner);
      showChildBannerElement(adTagWinCeremonyBanner, displayStyleWinCeremonyBanner);
    });
  }
}

function hideWinCeremonyChildBanner()
{
    hideChildBannerElement(adTagWinCeremonyBanner);
}

function requestLongBanner()
{
  if(!isMobile())
  {
      aiptag.cmd.display.push(function() 
      { 
        aipDisplayTag.display(adTagLongBannerWeb);
        showChildBannerElement(adTagLongBannerWeb, displayStyleLongBannerWeb);
      });
  }
  else
  {
      aiptag.cmd.display.push(function() 
      { 
        aipDisplayTag.display(adTagLongBannerMobile);
        showChildBannerElement(adTagLongBannerMobile, displayStyleLongBannerMobile);
      });
  }
}

function hideLongChildBanner()
{
  hideChildBannerElement(adTagLongBannerWeb);
  hideChildBannerElement(adTagLongBannerMobile);  
}

function showInterstitial(unusedParam, interstitialType, interstitialName)
{
    // var audioOnStr = audioOn ? 'on' : 'off';
    // adConfig({
    //   sound: audioOnStr,
    // });

    if(typeof adBreak === "function")
    {
      adBreak({
                
        type: interstitialType,  // ad shows at start of next level
        name: interstitialName,
        beforeBreak: interstitialStart,
        afterBreak: interstitialComplete
      });
    }
}


var onShowRewardedVideoClicked = null;

function tryInitRewardedInterstitial(unusedParam)
{
    if(typeof adBreak === "function")
    {
      adBreak({
        type: 'reward', // The type of this placement
        name: 'rewardedxpboost', // A descriptive name for this placement
        beforeAd: () => {interstitialStart();}, // Prepare for the ad. Mute and pause the game flow
        afterAd: () => {console.log("tryInitRewardedInterstitials afterAd");}, // Resume the game and re-enable sound
        beforeReward: (showAdFn) => { console.log("set onShowRewardedVideoClicked"); rewardedInterstitialAvailable(); onShowRewardedVideoClicked = showAdFn }, // Show reward prompt (call showAdFn() if clicked)
        adDismissed: () => {interstitialSkipped();}, // Player dismissed the ad before it finished.
        adViewed: () => {interstitialComplete();}, // Player watched the ad–give them the reward.
        adBreakDone: (placementInfo) => {console.log("tryInitRewardedInterstitials adBreakDone");}, // Always called (if provided) even if an ad didn’t show
        });
    }
}

function tryShowRewardedInterstitial(unusedParam)
{
  if(onShowRewardedVideoClicked != null)
  {
    onShowRewardedVideoClicked();
  }
}

function rewardedInterstitialAvailable()
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "RewardedInterstitialAvailable");
}
