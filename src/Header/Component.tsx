import { getStaticGlobal } from '@/data/staticData'
import type { Header } from '@/payload-types'
import { HeaderClient } from './Component.client'

export async function Header() {
  const headerData: Header | null = getStaticGlobal<Header>('header')

  if (!headerData) {
    // Return minimal header if no data
    return <HeaderClient data={{} as Header} />
  }

  return <HeaderClient data={headerData} />
}
