import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { taskApi } from '@/api/taskList.api'; // Adjust the path to your API file
import { Button } from 'primereact/button';

const UserEarnDetails = () => {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(id);
        
        const fetchTasks = async () => {
            try {
                const response = await taskApi.getTaskById(id || " ");
                console.log(response.data);
                
                setTasks(response?.data?.data?.data || []);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTasks();
        }
    }, [id]);

    return (
        <div className="p-card">
            <DataTable value={tasks} loading={loading} paginator rows={10}>
                <Column field="name" header="Task Name" />
                <Column field="earnPoints" header="Earn Points" />
                <Column field="createdBy.name" header="Created By" />
                <Column
                    header="Actions"
                    body={(rowData) => (
                        <Button label="Details" onClick={() => console.log(rowData)} />
                    )}
                />
            </DataTable>
        </div>
    );
};

export default UserEarnDetails;