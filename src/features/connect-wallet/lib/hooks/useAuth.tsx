import { useCallback } from 'react'
import { ConnectorNotFoundError, SwitchChainNotSupportedError, useAccount, useConnect, useDisconnect, /* useDisconnect */ } from 'wagmi'
import { ConnectorNames } from '../config/wallet'


const useAuth = () => {
  const { connectAsync, connectors } = useConnect()
  const { chain } = useAccount()
  const { disconnectAsync } = useDisconnect()
  //const { chainId } = useActiveChainId()
  const { chainId } = useAccount()
  //const [, setSessionChainId] = useSessionChainId()

  const login = useCallback(
    async (connectorID: ConnectorNames) => {
      const findConnector = connectors.find((c) => c.id === connectorID)
      try {
        if (!findConnector) return undefined

        const connected = await connectAsync({ connector: findConnector, chainId })
        if (connected.chainId !== chainId) {
          //replaceBrowserHistory('chain', CHAIN_QUERY_NAME[connected.chainId])
          //setSessionChainId(connected.chainId)
        }
        return connected
      } catch (error) {
        if (error instanceof ConnectorNotFoundError) {
          throw new Error()
        }
        if (
          error instanceof SwitchChainNotSupportedError
          // TODO: wagmi
          // || error instanceof SwitchChainError
        ) {
          throw new Error(('Unable to switch network. Please try it on your wallet'))
        }
      }
      return undefined
    },
    [connectors, connectAsync, chainId],
  )

  const logout = useCallback(async () => {
    try {
      await disconnectAsync()
    } catch (error) {
      console.error(error)
    } finally {
      console.log("wallet logout");
      //clearUserStates(dispatch, { chainId: chain?.id })
    }
  }, [disconnectAsync, chain?.id])

  return { login, logout }
}

export default useAuth
