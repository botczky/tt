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
