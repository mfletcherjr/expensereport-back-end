export interface Employee{
    id: string,
    fname: string,
    lname: string,
    username: string,
    password?: string,
    expenses?: Expense[],
    isManager?: Boolean;

}

export interface Expense{
    id: string, 
    description: string,
    amount: number,
    status: number,
    date?:string 
    //0 is pending, 1 is approved, 2 is rejected for states. 
    //0 is the default to be assigned

    
}