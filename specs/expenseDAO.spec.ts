import { EmplServDAO } from "../dao/employee-DAO";
import { ExpServDAO } from "../dao/expenses-dao";
import { Employee } from "../entities/entities";
import { EmpServices } from "../services/empServices";





describe("Test expense creation and appending to given employee functionality",()=>{

    // const testDAO: EmplServDAO = new EmplServDAO();
    const testExpDAO: ExpServDAO= new ExpServDAO();
    const testEmpServ: EmpServices = new EmpServices();

it("should take in an employee and expense and return the updated employee", async()=>{
    //const testEmployee:Employee = await testEmpServ.getEmployeeById("f2aed44b-13b5-4e2a-8359-3fb12868e7c7");

    const experiment:Employee = await testExpDAO.createExpense("669f32bd-3f68-45e7-acc2-8e730bbe83d9",
    {id:'', description:"test",amount:100,status:0, date:new Date().toLocaleDateString("en-UK")} ); 

expect(experiment.expenses.length).toBeGreaterThan(1);



})







});