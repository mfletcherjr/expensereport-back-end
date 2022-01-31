/*
where the work is to be done between my machine, postman, express, cosmosDB

log status code and request time for project in front end

*/
import express from 'express';
import { Employee, Expense } from './entities/entities';
import { LoginServiceImpl, LoginService } from './services/login-service';
import NotFoundError from './entities/notfounderror';
import { EmplServDAO } from './dao/employee-DAO';
import { EmpServices } from './services/empServices';
import cors from 'cors';
import logMiddleware from './middleware/logger-middleware';




const app = express();
app.use(express.json());
app.use(cors());
app.use(logMiddleware);


const employeeSvcsDao: EmplServDAO = new EmplServDAO();
const empServices: EmpServices = new EmpServices();
const loginService:LoginServiceImpl = new LoginServiceImpl(employeeSvcsDao);



app.post('/employee', async (req, res)=>{
    const newEmployee: Employee = req.body; 
    const employee:Employee = await employeeSvcsDao.createEmployee(newEmployee);//this is the ClientDAO waiting for and processing the new client
    res.status(201); //returns confirmation from DAO that the task was done successfully per Adam
    res.send(employee); //actual return of the client from whatever the DAO sent me

});

app.get('/employee', async (req, res)=>{
    //   const response = req.query;
    const employeeList: Employee[] = await empServices.employeeRoster();
    res.status(201);
    res.send(JSON.stringify({employeeList:employeeList}));
    // console.log (res.send(employeeList));

});

app.get('/employee/:id', async (req,res)=>{

    try {
        const {id} = req.params;
        const employee: Employee = await empServices.getEmployeeById(id);
        res.status(201);
        res.send(employee);
    } catch (error){
        if (error instanceof NotFoundError) {
            res.status(404);
            res.send('The provided ID could not locate client.');
        } else {
            res.status(500);
            res.send("Something very wrong here!!!!!"); 
        }
        
    }
});



//patch for updating approval state to be written as well as reject functions


//patch for logging in as user
app.patch('/login', async (req,res)=>{
    try {
        const {username, password} = req.body;
        console.log(username);
        console.log(password);
        const employee:Employee = await loginService.loginWithUsernamePassword(username,password);
        res.status(201);
        res.send(JSON.stringify({employee:employee}));
      
        
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404);
            res.send('The provided username was incorrect');
        } else {
            res.status(400);
            res.send("Incorrect password"); 
        }
    }

});

app.patch('/approve/:id', async(req,res)=>{
try {
    const {id}= req.params;
    await empServices.approve(id);
    const message = "Expense status updated to approved";
    res.status(200);
    console.log(message);
    res.send(JSON.stringify({id:id}));
    
    
} catch (error) {
    if (error instanceof NotFoundError) {
        res.status(404);
        res.send('Could not locate employee.');
    } else {
        res.status(500);
        res.send("Something very wrong here!!!!!"); 
    }
}


});

app.patch('/reject/:id', async(req,res)=>{
    try {
        const {id}= req.params;
        await empServices.reject(id);
        const message = "Expense status updated to rejected";
        
        res.status(200);
        console.log(message);
        res.send(JSON.stringify({id:id}));
        
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404);
            res.send('Could not locate employee.');
        } else {
            res.status(500);
            res.send("Something very wrong here!!!!!"); 
        }
    }
    
    
    });

    app.patch('/expense/:id',async (req,res)=>{
        try {
            const {id}= req.params;
            const expense = req.body;
            console.log(id);
            console.log(expense);
            await empServices.createExpense(id,expense);
            const message= "Expense added to employee";
            
            res.status(200);
            console.log(message);
            
            res.send(JSON.stringify({id:id,expense:expense}));
            
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404);
                res.send('Could not locate employee. Could not add expense.');
            } else {
                res.status(500);
                res.send("Something very wrong here!!!!!"); 
            }
        }





    })

app.listen(5000, ()=> console.log("Application launched, port 5000"));