import { vendorApi } from '@/api/vendor.api'
import useFetch from '@/hooks/useFetch'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useNavigate } from 'react-router-dom'

const UserRedeeme = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    const { data, isLoading } = useFetch(() => vendorApi.getVendorByAddress(user?.address || " "));

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

    return (
        <div>
            <div className="p-card">
                <DataTable value={data?.data} loading={isLoading} paginator rows={10}>
                    <Column field="name" header="Name" />
                    <Column field="phoneNumber" header="Phone" />
                    <Column field="email" header="Email" />
                    <Column field="address" header="HMG Node" />
                    <Column field="points_available" header="Points Available" />
                    <Column field="points_redeemed" header="Redeemed" />
                    <Column body={actionBodyTemplate} header="Action" /> 
                </DataTable>
            </div>
        </div>
    );
}

export default UserRedeeme;