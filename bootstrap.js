// when the extension is first installed
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.sync.set({bool_sound: false});
});

// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

// show the popup when the user clicks on the page action.
chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.pageAction.show(tab.id);
});

// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
// If the tabs url starts with "http://specificsite.com"...
if (tab.url.indexOf("https://pollev.com/") == 0) {
// ... show the page action.
chrome.pageAction.show(tabId);
}
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (~tab.url.indexOf('pollev')) {
	  
    chrome.pageAction.show(tabId);
  }
});


// update the icon when the user's settings change
// chrome.storage.onChanged.addListener(function(changes, areaName){
//     alert("changed settings");
//     console.log("changed settings");
//     if (localStorage["be_a_buzzkill"] == "true"){
//         path = "active-icon.jpeg";
//     } else {
//         path = "inactive-icon.jpeg";
//     }
//     chrome.tabs.getCurrent( function(tab){
//         chrome.pageAction.setIcon({
//             "tabId": tab.id,
//             "path": path
//         });
//     });
// }); 