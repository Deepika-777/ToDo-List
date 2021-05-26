import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { board } from 'src/app/models/board.model';
import { Column, Row } from 'src/app/models/column.model';

@Component({
  selector: 'app-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.scss']
})
export class MainviewComponent implements OnInit {

  public activeCard: any = {};
  public showInsertTaskForm: boolean = false;
  get columnIds(): string[] {
    return this.board.columns.map(track => track.id.toString());
  }

  MyDate = Date.now();
  
  constructor() { }

  board: board = new board('Test Board',[] )


  ngOnInit(): void {

  }

  drop(event: CdkDragDrop<Row[]>) {
   
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.updateEffortSum(this.board['columns'])
  }

  drop2(event: CdkDragDrop<Column[]>) {
   
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.updateEffortSum(this.board['columns'])
  }

  showInsertTaskModel(column : any, columnIndex: any){
    this.showInsertTaskForm = true;
    this.activeCard = new Row("" ,0,"",false, ""+this.MyDate, "");
    this.activeCard.targetPanelId = columnIndex;
  }
 
  addCard(){
    this.board.columns[this.activeCard.targetPanelId].tasks.push(this.activeCard);
    this.updateEffortSum(this.board['columns']);
    this.showInsertTaskForm = false;
    this.createCard(this.board);

  }

  statusChecked(status : boolean){
    if (status == true)
    {
      return "Checked";
    }
    else {
      return "In Progress";
    }
    
  }
  
  createCard(start_date : any){  
    
    start_date = this.MyDate;
  }

  editCard(carditem:any, columnIndex: number, rowIndex: number){ 
    this.activeCard.isEditCard = true;
    this.activeCard = carditem;
    this.activeCard.targetPanelId = columnIndex;
    this.activeCard.targetRowId = rowIndex;
    this.showInsertTaskForm = true;
    
  } 
  saveCard(){
    if(this.activeCard.status)
    {
      this.activeCard.end_date = this.MyDate;
    }
    else{
      this.activeCard.end_date = " ";
    }
    this.board.columns[this.activeCard.targetPanelId].tasks[this.activeCard.rowIndex] = this.activeCard;
    this.showInsertTaskForm = false;
  }

  cancel(){
    this.showInsertTaskForm = false;
  }

  removeCard(x:number){   
   
    this.board['columns'][x]['tasks'].pop()
    this.updateEffortSum(this.board['columns'])
  } 
  
  convertToString(column: any) {
    return (column.id).toString();
  }

  addColumn(){
    let column  = new Column("List", 1, [], this.board.columns.length);
    
    this.board['columns'].push(column)
    this.updateEffortSum(this.board['columns'])
  }

  removeColumn(){
     
    this.updateEffortSum(this.board['columns'])
    
    this.board['columns'].pop()
  }

  updateEffortSum(data:Column[]){
    data.forEach(element => {
      element.effortSum();
    });
  }

}


