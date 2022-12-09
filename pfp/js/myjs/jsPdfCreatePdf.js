//// jsPDF CREATE PDF ////
import { jsPDF } from "jspdf.es.min.js";


// Default export is a4 paper, portrait, using millimeters for units
// 4x6 inches
const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: [4, 6],
});

doc.text("Hello world!", 1, 1);
doc.save("two-by-four.pdf");
