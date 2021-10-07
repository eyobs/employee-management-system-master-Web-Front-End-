import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-defualt',
  templateUrl: './defualt.component.html',
  styleUrls: ['./defualt.component.scss']
})
export class DefualtComponent implements OnInit {

  sideBarOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggler()
  {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
