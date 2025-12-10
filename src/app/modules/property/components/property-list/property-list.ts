import { Component, inject, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property-service';
import { PersonService } from '../../../user/services/person';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Page, Property, PropertyDTO } from '../property.model';
import { Person } from '../../../user/user.model';
import { CommonModule } from '@angular/common';
import { PropertyForm } from "../property-form/property-form";
import { catchError, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-property-list',
  imports: [CommonModule, ReactiveFormsModule, PropertyForm],
  templateUrl: './property-list.html',
  styleUrl: './property-list.css',
})
export class PropertyList implements OnInit {

  private propertyService = inject(PropertyService);

  // MUDANÇA: Async Pipe Pattern
  data$: Observable<Page<Property> | null> = of(null);

  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 10;

  isModalOpen = false;
  selectedId: string | null = null;

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(page: number = this.currentPage) {
    this.data$ = this.propertyService.findAll(page, this.pageSize).pipe(
      tap((res) => {
        this.currentPage = res.number;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
      }),
      catchError((err) => {
        console.error('Erro ao carregar propriedades', err);
        return of(null);
      })
    );
  }

  openNew() {
    this.selectedId = null;
    this.isModalOpen = true;
  }

  openEdit(id: string | undefined) {
    if (!id) return;
    this.selectedId = id;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedId = null;
  }

  onFormSaved() {
    this.loadProperties();
    this.closeModal();
  }

  onDelete(id: string | undefined) {
    if (!id) return;
    if (confirm('Tem certeza que deseja excluir esta propriedade?')) {
      this.propertyService.delete(id).subscribe({
        next: () => this.loadProperties(),
        error: () => alert('Erro ao excluir propriedade')
      });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) this.loadProperties(this.currentPage + 1);
  }

  prevPage() {
    if (this.currentPage > 0) this.loadProperties(this.currentPage - 1);
  }
}