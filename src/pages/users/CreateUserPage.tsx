import { useRef, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { userApi } from "@/api/user.api";
import { UserPayload } from "../../types/user.types"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";

const CreateUserPage = () => {
    const toast = useRef<Toast>(null);
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [points, setPoints] = useState("");
    const [hmgnode, setHmgnode] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const hmgNodes = [
        { label: 'Siliguri', value: '6496a090af5038a0822ad354' },
        { label: 'Jalpaiguri', value: '6496a090af5038a0822ad354' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userPayload: UserPayload = {
            name:name,
            email:email,
            phoneNumber:phoneNumber,
            points_available: points ? Number(points) : 0,
            address: hmgnode,
            role:"user",
        };

        try {
            setIsUpdating(true);
            await userApi.addUsers(userPayload);
            toast.current?.show({severity: "success", summary: "Success", detail: "User created successfully" });
            navigate('/users')
        } catch (error) {
            toast.current?.show({ severity: "error", summary: "Error", detail: "Failed to create user", });
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="layout-card">
            <Toast ref={toast} />
            <form onSubmit={handleSubmit} className="flex flex-column gap-4">
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
                    <label htmlFor="phoneNumber" className="block text-900 font-medium mb-2">
                        Phone Number
                    </label>
                    <InputText
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number"
                        type="text"
                        className="w-full"
                    />
                </div>
                <div className="field">
                    <label htmlFor="points" className="block text-900 font-medium mb-2">
                        Points
                    </label>
                    <InputText
                        id="points"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        placeholder="Enter points"
                        type="text"
                        className="w-full"
                    />
                </div>
                <div className="field">
                    <label htmlFor="hmgnode" className="block text-900 font-medium mb-2">
                        HMG Node
                    </label>
                    <Dropdown
                        id="hmgnode"
                        value={hmgnode}
                        onChange={(e) => setHmgnode(e.value)}
                        options={hmgNodes}
                        placeholder="Select HMG Node"
                        className="w-full"
                    />
                </div>
                <Button
                    type="submit"
                    label="Create User"
                    loading={isUpdating}
                    className="w-full"
                />
            </form>
        </div>
    );
};

export default CreateUserPage;