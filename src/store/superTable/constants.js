export const keys = [
  'id',
  'firstName',
  'lastName',
  'email',
  'phone',
  'street',
  'city',
  'state',
  'zip',
  'description',
]

export const initialState = {
  keys,

  data: null,
  sortedData: null,

  status: null,
  sortingKey: 'id',
  sortingDirection: 'asc',
}
