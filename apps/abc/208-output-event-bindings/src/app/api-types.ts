export interface Item {
  quantity: number;
  description: string;
}

export interface Order {
  id: number;
  customer: string;
  items: Item[];
}

export const fakeApiOrders = [
  {
    id: 123,
    customer: 'Oasis Digital',
    items: [
      {
        quantity: 3,
        description: 'Widgets'
      },
      {
        quantity: 2,
        description: 'Thingamabobs'
      },
      {
        quantity: 6,
        description: 'Doodads'
      }
    ]
  },
  {
    id: 456,
    customer: 'Paul',
    items: [
      {
        quantity: 1,
        description: 'Sprockets'
      },
      {
        quantity: 26,
        description: 'Spanners'
      },
      {
        quantity: 9,
        description: 'Gizmos'
      }
    ]
  }
];
