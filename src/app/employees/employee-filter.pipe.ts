import { Pipe, PipeTransform } from '@angular/core';
import { IEmployee } from '../Modules/employee.model';
@Pipe({
    name: 'employeeFilter',
    pure: false // https://www.youtube.com/watch?v=XSLf5PRjxPw , make pipe impure (pure: false)
})
export class EmployeeFilterPipe implements PipeTransform{
    private counter = 0;

    transform(employees: IEmployee[], searchTerm: string): IEmployee[]{
        this.counter ++;
        console.log('Filter pipe executed count: ' + this.counter);
        if (!employees || !searchTerm)
        {
            return employees;
        }
        return employees.filter(
                employee => employee.fullName?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
