import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsSharedUiComponent } from './libs-shared-ui.component';

describe('LibsSharedUiComponent', () => {
  let component: LibsSharedUiComponent;
  let fixture: ComponentFixture<LibsSharedUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsSharedUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibsSharedUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
