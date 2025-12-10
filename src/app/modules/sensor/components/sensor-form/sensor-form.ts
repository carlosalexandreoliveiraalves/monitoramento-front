import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SensorService } from '../../services/sensor-service';
import { DeviceService } from '../../../device/services/device-service';
import { Device } from '../../../device/device.model';
import { SensorDTO } from '../../sensor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sensor-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sensor-form.html',
  styleUrl: './sensor-form.css',
})
export class SensorForm implements OnInit {

  @Input() sensorId: string | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private sensorService = inject(SensorService);
  private deviceService = inject(DeviceService);
  private cdr = inject(ChangeDetectorRef); // <--- INJEÇÃO NECESSÁRIA

  form: FormGroup;
  deviceList: Device[] = [];
  isLoading = false;

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      sensorType: ['Temperature', [Validators.required]],
      deviceId: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadDevices();

    if (this.sensorId) {
      this.loadSensorData(this.sensorId);
    }
  }

  loadDevices() {
    this.deviceService.findAll(0, 100).subscribe({
      next: (res) => {
        this.deviceList = res.content;
        this.cdr.detectChanges(); // Garante que o dropdown atualize
      },
      error: () => console.error('Erro ao carregar dispositivos')
    });
  }

  loadSensorData(id: string) {
    this.isLoading = true;
    this.sensorService.findById(id).subscribe({
      next: (sensor) => {
        this.form.patchValue({
          name: sensor.name,
          sensorType: sensor.sensorType,
          deviceId: sensor.device?.id || null
        });

        // --- CORREÇÃO DO LOADING INFINITO ---
        this.isLoading = false;
        this.cdr.detectChanges(); // Força a tela a remover o loading
        // ------------------------------------
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.cdr.detectChanges(); // Força atualização mesmo em erro
        alert('Erro ao carregar dados do sensor.');
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
    const dto: SensorDTO = this.form.value;

    const request$ = this.sensorId
      ? this.sensorService.update(this.sensorId, dto)
      : this.sensorService.save(dto);

    request$.subscribe({
      next: () => {
        this.isLoading = false;
        this.saved.emit();
        this.cdr.detectChanges(); // Atualiza tela
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        alert('Erro ao salvar sensor.');
        this.cdr.detectChanges(); // Atualiza tela
      }
    });
  }

  onCancel() {
    this.close.emit();
  }
}