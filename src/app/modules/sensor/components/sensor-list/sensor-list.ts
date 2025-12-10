import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SensorForm } from '../sensor-form/sensor-form';
import { SensorService } from '../../services/sensor-service';
import { Page, Sensor } from '../../sensor.model';
import { catchError, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-sensor-list',
  imports: [CommonModule, SensorForm],
  templateUrl: './sensor-list.html',
  styleUrl: './sensor-list.css',
})
export class SensorList implements OnInit {

  private sensorService = inject(SensorService);

  // MUDANÇA: Async Pipe
  data$: Observable<Page<Sensor> | null> = of(null);

  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 10;

  isModalOpen = false;
  selectedId: string | null = null;

  ngOnInit(): void {
    this.loadSensors();
  }

  loadSensors(page: number = this.currentPage) {
    this.data$ = this.sensorService.findAll(page, this.pageSize).pipe(
      tap((res) => {
        this.currentPage = res.number;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
      }),
      catchError((err) => {
        console.error('Erro ao buscar sensores', err);
        return of(null);
      })
    );
  }

  openNew() {
    this.selectedId = null;
    this.isModalOpen = true;
  }

  openEdit(id: string) {
    this.selectedId = id;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedId = null;
  }

  onFormSaved() {
    this.loadSensors();
    this.closeModal();
  }

  onDelete(id: string) {
    if (confirm('Tem certeza que deseja excluir este sensor?')) {
      this.sensorService.delete(id).subscribe({
        next: () => this.loadSensors(),
        error: () => alert('Erro ao excluir sensor.')
      });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) this.loadSensors(this.currentPage + 1);
  }

  prevPage() {
    if (this.currentPage > 0) this.loadSensors(this.currentPage - 1);
  }
}