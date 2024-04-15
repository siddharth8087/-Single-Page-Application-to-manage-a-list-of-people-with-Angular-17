import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  PersonObj: Person = new Person();
  PersonList: Person[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");
    if(localData != null) {
      this.PersonList = JSON.parse(localData)
    }
  }

  openModel() {
    
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeModel() {
    this.PersonObj = new Person();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onDelete(item: Person) {
    const isDelet = confirm("Are you sure want to Delete");
    if(isDelet) {
      const currentRecord =  this.PersonList.findIndex(m=> m.id === this.PersonObj.id);
      this.PersonList.splice(currentRecord,1);
      localStorage.setItem('angular17crud', JSON.stringify(this.PersonList));
    }
  }
  onEdit(item: Person) {
    this.PersonObj =  item;
    this.openModel();
  }

  updatePerson() {
      const currentRecord =  this.PersonList.find(m=> m.id === this.PersonObj.id);
      if(currentRecord != undefined) {
        currentRecord.name = this.PersonObj.name;
        currentRecord.address =  this.PersonObj.address;
        currentRecord.mobileNo =  this.PersonObj.mobileNo;
      };
      localStorage.setItem('angular17crud', JSON.stringify(this.PersonList));
      this.closeModel()
  }
  savePerson() {
    debugger;
    const isLocalPresent = localStorage.getItem("angular17crud");
    if (isLocalPresent != null) {
      
      const oldArray = JSON.parse(isLocalPresent);
      this.PersonObj.id = oldArray.length + 1;
      oldArray.push(this.PersonObj);
      this.PersonList = oldArray;
      localStorage.setItem('angular17crud', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.PersonObj);
      this.PersonObj.id = 1;
      this.PersonList = newArr;
      localStorage.setItem('angular17crud', JSON.stringify(newArr));
    }
    this.closeModel()
  }
}


export class Person {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this.id = 0;
    this.address = '';
    this.city = '';
    this.email = '';
    this.mobileNo = '';
    this.name = '';
    this.state = '';
    this.pincode = '';
  }

}