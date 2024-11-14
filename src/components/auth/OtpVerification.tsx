import { useState } from "react";
import { useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useAuth } from "../../hooks/useAuth";
import type { RootState } from "../../store";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const phoneNumber = useSelector((state: RootState) => state.auth.phoneNumber);
  const { verifyOtp, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber) {
      await verifyOtp({ phoneNumber, otp });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-column gap-3">
      <InputText
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        keyfilter="num"
        maxLength={6}
        disabled={isLoading}
      />
      {error && <Message severity="error" text={error} />}
      <Button
        type="submit"
        label="Verify OTP"
        loading={isLoading}
        disabled={!otp || otp.length !== 6}
      />
    </form>
  );
}

export default OtpVerification;
