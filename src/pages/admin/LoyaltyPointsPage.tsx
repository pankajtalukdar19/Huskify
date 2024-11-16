import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useFetch from "@/hooks/useFetch";
import { loyaltyApi } from "../../api/loyalty.api";

function LoyaltyPointsPage() {
  const { data: points, isLoading } = useFetch(loyaltyApi.getLoyaltyPoints, {
    query: undefined,
    payload: "no-Data",
  });

  return (
    <div className="card">
      <h2 className="mb-4">Loyalty Points Management</h2>
      <DataTable value={points?.data} loading={isLoading} paginator rows={10}>
        <Column field="user.name" header="User" />
        <Column field="points" header="Points" />
        <Column field="lastUpdated" header="Last Updated" />
        <Column field="status" header="Status" />
      </DataTable>
    </div>
  );
}

export default LoyaltyPointsPage;
