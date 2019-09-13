import {async, TestBed} from '@angular/core/testing';
import {LocalStorageService} from './local-storage.service';
import {HomeComponent} from '../../../home/home/home.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ROUND_PROGRESS_DEFAULTS} from 'angular-svg-round-progressbar';
import {IConfig} from '../../interfaces';
import * as moment from 'moment';

describe('LocalStorageService', () => {
  const now: Date = new Date('2019-12-01T03:24:00');
  const key: string = 'config';
  const obj: IConfig = {counter: environment.configPHP.max, timestamp: now.getTime()}; // FIXME

  let service: LocalStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [
        {provide: 'moment', useFactory: (): any => moment},
        {
          provide: ROUND_PROGRESS_DEFAULTS,
          useValue: {
            color: '#0F0',
            background: '#F00'
          }
        }],
    }).compileComponents();

    service = TestBed.get(LocalStorageService);
    service.setItem(key, obj);
  }));

  // it('#setFreshAppConfigInLocalStorage should return value from observable', (done: DoneFn) => {
  //   service.setFreshAppConfigInLocalStorage(now).subscribe(value => {
  //     const d = now;
  //     d.setDate(now.getDate() + 10);
  //     expect(value.timestamp).toEqual(d.getTime());
  //     done();
  //   });
  // });

  it('should be created', async () => {
    await expect(service).toBeTruthy();
  });

  it('should be undefined after cleared', async () => {
    await expect(service.clear()).toBeUndefined();
  });

  it('should equal', async () => {
    await expect(service.getItem(key)).toEqual(obj);
  });

  it('should be null if key does not exist', async () => {
    await expect(service.getItem('some_config')).toBeNull();
  });

  it('should be null after remove key', async () => {
    service.removeItem(key);
    await expect(service.getItem(key)).toBeNull();
  });
});
