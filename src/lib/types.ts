export type AxisKey = 'SC' | 'EF' | 'AM' | 'PL'
export type Pole = 'S' | 'C' | 'E' | 'F' | 'A' | 'M' | 'P' | 'L'

export type ScaleValue = -3 | -2 | -1 | 0 | 1 | 2 | 3

export type Question = {
  id: number
  axis: AxisKey
  prompt: string
  positivePole: Pole
  reverse?: boolean
}

export type BlockMeta = {
  id: number
  eyebrow: string
  title: string
  note: string
}

export type TypeCode =
  | 'SEAP'
  | 'SEAL'
  | 'SEMP'
  | 'SEML'
  | 'SFAP'
  | 'SFAL'
  | 'SFMP'
  | 'SFML'
  | 'CEAP'
  | 'CEAL'
  | 'CEMP'
  | 'CEML'
  | 'CFAP'
  | 'CFAL'
  | 'CFMP'
  | 'CFML'

export type TypeMeta = {
  code: TypeCode
  displayName: string
  tagline: string
  summary: string
  quickAction: string
  shareHook: string
}

export type AxisResult = {
  axis: AxisKey
  leftPole: Pole
  rightPole: Pole
  score: number
  dominantPole: Pole
  clarity: '僅差' | 'やや優勢' | '明確'
  ratio: number
}

export type DiagnosisResult = {
  typeCode: TypeCode
  typeMeta: TypeMeta
  axes: AxisResult[]
  heroTitle: string
  heroSummary: string
  desiredCampusLife: string
  strength: string
  campusStyle: string
  activities: string[]
  firstMonth: string[]
  firstThreeMonths: string[]
  pitfalls: string
  resetTip: string
  shareText: string
}
