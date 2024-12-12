import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevouserComponent } from './nuevouser.component';

describe('NuevouserComponent', () => {
  let component: NuevouserComponent;
  let fixture: ComponentFixture<NuevouserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevouserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevouserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
