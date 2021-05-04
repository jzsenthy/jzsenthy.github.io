
//// FIND THE VARIABLE NAME FROM A VARIABLE PASSED TO A FUNCTION
// (Working for variables but not for objects)
// (Actually it isn't even working for variables because it no longer returns the value of the variable without using Object references)
// (It's not working for objects passed to the function unless you wrap them with the property name and value fully written out)
// REFERENCE:  https://stackoverflow.com/a/46230373  (and modified by me to work with objects, but that requires )


var valueInsulPouch = 2;
var packingItem = {
    insulPouch: 6,
};
var totalValueInsulPouch = valueInsulPouch * packingItem.insulPouch;


function putInBox(valueCurrentItem, spaceSingleCurrentItem, totalValueCurrentItem, currentItemName) {
    // Having this line enabled breaks the Object.keys line (returns undefined)
    // totalValueCurrentItem = totalValueCurrentItem - spaceSingleCurrentItem;
    // For variables
    console.log("variable value = " + totalValueCurrentItem + "  variable name = " + Object.keys(totalValueCurrentItem)[0] + "  typeof = " + typeof totalValueCurrentItem);
    // console.log("Object.keys(spaceSingleCurrentItem)[0] = " + Object.keys(spaceSingleCurrentItem)[0]);
    // For objects
    console.log("variable value = " + Object.values(spaceSingleCurrentItem)[0] + "  variable name = " + Object.keys(spaceSingleCurrentItem)[0] + "  typeof = " + typeof spaceSingleCurrentItem);
};


// Pack the item (call the function)
// For variables
putInBox(valueInsulPouch, packingItem.insulPouch, { totalValueInsulPouch }, "Insulated Pouch");
// For objects
putInBox(valueInsulPouch, { "packingItem.insulPouch": packingItem.insulPouch }, totalValueInsulPouch, "Insulated Pouch");
// For objects (Doesn't work)
//putInBox(valueInsulPouch, {["packingItem["insulPouch"]"]}, totalValueInsulPouch, "Insulated Pouch");





// -----------------------------------------------
                                // Not working/using:
                                
                                // HISTORY:  This was messing up my Object.keys code below since it has the same name as the function argument
                                // Now the debugging string will be missing an updated  totalValueCurrentItem  variable
                                //totalValueCurrentItem = totalValueCurrentItem - spaceSingleCurrentItem;

                                // REFERENCE:  https://stackoverflow.com/a/49316021
                                // Object.keys(totalValueCurrentItem).forEach(key => {
                                //     console.log(key) // returns the keys in an object
                                //     console.log(a[key])  // returns the appropriate value 
                                // })
                                // Find the variable name from the value (i'm actually passing the variable to the function as an object by wrapping it in curly braces {})
                                // REFERENCE:  https://stackoverflow.com/a/46230373/1263035
                                // Debugging
                                // console.log("Object.keys(totalValueCurrentItem)[0] = '" + Object.keys(totalValueCurrentItem)[0] + "'. typeof = " + typeof totalValueCurrentItem);
                                // console.log("Object.keys(totalValueCurrentItem)[0] = '" + Object.keys(totalValueCurrentItem)[0] + "'. typeof = " + typeof totalValueCurrentItem);
                                // REFERENCE:  (variable as part of a variable, within global window.Function())  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
                                // Use function argument variable for the end of the packingItemWeight.[] variable name
                                // weightCurrentBox += Function('return packingItemWeight.' + weightSingleCurrentItem)();
                                // weightTotal += Function('return packingItemWeight.' + weightSingleCurrentItem)();