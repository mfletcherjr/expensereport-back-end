
import { EmplServDAO } from "../dao/employee-DAO";
import { Employee } from "../entities/entities";

describe("Employee DAO tests for functionality", ()=>{

const testDAO: EmplServDAO = new EmplServDAO();
let testEmployee:Employee = null

it("Should create an employee",async () => {
    const fakeEmpl: Employee = {
        id: '',
        fname:"Rock",
        lname:"Light",
        username:"megaman",
        password:"capcom",
        expenses: [{id:'', description: 'Obviously excessive', amount: 5000, status: 0}],
        isManager: false
        
    }
    testEmployee = await testDAO.createEmployee(fakeEmpl);
    expect(testEmployee.username).toBe(fakeEmpl.username);
    
})//end create test

it("Should pull all employees", async()=>{
    const retrievedEmps: Employee[] = await testDAO.getAllEmployees();
    expect(retrievedEmps.length).toBeGreaterThan(1);
})//end getAll test


it("Should retrieve employee by username", async()=>{ 
    const retrievedEmps: Employee = await testDAO.getEmployeeByUsername(testEmployee.username);
    expect(retrievedEmps.username).toBe(testEmployee.username);
})//end retrieve by ID test



}) //end of describe