import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeviceService } from '../../services/device-service';
import { PropertyService } from '../../../property/services/property-service';
import { Property } from '../../../property/components/property.model';
import { DeviceDTO } from '../../device.model';

@Component({
  selector: 'app-device-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './device-form.html',
  styleUrl: './device-form.css',
})
export class DeviceForm implements OnInit {

  @Input() deviceId: string | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private deviceService = inject(DeviceService);
  private propertyService = inject(PropertyService);
  private cdr = inject(ChangeDetectorRef); // <--- INJEÇÃO NECESSÁRIA

  form: FormGroup;
  propertiesList: Property[] = [];
  isLoading = false;

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      status: ['Active', [Validators.required]],
      propertyId: [null, [Validators.required]],
      temperature: [''],
      phProbe: [''],
      turbidity: ['']
    });
  }

  ngOnInit(): void {
    this.loadProperties();

    if (this.deviceId) {
      this.loadDeviceData(this.deviceId);
    }
  }

  loadProperties() {
    this.propertyService.findAll(0, 100).subscribe({
      next: (res) => {
        this.propertiesList = res.content;
        this.cdr.detectChanges(); // Atualiza dropdown
      },
      error: () => console.error('Erro ao carregar propriedades')
    });
  }

  loadDeviceData(id: string) {
    this.isLoading = true;
    this.deviceService.findById(id).subscribe({
      next: (dev) => {
        this.form.patchValue({
          name: dev.name,
          status: dev.status,
          temperature: dev.temperature,
          phProbe: dev.phProbe,
          turbidity: dev.turbidity,
          propertyId: dev.property?.id || null
        });

        // --- CORREÇÃO DO LOADING INFINITO ---
        this.isLoading = false;
        this.cdr.detectChanges(); // Força a tela a remover o loading
        // ------------------------------------
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.cdr.detectChanges();
        alert('Erro ao carregar dados do dispositivo.');
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
    const dto: DeviceDTO = this.form.value;

    const request$ = this.deviceId
      ? this.deviceService.update(this.deviceId, dto)
      : this.deviceService.save(dto);

    request$.subscribe({
      next: () => {
        this.isLoading = false;
        this.saved.emit();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        alert('Erro ao salvar dispositivo.');
        this.cdr.detectChanges();
      }
    });
  }

  onCancel() {
    this.close.emit();
  }
}