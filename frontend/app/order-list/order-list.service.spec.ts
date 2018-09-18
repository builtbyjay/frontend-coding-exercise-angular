import { async, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';

import { OrderListService } from './order-list.service';
import { OrderListResponse } from './order-list.interfaces';

describe('OrderListService', (): void => {
  let httpMock: HttpTestingController;
  let service: OrderListService;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderListService]
    });

    service = TestBed.get(OrderListService);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('getPage', (): void => {
    it('should return the response', async((): void => {
      const mockData = {
        page: 1,
        pageSize: 75,
        total: 4,
        count: 64,
        items: []
      };

      service.getPage(4).subscribe((response: OrderListResponse) => {
        expect(response).toEqual(mockData);
      });
      const req: TestRequest = httpMock
        .expectOne('http://localhost:4300/orders?page=4');
      req.flush(mockData);
      httpMock.verify();
    }));

    /**
     * Would want to improve this test by running inside a
     * fakeAsync zone and ticking 500ms to test the delay.
     */
  });
});
