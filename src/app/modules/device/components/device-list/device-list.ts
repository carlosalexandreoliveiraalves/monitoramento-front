import { Component, inject, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device-service';
import { Device, Page } from '../../device.model';
import { CommonModule } from '@angular/common';
import { DeviceForm } from '../device-form/device-form';
import { catchError, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-device-list',
  imports: [CommonModule, DeviceForm],
  templateUrl: './device-list.html',
  styleUrl: './device-list.css',
})
export class DeviceList implements OnInit {

  private deviceService = inject(DeviceService);

  // MUDANÇA: Observable ao invés de array estático
  data$: Observable<Page<Device> | null> = of(null);

  // Paginação
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 10;

  // Modal
  isModalOpen = false;
  selectedId: string | null = null;

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(page: number = this.currentPage) {
    // MUDANÇA: Pipe Async
    this.data$ = this.deviceService.findAll(page, this.pageSize).pipe(
      tap((res) => {
        this.currentPage = res.number;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
      }),
      catchError((err) => {
        console.error('Erro ao buscar dispositivos', err);
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
    this.loadDevices();
    this.closeModal();
  }

  onDelete(id: string) {
    if (confirm('Tem certeza que deseja excluir este dispositivo?')) {
      this.deviceService.delete(id).subscribe({
        next: () => this.loadDevices(),
        error: () => alert('Erro ao excluir dispositivo.')
      });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) this.loadDevices(this.currentPage + 1);
  }

  prevPage() {
    if (this.currentPage > 0) this.loadDevices(this.currentPage - 1);
  }
}