import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { taskApi } from "@/api/taskList.api";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import useFetch from "@/hooks/useFetch";

const UserEarn = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useFetch(taskApi?.getTask);

    const actionBodyTemplate = (rowData: any) => {
        return (
            <Button
                type="button"
                label="Details"
                className="p-button-sm p-button-info"
                onClick={() => navigate(`${rowData._id}`)}
            />
        );
    };

    const createdByTemplate = (rowData: any) => {
        return rowData.createdBy?.name || "N/A"; 
    };

    return (
        <div>
            <div className="p-card">
                <DataTable value={data?.data || []} paginator rows={10} loading={isLoading}>
                    <Column field="name" header="Name" />
                    <Column body={createdByTemplate} header="Vendor" />
                    <Column field="earnPoints" header="Points" />
                    <Column body={actionBodyTemplate} header="Action" />
                </DataTable>
            </div>
        </div>
    );
};

export default UserEarn;