// ==========================================
// Application State
// ==========================================
const state = {
  currentView: 'portal', // portal, map, dashboard, quiz, result
  currentService: null,  // 'boki_tutorial', 'boki_shiwake'
  currentLevelId: null,  // 'lvl_0', 'lvl_1', etc.
  streak: 5,
  xp: 240,
  level: 2,
  hearts: 5,
  currentQuestionIndex: 0,
  selectedAnswer: null,
  answered: false,
  isCorrect: false,
  score: 0,
  firstTimeWrongCount: 0,
  activeQuestions: [],
  
  // 魔導ロードマップの進捗状況 (LocalStorageで永続化)
  roadmapProgress: {
    lvl_0: { unlocked: true, completed: false },
    lvl_1: { unlocked: true, completed: false },
    // 残りは動的に初期化
  }
};

// ==========================================
// 魔導ロードマップ レベルデータ定義
// ==========================================
const roadmapLevels = [
  {
    id: 'lvl_0',
    level: 0,
    title: '簿記の全体像マップ',
    subtitle: '冒険の前に地図を手に入れよう。決算までの道のり、5つの勘定科目グループ、借方・貸方の大原則を解説します。',
    url: 'http://localhost:3001/guides/why-boki',
    tags: ['導入', '全体像', '借方', '貸方', '決算', 'ロードマップ'],
    questions: [
      {
        text: '【簿記の基本】取引を記録する際、左側のことを何と呼びますか？',
        choices: ['借方 (左側)', '貸方 (右側)'],
        correct: 0,
        explanation: {
          concept: '借方と貸方の定位置',
          brilliantExplanation: '簿記では、帳簿の<strong>左側を「借方（かりかた）」</strong>、<strong>右側を「貸方（かしかた）」</strong>と呼びます。「り」は左にはらい、「し」は右にはらうと覚えるのが一般的です。'
        }
      },
      {
        text: '【5大要素】「建物」や「普通預金」は、簿記の5大要素のうちどれに分類されますか？',
        choices: ['資産', '負債', '純資産', '費用'],
        correct: 0,
        explanation: {
          concept: '勘定科目の分類',
          brilliantExplanation: '「建物」や「普通預金」など、会社が所有する金銭的価値のある財産は<strong>「資産」</strong>に分類されます。'
        }
      }
    ]
  },
  {
    id: 'lvl_1',
    level: 1,
    title: '現金と普通預金',
    subtitle: 'すべての取引の基本となる「資産」。簿記での「現金」の定義と、銀行口座である「普通預金」のルールを習得します。',
    url: 'http://localhost:3001/guides/cash-and-deposit',
    tags: ['資産', '現金', '普通預金'],
    questions: [
      {
        text: '【現金預入の仕訳】現金 10,000円を普通預金口座に預け入れた。正しい仕訳を選びなさい。',
        choices: [
          '(借) 普通預金 10,000 / (貸) 現金 10,000',
          '(借) 現金 10,000 / (貸) 普通預金 10,000',
          '(借) 当座預金 10,000 / (貸) 現金 10,000',
          '(借) 普通預金 10,000 / (貸) 売上 10,000'
        ],
        correct: 0,
        explanation: {
          concept: '資産の振替',
          brilliantExplanation: '普通預金（資産）が増加したため借方に、現金（資産）が減少したため貸方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_2',
    level: 2,
    title: '小口現金の泉',
    subtitle: '社内の小銭と細かい経費を管理する仕組み。日々の細かな支払いを効率よく管理する『小口現金』の流れをマスターします。',
    url: 'http://localhost:3001/guides/petty-cash',
    tags: ['資産', '小口現金', '当座預金', '費用', '旅費交通費', '消耗品費'],
    questions: [
      {
        text: '【小口現金の支払報告】用度係から、旅費交通費 3,000円を小口現金から支払ったとの報告を受けた。正しい仕訳を選びなさい。',
        choices: [
          '(借) 旅費交通費 3,000 / (貸) 小口現金 3,000',
          '(借) 小口現金 3,000 / (貸) 旅費交通費 3,000',
          '(借) 旅費交通費 3,000 / (貸) 当座預金 3,000',
          '(借) 消耗品費 3,000 / (貸) 小口現金 3,000'
        ],
        correct: 0,
        explanation: {
          concept: '小口現金の支払処理',
          brilliantExplanation: '旅費交通費（費用）が発生したため借方に、報告時点では小口現金（資産）が減少したとして貸方に小口現金を記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_3',
    level: 3,
    title: '売上の平原',
    subtitle: '仕入（費用の発生）と売上（収益の発生）の基本ルールと、送料（諸掛り）の処理をマスターします。',
    url: 'http://localhost:3001/guides/sales-and-purchases',
    tags: ['費用', '収益', '仕入', '売上', '諸掛り'],
    questions: [
      {
        text: '【仕入諸掛り】商品 50,000円を仕入れ、代金は掛けとした。なお、当店負担の発送運賃 3,000円は現金で支払った。',
        choices: [
          '(借) 仕入 53,000 / (貸) 買掛金 50,000 , 現金 3,000',
          '(借) 仕入 50,000 , 発送費 3,000 / (貸) 買掛金 50,000 , 現金 3,000',
          '(借) 仕入 50,000 / (貸) 買掛金 50,000',
          '(借) 仕入 53,000 / (貸) 買掛金 53,000'
        ],
        correct: 0,
        explanation: {
          concept: '仕入諸掛り（当店負担）',
          brilliantExplanation: '仕入時に発生した当店負担の諸掛り（発送運賃など）は、<strong>仕入原価（本体価格）に含める</strong>のがルールです。したがって仕入勘定は 53,000円になります。'
        }
      }
    ]
  },
  {
    id: 'lvl_4',
    level: 4,
    title: '掛取引の街道',
    subtitle: '後払い（掛け）の仕組み。お金を受け取る権利である「売掛金」と、支払う義務である「買掛金」の増減仕訳をマスターします。',
    url: 'http://localhost:3001/guides/accounts-receivable-payable',
    tags: ['資産', '負債', '売掛金', '買掛金'],
    questions: [
      {
        text: '【売掛金の回収】かねて掛けで売り上げていた商品の代金 20,000円が普通預金口座に振り込まれた。',
        choices: [
          '(借) 普通預金 20,000 / (貸) 売掛金 20,000',
          '(借) 売掛金 20,000 / (貸) 普通預金 20,000',
          '(借) 普通預金 20,000 / (貸) 売上 20,000',
          '(借) 売掛金 20,000 / (貸) 売上 20,000'
        ],
        correct: 0,
        explanation: {
          concept: '売掛金の減少',
          brilliantExplanation: '普通預金（資産）が増加したため借方に、売掛金（資産）という権利が回収されて消滅したため貸方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_5',
    level: 5,
    title: '電子マネーの街',
    subtitle: 'クレジットカード売上と信販未収金のルール。支払手数料の差し引き仕訳テクニックをマスターします。',
    url: 'http://localhost:3001/guides/credit-card-sales',
    tags: ['資産', '費用', '信販未収金', '支払手数料', 'クレジットカード'],
    questions: [
      {
        text: '【クレジットカード売上】商品 10,000円をクレジットカード決済で売り上げた。信販会社への手数料（2%）を販売時に計上する。',
        choices: [
          '(借) クレジット売掛金 9,800 , 支払手数料 200 / (貸) 売上 10,000',
          '(借) クレジット売掛金 10,000 / (貸) 売上 10,000',
          '(借) 売掛金 9,800 , 支払手数料 200 / (貸) 売上 10,000',
          '(借) クレジット売掛金 9,800 / (貸) 売上 9,800'
        ],
        correct: 0,
        explanation: {
          concept: 'クレジットカード売上（信販未収金）',
          brilliantExplanation: '信販会社に請求できる金額は手数料を引いた 9,800円のため「クレジット売掛金」を借方に、引かれた 200円は「支払手数料（費用）」として借方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_6',
    level: 6,
    title: '返品の港',
    subtitle: '商品の返品と送料。不良品を返した・返された時の『返品』の逆仕訳ルールをマスターします。',
    url: 'http://localhost:3001/guides/returns-and-shipping',
    tags: ['費用', '収益', '売上', '仕入', '売掛金', '買掛金', '返品'],
    questions: [
      {
        text: '【売上返品】以前に掛けで売り上げていた商品 5,000円分が不良品のため返品され、売掛金から相殺した。',
        choices: [
          '(借) 売上 5,000 / (貸) 売掛金 5,000',
          '(借) 売掛金 5,000 / (貸) 売上 5,000',
          '(借) 仕入 5,000 / (貸) 買掛金 5,000',
          '(借) 売上 5,000 / (貸) 現金 5,000'
        ],
        correct: 0,
        explanation: {
          concept: '売上の返品処理',
          brilliantExplanation: '返品された場合は、当初の売上仕訳を逆にする「逆仕訳」を行います。売上（収益）のマイナスとして借方に売上を、売掛金（資産）の減少として貸方に売掛金を記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_7',
    level: 7,
    title: '値引の市場',
    subtitle: '売上値引・仕入値引。品質不良・数量不足により代金を減額する際の仕訳をマスターします。',
    url: 'http://localhost:3001/guides/sales-purchase-returns',
    tags: ['費用', '収益', '売上値引', '仕入値引', '売上', '仕入', '返品'],
    questions: [
      {
        text: '【仕入値引】掛けで仕入れていた商品に汚損があったため、3,000円の値引きを受け、買掛金から差し引いた。',
        choices: [
          '(借) 買掛金 3,000 / (貸) 仕入 3,000',
          '(借) 仕入 3,000 / (貸) 買掛金 3,000',
          '(借) 買掛金 3,000 / (貸) 売上 3,000',
          '(借) 雑益 3,000 / (貸) 買掛金 3,000'
        ],
        correct: 0,
        explanation: {
          concept: '仕入値引の仕訳',
          brilliantExplanation: '仕入れた商品を値引きされた場合は、仕入高を直接減額します。買掛金（負債）の減少を借方に、仕入（費用）の減少を貸方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_8',
    level: 8,
    title: '貸借の橋',
    subtitle: 'お金の貸し借りと利息の計算。約束手形を担保とする場合や未払・未収利息の計上まで網羅します。',
    url: 'http://localhost:3001/guides/loans-and-interest',
    tags: ['貸付金', '借入金', '手形貸付金', '手形借入金', '支払利息', '受取利息', '利息計算'],
    questions: [
      {
        text: '【手形借入】取引先から 100,000円を借り入れ、同店振り出しの約束手形を受け取った。代金は当座預金に入金された。',
        choices: [
          '(借) 当座預金 100,000 / (貸) 手形借入金 100,000',
          '(借) 当座預金 100,000 / (貸) 借入金 100,000',
          '(借) 当座預金 100,000 / (貸) 支払手形 100,000',
          '(借) 受取手形 100,000 / (貸) 手形借入金 100,000'
        ],
        correct: 0,
        explanation: {
          concept: '手形借入金',
          brilliantExplanation: 'お金の貸し借りの際に約束手形を担保として受け取った（または振り出した）場合は、借入金ではなく<strong>「手形借入金（負債）」</strong>または「手形貸付金（資産）」を使用します。'
        }
      }
    ]
  },
  {
    id: 'lvl_9',
    level: 9,
    title: '手形の関所',
    subtitle: '約束手形の振出と受取の決済ルール。他人に譲渡する『裏書譲渡』まで完全習得します。',
    url: 'http://localhost:3001/guides/bills-receivable-payable',
    tags: ['資産', '負債', '受取手形', '支払手形', '約束手形', '裏書'],
    questions: [
      {
        text: '【手形の裏書譲渡】買掛金 30,000円の支払いのために、かねて受け取っていた取引先振出の約束手形を裏書譲渡した。',
        choices: [
          '(借) 買掛金 30,000 / (貸) 受取手形 30,000',
          '(借) 買掛金 30,000 / (貸) 支払手形 30,000',
          '(借) 受取手形 30,000 / (貸) 買掛金 30,000',
          '(借) 買掛金 30,000 / (貸) 売上 30,000'
        ],
        correct: 0,
        explanation: {
          concept: '手形の裏書譲渡',
          brilliantExplanation: '他人が振り出した手形を持っている（受取手形・資産）を、他人の支払いに充てるために譲り渡す行為を「裏書譲渡」と言います。手持ちの「受取手形（資産）」が減少するため貸方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_10',
    level: 10,
    title: '電子債権の塔',
    subtitle: '電子記録債権と電子記録債務のルール。売掛金や買掛金からの「振り替え（切り替え）」の仕訳をマスターします。',
    url: 'http://localhost:3001/guides/electronically-recorded-monetary-claims',
    tags: ['資産', '負債', '電子記録債権', '電子記録債務', '振り替え'],
    questions: [
      {
        text: '【電子債権への振替】売掛金 40,000円について、発生記録の請求を行い、電子記録債権となった。',
        choices: [
          '(借) 電子記録債権 40,000 / (貸) 売掛金 40,000',
          '(借) 売掛金 40,000 / (貸) 電子記録債権 40,000',
          '(借) 電子記録債務 40,000 / (貸) 売掛金 40,000',
          '(借) 電子記録債権 40,000 / (貸) 売上 40,000'
        ],
        correct: 0,
        explanation: {
          concept: '電子記録債権の発生',
          brilliantExplanation: '売掛金が電子記録債権に切り替わったため、電子記録債権（資産）の増加を借方に、売掛金（資産）の減少を貸方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_11',
    level: 11,
    title: '固定資産の工場',
    subtitle: '建物・備品・土地の購入と付随費用のルール。後払い時の『未払金』の区別を完全習得します。',
    url: 'http://localhost:3001/guides/fixed-assets-purchase',
    tags: ['資産', '負債', '建物', '備品', '土地', '未払金', '付随費用'],
    questions: [
      {
        text: '【備品購入と付随費用】事務用デスク 50,000円を購入し、代金は翌月払いとした。なお、引取運賃 2,000円は現金で支払った。',
        choices: [
          '(借) 備品 52,000 / (貸) 未払金 50,000 , 現金 2,000',
          '(借) 備品 52,000 / (貸) 買掛金 50,000 , 現金 2,000',
          '(借) 備品 50,000 , 支払手数料 2,000 / (貸) 未払金 50,000 , 現金 2,000',
          '(借) 備品 52,000 / (貸) 未払金 52,000'
        ],
        correct: 0,
        explanation: {
          concept: '固定資産の取得原価と未払金',
          brilliantExplanation: '固定資産の購入にかかった付随費用（引取運賃など）は、<strong>固定資産の本体代金に含めます</strong>。また、商品以外の購入に対する後払いは買掛金ではなく<strong>「未払金（負債）」</strong>を使います。'
        }
      }
    ]
  },
  {
    id: 'lvl_12',
    level: 12,
    title: '株式会社の財務サイクル',
    subtitle: '資本金から配当までの一連の流れ。株式会社の会計を「出資→稼ぐ→分ける」のサイクルで一気に整理します。',
    url: 'http://localhost:3001/guides/corporate-finance-cycle',
    tags: ['純資産', '負債', '資本金', '繰越利益剰余金', '配当', '利益準備金'],
    questions: [
      {
        text: '【剰余金の配当】株主総会において、繰越利益剰余金から株主配当金 50,000円の支払いが決議され、同時に利益準備金 5,000円を積み立てることとした。',
        choices: [
          '(借) 繰越利益剰余金 55,000 / (貸) 未払配当金 50,000 , 利益準備金 5,000',
          '(借) 繰越利益剰余金 50,000 / (貸) 未払配当金 50,000',
          '(借) 未払配当金 50,000 , 利益準備金 5,000 / (貸) 繰越利益剰余金 55,000',
          '(借) 繰越利益剰余金 55,000 / (貸) 未払配当金 50,000 , 資本金 5,000'
        ],
        correct: 0,
        explanation: {
          concept: '配当と準備金積立の仕訳',
          brilliantExplanation: '配当の原資として繰越利益剰余金（純資産）を減少させるため借方に。まだ配当金を支払っていないため義務として「未払配当金（負債）」を貸方に。積み立てた「利益準備金（純資産）」の増加を貸方に記録します。'
        }
      }
    ]
  },
  // 長期ロードマップの可視化のためにLv30までのプレースホルダーを配置し、適切な代表仕訳を関連付ける
  {
    id: 'lvl_15',
    level: 15,
    title: '法人税の関所',
    subtitle: '法人税等の前払い（中間納付）と決算精算の仕組みをマスターします。',
    url: 'http://localhost:3001/guides/corporate-taxes',
    tags: ['費用', '資産', '負債', '法人税等', '仮払法人税等', '未払法人税等'],
    questions: [
      {
        text: '【決算時の法人税等計上】決算にあたり、当期の法人税等が 80,000円と確定した。なお、中間申告時に 30,000円をすでに仮払いしているため、残額を未払いとした。',
        choices: [
          '(借) 法人税等 80,000 / (貸) 仮払法人税等 30,000 , 未払法人税等 50,000',
          '(借) 法人税等 80,000 / (貸) 現金 30,000 , 未払法人税等 50,000',
          '(借) 法人税等 50,000 / (貸) 未払法人税等 50,000',
          '(借) 仮払法人税等 30,000 , 未払法人税等 50,000 / (貸) 法人税等 80,000'
        ],
        correct: 0,
        explanation: {
          concept: '法人税等の確定仕訳',
          brilliantExplanation: '当期の費用として「法人税等 80,000円」を借方に計上し、期中に支払っていた「仮払法人税等（資産）30,000円」を取り崩すために貸方に相殺します。差額の 50,000円は「未払法人税等（負債）」とします。'
        }
      }
    ]
  },
  {
    id: 'lvl_20',
    level: 20,
    title: '過不足の迷宮',
    subtitle: '現金過不足の発生から決算整理の仕訳ルール。実際額に帳簿を合わせる方法をマスターします。',
    url: 'http://localhost:3001/guides/cash-over-short',
    tags: ['資産', '費用', '収益', '現金', '現金過不足', '雑損', '雑益', '決算整理'],
    questions: [
      {
        text: '【現金過不足の発生】金庫の現金実際有高を調べたところ 50,000円であったが、帳簿残高は 52,000円であった。原因は不明であるため、帳簿を修正した。',
        choices: [
          '(借) 現金過不足 2,000 / (貸) 現金 2,000',
          '(借) 現金 2,000 / (貸) 現金過不足 2,000',
          '(借) 雑損 2,000 / (貸) 現金 2,000',
          '(借) 現金 2,000 / (貸) 雑益 2,000'
        ],
        correct: 0,
        explanation: {
          concept: '現金過不足の発生仕訳',
          brilliantExplanation: '現金実際有高（50,000円）のほうが帳簿（52,000円）より少ないため、<strong>帳簿残高を減らして実際額に合わせます</strong>。よって貸方に現金 2,000円、借方に仮の整理科目である「現金過不足 2,000円」を計上します。'
        }
      }
    ]
  },
  {
    id: 'lvl_23',
    level: 23,
    title: '減価償却の回廊',
    subtitle: '価値が毎年減る「減価償却」。間接法と売却損益の仕訳を攻略します。',
    url: 'http://localhost:3001/guides/depreciation',
    tags: ['費用', '資産', '減価償却費', '減価償却累計額', '固定資産売却損', '固定資産売却益'],
    questions: [
      {
        text: '【減価償却の計上】当期末の決算において、備品（取得原価 100,000円、残存価額ゼロ、耐用年数5年）について定額法（間接法）で減価償却を行う。',
        choices: [
          '(借) 減価償却費 20,000 / (貸) 減価償却累計額 20,000',
          '(借) 減価償却費 20,000 / (貸) 備品 20,000',
          '(借) 減価償却累計額 20,000 / (貸) 減価償却費 20,000',
          '(借) 備品 20,000 / (貸) 減価償却費 20,000'
        ],
        correct: 0,
        explanation: {
          concept: '減価償却（間接法）の仕訳',
          brilliantExplanation: '定額法による計算：100,000 ÷ 5 ＝ 20,000円。間接法では、資産（備品）から直接差し引くのではなく、<strong>「減価償却累計額（資産のマイナス勘定）」</strong>を貸方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_26',
    level: 26,
    title: '経過勘定の4兄弟',
    subtitle: '決算整理の最重要テーマ「未払・前払・未収・前受」を一気に整理します。',
    url: 'http://localhost:3001/guides/accrual-adjustments',
    tags: ['決算整理', '経過勘定', '未払費用', '前払費用', '未収収益', '前受収益', '見越し', '繰延べ'],
    questions: [
      {
        text: '【決算整理・家賃の前払い】決算において、当期に支払った家賃のうち、翌期分に属する未経過分 12,000円を前払いとして処理する。',
        choices: [
          '(借) 前払家賃 12,000 / (貸) 支払家賃 12,000',
          '(借) 支払家賃 12,000 / (貸) 前払家賃 12,000',
          '(借) 前払家賃 12,000 / (貸) 現金 12,000',
          '(借) 未払家賃 12,000 / (貸) 支払家賃 12,000'
        ],
        correct: 0,
        explanation: {
          concept: '費用の繰延べ（前払家賃）',
          brilliantExplanation: '当期の費用から翌期の家賃を引く（費用のマイナス➔貸方に支払家賃）とともに、翌期にお金を使わずに住む権利として「前払家賃（資産➔借方に前払家賃）」を計上します。'
        }
      }
    ]
  },
  {
    id: 'lvl_30',
    level: 30,
    title: '未収の時の部屋',
    subtitle: '決算整理における収益の見越し。来年受け取る利息を当期に計上するルールを学びます。',
    url: 'http://localhost:3001/guides/accrued-revenues',
    tags: ['資産', '収益', '未収収益', '受取利息', '決算整理', '再振替仕訳'],
    questions: [
      {
        text: '【決算整理・利息の未収計上】当期末の決算において、貸付金に対する未収利息 5,000円を計上する。',
        choices: [
          '(借) 未収利息 5,000 / (貸) 受取利息 5,000',
          '(借) 受取利息 5,000 / (貸) 未収利息 5,000',
          '(借) 未収利息 5,000 / (貸) 貸付金 5,000',
          '(借) 未払利息 5,000 / (貸) 受取利息 5,000'
        ],
        correct: 0,
        explanation: {
          concept: '収益の見越し（未収利息）',
          brilliantExplanation: '当期に発生しているがまだ受け取っていない利息を、当期の収益にするため貸方に「受取利息」を。将来受け取る権利として借方に「未収利息（資産）」を記録します。'
        }
      }
    ]
  }
];

// ==========================================
// LocalStorage Progress Sync
// ==========================================
const loadRoadmapProgress = () => {
  try {
    const raw = localStorage.getItem('qlearn_roadmap_boki');
    let loaded = {};
    if (raw) {
      loaded = JSON.parse(raw);
    }
    
    // 既存データをベースにする
    state.roadmapProgress = loaded;
    
    // 定義されている全レベルについて、進捗データが存在しない場合は初期化
    roadmapLevels.forEach(lvl => {
      if (!state.roadmapProgress[lvl.id]) {
        // Lv0 と Lv1 は初期状態でアンロック
        const shouldBeUnlocked = lvl.id === 'lvl_0' || lvl.id === 'lvl_1';
        state.roadmapProgress[lvl.id] = { 
          unlocked: shouldBeUnlocked, 
          completed: false 
        };
      } else {
        // すでに存在する場合でも、初期レベルは常にアンロック状態を保証する
        if (lvl.id === 'lvl_0' || lvl.id === 'lvl_1') {
          state.roadmapProgress[lvl.id].unlocked = true;
        }
      }
    });
    
    saveRoadmapProgress();
  } catch (e) {
    console.error('Failed to load roadmap progress', e);
  }
};

const saveRoadmapProgress = () => {
  try {
    localStorage.setItem('qlearn_roadmap_boki', JSON.stringify(state.roadmapProgress));
  } catch (e) {
    console.error('Failed to save roadmap progress', e);
  }
};

// ==========================================
// Views Transition Router
// ==========================================
const syncHeader = () => {
  const globalStreak = document.getElementById('global-streak');
  const globalHearts = document.getElementById('global-hearts');
  
  if (globalStreak) globalStreak.innerText = state.streak;
  
  if (globalHearts) {
    if (state.currentService === 'boki_tutorial') {
      globalHearts.innerHTML = '<span class="text-xs">∞</span>';
      document.getElementById('global-hearts-container')?.classList.add('animate-pulse');
    } else {
      globalHearts.innerText = state.hearts;
      document.getElementById('global-hearts-container')?.classList.remove('animate-pulse');
    }
  }
};

const showView = (viewName) => {
  state.currentView = viewName;
  
  document.querySelectorAll('.app-screen').forEach(screen => {
    screen.classList.add('hidden');
  });
  
  const targetScreen = document.getElementById(`${viewName}-screen`);
  if (targetScreen) {
    targetScreen.classList.remove('hidden');
  }
  
  const actionBar = document.getElementById('quiz-action-bar');
  if (actionBar) {
    if (viewName === 'quiz') {
      actionBar.classList.remove('hidden');
    } else {
      actionBar.classList.add('hidden');
    }
  }
  
  syncHeader();
  
  if (viewName === 'portal') renderPortal();
  if (viewName === 'map') renderMap();
  if (viewName === 'dashboard') renderDashboard();
  if (viewName === 'quiz') renderQuiz();
  if (viewName === 'result') renderResult();
};

// ==========================================
// UI Rendering Functions
// ==========================================

// Portal Screen
const renderPortal = () => {
  const portalGrid = document.getElementById('portal-grid');
  portalGrid.innerHTML = `
    <!-- 1. 勘定科目マスター (チュートリアル) -->
    <div id="btn-portal-tutorial" class="glass-panel-interactive rounded-2xl p-6 cursor-pointer flex flex-col justify-between h-48 border-t-4 border-cyan-500">
      <div>
        <div class="flex justify-between items-start mb-4">
          <span class="text-xs font-semibold px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400">
            TUTORIAL
          </span>
          <i data-lucide="compass" class="text-gray-400 dark:text-gray-500 w-5 h-5"></i>
        </div>
        <h3 class="text-xl font-bold mb-1 text-gray-900 dark:text-white">勘定科目マスター</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400">借方・貸方の定位置を限界突破記憶 (無限ライフ)</p>
      </div>
      <div class="border-t border-gray-200 dark:border-gray-800 pt-3 mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span class="font-bold flex items-center gap-1"><i data-lucide="layers" class="w-3.5 h-3.5"></i> ${bokiAccounts.length} 勘定科目</span>
        <button class="px-4 py-1.5 rounded-lg text-white font-semibold text-xs bg-cyan-600 hover:bg-cyan-500">スタート</button>
      </div>
    </div>

    <!-- 2. 魔導ロードマップ (仕訳クエスト) -->
    <div id="btn-portal-shiwake" class="glass-panel-interactive rounded-2xl p-6 cursor-pointer flex flex-col justify-between h-48 border-t-4 border-indigo-500">
      <div>
        <div class="flex justify-between items-start mb-4">
          <span class="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400">
            ROADMAP
          </span>
          <i data-lucide="map" class="text-gray-400 dark:text-gray-500 w-5 h-5"></i>
        </div>
        <h3 class="text-xl font-bold mb-1 text-gray-900 dark:text-white">仕訳クエスト 魔導ロードマップ</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400">Lv0〜Lv38のクエストをすごろく形式で攻略</p>
      </div>
      <div class="border-t border-gray-200 dark:border-gray-800 pt-3 mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span class="font-bold flex items-center gap-1"><i data-lucide="award" class="w-3.5 h-3.5"></i> 全 ${roadmapLevels.length} ステージ</span>
        <button class="px-4 py-1.5 rounded-lg text-white font-semibold text-xs bg-indigo-600 hover:bg-indigo-500">開く</button>
      </div>
    </div>
  `;

  // Bind events
  document.getElementById('btn-portal-tutorial').addEventListener('click', () => {
    state.currentService = 'boki_tutorial';
    state.activeQuestions = generateTutorialQuestions();
    state.currentQuestionIndex = 0;
    state.score = 0;
    state.hearts = 5;
    state.firstTimeWrongCount = 0;
    showView('dashboard');
  });

  document.getElementById('btn-portal-shiwake').addEventListener('click', () => {
    state.currentService = 'boki_shiwake';
    showView('map');
  });

  safeCreateIcons();
};

// Map Screen (魔導ロードマップのすごろく描画)
const renderMap = () => {
  const mapContainer = document.getElementById('map-scroll-container');
  mapContainer.innerHTML = '';
  
  loadRoadmapProgress();

  // 縦スクロールロードマップの構築
  roadmapLevels.forEach((lvl, idx) => {
    const isUnlocked = state.roadmapProgress[lvl.id]?.unlocked || false;
    const isCompleted = state.roadmapProgress[lvl.id]?.completed || false;
    
    // 蛇行（すごろく風）レイアウト用位置決め
    // 0: 中央, 1: 少し左, 2: 中央, 3: 少し右... のように交互に振る
    let alignClass = 'justify-center';
    let offsetClass = '';
    if (idx % 4 === 1) {
      alignClass = 'justify-start pl-8 md:pl-16';
    } else if (idx % 4 === 3) {
      alignClass = 'justify-end pr-8 md:pr-16';
    }

    const node = document.createElement('div');
    node.className = `flex ${alignClass} w-full relative mb-12 z-10`;
    
    // ピンのクラス判定
    let pinBg = 'bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed';
    let pulseClass = '';
    
    if (isCompleted) {
      pinBg = 'bg-emerald-500 border-emerald-400 text-white cursor-pointer hover:scale-110 active:scale-95 transition-all duration-200';
    } else if (isUnlocked) {
      pinBg = 'bg-indigo-600 border-indigo-400 text-white cursor-pointer hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg neon-glow-indigo';
      pulseClass = 'animate-pulse-glow';
    }

    node.innerHTML = `
      <!-- Stage Pin -->
      <div class="flex flex-col items-center">
        <button id="pin-${lvl.id}" class="w-16 h-16 rounded-full border-4 flex flex-col items-center justify-center font-bold text-lg select-none relative ${pinBg} ${pulseClass}">
          <span class="text-[10px] uppercase font-bold tracking-tight opacity-75">Lv</span>
          <span class="text-lg -mt-1 font-heading">${lvl.level}</span>
          
          <!-- State icons -->
          ${isCompleted ? '<div class="absolute -top-1 -right-1 w-6 h-6 bg-emerald-600 rounded-full border border-white flex items-center justify-center text-xs">✓</div>' : ''}
          ${!isUnlocked ? '<div class="absolute -top-1 -right-1 w-6 h-6 bg-gray-700 rounded-full border border-gray-600 flex items-center justify-center text-xs"><i data-lucide="lock" class="w-3 h-3 text-gray-400"></i></div>' : ''}
        </button>
        <span class="mt-2 text-xs font-semibold text-center text-gray-800 dark:text-gray-300 max-w-[120px] truncate">${lvl.title}</span>
      </div>
    `;

    // クリックでレベル詳細ダイアログ表示
    if (isUnlocked) {
      node.querySelector(`#pin-${lvl.id}`).addEventListener('click', () => {
        showLevelDialog(lvl);
      });
    }

    mapContainer.appendChild(node);
  });
  
  safeCreateIcons();
};

// レベル詳細ダイアログ表示
const showLevelDialog = (lvl) => {
  const dialog = document.getElementById('map-level-dialog');
  
  document.getElementById('dialog-level-num').innerText = lvl.level;
  document.getElementById('dialog-title').innerText = lvl.title;
  document.getElementById('dialog-subtitle').innerText = lvl.subtitle;
  document.getElementById('dialog-url-link').href = lvl.url;
  
  // Tags
  const tagsContainer = document.getElementById('dialog-tags');
  tagsContainer.innerHTML = '';
  lvl.tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-[10px] font-semibold';
    span.innerText = `#${tag}`;
    tagsContainer.appendChild(span);
  });

  // クエスト開始ボタンのアクション
  const startBtn = document.getElementById('dialog-start-btn');
  startBtn.className = 'w-full py-3 rounded-xl text-white font-bold text-sm bg-indigo-600 hover:bg-indigo-500 transition duration-200';
  startBtn.onclick = () => {
    state.currentLevelId = lvl.id;
    state.activeQuestions = [...lvl.questions];
    state.currentQuestionIndex = 0;
    state.score = 0;
    state.hearts = 5;
    state.firstTimeWrongCount = 0;
    
    // ダイアログを閉じてダッシュボードへ
    dialog.classList.add('hidden');
    showView('dashboard');
  };

  dialog.classList.remove('hidden');
};

// Dashboard Screen
const renderDashboard = () => {
  // レベル指定がある場合とチュートリアルで分岐
  let title = '';
  let subtitle = '';
  let color = 'indigo';
  
  if (state.currentService === 'boki_tutorial') {
    title = servicesData.boki_tutorial.title;
    subtitle = servicesData.boki_tutorial.subtitle;
    color = servicesData.boki_tutorial.themeColor;
  } else {
    const lvl = roadmapLevels.find(l => l.id === state.currentLevelId);
    title = `Lv${lvl.level} : ${lvl.title}`;
    subtitle = lvl.subtitle;
  }
  
  document.getElementById('dash-course-title').innerText = title;
  document.getElementById('dash-streak-count').innerText = state.streak;
  document.getElementById('dash-xp-count').innerText = `${state.xp}/300 XP`;
  
  const xpPercent = Math.min((state.xp / 300) * 100, 100);
  document.getElementById('dash-xp-progress').style.width = `${xpPercent}%`;
  
  const startBtn = document.getElementById('dash-start-btn');
  startBtn.style.backgroundColor = getThemeColorHex(color);
  startBtn.className = `w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 neon-glow-${color}`;
  
  // リーグ描画
  const leagueList = document.getElementById('dash-league-list');
  leagueList.innerHTML = `
    <div class="flex items-center justify-between p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
      <div class="flex items-center gap-3">
        <span class="font-bold text-indigo-500 dark:text-indigo-400 w-5 text-center">1</span>
        <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 flex items-center justify-center font-bold text-xs text-black">👑</div>
        <span class="font-medium text-gray-900 dark:text-white text-sm">あなた (You)</span>
      </div>
      <span class="text-xs font-bold text-indigo-600 dark:text-indigo-300 font-mono">${state.xp} XP</span>
    </div>
  `;
  
  safeCreateIcons();
};

// Quiz Screen
const renderQuiz = () => {
  const service = servicesData[state.currentService];
  const question = state.activeQuestions[state.currentQuestionIndex];
  
  if (!question) {
    return showView('result');
  }
  
  // テーマ決定
  const color = state.currentService === 'boki_tutorial' ? 'cyan' : 'indigo';
  const themeHex = getThemeColorHex(color);
  
  // Set hearts status
  const heartsCountEl = document.getElementById('quiz-hearts-count');
  if (state.currentService === 'boki_tutorial') {
    heartsCountEl.innerHTML = '<span class="text-xs">∞</span>';
  } else {
    heartsCountEl.innerText = state.hearts;
  }
  
  const progressPercent = ((state.currentQuestionIndex) / state.activeQuestions.length) * 100;
  document.getElementById('quiz-progress-bar').style.width = `${progressPercent}%`;
  document.getElementById('quiz-progress-bar').style.backgroundColor = themeHex;
  
  const questionTextEl = document.getElementById('quiz-question-text');
  if (question.type === 'tutorial') {
    questionTextEl.innerHTML = `
      <div class="text-center space-y-2">
        <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-heading">この勘定科目が増える方は？</div>
        <div class="text-4xl md:text-5xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight py-6">${question.text}</div>
      </div>
    `;
  } else {
    questionTextEl.innerText = question.text;
  }
  
  const choicesContainer = document.getElementById('quiz-choices-container');
  choicesContainer.innerHTML = '';
  
  state.selectedAnswer = null;
  state.answered = false;
  
  const actionBar = document.getElementById('quiz-action-bar');
  actionBar.className = "border-t border-gray-200 dark:border-gray-850 bg-gray-50 dark:bg-gray-950/80 p-4 transition-all duration-300";
  actionBar.innerHTML = `
    <div class="max-w-xl mx-auto flex items-center justify-between gap-4">
      <button id="quiz-skip-btn" class="px-6 py-3 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
        スキップ
      </button>
      <button id="quiz-check-btn" disabled class="px-8 py-3 rounded-xl font-bold text-gray-400 bg-gray-200 dark:text-gray-500 dark:bg-gray-800 cursor-not-allowed transition flex-1 max-w-[200px]">
        確認する
      </button>
    </div>
  `;
  
  const imageContainer = document.getElementById('quiz-image-container');
  imageContainer.classList.add('hidden');
  
  // 左右2択レイアウト分岐 (チュートリアル、または選択肢が「借方/貸方」の場合も2列にする)
  const isTwoChoice = question.type === 'tutorial' || question.choices.length === 2;
  if (isTwoChoice) {
    choicesContainer.className = "grid grid-cols-2 gap-4 pt-6";
  } else {
    choicesContainer.className = "space-y-3 pt-4";
  }
  
  question.choices.forEach((choice, idx) => {
    const button = document.createElement('button');
    
    if (isTwoChoice) {
      const isLeft = idx === 0;
      const borderTheme = isLeft ? 'border-emerald-500/20 hover:border-emerald-500' : 'border-indigo-500/20 hover:border-indigo-500';
      button.className = `choice-card h-40 text-center p-6 rounded-2xl bg-white dark:bg-gray-900 border ${borderTheme} transition flex flex-col justify-center items-center gap-3`;
      button.innerHTML = `
        <span class="text-xs text-gray-400 font-heading uppercase">${isLeft ? 'Debit / 借方' : 'Credit / 貸方'}</span>
        <span class="text-lg font-extrabold text-gray-800 dark:text-gray-100">${choice}</span>
      `;
    } else {
      button.className = 'choice-card w-full text-left p-4 rounded-xl glass-panel-interactive border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition flex items-center justify-between text-sm';
      button.innerHTML = `
        <span class="flex items-center gap-3">
          <span class="w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-800/80 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700 font-mono">${idx + 1}</span>
          <span class="text-gray-800 dark:text-gray-200 text-sm md:text-base">${choice}</span>
        </span>
      `;
    }
    
    button.addEventListener('click', () => {
      if (state.answered) return;
      
      playSound('select');
      
      document.querySelectorAll('.choice-card').forEach(card => {
        card.classList.remove('selected');
        card.style.borderColor = '';
      });
      
      button.classList.add('selected');
      button.style.borderColor = themeHex;
      state.selectedAnswer = idx;
      
      const checkBtn = document.getElementById('quiz-check-btn');
      checkBtn.disabled = false;
      checkBtn.classList.remove('bg-gray-200', 'text-gray-400', 'dark:bg-gray-800', 'dark:text-gray-500', 'cursor-not-allowed');
      checkBtn.classList.add('text-white');
      checkBtn.style.backgroundColor = themeHex;
    });
    
    choicesContainer.appendChild(button);
  });
  
  document.getElementById('quiz-check-btn').addEventListener('click', checkAnswer);
  document.getElementById('quiz-skip-btn').addEventListener('click', () => {
    state.firstTimeWrongCount++;
    state.activeQuestions.push({ ...question });
    
    if (state.currentService !== 'boki_tutorial') {
      state.hearts--;
      syncHeader();
    }
    
    if (state.hearts <= 0 && state.currentService !== 'boki_tutorial') {
      showView('dashboard');
    } else {
      nextQuestion();
    }
  });
};

// Check Answer Logic
const checkAnswer = () => {
  if (state.answered) return;
  state.answered = true;
  
  const question = state.activeQuestions[state.currentQuestionIndex];
  const isCorrect = state.selectedAnswer === question.correct;
  state.isCorrect = isCorrect;
  
  const choices = document.querySelectorAll('.choice-card');
  const checkedCard = choices[state.selectedAnswer];
  const correctCard = choices[question.correct];
  
  const actionBar = document.getElementById('quiz-action-bar');
  
  updateSM2(question, isCorrect);
  
  if (isCorrect) {
    state.score += 10;
    state.xp += 15;
    playSound('correct');
    triggerConfetti();
    
    checkedCard.classList.add('correct');
    checkedCard.style.borderColor = '#22c55e';
    
    actionBar.className = "border-t border-emerald-300 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-950/90 p-6 transition-all duration-300";
    actionBar.innerHTML = `
      <div class="max-w-xl mx-auto space-y-4">
        <div class="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-bold text-lg">
          <div class="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white dark:text-black">✓</div>
          素晴らしい！正解です。
        </div>
        
        <div class="bg-white dark:bg-black/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-500/20 text-gray-700 dark:text-gray-300 shadow-sm">
          <div class="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 font-heading">
            Brilliant式 構造解説
          </div>
          ${question.explanation.brilliantExplanation}
        </div>
        
        <div class="flex justify-end pt-2">
          <button id="quiz-next-btn" class="px-8 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg shadow-emerald-900/30">
            次へ進む
          </button>
        </div>
      </div>
    `;
  } else {
    state.firstTimeWrongCount++;
    state.activeQuestions.push({ ...question });
    
    if (state.currentService !== 'boki_tutorial') {
      state.hearts--;
      syncHeader();
    }
    playSound('incorrect');
    
    checkedCard.classList.add('incorrect', 'animate-shake');
    checkedCard.style.borderColor = '#ef4444';
    correctCard.style.borderColor = '#22c55e';
    
    actionBar.className = "border-t border-red-300 dark:border-red-800/50 bg-red-50 dark:bg-red-950/90 p-6 transition-all duration-300";
    actionBar.innerHTML = `
      <div class="max-w-xl mx-auto space-y-4">
        <div class="flex items-center gap-3 text-red-600 dark:text-red-400 font-bold text-lg">
          <div class="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white">!</div>
          残念、違います。（後ほど再出題されます）
        </div>
        
        <div class="text-sm text-red-700 dark:text-red-300/80 mb-2">
          正解: <strong class="text-emerald-600 dark:text-emerald-400">${question.choices[question.correct]}</strong>
        </div>
        
        <div class="bg-white dark:bg-black/40 p-4 rounded-xl border border-red-200 dark:border-red-500/20 text-gray-700 dark:text-gray-300 shadow-sm">
          <div class="font-bold text-xs uppercase tracking-wider text-red-600 dark:text-emerald-400 mb-2 font-heading">
            Brilliant式 構造解説
          </div>
          ${question.explanation.brilliantExplanation}
        </div>
        
        <div class="flex justify-between items-center pt-2">
          <span class="text-xs text-red-600 dark:text-red-400 font-semibold flex items-center gap-1">
            <i data-lucide="heart" class="w-4 h-4 fill-red-500 text-red-500 animate-pulse"></i> 
            ライフ残量: ${state.currentService === 'boki_tutorial' ? '∞ (チュートリアル)' : state.hearts}
          </span>
          <button id="quiz-next-btn" class="px-8 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-500 transition shadow-lg shadow-red-900/30">
            閉じて次へ
          </button>
        </div>
      </div>
    `;
    safeCreateIcons();
  }
  
  document.getElementById('quiz-next-btn').addEventListener('click', () => {
    if (state.hearts <= 0 && state.currentService !== 'boki_tutorial') {
      showView('dashboard');
    } else {
      nextQuestion();
    }
  });
};

const nextQuestion = () => {
  state.currentQuestionIndex++;
  if (state.currentQuestionIndex >= state.activeQuestions.length) {
    showView('result');
  } else {
    renderQuiz();
  }
};

// Result Screen
const renderResult = () => {
  playSound('level-up');
  
  let courseTitle = '';
  if (state.currentService === 'boki_tutorial') {
    courseTitle = servicesData.boki_tutorial.title;
  } else {
    const lvl = roadmapLevels.find(l => l.id === state.currentLevelId);
    courseTitle = `Lv${lvl.level} : ${lvl.title}`;
    
    // 魔導ロードマップの進捗解除
    state.roadmapProgress[lvl.id].completed = true;
    
    // 次のレベルのアンロック
    const nextLvlIndex = roadmapLevels.findIndex(l => l.id === lvl.id) + 1;
    if (nextLvlIndex < roadmapLevels.length) {
      const nextLvl = roadmapLevels[nextLvlIndex];
      if (state.roadmapProgress[nextLvl.id]) {
        state.roadmapProgress[nextLvl.id].unlocked = true;
      }
    }
    saveRoadmapProgress();
  }

  document.getElementById('res-service-name').innerText = courseTitle;
  document.getElementById('res-score').innerText = `+${state.score} pt`;
  document.getElementById('res-xp-count').innerText = `獲得XP: +${state.score * 1.5} XP`;
  
  state.xp += state.score * 1.5;
  if (state.xp >= 300) {
    state.level++;
    state.xp = state.xp - 300;
    state.streak++;
    
    const levelUpModal = document.getElementById('level-up-toast');
    levelUpModal.classList.remove('hidden');
    setTimeout(() => {
      levelUpModal.classList.add('hidden');
    }, 4000);
  }
  
  const reviewBtnContainer = document.getElementById('res-review-container');
  if (state.firstTimeWrongCount > 0) {
    reviewBtnContainer.innerHTML = `
      <div class="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-center">
        <p class="text-xs text-orange-600 dark:text-orange-300">
          このセッションで <strong>${state.firstTimeWrongCount} 回</strong> 間違えましたが、しつこく復習してすべて克服しました！
        </p>
      </div>
    `;
  } else {
    reviewBtnContainer.innerHTML = `
      <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
        <p class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">パーフェクト！一発ですべて正解しました。素晴らしい記憶力です！</p>
      </div>
    `;
  }

  // 戻るボタンの遷移先（仕訳ならマップ、チュートリアルならポータル）
  document.getElementById('res-home-btn').onclick = () => {
    if (state.currentService === 'boki_shiwake') {
      showView('map');
    } else {
      showView('portal');
    }
  };
};

// ==========================================
// Theme (Light/Dark Mode) Controller
// ==========================================
const initTheme = () => {
  const isDark = localStorage.getItem('theme') !== 'light';
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcon(isDark);
};

const toggleTheme = () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon(isDark);
};

const updateThemeIcon = (isDark) => {
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) {
    if (isDark) {
      icon.innerHTML = `<i data-lucide="sun" class="text-yellow-400 w-5 h-5"></i>`;
    } else {
      icon.innerHTML = `<i data-lucide="moon" class="text-slate-600 w-5 h-5"></i>`;
    }
    safeCreateIcons();
  }
};

const safeCreateIcons = () => {
  try {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  } catch (e) {
    console.warn('Lucide icons failed to render', e);
  }
};

// ==========================================
// Utility Helpers & Visual Effects
// ==========================================
const getThemeColorHex = (theme) => {
  switch (theme) {
    case 'indigo': return '#6366f1';
    case 'cyan': return '#06b6d4';
    default: return '#6366f1';
  }
};

const triggerConfetti = () => {
  const container = document.body;
  const colors = ['#f43f5e', '#3b82f6', '#10b981', '#eab308', '#a855f7'];
  
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.transform = `scale(${Math.random() * 0.8 + 0.4})`;
    confetti.style.animationDelay = `${Math.random() * 0.5}s`;
    confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
    
    container.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, 2500);
  }
};

// ==========================================
// Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Bind Static Navigation
  const headerLogo = document.getElementById('header-logo');
  if (headerLogo) {
    headerLogo.addEventListener('click', () => {
      showView('portal');
    });
  }

  document.getElementById('dash-start-btn').addEventListener('click', () => {
    showView('quiz');
  });
  
  document.getElementById('dash-back-btn').addEventListener('click', () => {
    if (state.currentService === 'boki_shiwake') {
      showView('map');
    } else {
      showView('portal');
    }
  });

  // ロードマップ画面の閉じるボタン
  document.getElementById('map-back-btn').addEventListener('click', () => {
    showView('portal');
  });

  // レベル詳細ダイアログの閉じるボタン
  document.getElementById('dialog-close-btn').addEventListener('click', () => {
    document.getElementById('map-level-dialog').classList.add('hidden');
  });
  
  showView('portal');
});
