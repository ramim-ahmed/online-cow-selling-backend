import { model, Schema } from 'mongoose';
import { breed, location } from './cow.constants';
import { CowCategory, CowModel, ICow } from './cow.interface';

const cowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      requried: true,
      enum: location,
    },
    breed: {
      type: String,
      required: true,
      enum: breed,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: ['for sale', 'sold out'],
      default: 'for sale',
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(CowCategory),
    },
    seller: {
      type: Schema.Types.ObjectId, // User ---- ObjectId
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cow = model<ICow, CowModel>('cow', cowSchema);
