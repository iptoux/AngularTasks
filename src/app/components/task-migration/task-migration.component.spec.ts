import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMigrationComponent } from './task-migration.component';

describe('TaskMigrationComponent', () => {
  let component: TaskMigrationComponent;
  let fixture: ComponentFixture<TaskMigrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskMigrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskMigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
