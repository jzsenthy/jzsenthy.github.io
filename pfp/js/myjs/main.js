// Change checkbox values from On/NaN to 1 or 0
// SOURCE:  https://stackoverflow.com/questions/18295811/checkbox-value-0-or-1
// SOURCE:  https://stackoverflow.com/a/63962842
document.addEventListener("DOMContentLoaded", (e) => {
  for (let checkbox of document.querySelectorAll("input[type=checkbox]")) {
    checkbox.value = checkbox.checked ? 1 : 0;
    checkbox.addEventListener("change", (e) => {
      e.target.value = e.target.checked ? 1 : 0;
    });
  }
});

// FUNCTION:  Hide and show the correct sections from the top buttons (LDS, POLD-Only, Accessories)
// HISTORY:  Had to abandon bootstrap .collapse method and just hide all then show what i want (so it wouldn't toggle things incorrectly)
// TIP: Can replace  (document.querySelectorAll('.groupLds'))  with  (document.querySelectorAll(`.${groupClass}`))
//      '.groupLds'  to  `.${groupClass}`  (a literal) to insert variable groupClass with string . (period) in front of it (or any other string)
// Everything with class  groupWizard1  gets hidden first, upon header click  (like it's the 1st wizard step)
function collapseGroup(groupClass) {
  // Show the 2 main startHidden divs with class  showOnHeaderClick  first
  elements = document.getElementsByClassName("showOnHeaderClick");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = elements[i].style.display = "block";
  }
  // Hide everything first
  elements = document.getElementsByClassName("groupWizard1");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = elements[i].style.display = "none";
  }
  // Show what you want
  elements = document.getElementsByClassName(`${groupClass}`);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = elements[i].style.display = "";
  }
}

// FUNCTION:  Hide the  startHidden  divs when pressing the Reset button
// TODO: Maybe remove this function since it's not called anymore (may need it for something else in the future though)
function resetHidden(groupClass) {
  // Hide everything first
  // elements = document.getElementsByClassName(`${groupClass}`);
  elements = document.getElementsByClassName("startHidden");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = elements[i].style.display = "none";
  }
  // Show default LDS group  (lds top button defaults to active anyway, so it fits)
  // TODO:  Maybe change this to just clicking the button (so it's active as well)
  elements = document.getElementsByClassName("groupLds");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = elements[i].style.display = "";
  }
}

// FUNCTION:  Show warning that B3 isn't done, upon selection (disabling message now that it's tentatively done)
// REFERENCE:  https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
// SAMPLE:  https://www.w3schools.com/jsref/event_onchange.asp

// document.getElementById("selectSplitSystem").addEventListener("change", alertUnfinishedFeature1);

// function alertUnfinishedFeature1() {
//     var elementSelectSplitSystem = document.getElementById("selectSplitSystem");
//     var checkSplitSystemChecked = document.getElementById("checkSplitSystem").checked;
//     if (selectSplitSystem.value == 3 && checkSplitSystemChecked) {
//         window.alert(
//             "Rules for B3 systems are tentative and averages. \nAsk the warehouse for confirmation of results."
//         );
//     }
// }

// FUNCTION:  Show extra Hidden Wire section if present
// HISTORY:  I'm not sure why it's reversed. Maybe it's checking the value on click, instead of seeing what it changes to
// REFERENCE:  https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
// SAMPLE:  https://www.w3schools.com/jsref/event_onchange.asp
document.getElementById("checkHiddenWire").addEventListener("change", setHiddenWire);

function setHiddenWire() {
  var idHiddenWire = document.getElementById("checkHiddenWire");
  var elementHiddenWire;
  if (idHiddenWire.value == 0) {
    elementHiddenWire = document.getElementById("inputHiddenWireLength");
    elementHiddenWire.style.display = "block";
    elementHiddenWire = document.getElementById("hiddenWireHelp");
    elementHiddenWire.style.display = "block";
    // window.alert("idHiddenWire.value == 0  " + idHiddenWire.value);
  } else if (idHiddenWire.value > 0) {
    elementHiddenWire = document.getElementById("inputHiddenWireLength");
    elementHiddenWire.style.display = "none";
    elementHiddenWire = document.getElementById("hiddenWireHelp");
    elementHiddenWire.style.display = "none";
    // window.alert("idHiddenWire.value > 0  " + idHiddenWire.value);
  }
}

// Show POLD leak rope section if leak rope checkbox is selected
// HISTORY:  Changed from checkbox value to .checked because value was reversed.
//  Maybe it was checking the value on click, instead of seeing what it changes to.
//  Or it had to wait for the function to convert checkbox values to 1 / 0.
// SAMPLE:  https://www.w3schools.com/jsref/event_onchange.asp
// REFERENCE:  (for checkboxes) https://stackoverflow.com/questions/14544104/checkbox-check-event-listener
document.getElementById("checkLeakRope").addEventListener("change", setLeakRope);

function setLeakRope() {
  var elementLeakRope = document.getElementById("checkLeakRope");
  var elementPrefix;
  if (elementLeakRope.checked == true) {
    // Show all extra POLD/Rope sections
    elementPrefix = document.getElementById("expandPold1");
    elementPrefix.style.display = "block";
    elementPrefix = document.getElementById("expandPold2");
    elementPrefix.style.display = "block";
    elementPrefix = document.getElementById("expandPold3");
    elementPrefix.style.display = "block";
    elementPrefix = document.getElementById("divCalcPoldTotal");
    elementPrefix.style.display = "block";
    // Check the "auto-calc" checkbox by default
    elementPrefix = document.getElementById("checkCalcPoldTotal");
    elementPrefix.checked = true;
    // Make the POLD form input readonly/disabled
    // REFERENCE:  https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
    // REFERENCE:  (bootstrap) https://stackoverflow.com/questions/34539657/how-do-you-disabled-a-bootstrap-form-field
    // REFERENCE:  (boolean attributes) https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes
    elementPrefix = document.getElementById("inputPold");
    elementPrefix.setAttribute("readonly", "readonly");
    // Change POLD input title
    document.getElementById("inputPoldLabel").innerHTML = "POLDs (total)";
  } else if (elementLeakRope.checked == false) {
    // Hide all extra POLD/Rope sections
    elementPrefix = document.getElementById("expandPold1");
    elementPrefix.style.display = "none";
    elementPrefix = document.getElementById("expandPold2");
    elementPrefix.style.display = "none";
    elementPrefix = document.getElementById("expandPold3");
    elementPrefix.style.display = "none";
    elementPrefix = document.getElementById("divCalcPoldTotal");
    elementPrefix.style.display = "none";
    // Uncheck the "auto-calc" checkbox when hidden
    elementPrefix = document.getElementById("checkCalcPoldTotal");
    elementPrefix.checked = false;
    // Make the POLD form input not readonly
    // REFERENCE:  https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute
    elementPrefix = document.getElementById("inputPold");
    elementPrefix.removeAttribute("readonly");
    // Change POLD input title
    document.getElementById("inputPoldLabel").innerHTML = "POLDs";

    // Reset form input values when section is hidden
    // TODO:  Maybe save the values first to restore if section is shown again
    document.getElementById("inputPoldPin").value = "";
    document.getElementById("inputPoldLeakRope2ft").value = "";
    document.getElementById("inputPoldLeakRope5ft").value = "";
    document.getElementById("inputPoldLeakRope10ft").value = "";
    document.getElementById("inputLeakRope2ft").value = "";
    document.getElementById("inputLeakRope5ft").value = "";
    document.getElementById("inputLeakRope10ft").value = "";
  }
}

// Disable/enable readonly state on POLD Total input box, from checkbox
// SAMPLE:  https://www.w3schools.com/jsref/event_onchange.asp
document.getElementById("checkCalcPoldTotal").addEventListener("change", setPoldTotalReadOnly);

function setPoldTotalReadOnly() {
  var elementCheckCalcPoldTotal = document.getElementById("checkCalcPoldTotal");
  var elementPrefix;
  if (elementCheckCalcPoldTotal.checked == true) {
    elementPrefix = document.getElementById("inputPold");
    elementPrefix.setAttribute("readonly", "readonly");
    // Immediately calculate the total if the checkbox is checked again
    calcPoldTotal();
  } else if (elementCheckCalcPoldTotal.checked == false) {
    elementPrefix = document.getElementById("inputPold");
    elementPrefix.removeAttribute("readonly");
  }
}

// Auto-Calculate total POLDs (when a related input is changed)
// ALso disables input and show a checkbox (default checked) to auto-calc total
// SAMPLE:  https://www.w3schools.com/jsref/event_onchange.asp
document.getElementById("inputPoldPin").addEventListener("change", calcPoldTotal);
document.getElementById("inputPoldLeakRope2ft").addEventListener("change", calcPoldTotal);
document.getElementById("inputPoldLeakRope5ft").addEventListener("change", calcPoldTotal);
document.getElementById("inputPoldLeakRope10ft").addEventListener("change", calcPoldTotal);

function calcPoldTotal() {
  var idInputPold = document.getElementById("inputPold");
  if (checkCalcPoldTotal.checked == true) {
    // Add together the values of all the pold input boxes (POLDs with pins, POLDs with leak rope 2ft, 5ft, 10ft)
    // They were showing/adding as strings so I had to wrap them in Number()
    idInputPold.value =
      Number(document.getElementById("inputPoldPin").value) +
      Number(document.getElementById("inputPoldLeakRope2ft").value) +
      Number(document.getElementById("inputPoldLeakRope5ft").value) +
      Number(document.getElementById("inputPoldLeakRope10ft").value);
  } else if (checkCalcPoldTotal.checked == false) {
    // idk. do nothing i guess
  }
}

// // Show extra POLD section if POLDs are present (replaced with code above)
// // TODO:  Hide section if POLDs goes back to 0
// // SAMPLE:  https://www.w3schools.com/jsref/event_oninput.asp
// // SAMPLE:  https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_oninput_dom
// document.getElementById("inputPold").oninput = function () { showPoldExtra() };
// function showPoldExtra() {
//     var elementPold = document.getElementById("expandPold");
//     elementPold.style.display = "block";
// }

// FUNCTION:  Show Split System dropdown selector if checked
// HISTORY:  I'm not sure why it was reversed. Maybe it's checking the value on click, instead of seeing what it changes to.
// HISTORY:  Or maybe it was running the "convert checkbox values to 1||0" script after
// HISTORY:  I changed this to just get the checked state instead of calculated value, so it's no longer reversed.
// SAMPLE:  https://www.w3schools.com/jsref/event_onchange.asp
document.getElementById("checkSplitSystem").addEventListener("change", setSplitSystem);

function setSplitSystem() {
  var idSplitSystem = document.getElementById("checkSplitSystem");
  var elementSplitSystem = document.getElementById("selectSplitSystem");
  // console.log("setSplitSystem  idSplitSystem.value = " + idSplitSystem.value);
  if (idSplitSystem.checked == true) {
    elementSplitSystem.style.display = "block";
    // window.alert("idSplitSystem.value == 0  " + idSplitSystem.value);
  } else if (idSplitSystem.checked == false) {
    elementSplitSystem.style.display = "none";
    // window.alert("idSplitSystem.value > 0  " + idSplitSystem.value);
  }
}

// Set SCV = 1 if an LDS is selected
// TODO:  Maybe change  var elementId  to a unique var
// HISTORY:  Changed to  addEventListener  so it could run two functions from one  onchange
// SAMPLE:  https://www.w3schools.com/jsref/event_onchange.asp
document.getElementById("selectLds").addEventListener("change", setScv);
//document.getElementById("selectLds").onchange = function () { setScv() };
function setScv() {
  var valueLds = document.getElementById("selectLds");
  var elementId = document.getElementById("inputScv");
  if (valueLds.value > 0) {
    elementId.value = "1";
  } else if (valueLds.value == 0) {
    elementId.value = "";
  }
}

// Set CP = 1 if an LDS is selected
// TODO:  Maybe change  var elementId  to a unique var
// HISTORY:  Changed to  addEventListener  so it could run two functions from one  onchange
// SAMPLE:  https://www.w3schools.com/jsref/event_onchange.asp
document.getElementById("selectLds").addEventListener("change", setCp);
//document.getElementById("selectLds").onchange = function () { setCp() };
function setCp() {
  var valueLds = document.getElementById("selectLds");
  var elementId = document.getElementById("inputCp");
  if (valueLds.value > 0) {
    elementId.value = "1";
  } else if (valueLds.value == 0) {
    elementId.value = "";
  }
}

// Set largePSU = 1 if a large LDS is selected (2.5"-3")
// TODO:  Maybe change  var elementId  to a unique var
document.getElementById("selectLds").addEventListener("change", setLargePSU);

function setLargePSU() {
  var valueLds = document.getElementById("selectLds");
  var elementId = document.getElementById("inputLargePSU");
  if (valueLds.value > 2) {
    elementId.value = "1";
  } else if (valueLds.value <= 2) {
    elementId.value = "";
  }
}

// Set LDS = 0 if POLD-Only is selected
// NOTE:  Using inline onclick to call this (sigh)
// TODO:  Maybe change  var elementId  to a unique var
// SAMPLE:  https://www.w3schools.com/jsref/event_onchange.asp
function setLds(ldsValueToSet) {
  var elementId = document.getElementById("selectLds");
  elementId.value = ldsValueToSet;
  // Set SCV value to 0 as well (the function will choose 0 when it evaluates that LDS is zero)
  setScv();
  setCp();
  // Blank out the split system selection and checkbox when switching to POLD tab, so there isn't a leftover ghost item that doesn't get packed
  setSplitSystemBlank();
  // Set largePSU value to 0 as well
  setLargePSU();

  // Set recirc value to 0 as well, only if POLD-Only tab selected
  setRecirc();
  // Set fourHour value to 0 as well, only if POLD-Only tab selected
  setFourHour();
}

// Set Recirc = 0 if POLD-Only is selected
// NOTE:  Called in setLds above
function setRecirc() {
  // If POLD-Only is checked/selected
  if (document.getElementById("btnradio2").checked) {
    var valueLds = document.getElementById("selectLds");
    var elementId = document.getElementById("inputRecirc");
    if (valueLds.value > 0) {
      elementId.value = "1";
    } else if (valueLds.value == 0) {
      elementId.value = "";
    }
  }
}

// Set Recirc = 0 if POLD-Only is selected
// NOTE:  Called in setLds above
function setFourHour() {
  // If POLD-Only is checked/selected
  if (document.getElementById("btnradio2").checked) {
    var valueLds = document.getElementById("selectLds");
    var elementId = document.getElementById("inputFourHour");
    if (valueLds.value > 0) {
      elementId.value = "1";
    } else if (valueLds.value == 0) {
      elementId.value = "";
    }
  }
}

// Set Split System = blank if switched to POLD tab (or if LDS is set to 0), so there isn't a leftover ghost item that doesn't get packed
// TODO:  Maybe change  var elementId  to a unique var
// SAMPLE:  https://www.w3schools.com/jsref/event_onchange.asp
// NOTE:  Called in setLds above
document.getElementById("selectLds").addEventListener("change", setSplitSystemBlank);
//document.getElementById("selectLds").onchange = function () { setCp() };
function setSplitSystemBlank() {
  var valueLds = document.getElementById("selectLds");
  // Run if LDS is blank
  if (valueLds.value == 0) {
    // Uncheck split system checkbox
    var elementId1 = document.getElementById("checkSplitSystem");
    elementId1.checked = false;
    // Manually setting the value to 0 to fix the valueSplitSystemCheck value still being at 1 after being unchecked) (Unneeded now, fixed by retrieving the checked value later)
    elementId1.value = 0;
    // Hide the split system dropdown (since checkbox was unchecked)
    var elementSplitSystem = document.getElementById("selectSplitSystem");
    elementSplitSystem.style.display = "none";
    // Select a blank value for the split system dropdown
    var elementId2 = document.getElementById("selectSplitSystem");
    elementId2.value = "";
  }
  // Run if POLD or Accessories tab is selected up top
  if (document.getElementById("btnradio2").checked || document.getElementById("btnradio3").checked) {
    // Uncheck split system checkbox
    var elementId1 = document.getElementById("checkSplitSystem");
    elementId1.checked = false;
    // Manually setting the value to 0 to fix the valueSplitSystemCheck value still being at 1 after being unchecked) (Unneeded now, fixed by retrieving the checked value later)
    elementId1.value = 0;
    // Hide the split system dropdown (since checkbox was unchecked)
    var elementSplitSystem = document.getElementById("selectSplitSystem");
    elementSplitSystem.style.display = "none";
    // Select a blank value for the split system dropdown
    var elementId2 = document.getElementById("selectSplitSystem");
    elementId2.value = "";
  }
}

// FUNCTION:  Show debugging checkbox if version number is clicked
// HISTORY:  I'm not sure why it's reversed. Maybe it's checking the value on click, instead of seeing what it changes to
// SAMPLE:  https://www.w3schools.com/jsref/event_onchange.asp
document.getElementById("versionNumber").addEventListener("click", showDebugCheck);

function showDebugCheck() {
  // Testing changing css dynamically
  // changeCSS();

  var elementDebugDiv = document.getElementById("debugDiv");
  var elementCheckDebug = document.getElementById("checkDebug");
  var elementKnownIssues = document.getElementById("knownIssues");
  // If debug checkbox is shown when version number is clicked, hide it
  if (elementDebugDiv.style.display == "block") {
    // Uncheck debugging
    elementCheckDebug.checked = false;
    // Had to add this to auto-update the valueDebug value on submit
    elementCheckDebug.value = 0;

    // Hide debugging checkbox
    elementDebugDiv.style.display = "none";
    // Also hide known issues link
    elementKnownIssues.style.display = "none";
  }
  // Otherwise show it
  else {
    elementDebugDiv.style.display = "block";
  }
}

// FUNCTION:  Show known issues link if debugging checkbox is checked
// HISTORY:  I'm not sure why it's reversed. Maybe it's checking the value on click, instead of seeing what it changes to
// SAMPLE:  https://www.w3schools.com/jsref/event_onchange.asp
document.getElementById("checkDebug").addEventListener("change", setKnownIssues);

function setKnownIssues() {
  var idCheckDebug = document.getElementById("checkDebug");
  if (idCheckDebug.value == 0) {
    var elementKnownIssues = document.getElementById("knownIssues");
    elementKnownIssues.style.display = "block";
    // window.alert("idCheckDebug.value == 0  " + idCheckDebug.value);
  } else if (idCheckDebug.value > 0) {
    var elementKnownIssues = document.getElementById("knownIssues");
    elementKnownIssues.style.display = "none";
    // window.alert("idCheckDebug.value > 0  " + idCheckDebug.value);
  }
}

//  START BOX CALCULATIONS (FROM FORMS)

// FUNCTION:  Define Object list + size/space values  (for determining what boxes they fit in)
// EXAMPLE:  https://mdbootstrap.com/education/javascript/chapter-2-lesson-6/
var packingItem = {
  lds: 0,
  lds075: 0,
  lds100: 0,
  lds125: 0,
  lds150: 0,
  lds200: 0,
  lds250: 0,
  lds300: 0,

  splitSystem: 0,
  splitSystemB0: 0, // Doesn't exist, just a default placeholder. Needed for dynamic variable retrieval
  splitSystemB1: 0,
  splitSystemB2: 0,
  splitSystemB3: 30, // Defaults to an additional 14x14x14. (Inform user to double-check with warehouse on specifics, since 30 is an average value)

  scv: 0,
  cp: 0,
  hiddenWire: 3,

  largePSU: 30, // (for 2.5"-3" systems)

  api: 3,
  pold: 1,

  poldPin: 1,
  poldLeakRope2ft: 1.5,
  poldLeakRope5ft: 2,
  poldLeakRope10ft: 2,
  leakRope2ft: 0.5,
  leakRope5ft: 1,
  leakRope10ft: 1,

  recirc: 6,
  fourHour: 6,
  pam1: 0,
  ssr: 0,

  juncBox: 36, // Defaults to a full Medium Accessory Box (14x14x8)
  insulPouch: 6, // Defaults to a full Medium Shipper (20x12x8)

  //BOXES
  // Standard Shipper (19x12x7) = 12 (For .75-1.5" systems only)
  boxLds: 12,
  // Medium Shipper (20x12x8) = 6 (Used for 2" systems or Insulated Pouch only)
  boxLdsMedium: 6,
  // Large Shipper (18x18x14) = 18 (Used only for 2.5" and 3" systems)
  boxLdsLarge: 18,

  // Panel Box (10x7x3) = 6
  boxCp: 6,
  // Medium Accessory Box (14x14x8) = (Use only for Electrical Junction Box)
  box14x14x8: 36,
  // Large Accessory Box (14x14x14) = 48 (Use only if EJB is included or if Point total is greater than or equal to 49. or if next item is larger than an accessory box)
  box14x14: 48,
  // Recirc/4 hr Box (9x4x3) = 6 (Only to be used for single Recirc Pump Switch or 4hr Timer)
  boxRecirc: 6,
  // Accessory Box (13x10x5) = 12
  boxAccessories: 12,
  // Bubble Mailer (11x9x1) = 2.5 (Use for shippments of accesory only)
  bubbleMailer: 2.5,
};

// Order of Priority:
// Panel, SCV, Hidden Wire and Pam1 always in Box 1
// 1. API
// 2. POLD
// 3. Recirc Pump Switch
// 4. 4hr Time
// 5. Enclosures (Pouch + EJB)
// Solid State Relays included with box carrying most POLDs

// FUNCTION:  Define Object list of weights (pounds/lbs)
// Initial weight list copied from jesse's pfp2 app
var packingItemWeight = {
  lds: 0,
  lds075: 4.55 + 1.75 + 0.5, // me + 24V PSU 1.75 + scv  // jesse 9.05 + 0.5 (scv)
  lds100: 5.35 + 1.75 + 0.75, // me + 24V PSU 1.75 + scv  // jesse 9.95 + 0.75 (scv)
  lds125: 6.1 + 1.75 + 1.2, // me + 24V PSU 1.75 + scv  // jesse 10.6 + 1.2 (scv)
  lds150: 7.6 + 1.75 + 1.6, // me + 24V PSU 1.75 + scv  // jesse 12.2 + 1.6 (scv)
  lds200: 12.05 + 1.75 + 2.35, // me + 24V PSU 1.75  (12.05 weighed vs 11.75 guess [VB030 4.65 + Pipe/Valve 2.00 7.10]) // jesse 17.4 + 2.35 (scv)
  lds250: 7.15 + 1.75 + 11 + 3, // VB060 7.15 + 24V PSU 1.75 +  Pipe/Valve ? +  scv ?  // guess
  lds300: 7.15 + 1.75 + 18 + 4, // VB060 7.15 + 24V PSU 1.75 +  Pipe/Valve ? +  scv ?  // guess
  lds400: 35.7 + 1.75 + 5, // me + 24V PSU 1.75 + scv ?

  splitSystem: 0,
  splitSystemB0: 0, // fallback in case you check split-system but don't select one
  splitSystemB1: 0.2, // 7.8 is 0.2 more than standard 1.50" (really just 5ft extra wire)
  splitSystemB2: 0.4, // 4.95 is 0.4 more than standard 0.75" (really just 10ft extra wire)
  splitSystemB3: 15, // ~1.35 from weighing just a grey box from dual valve (add wires and extra long pipe etc to this weight)

  dualValve075: 9, // me. (not using yet). weighed one with two 0.75" pipe/valves and small orange actuators, and grey box, with a decent length of wire

  largePSU: 19, // (for 2.5"-3" systems) (made up value placeholder -jz)

  scv: 0.5, // depends on size. 0.5-2.35lb for 0.75"-2.00" // currently including proper scv weight with lds weight as well
  cp: 0.5, // CP 0.3  +  12V PSU 0.2  +  CP+PSU 0.5
  api: 0.6, // API 0.4  +  12V PSU 0.2  +  API+PSU 0.6
  pold: 0.215, // With 2 AA and pins

  poldPin: 0.215, // With 2 AA and pins
  poldLeakRope2ft: 0.215 + 0.03,
  poldLeakRope5ft: 0.215 + 0.06,
  poldLeakRope10ft: 0.215 + 0.11,
  leakRope2ft: 0.03,
  leakRope5ft: 0.06,
  leakRope10ft: 0.11,

  recirc: 1.238, // me (in recirc pump box)  // 0.8 jesse
  fourHour: 0.95, // me (in recirc pump box. only weighed one)
  ssr: 0.17, // me 0.1625
  pam1: 0.16, // me

  // TODO: weigh current junction box
  juncBox: 5.45, // jesse // We have a temporary alternative junction box so i'm waiting for real weight. we install LDS <= 1.5" in them
  insulPouch: 1.92, // me
  hiddenWire: 0.18, // averaged the weights to the formula:  0.18 * length ft (valueHiddenWireLength)
  // 20ft  0.35  // me
  // 25ft  0.4   // me
  // 70ft  1.2   // me

  //BOXES
  // Standard Shipper (19x12x7) = (For .75-1.5" systems only)
  boxLds: 2, // 1.5 without 24v psu or scv (or extra padding + documents)
  // Medium Shipper (20x12x8) = (Used for 2" systems or Insulated Pouch only)
  boxLdsMedium: 3, // guess
  // Large Shipper (18x18x14) = (Used only for 2.5" and 3" systems)
  boxLdsLarge: 4, // guess

  // Panel Box (10x7x3) =
  boxCp: 1, // guess
  // Large Accessory Box (14x14x14) = (Use only if EJB is included or if Point total is greater than or equal to 49)
  box14x14: 2, // guess
  // Medium Accessory Box (14x14x8) = (Use only for Electrical Junction Box)
  box14x14x8: 1.5, // guess
  // Recirc/4 hr Box (9x4x3) = (Only to be used for single Recirc Pump Switch or 4hr Timer)
  boxRecirc: 0.5, // guess
  // Accessory Box (13x10x5) =
  boxAccessories: 2, // guess
  // Bubble Mailer (11x9x1) = (Use for shippments of accesory only)
  bubbleMailer: 0.2, // guess
};

// FUNCTION:  Go back to form input from results page, if you want to modify more
document.getElementById("backButton").addEventListener("click", showMainPage);

function showMainPage() {
  // FUNCTION:  Show form
  var elementToToggle = document.getElementById("mainForm");
  elementToToggle.style.display = "block";

  // FUNCTION:  Show pageTitle
  var elementToToggle = document.getElementById("pageTitle");
  elementToToggle.style.display = "block";

  // FUNCTION:  Hide results div
  var elementToToggle = document.getElementById("resultsBoxContainer");
  elementToToggle.style.display = "none";
}

document.getElementById("mainResetButton").addEventListener("click", resetPage1);

// FUNCTION:  Scroll to top and refresh the page (to reset all form elements and checkboxes)
// TODO: Figure out why scrolling to top isn't working in chrome on my work computer (debug view). (Working in firefox and on chrome at home)
function resetPage1() {
  window.scrollTo(0, 0);
  window.location.reload();
}

// Alternate attepts to get a refresh working, by sleeping the code for a few seconds to wait for it to finish. Not working

// document.addEventListener('DOMContentLoaded', resetPage0);
// function resetPage0() {
//     window.scrollTo(0, 0);
// }
// document.getElementById("mainResetButton").addEventListener("click", resetPage1);
// function resetPage1() {
//     window.scrollTo(0, 0);
// }
// document.getElementById("mainResetButton").addEventListener("click", resetPage2);
// function resetPage2() {
//     window.location.reload();
// }

// document.getElementById("mainResetButton").addEventListener("click", resetPage1);
// function resetPage1() {
//     setTimeout(resetPage3, 5000);
//     function resetPage3 {
//         window.scrollTo(0, 0);
//     }
//     setTimeout(resetPage2, 5000);
//     function resetPage2() {
//         window.location.reload();
//     }
// }

// VARIABLES:  Current box number and total number of boxes (used in the functionOnSubmit function below, but variables also referenced in the functionOnPrint function below)
var boxNumber;
var boxTotal;

var weightCurrentBox = 0;
var weightTotal = 0;

var weightSingleCurrentItem;

/// GET FORM VALUES
/// FUNCTION:  Store form values in variables (to use for calculations)
/// TODO:  Convert to array or object, to sum total easier

/// SUBMIT BUTTON (using addEventListener instead of onclick)
document.getElementById("finalSubmitButton").addEventListener("click", functionOnSubmit);

function functionOnSubmit() {
  // document.getElementById("demo").innerHTML = "Hello World";
  // window.alert("finalSubmitButton was pressed");

  // // Detect if browser is firefox (or related)
  // // SOURCE:  https://stackoverflow.com/a/36322090/1263035
  // if (('netscape' in window) && / rv:/.test(navigator.userAgent)) {
  //     window.alert("firefox i guess")
  // }
  // else {
  //     window.alert("not firefox i guess")
  // }

  // Moved to outside of this function so I can access when clicking Print, to validate if SO# is entered if printing more than one total box
  // var boxNumber = 1;
  // var boxTotal = 1;

  // Brought them back into this function since the initial box number kept increasing every time you went back and modified and submitted again
  boxNumber = 1;
  boxTotal = 1;

  weightCurrentBox = 0;
  weightTotal = 0;

  /// Top 3 button system type selector value check
  // Not working
  // Working reference, used later:  https://stackoverflow.com/a/1423783
  // var valueSystemLds = document.getElementById("btnradio1").value;
  // window.alert("btnradio1 " + valueSystemLds);
  // var valueSystemPold = document.getElementById("btnradio2").value;
  // window.alert("btnradio2 " + valueSystemPold);
  // var valueSystemAccessory = document.getElementById("btnradio3").value;
  // window.alert("btnradio3 " + valueSystemAccessory);

  /// ITEMS  (values entered by user)
  /// Don't add lds to value total (it's not a space value, it's a type)
  /// TIP:  To always show 2 decimel places:  Number(x).toFixed(2);
  /// REFERENCE:  https://stackoverflow.com/a/13292833
  var valueLds = Number(document.getElementById("selectLds").value).toFixed(2);

  // Split System stuff (that we're not really considering when calculating space values)
  // Setting the value of if split system is present, based on auto converting checkboxes to values (unreliable)
  var valueSplitSystemCheck = Number(document.getElementById("checkSplitSystem").value);
  // Also using an IF statement to set the value for if a split system is present, based on checked state
  //  (probably more reliable than relying on my checked||unchecked to 1||0 script)
  if (document.getElementById("checkSplitSystem").checked == true) {
    valueSplitSystemCheck = Number(1);
  } else if (document.getElementById("checkSplitSystem").checked == false) {
    valueSplitSystemCheck = Number(0);
  }
  var valueSplitSystemSelect = Number(document.getElementById("selectSplitSystem").value);

  // SO#
  var valueSoNum = Number(document.getElementById("inputSoNum").value);

  // Add this group to value total
  // TIP:  Use parseInt() or parseFloat() or Number() since it thinks these are strings and not adding properly (Number() does floats too [numbers with decimels])
  // REFERENCE:  https://stackoverflow.com/q/4564158
  var valueScv = Number(document.getElementById("inputScv").value);
  // window.alert("yo valueScv = " + valueScv);
  var valueCp = Number(document.getElementById("inputCp").value);
  // Changed inputHiddenWire to checkHiddenWire and added a new input inputHiddenWireLength, and a new variable valueHiddenWireLength
  var valueHiddenWire = Number(document.getElementById("checkHiddenWire").value);
  var valueHiddenWireLength = Number(document.getElementById("inputHiddenWireLength").value);
  var valueLargePSU = Number(document.getElementById("inputLargePSU").value);
  var valueApi = Number(document.getElementById("inputApi").value);
  var valuePold = Number(document.getElementById("inputPold").value);
  var valuePoldPin = Number(document.getElementById("inputPoldPin").value);
  // Not an item to be added to total, just a checkmark indicator
  var valueLeakRopeCheck = Number(document.getElementById("checkLeakRope").value);
  var valuePoldLeakRope2ft = Number(document.getElementById("inputPoldLeakRope2ft").value);
  var valuePoldLeakRope5ft = Number(document.getElementById("inputPoldLeakRope5ft").value);
  var valuePoldLeakRope10ft = Number(document.getElementById("inputPoldLeakRope10ft").value);
  var valueLeakRope2ft = Number(document.getElementById("inputLeakRope2ft").value);
  var valueLeakRope5ft = Number(document.getElementById("inputLeakRope5ft").value);
  var valueLeakRope10ft = Number(document.getElementById("inputLeakRope10ft").value);
  var valueRecirc = Number(document.getElementById("inputRecirc").value);
  var valueFourHour = Number(document.getElementById("inputFourHour").value);
  var valueSsr = Number(document.getElementById("inputSsr").value);
  var valuePam1 = Number(document.getElementById("inputPam1").value);
  var valueJuncBox = Number(document.getElementById("inputJuncBox").value);
  var valueInsulPouch = Number(document.getElementById("inputInsulPouch").value);

  // Don't add on/off to value total. Use this to trigger something else (undecided what)
  // Convert  On / Undefined  to  1 / 0  by wrapping in Number();  (not sure if that worked, cuz i used javascript above to convert checkbox values to 1/0)
  var valueReplacement = Number(document.getElementById("checkReplacement").value);
  // Debug: Test the checkbox values
  // window.alert("valueReplacement = " + valueReplacement);
  // Determine if the checkbox for debugging is enabled
  var valueDebug = Number(document.getElementById("checkDebug").value);
  // Not using right now. I want debug to be values 0-3 instead of check/uncheck
  var valueDebugChecked = Number(document.getElementById("checkDebug").value);

  // TIP:  If nothing beyond here works, you have a typo or referenced the wrong ID above somewhere (idk why it doesn't error)

  // FUNCTION:  Find the total items added into the form
  // Didn't include LDS because it's not a frequency but a size.
  // valuePold not included. Just copying value over to valuePoldPin if no leak rope
  if (valueLeakRopeCheck == 0) {
    valuePoldPin = valuePold;
  }
  var valueTotal =
    valueSplitSystemCheck +
    valueScv +
    valueCp +
    valuePoldPin +
    valuePoldLeakRope2ft +
    valuePoldLeakRope5ft +
    valuePoldLeakRope10ft +
    valueLeakRope2ft +
    valueLeakRope5ft +
    valueLeakRope10ft +
    valueLargePSU +
    valueApi +
    valueRecirc +
    valueFourHour +
    valueSsr +
    valuePam1 +
    valueJuncBox +
    valueInsulPouch +
    valueHiddenWire;
  // Debugging
  //window.alert("yo valueTotal (form input)= " + valueTotal);

  // FUNCTION:  Multiply the number of each item in the form with the value of the item, to find packing size value. (values for size/space)
  // Can break this out by lds size later if we want
  var totalValueLds = valueLds * packingItem.lds;

  // Old version for split system value (generic)
  // var totalValueSplitSystemCheck = valueSplitSystemCheck * packingItem.splitSystem;

  // Alternative verbose method of determining and retrieving specific split system variable/value
  // HISTORY:  Didn't actually need this once I realized I had no  packingItem.splitSystemB0  default variable/value declared above
  // FUNCTION:  Define the eval alternative function as a variable, to clean up using it in the  totalValueSplitSystemCheck  variable definition below (not needed)
  // var packingItem_splitSystemB_ = Function('return packingItem.splitSystemB' + valueSplitSystemSelect)();
  // FUNCTION:  New method of retrieving split system variable depending on which is selected (not needed)
  // FUNCTION:  Set a default variable value
  // var packingItem_splitSystemB_ = packingItem.splitSystemB0;
  // FUNCTION:  Set a specific variable value
  // if (valueSplitSystemSelect == 1) {
  //     packingItem_splitSystemB_ = packingItem.splitSystemB1;
  // }
  // else if (valueSplitSystemSelect == 2) {
  //     packingItem_splitSystemB_ = packingItem.splitSystemB2;
  // }
  // else if (valueSplitSystemSelect == 3) {
  //     packingItem_splitSystemB_ = packingItem.splitSystemB3;
  // }
  // else if (valueSplitSystemSelect == 0) {
  //     packingItem_splitSystemB_ = packingItem.splitSystemB0;
  // }
  // else {
  //     window.alert("Yo I think something is wrong with the split system value. It's not 0,1,2,3");
  // }
  // FUNCTION:  Alternative (possibly clearer/simpler) version of the line below (defining the function below as a variable above)
  // var totalValueSplitSystemCheck = valueSplitSystemCheck * packingItem_splitSystemB_;

  // New version for split system value (checking specific type of split system)
  // REFERENCE:  (eval alternative. variable as part of a variable, within global window.Function())  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
  // FUNCTION:  Retrieve space value from splitSystemB# variable, based on which split system type is selected (like packingItemWeight.splitSystemB2)
  var totalValueSplitSystemCheck = valueSplitSystemCheck * Function("return packingItem.splitSystemB" + valueSplitSystemSelect)();
  var checkSplitSystemChecked = document.getElementById("checkSplitSystem").checked;
  // Alternative potential method for breaking out split system type (already doing it differently above):
  // var totalValueSplitSystemSelect = valueSplitSystemSelect * packingItem.splitSystemB1;
  // Debugging level 0
  if (valueDebug >= 1) {
    console.log("totalValueSplitSystemCheck = " + totalValueSplitSystemCheck + "  valueSplitSystemCheck = " + valueSplitSystemCheck);
    console.log(
      "Function('return packingItem.splitSystemB#... value = " +
        Function("return packingItem.splitSystemB" + valueSplitSystemSelect)() +
        "  checkSplitSystemChecked = " +
        checkSplitSystemChecked
    );
  }
  var totalValueScv = valueScv * packingItem.scv;
  // window.alert("yo totalValueScv = " + totalValueScv);
  var totalValueCp = valueCp * packingItem.cp;
  var totalValuePold = valuePold * packingItem.pold;
  var totalValuePoldPin = valuePoldPin * packingItem.poldPin;
  // Not a real thing (not an item, so no space value to multiply with)
  // var totalValueLeakRopeCheck ;
  var totalValuePoldLeakRope2ft = valuePoldLeakRope2ft * packingItem.poldLeakRope2ft;
  var totalValuePoldLeakRope5ft = valuePoldLeakRope5ft * packingItem.poldLeakRope5ft;
  var totalValuePoldLeakRope10ft = valuePoldLeakRope10ft * packingItem.poldLeakRope10ft;
  var totalValueLeakRope2ft = valueLeakRope2ft * packingItem.leakRope2ft;
  var totalValueLeakRope5ft = valueLeakRope5ft * packingItem.leakRope5ft;
  var totalValueLeakRope10ft = valueLeakRope10ft * packingItem.leakRope10ft;
  var totalValueLargePSU = valueLargePSU * packingItem.largePSU;
  var totalValueApi = valueApi * packingItem.api;
  var totalValueRecirc = valueRecirc * packingItem.recirc;
  var totalValueFourHour = valueFourHour * packingItem.fourHour;
  var totalValueSsr = valueSsr * packingItem.ssr;
  var totalValuePam1 = valuePam1 * packingItem.pam1;
  var totalValueJuncBox = valueJuncBox * packingItem.juncBox;
  var totalValueInsulPouch = valueInsulPouch * packingItem.insulPouch;
  var totalValueHiddenWire = valueHiddenWire * packingItem.hiddenWire;

  // FUNCTION:  Find the total packing space required by adding all values of number of items multiplied by their space taken
  // totalValuePold not included. Just copying value over to totalValuePoldPin if no leak rope
  if (valueLeakRopeCheck == 0) {
    totalValuePoldPin = totalValuePold;
  }
  var totalValueTotal =
    totalValueSplitSystemCheck +
    totalValueLds +
    totalValueScv +
    totalValueCp +
    totalValuePoldPin +
    totalValuePoldLeakRope2ft +
    totalValuePoldLeakRope5ft +
    totalValuePoldLeakRope10ft +
    totalValueLeakRope2ft +
    totalValueLeakRope5ft +
    totalValueLeakRope10ft +
    totalValueApi +
    totalValueLargePSU +
    totalValueRecirc +
    totalValueFourHour +
    totalValueSsr +
    totalValuePam1 +
    totalValueJuncBox +
    totalValueInsulPouch +
    totalValueHiddenWire;

  // HISTORY:  Changed from using this variable to calculate how much total space value was left to pack, to how many total items are left to pack (since some items have 0 space value)
  // I still need this variable though because I'm doing other calculations like seeing if I can fit leftovers in 14x14  if ((totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) <= (packingItem.box14x14 - packingItem.juncBox))
  // I pulled this up higher to access it for choosing the first box, but left it in its original spot as well
  var totalValueCurrent = totalValueTotal;

  //window.alert("yo totalValueTotal () = " + totalValueTotal);

  /*                Order of Priority:
            Panel, SCV, Hidden Wire and Pam1 always in Box 1
            1a. Large PSU (24V Power Supply w/Enclosure) (for 2.5"-3" systems)
            1. API
            2. POLD
            3. Recirc Pump Switch
            4. 4hr Timer
            5. Enclosures (Pouch + EJB)
            Solid State Relays included with box carrying most POLDs (does not actually apply. too complicated)
            */

  // Variable for text being output to the results box
  var outputString;
  var outputStringFunc;

  // FUNCTION:  Start with LDS size to determine which primary box to start with

  // Split System B3 defaults to Large Accessory Box (14x14x14)  (box value 48 - space value 30 = 18)
  if (valueLds > 0 && valueSplitSystemCheck == 1 && valueSplitSystemSelect == 3) {
    // Pass the box name as a function argument (list of items is returned, and stored as the variable)
    outputStringFunc = buildOutputString("Large Accessory Box (14x14x14)", packingItem.box14x14, packingItemWeight.box14x14);
  }

  // Standard Shipper (19x12x7)  (For .75-1.5" systems only) -Bryce
  // TODO:  Maybe shorthand the code like this, if it works:  if (valueLds <= 1.5 && > 0)   or:  if (1.5 >= valueLds > 0)
  // TODO:  Export text file (node.js?) (do browsers even allow it?) then display that text in browser or print file
  else if (valueLds > 0 && valueLds <= 1.5) {
    // FUNCTION:  Call function to build list of all items and what boxes they go in (displayed later through hidden div)
    // Pass the box name as a function argument (list of items is returned, and stored as the variable)
    outputStringFunc = buildOutputString("Standard Shipper (19x12x7)", packingItem.boxLds, packingItemWeight.boxLds);
  }
  // Large Shipper (18x18x14) = 18 (Used only for 2.5" and 3" systems) -Bryce
  // HISTORY:  Put this above the 2" condition, so if there's a 3 inch system with insulated pouch, it doesn't put the 3" into a medium shipper
  // (may not apply anymore since insulated pouch gets additional medium shipper instead of changing primary box)
  else if (valueLds == 2.5 || valueLds == 3) {
    // FUNCTION:  Call function to build list of all items and what boxes they go in (displayed later through hidden div)
    outputStringFunc = buildOutputString("Large Shipper (18x18x14)", packingItem.boxLdsLarge, packingItemWeight.boxLdsLarge);
  }
  // Medium Shipper (20x12x8)  (Used for 2" systems or Insulated Pouch only) -Bryce
  // HISTORY:  Changed this to only apply to 2" system as primary box. If insulated pouch, medium shipper should be an additional box
  // else if (valueLds == 2 || valueInsulPouch > 0) {
  else if (valueLds == 2) {
    // FUNCTION:  Call function to build list of all items and what boxes they go in (displayed later through hidden div)
    outputStringFunc = buildOutputString("Medium Shipper (20x12x8)", packingItem.boxLdsMedium, packingItemWeight.boxLdsMedium);
  }

  // FUNCTION:  If LDS is 0 (POLD-Only).
  // NOTE: Accessory box is the default primary box for POLD-Only -Bryce
  // TODO:  Maybe add:  || valueLds == '' || valueLds == 'undefined'
  else if (valueLds == 0) {
    // If there's no LDS, determine the first box here
    /*
                // HISTORY:  Removing this since we're not packing junction boxes into 14x14 and trying to share room with other accessories anymore (putting juncBox in separate 14x14x8 box)
                // See if we have 1 or more juncBox present first:
                if (valueJuncBox >= 1) {
                    // then subtracting the value of the juncBoxes and insulPouches from the totalValueCurrent (since we're only worried about the other accessories that will be packed in this box), 
                    // and see if it's less than the space remaining in a 14x14 after packing a juncBox:
                    // TODO:  Make sure the subtraction on the left is working as expected
                    // This should allow packing up to 12pt of accessories in a 14x14 plus a juncBox
                    if ((totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) <= (packingItem.box14x14 -
                            packingItem.juncBox)) {
                        nextBox = "Large Accessory Box (14x14x14)";
                        nextBoxValue = packingItem.box14x14;
                        nextBoxWeightSingle = packingItemWeight.box14x14;
                        // DEBUGGING level 3
                        // if (valueDebug >= 1) {
                        //     window.alert("3 INSIDE IF1:\n (totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) == " + tempWindowalertVariable98sfhn + "\n currentItemName == " + currentItemName);
                        // }
                    }
                    // or if the total accessories (minus juncBox and insulPouch) are greater than or equal to 3 accessory boxes, then pack in a 14x14 instead
                    // TODO:  Make sure the subtraction on the left is working as expected
                    else if ((totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) >= (packingItem
                            .boxAccessories * 3)) {
                        nextBox = "Large Accessory Box (14x14x14)";
                        nextBoxValue = packingItem.box14x14;
                        nextBoxWeightSingle = packingItemWeight.box14x14;
                        // DEBUGGING level 3
                        // if (valueDebug >= 1) {
                        //     window.alert("4 INSIDE IF2:\n (totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) == " + tempWindowalertVariable98sfhn + "\n currentItemName == " + currentItemName);
                        // }
                    } else {
                        // Default back to an accessory box
                        // TODO:  Check to make sure this isn't overriding other special circumstances like recirc pump box (it probably is. may need to move those if cases here)
                        nextBox = "Accessory Box (13x10x5)";
                        nextBoxValue = packingItem.boxAccessories;
                        nextBoxWeightSingle = packingItemWeight.boxAccessories;
                        // or no change. return or do nothing, whatever
                        // DEBUGGING level 3
                        // if (valueDebug >= 1) {
                        //     window.alert("5 INSIDE ELSE:\n (totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) == " + tempWindowalertVariable98sfhn + "\n currentItemName == " + currentItemName);
                        // }
                    }
                }
                */
    // If there's no LDS, determine the first box here (continued)
    //// Duplicated many of these from above, since they apply whether or not there's no juncBox (if the accessories total is within range)
    // HISTORY:  TODO:  Hide weight display for first empty box with only insulated pouch
    // (actually no. just avoid using the first empty box. if i just hide title and weight, the first box will be box 2)
    // TODO:  Make sure the subtraction on the left is working as expected
    // or if the total accessories (minus juncBox and insulPouch) are greater than or equal to 3 accessory boxes, then pack in a 14x14 instead
    if (totalValueCurrent - totalValueJuncBox - totalValueInsulPouch >= 3 * packingItem.boxAccessories) {
      // DEBUGGING level 3
      // if (valueDebug >= 1) {
      //     window.alert("7 INSIDE ELSE IF:\n (totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) == " + tempWindowalertVariable98sfhn + "\n (packingItem.boxAccessories * 3) == " + tempWindowalertVariable354drt);
      // }
      nextBox = "Large Accessory Box (14x14x14)";
      nextBoxValue = packingItem.box14x14;
      nextBoxWeightSingle = packingItemWeight.box14x14;
    } else if (valueRecirc == 1 && valueFourHour == 0 && totalValueCurrent == packingItem.recirc) {
      // FUNCTION:  Puts the Recirc or Four hour timer into its own box if this is the only overflow item
      nextBox = "Recirc/Four Hour Box (9x4x3)";
      nextBoxValue = packingItem.boxRecirc;
      nextBoxWeightSingle = packingItemWeight.boxRecirc;
    } else if (valueRecirc == 0 && valueFourHour == 1 && totalValueCurrent == packingItem.fourHour) {
      // FUNCTION:  Puts the Recirc or Four hour timer into its own box if this is the only overflow item
      nextBox = "Recirc/Four Hour Box (9x4x3)";
      nextBoxValue = packingItem.boxRecirc;
      nextBoxWeightSingle = packingItemWeight.boxRecirc;
    } else {
      // Default back to an accessory box
      // TODO:  Check to make sure this isn't overriding other special circumstances like recirc pump box (it probably is. may need to move those if cases here)
      nextBox = "Accessory Box (13x10x5)";
      nextBoxValue = packingItem.boxAccessories;
      nextBoxWeightSingle = packingItemWeight.boxAccessories;
      // or no change. return or do nothing, whatever
      // DEBUGGING level 3
      // if (valueDebug >= 1) {
      //     window.alert("8 INSIDE ELSE:\n (totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) == " + tempWindowalertVariable98sfhn + "\n (packingItem.boxAccessories * 3) == " + tempWindowalertVariable354drt);
      // }
    }

    // FUNCTION:  Call function to build list of all items and what boxes they go in (displayed later through hidden div)
    // Use the values found in conditions directly above to determine first box
    outputStringFunc = buildOutputString(nextBox, nextBoxValue, nextBoxWeightSingle);
    // outputStringFunc = buildOutputString("Accessory Box (13x10x5)", packingItem.boxAccessories, packingItemWeight.boxAccessories);
  } else {
    window.alert("yo something is wrong with the LDS value.\n valueLds = " + valueLds);
    // FUNCTION:  Call function to build list of all items and what boxes they go in (displayed later through hidden div)
    outputStringFunc = buildOutputString("Accessory Box (13x10x5)", packingItem.boxAccessories, packingItemWeight.boxAccessories);
  }

  // FUNCTION:  Function to build list of items to pack, and show in a popup (to use in each LDS size condition below)
  // NOT THE FINAL THING THAT RUNS
  function buildOutputString(initialBox, boxValue, boxWeightSingle) {
    // DEBUGGING
    // window.alert("function buildOutputString(initialBox, boxValue) {   boxValue\n" + " " + boxValue);

    // FUNCTION:  List all items and what boxes they go in
    // TODO:  Change valueLds to number/amount of LDS entered, then add valueLdsSize for each valve size?

    // Initialize the variable to a string
    outputString = " ";

    //// ADD HEADER ////

    // Add "SO#" header (top of every page, in newBox sections)
    if (valueSoNum > 0) {
      outputString = outputString + "<div class='text-end'><i>SO# " + valueSoNum + "</i></div>";
    }

    // Add "Replacement" header if checkbox is checked
    if (valueReplacement > 0) {
      outputString = outputString + "-- Replacement --<br>";
    }

    // Add "-- POLD System --" header if radio checkbox button selected
    // SOURCE:  https://stackoverflow.com/a/1423783
    if (document.getElementById("btnradio2").checked) {
      outputString = outputString + "-- POLD System --<br>";
    }
    // Old way:
    // if (valueSystemPold > 0) {
    //     outputString = outputString + "-- POLD System --<br>";
    // }

    // Add "-- Accessories Only --" header if radio checkbox button selected
    if (document.getElementById("btnradio3").checked) {
      outputString = outputString + "-- Accessories Only --<br>";
    }

    // Add the first box name, and current/total box numbers
    // TODO:  Might want to change this to only display once things are packed in this box (maybe show later in the packing function/loop)
    // HISTORY:  It was showing an empty accessory box if only junction box/insulated pouch is being sent
    // FIX:  "IF statement" added, to only show this first box line if there's an item to pack besides junction box or insulated pouch (which don't go into an accessory or LDS box)
    if (
      valueLds >= 1 ||
      valueApi >= 1 ||
      valueCp >= 1 ||
      valueFourHour >= 1 ||
      valueLeakRopeCheck >= 1 ||
      valuePam1 >= 1 ||
      valuePold >= 1 ||
      valuePoldPin >= 1 ||
      valueRecirc >= 1 ||
      valueScv >= 1 ||
      valueSsr >= 1
    ) {
      outputString = outputString + "<b>" + initialBox + "</b><i>&nbsp; [Box " + boxNumber + "<span class='boxTotal'>boxTotal</span>" + "]: </i><br>";
    }

    // It didn't work to access & modify this variable if it was declared outside the function, so I declared it inside
    // Initialize a variable to tell how many items are left to pack (to know when you're done, and display info like the final box weight)
    var itemsTotalLeft = valueTotal;
    // HISTORY:  Changed from using this variable to calculate how much total space value was left to pack, to how many total items are left to pack (since some items have 0 space value)
    // I still need this variable though because I'm doing other calculations like seeing if I can fit leftovers in 14x14  if ((totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) <= (packingItem.box14x14 - packingItem.juncBox))  (not anymore though. juncbox not sharing box anymore)
    totalValueCurrent = totalValueTotal;

    // Initialze a variable to track how much space is left in each box, so once it hits a low number, it moves on to next box
    var boxValueLeft = boxValue;
    // window.alert("totalValueTotal = " + totalValueTotal);
    // window.alert("itemsTotalLeft = " + itemsTotalLeft);
    // window.alert("totalValueCurrent = " + totalValueCurrent);
    // window.alert("valueLds = " + valueLds);

    // Add this line to add a breakpoint
    //debugger

    //// PACKING ITEMS INTO FIRST/LDS BOX ////

    // Panel, SCV, Hidden Wire and Pam1 always in Box 1 -Bryce
    // Currently just hard defining this group of items as always going in the first box (not checking if they fit) (according to Bryce rules)
    // TODO:  Maybe change this if there are enough cases to break it, like multiple control panels or something.
    // TODO:  Maybe change this group into a loop/function since it's basically repeated code (just assign a variable for which current item it's evaluating)
    if (valueLds > 0) {
      // Weight variables initialized at the top of the  functionOnSubmit  function a few sections above (a few hundred lines up)

      /// ADD WEIGHT: LDS
      // Remove the period from the LDS size string to get the right LDS number/variable for weight
      var valueLdsMinusPeriod = valueLds.replaceAll(".", "");
      // Not calling a function, just referencing a variable dynamically (packingItemWeight.lds[valueLdsMinusPeriod] aka packingItemWeight.lds200)
      // REFERENCE:  (variable as part of a variable, within global window.Function())  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
      // Alternative:  https://stackoverflow.com/a/52246274/1263035  // window[dynamicname + '2'] = 'myvalue'
      weightCurrentBox += Function("return packingItemWeight.lds" + valueLdsMinusPeriod)();
      weightTotal += Function("return packingItemWeight.lds" + valueLdsMinusPeriod)();

      // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
      // Not using this right now since lds isn't added to the item count
      // itemsTotalLeft = itemsTotalLeft - valueLdsCheck;
      // totalValueCurrent was replaced by itemsTotalLeft but I'm still using it for some other calculations so I'm leaving both
      totalValueCurrent = totalValueCurrent - totalValueLds;
      boxValueLeft = boxValueLeft - totalValueLds;

      // Debugging level 0
      if (valueDebug >= 1) {
        console.log("valueLds = " + valueLds + "  valueLdsMinusPeriod = " + valueLdsMinusPeriod);
        console.log("weightCurrentBox = " + weightCurrentBox + "  weightTotal = " + weightTotal);
        // REFERENCE:  (correcting display of inaccurate floating point math)  https://stackoverflow.com/a/28856155/1263035
        // EXAMPLE:    parseFloat((a-b).toFixed(2));
        console.log(
          "parseFloat((weightCurrentBox).toFixed(2)) = " +
            parseFloat(weightCurrentBox.toFixed(2)) +
            "\nparseFloat((weightTotal).toFixed(2)) = " +
            parseFloat(weightTotal.toFixed(2))
        );
      }

      // If split system, add that info
      if (valueSplitSystemCheck > 0) {
        // Add item to string to be displayed at the end for what to pack
        outputString = outputString + "• LDS (" + valueLds + '") (Split-System B' + valueSplitSystemSelect + ")<br>";

        /// ADD WEIGHT: SPLIT-SYSTEM

        // Not working:
        // REFERENCE:  (variable as part of a variable)  https://stackoverflow.com/a/52245867
        // const packingItemWeightObj = { splitSystemBX: 'packingItemWeight.splitSystemB' + valueSplitSystemSelect };
        // window.alert("packingItemWeightObj.splitSystemBX = " + packingItemWeightObj.splitSystemBX);
        // Not working:
        // REFERENCE:  (referencing a variable name as value)  https://stackoverflow.com/a/5117153
        // weightCurrentBox = eval(packingItemWeightObj.splitSystemBX);
        // Not working:
        // REFERENCE:  https://stackoverflow.com/a/52246274
        // weightCurrentBox = window['packingItemWeight.splitSystemB' + valueSplitSystemSelect];

        // Working (Long version):
        // var obj = looseJsonParse();
        // function looseJsonParse(obj) {
        //     return Function('"use strict"; return packingItemWeight.splitSystemB' + valueSplitSystemSelect)();
        // }
        // weightCurrentBox = obj;

        // Working (Short version):
        // REFERENCE:  (variable as part of a variable, within global window.Function())  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
        // Additional weight for split system extras like extra pipe for probe
        weightCurrentBox += Function("return packingItemWeight.splitSystemB" + valueSplitSystemSelect)();
        // FUNCTION:  Built a variable name for the split system weight, based on which split system type is selected (like packingItemWeight.splitSystemB2)
        // MEANING:  weightCurrentBox += packingItemWeight.splitSystemB[valueSplitSystemSelect];
        weightTotal += Function("return packingItemWeight.splitSystemB" + valueSplitSystemSelect)();

        // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
        itemsTotalLeft = itemsTotalLeft - valueSplitSystemCheck;
        // totalValueCurrent was replaced by itemsTotalLeft but I'm still using it for some other calculations so I'm leaving both
        totalValueCurrent = totalValueCurrent - totalValueSplitSystemCheck;
        boxValueLeft = boxValueLeft - totalValueSplitSystemCheck;
        // Debugging level 0
        console.log("weightCurrentBox = " + weightCurrentBox + "\nweightTotal = " + weightTotal);
      }
      // Otherwise output the normal LDS size info string
      else {
        // Add item to string to be displayed at the end for what to pack
        outputString = outputString + "• LDS (" + valueLds + '") <br>';
        // LDS weight was already calculated before this if/else statement
      }
      // Don't subtract LDS value as of now, since it's actually the pipe size and not space taken, plus it equals 0 anyway.
      // (We have cases to define which box each LDS size goes in anyway)
    }
    if (valueCp > 0) {
      // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
      itemsTotalLeft = itemsTotalLeft - valueCp;
      // totalValueCurrent was replaced by itemsTotalLeft but I'm still using it for some other calculations so I'm leaving both
      totalValueCurrent = totalValueCurrent - totalValueCp;
      boxValueLeft = boxValueLeft - totalValueCp;
      // Add item to string to be displayed at the end for what to pack
      outputString = outputString + "• " + valueCp + " Control Panel<br>";

      /// ADD WEIGHT
      weightCurrentBox += valueCp * packingItemWeight.cp;
      weightTotal += valueCp * packingItemWeight.cp;
    }
    if (valueScv > 0) {
      // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
      itemsTotalLeft = itemsTotalLeft - valueScv;
      // totalValueCurrent was replaced by itemsTotalLeft but I'm still using it for some other calculations so I'm leaving both
      totalValueCurrent = totalValueCurrent - totalValueScv;
      boxValueLeft = boxValueLeft - totalValueScv;
      // Add item to string to be displayed at the end for what to pack
      outputString = outputString + "• " + valueScv + " Spring Check Valve (SCV)<br>";

      /// ADD WEIGHT
      weightCurrentBox += valueScv * packingItemWeight.scv;
      weightTotal += valueScv * packingItemWeight.scv;
    }
    if (valueHiddenWire > 0) {
      // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
      itemsTotalLeft = itemsTotalLeft - valueHiddenWire;
      // totalValueCurrent was replaced by itemsTotalLeft but I'm still using it for some other calculations so I'm leaving both
      totalValueCurrent = totalValueCurrent - totalValueHiddenWire;
      boxValueLeft = boxValueLeft - totalValueHiddenWire;
      // Add item to string to be displayed at the end for what to pack
      outputString = outputString + "• " + valueHiddenWire + " Hidden Wire (" + valueHiddenWireLength + "ft)<br>";

      /// ADD WEIGHT
      // Multiply the number of hidden wires (currently just a 1||0 checkbox) with the length, to calculate weight by cable length
      weightCurrentBox += valueHiddenWire * valueHiddenWireLength * packingItemWeight.hiddenWire;
      weightTotal += valueHiddenWire * valueHiddenWireLength * packingItemWeight.hiddenWire;
    }
    if (valuePam1 > 0) {
      // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
      itemsTotalLeft = itemsTotalLeft - valuePam1;
      // totalValueCurrent was replaced by itemsTotalLeft but I'm still using it for some other calculations so I'm leaving both
      totalValueCurrent = totalValueCurrent - totalValuePam1;
      boxValueLeft = boxValueLeft - totalValuePam1;
      // Add item to string to be displayed at the end for what to pack
      outputString = outputString + "• " + valuePam1 + " PAM-1 Relay<br>";

      /// ADD WEIGHT
      weightCurrentBox += valuePam1 * packingItemWeight.pam1;
      weightTotal += valuePam1 * packingItemWeight.pam1;
    }
    // All items above always go into box 1 (according to Bryce)

    // Show box weight if items are all packed before moving on to the next items
    // TODO:  This may not actually work. Logically it seems like this will only show first box weight if there is nothing left to pack at all.
    // Actually that may be exactly what I wanted, since if there is more to pack, the next box should start by showing the last box weight
    if (itemsTotalLeft <= 0) {
      // Only show weight if there were more than 0 items to pack
      if (valueTotal > 0 || valueLds > 0) {
        // Add the box/packaging weight to the total
        weightCurrentBox += boxWeightSingle;
        weightTotal += boxWeightSingle;
        outputString +=
          " <div class='weightCurrentBox text-muted'><i> &nbsp;  &nbsp;  &nbsp;  &nbsp; (approximate box weight: " +
          parseFloat(weightCurrentBox.toFixed(0)) +
          " lbs)</i><br></div>";
        // DEBUGGING to show info every time a single item is packed (1 line)
        if (valueDebug >= 1) {
          outputString =
            outputString +
            "<br> DEBUGGING INFO: weight1  itemsTotalLeft = " +
            itemsTotalLeft +
            ".  boxValueLeft = " +
            boxValueLeft +
            ".  weightCurrentBox = " +
            weightCurrentBox +
            "<br>";
        }
      } else {
        outputString += "<br><i>Nothing to pack?</i><br>&nbsp;";
      }
    }

    //// CHOOSING NEXT(SECOND) BOX /////

    //// Accessory Box (13x10x5)
    // The following items will fit in current box or create a new box (accessories box is default extra)
    // Define the accessory box as the next box to overflow items into, unless there's a junction box or total >= 49
    // HISTORY:  Changed this section to avoid a mostly empty 14x14 before packing the juncBox (added IF statements after filling first box)
    var nextBox = "Accessory Box (13x10x5)";
    var nextBoxValue = packingItem.boxAccessories;
    var nextBoxWeightSingle = packingItemWeight.boxAccessories;
    // var boxWeightSingle  is defined in buildOutputString function arguments

    //// Medium Shipper
    // HISTORY:  Medium shipper condition for insulated pouch was moved to the section where it checks if there's an insulated pouch and sends it to be packed
    // (otherwise the first item sent to be packed will end up in the medium shipper, instead of the insulated pouch going in there)

    //// Large Accessory Box (14x14x14)
    // Large Accessory Box (14x14x14) = 48 (Use only if EJB is included or if point total is greater than or equal to 49) -Bryce
    // TODO:  Changing this to avoid a mostly empty 14x14 before packing the juncBox
    // This is the overflow box and not the primary box

    // Old version //
    // if (totalValueTotal >= 49 || valueJuncBox > 0) {
    //     nextBox = "Large Accessory Box (14x14x14)";
    //     nextBoxValue = packingItem.box14x14;
    // }

    // New Version //
    // Moved to packing section

    //// Recirc/Four Hour Box (9x4x3)
    // The four hour timer box is only used if a single timer or recirc switch is sent, or it's the only overflow item,
    //  but if both are sent, then they'll be in an accessory box like any other scenario
    // TODO:  Make case for determining if this is the only overflow item (I think i did this already?)
    // HISTORY: Added calculations to ignore if insulated pouch or junction box is still left to pack (since they're in their own box and irrelevant)
    // NOTE: This section only applies to the SECOND box
    if (
      (valueFourHour == 1 || valueRecirc == 1) &&
      (totalValueCurrent - valueInsulPouch * packingItem.insulPouch - valueJuncBox * packingItem.juncBox == packingItem.fourHour ||
        totalValueCurrent - valueInsulPouch * packingItem.insulPouch - valueJuncBox * packingItem.juncBox == packingItem.recirc)
    ) {
      nextBox = "Recirc/Four Hour Box (9x4x3)";
      nextBoxValue = packingItem.boxRecirc;
      nextBoxWeightSingle = packingItemWeight.boxRecirc;
    }
    // End choosing next(second) box
    //  after first box (and packing items that always go in first box: LDS, Panel, Hidden Wire, SCV, and Pam1)

    // Declaring this variable outside of the function so I can use it in the Insulated Pouch section below
    var currentItemCountInBoxOfCurrentItem;

    // FUNCTION:  PACK ITEM FUNCTION (one at a time, instead of item bundles)
    // (Called below, after the function)
    // (valueCurrentItem = how many, subtracted every time one is packed)
    function putInBox(valueCurrentItem, spaceSingleCurrentItem, spaceSingleCurrentItemVariableName, totalValueCurrentItem, currentItemName) {
      if (valueCurrentItem > 0) {
        var loopCount = 0;
        var loopCountElse = 0;
        currentItemCountInBoxOfCurrentItem = 0;

        // Change the variable name from retrieving item space to weight
        var weightSingleCurrentItemVariableName = spaceSingleCurrentItemVariableName.replace("packingItem", "packingItemWeight");
        // Replacement code for eval(), to resolve variable name to a variable. (or to use variable values in variable name). made by me
        // I think this was needed because the single item variable name changes every time this function is called (built/modified above)
        // REFERENCE:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
        weightSingleCurrentItem = Function("return " + weightSingleCurrentItemVariableName)();

        // TODO:  Add box weight to the weight calculation
        // Change the variable name from retrieving box space to weight
        // var weightBoxValueVariableName = boxValue.replace('packingItem', 'packingItemWeight');
        // weightSingleCurrentItem = Function('return ' + weightSingleCurrentItemVariableName)();

        // Keep packing each single item until the total count of the current item type hits 0 (then exit the loop/function, to move on to the next item type.
        // (e.g. keep looping/packing one API at a time until APIs hit 0)
        while (valueCurrentItem > 0) {
          // If the space required for a single item of the current item type is equal to or less than the space left in the current box, then pack it
          if (spaceSingleCurrentItem <= boxValueLeft) {
            //// PACK ONE ITEM AT A TIME ////
            // Reduce number of all combined items to see if you have any leftovers at the very end that never got packed
            itemsTotalLeft--;
            // Reduce value of all combined items for other calculations like to see if you can fit accessories minus insulated pouch in 14x14
            totalValueCurrent = totalValueCurrent - spaceSingleCurrentItem;
            // Subtract single item value from box space remaining
            boxValueLeft = boxValueLeft - spaceSingleCurrentItem;
            // New variable to track if all of the current item type has been packed (might not need this one anymore since i switched to valueCurrentItem for the while loop condition)
            // HISTORY:  This was messing up my Object.keys code below since it has the same name as the function argument
            // Now the debugging string will be missing an updated  totalValueCurrentItem  variable
            //totalValueCurrentItem = totalValueCurrentItem - spaceSingleCurrentItem;
            // New variable to track if all of the current item type has been packed (better version, tracking item count, not space taken, which can equal 0 even if there are items left)
            valueCurrentItem--;
            // Keep count of how many of the current item has been packed into the box.
            currentItemCountInBoxOfCurrentItem++;
            /// ADD WEIGHT
            // (Variables declared outside all functions)
            weightCurrentBox += weightSingleCurrentItem;
            weightTotal += weightSingleCurrentItem;
            // Debugging level 0
            // REFERENCE:  (correcting display of inaccurate floating point math)  https://stackoverflow.com/a/28856155/1263035
            // EXAMPLE:    parseFloat((a-b).toFixed(2));
            console.log("spaceSingleCurrentItemVariableName = " + spaceSingleCurrentItemVariableName + "  weightSingleCurrentItem = " + weightSingleCurrentItem);
            console.log(
              "parseFloat((weightCurrentBox).toFixed(2)) = " +
                parseFloat(weightCurrentBox.toFixed(2)) +
                "\nparseFloat((weightTotal).toFixed(2)) = " +
                parseFloat(weightTotal.toFixed(2))
            );

            // It outputs which items were just packed near the end of this function, just outside the while loop

            loopCount++;

            // DEBUGGING to show info every time a single item is packed (1 line)
            if (valueDebug >= 1) {
              outputString =
                outputString +
                "<br> DEBUGGING INFO: itemsTotalLeft = " +
                itemsTotalLeft +
                ".  boxValueLeft = " +
                boxValueLeft +
                ".  totalValueCurrentItem = " +
                totalValueCurrentItem +
                ".  spaceSingleCurrentItem = " +
                spaceSingleCurrentItem +
                ".  totalValueCurrent = " +
                totalValueCurrent +
                ". weightCurrentBox = " +
                weightCurrentBox +
                "<br>";
            }
          }
          // Otherwise, show how many have been packed into this box, then move on to the next box and keep packing
          // Then go back to the if statement to keep packing in this new box until it runs out of room, then output packed items and weight
          else {
            ///// FINISH THE PREVIOUS BOX /////

            // NOTE:  (Copied this else statement to  // Pack  Insulated Pouch  &  // Pack  Four Hour Timer  &  // Pack  Recirc Pump Switch  section as well. KEEP IT UPDATED)
            // I think I eliminated some of those external copied statements by bringing more nextBox calculations into this putInBox function (below)
            // Display how many of this item has been packed into the current box, before switching boxes (if there are 1 or more in there)
            if (currentItemCountInBoxOfCurrentItem >= 1) {
              outputString = outputString + "• " + currentItemCountInBoxOfCurrentItem + " " + currentItemName + "<br>";
            }

            // Debugging level 0
            // console.log("valueLds = " + valueLds + "  valueLdsMinusPeriod = " + valueLdsMinusPeriod);
            // console.log("weightCurrentBox = " + weightCurrentBox + "  weightTotal = " + weightTotal);
            // REFERENCE:  (correcting display of inaccurate floating point math)  https://stackoverflow.com/a/28856155/1263035
            // EXAMPLE:    parseFloat((a-b).toFixed(2));
            if (valueDebug >= 1) {
              console.log(
                "parseFloat((weightCurrentBox).toFixed(2)) = " +
                  parseFloat(weightCurrentBox.toFixed(2)) +
                  "\nparseFloat((weightTotal).toFixed(2)) = " +
                  parseFloat(weightTotal.toFixed(2))
              );
            }

            /// Show weight (before new box)
            // Copied this to the  // Pack  Insulated Pouch  section as well (since it has a copy of this else statement)
            // Keep the copy there updated!
            // If nothing has been packed yet, don't show info for an empty accessory box first
            if (itemsTotalLeft == valueTotal) {
              // Don't show the weight (if nothing has been packed yet)
            } else {
              // Add the box/packaging weight to the total
              weightCurrentBox += boxWeightSingle;
              weightTotal += boxWeightSingle;
              outputString +=
                " <div class='weightCurrentBox text-muted'><i> &nbsp;  &nbsp;  &nbsp;  &nbsp; (approximate box weight: " +
                parseFloat(weightCurrentBox.toFixed(0)) +
                " lbs)</i><br></div>";
              // DEBUGGING to show which code is displaying weight
              if (valueDebug >= 1) {
                outputString =
                  outputString +
                  "<br> DEBUGGING INFO: weight3  else (newbox) itemsTotalLeft = " +
                  itemsTotalLeft +
                  ".  boxValueLeft = " +
                  boxValueLeft +
                  ".  totalValueCurrentItem = " +
                  totalValueCurrentItem +
                  ".  spaceSingleCurrentItem = " +
                  spaceSingleCurrentItem +
                  ".  totalValueCurrent = " +
                  totalValueCurrent +
                  ". weightCurrentBox = " +
                  weightCurrentBox +
                  ". weightSingleCurrentItem = " +
                  weightSingleCurrentItem +
                  "<br>";
              }
            }
            // DEBUGGING
            if (valueDebug >= 1) {
              outputString =
                outputString +
                "<br> DEBUGGING INFO: last boxValue = " +
                boxValue +
                ".  boxValueLeft = " +
                boxValueLeft +
                ". weightCurrentBox = " +
                weightCurrentBox +
                ". weightTotal = " +
                weightTotal +
                "<br>";
            }

            // Tried to make this a function i could call to pick the first box,
            //  but I need to pull it out of this parent function, and remove some lines/variables
            // chooseNextBox();
            // function chooseNextBox() {

            //// START THE NEXT BOX

            /*
                                // HISTORY:  Removed this section so we don't pack accessories and juncBox into a 14x14x14. Using rules below instead
                                // Can delete entire commented section
                                //// EXCEPTION FOR SELECTING 14X14 AS NEXTBOX RIGHT AFTER FILLING THE FIRST BOX ////

                                // Change rules to prevent 2 14x14s when packing EJB with second mostly empty.
                                // (actually we won't have a negative value because the juncBoxes are all added to the total, so using totalValueJuncBox should work)
                                // This should pack juncBox plus up to 12 points of accessories in a 14x14.

                                // Run only directly after the first box is filled (standard shipper, large shipper, or medium shipper not with insulated pouch)
                                // TODO:  This is also running after packing an Accessory Box, since it has the same value as Standard Shipper / boxLds (12)
                                // TODO:  Might wanna change that if it's causing problems, but it actually worked out nicely when testing a POLD-Only system scenario
                                // DEBUGGING
                                // if (valueDebug >= 1) {
                                //     window.alert("1 BEFORE 14x14 IF:\n boxValue == " + boxValue + "\n currentItemName == " + currentItemName);
                                // }

                                // HISTORY:  Removed this condition so it analyzes after every box (I was getting too many 14x14s)
                                // if ((boxValue == packingItem.boxLds) || (boxValue == packingItem.boxLdsLarge) || ((boxValue == packingItem.boxLdsMedium) && (currentItemName != "Insulated Pouch"))) {

                                // DEBUGGING level 3
                                // if (valueDebug >= 1) {
                                //     window.alert("2 INSIDE 14x14 IF:\n boxValue == " + boxValue + "\n currentItemName == " + currentItemName);
                                // }

                                // DEBUGGING
                                // For last Else If (putting it right above the else if causes an error. prob not supposed to have statements in between if/elses) (may not need this anymore)
                                var tempWindowalertVariable98sfhn = (totalValueCurrent - totalValueJuncBox -
                                    totalValueInsulPouch);
                                var tempWindowalertVariable354drt = (3 * packingItem.boxAccessories);
                                // window.alert("6 BEFORE ELSE IF:\n (totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) == " + tempWindowalertVariable98sfhn + "\n (packingItem.boxAccessories * 3) == " + tempWindowalertVariable354drt);

                                // See if we have 1 or more juncBox present first:
                                if (valueJuncBox >= 1) {
                                    // then subtracting the value of the juncBoxes and insulPouches from the totalValueCurrent (since we're only worried about the other accessories that will be packed in this box), 
                                    // and see if it's less than the space remaining in a 14x14 after packing a juncBox:
                                    // TODO:  Make sure the subtraction on the left is working as expected
                                    // This should allow packing up to 12 points of accessories in a 14x14 plus a juncBox
                                    if ((totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) <= (packingItem
                                            .box14x14 - packingItem.juncBox)) {
                                        nextBox = "Large Accessory Box (14x14x14)";
                                        nextBoxValue = packingItem.box14x14;
                                        nextBoxWeightSingle = packingItemWeight.box14x14;
                                        // DEBUGGING level 3
                                        // if (valueDebug >= 1) {
                                        //     window.alert("3 INSIDE IF1:\n (totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) == " + tempWindowalertVariable98sfhn + "\n currentItemName == " + currentItemName);
                                        // }
                                    }
                                    // or if the total accessories (minus juncBox and insulPouch) are greater than or equal to 3 accessory boxes, then pack in a 14x14 instead
                                    // TODO:  Make sure the subtraction on the left is working as expected
                                    else if ((totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) >= (
                                            packingItem.boxAccessories * 3)) {
                                        nextBox = "Large Accessory Box (14x14x14)";
                                        nextBoxValue = packingItem.box14x14;
                                        nextBoxWeightSingle = packingItemWeight.box14x14;
                                        // DEBUGGING level 3
                                        // if (valueDebug >= 1) {
                                        //     window.alert("4 INSIDE IF2:\n (totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) == " + tempWindowalertVariable98sfhn + "\n currentItemName == " + currentItemName);
                                        // }
                                    } else {
                                        // Default back to an accessory box
                                        // TODO:  Check to make sure this isn't overriding other special circumstances like recirc pump box (it probably is. may need to move those if cases here)
                                        nextBox = "Accessory Box (13x10x5)";
                                        nextBoxValue = packingItem.boxAccessories;
                                        nextBoxWeightSingle = packingItemWeight.boxAccessories;
                                        // or no change. return or do nothing, whatever
                                        // DEBUGGING level 3
                                        // if (valueDebug >= 1) {
                                        //     window.alert("5 INSIDE ELSE:\n (totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) == " + tempWindowalertVariable98sfhn + "\n currentItemName == " + currentItemName);
                                        // }
                                    }

                                    //// CONDITIONS PER ITEM TYPE
                                    // If current item is Junction Box, Set as Large Accessory Box
                                    if (spaceSingleCurrentItemVariableName == "packingItem.juncBox") {
                                        // HISTORY:  THIS IS NOW CHANGED to Medium Accessory Box (14x14x8). (updated in below section)
                                        // This section removed so we don't pack accessories and juncBox into a 14x14x14. Using rules below instead
                                        // Large Accessory Box (14x14x14) = 48 (Use only if EJB is included or if Point total is greater than or equal to 49) -Bryce
                                        // Might need to reset it back to accessory box afterward
                                        nextBox = "Large Accessory Box (14x14x14)";
                                        nextBoxValue = packingItem.box14x14;
                                        nextBoxWeightSingle = packingItemWeight.box14x14;
                                    }
                                    // If current item is insulated pouch, Set as medium shipper
                                    else if (spaceSingleCurrentItemVariableName == "packingItem.insulPouch") {
                                        // Medium Shipper (20x12x8) = 6 (Used for 2" systems or Insulated Pouch only) -Bryce
                                        // NOTE:  Insulated Pouch will always only fit into the medium shipper. -Bryce
                                        nextBox = "Medium Shipper (20x12x8)";
                                        nextBoxValue = packingItem.boxLdsMedium;
                                        nextBoxWeightSingle = packingItemWeight.boxLdsMedium;
                                    }
                                    // If current item is recirc pump, see if it's the only overflow item (and put it in its own box if so)
                                    else if (spaceSingleCurrentItemVariableName == "packingItem.recirc") {
                                        // FUNCTION:  Puts the Recirc or Four hour timer into its own box if this is the only overflow item
                                        if ((valueRecirc == 1 && valueFourHour == 0) && (totalValueCurrent ==
                                                packingItem.recirc) && (boxValueLeft < packingItem.recirc)) {
                                            nextBox = "Recirc/Four Hour Box (9x4x3)";
                                            nextBoxValue = packingItem.boxRecirc;
                                            nextBoxWeightSingle = packingItemWeight.boxRecirc;
                                        }
                                    }
                                    // If current item is four hour timer, see if it's the only overflow item (and put it in its own box if so)
                                    else if (spaceSingleCurrentItemVariableName == "packingItem.fourHour") {
                                        if ((valueRecirc == 0 && valueFourHour == 1) && (totalValueCurrent ==
                                                packingItem.fourHour) && (boxValueLeft < packingItem.fourHour)) {
                                            nextBox = "Recirc/Four Hour Box (9x4x3)";
                                            nextBoxValue = packingItem.boxRecirc;
                                            nextBoxWeightSingle = packingItemWeight.boxRecirc;
                                        }
                                    }
                                }
                                */

            //// START THE NEXT BOX (continued)
            //// Duplicated many of these from above, since they apply whether or not there's no juncBox (if the accessories total is within range)
            // HISTORY:  These are the only rules running now that junction boxes aren't going into 14x14x14, so rules above disabled
            // TODO:  Make sure the subtraction on the left is working as expected
            // or if the total accessories (minus juncBox and insulPouch) are greater than or equal to 3 accessory boxes, then pack in a 14x14 instead
            // NOTE: 3 accessory boxes worth of items should go in 1 large accessory box instead
            var threeAccessoryBoxWorthShouldBeLargeAcessoryBox = 3 * Number(packingItem.boxAccessories);
            // if ((totalValueCurrent - totalValueLargePSU - totalValueJuncBox - totalValueInsulPouch) >= (threeAccessoryBoxWorthShouldBeLargeAcessoryBox)) {
            if (totalValueCurrent - totalValueJuncBox - totalValueInsulPouch >= threeAccessoryBoxWorthShouldBeLargeAcessoryBox) {
              // DEBUGGING level 3
              // if (valueDebug >= 1) {
              //     window.alert("7 INSIDE ELSE IF:\n (totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) == " + tempWindowalertVariable98sfhn + "\n (packingItem.boxAccessories * 3) == " + tempWindowalertVariable354drt);
              // }
              nextBox = "Large Accessory Box (14x14x14)";
              nextBoxValue = packingItem.box14x14;
              nextBoxWeightSingle = packingItemWeight.box14x14;
            } // If current item is larger than an Accessory Box, choose a Large Accessory Box (exception for items like Large PSU). Need to pack before smaller things
            else if (spaceSingleCurrentItem >= packingItem.boxAccessories) {
              // DEBUGGING level 3
              // if (valueDebug >= 1) {
              //     window.alert("7 INSIDE ELSE IF:\n (totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) == " + tempWindowalertVariable98sfhn + "\n (packingItem.boxAccessories * 3) == " + tempWindowalertVariable354drt);
              // }
              nextBox = "Large Accessory Box (14x14x14)";
              nextBoxValue = packingItem.box14x14;
              nextBoxWeightSingle = packingItemWeight.box14x14;
            } //// Recirc/Four Hour Box (9x4x3)
            // The four hour timer box is only used if a single timer or recirc switch is sent, or it's the only overflow item,
            //  but if both are sent, then they'll be in an accessory box like any other scenario
            // TODO:  Make case for determining if this is the only overflow item (I think i did this already?)
            // HISTORY: Added calculations to ignore if insulated pouch or junction box is still left to pack (since they're in their own box and irrelevant)
            // HISTORY: Changed  totalValueTotal  to  totalValueCurrent  and made sure current item is 1 fourHour or 1 recirc
            else if (
              (spaceSingleCurrentItemVariableName == "packingItem.fourHour" || spaceSingleCurrentItemVariableName == "packingItem.recirc") &&
              valueCurrentItem == 1 &&
              (totalValueCurrent - valueInsulPouch * packingItem.insulPouch - valueJuncBox * packingItem.juncBox == packingItem.fourHour ||
                totalValueCurrent - valueInsulPouch * packingItem.insulPouch - valueJuncBox * packingItem.juncBox == packingItem.recirc)
            ) {
              nextBox = "Recirc/Four Hour Box (9x4x3)";
              nextBoxValue = packingItem.boxRecirc;
              nextBoxWeightSingle = packingItemWeight.boxRecirc;
            } else {
              // Default back to an accessory box
              // TODO:  Check to make sure this isn't overriding other special circumstances like recirc pump box (it probably is. may need to move those if cases here)
              nextBox = "Accessory Box (13x10x5)";
              nextBoxValue = packingItem.boxAccessories;
              nextBoxWeightSingle = packingItemWeight.boxAccessories;
              // or no change. return or do nothing, whatever
              // DEBUGGING level 3
              // if (valueDebug >= 1) {
              //     window.alert("8 INSIDE ELSE:\n (totalValueCurrent - totalValueJuncBox - totalValueInsulPouch) == " + tempWindowalertVariable98sfhn + "\n (packingItem.boxAccessories * 3) == " + tempWindowalertVariable354drt);
              // }
            }

            //// CONDITIONS PER ITEM TYPE
            // If current item is Junction Box, Set as Medium Accessory Box (14x14x8)
            if (spaceSingleCurrentItemVariableName == "packingItem.juncBox") {
              // Medium Accessory Box (14x14x8) = (Use only for Electrical Junction Box)
              // Might need to reset it back to accessory box afterward
              nextBox = "Medium Accessory Box (14x14x8)";
              nextBoxValue = packingItem.box14x14x8;
              nextBoxWeightSingle = packingItemWeight.box14x14x8;
            }
            // If current item is insulated pouch, Set as medium shipper
            else if (spaceSingleCurrentItemVariableName == "packingItem.insulPouch") {
              // Medium Shipper (20x12x8) = 6 (Used for 2" systems or Insulated Pouch only) -Bryce
              // NOTE:  Insulated Pouch will always only fit into the medium shipper. -Bryce
              nextBox = "Medium Shipper (20x12x8)";
              nextBoxValue = packingItem.boxLdsMedium;
              nextBoxWeightSingle = packingItemWeight.boxLdsMedium;
            }
            // If current item is recirc pump, see if it's the only overflow item (and put it in its own box if so)
            else if (spaceSingleCurrentItemVariableName == "packingItem.recirc") {
              // FUNCTION:  Puts the Recirc or Four hour timer into its own box if this is the only overflow item
              // Changed IF condition to work when there's one recirc left, even if there were recircs packed already
              // if ((valueRecirc == 1 && valueFourHour == 0) && (totalValueCurrent == packingItem.recirc) && (boxValueLeft < packingItem.recirc)) {
              if (totalValueCurrent == packingItem.recirc && boxValueLeft < packingItem.recirc) {
                nextBox = "Recirc/Four Hour Box (9x4x3)";
                nextBoxValue = packingItem.boxRecirc;
                nextBoxWeightSingle = packingItemWeight.boxRecirc;
              }
            }
            // If current item is four hour timer, see if it's the only overflow item (and put it in its own box if so)
            else if (spaceSingleCurrentItemVariableName == "packingItem.fourHour") {
              // Changed IF condition to work when there's one fourHour left, even if there were recircs or fourHours packed already
              // if ((valueRecirc == 0 && valueFourHour == 1) && (totalValueCurrent == packingItem.fourHour) && (boxValueLeft < packingItem.fourHour)) {
              if (totalValueCurrent == packingItem.fourHour && boxValueLeft < packingItem.fourHour) {
                nextBox = "Recirc/Four Hour Box (9x4x3)";
                nextBoxValue = packingItem.boxRecirc;
                nextBoxWeightSingle = packingItemWeight.boxRecirc;
              }
            }

            //// END NEXTBOX EXCEPTIONS (then continue the packing loop) ////

            // If nothing has been packed yet, don't increase the box number (for an empty accessory box)
            // (Must have this statement above the  itemsTotalLeft--;  line below)
            if (itemsTotalLeft == valueTotal) {
              // Don't increase the box number (if nothing has been packed yet)
            } else {
              // Add 1 to the boxTotal and boxNumber
              boxNumber++;
              boxTotal++;
            }
            // Change current box to whatever box is next (like accessory box or 14x14)
            boxValue = nextBoxValue;
            // Change current box packaging weight to next box packaging weight
            boxWeightSingle = nextBoxWeightSingle;
            // Resets the space remaining in the box to the full total of the new empty box
            boxValueLeft = boxValue;
            // Reduce number of all combined items to see if you have any leftovers at the very end that never got packed
            itemsTotalLeft--;

            totalValueCurrent = totalValueCurrent - spaceSingleCurrentItem;
            // Reset current box weight to 0
            weightCurrentBox = 0;
            // Add weight of current item
            weightCurrentBox += weightSingleCurrentItem;
            weightTotal += weightSingleCurrentItem;
            // Removed since that should only happen at the end of a box, before displaying the last packed item
            // Right now we're just packing an item and showing the new box name, then it goes back up to the if/else statement for continuing packing this box
            // // Add weight of nextBox
            // weightCurrentBox += boxWeightSingle;
            // weightTotal += boxWeightSingle;
            // Subtract single item value from box space remaining
            boxValueLeft = boxValueLeft - spaceSingleCurrentItem;
            // Old variable to track if all of the current item type has been packed (might not need this one anymore since i switched to valueCurrentItem for the while loop condition)
            totalValueCurrentItem = totalValueCurrentItem - spaceSingleCurrentItem;
            // New variable to track if all of the current item type has been packed (better version, tracking item count, not space taken, which can equal 0 even if there are items left)
            valueCurrentItem--;
            // Keep count of how many of the current item has been packed into the box (reset the count to 1 when changing boxes).
            currentItemCountInBoxOfCurrentItem = 1;

            // Add item to string to be displayed at the end for what to pack
            // List the current box number and a placeholder for boxTotal, to be replaced at the end with innderHTML javascript (since we don't know the total number of boxes until it ends)
            // If there's an SO#, add it to the top of the page for each box
            // NOTE:  Added newBoxBefore1 and newBoxBefore2 to fix html2pdf inserting the page break in wrong location (issue with nested divs)
            if (valueSoNum > 0) {
              outputString =
                outputString +
                "<br><div class='newBoxBefore1'>&nbsp;</div><div class='newBoxBefore2'>&nbsp;</div><div class='newBox'><div class='soBox text-end'><i>SO# " +
                valueSoNum +
                "</i></div><b>" +
                nextBox +
                "</b><i>&nbsp; [Box " +
                boxNumber +
                "<span class='boxTotal'>boxTotal</span>" +
                "]: </i></div>";
            } else {
              outputString =
                outputString +
                "<br><div class='newBoxBefore1'>&nbsp;</div><div class='newBoxBefore2'>&nbsp;</div><div class='newBox'><b>" +
                nextBox +
                "</b><i>&nbsp; [Box " +
                boxNumber +
                "<span class='boxTotal'>boxTotal</span>" +
                "]: </i></div>";
            }
            // outputString = outputString + "• " + currentItemCountInBoxOfCurrentItem + " " + currentItemName + "<br>";

            // HISTORY:  This broke using the 14x14 when you had a lot of items, so I removed it. Medium should be working better now.
            // // To work with the Medium Shipper, after using one extra box, define the next extra box to use as the default accessory box (so we don't get multiple medium shippers)
            // nextBox = "Accessory Box (13x10x5)";
            // nextBoxValue = packingItem.boxAccessories;

            // DEBUGGING to show info every time a single item is packed (1 line)
            if (valueDebug == 1) {
              outputString =
                outputString +
                "<br> DEBUGGING INFO: itemsTotalLeft = " +
                itemsTotalLeft +
                ".  boxValueLeft = " +
                boxValueLeft +
                ".  totalValueCurrentItem = " +
                totalValueCurrentItem +
                ".  spaceSingleCurrentItem = " +
                spaceSingleCurrentItem +
                ".  totalValueCurrent = " +
                totalValueCurrent +
                "<br>";
            }

            loopCount++;
            loopCountElse++;
            if (loopCountElse >= 60) {
              outputString =
                outputString +
                "<br><b><span style='color:red;'>WARNING:</span> I tried packing this item into a new box " +
                loopCount +
                " different times and gave up </b><br>(Actually what might be happening is this loop just stops after packing " +
                loopCount +
                " boxes with the same item, to avoid getting stuck in a possible infinite loop. If you really need this many boxes, just increase the value for this IF statement condition.)<br>";
              break;
            }
            // break;
          }
          // Added extra breaks cuz the else loop kept running even after breaking out of it. I guess I didn't break enough to get out of the while loop.
          // Maybe removed the break here so the outputString line below would still work?
          // break;
        }

        // Display how many of this item has been packed into the box, before (after?) exiting while loop
        outputString = outputString + "• " + currentItemCountInBoxOfCurrentItem + " " + currentItemName + "<br>";

        // Show the weight at the end of the final box (if the total number of items left to pack is 0 or less). (it was only showing weight when starting packing another box)
        // (Moved this to the end of this function, where it's outputting the line for the items packed)
        if (itemsTotalLeft <= 0) {
          // Only show weight if there was more than 0 items to pack
          if (valueTotal > 0 || valueLds > 0) {
            // Add the box/packaging weight to the total
            // Add the box/packaging weight to the total
            weightCurrentBox += boxWeightSingle;
            weightTotal += boxWeightSingle;
            outputString +=
              " <div class='weightCurrentBox text-muted'><i> &nbsp;  &nbsp;  &nbsp;  &nbsp; (approximate box weight: " +
              parseFloat(weightCurrentBox.toFixed(0)) +
              " lbs)</i><br></div>";
            // DEBUGGING to show info every time a single item is packed (1 line)
            if (valueDebug >= 1) {
              outputString =
                outputString +
                "<br> DEBUGGING INFO: weight2  itemsTotalLeft = " +
                itemsTotalLeft +
                ".  boxValueLeft = " +
                boxValueLeft +
                ".  totalValueCurrentItem = " +
                totalValueCurrentItem +
                ".  spaceSingleCurrentItem = " +
                spaceSingleCurrentItem +
                ".  totalValueCurrent = " +
                totalValueCurrent +
                ". weightCurrentBox = " +
                weightCurrentBox +
                "<br>";
            }
          } else {
            outputString += "<br><i>Nothing to pack?</i><br>&nbsp;";
          }
        }
      }
      // Return how many of the current item is left to pack
      return valueCurrentItem;
    }
    // End function putInBox  (child of function buildOutputString)

    // FUNCTION:  Call item packing function (above), for each item
    // FORMAT:  (valueCurrentItem, spaceSingleCurrentItem, totalValueCurrentItem, currentItemName)
    // TODO:  Maybe wrap each in an IF statement to avoid calling the function every time even with 0 items from that type
    packAllItems();
    // Run it again until largePSU gets packed
    // ISSUE:  It's packing everything multiple times. I'd need to use different variables to track/control this
    // while (itemsTotalLeft > 0) {
    //     packAllItems();
    // }
    // I'm just going to switch to duplicating the packLargePSU function after every item

    // START PACK ALL ITEMS FUNCTION
    function packAllItems() {
      // Try packing Large PSU (only works after first box is full)
      packLargePSU();
      // Track how many of the current item is left to pack (only applies to largePSU currently)
      var currentItemCountLeftToPackOfCurrentItem = valueLargePSU;

      // Pack largePSU
      // Don't need an  if > 0  statement since it's included in the referenced function
      function packLargePSU() {
        // Only pack largePSU after filling the first box
        if (boxNumber == 1) {
          // Don't pack Large PSU yet, unless it's the only/last item left to pack besides juncBox/insulPouch
          if (totalValueCurrent - valueInsulPouch * packingItem.insulPouch - valueJuncBox * packingItem.juncBox == packingItem.largePSU) {
            if (currentItemCountLeftToPackOfCurrentItem > 0) {
              // Keep track of if it's already been packed (through putInBox function return value)
              currentItemCountLeftToPackOfCurrentItem = putInBox(
                valueLargePSU,
                packingItem.largePSU,
                "packingItem.largePSU",
                totalValueLargePSU,
                "Large PSU (24V Power Supply w/Enclosure)"
              );
            }
          }
        } else if (boxNumber > 1) {
          // If on 2nd or later box, pack largePSU
          if (currentItemCountLeftToPackOfCurrentItem > 0) {
            // Keep track of if it's already been packed (through putInBox function return value)
            currentItemCountLeftToPackOfCurrentItem = putInBox(
              valueLargePSU,
              packingItem.largePSU,
              "packingItem.largePSU",
              totalValueLargePSU,
              "Large PSU (24V Power Supply w/Enclosure)"
            );
          }
        } else {
          // Error: Invalid boxNumber value
          window.alert("Error: Invalid boxNumber value. boxNumber == " + boxNumber);
        }
      }

      // Pack  API
      // Don't need an  if > 0  statement since it's included in the referenced function
      putInBox(valueApi, packingItem.api, "packingItem.api", totalValueApi, "API");

      // -- Try packing Large PSU again (only works after first box is full)
      packLargePSU();

      // Pack  POLD (w/pins)
      // Use normal POLD input value (valuePold), if no leak rope
      if (valueLeakRopeCheck == 0) {
        putInBox(valuePold, packingItem.pold, "packingItem.pold", totalValuePold, "POLD");
      }
      // Use POLD with pins input value (valuePoldPin), if leak rope
      else if (valueLeakRopeCheck == 1) {
        putInBox(valuePoldPin, packingItem.poldPin, "packingItem.poldPin", totalValuePoldPin, "POLD (with pins)");
      } else {
        window.alert(
          "The value for the leak rope checkbox is not 1 or 0, so no POLDs or leak rope got packed. Gotta fix this IF statement or the function that changes checkbox value to 1 or 0.\nvalueLeakRopeCheck = " +
            valueLeakRopeCheck
        );
      }

      // -- Try packing Large PSU again (only works after first box is full)
      packLargePSU();

      // Pack  POLD with Leak Rope (2ft)
      putInBox(valuePoldLeakRope2ft, packingItem.poldLeakRope2ft, "packingItem.poldLeakRope2ft", totalValuePoldLeakRope2ft, "POLD with Leak Rope (2ft)");

      // -- Try packing Large PSU again (only works after first box is full)
      packLargePSU();

      // Pack  POLD with Leak Rope (5ft)
      putInBox(valuePoldLeakRope5ft, packingItem.poldLeakRope5ft, "packingItem.poldLeakRope5ft", totalValuePoldLeakRope5ft, "POLD with Leak Rope (5ft)");

      // -- Try packing Large PSU again (only works after first box is full)
      packLargePSU();

      // Pack  POLD with Leak Rope (10ft)
      putInBox(valuePoldLeakRope10ft, packingItem.poldLeakRope10ft, "packingItem.poldLeakRope10ft", totalValuePoldLeakRope10ft, "POLD with Leak Rope (10ft)");

      // -- Try packing Large PSU again (only works after first box is full)
      packLargePSU();

      // Pack  Leak Rope (2ft)
      putInBox(valueLeakRope2ft, packingItem.leakRope2ft, "packingItem.leakRope2ft", totalValueLeakRope2ft, "Leak Rope (2ft)");

      // -- Try packing Large PSU again (only works after first box is full)
      packLargePSU();

      // Pack  Leak Rope (5ft)
      putInBox(valueLeakRope5ft, packingItem.leakRope5ft, "packingItem.leakRope5ft", totalValueLeakRope5ft, "Leak Rope (5ft)");

      // -- Try packing Large PSU again (only works after first box is full)
      packLargePSU();

      // Pack  Leak Rope (10ft)
      putInBox(valueLeakRope10ft, packingItem.leakRope10ft, "packingItem.leakRope10ft", totalValueLeakRope10ft, "Leak Rope (10ft)");

      // -- Try packing Large PSU again (only works after first box is full)
      packLargePSU();

      // Pack  Solid State Relay
      // TODO:  "Solid State Relays included with box carrying most POLDs"  (although putting it in the last box a pold or leak rope went into is a lot easier)
      putInBox(valueSsr, packingItem.ssr, "packingItem.ssr", totalValueSsr, "Solid State Relay");

      // -- Try packing Large PSU again (only works after first box is full)
      packLargePSU();

      // Pack  Recirc Pump Switch
      if (valueRecirc > 0) {
        //// Moved all this nextBox stuff to inside the putInBox function
        //     // FUNCTION:  Puts the Recirc or Four hour timer into its own box if this is the only overflow item
        //     if ((valueRecirc == 1 && valueFourHour == 0) && (totalValueCurrent == packingItem.recirc) && (boxValueLeft < packingItem.recirc)) {
        //         nextBox = "Recirc/Four Hour Box (9x4x3)";
        //         nextBoxValue = packingItem.boxRecirc;
        //         nextBoxWeightSingle = packingItemWeight.boxRecirc;

        //         // Basically copied the ELSE statement from the function about to be called,
        //         // to make sure it changes boxes to Medium Shipper before packaging an Insulated Pouch
        //         // since that's apparently the only box it fits in.
        //         // But removed the parts about packing an item. (just showing the new box title)

        //         // Show weight (before new box)
        //         // Add the box/packaging weight to the total
        //         weightCurrentBox += boxWeightSingle;
        //         weightTotal += boxWeightSingle;
        //         outputString += " <div class='weightCurrentBox text-muted'><i> &nbsp;  &nbsp;  &nbsp;  &nbsp; (approximate box weight: " + parseFloat((weightCurrentBox).toFixed(2)) + " lbs)</i><br></div>";
        //         // Reset box weight
        //         weightCurrentBox = 0;
        //         // DEBUGGING to show info every time a single item is packed (1 line)
        //         if (valueDebug >= 1) {
        //             outputString = outputString + "<br> DEBUGGING INFO: weight4  else (newbox) totalValueCurrent = " + totalValueCurrent + ".  boxValueLeft = " + boxValueLeft + ". weightCurrentBox = " + weightCurrentBox + ". weightSingleCurrentItem = " + weightSingleCurrentItem + "<br>";
        //         }

        //         // Change current box to next box
        //         boxValue = nextBoxValue;
        //         // Change current box packaging weight to next box packaging weight
        //         boxWeightSingle = nextBoxWeightSingle;
        //         // Resets the space remaining in the box to the full total of the new empty box
        //         boxValueLeft = boxValue;
        //         // Add 1 to the boxTotal and boxNumber
        //         boxNumber++;
        //         boxTotal++;
        //         // Add item to string to be displayed at the end for what to pack
        //         // If there's an SO#, add it to the top of the page for each box
        //         if (valueSoNum > 0) {
        //             outputString = outputString + "<br><div class='newBoxBefore1'>&nbsp;</div><div class='newBoxBefore2'>&nbsp;</div><div class='newBox'><div class='soBox text-end'><i>SO# " + valueSoNum + "</i></div><b>" + nextBox + "</b><i>&nbsp; [Box " + boxNumber + "<span class='boxTotal'>boxTotal</span>" + "]: </i></div>";
        //         }
        //         else {
        //             outputString = outputString + "<br><div class='newBoxBefore1'>&nbsp;</div><div class='newBoxBefore2'>&nbsp;</div><div class='newBox'><b>" + nextBox + "</b><i>&nbsp; [Box " + boxNumber + "<span class='boxTotal'>boxTotal</span>" + "]: </i></div>";
        //         }
        //         // outputString = outputString + "• " + currentItemCountInBoxOfCurrentItem + " " + currentItemName + "<br>";

        //         // Pack the item (call the function)
        //         putInBox(valueRecirc, packingItem.recirc, "packingItem.recirc", totalValueRecirc, "Recirc Pump Switch");

        //         // Reset nextBox back to accessory box for other items
        //         nextBox = "Accessory Box (13x10x5)";
        //         nextBoxValue = packingItem.boxAccessories;
        //         nextBoxWeightSingle = packingItemWeight.boxAccessories;
        //     }
        // // Otherwise pack it as normal
        // else {
        // Pack the item (call the function)
        putInBox(valueRecirc, packingItem.recirc, "packingItem.recirc", totalValueRecirc, "Recirc Pump Switch");
        // }
      }

      // -- Try packing Large PSU again (only works after first box is full)
      packLargePSU();

      // Pack  Four Hour Timer
      if (valueFourHour > 0) {
        //// Moved all this nextBox stuff to inside the putInBox function
        // // FUNCTION:  Puts the Recirc or Four hour timer into its own box if this is the only overflow item
        // if ((valueRecirc == 0 && valueFourHour == 1) && (totalValueCurrent == packingItem.fourHour) && (boxValueLeft < packingItem.fourHour)) {
        //     nextBox = "Recirc/Four Hour Box (9x4x3)";
        //     nextBoxValue = packingItem.boxRecirc;
        //     nextBoxWeightSingle = packingItemWeight.boxRecirc;

        //     // Basically copied the ELSE statement from the function about to be called,
        //     // to make sure it changes boxes to Medium Shipper before packaging an Insulated Pouch
        //     // since that's apparently the only box it fits in.
        //     // But removed the parts about packing an item. (just showing the new box title)

        //     // Show weight (before new box)
        //     // Add the box/packaging weight to the total
        //     weightCurrentBox += boxWeightSingle;
        //     weightTotal += boxWeightSingle;
        //     outputString += " <div class='weightCurrentBox text-muted'><i> &nbsp;  &nbsp;  &nbsp;  &nbsp; (approximate box weight: " + parseFloat((weightCurrentBox).toFixed(2)) + " lbs)</i><br></div>";
        //     // Reset box weight
        //     weightCurrentBox = 0;
        //     // DEBUGGING to show info every time a single item is packed (1 line)
        //     if (valueDebug >= 1) {
        //         outputString = outputString + "<br> DEBUGGING INFO: weight4  else (newbox) totalValueCurrent = " + totalValueCurrent + ".  boxValueLeft = " + boxValueLeft + ". weightCurrentBox = " + weightCurrentBox + ". weightSingleCurrentItem = " + weightSingleCurrentItem + "<br>";
        //     }

        //     // Change current box to next box
        //     boxValue = nextBoxValue;
        //     // Change current box packaging weight to next box packaging weight
        //     boxWeightSingle = nextBoxWeightSingle;
        //     // Resets the space remaining in the box to the full total of the new empty box
        //     boxValueLeft = boxValue;
        //     // Add 1 to the boxTotal and boxNumber
        //     boxNumber++;
        //     boxTotal++;
        //     // Add item to string to be displayed at the end for what to pack
        //     // If there's an SO#, add it to the top of the page for each box
        //     if (valueSoNum > 0) {
        //         outputString = outputString + "<br><div class='newBoxBefore1'>&nbsp;</div><div class='newBoxBefore2'>&nbsp;</div><div class='newBox'><div class='soBox text-end'><i>SO# " + valueSoNum + "</i></div><b>" + nextBox + "</b><i>&nbsp; [Box " + boxNumber + "<span class='boxTotal'>boxTotal</span>" + "]: </i></div>";
        //     }
        //     else {
        //         outputString = outputString + "<br><div class='newBoxBefore1'>&nbsp;</div><div class='newBoxBefore2'>&nbsp;</div><div class='newBox'><b>" + nextBox + "</b><i>&nbsp; [Box " + boxNumber + "<span class='boxTotal'>boxTotal</span>" + "]: </i></div>";
        //     }
        //     // outputString = outputString + "• " + currentItemCountInBoxOfCurrentItem + " " + currentItemName + "<br>";

        //     // Pack the item (call the function)
        //     putInBox(valueFourHour, packingItem.fourHour, "packingItem.fourHour", totalValueFourHour, "Four Hour Timer");

        //     // Reset nextBox back to accessory box for other items
        //     nextBox = "Accessory Box (13x10x5)";
        //     nextBoxValue = packingItem.boxAccessories;
        // }
        // // Otherwise pack it as normal
        // else {
        // Pack the item (call the function)
        putInBox(valueFourHour, packingItem.fourHour, "packingItem.fourHour", totalValueFourHour, "Four Hour Timer");
        // }
      }

      // -- Try packing Large PSU again (only works after first box is full)
      packLargePSU();

      // Pack  Junction Box
      if (valueJuncBox > 0) {
        //// Moved all this nextBox stuff to inside the putInBox function

        // // Large Accessory Box (14x14x14) = 48 (Use only if EJB is included or if Point total is greater than or equal to 49) -Bryce
        // // Might need to reset it back to accessory box afterward
        // nextBox = "Large Accessory Box (14x14x14)";
        // nextBoxValue = packingItem.box14x14;
        // nextBoxWeightSingle = packingItemWeight.box14x14;

        // Pack the item (call the function)
        putInBox(valueJuncBox, packingItem.juncBox, "packingItem.juncBox", totalValueJuncBox, "Junction Box");

        // Reset nextBox back to accessory box for other items
        nextBox = "Accessory Box (13x10x5)";
        nextBoxValue = packingItem.boxAccessories;
        nextBoxWeightSingle = packingItemWeight.boxAccessories;
      }

      // -- Try packing Large PSU again (only works after first box is full)
      packLargePSU();

      // Pack  Insulated Pouch
      if (valueInsulPouch > 0) {
        // HISTORY: Moved all this nextBox stuff to inside the putInBox function, then moved back since it was packing insulPouch with juncBox (needs to force separate box.)
        // Just hide all this nextBox stuff if you want to fit insulPouch in other boxes it will fit in

        // Medium Shipper (20x12x8) = 6 (Used for 2" systems or Insulated Pouch only) -Bryce
        // NOTE:  Insulated Pouch will always only fit into the medium shipper. -Bryce
        nextBox = "Medium Shipper (20x12x8)";
        nextBoxValue = packingItem.boxLdsMedium;
        nextBoxWeightSingle = packingItemWeight.boxLdsMedium;

        // Basically copied the ELSE statement from the function about to be called,
        // to make sure it changes boxes to Medium Shipper before packaging an Insulated Pouch
        // since that's apparently the only box it fits in.
        // But removed the parts about packing an item. (just showing the new box title)

        // Show box weight if items are all packed before moving on to the next items
        // TODO: Fix this box showing even if empty (even if i hide this weight output, it's still showing box 2 for the next box shown)
        // Show weight (before new box)
        // If nothing has been packed yet, don't show info for an empty accessory box first
        if (itemsTotalLeft == valueTotal) {
          // Don't show the weight (if nothing has been packed yet)
        } else {
          // Add the box/packaging weight to the total
          weightCurrentBox += boxWeightSingle;
          weightTotal += boxWeightSingle;
          outputString +=
            " <div class='weightCurrentBox text-muted'><i> &nbsp;  &nbsp;  &nbsp;  &nbsp; (approximate box weight: " +
            parseFloat(weightCurrentBox.toFixed(0)) +
            " lbs)</i><br></div>";
          // Reset box weight (TODO: Is this needed here or in the putinbox function? it's not there)
          weightCurrentBox = 0;
          // DEBUGGING to show info every time a single item is packed (1 line)
          if (valueDebug >= 1) {
            outputString =
              outputString +
              "<br> DEBUGGING INFO: weight4  else (newbox) totalValueCurrent = " +
              totalValueCurrent +
              ".  boxValueLeft = " +
              boxValueLeft +
              ". weightCurrentBox = " +
              weightCurrentBox +
              ". weightSingleCurrentItem = " +
              weightSingleCurrentItem +
              "<br>";
          }
        }

        // Copied from nextBox function, after the line:  //// END NEXTBOX EXCEPTIONS
        // If nothing has been packed yet, don't increase the box number (for an empty accessory box)
        // (Must have this statement above the  itemsTotalLeft--;  line below)
        if (itemsTotalLeft == valueTotal) {
          // Don't increase the box number (if nothing has been packed yet)
        } else {
          // Add 1 to the boxTotal and boxNumber
          boxNumber++;
          boxTotal++;
        }
        // Change current box to whatever box is next (like accessory box or 14x14)
        boxValue = nextBoxValue;
        // Change current box packaging weight to next box packaging weight
        boxWeightSingle = nextBoxWeightSingle;
        // Resets the space remaining in the box to the full total of the new empty box
        boxValueLeft = boxValue;
        // NOTE:  Do not include this, since it seems to be running properly during the putInBox function called below
        // Reduce number of all combined items to see if you have any leftovers at the very end that never got packed
        //itemsTotalLeft--;

        // Add box name to string to be displayed at the end
        // If there's an SO#, add it to the top of the page for each box
        // NOTE:  Added newBoxBefore1 and newBoxBefore2 to fix html2pdf inserting the page break in wrong location (issue with nested divs)
        if (valueSoNum > 0) {
          outputString =
            outputString +
            "<br><div class='newBoxBefore1'>&nbsp;</div><div class='newBoxBefore2'>&nbsp;</div><div class='newBox'><div class='soBox text-end'><i>SO# " +
            valueSoNum +
            "</i></div><b>" +
            nextBox +
            "</b><i>&nbsp; [Box " +
            boxNumber +
            "<span class='boxTotal'>boxTotal</span>" +
            "]: </i></div>";
        } else {
          outputString =
            outputString +
            "<br><div class='newBoxBefore1'>&nbsp;</div><div class='newBoxBefore2'>&nbsp;</div><div class='newBox'><b>" +
            nextBox +
            "</b><i>&nbsp; [Box " +
            boxNumber +
            "<span class='boxTotal'>boxTotal</span>" +
            "]: </i></div>";
        }
        // outputString = outputString + "• " + currentItemCountInBoxOfCurrentItem + " " + currentItemName + "<br>";

        // Pack the item (call the function)
        putInBox(valueInsulPouch, packingItem.insulPouch, "packingItem.insulPouch", totalValueInsulPouch, "Insulated Pouch");

        // Reset nextBox back to accessory box for other items
        nextBox = "Accessory Box (13x10x5)";
        nextBoxValue = packingItem.boxAccessories;
        nextBoxWeightSingle = packingItemWeight.boxAccessories;
      }

      // -- Try packing Large PSU again (only works after first box is full)
      packLargePSU();
    }
    // END PACK ALL ITEMS FUNCTION

    if (itemsTotalLeft > 0) {
      // Add item to string to be displayed at the end for what to pack
      outputString =
        outputString +
        "<br> <b><span style='color:red;'>WARNING: </span>Hmm there seems to be something left over.</b> Did I forget something in my calculations?<br> Contact jake and tell him you'll give him an ice cream if he fixes it.<br> DEBUGGING INFO (for leftovers): totalValueTotal = " +
        totalValueTotal +
        ". itemsTotalLeft = " +
        itemsTotalLeft;
    }

    // For debugging (level 1)
    // TODO:  Maybe add level 1 and level 2 debugging levels, for basic info like these 2 lines, versus a line after each and every item is packed
    if (valueDebug == 1) {
      outputString = outputString + "<br><br> DEBUGGING INFO: last boxValue = " + boxValue + ".  boxValueLeft = " + boxValueLeft;
      outputString = outputString + "<br> DEBUGGING INFO: totalValueTotal = " + totalValueTotal + ".  itemsTotalLeft = " + itemsTotalLeft;
    }

    return outputString;
  }
  // End function buildOutputString
  //  (with sub function putInBox)

  // FORM VALIDATION

  // I don't think this is called specifically from pressing submit, but it just calls itself within a larger function called upon submit
  // This runs after the output string is built (from the conditions above calling the  buildOutputString  function)
  // TODO: May wanna move this above the conditions above that call the  buildOutputString  function
  // (would have to rewrite a bit to call the conditions above instead of calling the  resultsOutput  function)
  formValidation();

  function formValidation() {
    // FUNCTION:  Show warning that B3 isn't done, if selected (upon submit)
    alertUnfinishedFeature1();

    function alertUnfinishedFeature1() {
      var elementSelectSplitSystem = document.getElementById("selectSplitSystem");
      if (selectSplitSystem.value == 3 && checkSplitSystemChecked) {
        window.alert("Rules for B3 systems are tentative and averages. \nAsk the warehouse for confirmation of results.");
      }
    }

    // Form validation for number of POLDs
    // Only validate the number of polds if you're dealing with leak rope, otherwise it's fine
    if (valueLeakRopeCheck == 1) {
      var totalPoldInputCalculated = valuePoldPin + valuePoldLeakRope2ft + valuePoldLeakRope5ft + valuePoldLeakRope10ft;
      if (valuePold == totalPoldInputCalculated) {
        // Leak rope validation passed, so go to the next validation function
        // window.alert("You chose wisely.\nvaluePold, totalPoldInputCalculated\n" + valuePold + ", " + totalPoldInputCalculated);
        formValidation2();
      } else {
        // Form validation failed, so it doesn't go to the next form validation function
        window.alert("POLD values are incorrect. \n\nMake sure the number of POLDs (with pins) plus the number of POLDs (with leak rope) equals the total number of POLDs.");
        //\nvaluePold, totalPoldInputCalculated\n" + valuePold + ", " + totalPoldInputCalculated
      }
    }
    // If valueLeakRopeCheck == 0 (no leak rope)
    else {
      // No POLD form validation needed, so go to the next function
      formValidation2();
    }

    // Form validation for number of SSRs
    function formValidation2() {
      // Only validate the number of SSRs if you have more than 0
      if (valueSsr > 0) {
        // If amount of SSR is even
        if (valueSsr % 2 == 0) {
          // window.alert("Nice");
          resultsOutput();
        }
        // If amount of SSR is odd
        else {
          // FUNCTION:  Shows an Ok/Cancel popup
          // SOURCE:  https://stackoverflow.com/a/9334679
          var answer = window.confirm("Alert:\nSolid State Relays (SSR) are typically sent in groups of 2.\nAre you sure you want to send an odd number of SSR?");
          // If they click Ok
          if (answer) {
            resultsOutput();
          }
          // If they click Cancel
          else {
            // Nothing happens. Doesn't continue to resultsOutput()
          }
        }
      }
      // If valueSsr == 0 (no ssr)
      else {
        // No ssr form validation needed, so go to the next function
        resultsOutput();
      }
    }
  }
  // End function formValidation

  ///////////////////////////
  // FINAL COMMAND THAT RUNS:
  ///////////////////////////

  // FUNCTION:  List all items & boxes they go in (outputStringFunc is the return string value from calling buildOutputString function below, from above)
  // This runs after the output string is built (from the  formValidation  conditions above calling the  buildOutputString  function)
  // HISTORY:  Old method was to show an alert. I'm now showing a full page printable list.
  function resultsOutput() {
    // FUNCTION:  Hide saveButton/printButton if less than 2 boxes (only show if more than 1 box)
    // If boxes < 2 hide print button, or if boxes >= 2 show print button
    var idPrintButton = document.getElementById("printButton");
    var idSaveButton = document.getElementById("saveButton");
    // DEBUGGING: Use this line to always show the save/print buttons during testing
    // if (boxTotal < 0) {
    // Actual line to use in production
    if (boxTotal < 2) {
      idPrintButton.style.display = "none";
      // window.alert("boxTotal < 2  " + idPrintButton.value);
      idSaveButton.style.display = "none";
    } else if (boxTotal >= 2) {
      idPrintButton.style.display = "block";
      // window.alert("boxTotal >= 2  " + idPrintButton.value);
      idSaveButton.style.display = "block";
    }

    // FUNCTION:  Hide form
    var elementToToggle = document.getElementById("mainForm");
    elementToToggle.style.display = "none";

    // FUNCTION:  Hide pageTitle
    var elementToToggle = document.getElementById("pageTitle");
    elementToToggle.style.display = "none";

    // FUNCTION:  Show results div
    var elementToToggle = document.getElementById("resultsBoxContainer");
    elementToToggle.style.display = "block";

    // FUNCTION:  Show text output in results div
    // TIP:  Add <pre> HTML tag to maintain line breaks ("preformatted text")
    // TIP:  You could also replace the \n with <br> if you want HTML formatted line breaks
    // TODO:  Change from <pre> text to something better (can't really format it)
    //var outputStringFuncParsed = JSON.parse(outputStringFunc);
    //document.getElementById("resultsBox").innerHTML = outputStringFuncParsed;
    // With <pre> tag surrounding it
    //document.getElementById("resultsBox").innerHTML = "<pre>" + outputStringFunc + "</pre>";
    // With <p> tag surrounding it
    //document.getElementById("resultsBox").innerHTML = "<p>" + outputStringFunc + "</p>";
    // WIth no tag surrounding it (besides the one already there in the html up at the top)
    document.getElementById("resultsBox").innerHTML = outputStringFunc;

    // FUNCTION:  Replace the innerhtml of boxTotal class spans with the actual boxTotal
    // Otherwise the boxTotal would be increasing every time I output a line to the OutputString i'm building (and not be accurate),
    // so i output a placeholder first, in a boxTotal div, then at the end, replace the contents of those divs with the actual final boxTotal value
    // SOURCE:  https://stackoverflow.com/a/7409497/1263035  (modified a bit to remove ids)
    var divs = document.getElementsByClassName("boxTotal");
    [].slice.call(divs).forEach(function (div) {
      div.innerHTML = " of " + boxTotal;
    });

    // Using innerHTML with querySelectorAll (possible alternative method, not using or tried because I saw no point)
    // SOURCE:  https://stackoverflow.com/a/27983501/1263035
    // var x = document.querySelectorAll(".boxTotal");
    // var i;
    // for (i = 0; i < x.length; i++) {
    //     x[i].innerHTML = "";
    // }

    // Scroll results window back to top (for if there's lots of boxes)
    window.scrollTo(0, 0);
  }
  // End function resultsOutput
}
// End function functionOnSubmit

/// SAVE/PRINT BUTTON (using addEventListener instead of onclick)
// FUNCTION: Add variable for which button was clicked (can't easily pass argument with addEventListener)
var whichButtonClicked;
document.getElementById("saveButton").addEventListener("click", saveButtonClicked);
document.getElementById("printButton").addEventListener("click", printButtonClicked);

function saveButtonClicked() {
  whichButtonClicked = "save";
}

function printButtonClicked() {
  whichButtonClicked = "print";
}

// FUNCTION: Form validation for SO# (if printing more than 1 box)
// Only when clicking save/print
document.getElementById("saveButton").addEventListener("click", functionOnPrint);
document.getElementById("printButton").addEventListener("click", functionOnPrint);

function functionOnPrint() {
  // var value2SoNum = Number(document.getElementById("inputSoNum").value);

  var idSoNum = document.getElementById("inputSoNum");
  // Variable called value2SoNum to avoid conflict with valueSoNum in the onsubmit function (which isn't accessible here, and putting the variable outside the function might return the value before it's entered...)
  var value2SoNum = Number(idSoNum.value);
  // Only validate if a SO# is present if you have more than 1 box
  if (boxTotal >= 2) {
    // If SO# has a value
    if (value2SoNum > 0) {
      // window.alert("Nice. \n value2SoNum = " + value2SoNum);

      // FUNCTION: IF statements to decide whether to print or save
      if (whichButtonClicked == "print") {
        window.print();
      } else if (whichButtonClicked == "save") {
        html2pdfAndPrintCss();
      } else {
        window.alert("ERROR: It appears the save or print button was clicked but the whichButtonClicked variable is not either of those options.");
      }
    }
    // If SO# doesn't have a value
    else {
      // window.alert("boo. \n value2SoNum = " + value2SoNum);

      // FUNCTION:  Shows an Ok/Cancel popup
      // SOURCE:  https://stackoverflow.com/a/9334679
      var answer = window.confirm("ALERT:\nSO# is required when printing labels with more than 1 box.\n\nPlease click Ok then enter Sales Order Number (SO#)");
      // If they click Ok
      if (answer) {
        // Go back to form
        showMainPage();
      }
      // If they click Cancel
      else {
        // Otherwise just continue to printing)

        // FUNCTION: IF statements to decide whether to print or save
        if (whichButtonClicked == "print") {
          window.print();
        } else if (whichButtonClicked == "save") {
          html2pdfAndPrintCss();
        } else {
          window.alert("ERROR: It appears the save or print button was clicked but the whichButtonClicked variable is not either of those options.");
        }
      }
    }
  }
  // If not more than 1 box
  else {
    // No SO# needed, so proceed

    // FUNCTION: IF statements to decide whether to print or save
    if (whichButtonClicked == "print") {
      window.print();
    } else if (whichButtonClicked == "save") {
      html2pdfAndPrintCss();
    } else {
      window.alert("ERROR: It appears the save or print button was clicked but the whichButtonClicked variable is not either of those options.");
    }
  }
}
