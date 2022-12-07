        // SAVE PDF

        // To enable png image compression, try using the canvas-png-compression shim  // Didn't work, disabled
        // Replaces HTMLCanvasElement.toDataURL() with canvas-png-compression's implementation.
        // CanvasPngCompression.replaceToDataURL();  // Didn't work, disabled
        // If for some reason you need to revert to native implementation, use:
        // CanvasPngCompression.revertToDataURL();




        // FUNCTION: Call the function to save as pdf, using New Promise-based usage:
        //// html2pdf().set(opt).from(element).save();
        // Changed to my variables:
        //// html2pdf().set(html2pdfOpt).from(html2pdfElement).save();

        // FUNCTION: Call the function to save as pdf, using Old monolithic-style usage:
        //// html2pdf(element, opt);
        // Changed to my variables:
        //// html2pdf(html2pdfElement, html2pdfOpt);



        // RUNNING HTML2PDF
        // FUNCTION: Calling the html2pdf function and the add/remove print css functions
        function html2pdfAndPrintCss() {
            // FUNCTION: Vanilla html2pdf stuff
            // NOTE: I added a 'body' id to my html body tag to make it easy to reference (not using anymore, targeting the resultsBox for saving)
            var html2pdfElement = document.getElementById('resultsBox');
            var html2pdfOpt = {
                margin: 0.2,
                // TODO:  Add date/time and package info to filename
                filename: 'PFP_' + luxonDateTimeFunc() + '.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 4
                }, // Doubled the scale to 4 to increase print quality on thermal printer
                // pagebreak: { before: '.newBox' },
                // Width in Inches
                jsPDF: {
                    unit: 'in',
                    format: [4, 6],
                    orientation: 'portrait'
                }
                // Width in px (203 dpi/ppi ZP500 thermal printer) // Doesn't show up right
                ////jsPDF: { unit: 'px', format: [812, 1218], orientation: 'portrait' }
            };


            // FUNCTION:  Call the function to add printCss class to body tag, which triggers css rules before saving
            addPrintCss();
            // FUNCTION:  Add extra padding to the top of each page to offset the incorrect positioning that html2pdf applies
            changeCSSAddPadding();
            // FUNCTION:  Scroll to top (to only show "Saving..." div)
            window.scrollTo(0, 0);

            // Uses .then (promises) to only remove the css after the async saving task is done, 
            // then sets padding-top on each page back to a standard value, then scrolls to bottom
            // REFERENCE: https://github.com/eKoopmans/html2pdf.js/issues/79#issuecomment-552126785
            html2pdf().set(html2pdfOpt).from(html2pdfElement).save().then(removePrintCss).then(changeCSSRemovePadding)
                .then(function () {
                    // Scroll back to bottom (backButton div) after saving and reloading good css
                    // SOURCE:  https://stackoverflow.com/a/22292000/1263035
                    var element = document.getElementById('backButton');
                    element.scrollIntoView();
                    // Scroll to actual bottom of page
                    // SOURCE:  https://stackoverflow.com/a/58109049/1263035
                    window.scrollTo({
                        left: 0,
                        top: document.body.scrollHeight,
                        behavior: "auto"
                    });

                });

        };


        // FUNCTION: Adding @media print css options to html2pdf output
        // by duplicating those rules, and loading them when divs/classes have a parent div with the printCss class
        // USAGE: Call this function before running html2pdf
        function addPrintCss() {
            //// document.body.classList.add("printCss");  // Use this to directly add to body tag

            // FUNCTION:  Add/import a css stylesheet with javascript (add to end of head tag)
            // HISTORY:  Not using anymore, too difficult to unload the css after. Toggling parent class now
            // SOURCE:  https://stackoverflow.com/a/50822576
            // document.getElementsByTagName("head")[0].insertAdjacentHTML(
            //     "beforeend",
            //     "<link rel=\"stylesheet\" href=\"./css/printCss.css\" />");

            // document.body.classList.add("printCss");  // Use this to directly add to body tag
            // SOURCE:  https://stackoverflow.com/a/46980378
            document.documentElement.classList.add("printCss"); // Use this to directly add to html tag
        };

        // USAGE: Call this function after running html2pdf (might need to use .then(function))
        function removePrintCss() {
            //// document.body.classList.remove("printCss");  // Didn't work

            // TODO:  Make it actually remove the css file 
            //  (maybe delete the text for the file import in the head tag?)
            //  (maybe add class to link tag to get the element id easier and delete that?)
            //  (maybe load a different css file with opposite values or clear/reset values?)
            // SOURCE:  https://stackoverflow.com/a/50822576
            // document.getElementsByTagName("head")[0].insertAdjacentHTML(
            //     "beforeend",
            //     "<link rel=\"stylesheet\" href=\"./css/printCss.css\" />");

            // document.body.classList.remove("printCss");  // Use this to directly affect body tag
            // SOURCE:  https://stackoverflow.com/a/46980378
            document.documentElement.classList.remove("printCss"); // Use this to directly affect html tag
        };

        // FUNCTION: Adding @media print css options to html2pdf output
        // Adds the print class to the body tag before running html2pdf, then remove after
        // SOURCE: https://github.com/eKoopmans/html2pdf.js/issues/79#issuecomment-552126785
        // NOTE: I added a 'body' id to my html body tag to make it easy to reference
        // var source = document.getElementById('body');
        // document.body.classList.add("print");  // Use this to directly add to body tag
        // ////source.classList.add('print');  // Or use this to add to any referenced element
        //// html2pdf(body, {
        ////     filename: 'myfile.pdf',
        ////     image: { type: 'jpeg', quality: 0.98 },
        ////     html2canvas: { scale: 2 },
        ////     jsPDF: { unit: 'in', format: [4, 6], orientation: 'portrait' }
        //// }).then(function () {
        ////     document.body.classList.remove("print");
        //// });


        // FUNCTION:  Change CSS dynamically
        // REFERENCE:  https://stackoverflow.com/a/10071316/1263035
        function changeCSSAddPadding() {
            // var color = document.getElementById("newBox").style.border-color;
            // if (color === "red")
            //     document.getElementById("newBox").style.border-color = "black";
            // else

            // NOTE:  CSS properties with dashes are converted to camelcase
            // REFERENCE:  https://www.w3schools.com/jsref/prop_html_style.asp
            // document.getElementById("pageTitle").style.borderRadius = "20px";
            // document.getElementById("pageTitle").style.borderRadius = boxNumber * 2;

            // elements = document.getElementsByClassName("pageTitle");
            // for (var i = 0; i < elements.length; i++) {
            //     elements[i].style.borderRadius = elements[i].style.borderRadius = "20px";
            // }

            // // Test changing the border-radius for the title/header, based on SO#, when clicking the version number
            // elements = document.getElementsByClassName("pageTitle");
            // // Get the current SO# value and store in valueSoNumForCSS variable (valueSoNum isn't created until pressing submit)
            // var valueSoNumForCSS = Number(document.getElementById("inputSoNum").value);
            // for (var i = 0; i < elements.length; i++) {
            //     elements[i].style.borderRadius = elements[i].style.borderRadius = valueSoNumForCSS + "px";
            // }

            // Add X pixels (X is page number) to the padding-top CSS style per page to correct html2pdf incorrect alignment offset
            elements = document.getElementsByClassName("newBox");
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.paddingTop = elements[i].style.paddingTop = i + "px";
            };
        };

        // FUNCTION:  Change CSS dynamically
        // REFERENCE:  https://stackoverflow.com/a/10071316/1263035
        function changeCSSRemovePadding() {
            // Remove the pixels added to the padding-top CSS style per page for correcting html2pdf alignment offset (set to 20px)
            elements = document.getElementsByClassName("newBox");
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.paddingTop = elements[i].style.paddingTop = "20px";
            };
        };
