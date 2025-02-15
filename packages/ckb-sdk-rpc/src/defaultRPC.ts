import paramsFmts from './paramsFormatter'
import resultFmts from './resultFormatter'

const defaultRPC: CKBComponents.Method[] = [
  {
    name: 'getBlockByNumber',
    method: 'get_block_by_number',
    paramsFormatters: [paramsFmts.toNumber],
    resultFormatters: resultFmts.toBlock,
  },
  {
    name: 'getBlock',
    method: 'get_block',
    paramsFormatters: [paramsFmts.toHash],
    resultFormatters: resultFmts.toBlock,
  },
  {
    name: 'getTransaction',
    method: 'get_transaction',
    paramsFormatters: [paramsFmts.toHash, paramsFmts.toNumber, paramsFmts.toNumber],
    resultFormatters: resultFmts.toTransactionWithStatus,
  },
  {
    name: 'getBlockHash',
    method: 'get_block_hash',
    paramsFormatters: [paramsFmts.toNumber],
  },
  {
    name: 'getTipHeader',
    method: 'get_tip_header',
    paramsFormatters: [],
    resultFormatters: resultFmts.toHeader,
  },
  {
    name: 'getCellsByLockHash',
    method: 'get_cells_by_lock_hash',
    paramsFormatters: [paramsFmts.toHash, paramsFmts.toNumber, paramsFmts.toNumber],
    resultFormatters: resultFmts.toCellsIncludingOutPoint,
  },
  {
    name: 'getLiveCell',
    method: 'get_live_cell',
    paramsFormatters: [paramsFmts.toOutPoint],
    resultFormatters: resultFmts.toCellWithStatus,
  },
  {
    name: 'getTipBlockNumber',
    method: 'get_tip_block_number',
    paramsFormatters: [],
    resultFormatters: resultFmts.toNumber,
  },
  {
    name: 'getBlockchainInfo',
    method: 'get_blockchain_info',
    paramsFormatters: [],
    resultFormatters: resultFmts.toBlockchainInfo,
  },
  {
    name: 'sendTransaction',
    method: 'send_transaction',
    paramsFormatters: [paramsFmts.toRawTransaction],
    resultFormatters: resultFmts.toHash,
  },
  {
    name: 'localNodeInfo',
    method: 'local_node_info',
    paramsFormatters: [],
    resultFormatters: resultFmts.toNodeInfo,
  },
  {
    name: 'txPoolInfo',
    method: 'tx_pool_info',
    paramsFormatters: [],
    resultFormatters: resultFmts.toTxPoolInfo,
  },
  {
    name: 'getPeers',
    method: 'get_peers',
    paramsFormatters: [],
    resultFormatters: resultFmts.toPeers,
  },
  {
    name: 'getPeersState',
    method: 'get_peers_state',
    paramsFormatters: [],
    resultFormatters: resultFmts.toPeersState,
  },
  {
    name: 'getCurrentEpoch',
    method: 'get_current_epoch',
    paramsFormatters: [],
    resultFormatters: resultFmts.toEpoch,
  },
  {
    name: 'getEpochByNumber',
    method: 'get_epoch_by_number',
    paramsFormatters: [paramsFmts.toNumber],
    resultFormatters: resultFmts.toEpoch,
  },
  {
    name: 'dryRunTransaction',
    method: 'dry_run_transaction',
    paramsFormatters: [paramsFmts.toRawTransaction],
  },
  {
    name: 'deindexLockHash',
    method: 'deindex_lock_hash',
    paramsFormatters: [paramsFmts.toHash],
  },
  {
    name: 'getLiveCellsByLockHash',
    method: 'get_live_cells_by_lock_hash',
    paramsFormatters: [paramsFmts.toHash, paramsFmts.toPageNumber, paramsFmts.toPageSize, paramsFmts.toReverseOrder],
    resultFormatters: resultFmts.toLiveCellsByLockHash,
  },
  {
    name: 'getLockHashIndexStates',
    method: 'get_lock_hash_index_states',
    paramsFormatters: [],
    resultFormatters: resultFmts.toLockHashIndexStates,
  },
  {
    name: 'getTransactionsByLockHash',
    method: 'get_transactions_by_lock_hash',
    paramsFormatters: [paramsFmts.toHash, paramsFmts.toPageNumber, paramsFmts.toPageSize, paramsFmts.toReverseOrder],
    resultFormatters: resultFmts.toTransactionsByLockHash,
  },
  {
    name: 'indexLockHash',
    method: 'index_lock_hash',
    paramsFormatters: [paramsFmts.toHash],
    resultFormatters: resultFmts.toLockHashIndexState,
  },
]

export class DefaultRPC {
  protected defaultMethods = defaultRPC

  /**
   * @method getBlockByNumber
   * @memberof DefaultRPC
   * @description rpc to get block by its number
   * @param {string} number - the block number of the target block
   * @returns {Promise<object>} block object
   */
  public getBlockByNumber!: (number: CKBComponents.BlockNumber) => Promise<CKBComponents.Block>

  /**
   * @method getBlockByNumber
   * @memberof DefaultRPC
   * @description rpc to get block by its hash
   * @param {string} hash - the block hash of the target block
   * @returns {Promise<object>} block object
   */
  public getBlock!: (hash: CKBComponents.Hash) => Promise<CKBComponents.Block>

  /**
   * @method getTransaction
   * @memberof DefaultRPC
   * @description rpc to get trasnaction by its hash
   * @param {string} hash - the transaction hash of the target transaction
   * @return {Promise<object>} transaction object
   */
  public getTransaction!: (hash: CKBComponents.Hash) => Promise<CKBComponents.Transaction>

  /**
   * @method getBlockHash
   * @memberof DefaultRPC
   * @description rpc to get the block hash by block number
   * @param {string} hash - block hash
   * @return {Promise<string>} block hash
   */
  public getBlockHash!: (number: CKBComponents.BlockNumber) => Promise<CKBComponents.Hash>

  /**
   * @method getTipHeader
   * @memberof DefaultRPC
   * @description rpc to get the tip header of the longeest blockchain
   * @return {Promise<object>} block header
   */
  public getTipHeader!: () => Promise<CKBComponents.BlockHeader>

  /**
   * @method getCellsByLockHash
   * @memberof DefaultRPC
   * @description rpc to get the collection of cells who have the corresponding lockhash,
   *              the meaning of lockhash could be found in ckb-types
   * @param {string} hash - hash of cell's lock script
   * @param {string} from - the start block number
   * @param {string} to - the end block number
   * @return {object[]} array of objects including lock script, capacity, outPoint
   */
  public getCellsByLockHash!: (
    hash: CKBComponents.Hash256,
    from: CKBComponents.BlockNumber,
    to: CKBComponents.BlockNumber
  ) => Promise<CKBComponents.CellIncludingOutPoint[]>

  /**
   * @method getLiveCell
   * @memberof DefaultRPC
   * @description rpc to get a cell by outPoint, the meaning of outPoint could be found in ckb-types,
   *              please distinguish outPoint and cellOutPoint
   * @param {object} outPoint - cell's outPoint
   * @return {Promise<object>} cellWithStatus
   */
  public getLiveCell!: (
    outPoint: CKBComponents.OutPoint
  ) => Promise<{
    cell: CKBComponents.Cell
    status: CKBComponents.CellStatus
  }>

  /**
   * @method getTipBlockNumber
   * @memberof DefaultRPC
   * @description rpc to get the number of blocks in the longest blockchain
   * @return {Promise<string>} block number
   */
  public getTipBlockNumber!: () => Promise<CKBComponents.BlockNumber>

  /**
   * @method sendTransaction
   * @memberof DefaultRPC
   * @description rpc to send a new transaction into transaction pool
   * @param {object} rawTransaction - a raw transaction includes deps, inputs, outputs, version, and witnesses,
   *                                  detailed info could be found in ckb-types
   * @return {Promise<string>} transaction hash
   */
  public sendTransaction!: (tx: CKBComponents.RawTransaction) => Promise<CKBComponents.Hash>

  /**
   * @method getBlockchainInfo
   * @memberof DefaultRPC
   * @description rpc to get state info of the blockchain
   * @return {Promise<object>} blockchain info, including chain name, difficulty, epoch number,
   *                           is_intial_block_download, median time, warnings
   */
  public getBlockchainInfo!: () => Promise<CKBComponents.BlockchainInfo>

  /**
   * @method localNodeInfo
   * @memberof DefaultRPC
   * @description rpc to get the local node information
   * @return {Promise<object>} node info, including addresses, is_outbound, node id, and version
   */
  public localNodeInfo!: () => Promise<CKBComponents.NodeInfo>

  /**
   * @method txPoolInfo
   * @memberof DefaultRPC
   * @description rpc to get pool information
   * @return {Promise<object>} info of transaction pool, including last_txs_updated_at, number of orphan,
   *                           number of pending, number of proposed
   */
  public txPoolInfo!: () => Promise<CKBComponents.TxPoolInfo>

  /**
   * @method getPeers
   * @memberof DefaultRPC
   * @description rpc to get connected peers info
   * @return {Promise<object[]>} peers' node info
   */
  public getPeers!: () => Promise<CKBComponents.NodeInfo[]>

  /**
   * @method getPeersState
   * @memberof DefaultRPC
   * @description rpc to get state info of peers
   * @return {Promise<object[]>} peers' state info, including blocks_in_flight, last_updated, peer number
   */
  public getPeersState!: () => Promise<CKBComponents.PeersState>

  /**
   * @method getCurrentEpoch
   * @memberof DefaultRPC
   * @description rpc to get the epoch info about the current epoch
   * @return {Promise<object>} epoch info, including block reward, difficulty, last_block_hash_in_previous_epoch,
   *                           length, number, remainder reward, start number
   */
  public getCurrentEpoch!: () => Promise<CKBComponents.Epoch>

  /**
   * @method getEpochByNumber
   * @memberof DefaultRPC
   * @description rpc to get the epoch info by its number
   * @return {Promise<object>} epoch info
   */
  public getEpochByNumber!: (epoch: string) => Promise<CKBComponents.Epoch>

  /**
   * @method dryRunTransaction
   * @memberof DefaultRPC
   * @description dry run the transaction and return the execution cycles, this method will not check the transaction
   *              validaty, but only run the lock script and type script and then return the execution cycles.
   * @param {object} rawTrasnaction - the raw transaction whose cycles is going to be calculated
   * @return {Promise<object>} dry run result, including cycles the transaction used.
   */
  public dryRunTransaction!: (tx: CKBComponents.RawTransaction) => Promise<CKBComponents.RunDryResult>

  /**
   * @method deindexLockHash
   * @memberof DefaultRPC
   * @description remove index for live cells and transaction by the hash of lock script,
   *              returns empty array when the `lock_hash` not indexed yet.
   * @param {string} lockHash
   * @retrun {Promise<null}
   */
  public deindexLockHash!: (lockHash: CKBComponents.Hash256) => Promise<null>

  /**
   * @method getLiveCellsByLockHash
   * @memberof DefaultRPC
   * @description return the live cells collection by the hash of lock script
   * @param {string} lockHash, the hash of lock script
   * @param {string} pageNumber
   * @param {string} pageSize, max value is 50
   * @param {boolean} [reverseOrder], return the live cells collection in reverse order,
   *                                  an optional parameter, default to be false
   * @return {Promise<object[]>}
   */
  public getLiveCellsByLockHash!: (
    lockHash: CKBComponents.Hash256,
    pageNumber: string,
    pageSize: string,
    reverseOrder?: boolean
  ) => Promise<CKBComponents.LiveCellsByLockHash>

  /**
   * @method getLockHashIndexStates
   * @memberof DefaultRPC
   * @description get lock hash index states
   * @retrun {Promise<object[]>}
   */
  public getLockHashIndexStates!: () => Promise<CKBComponents.LockHashIndexStates>

  /**
   * @method getTransactionsByLockHash
   * @memberof DefaultRPC
   * @description retrun the transactions collection by the hash of lock script.
   *              return empty array when the `lock_hash` not indexed yet.
   * @param {string} lockHash, the hash of lock script
   * @param {string} pageNumber
   * @param {string} pageSize, max value is 50
   * @param {boolean} [reverseOrder], return the transactions collection in reverse order,
   *                                  an optional parameter, default to be false
   */
  public getTransactionsByLockHash!: (
    lockHash: CKBComponents.Hash256,
    pageNumber: string,
    pageSize: string,
    reverseOrder?: boolean
  ) => Promise<CKBComponents.TransactionsByLockHash>

  /**
   * @method indexLockHash
   * @memberof DefaultRPC
   * @description create index for live cells and transactions by the hash of lock script
   * @param {string} lockHash, the hash of lock script
   * @param {string} [indexFrom], the starting block number(exclusive), an optional parameter,
   *                              null means starting from the tip and 0 means starting from genesis
   */
  public indexLockHash!: (
    lockHash: CKBComponents.Hash,
    indexFrom?: CKBComponents.BlockNumber
  ) => Promise<CKBComponents.LockHashIndexState>
}

export default DefaultRPC
