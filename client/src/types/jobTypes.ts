type JobType = {
    readonly _id: string,
    readonly __v: number,
    readonly createdBy: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    status: 'interview' | 'declined' | 'pending',
    jobType: 'full-time' | 'part-time' | 'remote' | 'internship',
    company: string,
    position: string,
};