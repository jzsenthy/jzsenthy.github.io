// <!-- Generating a datetime variable for pdf filename generation, using Luxon library -->

    function luxonDateTimeFunc() {
        // https://moment.github.io/luxon/#/formatting
        var DateTime = luxon.DateTime;

        // We can get at the components of the time individually through getters. For example:
        var dt = DateTime.now();
        // dt.year     //=> 2017
        // dt.month    //=> 9
        // dt.day      //=> 14
        // dt.hour
        // dt.minute
        // dt.second   //=> 47

        // Format an integer to a specific length with leading zeros (using on month, day, hour, minute, and second below)
        // SOURCE:  https://stackoverflow.com/a/49677621
        // EXAMPLE
        // let num = 3
        // let str = num.toString().padStart(3, "0")
        // console.log(str) // "003"

        // HISTORY:  This was only updating the time when you refreshed the page.
        // I moved the variable creation of the filename in htm2pdf options into the function that calls html2pdf, so it doesn't fetch the date on page load.
        var luxonDateTimeString = "" + dt.year + "_" + dt.month.toString().padStart(2, "0") + "_" + dt.day
            .toString().padStart(2, "0") + "_" + dt.hour.toString().padStart(2, "0") + dt.minute.toString()
            .padStart(2, "0") + dt.second.toString().padStart(2, "0"); // 2021_7_19_1445
        console.log("luxonDateTimeString = " + luxonDateTimeString);

        // Returning the value of luxonDateTimeString so you can call the function and get the value
        return luxonDateTimeString;

        // Not using
        // dt.toISODate(); //=> '2017-04-20'
        // var luxonDateTimeString = DateTime.now().toLocaleString({ year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
    };
