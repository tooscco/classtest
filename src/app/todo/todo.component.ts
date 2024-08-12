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
  name: any = {};
  constructor (public todoform: FormBuilder, public service:TodoService, public todoservice: TodoService){}
  public todo=this.todoform.group({
    title: ['', Validators.required],
    description:'',

  })

  todoSave(){
    this.array.push(this.todo.value)
  localStorage.setItem('todoapp', JSON.stringify(this.array))
  console.log(localStorage['todoapp']);
  }

  ngOnInit() {
    const data = this.service.getTodo();
     if (data && data.length > 0) {
       this.name = data[0];
     }
     console.log(this.name);
   }

   deleteTodo(index: number) {
    this.array.splice(index, 1);
    localStorage.setItem('todoapp', JSON.stringify(this.array));
  }

  

  editTodo(index: number) {
    const todo = this.array[index];
    this.todo.setValue({
      title: todo.title,
      description: todo.description,
    });
 // Set the edit index to track which item is being edited
  }

}
