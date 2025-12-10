import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PersonService } from '../../services/person';
import { Person, Page } from '../../user.model';
import { PersonForm } from "../person-form/person-form";
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-person-list',
  imports: [CommonModule, PersonForm],
  templateUrl: './person-list.html',
  styleUrl: './person-list.css',
})
export class PersonList implements OnInit {
  private personService = inject(PersonService);

  // Estado da Tabela
  data$: Observable<Page<Person> | null> = of(null);
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 10;

  // Estado do Modal
  isModalOpen = false;
  selectedPersonId: string | null = null;

  ngOnInit(): void {
    this.loadData();
  }

  // Carregamento de dados com paginação
  loadData(page: number = this.currentPage) {
    // Atribui o Observable direto, sem subscribe
    this.data$ = this.personService.findAll(page, this.pageSize).pipe(
      tap(response => {
        // Atualiza os contadores laterais
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
      }),
      catchError(err => {
        console.error('Erro', err);
        return of(null); // Retorna nulo em caso de erro para não quebrar a tela
      })
    );
  }
  // --- Ações do Modal ---

  openNew() {
    this.selectedPersonId = null;
    this.isModalOpen = true;
  }

  openEdit(id: string | undefined) {
    if (!id) return;
    this.selectedPersonId = id;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedPersonId = null;
  }

  onFormSaved() {
    this.loadData(); // Recarrega os dados após salvar/editar
    this.closeModal(); // Fecha o modal (opcional, caso o form já não feche)
  }

  // --- Ações de Registro ---

  onDelete(id: string | undefined) {
    if (!id) return;
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.personService.delete(id).subscribe({
        next: () => this.loadData(),
        error: (err) => alert('Erro ao excluir usuário')
      });
    }
  }

  // --- Paginação ---

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.loadData(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.loadData(this.currentPage - 1);
    }
  }
}