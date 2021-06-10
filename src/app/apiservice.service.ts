import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }

  createContact(payload){
    return this.http.post(`${environment.apiUrl}/contact-info/`,payload)
  }

  getContacts(){
    return this.http.get(`${environment.apiUrl}/contact-info/`)
  }

  getContact(id){
    return this.http.get(`${environment.apiUrl}/contact-info/${id}/`)
  }

  updateContact(data,id){
    return this.http.put(`${environment.apiUrl}/contact-info/${id}/`,data)
  }

  deleteContact(id){
    return this.http.delete(`${environment.apiUrl}/contact-info/${id}/`)
  }

  uploadData(data){
    return this.http.post(`${environment.apiUrl}/charts/add/`,data)
  }

  getUploadedData(){
    return this.http.get(`${environment.apiUrl}/charts/get/`)
  }
}
