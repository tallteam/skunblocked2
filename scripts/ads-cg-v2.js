'use strict';

///////////////////////////
//ad tags
const adTagMainMenuBanner = "smashkarts-io_300x250";
const adTagMainMenuBanner2 = "smashkarts-io_300x250b";
const adTagWinCeremonyBanner = "smashkarts-io_300x250_2";
const adTagWinCeremonyBanner2 = "smashkarts-io_300x250_2b";
const adTagLongBanner = "smashkarts-io_728x90";
const adTagLongBanner2 = "smashkarts-io_728x90b";

//Used to cache ad display styles so we can reset them back correctly when reshowing
//Need to be objects in order to pass by reference to cacheSingleAdDisplayStyle function
var displayStyleMainMenuBanner = { display: null };
var displayStyleMainMenuBanner2 = { display: null };
var displayStyleWinCeremonyBanner = { display: null };
var displayStyleWinCeremonyBanner2 = { display: null };
var displayStyleLongBanner = { display: null };
var displayStyleLongBanner2 = { display: null };

function cacheSingleAdDisplayStyle(adElementId, displayStyleCacheVar)
{
    const ad = document.querySelector(adElementId);

    if (ad != null) 
    {
        displayStyleCacheVar.display = window.getComputedStyle(ad).display;
    }
}

function cacheAdDisplayStyles()
{
    cacheSingleAdDisplayStyle(`#${adTagMainMenuBanner}`, displayStyleMainMenuBanner);
    cacheSingleAdDisplayStyle(`#${adTagMainMenuBanner2}`, displayStyleMainMenuBanner2);

    cacheSingleAdDisplayStyle(`#${adTagWinCeremonyBanner}`, displayStyleWinCeremonyBanner);
    cacheSingleAdDisplayStyle(`#${adTagWinCeremonyBanner2}`, displayStyleWinCeremonyBanner2);

    cacheSingleAdDisplayStyle(`#${adTagLongBanner}`, displayStyleLongBanner);
    cacheSingleAdDisplayStyle(`#${adTagLongBanner2}`, displayStyleLongBanner2);
}

cacheAdDisplayStyles();
///////////////////////////

function hideChildBannerElement(adElementId)
{
    const ad = document.querySelector(`#${adElementId}`);

    if (ad != null) 
    {
        ad.style.display = "none";
        ad.innerHTML = "";
    }
}

function showChildBannerElement(adElementId, displayStyleCacheVar)
{
    const ad = document.querySelector(`#${adElementId}`);

    if (ad != null) 
    {
        ad.style.display = displayStyleCacheVar.display;
    }
}

function requestOffCanvasAd(adResArrayToHide, adTagIdToShow)
{
    hideOffCanvasAds(adResArrayToHide);

    if (adBlockerActive())
    {
        return;
    }

    crazysdk.requestResponsiveBanner([adTagIdToShow]);
    showChildBannerElement(adTagIdToShow, { display: "block" });
}

function hideOffCanvasAds(adResArray)
{
    adResArray.forEach(adRes =>
    {
        hideChildBannerElement(adRes.adId);
    });
}

function hideMainMenuChildBanner()
{
    hideChildBannerElement(adTagMainMenuBanner);
    hideChildBannerElement(adTagMainMenuBanner2);
}

function requestMainMenuBanner()
{
    if (!isMobile())
    {
        crazysdk.requestBanner([
            {
                containerId: adTagMainMenuBanner,
                size: '300x250',
            }
        ]);

        showChildBannerElement(adTagMainMenuBanner, displayStyleMainMenuBanner);
    }
}

function hideWinCeremonyChildBanner()
{
    hideChildBannerElement(adTagWinCeremonyBanner);
    hideChildBannerElement(adTagWinCeremonyBanner2);
}

function requestWinCeremonyBanner(interstialRequested)
{
    if (!isMobile())
    {
        if (!interstialRequested)
        {
            crazysdk.requestBanner([
                {
                    containerId: adTagWinCeremonyBanner,
                    size: '300x250',
                }
            ]);

            showChildBannerElement(adTagWinCeremonyBanner, displayStyleWinCeremonyBanner);
        }
    }
}

function hideLongChildBanner()
{
    hideChildBannerElement(adTagLongBanner);
    hideChildBannerElement(adTagLongBanner2);
}

function requestLongBanner()
{
    if (!isMobile())
    {
        crazysdk.requestBanner([
            {
                containerId: adTagLongBanner,
                size: '728x90',
            }
        ]);

        showChildBannerElement(adTagLongBanner, displayStyleLongBanner);
    }
}

function requestMainMenuBanner2()
{
    if (!isMobile())
    {
        crazysdk.requestResponsiveBanner([adTagMainMenuBanner2]);
        showChildBannerElement(adTagMainMenuBanner2, displayStyleMainMenuBanner2);
    }
}

function requestWinCeremonyBanner2(interstialRequested)
{
    if (!isMobile() && !interstialRequested)
    {
        crazysdk.requestResponsiveBanner([adTagWinCeremonyBanner2]);
        showChildBannerElement(adTagWinCeremonyBanner2, displayStyleWinCeremonyBanner2);
    }
}

function requestLongBanner2()
{
    if (!isMobile())
    {
        crazysdk.requestResponsiveBanner([adTagLongBanner2]);
        showChildBannerElement(adTagLongBanner2, displayStyleLongBanner2);
    }
}

function showInterstitial(audioOn, interstitialType, interstitialName)
{
    if (!isMobile())
    {
        crazysdk.requestAd('midgame');
    }
}

function tryInitRewardedInterstitial(audioOn)
{
    if (!adBlockerActive())
    {
        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "RewardedInterstitialAvailable");
    }
}

function tryShowRewardedInterstitial(unusedParam)
{
    if (!isMobile())
    {
        crazysdk.requestAd('rewarded');
    }
}

function initAds()
{
    crazysdk.addEventListener('adStarted', interstitialStart);
    crazysdk.addEventListener('adError', interstitialError);
    crazysdk.addEventListener('adFinished', interstitialComplete);
}

function getCrazyGamesShareLinkJS(roomName, gameMode, levelName)
{
    return crazysdk.inviteLink({ room: roomName, mode: gameMode, arena: levelName });
}

function recordGameplayStart()
{
    crazysdk.gameplayStart()
}

function recordGameplayStop()
{
    crazysdk.gameplayStop();
}

function recordHappyTime()
{
    crazysdk.happytime();
}

initAds();
