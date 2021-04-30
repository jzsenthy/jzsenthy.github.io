
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