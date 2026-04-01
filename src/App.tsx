import { useEffect, useRef, useState } from 'react'
import { AXIS_CONFIG, BLOCKS, POLE_COPY, QUESTIONS, SCALE_OPTIONS, TYPE_GROUPS, TYPE_META } from './data/diagnosis'
import { calculateResult, getAxisCaption } from './lib/assessment'
import type { DiagnosisResult, ScaleValue } from './lib/types'

type Screen = 'landing' | 'intro' | 'types' | 'questions' | 'loading' | 'result'

const blockSize = 6

function getInitialQuestionIndex(blockIdx: number, answers: Record<number, ScaleValue>) {
  const blockQuestions = QUESTIONS.slice(blockIdx * blockSize, (blockIdx + 1) * blockSize)
  const firstUnanswered = blockQuestions.findIndex((question) => answers[question.id] === undefined)
  return firstUnanswered === -1 ? blockQuestions.length - 1 : firstUnanswered
}

function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [blockIndex, setBlockIndex] = useState(0)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, ScaleValue>>({})
  const [validationAttempted, setValidationAttempted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [result, setResult] = useState<DiagnosisResult | null>(null)

  const detailRef = useRef<HTMLElement | null>(null)
  const shareRef = useRef<HTMLElement | null>(null)
  const questionRefs = useRef<Array<HTMLElement | null>>([])

  const currentBlock = BLOCKS[blockIndex]
  const currentQuestions = QUESTIONS.slice(blockIndex * blockSize, (blockIndex + 1) * blockSize)
  const blockCompleted = currentQuestions.every((question) => answers[question.id] !== undefined)
  const blockProgress = (blockIndex + (blockCompleted ? 1 : 0)) / BLOCKS.length

  useEffect(() => {
    if (screen !== 'loading') return

    const timer = window.setTimeout(() => {
      setResult(calculateResult(answers))
      setScreen('result')
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [screen, answers])

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timer)
  }, [copied])

  useEffect(() => {
    if (screen !== 'questions') return
    const target = questionRefs.current[activeQuestionIndex]
    if (!target) return

    const timer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 120)

    return () => window.clearTimeout(timer)
  }, [activeQuestionIndex, blockIndex, screen])

  const handleSelect = (questionId: number, value: number, questionIndex: number) => {
    const isCurrentQuestion = questionIndex === activeQuestionIndex
    setAnswers((current) => ({ ...current, [questionId]: value as ScaleValue }))
    setValidationAttempted(false)

    if (!isCurrentQuestion || questionIndex === currentQuestions.length - 1) return

    window.setTimeout(() => {
      setActiveQuestionIndex(questionIndex + 1)
    }, 220)
  }

  const goToNextBlock = () => {
    if (!blockCompleted) {
      setValidationAttempted(true)
      return
    }

    setValidationAttempted(false)
    if (blockIndex === BLOCKS.length - 1) {
      setScreen('loading')
      return
    }

    const nextBlock = blockIndex + 1
    setBlockIndex(nextBlock)
    setActiveQuestionIndex(getInitialQuestionIndex(nextBlock, answers))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPreviousBlock = () => {
    if (blockIndex === 0) {
      setScreen('intro')
      return
    }

    setValidationAttempted(false)
    const previousBlock = blockIndex - 1
    setBlockIndex(previousBlock)
    setActiveQuestionIndex(getInitialQuestionIndex(previousBlock, answers))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetAssessment = () => {
    setScreen('landing')
    setBlockIndex(0)
    setActiveQuestionIndex(0)
    setAnswers({})
    setValidationAttempted(false)
    setResult(null)
    setCopied(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result.shareText)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="app-shell">
      <div className="backdrop backdrop-left" aria-hidden="true" />
      <div className="backdrop backdrop-right" aria-hidden="true" />
      <main className="app-frame">
        <header className="topbar">
          <div>
            <p className="kicker">Green Editorial Campus</p>
            <h1>大学生活タイプ診断</h1>
          </div>
          <div className="topbar-side">
            <p className="topbar-note">48問 / 7段階 / 約5〜8分</p>
            <div className="topbar-links">
              <button className="inline-link" onClick={() => setScreen('types')}>
                16タイプ一覧
              </button>
              {(screen === 'intro' || screen === 'questions' || screen === 'result') && (
                <button className="inline-link" onClick={() => setScreen('landing')}>
                  トップへ戻る
                </button>
              )}
            </div>
          </div>
        </header>

        {screen === 'landing' && (
          <section className="hero-panel fade-up">
            <div className="hero-copy">
              <p className="eyebrow">Campus strategy, not personality theater.</p>
              <h2>大学生活をどう使いたいかを、4軸で見える化する。</h2>
              <p className="lead">
                期待も不安もある時期に必要なのは、きれいな自己紹介よりも、最初の動き方です。
                この診断では、あなたが大学で何を優先しやすいかを整理して、動きやすい初動まで返します。
              </p>
              <div className="hero-actions">
                <button className="button primary" onClick={() => setScreen('intro')}>
                  診断をはじめる
                </button>
                <button className="button ghost" onClick={() => setScreen('types')}>
                  16タイプ一覧を見る
                </button>
                <div className="pill-row">
                  <span className="pill">4軸16タイプ</span>
                  <span className="pill">7段階回答</span>
                  <span className="pill">ローカル完結</span>
                </div>
              </div>
            </div>

            <div className="hero-board" aria-hidden="true">
              <div className="board-card board-card-main">
                <span className="board-label">Axes</span>
                <strong>S/C</strong>
                <strong>E/F</strong>
                <strong>A/M</strong>
                <strong>P/L</strong>
              </div>
              <div className="board-card board-card-note">
                <span className="board-label">Flow</span>
                <p>開始</p>
                <p>48問</p>
                <p>結果</p>
              </div>
              <div className="route-line" />
            </div>
          </section>
        )}

        {screen === 'intro' && (
          <section className="intro-panel fade-up">
            <div className="intro-grid">
              <article className="intro-card intro-card-large">
                <p className="eyebrow">What you get</p>
                <h2>結果で返すのは、タイプ名だけではありません。</h2>
                <ul className="feature-list">
                  <li>大学で求めやすいもの</li>
                  <li>相性のよい過ごし方と活動</li>
                  <li>最初の1か月でやること</li>
                  <li>ハマりやすい失敗と立て直し方</li>
                </ul>
              </article>
              <article className="intro-card">
                <p className="eyebrow">How it works</p>
                <h3>答え方</h3>
                <p>各設問に対して、どれくらい当てはまるかを7段階で選びます。</p>
              </article>
              <article className="intro-card">
                <p className="eyebrow">Before you start</p>
                <h3>コツ</h3>
                <p>理想の自分ではなく、いまの自分の感覚に近い方を選ぶと結果が使いやすくなります。</p>
              </article>
            </div>

            <div className="axis-preview">
              {(Object.keys(AXIS_CONFIG) as Array<keyof typeof AXIS_CONFIG>).map((axisKey) => {
                const axis = AXIS_CONFIG[axisKey]
                return (
                  <div className="axis-preview-item" key={axisKey}>
                    <span>{axis.left}</span>
                    <div className="axis-preview-line" />
                    <span>{axis.right}</span>
                    <p>{axis.label}</p>
                  </div>
                )
              })}
            </div>

            <div className="footer-actions">
              <button className="button ghost" onClick={() => setScreen('landing')}>
                戻る
              </button>
              <button
                className="button primary"
                onClick={() => {
                  setBlockIndex(0)
                  setActiveQuestionIndex(getInitialQuestionIndex(0, answers))
                  setResult(null)
                  setScreen('questions')
                }}
              >
                質問に進む
              </button>
            </div>
          </section>
        )}

        {screen === 'types' && (
          <section className="types-stage fade-up">
            <section className="types-hero">
              <div className="types-hero-copy">
                <p className="eyebrow">Campus Type Directory</p>
                <h2>16タイプを一覧で見比べる</h2>
                <p className="lead">
                  本家MBTIのタイプ一覧ページのように、全タイプを先に見て雰囲気をつかめる画面です。
                  こちらでは大学生活向けに、4つのグループで束ねています。
                </p>
              </div>
              <div className="types-hero-actions">
                <button className="button primary" onClick={() => setScreen('intro')}>
                  診断をはじめる
                </button>
                <button className="button ghost" onClick={() => setScreen('landing')}>
                  トップへ戻る
                </button>
              </div>
            </section>

            <div className="type-groups">
              {TYPE_GROUPS.map((group) => (
                <section className="type-group" key={group.id}>
                  <div className="type-group-head">
                    <div>
                      <p className="eyebrow">Group {group.id}</p>
                      <h3>{group.title}</h3>
                    </div>
                    <p>{group.description}</p>
                  </div>
                  <div className="type-grid">
                    {group.codes.map((code) => {
                      const meta = TYPE_META[code]
                      return (
                        <article className="type-card" key={code}>
                          <div className="type-card-head">
                            <span className="type-code">{meta.code}</span>
                            <h4>{meta.displayName}</h4>
                          </div>
                          <p className="type-tagline">{meta.tagline}</p>
                          <p className="type-summary">{meta.summary}</p>
                          <div className="type-card-foot">
                            <p className="type-foot-label">最初の一歩</p>
                            <p>{meta.quickAction}</p>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
          </section>
        )}

        {screen === 'questions' && (
          <section className="question-stage fade-up">
            <div className="question-header">
              <div>
                <p className="eyebrow">{currentBlock.eyebrow}</p>
                <h2>{currentBlock.title}</h2>
                <p className="block-note">{currentBlock.note}</p>
              </div>
              <div className="progress-panel">
                <span className="progress-label">進行中</span>
                <div className="progress-track" aria-hidden="true">
                  <div
                    className="progress-fill"
                    style={{ width: `${blockProgress * 100}%` }}
                  />
                </div>
                <div className="progress-dots" aria-hidden="true">
                  {BLOCKS.map((block, index) => (
                    <span
                      key={block.id}
                      className={`progress-dot${index < blockIndex ? ' done' : ''}${index === blockIndex ? ' current' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="questions-list">
              {currentQuestions.map((question, index) => {
                const selected = answers[question.id]
                const isMissing = validationAttempted && selected === undefined
                const isCurrent = index === activeQuestionIndex
                const isAnswered = selected !== undefined
                const isLocked = index > activeQuestionIndex
                const isPrevious = index === activeQuestionIndex - 1
                const isNearCurrent = Math.abs(index - activeQuestionIndex) <= 1
                return (
                  <article
                    className={`question-card${isMissing ? ' question-card-error' : ''}${isCurrent ? ' question-card-current' : ''}${isAnswered && !isCurrent ? ' question-card-answered' : ''}${isLocked ? ' question-card-locked' : ''}${isPrevious ? ' question-card-previous' : ''}${isNearCurrent ? ' question-card-near' : ' question-card-far'}`}
                    key={question.id}
                    ref={(node) => {
                      questionRefs.current[index] = node
                    }}
                  >
                    <div className="question-meta">
                      <span>{isCurrent ? '現在の設問' : isPrevious ? '直前の設問' : isAnswered ? '回答済み' : 'この先の設問'}</span>
                    </div>
                    <p className="question-prompt">{question.prompt}</p>
                    <div className="scale-shell">
                      <div className="scale-guide" aria-hidden="true">
                        <span>そう思う</span>
                        <span>そう思わない</span>
                      </div>
                      <div className="scale-row" role="radiogroup" aria-label={question.prompt}>
                        {SCALE_OPTIONS.map((option, optionIndex) => {
                          const isSelected = selected === option.value
                          const sizeClass = optionIndex < 3 || optionIndex > 3 ? `scale-size-${Math.abs(3 - optionIndex)}` : 'scale-size-0'
                          return (
                            <button
                              key={option.value}
                              type="button"
                              className={`scale-dot ${sizeClass}${isSelected ? ' selected' : ''}`}
                              onClick={() => handleSelect(question.id, option.value as ScaleValue, index)}
                              aria-pressed={isSelected}
                              aria-label={option.label}
                              title={option.label}
                              disabled={isLocked}
                            >
                              <span className="sr-only">{option.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    {isMissing && <p className="error-text">この設問はまだ選択されていません。</p>}
                  </article>
                )
              })}
            </div>

            <div className="footer-actions">
              <button className="button ghost" onClick={goToPreviousBlock}>
                {blockIndex === 0 ? 'イントロへ戻る' : '前のページ'}
              </button>
              <button className="button primary" onClick={goToNextBlock}>
                {blockIndex === BLOCKS.length - 1 ? '結果を見る' : '次のページへ'}
              </button>
            </div>
          </section>
        )}

        {screen === 'loading' && (
          <section className="loading-panel fade-up">
            <div className="loading-orbit" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="eyebrow">Reading your campus rhythm</p>
            <h2>大学生活の優先傾向を整理しています</h2>
            <p className="lead small">
              4つの軸を重ねて、今のあなたに噛み合いやすい動き方をまとめています。
            </p>
          </section>
        )}

        {screen === 'result' && result && (
          <div className="result-stage fade-up">
            <section className="result-hero">
              <div className="result-copy">
                <p className="eyebrow">Diagnosis Result</p>
                <h2>{result.heroTitle}</h2>
                <p className="result-code">{result.typeCode}</p>
                <p className="lead">{result.heroSummary}</p>
                <div className="result-actions">
                  <button className="button primary" onClick={() => detailRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                    詳細を見る
                  </button>
                  <button className="button ghost" onClick={resetAssessment}>
                    もう一度診断する
                  </button>
                </div>
              </div>
              <aside className="result-card result-card-accent">
                <p className="result-card-label">今すぐやること</p>
                <h3>{result.typeMeta.quickAction}</h3>
                <p>{result.typeMeta.tagline}</p>
              </aside>
            </section>

            <section className="axis-grid">
              {result.axes.map((axis) => {
                const leftCopy = POLE_COPY[axis.leftPole]
                const rightCopy = POLE_COPY[axis.rightPole]
                const scorePercent = ((axis.score + 36) / 72) * 100
                return (
                  <article className="axis-card" key={axis.axis}>
                    <div className="axis-card-head">
                      <p>{AXIS_CONFIG[axis.axis].label}</p>
                      <span className={`clarity-badge clarity-${axis.clarity}`}>{axis.clarity}</span>
                    </div>
                    <div className="axis-poles">
                      <strong>{leftCopy.title}</strong>
                      <strong>{rightCopy.title}</strong>
                    </div>
                    <div className="axis-bar" aria-hidden="true">
                      <div className="axis-bar-center" />
                      <div className="axis-bar-knob" style={{ left: `${scorePercent}%` }} />
                    </div>
                    <p className="axis-caption">{getAxisCaption(axis)}</p>
                  </article>
                )
              })}
            </section>

            <nav className="result-nav" aria-label="結果の移動">
              <button className="nav-chip active" type="button">
                結果トップ
              </button>
              <button className="nav-chip" type="button" onClick={() => detailRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                詳細
              </button>
              <button className="nav-chip" type="button" onClick={() => shareRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                シェア
              </button>
            </nav>

            <section className="detail-grid" ref={detailRef}>
              <article className="detail-card detail-card-wide">
                <p className="eyebrow">What you seek</p>
                <h3>このタイプが大学で求めやすいもの</h3>
                <p>{result.desiredCampusLife}</p>
              </article>
              <article className="detail-card">
                <p className="eyebrow">Strength</p>
                <h3>噛み合ったときの強み</h3>
                <p>{result.strength}</p>
              </article>
              <article className="detail-card">
                <p className="eyebrow">Campus Style</p>
                <h3>向いている過ごし方</h3>
                <p>{result.campusStyle}</p>
              </article>
              <article className="detail-card">
                <p className="eyebrow">Activities</p>
                <h3>相性のよい活動</h3>
                <ul className="detail-list">
                  {result.activities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="detail-card">
                <p className="eyebrow">First Month</p>
                <h3>最初の1か月でやること</h3>
                <ul className="detail-list">
                  {result.firstMonth.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="detail-card">
                <p className="eyebrow">First 3 Months</p>
                <h3>最初の3か月でやること</h3>
                <ul className="detail-list">
                  {result.firstThreeMonths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="detail-card">
                <p className="eyebrow">Pitfall</p>
                <h3>ハマりやすい失敗</h3>
                <p>{result.pitfalls}</p>
              </article>
              <article className="detail-card">
                <p className="eyebrow">Reset</p>
                <h3>立て直し方</h3>
                <p>{result.resetTip}</p>
              </article>
            </section>

            <section className="share-panel" ref={shareRef}>
              <div>
                <p className="eyebrow">Share</p>
                <h3>結果をメモしておく</h3>
                <p>{result.shareText}</p>
              </div>
              <div className="share-actions">
                <button className="button primary" onClick={handleCopy}>
                  {copied ? 'コピーしました' : '結果テキストをコピー'}
                </button>
                <button className="button ghost" onClick={resetAssessment}>
                  最初からやり直す
                </button>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
