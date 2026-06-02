import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html', // Usando o arquivo HTML externo
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: any[] = [];
  newTask = { title: '' };

  constructor(private service: TaskService) {}

  ngOnInit() { 
    this.loadTasks(); 
  }

  loadTasks() {
    this.service.getTasks().subscribe({
      next: (data: any) => this.tasks = data,
      error: (err: any) => console.error('Erro ao carregar:', err)
    });
  }

  addTask() {
    if (!this.newTask.title.trim()) return;
    this.service.createTask(this.newTask).subscribe({
      next: () => {
        this.newTask.title = '';
        this.loadTasks();
      },
      error: (err: any) => alert('Erro ao salvar: ' + err.message)
    });
  }

  remover(id: number) {
    this.service.deleteTask(id).subscribe(() => this.loadTasks());
  }

  concluir(task: any) {
    task.status = 'COMPLETED';
    this.service.updateTask(task).subscribe(() => this.loadTasks());
  }

  // Adicione estes métodos no seu AppComponent
editTask(task: any) {
  const newTitle = prompt("Editar tarefa:", task.title);
  if (newTitle) {
    task.title = newTitle;
    this.service.updateTask(task).subscribe(() => this.loadTasks());
  }
}

// O deletar já tínhamos, mas certifique-se que está assim:
deleteTask(id: number) {
  this.service.deleteTask(id).subscribe(() => this.loadTasks());
}
}