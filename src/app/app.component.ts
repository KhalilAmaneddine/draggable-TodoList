import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-list';

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar ) {}

  todo: string[] = [];

  done: string[] = [];

  inPorgress: string[] = [];

  taskValue!: string;

  displayUpdateButton: boolean = false;

  submitted = false;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onAddTask(form: NgForm) {
    this.todo.push(form.value.task);
    form.reset();
    this.displayUpdateButton = false;
  }

  deleteToDo(index: number) {
    this.todo.splice(index, 1);
    this.snackBar.open('Task deleted', 'Dismiss', {
      duration: 3000, 
    });
  }

  deleteInProgress(index: number) {
    this.inPorgress.splice(index, 1);
    this.snackBar.open('Task deleted', 'Dismiss', {
      duration: 3000, 
    });
  }

  deleteDone(index: number) {
    this.done.splice(index, 1);
    this.snackBar.open('Task deleted', 'Dismiss', {
      duration: 3000, 
    });
  }

  onEdit(index: number) {
    this.displayUpdateButton = true;
    this.taskValue = this.todo[index];
    this.todo.splice(index, 1);
  }

  confirmDeleteInProgress(index: number): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteInProgress(index);
      }
    });
  }

  confirmDeleteToDo(index: number): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteToDo(index);
      }
    });
  }
  confirmDeleteDone(index: number): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteDone(index);
      }
    });
  }

  
 }


