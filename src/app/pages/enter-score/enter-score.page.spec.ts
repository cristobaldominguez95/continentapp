import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterScorePage } from './enter-score.page';

describe('EnterScorePage', () => {
  let component: EnterScorePage;
  let fixture: ComponentFixture<EnterScorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterScorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterScorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
