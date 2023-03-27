const userSchema = {
  description: 'User',
  $id: 'user',
  type: 'object',
  required: ['id', 'name', 'username'],
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    role_id: { type: 'integer' },
    role: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    },
    username: { type: 'string' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
    deleted_at: { type: 'string' },
  },
}

const shipmentSchema = {
  $id: 'shipment',
  type: 'object',
  required: [
    'id',
    'user_id',
    'status',
    'purchase_order',
    'volume',
    'license_plate',
    'station',
    'started_at',
    'finished_at',
  ],
  properties: {
    id: { type: 'integer' },
    user_id: { type: 'integer' },
    user: { ref: '#user' },
    status: { type: 'integer' },
    purchase_order: { type: 'string' },
    volume: { type: 'number' },
    license_plate: { type: 'string' },
    station: { type: 'integer' },
    started_at: { type: 'string' },
    finished_at: { type: 'string' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
    deleted_at: { type: 'string' },
  },
}

const shipmentTypeSchema = {
  $id: 'shipmentType',
  type: 'object',
  required: ['id', 'description'],
  properties: {
    id: { type: 'integer' },
    description: { type: 'string' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
    deleted_at: { type: 'string' },
  },
}

const parameterSchema = {
  $id: 'parameter',
  type: 'object',
  required: ['id', 'user_id', 'title', 'description', 'value'],
  properties: {
    id: { type: 'integer' },
    user_id: { type: 'integer' },
    user: { ref: '#user' },
    title: { type: 'string' },
    description: { type: 'string' },
    value: { type: 'number' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
  },
}

export default {
  $id: 'app/schemas',
  type: 'object',
  definitions: {
    userSchema: userSchema,
    shipmentSchema: shipmentSchema,
    shipmentTypeSchema: shipmentTypeSchema,
    parameterSchema: parameterSchema,
  },
}
