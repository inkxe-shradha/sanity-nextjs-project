import { type SchemaTypeDefinition } from 'sanity';
import { customerTypes } from './customerTypes';
import orderTypes from './orderTypes';
import { categoryType } from './categoryTypes';
import { productType } from './productTypes';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [customerTypes, categoryType, productType, orderTypes],
};
