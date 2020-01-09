import {ConfigStore} from '../config.store';
import {ISourceKeys} from '../types';
import {Observable} from 'rxjs';
import {fromArray} from 'rxjs/internal/observable/fromArray';

describe('ConfigStore', () => {

  let store: ConfigStore<ISourceKeys>;
  const test_config: ISourceKeys[] = [
    {source: 'source_test_1', entity_type: 'entity_type_test_1', bundle: 'bundle_test_1'},
  ];
  beforeEach(() => {
    store = new ConfigStore<ISourceKeys>();
  });
  it('store должен быть создан', () => {
    expect(store).toBeTruthy();
  });


  describe('Methods', () => {
    beforeEach(() => {
      test_config.forEach((config: ISourceKeys) => store.set([config.source, config.entity_type], config.bundle, config));
    });

    describe('has', () => {
      it('store.has с СУЩЕСТВУЮЩИМ path и id должен возвращать true', () => {
        const {source, entity_type, bundle} = test_config[0];
        expect(store.has([source, entity_type], bundle)).toBeTruthy();
      });

      it('store.has с НЕ существующим path и id должен возвращать false', () => {

        const {source, entity_type, bundle} = test_config[0];

        const fake_key = 'fake_key';

        expect(store.has([fake_key, entity_type], bundle)).toBeFalsy();
        expect(store.has([source, fake_key], bundle)).toBeFalsy();
        expect(store.has([source, entity_type], fake_key)).toBeFalsy();
      });

    });

    describe('get', () => {
      it('store.get с СУЩЕСТВУЮЩИМ path и id должен возвращать соответствующий элемент', (done) => {
        const {source, entity_type, bundle} = test_config[0];
        store.get([source, entity_type], bundle)
          .subscribe((item: ISourceKeys) => {
            expect(item).toEqual(test_config[0]);
            done();
          });
      });

      it('store.get с НЕ существующим path и id должен возвращать null', (done) => {

        const {source, entity_type, bundle} = test_config[0];

        const fake_key = 'fake_key';

        fromArray([
            store.get([fake_key, entity_type], bundle),
            store.get([source, fake_key], bundle),
            store.get([source, entity_type], fake_key)
          ]
        ).subscribe(
          (obs: Observable<ISourceKeys>) => {
            obs.subscribe((item) => {
              expect(item).toEqual(null);
            });

          },
          () => done(),
          () => done());
      });
    });
  });
});
