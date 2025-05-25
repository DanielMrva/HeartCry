import { Component, inject, Input, Output, EventEmitter, OnInit, computed, effect } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ChurchService } from '../../../services/churches/church.service';
import { ChurchName } from '../../../../types/types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-church-selector',
  templateUrl: './church-selector.component.html',
  styleUrls: ['./church-selector.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatAutocompleteModule, MatTooltipModule],
})
export class ChurchSelectorComponent implements OnInit {

  private churchService = inject(ChurchService);

  /** Pre‐select this ID when the list loads */
  @Input() initialChurchId: string | null = null;
  /** Emits the chosen church ID whenever it changes */
  @Output() churchSelected = new EventEmitter<string>();


  /** The raw FormControl that holds the selected church name */
  churchControl = new FormControl<string | ChurchName >('', { nonNullable: true });

  allChurchNames = this.churchService._churchNames;

  filteredChurchNames = computed(() => {
    const val = this.churchControl.value;
    const term = typeof val === 'string'
      ? val.trim().toLowerCase()
      : (typeof val === 'object' && val !== null && 'name' in val && typeof val.name === 'string'
        ? val.name.trim().toLowerCase()
        : '');

    return this.allChurchNames().filter(c => c.name.toLowerCase().includes(term) || c.id.toLowerCase().includes(term));
  });
  
  // Display function handles showing names in the select even though the control holds obects
  displayFunction = (val: string | ChurchName | null): string => typeof val === 'string' ? val : val?.name ?? '';





  ngOnInit() {
    // 1) Seed intial selection if we got an initialChurchId
    if (this.initialChurchId) {
      const match = this.allChurchNames().find(c => c.id === this.initialChurchId);
      if (match) {
        this.churchControl.setValue(match, {emitEvent: false});
      }
    }

    // 2) Whenever the control becomes a ChurchName, emit its ID
    effect(() => {
      const selection = this.churchControl.value;
      if (selection && typeof selection !== 'string') {
        this.churchSelected.emit(selection.id);
      }
    })

  }
}
