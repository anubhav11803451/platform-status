"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ServiceStatus } from "@/lib/db/schema";

interface Service {
    id: string;
    name: string;
    description: string;
    status: string;
    updatedAt: Date;
}

interface ServicesListProps {
    services: Service[];
}

export function ServicesList({ services }: ServicesListProps) {
    const [open, setOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [newStatus, setNewStatus] = useState<string | null>(null);
    const router = useRouter();

    const handleStatusUpdate = async () => {
        if (!selectedService || !newStatus) return;

        try {
            const response = await fetch(`/api/services/${selectedService.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error("Failed to update service status");
            }

            toast({
                title: "Status updated",
                description: `${selectedService.name} status has been updated to ${newStatus}.`,
            });
            setOpen(false);
            router.refresh();
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: "There was a problem updating the service status.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="grid gap-4">
            {services.map((service) => (
                <Card key={service.id}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>{service.name}</CardTitle>
                                <CardDescription>{service.description}</CardDescription>
                            </div>
                            <StatusBadge status={service.status} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Last updated: {new Date(service.updatedAt).toLocaleString()}
                            </div>
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        onClick={() => setSelectedService(service)}
                                    >
                                        Update Status
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Update Service Status</DialogTitle>
                                        <DialogDescription>
                                            Change the status of {selectedService?.name}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Select onValueChange={(value) => setNewStatus(value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={ServiceStatus.Operational}>
                                                Operational
                                            </SelectItem>
                                            <SelectItem value={ServiceStatus.Maintenance}>
                                                Maintenance
                                            </SelectItem>
                                            <SelectItem value={ServiceStatus.Outage}>
                                                Outage
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleStatusUpdate}>Update</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
            ))}
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
