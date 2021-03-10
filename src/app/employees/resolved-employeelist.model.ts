import { IEmployee } from "../Modules/employee.model";

export class ResolvedEmployeeList{
    constructor(public employeeList:IEmployee[], public error:any=null){}    
}