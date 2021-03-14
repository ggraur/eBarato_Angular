import { Curency } from './curency.model';
import { Languages } from './language.module';
import { Region } from './regions.model';

export class ICountry{
    name: string | undefined;
    code: string | undefined;
    capital: string | undefined;
    region: Region |null | undefined;
    currency: Curency | null | undefined;
    language: Languages | null | undefined;
    flag: string | null | undefined;
}


