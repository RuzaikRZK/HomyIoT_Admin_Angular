import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})


export class AccessToken {
  access_token: string | null | undefined;
}
