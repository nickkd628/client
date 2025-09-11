"use client";
import CardPopularProducts from "./CardPopularProducts";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardSalesSummary from "./CardSalesSummary";
import CardExpensiveSummary from "./CardExpensiveSummary";
import StatCard from "./StatCard";
import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
const Dashboard = () => {
  return (
    <div className="grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <CardExpensiveSummary />
      <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="text-blue-600" />}
        dateRange="22-29 October 2023"
        details={[
          {
            title: "Customer Growth ",
            amount: "175.00",
            changePercent: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Expenses ",
            amount: "10.00",
            changePercent: -56,
            IconComponent: TrendingDown,
          },
        ]}
      />

      <StatCard
        title="Dues & pending orders"
        primaryIcon={<CheckCircle className="text-blue-600" />}
        dateRange="22-29 October 2023"
        details={[
          {
            title: "Dues ",
            amount: "250.00",
            changePercent: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Pending orders ",
            amount: "147",
            changePercent: -56,
            IconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Sales & Discount"
        primaryIcon={<Tag className="text-blue-600" />}
        dateRange="22-29 October 2023"
        details={[
          {
            title: "Sales ",
            amount: "1000.00",
            changePercent: 20,
            IconComponent: TrendingUp,
          },
          {
            title: "Discount ",
            amount: "200.00",
            changePercent: -10,
            IconComponent: TrendingDown,
          },
        ]}
      />
    </div>

    // <div className="space-y-6">
    //   {/* Content will be loaded here */}
    //   <div className="bg-white p-6 rounded-lg shadow border">
    //     <p className="text-gray-500 text-center py-8">Dashboard content will be displayed here</p>
    //   </div>
    // </div>
  );
};

export default Dashboard;
