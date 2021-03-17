# TO DO:
1. Create new inputs (below)
2. Update Shipper Scenarios
3. New Condition: backflow/juncBox && shipmentArr > 1 = shipper + 14x14x14 (bacflow/juncbox and POLD box can fit in 14x14x14)
####NEW INPUTS:
1. Hidden Wire [CHECKBOX]
2. WDC [CHECKBOX]
x. Express?
-->If yes, expose State dropdown

####BONUS:
1. Use getters & setters with objs (accessors)
2. JS Classes


PHASE 1
Create initial application that will only look at the input values and see if they exceed the 13 possible scenarios
PHASE 2
Add support for additional packaging i.e. POLD boxes
PHASE 3
Add support for the rest of the potential packaging i.e. electrical junction boxes, LDS outdoor bags, etc.
PHASE 4
Setup database (using PHP & mySQL?) that will accept comments or requests for changes. App will store failed attempts to package. --->if error is detected email the object using https://formspree.io/