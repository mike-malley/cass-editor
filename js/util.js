/*
 Copyright 2017 Credential Engine and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

queryParams = function () {
    if (window.document.location.search == null)
        return {};
    var hashSplit = (window.document.location.search.split("?"));
    if (hashSplit.length > 1) {
        var o = {};
        var paramString = hashSplit[1];
        var parts = (paramString).split("&");
        for (var i = 0; i < parts.length; i++)
            o[parts[i].split("=")[0]] = decodeURIComponent(parts[i].replace(parts[i].split("=")[0] + "=", ""));
        return o;
    }
    return {};
};
queryParams = queryParams();

if (!(window.ActiveXObject) && "ActiveXObject" in window) {
    if (queryParams.view == null || queryParams.view === undefined) {
        alert("IE 11 does not support functionality required for editing. You will only be able to view frameworks. To remedy this, please use Edge, Firefox, Chrome, Safari, or any other browser that is keeping current with existing standards.")
        queryParams.view = "true";
    }
}

jQuery.fn.outerHTML = function () {
    return jQuery('<div />').append(this.eq(0).clone()).html();
};

$(document).ready(function () {
    if (parent != window) {
        var oHead = document.getElementsByTagName("head")[0];
        var arrStyleSheets = parent.document.getElementsByTagName("*");
        for (var i = 0; i < arrStyleSheets.length; i++)
            if (arrStyleSheets[i].tagName.toLowerCase() == "link" || arrStyleSheets[i].tagName.toLowerCase() == "style")
                oHead.appendChild(arrStyleSheets[i].cloneNode(true));
        try {
            importParentStyles();
        } catch (e) {}
    }
});

function importParentStyles() {
    var parentStyleSheets = parent.document.styleSheets;
    var cssString = "";
    for (var i = 0, count = parentStyleSheets.length; i < count; ++i) {
        if (parentStyleSheets[i].cssRules) {
            var cssRules = parentStyleSheets[i].cssRules;
            for (var j = 0, countJ = cssRules.length; j < countJ; ++j)
                cssString += cssRules[j].cssText;
        } //else
        //cssString += parentStyleSheets[i].cssText; // IE8 and earlier
    }
    var style = document.createElement("style");
    style.type = "text/css";
    try {
        style.innerHTML = cssString;
    } catch (ex) {
        //style.styleSheet.cssText = cssString; // IE8 and earlier
    }
    document.getElementsByTagName("head")[0].appendChild(style);
}

function createParamObj(size) {
    var paramObj = {};
    paramObj.size = size;
    if (queryParams.show != null && queryParams.show === 'mine')
        paramObj.ownership = 'me';

    return paramObj;
}
