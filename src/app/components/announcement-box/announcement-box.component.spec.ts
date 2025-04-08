import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementBoxComponent } from './announcement-box.component';

describe('AnnouncementBoxComponent', () => {
  let component: AnnouncementBoxComponent;
  let fixture: ComponentFixture<AnnouncementBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
