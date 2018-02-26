var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.url = "/api/products";
        this.urlUploadFile = "/api/upload";
    }
    DataService.prototype.getProducts = function () {
        return this.http.get(this.url);
    };
    DataService.prototype.createProduct = function (product) {
        return this.http.post(this.url, product);
    };
    DataService.prototype.updateProduct = function (product) {
        return this.http.put(this.url + '/' + product.id, product);
    };
    DataService.prototype.deleteProduct = function (id) {
        return this.http.delete(this.url + '/' + id);
    };
    DataService.prototype.uploadFile = function (fileToUpload) {
        var formData = new FormData();
        formData.append('upload', fileToUpload);
        var params = new HttpParams();
        var options = {
            params: params,
            reportProgress: true,
        };
        var req = new HttpRequest('POST', this.urlUploadFile, formData, options);
        return this.http.request(req);
    };
    DataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=data.service.js.map