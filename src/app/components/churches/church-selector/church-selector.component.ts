import { Component, inject, Input, Output, EventEmitter, OnInit, computed, effect } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ChurchService } from '../../../services/churches/church.service';
import { ChurchName } from '../../../../types/types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-church-selector',
  templateUrl: './church-selector.component.html',
  styleUrls: ['./church-selector.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatAutocompleteModule, MatTooltipModule, CommonModule],
})
export class ChurchSelectorComponent implements OnInit {
  @Input() initialChurchId: string | null = null;
  @Output() churchSelected = new EventEmitter<string>();

  churchControl = new FormControl<string | ChurchName>('', { nonNullable: true });
  private churchService = inject(ChurchService);
  allChurchNames = this.churchService._churchNames;

  filteredChurchNames = computed(() => {
    const v = this.churchControl.value;
    const term = typeof v === 'string'
      ? v.toLowerCase().trim()
      : (v?.name.toLowerCase().trim() ?? '');
    return this.allChurchNames()
      .filter(c => c.name.toLowerCase().includes(term) || c.id.toLowerCase().includes(term));
  });

  displayFunction = (v: string | ChurchName | null) =>
    typeof v === 'string' ? v : v?.name ?? '';

  ngOnInit() {
    // seed initial value
    if (this.initialChurchId) {
      const match = this.allChurchNames().find(c => c.id === this.initialChurchId);
      if (match) {
        this.churchControl.setValue(match, { emitEvent: false });
      }
    }

    // subscribe so typing/selection both emit your id
    this.churchControl.valueChanges.subscribe(value => {
      if (value && typeof value !== 'string') {
        this.churchSelected.emit(value.id);
      }
    });
  }

  onOptionSelected(church: ChurchName) {
    this.churchSelected.emit(church.id);
  }
}