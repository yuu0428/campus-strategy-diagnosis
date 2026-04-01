import type { AxisKey, BlockMeta, Pole, Question, TypeGroup, TypeMeta } from '../lib/types'

export const SCALE_OPTIONS = [
  { value: 3, short: '強く同意', label: 'とてもそう思う' },
  { value: 2, short: '同意', label: 'かなりそう思う' },
  { value: 1, short: 'やや同意', label: 'ややそう思う' },
  { value: 0, short: '中立', label: 'どちらでもない' },
  { value: -1, short: 'やや反対', label: 'あまりそう思わない' },
  { value: -2, short: '反対', label: 'かなりそう思わない' },
  { value: -3, short: '強く反対', label: 'まったくそう思わない' },
] as const

export const AXIS_CONFIG: Record<AxisKey, { left: Pole; right: Pole; label: string }> = {
  SC: { left: 'S', right: 'C', label: '自分軸 / つながり軸' },
  EF: { left: 'E', right: 'F', label: '探索 / 集中' },
  AM: { left: 'A', right: 'M', label: '成果 / 意味' },
  PL: { left: 'P', right: 'L', label: '計画 / 流動' },
}

export const POLE_COPY: Record<Pole, { title: string; summary: string }> = {
  S: { title: 'Self起点', summary: 'まず自分の土台づくりや成長を優先する。' },
  C: { title: 'Connection起点', summary: '人とのつながりや居場所から大学生活を組み立てる。' },
  E: { title: 'Explore型', summary: '広く試しながら、自分に合うものを探す。' },
  F: { title: 'Focus型', summary: '少数の対象を深く積み上げていく。' },
  A: { title: 'Achievement型', summary: '成果や実力の実感を大切にする。' },
  M: { title: 'Meaning型', summary: '納得感や意味のある時間を求める。' },
  P: { title: 'Plan型', summary: '見通しと準備があると安心して動ける。' },
  L: { title: 'Live型', summary: '実際に動きながら感触をつかみたい。' },
}

export const BLOCKS: BlockMeta[] = [
  { id: 1, eyebrow: 'Block 1', title: '大学の入口で何を見たいか', note: 'まずは、入学直後の動き方から見ます。' },
  { id: 2, eyebrow: 'Block 2', title: '授業と日常の優先順位', note: '授業の選び方と毎日の使い方に出る傾向です。' },
  { id: 3, eyebrow: 'Block 3', title: '人との距離感と広げ方', note: '友人関係やコミュニティの作り方を見ます。' },
  { id: 4, eyebrow: 'Block 4', title: '将来への備え方', note: '進路や準備の仕方に出る癖を確認します。' },
  { id: 5, eyebrow: 'Block 5', title: '熱量が上がる瞬間', note: 'どんな場面でやる気が立ち上がるかを探ります。' },
  { id: 6, eyebrow: 'Block 6', title: '不安との付き合い方', note: '揺れたときの支え方に出るタイプ差です。' },
  { id: 7, eyebrow: 'Block 7', title: '深めるか、広げるか', note: '経験をどう育てるかに注目します。' },
  { id: 8, eyebrow: 'Block 8', title: '4年間の使い方', note: '最後は大学生活全体の設計感を見ます。' },
]

export const QUESTION_DESIGN_GUIDELINES = [
  '「はい」のほうが立派に見えないこと。',
  '反対側にも自然なメリットが想像できること。',
  '大学生活の具体場面に落ちていること。',
  '1文1論点であること。',
  '真面目さや優しさのような徳目を測らないこと。',
] as const

export const QUESTION_ANTI_PATTERNS = [
  '生活リズムを整えたい',
  '見通しがあると安心する',
  '頼れる人がいることが大事',
  '早めに準備したい',
  '支え合える状態を作りたい',
] as const

export const QUESTION_REVIEW_CHECKLIST = [
  '望ましさバイアスが強くないか',
  '抽象語だけで終わっていないか',
  '二重論点になっていないか',
  '別軸の価値観がにじんでいないか',
  '大学場面として自然か',
] as const

export const QUESTIONS: Question[] = [
  { id: 1, axis: 'SC', positivePole: 'S', prompt: '入学してすぐは、交友関係を広げることより自分の生活ペースをつかむほうに意識が向きやすい。' },
  { id: 2, axis: 'EF', positivePole: 'E', prompt: '新歓では、早めに所属先を決めるより比較材料を集めるほうに意識が向きやすい。' },
  { id: 3, axis: 'AM', positivePole: 'M', prompt: '履修を選ぶ時、将来の役立ち方より今の関心の強さに引かれやすい。' },
  { id: 4, axis: 'PL', positivePole: 'P', reverse: true, prompt: '予定がまだ固まっていない時期でも、動きながら形にしていくことにあまり抵抗がない。' },
  { id: 5, axis: 'SC', positivePole: 'S', reverse: true, prompt: '大学でやりたいことは、一人で考えている時より人と話している時のほうが見えてきやすい。' },
  { id: 6, axis: 'AM', positivePole: 'M', reverse: true, prompt: '頑張ったと感じるのは、納得できた時より成果が目に見えた時だ。' },

  { id: 7, axis: 'EF', positivePole: 'E', reverse: true, prompt: '面白そうな選択肢が複数あっても、ひとつに決めたらしばらく寄り道しないほうだ。' },
  { id: 8, axis: 'PL', positivePole: 'P', reverse: true, prompt: '旅行やイベントの予定は、大枠だけ決めて細部は後で調整するほうが楽だ。' },
  { id: 9, axis: 'SC', positivePole: 'S', prompt: '空き時間ができると、人と約束を入れるより一人で使い道を決めたくなりやすい。' },
  { id: 10, axis: 'AM', positivePole: 'M', prompt: '経験を選ぶ時は、評価されるかより自分が腹落ちするかが気になりやすい。' },
  { id: 11, axis: 'EF', positivePole: 'E', prompt: '履修は、ひとつの軸に沿って固めるより気になる分野を混ぜたくなりやすい。' },
  { id: 12, axis: 'PL', positivePole: 'P', prompt: 'やることが重なると、頭の中だけで持つより順番を決めたくなりやすい。' },

  { id: 13, axis: 'SC', positivePole: 'S', reverse: true, prompt: 'サークルやゼミを選ぶ時は、内容よりそこにいる人たちの空気感が気になりやすい。' },
  { id: 14, axis: 'EF', positivePole: 'E', reverse: true, prompt: 'サークルや活動は、まず広く試すより続ける候補を早めに絞りたくなる。' },
  { id: 15, axis: 'AM', positivePole: 'M', reverse: true, prompt: '同じだけ努力したなら、意味があったかより結果が出たかのほうを重く見がちだ。' },
  { id: 16, axis: 'PL', positivePole: 'P', prompt: '初めてのことは、ある程度やり方が見えてから始めたい。' },
  { id: 17, axis: 'SC', positivePole: 'S', prompt: '新しい環境では、自分の考えを固めてから人と関わりたいほうだ。' },
  { id: 18, axis: 'AM', positivePole: 'M', prompt: '大学では、人に伝えやすい実績より自分らしさが残る経験に惹かれやすい。' },

  { id: 19, axis: 'EF', positivePole: 'E', prompt: 'まだ向き不向きが分からない段階では、経験の幅を増やすほうに動きやすい。' },
  { id: 20, axis: 'PL', positivePole: 'P', prompt: 'やることが増えると、一覧にして優先順位をつけたくなる。' },
  { id: 21, axis: 'SC', positivePole: 'C', prompt: '面白い話題があると、その内容よりまず誰と共有できるかが気になりやすい。' },
  { id: 22, axis: 'AM', positivePole: 'M', reverse: true, prompt: '将来に効くと分かっていることは、気分が乗らなくても進めやすい。' },
  { id: 23, axis: 'EF', positivePole: 'E', reverse: true, prompt: '得意分野を作るなら、寄り道を減らして一つを掘るほうが性に合う。' },
  { id: 24, axis: 'PL', positivePole: 'L', prompt: '空いた時間は、その場でやることを決めるほうが自然だ。' },

  { id: 25, axis: 'SC', positivePole: 'S', prompt: '誰かと一緒に動く予定が増えると、少し自分の時間を取り戻したくなる。' },
  { id: 26, axis: 'EF', positivePole: 'E', prompt: '新しい話題に触れると、今の軸を深めるより横に広げたくなる。' },
  { id: 27, axis: 'AM', positivePole: 'M', prompt: '誰かに価値が届いていると感じると、成果が見えなくても続けやすい。' },
  { id: 28, axis: 'PL', positivePole: 'P', prompt: '履修や予定は、選択肢が出そろってからまとめて決めたい。' },
  { id: 29, axis: 'SC', positivePole: 'S', reverse: true, prompt: '興味のあることは、一人で深めるより人と一緒に続けたほうが熱が保ちやすい。' },
  { id: 30, axis: 'AM', positivePole: 'A', prompt: '肩書きや数字で自分の頑張りが見えると、かなり手応えを感じやすい。' },

  { id: 31, axis: 'EF', positivePole: 'E', reverse: true, prompt: 'いったん決めたテーマは、途中で別の選択肢が見えても簡単には変えない。' },
  { id: 32, axis: 'PL', positivePole: 'P', reverse: true, prompt: '準備不足でも、一度動いてから整えるほうが早いと感じやすい。' },
  { id: 33, axis: 'SC', positivePole: 'S', prompt: '大学生活がうまく回っているかは、人間関係より自分のペースを保てているかで判断しがちだ。' },
  { id: 34, axis: 'AM', positivePole: 'M', prompt: '自分が本気で面白いと思えるかどうかは、効率より優先されやすい。' },
  { id: 35, axis: 'EF', positivePole: 'E', prompt: '大学では、専攻の外側も見ておいたほうが自分に合う道が見えやすいと感じる。' },
  { id: 36, axis: 'PL', positivePole: 'P', reverse: true, prompt: '先の予定が読めない状態が続いても、意外とそのまま動ける。' },

  { id: 37, axis: 'SC', positivePole: 'C', prompt: '履修や活動の迷いは、一人で考えるより人に話してみると整理されやすい。' },
  { id: 38, axis: 'EF', positivePole: 'E', reverse: true, prompt: '人間関係も活動も、数を持つより少数に絞ったほうが落ち着く。' },
  { id: 39, axis: 'AM', positivePole: 'M', reverse: true, prompt: '同じ挑戦なら、好きかどうかより履歴に残るかどうかが気になりやすい。' },
  { id: 40, axis: 'PL', positivePole: 'L', prompt: '計画どおりでなくても、その場で組み替えれば問題ないと感じやすい。' },
  { id: 41, axis: 'SC', positivePole: 'S', prompt: '仲のいい人が増えても、最終的な判断は自分一人で決めたい。' },
  { id: 42, axis: 'AM', positivePole: 'M', prompt: '勝ち負けがはっきりしなくても、自分なりの意味があれば満足しやすい。' },

  { id: 43, axis: 'EF', positivePole: 'E', prompt: '偶然見つけたものから予定が変わることを、わりと楽しめる。' },
  { id: 44, axis: 'PL', positivePole: 'P', reverse: true, prompt: '不安な時は、考えるよりまず行動して感触を得たい。' },
  { id: 45, axis: 'SC', positivePole: 'C', prompt: '大学では、何をするかより誰といるかが日々の満足度に直結しやすい。' },
  { id: 46, axis: 'AM', positivePole: 'A', prompt: '学ぶ時は、今後どう使えるかを考えると集中しやすい。' },
  { id: 47, axis: 'EF', positivePole: 'E', reverse: true, prompt: '後半になるほど、選択肢を増やすより専門を定めたくなりやすい。' },
  { id: 48, axis: 'PL', positivePole: 'P', prompt: 'きれいな計画があるだけで、かなり動きやすくなる。' },
]

export const TYPE_META: Record<string, TypeMeta> = {
  SEAP: {
    code: 'SEAP',
    displayName: '先読みエース',
    tagline: '広く見て、勝ち筋だけは外さない。',
    summary: '自由に試しながらも、将来の回収ラインは見失わないタイプ。',
    quickAction: '入学1か月で「試す場」と「積む場」を一つずつ確保する。',
    shareHook: '広く動きつつ、ちゃんと勝ち筋も拾うタイプ。',
  },
  SEAL: {
    code: 'SEAL',
    displayName: '爆走チャレンジャー',
    tagline: 'まず走る。勢いの中で、自分の形をつかむ。',
    summary: '自分の熱量を原動力に、経験の量で道を切り開くタイプ。',
    quickAction: '気になる企画や新歓を3つ選び、深く考える前に現場へ行く。',
    shareHook: 'やってみたいを止めずに前へ進むタイプ。',
  },
  SEMP: {
    code: 'SEMP',
    displayName: '探究プランナー',
    tagline: '好奇心を、ちゃんと続く形にする。',
    summary: '面白さを入り口にしながら、自分なりの筋道で学びを育てるタイプ。',
    quickAction: '興味のある授業と読書テーマを3つ書き出し、週間で回す。',
    shareHook: '面白さも設計も両方ほしいタイプ。',
  },
  SEML: {
    code: 'SEML',
    displayName: 'ひらめき旅人',
    tagline: '直感に従って歩くほど、自分の輪郭が見えてくる。',
    summary: '自由な探索と感性を頼りに、大学生活を自分の旅に変えるタイプ。',
    quickAction: '授業・場所・人のどれかで「普段選ばないもの」を一つ試す。',
    shareHook: '感性と偶然を味方につけるタイプ。',
  },
  SFAP: {
    code: 'SFAP',
    displayName: '最短攻略家',
    tagline: '狙いを決めたら、静かに最短で詰める。',
    summary: '自分の目標を早めに言語化し、無駄なく積み上げていくタイプ。',
    quickAction: '履修・資格・制作物の3本柱を決めて、学期の地図を作る。',
    shareHook: '遠回りより精度で勝ちにいくタイプ。',
  },
  SFAL: {
    code: 'SFAL',
    displayName: '一点突破ランナー',
    tagline: '決めたら速い。絞った先で一気に伸びる。',
    summary: '一本のテーマに熱量を集め、実績まで押し切る推進力が強いタイプ。',
    quickAction: '今期いちばん伸ばしたい分野を一つ決め、週次の行動に落とす。',
    shareHook: '狙いを絞るほど強さが出るタイプ。',
  },
  SFMP: {
    code: 'SFMP',
    displayName: '静かな職人',
    tagline: '派手さより精度。積み上げた深さで語る。',
    summary: '目立つことより、自分が納得できる深まりを大切にするタイプ。',
    quickAction: '一人で深められるテーマを持ちつつ、月1回は外に出して反応を見る。',
    shareHook: '静かに深く仕上げていくタイプ。',
  },
  SFML: {
    code: 'SFML',
    displayName: '沼る探究者',
    tagline: '好きに沈める時間が、いちばん強い。',
    summary: '関心の深さと没頭力で、大学生活を濃くしていくタイプ。',
    quickAction: 'ハマれそうなテーマを一つ選び、関連する人・本・場を集める。',
    shareHook: '好きなものに深く潜るほど輝くタイプ。',
  },
  CEAP: {
    code: 'CEAP',
    displayName: '段取りスター',
    tagline: '人も機会も、ちゃんと前に進める。',
    summary: 'つながりを生かしながら、成果につながる動線を組むのがうまいタイプ。',
    quickAction: '所属先を一つ決めたら、そこで役割を持てる機会を探す。',
    shareHook: 'つながりを機会に変えるのがうまいタイプ。',
  },
  CEAL: {
    code: 'CEAL',
    displayName: '主役ムードメーカー',
    tagline: '場が動くとき、だいたい自分も真ん中にいる。',
    summary: '人の熱量と自分の勢いをつなげて、大学生活をにぎやかに広げるタイプ。',
    quickAction: '直感で合いそうな場に入り、1か月で「顔を覚えられる側」になる。',
    shareHook: '空気ごと前に進めるタイプ。',
  },
  CEMP: {
    code: 'CEMP',
    displayName: '共感プロデューサー',
    tagline: '人の気持ちと意味を、ちゃんと形にする。',
    summary: '誰かにとって意味のある場や企画を作ることに向いているタイプ。',
    quickAction: '人と話して集めた違和感を一つ、小さな企画や行動に変える。',
    shareHook: '共感をそのままで終わらせないタイプ。',
  },
  CEML: {
    code: 'CEML',
    displayName: 'ごきげん表現者',
    tagline: '楽しさや感性で、人を巻き込む。',
    summary: '人との接点と自分の感性が噛み合うと、一気に魅力が出るタイプ。',
    quickAction: '好きな空気感の場を一つ見つけて、自分の表現を出してみる。',
    shareHook: '楽しさと感性で場をあたためるタイプ。',
  },
  CFAP: {
    code: 'CFAP',
    displayName: '面倒見キャプテン',
    tagline: '支えながら、結果まで持っていく。',
    summary: '人を見ながら現実的に前進させる、信頼回収型のタイプ。',
    quickAction: '頼られやすい場では抱え込みすぎず、役割の線引きを先に決める。',
    shareHook: '人を支えつつ、ちゃんと前進も欲しいタイプ。',
  },
  CFAL: {
    code: 'CFAL',
    displayName: '熱血まとめ役',
    tagline: '近い距離感のまま、チームを前へ押し出す。',
    summary: '人との一体感を原動力に、現場で強さが出るタイプ。',
    quickAction: '小さなチームで一度成果を出し、そこで自分の役割を言語化する。',
    shareHook: '熱量のある現場で力を発揮するタイプ。',
  },
  CFMP: {
    code: 'CFMP',
    displayName: '寄り添い参謀',
    tagline: '空気を読みすぎず、でも人をちゃんと見る。',
    summary: '信頼関係と落ち着いた判断で、場を支える深度のあるタイプ。',
    quickAction: '少人数の居場所を一つ決め、安心して話せる相手を先に作る。',
    shareHook: '静かに人を支えるのがうまいタイプ。',
  },
  CFML: {
    code: 'CFML',
    displayName: '居場所デザイナー',
    tagline: '安心できる関係があると、世界は一気に広がる。',
    summary: '自分と周囲の両方が自然体でいられる場を作ることに長けたタイプ。',
    quickAction: '無理に広げず、まずは続けて通える居場所を一つ育てる。',
    shareHook: '安心できる場を自然につくるタイプ。',
  },
}

export const TYPE_GROUPS: TypeGroup[] = [
  {
    id: 'SE',
    title: '自走開拓群',
    description: '自分を起点にしながら、まずは広く試して道を見つける4タイプ。',
    codes: ['SEAP', 'SEAL', 'SEMP', 'SEML'],
  },
  {
    id: 'SF',
    title: '自走深化群',
    description: '自分の軸を保ったまま、少数のテーマを深く積み上げる4タイプ。',
    codes: ['SFAP', 'SFAL', 'SFMP', 'SFML'],
  },
  {
    id: 'CE',
    title: '交流拡張群',
    description: '人との接点を広げながら、大学生活の機会を増やしていく4タイプ。',
    codes: ['CEAP', 'CEAL', 'CEMP', 'CEML'],
  },
  {
    id: 'CF',
    title: '関係定着群',
    description: '安心できる関係や場を育てながら、深さをつくっていく4タイプ。',
    codes: ['CFAP', 'CFAL', 'CFMP', 'CFML'],
  },
]
