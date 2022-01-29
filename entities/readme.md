contains the employee interface origin

thinking of making a single employee with manager being a boolean value to make it simple:

employee interface
fname: string
lname: string
isManager?: boolean
expenses[]: Expense

expenses interface
entryId: string *from uuid*
amount: number,
type: string,
picture: File