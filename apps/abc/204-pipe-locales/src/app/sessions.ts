import { ClassSession } from './api-types';

// Currency Codes are defined by
// https://en.wikipedia.org/wiki/ISO_4217

// Locale Codes are defined by https://en.wikipedia.org/wiki/ISO_639-1

export const upcomingSessions: ClassSession[] = [
  {
    location: 'Berlin',
    date: new Date('18 Feb 2025'),
    price: {
      amount: 500,
      currency: 'EUR'
    },
    locale: 'de'
  },
  {
    location: 'New York',
    date: new Date('18 Mar 2025'),
    price: {
      amount: 600
    }
  },
  {
    location: 'Moscow (Москва)',
    date: new Date('7 May 2025'),
    price: {
      amount: 50000,
      currency: 'RUB'
    },
    locale: 'ru'
  },
  {
    location: 'Beijing (北京市)',
    date: new Date('12 Jun 2025'),
    price: {
      amount: 4000,
      currency: 'CNY'
    },
    locale: 'zh'
  }
];
