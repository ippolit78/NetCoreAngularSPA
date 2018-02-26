import { Component, OnInit, enableProdMode } from '@angular/core';
import { DataService } from './data.service';
import { Product } from './product';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
enableProdMode();

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [DataService]
})

export class AppComponent implements OnInit {

    resultData: any;
    btnDisabled: boolean = true;
    fileToUpload: File;
    formDat: FormData;
    myform: FormGroup;
    fileUploadControl: FormControl;
    product: Product = new Product();
    products: Product[];
    tableMode: boolean = true;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.myform = new FormGroup({
            fileUploadControl: new FormControl()
        }),
            this.loadProducts();
    }

    loadProducts() {
        this.dataService.getProducts()
            .subscribe((data: Product[]) => this.products = data);
    }

    save() {
        if (this.product.id == null) {
            this.dataService.createProduct(this.product)
                .subscribe((data: Product) => this.products.push(data));
        } else {
            this.dataService.updateProduct(this.product)
                .subscribe(data => this.loadProducts());
        }
        this.cancel();
    }

    editProduct(p: Product) {
        this.product = p;
    }

    cancel() {
        this.product = new Product();
        this.tableMode = true;
    }

    delete(p: Product) {
        this.dataService.deleteProduct(p.id)
            .subscribe(data => this.loadProducts());
    }

    add() {
        this.cancel();
        this.tableMode = false;
    }

    handleFileInput(files: any) {
        this.fileToUpload = files.target.files[0];
    }

    uploadFileToActivity() {
        var fileUlpd = this.fileToUpload;
        this.dataService.uploadFile(fileUlpd).subscribe(response => {
            this.successFunc(response);
            },
            error => { alert('ERROR!!!'); }
        );

        this.myform.reset();
    }

    successFunc(response: any) {
        this.resultData = response.body;
        console.log(this.resultData);

        if (this.resultData) {
            let resultDat = this.resultData.replace(/[^\d.+\d,+]/g, '');
            let resultDatArr = resultDat.split(',');
            console.log(resultDatArr);
            for (var i = 0; i < resultDatArr.length; i+2) {
                var addTr = document.createElement('tr');
                var newLi = document.createElement('tr');
                newLi.innerHTML = 'Привет, мир!';

                document.getElementById('tableReportBody').appendChild(addTr);
            }
        }
        else {
            console.log('split ERROR');
        }
    }
}