import { Schema, Types } from 'mongoose';

export default interface SubmittedForm {
    _id: Types.ObjectId,
    form: Object,
    createdAt?: Date,
    updatedAt?: Date,
}

export const submitFormSchema = new Schema<SubmittedForm>(
    {
        form: {
            type: [Schema.Types.Mixed, { strict: false }],
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
