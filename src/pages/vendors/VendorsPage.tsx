import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useFetch from "@/hooks/useFetch";
import { Button } from "primereact/button";
import { userApi } from "@/api/user.api";
import { useNavigate } from "react-router-dom";

function VendorsPage() {
  const navigate = useNavigate();
  const { data: users, isLoading } = useFetch(userApi.getUsers);

  const vendors = users?.data.filter((user:any) => user.role === "vendor");

  return (
    <>
      <div className="text-right mb-3">
        <Button
          label="Create Vendor"
          severity="info"
          icon="pi pi-plus"
          iconPos="left"
          size="small"
          onClick={() => navigate('/vendors/create')}
        />
      </div>
      <div className="p-card">
        <DataTable value={vendors} loading={isLoading} paginator rows={10}>
          <Column field="name" header="Name" />
          <Column field="phoneNumber" header="Phone" />
          <Column field="email" header="Email" />
          <Column field="points_available" header="Points Available" />
          <Column field="points_redeemed" header="Redeemed" />
        </DataTable>
      </div>
    </>
  );
}

export default VendorsPage;