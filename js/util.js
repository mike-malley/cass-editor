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

var viewMode = false;
var conceptMode = false;

if (queryParams.view == "true") {
    viewMode = true;
    $(".editControl").remove();
    if (queryParams.ceasnDataFields == null) {
        $("#editFrameworkSection").removeClass("pageWithSidebar");
        $("#detailSlider").remove();
    }
    EcRepository.cachingSearch = true;
}

if (queryParams.concepts == "true") {
    conceptMode = true;
    $("#addFrameworkSection #title").text("Add a Concept Scheme");
    $("#addFrameworkSection #caption").text("Create a scheme below.");
    $(".absentForConcepts").remove();
    $("#formSection #nameSpan").text("Title");
    $("#formSection #name").attr("placeholder", "Enter the concept scheme title here.");
    $("#formSection #description").attr("placeholder", "Enter the concept scheme description here.");
    $("#sidebarVersion").remove();
    $("#sidebarAddCompetencies option").first().text("Add Concept");
    $("#sidebarAddCompetencies option[value=\"search\"]").remove();
    $("#sidebarAddLevels").remove();
    $("#sidebarRemove").remove();
    $("#sidebarExport option").each(function () {
        $(this).text(this.text.replace("CASS", "SKOS"));
    });
    $("#confirmDialog #confirmText").text("Are you sure you want to delete this concept?");
}

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

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}

highlightSelected = function (element) {
    $('.selected').removeClass('selected');
    $(element).addClass('selected');
}

var tourSkipAhead = false;
startTour = function(step) {
    localStorage.setItem('tourStatus', 'in progress');
    var intro = introJs();
    intro.setOptions({
        steps: [
            {
                element: $('#frameworks')[0],
                intro: 'You can scroll through this list to browse the different frameworks.'
            },
            {
                element: $('#header')[0],
                intro: 'Or you can search for a particular framework here.',
                position: 'right'
            },
            {
                element: $('#frameworks').children(':first')[0],
                intro: 'You can click a framework for more information.'
            },
            {
                element: $('#frameworkNameContainer')[0],
                intro: 'This displays the current framework, you can click here to view more details about the framework itself.'
            },
            {
                element: $('#tree')[0],
                intro: 'This is the list of competencies that belong to this framework.'
            },
            {
                element: $('#tree').children(':first')[0],
                intro: 'You can click a competency for more information.'
            },
            {
                element: $('#detailSlider')[0],
                intro: 'This panel will list the properties of the selected framework or competency. Additionally, you can add new competencies or edit these properties here.'
            }
        ],
        showStepNumbers: false
    });

    intro.oncomplete(function() {
        cancelTour();
    });

    intro.onafterchange(function() {
        $('.introjs-prevbutton').hide();
        if (tourSkipAhead === false && this._currentStep === 3) {
            $('.introjs-skipbutton').click();
            $('#frameworks').children(':first').click();
            setTimeout(function() {
                tourSkipAhead = true;
                startTour(4);
            }, 3000);
        } else if (this._currentStep === 6) {
            $('#tree').children(':first').click();
        }
    });
    if (step !== null)
        intro.goToStepNumber(step).start();
    else
        intro.start();
}

cancelTour = function() {
    localStorage.setItem('tourStatus', 'complete');
}

showTourDialog = function (callback) {
    if (viewMode) return;
    if (localStorage.getItem('tourStatus') === null || localStorage.getItem('tourStatus') === 'in progress') {
        $("#tourDialog").show();
        $("#confirmOverlay").show();

        $("#acceptTourButton").on('click', function () {
            callback(true);
        });

        $("#declineTourButton").on('click', function () {
            callback(false);
        });
    }
    
}

hideTourDialog = function (callback) {
    if (viewMode) return;
    $("#tourDialog").hide();
    $("#confirmOverlay").hide();

    $("#acceptTourButton").off();
    $("#declineTourButton").off();
}

showCopyOrLinkDialog = function (callback) {
    if (viewMode) return;
    $("#copyOrLinkDialog").show();
    $("#confirmOverlay").show();

    $("#copyCompetenciesButton").on('click', function () {
        callback(true);
    });

    $("#linkCompetenciesButton").on('click', function () {
        callback(false);
    });
}

hideCopyOrLinkDialog = function () {
    if (viewMode) return;
    $("#copyOrLinkDialog").hide();
    $("#confirmOverlay").hide();
    $("#linkCompetenciesButton").off();
    $("#copyCompetenciesButton").off();
}

showConfirmDialog = function (callback, statement, action, id) {
    if (viewMode) return;
    if (action === 'delete') {
        EcFramework.search(repo, "\"" + id + "\"", function (results) {
            $("#confirmDialog").show();
            $("#confirmOverlay").show();
            if (results.length > 1) {
                statement += ' Up to ' + results.length + ' other frameworks may break.';
            }
            $("#confirmText").text(statement);

            $("#dialogConfirmButton").on('click', function () {
                callback(true);
            });
            $("#dialogCancelButton").on('click', function () {
                callback(false);
            });
        }, console.error, {})
    } else {
        $("#confirmDialog").show();
        $("#confirmOverlay").show();
        $("#confirmText").text(statement);

        $("#dialogConfirmButton").on('click', function () {
            callback(true);
        });
        $("#dialogCancelButton").on('click', function () {
            callback(false);
        });
    }

}

hideConfirmDialog = function () {
    if (viewMode) return;
    $("#confirmDialog").hide();
    $("#confirmOverlay").hide();
    $("#dialogConfirmButton").off();
    $("#dialogCancelButton").off();
}

