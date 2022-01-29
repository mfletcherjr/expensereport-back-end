
import { EmplServDAO } from "../dao/employee-DAO";
import { Employee } from "../entities/entities";
import { LoginService, LoginServiceImpl } from "../services/login-service";



describe("Login Service Tests", ()=>{

    // Stub implementation for testing our service logic
    // some dummy guaranteed return value so I can write a test that I do not have to refactor
    const serviceDaoStub: EmplServDAO = {
        async getEmployeeByUsername(username: string): Promise<Employee> {
            return { id: "", fname: "Samus", lname: "Aran", username: "samusaran", password: "pa$$word", expenses: [], isManager: false };
        },
        createEmployee: function (employee: Employee): Promise<Employee> {
            throw new Error("Function not implemented.");
        },
        getAllEmployees: function (): Promise<Employee[]> {
            throw new Error("Function not implemented.");
        },
        updateEmployee: function (employee: Employee): Promise<Employee> {
            throw new Error("Function not implemented.");
        }
    }

    const loginService:LoginService = new LoginServiceImpl(serviceDaoStub);

    it("Should throw an error if username and password does not match", async ()=>{

        try {
            await loginService.loginWithUsernamePassword("samusaran", "cool");       
            fail()
        } catch (error) {
            expect(error.message).toBe("Password does not match")
        }
        

    })

})