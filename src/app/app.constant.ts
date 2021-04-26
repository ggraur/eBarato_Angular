import { HttpHeaders } from "@angular/common/http";

export class AppConstants {
    static readonly Http_API_URL = 'http://localhost:5000/api/';
    static readonly Https_API_URL = 'https://localhost:5001/api/';

    static readonly ApplicationHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
           'X-Content-Type-Options': 'no-sniff',
           'Access-Control-Allow-Credentials': 'true'
        })
      };
}
