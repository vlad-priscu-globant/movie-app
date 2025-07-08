import type { SearchResult } from "../types/types.ts";

const baseUrl = 'http://localhost:3000/'


export async function fetchWatchList() {
  const res = await fetch(`${baseUrl}watchlist`)
  if (!res.ok) throw new Error(`Failed to fetch watchlist: ${res.status}`)
  return res.json()
}
export async function fetchWatchListItem(id: number) {
  const res = await fetch(`${baseUrl}watchlist/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch watchlist: ${res.status}`)
  return res.json()
}


export async function addWatchList(data: Partial<SearchResult>) {
  const res = await fetch(`${baseUrl}watchlist`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Failed to fetch watchlist: ${res.status}`)
  return res.json()
}

export async function removeFromWatchList(data: Partial<SearchResult>) {
  const res = await fetch(`${baseUrl}watchlist/${data.id}`, {
    method: 'DELETE',
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Failed to fetch watchlist: ${res.status}`)
  return res.json()
}