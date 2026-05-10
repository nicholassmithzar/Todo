import { Component, OnInit, computed, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
import {
  DashboardMetrics,
  DashboardService,
  DashboardUserSummary
} from './dashboard.service';
import { RouterLink } from "@angular/router";

interface DashboardTodoItem {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-dashboard',
  imports: [ButtonModule, CardModule, TagModule, SkeletonModule, MessageModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly metrics = signal<DashboardMetrics | null>(null);
  protected readonly recentTodos = signal<DashboardTodoItem[]>([]);
  protected readonly topUsers = signal<DashboardUserSummary[]>([]);

  protected readonly completionRateLabel = computed(() => {
    const current = this.metrics();
    return current ? `${current.completionRate}%` : '0%';
  });

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  protected loadDashboard(): void {
    this.loading.set(true);
    this.error.set(null);

    this.dashboardService
      .getSnapshot()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (snapshot) => {
          this.metrics.set(snapshot.metrics);
          this.recentTodos.set(snapshot.recentTodos);
          this.topUsers.set(snapshot.topUsers);
        },
        error: () => {
          this.error.set('Could not load dashboard data. Please try again.');
        }
      });
  }
}
