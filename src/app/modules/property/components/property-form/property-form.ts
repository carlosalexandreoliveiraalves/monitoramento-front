import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyService } from '../../services/property-service';
import { PersonService } from '../../../user/services/person';
import { Person } from '../../../user/user.model';
import { PropertyDTO } from '../property.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './property-form.html',
  styleUrl: './property-form.css',
})
export class PropertyForm implements OnInit {

  // Inputs e Outputs para comunicação com o componente pai (List)
  @Input() propertyId: string | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private propertyService = inject(PropertyService);
  private personService = inject(PersonService);

  form: FormGroup;
  peopleList: Person[] = [];
  isLoading = false;

  constructor() {
    this.form = this.fb.group({
      areaHa: ['', [Validators.required]],
      address: ['', [Validators.required]],
      personId: [null, [Validators.required]] // O Backend espera o ID da pessoa
    });
  }

  ngOnInit(): void {
    this.loadPeople();

    // Se tiver ID, carrega os dados para edição
    if (this.propertyId) {
      this.loadPropertyData(this.propertyId);
    }
  }

  // Carrega a lista de usuários para o Dropdown
  loadPeople() {
    this.personService.findAll(0, 100).subscribe({
      next: (res) => this.peopleList = res.content,
      error: () => console.error('Erro ao carregar lista de proprietários')
    });
  }

  // Busca os dados da propriedade para preencher o form
  loadPropertyData(id: string) {
    this.isLoading = true;
    this.propertyService.findById(id).subscribe({
      next: (prop) => {
        this.form.patchValue({
          areaHa: prop.areaHa,
          address: prop.address,
          personId: prop.person?.id || null // Extrai o ID do objeto person
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Erro ao carregar dados.');
        this.close.emit();
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const dto: PropertyDTO = this.form.value;

    if (this.propertyId) {
      // Atualizar
      this.propertyService.update(this.propertyId, dto).subscribe({
        next: () => {
          this.isLoading = false;
          this.saved.emit(); // Avisa o pai que salvou
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          alert('Erro ao atualizar propriedade.');
        }
      });
    } else {
      // Criar
      this.propertyService.save(dto).subscribe({
        next: () => {
          this.isLoading = false;
          this.saved.emit();
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          alert('Erro ao criar propriedade.');
        }
      });
    }
  }

  onCancel() {
    this.close.emit();
  }
}