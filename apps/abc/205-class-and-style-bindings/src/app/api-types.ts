export interface RegionRecord {
  regionName: string;
  saleRecords: {
    empName: string;
    units: number;
    totalRevenue: number;
    rank: number;
  }[];
}
