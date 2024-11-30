import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceStatus } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";

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

export default function StatusPage() {
    const operationalCount = services.filter((s) => s.status === ServiceStatus.Operational).length;
    const maintenanceCount = services.filter((s) => s.status === ServiceStatus.Maintenance).length;
    const outageCount = services.filter((s) => s.status === ServiceStatus.Outage).length;

    return (
        <div className="min-h-screen bg-muted/50">
            <div className="container mx-auto py-8">
                <div className="mb-8">
                    <h1 className="mb-2 text-4xl font-bold">System Status</h1>
                    <p className="text-muted-foreground">Current status of our services</p>
                </div>
                <div className="grid gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Service Status Summary</CardTitle>
                            <CardDescription>
                                {operationalCount} Operational, {maintenanceCount} Maintenance,{" "}
                                {outageCount} Outage
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {services.map((service) => (
                                    <div
                                        key={service.id}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div>
                                            <h3 className="font-medium">{service.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {service.description}
                                            </p>
                                        </div>
                                        <StatusBadge status={service.status} />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const variants = {
        [ServiceStatus.Operational]: "bg-green-500",
        [ServiceStatus.Maintenance]: "bg-yellow-500",
        [ServiceStatus.Outage]: "bg-red-500",
    };

    return (
        <Badge className={variants[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    );
}
