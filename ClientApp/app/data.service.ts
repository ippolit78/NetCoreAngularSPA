import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from './app.component';

@Injectable()
export class DataService {

    private url = "/api/products";

    private urlUploadFile = "/api/upload";

    constructor(private http: HttpClient) {
    }

    getProducts() {
        return this.http.get(this.url);
    }

    createProduct(product: Product) {
        return this.http.post(this.url, product);
    }
    updateProduct(product: Product) {

        return this.http.put(this.url + '/' + product.id, product);
    }
    deleteProduct(id: number) {
        return this.http.delete(this.url + '/' + id);
    }

    uploadFile(fileToUpload: File) {

        let formData = new FormData();
        formData.append('upload', fileToUpload);

        let params = new HttpParams();

        const options = {
            params: params,
            reportProgress: true,
        };

        const req = new HttpRequest('POST', this.urlUploadFile, formData, options);
        return this.http.request(req);
    }
}