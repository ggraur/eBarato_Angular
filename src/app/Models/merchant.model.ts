import { IAddress } from './address.module';
import { ICountry } from './country.model';

// export interface IMerchant {
//     id: number | null;
//     merchantName: string | null;
//     repFullName: string | null;
//     email?: string | null;
//     nif?: string | null;
//     country: number | any;
//     address: number | any;
//     phoneNumber?: number | null;
//     mobileNumber?: number | null;
//     contactPreference: string | null;
//     isActive: boolean | null;
//     logoPath?: string | null;
//     businessInfo?: string| null;
// }

export interface IMerchant {
    id: number | null;
    merchantName: string | null;
    repFullName: string | null;
    email?: string | null;
    nif?: string | null;
    country: ICountry | any;
    address: IAddress | any;
    phoneNumber?: number | null;
    mobileNumber?: number | null;
    contactPreference: string | null;
    isActive: boolean | null;
    logoPath?: string | null;
    businessInfo?: string| null;
}
