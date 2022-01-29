import  { EmpServices } from "../services/empServices";
import { Employee, Expense} from "../entities/entities";

describe("Employee Services tests for functionality", ()=>{

const testServices: EmpServices = new EmpServices();
let testEmployee:Employee =null;


it("Should retrieve employee by id", async()=>{
    
    let tester = await testServices.getEmployeeById("b331815a-7e96-42d0-afd3-851366d732a3");
    expect(tester.id).toContain("b331815a-7e96-42d0-afd3-851366d732a3");

})//end retrieve by ID test

//get all test
it("Should pull all employees", async()=>{
    const retrievedEmps: Employee[] = await testServices.employeeRoster();
    expect(retrievedEmps.length).toBeGreaterThan(1);
})//end getAll test

//check the default status of a request test
it("Should check the reimbursment status of employee", async()=>{
  //  const tester = await testServices.getEmployee("2beb96cf-7f70-45f3-a55b-eb9f050affcb");
    let output = await testServices.checkStatus("2beb96cf-7f70-45f3-a55b-eb9f050affcb");
    
    expect(output).toContain("Pending Approval");


})//end check default status test


//approved status test
it("Should approve given employee reimbursement request", async()=>{
    //get employee, approve expense, apply update, check that it went through
        //, "c81b78fb-590c-426a-ab2e-8d781c8c2e94"
    await testServices.approve("b331815a-7e96-42d0-afd3-851366d732a3");
    //testServices.update(tester);
    let output:String = await testServices.checkStatus("b331815a-7e96-42d0-afd3-851366d732a3");
    
    expect(output).toContain("Expense Approved");
})//end approved status test

// //rejected status test
it("Should reject the reimbursment status of employee", async()=>{
    //, "fc306038-8da2-49a2-b300-384ed6744fd7"
    await testServices.reject("f94b7140-6858-43ed-a56b-7a313a5a9f9e");
   
    let output:String = await testServices.checkStatus("f94b7140-6858-43ed-a56b-7a313a5a9f9e");
  
    expect(output).toContain("Expense Rejected");
})//end rejected status test

it("Should retrieve expenses by user id", async()=>{ 
    const testEmployee:Employee = await testServices.getEmployeeById("f94b7140-6858-43ed-a56b-7a313a5a9f9e");
    const retrievedExp: Expense[] = await testServices.getEmplExpenses(testEmployee.id);
    expect(retrievedExp).toStrictEqual(testEmployee.expenses);
})//end retrieve by ID test

it("should take in an employee and expense and return the updated employee", async()=>{
    const testEmployee:Employee = await testServices.getEmployeeById("669f32bd-3f68-45e7-acc2-8e730bbe83d9");

    const experiment:Employee = await testServices.createExpense("669f32bd-3f68-45e7-acc2-8e730bbe83d9",
    {id:'', description:"test",amount:100,status:0, date:new Date().toLocaleDateString("en-UK")} ); 

expect(experiment.expenses.length).toBe(testEmployee.expenses.length+1);



})


})//end describe

