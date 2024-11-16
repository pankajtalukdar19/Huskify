import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import useFetch from "@/hooks/useFetch";
import { couponApi } from "@/api/coupon.api";
import { Coupon } from "@/types/coupon.types";
import { useAppSelector } from "@/hooks/reduxHook";

const CouponsPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: couponsData, isLoading } = useFetch(() =>
    couponApi.getUserCoupons(user?._id || "")
  );

  const statusBodyTemplate = (rowData: Coupon) => {
    const severity = {
      generated: "success",
      used: "info",
      expired: "danger",
    }[rowData.status] as "success" | "info" | "danger";

    return <Tag value={rowData.status.toUpperCase()} severity={severity} />;
  };

  const dateBodyTemplate = (rowData: Coupon) => {
    return new Date(rowData.expiryDate).toLocaleDateString();
  };

  return (
    <div className="p-card">
      <DataTable
        value={couponsData?.data}
        loading={isLoading}
        paginator
        rows={10}
      >
        <Column field="code" header="Coupon Code" />
        <Column field="coins" header="Points" />
        <Column field="vendorId.name" header="Vendor" />
        <Column field="status" header="Status" body={statusBodyTemplate} />
        <Column
          field="expiryDate"
          header="Expires On"
          body={dateBodyTemplate}
        />
      </DataTable>
    </div>
  );
};

export default CouponsPage;
