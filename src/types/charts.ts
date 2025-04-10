export interface SalesDataPoint {
  date: string;
  value: number;
}

export interface ProductPerformance {
  name: string;
  sales: number;
}

export interface ChartDimensions {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}
