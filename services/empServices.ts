//I know it's right now with how this is written but I am for darn sure progressing
//I think my array and obejct stuff is flipped so I'll have to work on it for sure but this
//is significant progress made
//look at me writing methods

import { Employee, Expense } from "../entities/entities";
import { CosmosClient } from "@azure/cosmos";
import NotFoundError from "../entities/notfounderror";
import { EmplServDAO } from "../dao/employee-DAO";
import { v4 } from "uuid";

//have to update so that it talks to cosmosDB and can correctly access/change employee information inside
//the expense array within

/*
study react on w3schools

study flexbox on w3schools

study reactnative on w3schools and their site

create fetches and stuff

*/

export default interface EmpServicesInterface{
    employeeRoster():Promise<Employee[]>;
    checkStatus(uid:string):Promise<string>;
    getEmployeeById(uid:string):Promise<Employee>;
    approve(uid:string):Promise<string>; //, expenseId:string
    reject(uid:string):Promise<string>; //, expenseId:string

}

export class EmpServices implements EmpServicesInterface{
    employeeDB = new CosmosClient(process.env.COSMOS_CONNECTION); // this is talking to the DB
    scoop = this.employeeDB.database("project1");
    bucket = this.scoop.container("employee");
    empServDao: EmplServDAO = new EmplServDAO();
    

async employeeRoster():Promise<Employee[]>{
//returns all employees in DB
    const empData = await this.bucket.items.readAll<Employee>().fetchAll();
    return empData.resources; 
}

async getEmployeeById(uid:string):Promise<Employee> {
        //gets the one based on id
        
        const anEmployee = await this.bucket.item(uid,uid).read<Employee>();
       
        // anEmployee.resource.id;
        if(!anEmployee.resource){
            throw new NotFoundError("Resource could not be found", uid);
        }
       
        const {id, fname, lname, username, expenses} = anEmployee.resource;   
        return {id, fname, lname, username, expenses};
     
}
//get employee by id
//add expense to already existing array of expenses 
//update the employee
//return the employee
// async createExpense(uid:string):Promise<Expense>{
//     const anEmployee =  await this.getEmployeeById(uid);

//     try {
//         const expenseRequest:[] = ;


//     } catch (error) {
//         throw new NotFoundError("Resource could not be located", anEmployee.id);
//     }

    

//     return 
// }


    //the value of expense status
    //0 pending, 1 approved, 2 rejected
async checkStatus(uid:string):Promise<string>{
    const handle = await this.getEmployeeById(uid);    
    
    //const handle = employees.find(({username})=> username === uid); 
    for (let index = 0; index < handle.expenses.length ; index++) {
        const element = handle.expenses[index];
        if (element.status ===0) {
           // console.log("approval pending")
            return ("Pending Approval");
        } else if(element.status ===1){
           // console.log("approved")
            return ("Expense Approved");
        }else if (element.status===2){
           // console.log("rejected")
            return ("Expense Rejected");
        }else 
            throw new Error ("invalid value");
        
    }
    
}

//gotta peek inside the employee and peer into expense to mod that value
//gotta figure out how to increment that thang fa show
async approve(uid:string):Promise<string>{ //, expenseId:string
    const handle:Employee = await this.getEmployeeById(uid);
    
    const refund = handle.expenses.find(({id})=> id === id);//expenseId
    const index = handle.expenses.findIndex(({id})=> id === id);

    handle.expenses.splice(index,1);
    refund.status = 1;
    handle.expenses.push(refund);

    await this.update(handle);

    return this.checkStatus(handle.id);
}

async reject(uid:string){//, expenseId:string
    const handle:Employee = await this.getEmployeeById(uid);
    const refund = handle.expenses.find(({id})=> id === id);
    
    const index = handle.expenses.findIndex(({id})=> id === id);
    
    handle.expenses.splice(index,1);
    refund.status = 2;
    handle.expenses.push(refund);

    await this.update(handle);
    
    return this.checkStatus(handle.id);
}

async update(empl:Employee){
    const changeUp = await this.bucket.items.upsert(empl);
    return changeUp.resource;

}

async getEmplExpenses(userId:string):Promise<Expense[]>{
  //  const emp = await this.empServDao.getEmployeeByUsername(user);
    const emp = await this.getEmployeeById(userId);
    
       return emp.expenses;
}

async createExpense(empId:string,request:Expense): Promise<Employee> {
        
    const anEmployee = await this.getEmployeeById(empId);
// const currentExpenses = await empServices.getEmplExpenses(anEmployee.username);
    //let newRequest = request;
    const newRequest= {id:v4(), description:request.description, amount:request.amount,status:0, date:new Date().toLocaleDateString("en-UK") };
    

  
    //currentExpenses.push(newRequest);
    anEmployee.expenses.push(newRequest);
    await this.update(anEmployee);
    
    return anEmployee;
    

}

}//end class definition

