import { Schema, Types } from 'mongoose';

export default interface SubmittedForm {
    _id: Types.ObjectId,
    formData: Object,
    createdAt?: Date,
    updatedAt?: Date,
}

export const submitFormSchema = new Schema<SubmittedForm>(
    {
        formData: {
            type: [Schema.Types.Mixed],
        },
        createdAt: {
            type: Schema.Types.Date,
            required: true,
            select: false,
        },
        updatedAt: {
            type: Schema.Types.Date,
            required: true,
            select: false,
        },
    },
    {
        versionKey: false,
    },
);
