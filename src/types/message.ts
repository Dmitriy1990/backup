export interface Message {
  id: number
  messageId: number
  messageDate: string
  fromId: number
  from: string
  text: string
  textRaw: string
  messageRaw: string
  downloadable: boolean
  lastSyncDate: string
  deletable: boolean
  deleted: boolean
  createDate: string
  lastUpdateDate: string
}
