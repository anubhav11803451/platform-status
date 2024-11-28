import { z } from "zod";

export const ServiceStatus = {
    Operational: "operational",
    Maintenance: "maintenance",
    Outage: "outage",
};

export const serviceSchema = z.object({
    id: z.string(),
    name: z.string().min(1).max(100),
    description: z.string().optional(),
    status: z.enum([ServiceStatus.Operational, ServiceStatus.Maintenance, ServiceStatus.Outage]),
    updatedAt: z.date(),
    createdAt: z.date(),
});

export const serviceUpdateSchema = z.object({
    id: z.string(),
    message: z.string().min(1),
    status: z.enum([ServiceStatus.Operational, ServiceStatus.Maintenance, ServiceStatus.Outage]),
    createdAt: z.date(),
});

export type Service = z.infer<typeof serviceSchema>;
export type ServiceUpdate = z.infer<typeof serviceUpdateSchema>;
