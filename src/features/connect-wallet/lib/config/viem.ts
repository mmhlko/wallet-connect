export const CLIENT_CONFIG = {
  batch: {
    multicall: {
      batchSize: 1024 * 200,
      wait: 16,
    },
  },
  pollingInterval: 6_000,
}

// export const publicClient = ({ chainId }: { chainId?: ChainId }) => {
//   if (chainId && viemClients[chainId]) {
//     return viemClients[chainId]
//   }
//   let httpString: string | undefined

//   if (process.env.NODE_ENV === 'test' && chainId === mainnet.id) {
//     httpString = PUBLIC_MAINNET
//   } else {
//     httpString = chainId && first(PUBLIC_NODES[chainId]) ? first(PUBLIC_NODES[chainId]) : undefined
//   }

//   const chain = CHAINS.find((c) => c.id === chainId)
//   return createPublicClient({ chain, transport: http(httpString), ...CLIENT_CONFIG })
// }