import { useState, useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { userApi } from "@/api/user.api";
import { couponApi } from "@/api/coupon.api";
import { useAppSelector } from "@/hooks/reduxHook";
import { InputText } from "primereact/inputtext";

const VendorDetails = () => {
  const [visible, setVisible] = useState(false);
  const [coins, setCoins] = useState<number>(0);
  const [generatedCoupon, setGeneratedCoupon] = useState<{
    code: string;
    points: number;
  } | null>(null);
  const [showInput, setShowInput] = useState(true);
  const toast = useRef<Toast>(null);
  const user = useAppSelector((state) => state.auth.user);
  const { id } = useParams();
  const { data: vendorData } = useFetch(() => userApi.getUserById(id || ""));

  const handleRedeem = async () => {
    try {
      const response = await couponApi.createCoupon({
        userId: user?._id || "",
        vendorId: id || "",
        coins,
      });

      // Set the generated coupon details
      setGeneratedCoupon({
        code: response.data?.data.coupon.code,
        points: response.data?.data.coupon.coins,
      });
      setShowInput(false);

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Coupon generated successfully!",
      });
    } catch (error) {
      console.log("error", error);

      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to generate coupon",
      });
    }
  };

  const handleClose = () => {
    setVisible(false);
    setShowInput(true);
    setGeneratedCoupon(null);
    setCoins(0);
  };

  const handleCopyCode = () => {
    if (generatedCoupon?.code) {
      navigator.clipboard.writeText(generatedCoupon.code);
      toast.current?.show({
        severity: "info",
        summary: "Copied",
        detail: "Coupon code copied to clipboard!",
      });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Card title={vendorData?.data?.name || "Vendor Details"}>
          <div className="flex flex-column gap-4">
            <div className="text-xl">
              Available Points: {user?.points_available || 0}
            </div>
            <Button
              type="button"
              label="Redeem"
              onClick={() => setVisible(true)}
            />
          </div>
        </Card>
      </div>

      <Dialog
        header="Redeem Points"
        visible={visible}
        onHide={handleClose}
        style={{ width: "30vw" }}
      >
        {showInput ? (
          <div className="flex flex-column gap-4">
            <div className="field">
              <label
                htmlFor="coins"
                className="block text-900 font-medium mb-2"
              >
                Enter number of coins
              </label>
              <InputNumber
                id="coins"
                value={coins}
                onValueChange={(e) => setCoins(e.value || 0)}
                min={0}
                max={user?.points_available || 0}
                showButtons
                className="w-full"
              />
            </div>
            <Button
              label="Generate Coupon"
              onClick={handleRedeem}
              disabled={coins <= 0 || coins > (user?.points_available || 0)}
            />
          </div>
        ) : (
          <div className="flex flex-column gap-4">
            <div className="field">
              <label className="block text-900 font-medium mb-2">
                Your Coupon Code
              </label>
              <div className="p-inputgroup">
                <InputText
                  value={generatedCoupon?.code || ""}
                  readOnly
                  className="w-full"
                />
                <Button
                  icon="pi pi-copy"
                  onClick={handleCopyCode}
                  tooltip="Copy Code"
                />
              </div>
            </div>

            <Button label="Close" severity="secondary" onClick={handleClose} />
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default VendorDetails;
