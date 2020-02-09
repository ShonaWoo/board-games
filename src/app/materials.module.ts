import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';

let matModules = [MatGridListModule, MatInputModule, MatChipsModule, MatCardModule, MatButtonModule, MatCheckboxModule, MatToolbarModule];

@NgModule({
  declarations: [],
  imports: [
    matModules,
    CommonModule
  ],
  exports: matModules
})
export class MaterialsModule { }
