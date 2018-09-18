import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

import { OrderListComponent } from './order-list.component';
import { OrderListItemComponent } from '../order-list-item/order-list-item.component';
import { OrderListService } from './order-list.service';
import { OrderListState } from '../store/order.state';

@NgModule({
  declarations: [
    OrderListComponent,
    OrderListItemComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forFeature([
      OrderListState
    ])
  ],
  providers: [
    OrderListService
  ]
})
export class OrderListModule {}
