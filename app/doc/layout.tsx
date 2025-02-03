import LiveBlocksProviderComp from '@/components/LiveBlocksProvider'
import React from 'react'

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <LiveBlocksProviderComp>{children}</LiveBlocksProviderComp>
  )
}

export default PageLayout