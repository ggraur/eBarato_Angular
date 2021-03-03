export interface IEmployee {
    id: number | null;
    fullName: string | null;
    gender: string | null;
    email?: string | boolean;
    phoneNumber?: number | null;
    contactPreference: string | null;
    dateOfBirth: Date | null;
    department: string | null;
    isActive: boolean | null;
    photoPath?: string | null;
}
