import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoProgressbarComponent } from './todo-progressbar.component';

describe('TodoProgressbarComponent', () => {
  let component: TodoProgressbarComponent;
  let fixture: ComponentFixture<TodoProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoProgressbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
