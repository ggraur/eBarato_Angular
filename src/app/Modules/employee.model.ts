export interface IEmployee {
    id: number | null;
    fullName: string | null;
    gender: string | null;
    email?: string | null;
    phoneNumber?: number | null;
    contactPreference: string | null;
    dateOfBirth: Date | null;
    department: string | null;
    isActive: boolean | null;
    photoPath?: string | null;
    password:string|null;
    confirmPassword:string|null;
}
