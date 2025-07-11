import TextContainer from "@/components/shared/TextContainer";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import TransactionsTable from "./components/TransactionsTable";

const TransactionHistory = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <TextContainer title="Transaction History" Component={TempFilter} />
      </div>

      <div className="flex items-center justify-center w-full shadow-xs">
        <TransactionsTable />
      </div>
    </div>
  );
};

export default TransactionHistory;

// Remove later
const TempFilter = () => {
  return (
    <div className="border border-[#e6e6e6] rounded-[6px] px-2.5 h-8 flex items-center gap-2">
      <div>
        <CircleChevronLeft className="size-5 text-[#4F4D55]" />
      </div>
      <div>
        <h6 className="text-[#4F4D55] font-roboto font-normal text-sm tracking-[-1%]">
          From 2024-2025
        </h6>
      </div>
      <div>
        <CircleChevronRight className="size-5 text-[#4F4D55]" />
      </div>
    </div>
  );
};
