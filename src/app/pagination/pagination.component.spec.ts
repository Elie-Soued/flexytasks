import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Pagination component is rendered correctly', () => {
    const previous = fixture.debugElement.query(By.css('#previous'));
    const next = fixture.debugElement.query(By.css('#next'));
    expect(previous).toBeTruthy();
    expect(next).toBeTruthy();
  });

  it('the previous function is called correctly', () => {
    const previousFunction = spyOn(component, 'previousPage');
    const previousBtn = fixture.debugElement.query(
      By.css('#previous')
    ).nativeElement;
    previousBtn.click();
    expect(previousFunction).toHaveBeenCalled();
  });

  it('the next function is called correctly', () => {
    const nextFunction = spyOn(component, 'nextPage');
    const nextBtn = fixture.debugElement.query(By.css('#next')).nativeElement;
    nextBtn.click();
    expect(nextFunction).toHaveBeenCalled();
  });
});
