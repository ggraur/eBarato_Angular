import { IEmployee } from '../Models/employee.model';

export class ResolvedEmployeeList{
    constructor(public employeeList: IEmployee[], public error: any= null){}
}
