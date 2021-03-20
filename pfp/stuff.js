            // Change checkbox values from On/NaN to 1 or 0
            // SOURCE:  https://stackoverflow.com/questions/18295811/checkbox-value-0-or-1
            // SOURCE:  https://stackoverflow.com/a/63962842
            document.addEventListener('DOMContentLoaded', e => {
                for (let checkbox of document.querySelectorAll('input[type=checkbox]')) {
                    checkbox.value = checkbox.checked ? 1 : 0;
                    checkbox.addEventListener('change', e => {
                        e.target.value = e.target.checked ? 1 : 0;
                    });
                }
            });




            // FUNCTION:  Hide and show the correct sections from the top buttons (LDS, POLD-Only, Accessories)
            // HISTORY:  Had to abandon bootstrap .collapse method and just hide all then show what i want (so it wouldn't toggle things incorrectly)
            // TIP: Can replace  (document.querySelectorAll('.groupLds'))  with  (document.querySelectorAll(`.${groupClass}`))  
            //      '.groupLds'  to  `.${groupClass}`  (a literal) to insert variable groupClass with string . (period) in front of it (or any other string)
            function collapseGroup(groupClass) {
                // Hide everything first
                elements = document.getElementsByClassName("groupWizard1");
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = elements[i].style.display = 'none';
                }
                // Show what you want
                elements = document.getElementsByClassName(`${groupClass}`);
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = elements[i].style.display = '';
                }
            }




            // Show extra POLD section if POLDs are present
            // TODO:  Hide section if POLDs goes back to 0
            // SAMPLE:  https://www.w3schools.com/jsref/event_oninput.asp
            // SAMPLE:  https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_oninput_dom
            document.getElementById("inputPold").oninput = function () { showPoldExtra() };
            function showPoldExtra() {
                var elementPold = document.getElementById("expandPold");
                elementPold.style.display = "block";
            }



            // Set SCV = 1 if an LDS is selected
            // TODO:  Maybe change  var elementId  to a unique var
            // HISTORY:  Changed to  addEventListener  so it could run two functions from one  onchange
            // SAMPLE:  https://www.w3schools.com/jsref/event_onchange.asp
            document.getElementById("selectLds").addEventListener("change", setScv);
            //document.getElementById("selectLds").onchange = function () { setScv() };
            function setScv() {
                var valueLds = document.getElementById("selectLds");
                if (valueLds.value > 0) {
                    var elementId = document.getElementById("inputScv");
                    elementId.value = "1";
                }
                else if (valueLds.value == 0) {
                    var elementId = document.getElementById("inputScv");
                    elementId.value = "0";
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
                if (valueLds.value > 0) {
                    var elementId = document.getElementById("inputCp");
                    elementId.value = "1";
                }
                else if (valueLds.value == 0) {
                    var elementId = document.getElementById("inputCp");
                    elementId.value = "0";
                }
            }


            // Set LDS = 0 if POLD-Only is selected
            // TODO:  Maybe change  var elementId  to a unique var
            // SAMPLE:  https://www.w3schools.com/jsref/event_onchange.asp
            function setLds(ldsValueToSet) {
                var elementId = document.getElementById("selectLds");
                elementId.value = ldsValueToSet;
                // Set SCV value to 0 as well (the function will choose 0 when it evaluates that LDS is zero)
                setScv();
                setCp();
            }







            //  START BOX CALCULATIONS (FROM FORMS)

            // FUNCTION:  Define Object list + values  (for determining what boxes they fit in)
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

                scv: 0,
                ssr: 0,
                pam1: 0,
                cp: 1,
                api: 3,
                pold: 1,
                recirc: 6,
                fourHour: 6,

                juncBox: 36,
                insulPouch: 6,  // Defaults to an additional Medium Shipper
                leakRope2ft: 0.5,
                leakRope5ft: 1,
                leakRope10ft: 1,
                hiddenWire: 4.5,


                //BOXES
                // Shipper(19x12x7) = 12 (For .75-1.5" systems only)
                boxLds: 12,
                // Medium Shipper(20x12x8) = 6 (Used for 2" systems or Insulated Pouch only)
                boxLdsMedium: 6,
                // 18x18x14 = 18 (Used only for 2.5" and 3" systems)
                boxLdsLarge: 18,

                // Panel Box(10x7x3) = 6
                boxCp: 6,
                // 14x14x14 = 48 (Use only if EJB is included or if Point total is greater than or equal to 49)
                box14x14: 48,
                // Recirc/4 hr Box(9x4x3) = 6 (Only to be used for single Recircp Pump Switch or 4hr Timer)
                boxRecirc: 6,
                // Accessory Box(13x10x5) = 12
                boxAccessories: 12,
                // Mailer(11x9x1) = 2.5 (Use for shippments of accesory only)
                bubbleMailer: 2.5,
            };
            /* 
                    Order of Priority:
Panel, SCV, Hidden Wire and Pam1 always in Box 1
1. API
2. POLD
3. Recirc Pump Switch
4. 4hr Time
5. Enclosures (Pouch + EJB)
Solid State Relays included with box carrying most POLDs
*/

            //  window.alert("yo boxLdsMedium = " + packingItem.boxLdsMedium);





            /// GET FORM VALUES
            /// FUNCTION:  Store form values in variables (to use for calculations)
            /// TODO:  Convert to array or object, to sum total easier

            /// SUBMIT BUTTON (using addEventListener instead of onclick)
            document.getElementById("finalSubmitButton").addEventListener("click", function () {
                // document.getElementById("demo").innerHTML = "Hello World";
                // window.alert("finalSubmitButton was pressed");


                /// ITEMS  (values entered by user)
                /// Don't add lds to value total
                /// TIP:  To always show 2 decimel places:  Number(x).toFixed(2);
                /// REFERENCE:  https://stackoverflow.com/a/13292833
                var valueLds = Number(document.getElementById("selectLds").value).toFixed(2);
                ///window.alert("yo valueLds = " + valueLds);

                // Add this group to value total
                // TIP:  Use parseInt() or parseFloat() or Number() since it thinks these are strings and not adding properly (Number() does floats too [numbers with decimels])
                // REFERENCE:  https://stackoverflow.com/q/4564158
                var valueScv = Number(document.getElementById("inputScv").value);
                // window.alert("yo valueScv = " + valueScv);
                var valueCp = Number(document.getElementById("inputCp").value);
                var valuePold = Number(document.getElementById("inputPold").value);
                var valueLeakRope2ft = Number(document.getElementById("inputLeakRope2ft").value);
                var valueLeakRope5ft = Number(document.getElementById("inputLeakRope5ft").value);
                var valueLeakRope10ft = Number(document.getElementById("inputLeakRope10ft").value);
                var valueApi = Number(document.getElementById("inputApi").value);
                var valueRecirc = Number(document.getElementById("inputRecirc").value);
                var valueFourHour = Number(document.getElementById("inputFourHour").value);
                var valueSsr = Number(document.getElementById("inputSsr").value);
                var valuePam1 = Number(document.getElementById("inputPam1").value);
                var valueJuncBox = Number(document.getElementById("inputJuncBox").value);
                var valueInsulPouch = Number(document.getElementById("inputInsulPouch").value);
                var valueHiddenWire = Number(document.getElementById("inputHiddenWire").value);

                // Don't add on/off to value total. Use this to trigger something else (undecided what)
                // Convert  On / Undefined  to  1 / 0  by wrapping in Number();
                var valueReplacement = Number(document.getElementById("checkReplacement").value);
                // window.alert("valueReplacement = " + valueReplacement);


                // TIP:  If nothing beyond here works, you have a typo or referenced the wrong ID above somewhere (idk why it doesn't error)

                // window.alert("yo boxLdsMedium3 = " + packingItem.boxLdsMedium);


                // FUNCTION:  Find the total items added into the form
                // Didn't include LDS because it's not a frequency but a size.
                var valueTotal = valueScv + valueCp + valuePold + valueLeakRope5ft + valueLeakRope10ft + valueApi + valueRecirc + valueFourHour + valueSsr + valueJuncBox + valueInsulPouch + valueHiddenWire;

                //window.alert("yo valueTotal (form input)= " + valueTotal);


                // FUNCTION:  Multiply the number of each item in the form with the value of the item, to find packing size value. (values for size/space)
                // Can break this out by lds size later if we want
                var totalValueLds = valueLds * packingItem.lds;
                var totalValueScv = valueScv * packingItem.scv;
                // window.alert("yo totalValueScv = " + totalValueScv);
                var totalValueCp = valueCp * packingItem.cp;
                var totalValuePold = valuePold * packingItem.pold;
                var totalValueLeakRope2ft = valueLeakRope2ft * packingItem.leakRope2ft;
                var totalValueLeakRope5ft = valueLeakRope5ft * packingItem.leakRope5ft;
                var totalValueLeakRope10ft = valueLeakRope10ft * packingItem.leakRope10ft;
                var totalValueApi = valueApi * packingItem.api;
                var totalValueRecirc = valueRecirc * packingItem.recirc;
                var totalValueFourHour = valueFourHour * packingItem.fourHour;
                var totalValueSsr = valueSsr * packingItem.ssr;
                var totalValuePam1 = valuePam1 * packingItem.pam1;
                var totalValueJuncBox = valueJuncBox * packingItem.juncBox;
                var totalValueInsulPouch = valueInsulPouch * packingItem.insulPouch;
                var totalValueHiddenWire = valueHiddenWire * packingItem.hiddenWire;


                // FUNCTION:  Find the total packing space required by adding all values of number of items multiplied by their space taken
                var totalValueTotal = totalValueLds + totalValueScv + totalValueCp + totalValuePold + totalValueLeakRope2ft + totalValueLeakRope5ft + totalValueLeakRope10ft + totalValueApi + totalValueRecirc + totalValueFourHour + totalValueSsr + totalValueJuncBox + totalValueInsulPouch + totalValueHiddenWire;


                //window.alert("yo totalValueTotal () = " + totalValueTotal);




                // TITLE:  Alert function
                // HISTORY:  Didn't work so I just used a hidden div and rewriting the innerHTML after form submit
                // TODO:  Get this custom alert function working so I can title the 'popup'
                // FUNCTION:  Create custom window.alert popup function so I can retitle it
                // SOURCE:  https://stackoverflow.com/a/13411862
                //window.alert = function(title, message){
                //    var myElementToShow = document.getElementById("someElementId");
                //    myElementToShow.innerHTML = title + "</br>" + message; 
                //}
                //// My rewrite attempt:
                //window.alert = function(message){
                //   var myElementToShow = document.getElementById("resultsBox");
                //  myElementToShow.innerHTML = message; 
                // }




                /*                Order of Priority:
                Panel, SCV, Hidden Wire and Pam1 always in Box 1
                1. API
                2. POLD
                3. Recirc Pump Switch
                4. 4hr Time
                5. Enclosures (Pouch + EJB)
                Solid State Relays included with box carrying most POLDs
                */









                // FUNCTION:  Start with LDS size to determine which primary box to start with
                // Shipper(19x12x7)  (For .75-1.5" systems only) -Bryce
                // TODO:  Maybe shorthand the code like this, if it works:  if valueLds <= 1.5 && > 0
                // TODO:  Export text file (node.js?) (do browsers even allow it?) then display that text in browser or print file
                if (valueLds > 0 && valueLds <= 1.5) {

                    // FUNCTION:  Call function to build list of all items and what boxes they go in (displayed later through alert)
                    // Pass the box name as a function argument (list of items is returned, and stored as the variable)
                    var outputStringFunc = buildOutputString("Shipper", packingItem.boxLds);

                    //window.alert("you need a standard shipper box yo (19x12x7).\n totalValueTotal = " + totalValueTotal);
                }
                // Medium Shipper(20x12x8)  (Used for 2" systems or Insulated Pouch only) -Bryce
                else if (valueLds == 2 || valueInsulPouch > 0) {
                    // FUNCTION:  Call function to build list of all items and what boxes they go in (displayed later through alert)
                    var outputStringFunc = buildOutputString("Medium Shipper (20x12x8)", packingItem.boxLdsMedium);

                }
                // 18x18x14 = 18 (Used only for 2.5" and 3" systems) -Bryce
                else if (valueLds == 2.5 || valueLds == 3) {
                    // FUNCTION:  Call function to build list of all items and what boxes they go in (displayed later through alert)
                    var outputStringFunc = buildOutputString("18x18x14", packingItem.boxLdsLarge);

                }

                // FUNCTION:  If LDS is 0 (POLD-Only).
                // QUESTION:  Is the normal shipper the default box for POLD-Only? Or is it 14x14 or something? (Change/define here)
                // TODO:  Maybe add:  || valueLds == '' || valueLds == 'undefined'
                else if (valueLds == 0) {
                    //window.alert("POLD-Only system\n valueLds = " + valueLds);
                    // FUNCTION:  Call function to build list of all items and what boxes they go in (displayed later through alert)
                    var outputStringFunc = buildOutputString("-- POLD System --\n\nAccessory Box (13x10x5)", packingItem.boxAccessories);
                }
                else {
                    window.alert("yo something is wrong with the LDS value.\n valueLds = " + valueLds);
                    // FUNCTION:  Call function to build list of all items and what boxes they go in (displayed later through alert)
                    var outputStringFunc = buildOutputString("Accessory Box (13x10x5)", packingItem.boxAccessories);
                }







                ///////////////////////////
                // FINAL COMMAND THAT RUNS:
                ///////////////////////////

                // FUNCTION:  List all items & boxes they go in (outputStringFunc is the return string value from calling buildOutputString function below, from above)
                // HISTORY:  Old method was to show an alert. I'm now showing a full page printable list.
                //window.alert(outputStringFunc);

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
                document.getElementById("resultsBox").innerHTML = "<pre>" + outputStringFunc + "</pre>";

















                // FUNCTION:  Function to build list of items to pack, and show in a popup (to use in each LDS size condition below)
                // NOT THE FINAL THING THAT RUNS
                function buildOutputString(initialBox, boxValue) {

                    // DEBUGGING
                    window.alert("function buildOutputString(initialBox, boxValue) {   boxValue\n" + " " + boxValue);

                    //var boxValue = boxValue;
                    // DEBUGGING
                    //window.alert("var boxValue = boxValue;   boxValue\n" + " " + boxValue);

                    
                    // FUNCTION:  List all items and what boxes they go in
                    // TODO:  Change valueLds to number/amount of LDS entered, then add valueLdsSize for each valve size?
                    var outputString = initialBox + " Box: \n";

                    // Add "Replacement" header if checkbox is checked
                    if (valueReplacement > 0) {
                        var outputString = "-- Replacement --\n\n" + initialBox + " Box: \n";
                        // window.alert("valueReplacement = " + valueReplacement);
                    }
                    else {
                        var outputString = initialBox + " Box: \n";
                        // window.alert("valueReplacement = " + valueReplacement);
                    }
                    // window.alert("valueReplacement = " + valueReplacement);


                    // It didn't work to access & modify this variable if it was declared outside the function, so I declared it inside
                    var totalValueCurrent = totalValueTotal;
                    // Initialze a variable to track how much space is left in each box, so once it hits a low number, it moves on to next box
                    var boxValueLeft = boxValue;
                    // window.alert("totalValueTotal = " + totalValueTotal);
                    // window.alert("totalValueCurrent = " + totalValueCurrent);
                    // window.alert("valueLds = " + valueLds);

                    // Add this line to add a breakpoint
                    //debugger

                    // Currently just hard defining this group of items as always going in the first box (not checking if they fit) (according to Bryce rules)
                    // TODO:  Maybe change this group into a loop/function since it's basically repeated code (just assign a variable for which current item it's evaluating)
                    if (valueLds > 0) {
                        // Add item to string to be displayed at the end for what to pack
                        var outputString = outputString + "• LDS (" + valueLds + "\") \n";
                        // Don't subtract LDS value as of now, since it's actually the pipe size and not space taken, plus it equals 0 anyway. 
                        // (We have cases to define which box each LDS size goes in anyway)
                    }
                    if (valueCp > 0) {
                        // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                        var totalValueCurrent = totalValueCurrent - totalValueCp;
                        var boxValueLeft = boxValueLeft - totalValueCp;
                        // Add item to string to be displayed at the end for what to pack
                        var outputString = outputString + "• " + valueCp + " Control Panel\n";
                    }
                    if (valueScv > 0) {
                        // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                        var totalValueCurrent = totalValueCurrent - totalValueScv;
                        var boxValueLeft = boxValueLeft - totalValueScv;
                        // Add item to string to be displayed at the end for what to pack
                        var outputString = outputString + "• " + valueScv + " Spring Check Valve (SCV)\n";
                    }
                    if (valueHiddenWire > 0) {
                        // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                        var totalValueCurrent = totalValueCurrent - totalValueHiddenWire;
                        var boxValueLeft = boxValueLeft - totalValueHiddenWire;
                        // Add item to string to be displayed at the end for what to pack
                        var outputString = outputString + "• " + valueHiddenWire + " Hidden Wire\n";
                    }
                    if (valuePam1 > 0) {
                        // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                        var totalValueCurrent = totalValueCurrent - totalValuePam1;
                        var boxValueLeft = boxValueLeft - totalValuePam1;
                        // Add item to string to be displayed at the end for what to pack
                        var outputString = outputString + "• " + valuePam1 + " PAM-1 Relay\n";
                    }
                    // All items above always go into box 1 (according to Bryce)




                    // The following items will fit in current box or create a new box (accessories box is default extra)
                    // Define the accessory box as the next box to overlow items into, unless there's a junction box or total >= 49
                    var nextBox = "Accessory Box (13x10x5)";
                    var nextBoxValue = packingItem.boxAccessories;

                    // 14x14x14 = 48 (Use only if EJB is included or if point total is greater than or equal to 49) -Bryce
                    // This is the overflow box and not the primary box
                    if (totalValueTotal >= 49 || valueJuncBox > 0) {
                        var nextBox = "14x14x14";
                        var nextBoxValue = packingItem.box14x14;
                    }
                    // The four hour timer box is only used if a single timer or recirc switch is sent, or it's the only overflow item,
                    // but if both are sent, then they'll be in an accessory box like any other scenario
                    // TODO:  Make case for determining if this is the only overflow item
                    if ((valueFourHour == 1 || valueRecirc == 1) && (totalValueTotal == 6)) {
                        var nextBox = "Recirc/Four Hour Box (9x4x3)";
                        var nextBoxValue = packingItem.boxRecirc;
                    }


                    // API v1
                     if (valueApi > 0) {
                        if (totalValueApi <= boxValueLeft) {
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueApi;
                            var boxValueLeft = boxValueLeft - totalValueApi;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "• " + valueApi + " API\n";
                        }
                        else {
                            // Change current box to accessory box (or whatever box is next, like 14x14)
                            // DEBUGGING (1 line)
                            var outputString = outputString + "\n DEBUGGING INFO: last boxValue = " + boxValue + ".  boxValueLeft = " + boxValueLeft + "\n";
                            boxValue = nextBoxValue;
                            var boxValueLeft = boxValue;
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueApi;
                            var boxValueLeft = boxValueLeft - totalValueApi;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "\n" + nextBox + ": \n";
                            var outputString = outputString + "• " + valueApi + " API\n";
                        }
                    }













                    ///////////////////////////////////////
                    // CURRENTLY WORKING ON   (variables are showing up as undefined, probably because they aren't global)
                    ///////////////////////////////////////



                    // API v2
                    putInBox(valueApi, packingItem.api, totalValueApi, "API");
                    //function putInBox(valueCurrentItem, spaceSingleCurrentItem, totalValueCurrentItem, currentItemName) {
                    function putInBox(valueApi, spaceSingleCurrentItem, totalValueApi, currentItemName) {

                    // DEBUGGING
                    window.alert("function putInBox(valueApi, spaceSingleCurrentItem, totalValueApi, currentItemName) {   boxValue\n" + " " + boxValue);

                    val
                    var boxValue = boxValue;
                    // DEBUGGING
                    window.alert("function putInBox(valueApi, spaceSingleCurrentItem, totalValueApi, currentItemName) {\n var boxValue = boxValue;   boxValue\n" + " " + boxValue);

                        // DEBUGGING
                        window.alert("function putInBox(   valueApi, spaceSingleCurrentItem, totalValueApi, currentItemName\n" + " " + valueApi + " " + spaceSingleCurrentItem + " " + totalValueApi + " " + currentItemName);
                        window.alert("function putInBox(   totalValueCurrent, boxValueLeft, nextBox, nextBoxValue\n" + " " + totalValueCurrent + " " + boxValueLeft + " " + nextBox + " " + nextBoxValue);

                        // VARIABLES DECLARED IN THE PARENT FUNCTION. REPEATING HERE FOR TESTING (could maybe reference them somehow if I make them global first)
                        // It didn't work to access & modify this variable if it was declared outside the function, so I declared it inside
                        var totalValueCurrent = totalValueTotal;
                        // Initialze a variable to track how much space is left in each box, so once it hits a low number, it moves on to next box
                        var boxValueLeft = boxValue;
                        // The following items will fit in current box or create a new box (accessories box is default extra)
                        // Define the accessory box as the next box to overlow items into, unless there's a junction box or total >= 49
                        var nextBox = "Accessory Box (13x10x5)";
                        var nextBoxValue = packingItem.boxAccessories;

                        if (valueApi > 0) {

                            // DEBUGGING
                            window.alert("if (valueApi > 0)   valueApi, spaceSingleCurrentItem, totalValueApi, currentItemName\n" + " " + valueApi + " " + spaceSingleCurrentItem + " " + totalValueApi + " " + currentItemName);
                            window.alert("if (valueApi > 0)   totalValueCurrent, boxValueLeft, nextBox, nextBoxValue\n" + " " + totalValueCurrent + " " + boxValueLeft + " " + nextBox + " " + nextBoxValue);
                            var loopCount = 0;
                            while (loopCount < 6) {
                                if (totalValueApi <= boxValueLeft) {
                                    // DEBUGGING
                                    window.alert("if (totalValueApi <= boxValueLeft)   valueApi, spaceSingleCurrentItem, totalValueApi, currentItemName\n" + " " + valueApi + " " + spaceSingleCurrentItem + " " + totalValueApi + " " + currentItemName);
                                    window.alert("if (totalValueApi <= boxValueLeft)   totalValueCurrent, boxValueLeft, nextBox, nextBoxValue\n" + " " + totalValueCurrent + " " + boxValueLeft + " " + nextBox + " " + nextBoxValue);
                                    // Subtract value from box  (Subtract item value as it's added to a box, to figure out if there's items/overflow value left over)
                                    var totalValueCurrent = totalValueCurrent - totalValueApi;
                                    var boxValueLeft = boxValueLeft - totalValueApi;
                                    // Put in box  (Add item to string to be displayed at the end for what to pack
                                    var outputString = outputString + "• " + valueApi + " API\n";
                                    break;
                                }
                                else {
                                    // Change current box to accessory box (or whatever box is next, like 14x14)
                                    // DEBUGGING (1 line)
                                    var outputString = outputString + "\n DEBUGGING INFO: last boxValue = " + boxValue + ".  boxValueLeft = " + boxValueLeft + "\n";
                                    var boxValue = nextBoxValue;
                                    var boxValueLeft = boxValue;
                                    var totalValueCurrent = totalValueCurrent - totalValueApi;
                                    var boxValueLeft = boxValueLeft - totalValueApi;
                                    // Add item to string to be displayed at the end for what to pack
                                    var outputString = outputString + "\n" + nextBox + ": \n";
                                    var outputString = outputString + "• " + valueApi + " API\n";

                                    loopCount++;
                                    // DEBUGGING
                                    window.alert("else {   valueApi, spaceSingleCurrentItem, totalValueApi, currentItemName\n" + " " + valueApi + " " + spaceSingleCurrentItem + " " + totalValueApi + " " + currentItemName);
                                    window.alert("else {   totalValueCurrent, boxValueLeft, nextBox, nextBoxValue\n" + " " + totalValueCurrent + " " + boxValueLeft + " " + nextBox + " " + nextBoxValue);
                                    if (loopCount == 6) {
                                        //window.alert("I can't fit " + itemName + " in any box, after trying " + loopCount + " times.");
                                        window.alert("I can't fit " + currentItemName + " in any box, after trying " + loopCount + " times.\nvalueApi, spaceSingleCurrentItem, totalValueApi, currentItemName\n" + " " + valueApi + " " + spaceSingleCurrentItem + " " + totalValueApi + " " + currentItemName);
                                        window.alert("totalValueCurrent, boxValueLeft, nextBox, nextBoxValue\n" + " " + totalValueCurrent + " " + boxValueLeft + " " + nextBox + " " + nextBoxValue);
                                        break;
                                    }
                                }
                            }
                        }
                    }








                    // POLD
                    // TODO:  POLDS are currently being assigned all to one box instead of separated. Might need to change that.
                    if (valuePold > 0) {
                        if (totalValuePold <= boxValueLeft) {
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValuePold;
                            var boxValueLeft = boxValueLeft - totalValuePold;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "• " + valuePold + " POLD\n";
                        }
                        else {
                            // Change current box to accessory box (or whatever box is next, like 14x14)
                            // DEBUGGING (1 line)
                            var outputString = outputString + "\n DEBUGGING INFO: last boxValue = " + boxValue + ".  boxValueLeft = " + boxValueLeft + "\n";
                            var boxValue = nextBoxValue;
                            var boxValueLeft = boxValue;
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValuePold;
                            var boxValueLeft = boxValueLeft - totalValuePold;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "\n" + nextBox + ": \n";
                            var outputString = outputString + "• " + valuePold + " POLD\n";
                        }
                    }
                    // Solid State Relay
                    // Just hard define in the same box the POLDs were just put in, don't worry about values, since they always fit.
                    // TODO:  Might need to change this to put SSR in box with the most POLDs.
                    if (valueSsr > 0) {
                        // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                        var totalValueCurrent = totalValueCurrent - totalValueSsr;
                        var boxValueLeft = boxValueLeft - totalValueSsr;
                        // Add item to string to be displayed at the end for what to pack
                        var outputString = outputString + "• " + valueSsr + " Solid State Relay\n";
                    }
                    // Leak Rope (2ft)
                    // TODO:  May need to change this to make POLDs with leak rope one item/value instead of separate
                    if (valueLeakRope2ft > 0) {
                        if (totalValueLeakRope2ft <= boxValueLeft) {
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueLeakRope2ft;
                            var boxValueLeft = boxValueLeft - totalValueLeakRope2ft;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "• " + valueLeakRope2ft + " Leak Rope (2ft)\n";
                        }
                        else {
                            // Change current box to accessory box (or whatever box is next, like 14x14)
                            // DEBUGGING (1 line)
                            var outputString = outputString + "\n DEBUGGING INFO: last boxValue = " + boxValue + ".  boxValueLeft = " + boxValueLeft + "\n";
                            var boxValue = nextBoxValue;
                            var boxValueLeft = boxValue;
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueLeakRope2ft;
                            var boxValueLeft = boxValueLeft - totalValueLeakRope2ft;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "\n" + nextBox + ": \n";
                            var outputString = outputString + "• " + valueLeakRope2ft + " Leak Rope (2ft)\n";
                        }
                    }
                    // Leak Rope (5ft)
                    // TODO:  May need to change this to make POLDs with leak rope one item/value instead of separate
                    if (valueLeakRope5ft > 0) {
                        if (totalValueLeakRope5ft <= boxValueLeft) {
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueLeakRope5ft;
                            var boxValueLeft = boxValueLeft - totalValueLeakRope5ft;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "• " + valueLeakRope5ft + " Leak Rope (5ft)\n";
                        }
                        else {
                            // Change current box to accessory box (or whatever box is next, like 14x14)
                            // DEBUGGING (1 line)
                            var outputString = outputString + "\n DEBUGGING INFO: last boxValue = " + boxValue + ".  boxValueLeft = " + boxValueLeft + "\n";
                            var boxValue = nextBoxValue;
                            var boxValueLeft = boxValue;
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueLeakRope5ft;
                            var boxValueLeft = boxValueLeft - totalValueLeakRope5ft;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "\n" + nextBox + ": \n";
                            var outputString = outputString + "• " + valueLeakRope5ft + " Leak Rope (5ft)\n";
                        }
                    }
                    // Leak Rope (5ft)
                    // TODO:  May need to change this to make POLDs with leak rope one item/value instead of separate
                    if (valueLeakRope10ft > 0) {
                        if (totalValueLeakRope10ft <= boxValueLeft) {
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueLeakRope10ft;
                            var boxValueLeft = boxValueLeft - totalValueLeakRope10ft;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "• " + valueLeakRope10ft + " Leak Rope (10ft)\n";
                        }
                        else {
                            // Change current box to accessory box (or whatever box is next, like 14x14)
                            // DEBUGGING (1 line)
                            var outputString = outputString + "\n DEBUGGING INFO: last boxValue = " + boxValue + ".  boxValueLeft = " + boxValueLeft + "\n";
                            var boxValue = nextBoxValue;
                            var boxValueLeft = boxValue;
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueLeakRope10ft;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "\n" + nextBox + ": \n";
                            var outputString = outputString + "• " + valueLeakRope10ft + " Leak Rope (10ft)\n";
                        }
                    }
                    // Recirc Pump Switch
                    // QUESTION:  Does this always go in a 4hrtimer box or does it go in standard boxes like Shipper or 14x14?
                    // Only goes in its own small box if its the only item, or only overflow item after shipper
                    if (valueRecirc > 0) {
                        if (totalValueRecirc <= boxValueLeft) {
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueRecirc;
                            var boxValueLeft = boxValueLeft - totalValueRecirc;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "• " + valueRecirc + " Recirc Pump Switch\n";
                        }
                        else {
                            // Change current box to accessory box (or whatever box is next, like 14x14)
                            // DEBUGGING (1 line)
                            var outputString = outputString + "\n DEBUGGING INFO: last boxValue = " + boxValue + ".  boxValueLeft = " + boxValueLeft + "\n";
                            var boxValue = nextBoxValue;
                            var boxValueLeft = boxValue;
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueRecirc;
                            var boxValueLeft = boxValueLeft - totalValueRecirc;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "\n" + nextBox + ": \n";
                            var outputString = outputString + "• " + valueRecirc + " Recirc Pump Switch\n";
                        }
                    }
                    // Four Hour Timer
                    // QUESTION:  Does this always go in a 4hrtimer box or does it go in standard boxes like Shipper or 14x14?
                    if (valueFourHour > 0) {
                        if (totalValueFourHour <= boxValueLeft) {
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueFourHour;
                            var boxValueLeft = boxValueLeft - totalValueFourHour;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "• " + valueFourHour + " Four Hour Timer\n";
                        }
                        else {
                            // Change current box to accessory box (or whatever box is next, like 14x14)
                            // DEBUGGING (1 line)
                            var outputString = outputString + "\n DEBUGGING INFO: last boxValue = " + boxValue + ".  boxValueLeft = " + boxValueLeft + "\n";
                            var boxValue = nextBoxValue;
                            var boxValueLeft = boxValue;
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueFourHour;
                            var boxValueLeft = boxValueLeft - totalValueFourHour;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "\n" + nextBox + ": \n";
                            var outputString = outputString + "• " + valueFourHour + " Four Hour Timer\n";
                        }
                    }
                    // Junction Box
                    // This should default to a 14x14, as defined above with  var nextBox = "14x14x14";  but if it doesn't, define it again here I guess
                    if (valueJuncBox > 0) {
                        if (totalValueJuncBox <= boxValueLeft) {
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueJuncBox;
                            var boxValueLeft = boxValueLeft - totalValueJuncBox;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "• " + valueJuncBox + " Junction Box\n";
                        }
                        else {
                            // Change current box to accessory box (or whatever box is next, like 14x14)
                            // DEBUGGING (1 line)
                            var outputString = outputString + "\n DEBUGGING INFO: last boxValue = " + boxValue + ".  boxValueLeft = " + boxValueLeft + "\n";
                            var boxValue = nextBoxValue;
                            var boxValueLeft = boxValue;
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueJuncBox;
                            var boxValueLeft = boxValueLeft - totalValueJuncBox;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "\n" + nextBox + ": \n";
                            var outputString = outputString + "• " + valueJuncBox + " Junction Box\n";
                        }
                    }
                    // Insulated Pouch
                    // QUESTION:  Should this should default to a 14x14, or does it fit in an Accessory Box (13x10x5)?
                    if (valueInsulPouch > 0) {
                        if (totalValueInsulPouch <= boxValueLeft) {
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueInsulPouch;
                            var boxValueLeft = boxValueLeft - totalValueInsulPouch;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "• " + valueInsulPouch + " Insulated Pouch\n";
                        }
                        else {
                            // Change current box to accessory box (or whatever box is next, like 14x14)
                            // DEBUGGING (1 line)
                            var outputString = outputString + "\n DEBUGGING INFO: last boxValue = " + boxValue + ".  boxValueLeft = " + boxValueLeft + "\n";
                            var boxValue = nextBoxValue;
                            var boxValueLeft = boxValue;
                            // Subtract item value as it's added to a box, to figure out if there's items/overflow value left over
                            var totalValueCurrent = totalValueCurrent - totalValueInsulPouch;
                            var boxValueLeft = boxValueLeft - totalValueInsulPouch;
                            // Add item to string to be displayed at the end for what to pack
                            var outputString = outputString + "\n" + nextBox + ": \n";
                            var outputString = outputString + "• " + valueInsulPouch + " Insulated Pouch\n";
                        }
                    }

                    if (totalValueCurrent > 0) {
                        // Add item to string to be displayed at the end for what to pack
                        var outputString = outputString + "\n Hmm there seems to be something left over. Did I forget something in my calculations?";
                        //var outputString = outputString + "\n Contact jake and tell him you'll give him an ice cream if he fixes it.\n DEBUGGING INFO (for leftovers): totalValueTotal = " + totalValueTotal + ". totalValueCurrent = " + totalValueCurrent;
                        var outputString = outputString + "\n DEBUGGING INFO (for leftovers): totalValueTotal = " + totalValueTotal + ". totalValueCurrent = " + totalValueCurrent;
                    }



                    // For debugging
                    var outputString = outputString + "\n\n DEBUGGING INFO: last boxValue = " + boxValue + ".  boxValueLeft = " + boxValueLeft;
                    var outputString = outputString + "\n DEBUGGING INFO: totalValueTotal = " + totalValueTotal + ".  totalValueCurrent = " + totalValueCurrent;

                    return outputString;
                }


                // THE FINAL CODE RUN TO SHOW RESULTS OUTPUT IS IN THE BLOCK ABOVE/BEFORE THIS FUNCTION, NOT HERE







            });
