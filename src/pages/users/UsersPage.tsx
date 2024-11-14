import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useFetch from "@/hooks/useFetch";
import { userApi } from "../..//api/user.api";
import { Button } from "primereact/button";
import { useNavigate } from 'react-router-dom';

function UsersPage() {
  const navigate = useNavigate();
  const { data: data, isLoading } = useFetch(userApi.getUsers);

  const users = data?.data.filter((user:any) => user.role === "user");


  return (
    <div>
      <div className="text-right mb-3">
        <Button label="Create User" severity="info" icon="pi pi-plus" iconPos="left" size="small" onClick={() => navigate('/users/create')} />
      </div>
      <div className="p-card">
        <DataTable value={users} loading={isLoading} paginator rows={10}>
          <Column field="name" header="Name" />
          <Column field="phoneNumber" header="Phone" />
          <Column field="email" header="Email" />
          <Column field="points_available" header="Points Available" />
          <Column field="points_redeemed" header="Redeemed" />
        </DataTable>
      </div>
    </div>
  );
}

export default UsersPage;
