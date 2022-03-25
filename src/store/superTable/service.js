import { keys } from './constants'

export async function getData() {
  const url =
    'http://www.filltext.com/?rows=1000&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

  const response = await fetch(url)

  if (!response.ok) throw new Error()

  const responseData = await response.json()

  return responseData.map((item, index) => {
    const { address, ...rest } = item
    item = { ...address, ...rest }

    item.id = index

    // просто глаза мазолит
    item.street = item.streetAddress
    delete item.streetAddress

    const map = new Map()

    for (const key of keys) {
      map.set(key, item[key])
    }

    item = Object.fromEntries(map.entries())

    return item
  })
}

export function search(data, query) {
  if (query === '') return data

  //* exact match by id
  if (query.startsWith('#')) {
    if (query === '#') return data

    const foundItem = data.find((item) => {
      return item.id.toString() === query.slice(1)
    })

    return foundItem ? [foundItem] : []
  }

  return data.filter((item) => {
    //* case-insensitive by email
    const isMatchesByEmail = item.email
      .toLowerCase()
      .includes(query.toLowerCase())

    //* by phone in any format
    const formatPhoneNumber = (value) => value.replace(/[()\s-]/g, '')
    // prettier-ignore
    const isMatchesByPhone =
      formatPhoneNumber(item.phone).includes(formatPhoneNumber(query))

    //* by full name
    const [firstNameFromQuery, lastNameFromQuery] = query.split(' ')

    // prettier-ignore
    const isMatchesByFullName =
      item.firstName.startsWith(query) ||
      item.lastName.startsWith(query)  ||
      item.firstName === firstNameFromQuery &&
      item.lastName.startsWith(lastNameFromQuery)

    //* by other
    const otherKeys = Object.keys(item).filter((key) => {
      return !['id', 'email', 'phone', 'firstName', 'lastName'].includes(key)
    })

    const isMatchesByOther = !!otherKeys.filter((key) => {
      return item[key].includes(query)
    }).length

    return (
      isMatchesByEmail ||
      isMatchesByPhone ||
      isMatchesByFullName ||
      isMatchesByOther
    )
  })
}
