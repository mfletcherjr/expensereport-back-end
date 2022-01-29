Data Access Objects for employee and expenses
does the heavy lifting of information to and from the CosmosDB at the behest of
the Services which in turn is done at the behest of the index.ts

index is step one where the routes are established and set to command/control express and the server
the services provide the business logic by which the DAO does the work of storing/retrieving/editing the information
from the CosmosDB