export class Employee {
    id: number | undefined;
    fullName: string | undefined;
    gender: string | undefined;
    email?: string;
    phoneNumber?: number;
    contactPreference: string | undefined;
    dateOfBirth: Date | undefined;
    department: string | undefined;
    isActive: boolean | undefined;
    photoPath?: string;
}
