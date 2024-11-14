import React from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const VendorDetails = () => {
    return (
        <div>
            <div className="card">
                <Card title="Simple Card">
                    <Button type="submit" label="Redeem" />
                </Card>
            </div>
        </div>
    )
}

export default VendorDetails