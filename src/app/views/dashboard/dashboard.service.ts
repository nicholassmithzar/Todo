import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, forkJoin, map } from 'rxjs';

interface JsonPlaceholderTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface JsonPlaceholderUser {
  id: number;
  name: string;
}

export interface DashboardMetrics {
  totalTodos: number;
  completedTodos: number;
  pendingTodos: number;
  totalUsers: number;
  completionRate: number;
}

export interface DashboardUserSummary {
  id: number;
  name: string;
  todoCount: number;
  completedCount: number;
}

export interface DashboardSnapshot {
  metrics: DashboardMetrics;
  recentTodos: JsonPlaceholderTodo[];
  topUsers: DashboardUserSummary[];
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';
  private readonly delayDashboard = 1200;

  constructor(private readonly http: HttpClient) {}

  getSnapshot(): Observable<DashboardSnapshot> {
    return forkJoin({
      todos: this.http.get<JsonPlaceholderTodo[]>(`${this.baseUrl}/todos`),
      users: this.http.get<JsonPlaceholderUser[]>(`${this.baseUrl}/users`)
    }).pipe(
      map(({ todos, users }) => {
        const completedTodos = todos.filter((todo) => todo.completed).length;
        const totalTodos = todos.length;
        const pendingTodos = totalTodos - completedTodos;

        const metrics: DashboardMetrics = {
          totalTodos,
          completedTodos,
          pendingTodos,
          totalUsers: users.length,
          completionRate: totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100)
        };

        const userMap = new Map(users.map((user) => [user.id, user.name]));
        const countsByUser = new Map<number, { total: number; completed: number }>();

        for (const todo of todos) {
          const current = countsByUser.get(todo.userId) ?? { total: 0, completed: 0 };
          current.total += 1;
          current.completed += todo.completed ? 1 : 0;
          countsByUser.set(todo.userId, current);
        }

        const topUsers: DashboardUserSummary[] = [...countsByUser.entries()]
          .map(([id, counts]) => ({
            id,
            name: userMap.get(id) ?? `User ${id}`,
            todoCount: counts.total,
            completedCount: counts.completed
          }))
          .sort((a, b) => b.todoCount - a.todoCount)
          .slice(0, 5);

        const recentTodos = [...todos]
          .sort((a, b) => b.id - a.id)
          .slice(0, 6);

        return {
          metrics,
          recentTodos,
          topUsers
        };
      }),
      delay(this.delayDashboard)
    );
  }
}
