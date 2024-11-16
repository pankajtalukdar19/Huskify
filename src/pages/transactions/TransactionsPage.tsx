import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import useFetch from "@/hooks/useFetch";
import { transactionApi } from "@/api/transaction.api";
import { Transaction } from "@/types/transaction.types";
import { useAppSelector } from "@/hooks/reduxHook";

const TransactionsPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: transactionsData, isLoading } = useFetch(() =>
    transactionApi.getUserTransactions(user?._id || "")
  );

  const typeBodyTemplate = (rowData: Transaction) => {
    const severity =
      rowData.type === "earn"
        ? "success"
        : rowData.type === "generate"
        ? "info"
        : "warning";
    return <Tag value={rowData.type} severity={severity} />;
  };

  const pointsBodyTemplate = (rowData: Transaction) => {
    const prefix =
      rowData.type === "earn" ? "+" : rowData.type === "generate" ? "" : "-";
    return (
      <span
        className={
          rowData.type === "earn"
            ? "text-green-500"
            : rowData.type === "generate"
            ? "text-blue-500"
            : "text-red-500"
        }
      >
        {prefix}
        {rowData.points}
      </span>
    );
  };

  const dateBodyTemplate = (rowData: Transaction) => {
    return new Date(rowData.createdAt).toLocaleDateString();
  };

  const couponBodyTemplate = (rowData: Transaction) => {
    return rowData.couponId ? rowData.couponId.code : "-";
  };

  return (
    <div className="p-card">
      <DataTable
        value={transactionsData?.data}
        loading={isLoading}
        paginator
        rows={10}
        className="p-datatable-striped"
      >
        <Column field="type" header="Type" body={typeBodyTemplate} />
        <Column field="points" header="Points" body={pointsBodyTemplate} />
        <Column field="vendorId.name" header="Vendor" />
        <Column field="description" header="Description" />
        <Column field="couponId" header="Coupon" body={couponBodyTemplate} />
        <Column field="createdAt" header="Date" body={dateBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default TransactionsPage;
