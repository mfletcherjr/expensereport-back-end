import { EmplServDAO } from "../dao/employee-DAO";
import { Employee } from "../entities/entities";



export interface LoginService{

    loginWithUsernamePassword(username: string, password: string): Promise<Employee>

}

export class LoginServiceImpl implements LoginService{

    private employeeDAO:EmplServDAO

    constructor(employeeDAO: EmplServDAO){
        this.employeeDAO = employeeDAO;
    }

    async loginWithUsernamePassword(username: string, password: string) {
        const employee: Employee = await this.employeeDAO.getEmployeeByUsername(username);

        if(employee.password != password){
            throw new Error("Password does not match")
        }else{
            return employee
        }

    }

}