import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPageDetailComponent } from './project-page-detail.component';

describe('ProjectPageDetailComponent', () => {
  let component: ProjectPageDetailComponent;
  let fixture: ComponentFixture<ProjectPageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPageDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
