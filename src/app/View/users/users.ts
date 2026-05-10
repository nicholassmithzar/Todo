import { Component, OnInit, computed, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { User, UsersService, Todo } from './users.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule, TableModule, SkeletonModule, MessageModule, ButtonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  protected readonly users = signal<User[]>([]);
  protected readonly allTodos = signal<Todo[]>([]);
  protected readonly selectedUserId = signal<number | null>(null);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly selectedUser = computed(() => {
    const userId = this.selectedUserId();
    if (userId === null) return null;
    return this.users().find((u) => u.id === userId) ?? null;
  });

  protected readonly userTodos = computed(() => {
    const userId = this.selectedUserId();
    if (userId === null) return [];
    return this.allTodos().filter((todo) => todo.userId === userId);
  });

  constructor(private readonly usersService: UsersService) {}

  ngOnInit(): void {
    this.loadData();
  }

  protected loadData(): void {
    this.loading.set(true);
    this.error.set(null);

    forkJoin({
      users: this.usersService.getUsers(),
      todos: this.usersService.getTodos()
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ({ users, todos }) => {
          this.users.set(users);
          this.allTodos.set(todos);
        },
        error: () => {
          this.error.set('Could not load data. Please try again.');
        }
      });
  }

  protected selectUser(userId: number): void {
    this.selectedUserId.set(this.selectedUserId() === userId ? null : userId);
  }
}

