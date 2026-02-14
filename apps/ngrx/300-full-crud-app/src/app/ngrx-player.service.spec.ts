import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { createEntityAdapter } from '@ngrx/entity';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { Player } from './api-types';
import { playerEndpointLocation } from './api-urls';
import { NgrxPlayerService } from './ngrx-player.service';
import { playerPageActions } from './state/actions';
import {
  selectAssistsForPlayer,
  selectPlayersState
} from './state/selectors';
import { initialState } from './state/state';

const makeFakePlayer = (): Player => ({
  name: `Test User #${Math.floor(Math.random() * 1000)}`,
  id: `${Math.floor(Math.random() * 1000)}`
});

describe('The player service based on ngrx', () => {
  let service: NgrxPlayerService;
  let store: MockStore;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState }),
        NgrxPlayerService
      ]
    });
    service = TestBed.inject(NgrxPlayerService);
    store = TestBed.inject(MockStore);
    http = TestBed.inject(HttpTestingController);
  });

  it('provides a list of players', waitForAsync(() => {
    service.players.subscribe(players => expect(players).toEqual([]));
  }));

  it('gets individual players for you', waitForAsync(() => {
    const playerAdapter = createEntityAdapter<Player>();
    const state = playerAdapter.getInitialState();
    const testPlayer = {
      id: 'def',
      name: 'Kyle Cordes'
    };
    const newState = playerAdapter.setAll(
      [
        testPlayer,
        {
          id: 'abc',
          name: 'Jack Balbes'
        }
      ],
      state
    );
    store.overrideSelector(selectPlayersState, newState);
    service
      .player('def')
      .subscribe(player => expect(player).toBe(testPlayer));
  }));

  it('should add a player', async () => {
    // Arrange
    jest.spyOn(store, 'dispatch');
    const fakePlayer = makeFakePlayer();

    const promise = service.addPlayer(fakePlayer.name);

    const req = http.expectOne(playerEndpointLocation);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: fakePlayer.name
    });
    req.flush(fakePlayer);

    // Act
    await promise;

    // Assert
    expect(store.dispatch).toHaveBeenCalledWith(
      playerPageActions.addPlayer({ player: fakePlayer })
    );
  });
  it('should get a list of shots populated with player names', () => {
    const shots = [
      {
        id: 'fds',
        assist: 'abc',
        game: 'dasda',
        minute: 3,
        player: 'def',
        scored: true
      }
    ];
    const players = {
      def: {
        id: 'def',
        name: 'Test User'
      },
      abc: {
        id: 'abc',
        name: 'Test Assist'
      }
    };
    const result = selectAssistsForPlayer('abc').projector(
      shots,
      players
    );
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('fds');
    expect(result[0].playerName).toBe('Test User');
    expect(result[0].assistName).toBe('Test Assist');
  });
});
