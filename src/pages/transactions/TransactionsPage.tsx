import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useFetch from "@/hooks/useFetch";
import { transactionApi } from "../../api/transaction.api";
import { Tag } from "primereact/tag";

function TransactionsPage() {
  const { data: transactions, isLoading } = useFetch(
    transactionApi.getTransactions,
    {
      query: undefined,
      payload: "no-Data",
    }
  );

  const statusTemplate = (rowData: any) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const getSeverity = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "danger";
      default:
        return null;
    }
  };

  return (
    <div className="card">
      <h2 className="mb-4">Transactions</h2>
      <DataTable
        value={transactions?.data}
        loading={isLoading}
        paginator
        rows={10}
      >
        <Column field="id" header="Transaction ID" />
        <Column field="date" header="Date" />
        <Column field="amount" header="Amount" />
        <Column field="type" header="Type" />
        <Column field="status" header="Status" body={statusTemplate} />
      </DataTable>
    </div>
  );
}

export default TransactionsPage;
