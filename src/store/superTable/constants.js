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
  filteredData: null,
  slicedData: null,

  status: null,
  sortingKey: 'id',
  sortingDirection: 'asc',
  searchQuery: '',
  page: 1,
  maxPage: 1,
}
