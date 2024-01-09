export interface DialogRoot {
  accountId: number
  dialogId: number
  dialogType: string
  name: string
  lastDate: string
  entity: Entity
  dialog: Dialog
  lastSyncDate: string
  lastSyncMessage: number
  dialogDeleted: boolean
  createDate: string
  lastUpdateDate: string
}

export interface Entity {
  _: string
  id: number
  bot: boolean
  min: boolean
  fake: boolean
  scam: boolean
  color: any
  phone: string
  photo: any
  status: Status
  contact: boolean
  deleted: boolean
  is_self: boolean
  premium: boolean
  support: boolean
  username: any
  verified: boolean
  lang_code: any
  last_name: string
  usernames: any[]
  first_name: string
  restricted: boolean
  access_hash: number
  bot_nochats: boolean
  bot_can_edit: boolean
  close_friend: boolean
  emoji_status: any
  profile_color: any
  bot_inline_geo: boolean
  mutual_contact: boolean
  stories_hidden: boolean
  stories_max_id: any
  apply_min_photo: boolean
  bot_attach_menu: boolean
  bot_chat_history: boolean
  bot_info_version: any
  restriction_reason: any[]
  attach_menu_enabled: boolean
  stories_unavailable: boolean
  bot_inline_placeholder: any
}

export interface Status {
  _: string
  expires: string
}

export interface Dialog {
  _: string
  pts: any
  peer: Peer
  draft: any
  pinned: boolean
  folder_id: any
  ttl_period: any
  top_message: number
  unread_mark: boolean
  unread_count: number
  notify_settings: NotifySettings
  read_inbox_max_id: number
  read_outbox_max_id: number
  unread_mentions_count: number
  unread_reactions_count: number
  view_forum_as_messages: boolean
}

export interface Peer {
  _: string
  user_id: number
}

export interface NotifySettings {
  _: string
  silent: any
  ios_sound: any
  mute_until: any
  other_sound: any
  android_sound: any
  show_previews: any
  stories_muted: any
  stories_ios_sound: any
  stories_hide_sender: any
  stories_other_sound: any
  stories_android_sound: any
}
