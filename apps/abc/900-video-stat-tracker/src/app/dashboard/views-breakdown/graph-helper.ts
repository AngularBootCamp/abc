import { FilterOptions, Video, VideoView } from '../dashboard.types';

const GRAPH_HEIGHT = 200;
const GRAPH_WIDTH = 500;
const ageRanges = [
  { label: 'Under 18', lower: 0, upper: 18, id: 'minor' },
  { label: '18 - 39', lower: 18, upper: 40, id: 'adults' },
  { label: '40 - 59', lower: 40, upper: 60, id: 'middleAged' },
  { label: '60 and up', lower: 60, upper: 999, id: 'retired' }
];

export class Rect {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  constructor(
    public value: string,
    public count: number
  ) {}
}

export class GraphData {
  rectList: Rect[];
  width: number;
  height: number;

  constructor(views: VideoView[], viewsFilter: FilterOptions) {
    this.height = GRAPH_HEIGHT;
    this.width = GRAPH_WIDTH;
    this.rectList = this.calcRectList(views, viewsFilter);
  }

  // In order to create the bars in the bar chart we need to perform the following
  // 1. Filter any values based on user input
  // 2. Identify all the unique values associated with the xAxis
  // 3. Count the number of views associated with each values
  // 4. Determine the largest of these categories
  // 5. Scale all counts based on largest and the graph height
  // 6. Divide the width of the graph amongst the number of unique values
  // 7. Assign widths and x positions accordingly
  calcRectList(views: VideoView[], viewsFilter: FilterOptions) {
    const rects: Rect[] = [];
    const filteredViews = filterViews(views, viewsFilter);
    if (filteredViews.length) {
      const groups = countBy(filteredViews, 'age');
      Object.entries(groups).forEach(([key, value]) => {
        rects.push(new Rect(key, value));
      });
      // rects now have value and count
      const maxRec = maxBy(rects, 'count');
      const maxValue = maxRec ? maxRec.count : 0;
      const width = GRAPH_WIDTH / rects.length - 1;
      rects.forEach((rect, index) => {
        rect.height = calcHeight(maxValue, rect.count, GRAPH_HEIGHT);
        rect.y = GRAPH_HEIGHT - rect.height;
        rect.width = width;
        rect.x = index * width;
      });
    }
    return rects;
  }
}

export function getGraphData(
  currentVideo: Video,
  viewsFilterState: FilterOptions
) {
  return new GraphData(currentVideo.viewDetails, viewsFilterState);
}

function calcHeight(
  maxValue: number,
  value: number,
  graphHeight: number
) {
  return Math.floor((value / maxValue) * graphHeight);
}

function filterViews(views: VideoView[], viewsFilter: FilterOptions) {
  const fromDate = new Date(viewsFilter.dateFrom);
  const toDate = new Date(viewsFilter.dateTo);

  const filteredResults = views.filter(view => {
    // Age range
    if (
      !ageRanges.find(
        range =>
          view.age >= range.lower &&
          view.age < range.upper &&
          !!viewsFilter[range.id]
      )
    ) {
      return false;
    }

    // Check the region
    if (
      viewsFilter.region !== view.region &&
      viewsFilter.region !== 'All'
    ) {
      return false;
    }

    // Check the view date
    const videoDate = new Date(view.date);
    return isWithinInterval(videoDate, {
      start: fromDate,
      end: toDate
    });
  });
  return filteredResults;
}

// Simplified and typed port of lodash's countBy, which doesn't
// work on StackBlitz
function countBy(
  collection: VideoView[],
  property: keyof VideoView
): Record<string | number, number> {
  return collection.reduce(
    (result, value) => {
      const key = value[property];
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        ++result[key];
      } else {
        result[key] = 1;
      }
      return result;
    },
    {} as Record<string, number>
  );
}

// Simplified and typed port of maxBy's countBy, which doesn't
// work on StackBlitz
function maxBy<T>(array: T[], property: keyof T): T | undefined {
  let result: T | undefined = undefined;

  let computed: T[keyof T] | undefined = undefined;
  for (const value of array) {
    const current: T[keyof T] = value[property];

    if (
      current !== undefined &&
      current !== null &&
      (computed === undefined || computed === null
        ? current === current
        : current > computed)
    ) {
      computed = current;
      result = value;
    }
  }
  return result;
}

// Simplified port of date-fns's countBy, which doesn't work on
// StackBlitz
function isWithinInterval(
  date: Date,
  interval: { start: Date; end: Date }
): boolean {
  const time = Number(date);
  const startTime = Number(interval.start);
  const endTime = Number(interval.end);

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(startTime <= endTime)) {
    throw new RangeError('Invalid interval');
  }

  return time >= startTime && time <= endTime;
}
