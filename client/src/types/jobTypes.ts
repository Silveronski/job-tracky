export type JobType = {
    readonly _id: string,
    readonly __v: number,
    company: string,
    position: string,
    status: keyof typeof JobStatus,
    readonly createdBy: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
};

export const enum JobStatus {
    interview = 'interview',
    declined = 'declined',
    pending = 'pending'
};