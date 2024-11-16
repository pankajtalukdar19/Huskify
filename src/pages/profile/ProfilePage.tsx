import { useState, useRef } from "react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { profileApi } from "@/api/profile.api";
import { updateUser } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { User } from "@/types/auth.types";
import { useAppSelector } from "@/hooks/reduxHook";

function ProfilePage() {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const toast = useRef<Toast>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (name) formData.append("name", name);
    if (email) formData.append("email", email);
    if (avatar) formData.append("avatar", avatar);

    try {
      setIsUpdating(true);
      const { data }: { data: { data: User } } = await profileApi.updateProfile(
        formData
      );

      dispatch(updateUser(data?.data));

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Profile updated successfully",
      });
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update profile",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const onFileSelect = (e: { files: File[] }) => {
    if (e.files?.[0]) {
      setAvatar(e.files[0]);
    }
  };

  return (
    <div className="layout-card">
      <Toast ref={toast} />
      <div className="text-center mb-5">
        <h2 className="text-2xl font-bold m-0">Profile Settings</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-column gap-4">
        <div className="flex align-items-center justify-content-center gap-4 mb-4">
          <Avatar
            image={user?.avatarUrl}
            label={user?.name?.[0] || user?.phoneNumber?.[0]}
            size="xlarge"
            shape="circle"
            className="w-8rem h-8rem text-4xl"
          />
          <FileUpload
            mode="basic"
            accept="image/*"
            maxFileSize={1000000}
            onSelect={onFileSelect}
            chooseLabel="Change Avatar"
            className="flex-shrink-0"
          />
        </div>

        <div className="field">
          <label htmlFor="name" className="block text-900 font-medium mb-2">
            Name
          </label>
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full"
          />
        </div>

        <div className="field">
          <label htmlFor="email" className="block text-900 font-medium mb-2">
            Email
          </label>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
            className="w-full"
          />
        </div>

        <div className="field">
          <label className="block text-900 font-medium mb-2">
            Phone Number
          </label>
          <InputText value={user?.phoneNumber} disabled className="w-full" />
        </div>

        <Button
          type="submit"
          label="Update Profile"
          loading={isUpdating}
          className="w-full"
        />
      </form>
    </div>
  );
}

export default ProfilePage;
