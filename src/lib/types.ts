export type CueStatus = 'pending' | 'confirmed' | 'followup'
export type TabId = 'live' | 'backstage' | 'terms' | 'offline'

export interface Speaker {
  id: string
  name: string
  title: string
  language: string
  color: string
}

export interface Session {
  id: string
  order: number
  time: string
  title: string
  speakerId: string
  room: string
  status: 'upcoming' | 'live' | 'done'
}

export interface Term {
  id: string
  source: string
  target: string
  note: string
  speakerId: string
  priority: 'normal' | 'high'
}

export interface Announcement {
  id: string
  level: 'info' | 'warning' | 'urgent'
  text: string
  visibleOnStage: boolean
  createdAt: string
}

/** 问答接力期间留在切入段落上的处理记录 */
export interface QaNote {
  id: string
  asker: string
  question: string
  answer: string
  startedAt: number
  endedAt: number
}

/** 问答接力会话：切入后到回到演讲前的整段问答 */
export interface QaSession {
  anchorCueId: string
  resumedCueId: string
  startedAt: number
  questionCueIds: string[]
}

export interface Cue {
  id: string
  speakerId: string
  text: string
  receivedAt: number
  status: CueStatus
  manual: boolean
  offline: boolean
  delaySeconds: number
  duplicateOf: string | null
  followupText: string
  tags: string[]
  /** speech = 演讲正文；question = 问答环节录入的问题 */
  kind: 'speech' | 'question'
  /** 提问人（仅问题条目） */
  asker: string
  /** 问答进行期间到达、排在问题之后的演讲内容 */
  qaQueued: boolean
  /** 问答结束后留在切入段落旁的记录 */
  qaNotes: QaNote[]
}

export interface Reminder {
  id: string
  termId: string
  cueId: string
  target: string
  createdAt: number
  acknowledged: boolean
}

export interface DeskState {
  speakers: Speaker[]
  sessions: Session[]
  terms: Term[]
  announcements: Announcement[]
  cues: Cue[]
  reminders: Reminder[]
  activeCueId: string
  fontScale: number
  online: boolean
  liveSimulation: boolean
  qa: QaSession | null
  updatedAt: string
}
