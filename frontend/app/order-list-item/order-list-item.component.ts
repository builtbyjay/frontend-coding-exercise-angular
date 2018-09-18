import { Component, Input } from '@angular/core';
import { Order } from '../order-list/order-list.interfaces';

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss']
})
export class OrderListItemComponent {
  @Input() public order: Order;
}
