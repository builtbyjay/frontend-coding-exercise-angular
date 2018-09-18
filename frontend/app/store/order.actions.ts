export class LoadOrders {
  static readonly type = '[Order List API] Load Orders';
  constructor(public page: number = 1) {}
}

export class LoadMoreOrders {
  static readonly type = '[Order List API] Load Next Page Of Orders';
}

export class LoadOrdersLoading {
  static readonly type = '[Order List API] Orders Are Being Requested';
}
