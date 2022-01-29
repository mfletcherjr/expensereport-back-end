import { Employee, Expense } from "../entities/entities";
import { EmpServices } from "../services/empServices";
import { v4 } from "uuid";
import { CosmosClient} from "@azure/cosmos";
import NotFoundError from "../entities/notfounderror";

const employeeDB = new CosmosClient(process.env.COSMOS_CONNECTION); // this is talking to the DB
const scoop = employeeDB.database("project1");
const bucket = scoop.container("employee");

export default interface EmployeeServicesDAO{
   
    getEmployeeByUsername(user:string):Promise<Employee>;
    updateEmployee(employee: Employee):Promise<Employee>;
    getAllEmployees():Promise<Employee[]>;
}


export class EmplServDAO implements EmployeeServicesDAO{
    
    async createEmployee(employee:Employee):Promise<Employee>{
        employee.id=v4();
         // Push the accounts to the employee accounts array.
         const empData = await bucket.items.create(employee);
         const {id, fname, lname, username, expenses, isManager} = empData.resource;
         return {id, fname, lname, username, expenses, isManager};
     }

    async getAllEmployees():Promise<Employee[]>{
        const employeeDB = await bucket.items.readAll<Employee>().fetchAll();
        return employeeDB.resources;

    }

    async getEmployeeByUsername(user: string): Promise<Employee>{
        const employeeData = await this.getAllEmployees();
        
        const selectedEmp = employeeData.find((emp) => emp.username === user);
        if(!selectedEmp){
            throw new NotFoundError("Resource could not be located", user);
        }
            return selectedEmp;
    }

    async updateEmployee(employee: Employee): Promise<Employee> {
        await this.getEmployeeByUsername(employee.username);
        try {
            const updatedEmployee = await bucket.items.upsert<Employee>(employee);
            return updatedEmployee.resource;
        } catch (error) {
            throw new NotFoundError("Resource could not be located", employee.username);
        }
                
    }

  

   

}//end employee DAO

