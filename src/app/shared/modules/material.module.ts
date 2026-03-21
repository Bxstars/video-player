import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  exports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule
  ],
})
export class MaterialModule {}
