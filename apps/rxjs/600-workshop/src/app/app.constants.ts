export const selectedPlayerIdRouteParamName = 'playerId';
export const selectedGameIdRouteParamName = 'gameId';
export enum cardTypes {
  red = 'red',
  yellow = 'yellow'
}
export const cardTypesList = Object.values(cardTypes);

// Local API server
// const apiUrl = '/api';

// Hosted API server
const apiUrl = 'https://api.angularbootcamp.com';

export const playerEndpointLocation = apiUrl + '/soccer/players';
export const gameEndpointLocation = apiUrl + '/soccer/games';
export const goalEndpointLocation = apiUrl + '/soccer/shotsongoal';
export const cardEndpointLocation = apiUrl + '/soccer/cards';
