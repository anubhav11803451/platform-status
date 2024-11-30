import { Suspense } from "react";
import { ServicesList } from "@/components/admin/services-list";
import { CreateService } from "@/components/admin/create-service";
import { ServiceStatus } from "@/lib/db/schema";

const services = [
    {
        id: "1",
        name: "API",
        description: "Main API service",
        status: ServiceStatus.Operational,
        updatedAt: new Date(),
    },
    {
        id: "2",
        name: "Web App",
        description: "Customer facing web application",
        status: ServiceStatus.Maintenance,
        updatedAt: new Date(),
    },
];

export default async function ServicesPage() {
    // const services = await getServices();

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Services</h1>
                <CreateService />
            </div>
            <Suspense fallback={<div>Loading services...</div>}>
                <ServicesList services={services} />
            </Suspense>
        </div>
    );
}
