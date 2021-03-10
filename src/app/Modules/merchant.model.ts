export interface IMerchant {
    id: number | null;
    merchantName: string | null;
    repFullName: string | null;
    email?: string | null;
    nif?:string | null;
    country?:string | null;
    address1?:string | null;
    address2?:string | null;
    address3?:string | null;
    address4?:string | null;
    phoneNumber?: number | null;
    mobileNumber?: number | null;
    contactPreference: string | null;
    isActive: boolean | null;
    logoPath?: string | null;
    businessInfo?:string| null;
}