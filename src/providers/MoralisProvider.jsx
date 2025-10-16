import React from 'react'
import { MoralisProvider as MoralisProviderBase } from 'react-moralis'
import { moralisConfig, networkConfig } from '../config/moralis'

const MoralisProvider = ({ children }) => {
  return (
    <MoralisProviderBase
      appId={moralisConfig.appId}
      serverUrl={moralisConfig.serverUrl}
      initializeOnMount={true}
    >
      {children}
    </MoralisProviderBase>
  )
}

export default MoralisProvider
