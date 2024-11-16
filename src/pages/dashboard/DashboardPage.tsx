import { Card } from "primereact/card";
import { useAppSelector } from "@/hooks/reduxHook";

function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="p-4">
      <Card title="Welcome" className="mb-4">
        <p className="m-0">Welcome back, {user?.name}!</p>
      </Card>

      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <Card title="Total Points Earned">
            <h2 className="m-0">{user?.points_available}</h2>
          </Card>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <Card title="Points Used">
            <h2 className="m-0">{user?.points_redeemed}</h2>
          </Card>
        </div>
        {/* Add more dashboard cards as needed */}
      </div>
    </div>
  );
}

export default DashboardPage;
