var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, enableProdMode } from '@angular/core';
import { DataService } from './data.service';
import { Product } from './product';
import { FormGroup, FormControl } from '@angular/forms';
enableProdMode();
var AppComponent = /** @class */ (function () {
    function AppComponent(dataService) {
        this.dataService = dataService;
        this.btnDisabled = true;
        this.product = new Product();
        this.tableMode = true;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.myform = new FormGroup({
            fileUploadControl: new FormControl()
        }),
            this.loadProducts();
    };
    AppComponent.prototype.loadProducts = function () {
        var _this = this;
        this.dataService.getProducts()
            .subscribe(function (data) { return _this.products = data; });
    };
    AppComponent.prototype.save = function () {
        var _this = this;
        if (this.product.id == null) {
            this.dataService.createProduct(this.product)
                .subscribe(function (data) { return _this.products.push(data); });
        }
        else {
            this.dataService.updateProduct(this.product)
                .subscribe(function (data) { return _this.loadProducts(); });
        }
        this.cancel();
    };
    AppComponent.prototype.editProduct = function (p) {
        this.product = p;
    };
    AppComponent.prototype.cancel = function () {
        this.product = new Product();
        this.tableMode = true;
    };
    AppComponent.prototype.delete = function (p) {
        var _this = this;
        this.dataService.deleteProduct(p.id)
            .subscribe(function (data) { return _this.loadProducts(); });
    };
    AppComponent.prototype.add = function () {
        this.cancel();
        this.tableMode = false;
    };
    AppComponent.prototype.handleFileInput = function (files) {
        this.fileToUpload = files.target.files[0];
    };
    AppComponent.prototype.uploadFileToActivity = function () {
        var _this = this;
        var fileUlpd = this.fileToUpload;
        this.dataService.uploadFile(fileUlpd).subscribe(function (response) {
            _this.successFunc(response);
        }, function (error) { alert('ERROR!!!'); });
        this.myform.reset();
    };
    AppComponent.prototype.successFunc = function (response) {
        var toSplitStr = response.body;
        this.resultData = toSplitStr.split(',');
        console.log(this.resultData);
    };
    AppComponent = __decorate([
        Component({
            selector: 'app',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map