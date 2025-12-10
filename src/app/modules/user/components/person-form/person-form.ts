import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonService } from '../../services/person';

@Component({
  selector: 'app-person-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.html',
  styleUrl: './person-form.css',
})
export class PersonForm implements OnChanges {
  fb = inject(FormBuilder);
  personService = inject(PersonService);

  // Recebe o ID do pai (se for nulo, é criação)
  @Input() personId: string | null = null;

  // Avisa o pai para fechar o modal
  @Output() close = new EventEmitter<void>();

  // Avisa o pai que salvou (para atualizar a lista)
  @Output() saved = new EventEmitter<void>();

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]]
    });
  }

  // Monitora mudanças no Input personId
  ngOnChanges(changes: SimpleChanges): void {
    if (this.personId) {
      this.loadPerson(this.personId);
    } else {
      this.form.reset(); // Limpa se for novo
    }
  }

  loadPerson(id: string) {
    this.personService.findById(id).subscribe({
      next: (person) => this.form.patchValue(person),
      error: () => alert('Erro ao carregar usuário')
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const personDTO = this.form.value;

    const request = this.personId
      ? this.personService.update(this.personId, personDTO)
      : this.personService.create(personDTO);

    request.subscribe({
      next: () => {
        alert(this.personId ? 'Atualizado!' : 'Criado!');
        this.saved.emit(); // Avisa o pai para recarregar a lista
        this.close.emit(); // Fecha o modal
      },
      error: () => alert('Erro ao salvar')
    });
  }
}