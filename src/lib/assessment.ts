import { AXIS_CONFIG, POLE_COPY, QUESTIONS, TYPE_META } from '../data/diagnosis'
import type { AxisKey, AxisResult, DiagnosisResult, Pole, ScaleValue, TypeCode } from './types'

const STYLE_COPY = {
  S: {
    need: 'まずは自分の生活基盤や気持ちの軸を整えながら、大学を自分のものにしていくこと。',
    strength: '他人の空気に流されすぎず、自分に合うペースをつくれる。',
    style: 'ひとりで考える余白を確保しつつ、必要な場だけを自分で選びにいく。',
    firstMonth: '生活リズム、移動、課題管理の型を先に作る。',
    pitfall: 'ひとりで整えようとしすぎて、助けを借りるタイミングを逃しやすい。',
    reset: '調子が落ちたら、まず人間関係ではなく生活の基盤を立て直す。',
    activity: ['少人数ゼミの情報収集', 'ひとりで集中できる自習拠点づくり'],
  },
  C: {
    need: '人とのつながりや安心できる場をつくりながら、大学生活を育てていくこと。',
    strength: '環境に早くなじみ、人との関係から良い機会を引き寄せやすい。',
    style: '授業や活動を選ぶときも、誰と過ごすかを大事にしながら動く。',
    firstMonth: '続けて顔を出せる場所と、気軽に連絡できる相手を作る。',
    pitfall: '居場所づくりを急ぎすぎると、合わない場にも残りやすい。',
    reset: 'しんどい時は広げるより、安心して戻れる関係を一つ守る。',
    activity: ['学科の少人数コミュニティ', '定期的に会えるサークルやバイト'],
  },
  E: {
    need: '広く試しながら、自分に合う学び方や人間関係を見つけていくこと。',
    strength: '経験の幅が広く、思わぬ接点から自分に合う道を見つけられる。',
    style: '最初から絞りすぎず、授業も活動も数を打って感触を集める。',
    firstMonth: '少しでも気になる授業・場・企画に触れて、向き不向きの材料を集める。',
    pitfall: '面白いものが多すぎて、何も残らないまま散らばりやすい。',
    reset: '広げすぎたら、今いちばん熱量が残っているものだけを3つに絞る。',
    activity: ['他学部授業の履修', '短期プロジェクトやイベント参加'],
  },
  F: {
    need: '少数の対象に集中して、深さと手応えを積み上げていくこと。',
    strength: '続けるほど強くなり、専門性や信頼をつくりやすい。',
    style: '自分に合うものを早めに見つけたら、そこに時間を投下して育てる。',
    firstMonth: '軸になりそうな領域を一つ決めて、続ける導線を作る。',
    pitfall: '絞るのが早すぎると、合わない道に粘ってしまうことがある。',
    reset: '行き詰まったら、方向転換ではなく視野を少しだけ足してみる。',
    activity: ['研究会や制作活動', '継続前提のサークルやゼミ準備'],
  },
  A: {
    need: '頑張った分が実力や結果として回収される感覚を持つこと。',
    strength: '目標を言語化すると強く、行動が成果に結びつきやすい。',
    style: '経験を選ぶ時も、成長や将来へのリターンを意識して判断する。',
    firstMonth: '成績、制作物、資格、インターン準備のうち成果軸を一つ決める。',
    pitfall: '結果を急ぎすぎると、大学生活全体が評価待ちになりやすい。',
    reset: '焦ったら、他人基準ではなく自分の伸びが見える指標に戻す。',
    activity: ['コンテストや発表の場', '将来につながる資格やポートフォリオ制作'],
  },
  M: {
    need: '好き・納得・意味のある時間がちゃんと大学生活の中心にあること。',
    strength: '腹落ちしている時の集中力が高く、深い満足感を得やすい。',
    style: '目先の評価だけでは動かず、自分に意味があるものを選んで続ける。',
    firstMonth: '気分が上がる授業や場を見つけて、自分の感情が動く条件を把握する。',
    pitfall: '納得できないことを避けすぎると、可能性の幅を狭めやすい。',
    reset: '迷ったら、役に立つかより自分が続けられるかで判断し直す。',
    activity: ['表現活動や自主企画', 'ボランティアや意味のある対人活動'],
  },
  P: {
    need: '見通しがあり、自分で段取りを持てる状態で動くこと。',
    strength: '崩れにくい土台を作りやすく、継続的な成果につながる。',
    style: 'スケジュール、締切、選択肢を整理しながら着実に進める。',
    firstMonth: '授業、移動、課題、出費を一つの管理方法にまとめる。',
    pitfall: '準備を整えようとするあまり、スタートが遅れることがある。',
    reset: '止まったら、完璧な計画ではなく今週だけの段取りに落とす。',
    activity: ['履修設計と学期計画づくり', '長期で積む学習や習慣化'],
  },
  L: {
    need: '現場の感触を見ながら、柔らかく動ける余白を持つこと。',
    strength: '変化に強く、実際に動きながら自分に合うやり方を見つけられる。',
    style: '最初から固めすぎず、その場の手応えに応じて選び直す。',
    firstMonth: '予定を詰め込みすぎず、偶然の誘いや新しい場に入れる余白を残す。',
    pitfall: '自由が惰性に変わると、振り返った時に手応えが薄くなりやすい。',
    reset: '散らかったら、今週やることを3つだけ決めて再始動する。',
    activity: ['単発イベントや外部コミュニティ', '直感で動ける旅やフィールドワーク'],
  },
} as const

const COMBO_COPY: Record<TypeCode, { hero: string; summary: string; pitfalls: string; reset: string }> = {
  SEAP: {
    hero: '自由に試しながらも、ちゃんと回収できる大学生活を作りたい人です。',
    summary: '新しい場に飛び込みつつ、将来につながる線も見失わないので、大学生活を器用に広げられます。',
    pitfalls: '広げるのが上手いぶん、全部を一定以上で回そうとして疲れやすいタイプです。',
    reset: '選択肢が増えすぎたら、今後に残したいものと今しかできないものに分けて整理してください。',
  },
  SEAL: {
    hero: '勢いと熱量で大学生活の景色を変えにいく人です。',
    summary: '思い立ったらすぐ動けるので、最初の一年で密度の高い経験を作りやすいタイプです。',
    pitfalls: '勢いだけで前に出ると、生活基盤や課題管理が追いつかず失速しやすくなります。',
    reset: '動けなくなったら、熱量がある予定を削るのではなく、生活の固定点を一つ作って立て直してください。',
  },
  SEMP: {
    hero: '好奇心をちゃんと育てて、自分の道に変えていく人です。',
    summary: '学びのおもしろさと計画性が両立しやすく、じわじわ強い大学生活を作れます。',
    pitfalls: '整えながら広げようとするぶん、興味に対して慎重になりすぎることがあります。',
    reset: '考えすぎて止まったら、まず一つだけ試してから判断する順番に戻してください。',
  },
  SEML: {
    hero: '感性の動くほうへ進みながら、自分の輪郭を見つける人です。',
    summary: '偶然やひらめきを味方にできるので、自分らしい大学生活を作りやすいタイプです。',
    pitfalls: '自由度が高いほど散らばりやすく、後から手応えを言葉にしにくくなります。',
    reset: '進んでいる感覚が薄れたら、その月に心が動いた経験を3つだけ書き出してください。',
  },
  SFAP: {
    hero: '目標が見えた瞬間に、大学生活を戦略に変えられる人です。',
    summary: '軸が定まると非常に強く、成果につながる動き方を自分で設計できます。',
    pitfalls: '効率を優先しすぎると、大学ならではの余白や偶然を切り捨てやすくなります。',
    reset: '息が詰まったら、目的に直結しないけれど気になるものを一つだけ混ぜてください。',
  },
  SFAL: {
    hero: '狙いを絞った瞬間に、加速して伸びる人です。',
    summary: '少数のテーマに深くコミットできるので、短期間で実力が見えやすいタイプです。',
    pitfalls: '走る力が強いぶん、方向がずれたままでも止まらずに進んでしまうことがあります。',
    reset: '迷ったら続けるかやめるかではなく、今の走り方が自分に合っているかを見直してください。',
  },
  SFMP: {
    hero: '静かに深めながら、自分だけの精度を上げていく人です。',
    summary: '派手な見せ場がなくても、積み上げた厚みで信頼を作れるタイプです。',
    pitfalls: '完成度を求めすぎると、外に出すタイミングが遅れて機会を逃しやすくなります。',
    reset: '詰まりを感じたら、完成ではなく途中経過を見せる意識に切り替えてください。',
  },
  SFML: {
    hero: '好きなものに深く潜ることで、大学生活を濃くしていく人です。',
    summary: '興味対象が見つかると非常に粘り強く、自分の言葉を持ちやすいタイプです。',
    pitfalls: '好きな世界が狭くなりすぎると、外との接点や実務的な準備が後回しになりがちです。',
    reset: '没頭しすぎたら、今の関心を誰かに伝える場を一つだけ作って外気を入れてください。',
  },
  CEAP: {
    hero: '人との接点を、ちゃんと前進に変えられる人です。',
    summary: '場を読みながら成果も取りにいけるので、大学内で役割を持ちやすいタイプです。',
    pitfalls: '周囲に応えながら前進しようとして、気づかないうちに抱え込みやすくなります。',
    reset: '忙しくなりすぎたら、頼られることと自分がやるべきことを分け直してください。',
  },
  CEAL: {
    hero: '場の熱量と一緒に、自分も伸びていく人です。',
    summary: '人を巻き込みながら動けるので、大学生活のスタートダッシュが強いタイプです。',
    pitfalls: '人と予定が増えすぎると、自分の足場が見えなくなることがあります。',
    reset: '勢いが散ったら、誰と過ごすかではなく何を残したいかに一度戻ってください。',
  },
  CEMP: {
    hero: '人の気持ちを拾いながら、意味のある形に育てられる人です。',
    summary: '共感と設計のバランスがよく、企画や支援で力を出しやすいタイプです。',
    pitfalls: '周囲への配慮が多いぶん、自分の本音の優先順位が下がりやすくなります。',
    reset: '疲れたら、誰のための行動なのかを一つずつ言葉にして整理してください。',
  },
  CEML: {
    hero: '心地よい空気を作りながら、自分らしさも失わない人です。',
    summary: '楽しさや感性を通して人とつながれるので、自然体で魅力が伝わるタイプです。',
    pitfalls: '心地よさを優先しすぎると、必要な緊張感や継続の軸が薄くなることがあります。',
    reset: 'ゆるみすぎたら、気分が上がることと積み上がることを一つずつ同時に持ってください。',
  },
  CFAP: {
    hero: '人を支えながら、現実的な成果にもつなげられる人です。',
    summary: '信頼されやすく、チームやコミュニティの中核になりやすいタイプです。',
    pitfalls: '期待に応えすぎて、自分の余白が先に削られてしまうことがあります。',
    reset: 'しんどい時は支える側から離れ、まず自分の回復手順を先に確保してください。',
  },
  CFAL: {
    hero: '近い距離感のまま、現場を前に押し出せる人です。',
    summary: 'チームの熱量があるほど力を出しやすく、実践の中で成長が見えるタイプです。',
    pitfalls: '人と成果の両方を抱えすぎると、気持ちの消耗が表に出にくくなります。',
    reset: '疲れたら、全員を助ける動きではなく今自分が持つ役割だけに戻してください。',
  },
  CFMP: {
    hero: '信頼できる関係の中で、静かに全体を支える人です。',
    summary: '近い距離の人をよく見ながら、落ち着いた判断で場を整えられるタイプです。',
    pitfalls: '自分が我慢すれば回る状態を続けると、後から急に消耗が出やすくなります。',
    reset: '違和感が出たら、相手に合わせる前に自分の疲れを数字や時間で見える化してください。',
  },
  CFML: {
    hero: '安心できる関係と場を育てることで、大学生活を自分らしく広げる人です。',
    summary: '信頼と意味の両方を大事にできるので、落ち着いた満足感のある大学生活を作れます。',
    pitfalls: '合う場を大切にするぶん、外の可能性を閉じてしまうことがあります。',
    reset: '守りに入りすぎたら、安心できる拠点を保ったまま新しい場を一つだけ足してください。',
  },
}

function clarityFromScore(score: number): AxisResult['clarity'] {
  const distance = Math.abs(score)
  if (distance <= 4) return '僅差'
  if (distance <= 11) return 'やや優勢'
  return '明確'
}

function ratioFromScore(score: number): number {
  return Math.min(Math.abs(score) / 36, 1)
}

export function calculateResult(answers: Record<number, ScaleValue>): DiagnosisResult {
  const axisScores = QUESTIONS.reduce<Record<AxisKey, number>>(
    (acc, question) => {
      const answer = answers[question.id] ?? 0
      const leftPole = AXIS_CONFIG[question.axis].left
      const direction = question.positivePole === leftPole ? 1 : -1
      const adjusted = question.reverse ? answer * -1 : answer
      acc[question.axis] += adjusted * direction
      return acc
    },
    { SC: 0, EF: 0, AM: 0, PL: 0 },
  )

  const axes: AxisResult[] = (Object.keys(AXIS_CONFIG) as AxisKey[]).map((axis) => {
    const { left, right } = AXIS_CONFIG[axis]
    const score = axisScores[axis]
    return {
      axis,
      leftPole: left,
      rightPole: right,
      score,
      dominantPole: score >= 0 ? left : right,
      clarity: clarityFromScore(score),
      ratio: ratioFromScore(score),
    }
  })

  const typeCode = axes.map((axis) => axis.dominantPole).join('') as TypeCode
  const typeMeta = TYPE_META[typeCode]
  const combo = COMBO_COPY[typeCode]
  const poleSet = Object.fromEntries(axes.map((axis) => [axis.dominantPole, STYLE_COPY[axis.dominantPole]])) as Record<Pole, (typeof STYLE_COPY)[Pole]>
  const poles = typeCode.split('') as Pole[]

  const desiredCampusLife = [
    poleSet[poles[0]].need,
    poleSet[poles[1]].need,
    poleSet[poles[2]].need,
    poleSet[poles[3]].need,
  ].join(' ')

  const strength = [
    combo.summary,
    poleSet[poles[0]].strength,
    poleSet[poles[1]].strength,
    poleSet[poles[2]].strength,
  ].join(' ')

  const campusStyle = [
    poleSet[poles[0]].style,
    poleSet[poles[1]].style,
    poleSet[poles[3]].style,
  ].join(' ')

  const activities = Array.from(
    new Set([
      ...poleSet[poles[0]].activity,
      ...poleSet[poles[1]].activity,
      ...poleSet[poles[2]].activity,
      ...poleSet[poles[3]].activity,
    ]),
  ).slice(0, 6)

  const firstMonth = [
    typeMeta.quickAction,
    poleSet[poles[0]].firstMonth,
    poleSet[poles[1]].firstMonth,
    poleSet[poles[3]].firstMonth,
  ]

  const firstThreeMonths = [
    '1か月目で見えた向き不向きをもとに、続けるものとやめるものをはっきり分ける。',
    poles.includes('A')
      ? '成果が見える形を一つ作り、学期末に振り返れる基準を持つ。'
      : '意味のあるテーマを一つ育て、言葉や作品として外に出してみる。',
    poles.includes('C')
      ? '関係が続きそうな相手とは、授業外でも接点が生まれる形を作る。'
      : 'ひとりで整える時間を確保し、無理に予定で埋めない。',
  ]

  const pitfalls = [combo.pitfalls, ...poles.map((pole) => poleSet[pole].pitfall)].join(' ')
  const resetTip = [combo.reset, ...poles.map((pole) => poleSet[pole].reset)].join(' ')

  const heroTitle = `あなたは「${typeMeta.displayName}」タイプ`
  const heroSummary = `${combo.hero} ${typeMeta.summary}`
  const shareText = `大学生活タイプ診断の結果は「${typeMeta.displayName}（${typeMeta.code}）」でした。${typeMeta.shareHook}`

  return {
    typeCode,
    typeMeta,
    axes,
    heroTitle,
    heroSummary,
    desiredCampusLife,
    strength,
    campusStyle,
    activities,
    firstMonth,
    firstThreeMonths,
    pitfalls,
    resetTip,
    shareText,
  }
}

export function getAxisCaption(axis: AxisResult): string {
  const dominant = POLE_COPY[axis.dominantPole]
  if (axis.clarity === '僅差') {
    const secondary = axis.dominantPole === axis.leftPole ? axis.rightPole : axis.leftPole
    return `${dominant.title}寄り。ただし${POLE_COPY[secondary].title}の要素もかなり強めです。`
  }
  return `${dominant.title}が${axis.clarity === '明確' ? 'はっきり' : 'やや'}優勢です。`
}
