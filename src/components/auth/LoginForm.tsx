import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useAuth } from "../../hooks/useAuth";

function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { requestOtp, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await requestOtp({ phoneNumber });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-column gap-3">
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">+91</span>
        <InputText
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          keyfilter="num"
          maxLength={10}
          disabled={isLoading}
        />
      </div>
      {error && <Message severity="error" text={error} />}
      <Button
        type="submit"
        label="Get OTP"
        loading={isLoading}
        disabled={!phoneNumber || phoneNumber.length !== 10}
      />
    </form>
  );
}

export default LoginForm;
