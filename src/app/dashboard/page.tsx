"use client";
import CardPopularProducts from "./CardPopularProducts";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardSalesSummary from "./CardSalesSummary";
const Dashboard = () => {
  return (
    <div className="grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />

      <div className="row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-gray-500" />
      <div className="row-span-3 bg-gray-500 " />
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500" />
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500" />
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500" />
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
