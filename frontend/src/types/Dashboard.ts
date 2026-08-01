export interface MonthlyRevenue {
  year: number;
  month: number;
  revenue: number;
}

export interface DashboardData {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  monthlyRevenue: MonthlyRevenue[];
  orderByStatus: Record<string, number>;
  productCountByCategory: Record<string, number>;
}
