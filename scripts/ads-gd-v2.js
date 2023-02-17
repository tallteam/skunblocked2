'use strict';

function requestMainMenuBanner(){}
function hideMainMenuChildBanner(){}

function requestWinCeremonyBanner(interstialRequested){}
function hideWinCeremonyChildBanner(){}

function requestLongBanner(){}
function hideLongChildBanner(){}

function showInterstitial(audioOn, interstitialType, interstitialName)
{
    if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
        gdsdk.showAd();
   }
}

function tryInitRewardedInterstitial(unusedParam){}
function tryShowRewardedInterstitial(unusedParam){}
