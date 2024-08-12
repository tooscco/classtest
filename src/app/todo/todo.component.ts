import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  public array: any[]=[];
  public editIndex: number | null = null;
  name: any = {};
  constructor (public todoform: FormBuilder, public service:TodoService, public todoservice: TodoService){}
  public todo=this.todoform.group({
    title: ['', Validators.required],
    description:'',

  })

  public todomodal= this.todoform.group({
    titlemodal: ['', Validators.required],
    descriptionmodal:'',
  })

  todoSave(){
    this.array.push(this.todo.value)
  localStorage.setItem('todoapp', JSON.stringify(this.array))
  console.log(localStorage['todoapp']);
  this.todo.reset();
  }

  ngOnInit() {
    const data = this.service.getTodo();
     if (data && data.length > 0) {
       this.name = data;
       console.log(this.name);
     }
   }

   deleteTodo(i: number) {
    this.array.splice(i, 1);
    localStorage.setItem('todoapp', JSON.stringify(this.array));
  }

  

  editTodo(i: number) {
    const todo = this.array[i];
    this.todomodal.setValue({
      titlemodal: todo.title,
      descriptionmodal: todo.description,
    });
    this.editIndex = i;
  }

  todomodaledit(){
    if (this.editIndex !== null) {
      this.array[this.editIndex] = this.todomodal.value;
      localStorage.setItem('todoapp', JSON.stringify(this.array));
      this.editIndex = null; // Reset the edit index after updating
      this.todomodal.reset(); // Reset the modal form after saving
    }
  }

}
