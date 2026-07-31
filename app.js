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
  soundEnabled: true,
  
  // 魔導ロードマップの進捗状況 (LocalStorageで永続化)
  roadmapProgress: {
    lvl_0: { unlocked: true, completed: false },
    lvl_1: { unlocked: true, completed: false }
  }
};

// ==========================================
// 簿記3級 勘定科目データ一覧 (57種類)
// ==========================================
const bokiAccounts = [
  // 資産 (借方)
  { name: '現金', category: '資産', side: 0 },
  { name: '普通預金', category: '資産', side: 0 },
  { name: '定期預金', category: '資産', side: 0 },
  { name: '当座預金', category: '資産', side: 0 },
  { name: '受取手形', category: '資産', side: 0 },
  { name: '電子記録債権', category: '資産', side: 0 },
  { name: '商品', category: '資産', side: 0 },
  { name: '売掛金', category: '資産', side: 0 },
  { name: 'クレジット売掛金', category: '資産', side: 0 },
  { name: '貸付金', category: '資産', side: 0 },
  { name: '手形貸付金', category: '資産', side: 0 },
  { name: '未収入金', category: '資産', side: 0 },
  { name: '前払金', category: '資産', side: 0 },
  { name: '仮払金', category: '資産', side: 0 },
  { name: '立替金', category: '資産', side: 0 },
  { name: '従業員立替金', category: '資産', side: 0 },
  { name: '受取商品券', category: '資産', side: 0 },
  { name: '差入保証金', category: '資産', side: 0 },
  { name: '建物', category: '資産', side: 0 },
  { name: '貯蔵品', category: '資産', side: 0 },
  { name: '土地', category: '資産', side: 0 },
  { name: '備品', category: '資産', side: 0 },
  { name: '車両運搬具', category: '資産', side: 0 },
  { name: '仮払法人税等', category: '資産', side: 0 },
  { name: '仮払消費税', category: '資産', side: 0 },
  { name: '前払費用', category: '資産', side: 0 },
  { name: '未収収益', category: '資産', side: 0 },

  // 負債 (貸方)
  { name: '買掛金', category: '負債', side: 1 },
  { name: '当座借越', category: '負債', side: 1 },
  { name: '借入金', category: '負債', side: 1 },
  { name: '支払手形', category: '負債', side: 1 },
  { name: '電子記録債務', category: '負債', side: 1 },
  { name: '手形借入金', category: '負債', side: 1 },
  { name: '未払金', category: '負債', side: 1 },
  { name: '前受金', category: '負債', side: 1 },
  { name: '仮受金', category: '負債', side: 1 },
  { name: '預り金', category: '負債', side: 1 },
  { name: '従業員預り金', category: '負債', side: 1 },
  { name: '所得税預り金', category: '負債', side: 1 },
  { name: '社会保険料預り金', category: '負債', side: 1 },
  { name: '未払配当金', category: '負債', side: 1 },
  { name: '未払法人税等', category: '負債', side: 1 },
  { name: '仮受消費税', category: '負債', side: 1 },
  { name: '未払消費税', category: '負債', side: 1 },
  { name: '未払費用', category: '負債', side: 1 },
  { name: '前受収益', category: '負債', side: 1 },

  // 純資産 (貸方)
  { name: '資本金', category: '純資産', side: 1 },
  { name: '資本準備金', category: '純資産', side: 1 },
  { name: '繰越利益剰余金', category: '純資産', side: 1 },

  // 費用 (借方)
  { name: '仕入', category: '費用', side: 0 },
  { name: '発送費', category: '費用', side: 0 },
  { name: '通信費', category: '費用', side: 0 },
  { name: '修繕費', category: '費用', side: 0 },
  { name: '支払保険料', category: '費用', side: 0 },
  { name: '広告費', category: '費用', side: 0 },
  { name: '支払手数料', category: '費用', side: 0 },
  { name: '支払利息', category: '費用', side: 0 },
  { name: '旅費交通費', category: '費用', side: 0 },
  { name: '給料', category: '費用', side: 0 },
  { name: '消耗品費', category: '費用', side: 0 },
  { name: '租税公課', category: '費用', side: 0 },
  { name: '法定福利費', category: '費用', side: 0 },
  { name: '貸倒損失', category: '費用', side: 0 },
  { name: '貸倒引当金繰入', category: '費用', side: 0 },
  { name: '減価償却費', category: '費用', side: 0 },
  { name: '固定資産売却損', category: '費用', side: 0 },
  { name: '支払家賃', category: '費用', side: 0 },
  { name: '法人税等', category: '費用', side: 0 },

  // 収益 (貸方)
  { name: '商品売買益', category: '収益', side: 1 },
  { name: '売上', category: '収益', side: 1 },
  { name: '受取利息', category: '収益', side: 1 },
  { name: '貸倒引当金戻入', category: '収益', side: 1 },
  { name: '償却債権取立益', category: '収益', side: 1 },
  { name: '固定資産売却益', category: '収益', side: 1 },
  { name: '受取地代', category: '収益', side: 1 },

  // 評価勘定 (貸方)
  { name: '貸倒引当金', category: '評価勘定', side: 1 },
  { name: '減価償却累計額', category: '評価勘定', side: 1 }
];

// ==========================================
// SM-2 Spaced Repetition Engine
// ==========================================
const getSM2Key = (question) => {
  return question.type === 'tutorial' ? question.text : question.text.substring(0, 30);
};

const loadSM2Data = () => {
  try {
    const raw = localStorage.getItem('qlearn_sm2_boki');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Failed to load SM-2 data', e);
    return {};
  }
};

const saveSM2Data = (data) => {
  try {
    localStorage.setItem('qlearn_sm2_boki', JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save SM-2 data', e);
  }
};

const updateSM2 = (question, isCorrect) => {
  const data = loadSM2Data();
  const key = getSM2Key(question);
  
  const record = data[key] || {
    repetitions: 0,
    easiness: 2.5,
    interval: 0,
    lastLearned: Date.now()
  };
  
  const q = isCorrect ? 5 : 1;
  
  if (q < 3) {
    record.repetitions = 0;
    record.interval = 1;
  } else {
    if (record.repetitions === 0) {
      record.interval = 1;
    } else if (record.repetitions === 1) {
      record.interval = 6;
    } else {
      record.interval = Math.round(record.interval * record.easiness);
    }
    record.repetitions += 1;
  }
  
  record.easiness = record.easiness + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (record.easiness < 1.3) {
    record.easiness = 1.3;
  }
  
  record.lastLearned = Date.now();
  data[key] = record;
  saveSM2Data(data);
};

const sortQuestionsBySM2 = (questions) => {
  const sm2Data = loadSM2Data();
  
  const scoredQuestions = questions.map(q => {
    const key = getSM2Key(q);
    const record = sm2Data[key];
    
    let score = 0;
    
    if (!record) {
      score = 50;
    } else {
      const nextReviewDate = record.lastLearned + (record.interval * 24 * 60 * 60 * 1000);
      const timeRemaining = nextReviewDate - Date.now();
      
      if (timeRemaining <= 0) {
        const daysOverdue = Math.abs(timeRemaining) / (24 * 60 * 60 * 1000);
        score = 100 + daysOverdue;
      } else {
        score = 10 - (timeRemaining / (24 * 60 * 60 * 1000));
      }
      
      if (record.interval === 1 && record.repetitions === 0) {
        score += 200;
      }
      
      score += (3.0 - record.easiness) * 10;
    }
    
    return { question: q, score };
  });
  
  return scoredQuestions
    .sort((a, b) => b.score - a.score)
    .map(sq => sq.question);
};

// ==========================================
// Quiz Data Configuration
// ==========================================
const generateTutorialQuestions = () => {
  const questions = bokiAccounts.map(acc => {
    const isBS = ['資産', '負債', '純資産', '評価勘定'].includes(acc.category);
    
    let bsText = '';
    if (isBS) {
      bsText = `
        <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800">
          <div class="w-1/2 text-center border-r border-gray-200 dark:border-gray-800 py-1 ${acc.side === 0 ? 'bg-emerald-500/10 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-gray-400'}">
            資産の増加
          </div>
          <div class="w-1/2 text-center py-1 flex flex-col items-center justify-center gap-0.5">
            <span class="${acc.category === '負債' ? 'bg-indigo-500/10 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 font-bold px-1 rounded' : 'text-gray-400'}">負債の増加</span>
            <span class="${acc.category === '純資産' ? 'bg-indigo-500/10 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 font-bold px-1 rounded' : 'text-gray-400'}">純資産の増加</span>
            <span class="${acc.category === '評価勘定' ? 'bg-red-500/10 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-bold px-1 rounded' : 'text-gray-400'}">評価の増加 (-)</span>
          </div>
        </div>
        <div class="text-[9px] text-gray-400 dark:text-gray-500 text-center pt-1">貸借対照表 (B/S) 定位置</div>
      `;
    } else {
      bsText = `
        <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800">
          <div class="w-1/2 text-center border-r border-gray-200 dark:border-gray-800 py-1 ${acc.side === 0 ? 'bg-emerald-500/10 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-gray-400'}">
            費用の発生
          </div>
          <div class="w-1/2 text-center py-1 ${acc.side === 1 ? 'bg-indigo-500/10 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 font-bold' : 'text-gray-400'}">
            収益の発生
          </div>
        </div>
        <div class="text-[9px] text-gray-400 dark:text-gray-500 text-center pt-1">損益計算書 (P/L) 定位置</div>
      `;
    }

    return {
      text: acc.name,
      type: 'tutorial',
      choices: ['借方 (左側)', '貸方 (右側)'],
      correct: acc.side,
      explanation: {
        concept: `${acc.name} ➔ ${acc.category}`,
        brilliantExplanation: `
          <div class="space-y-3 font-sans">
            <div class="flex items-center gap-2 text-indigo-600 dark:text-indigo-300 font-semibold text-sm">
              <span class="px-2 py-0.5 rounded bg-indigo-500/10 dark:bg-indigo-500/20">勘定科目の分類</span>
              <span>「${acc.name}」➔ ${acc.category}</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
              「${acc.name}」は <strong>${acc.category}</strong> に分類されます。
              このグループの「増加（または発生）」は、<strong>${acc.side === 0 ? '借方（左側）' : '貸方（右側）'}</strong> に記録するのがルールです。
            </p>
            <div class="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-gray-50/50 dark:bg-gray-900/30">
              <div class="grid grid-cols-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-center font-bold py-1 text-xs text-gray-500 dark:text-gray-400">
                <div class="border-r border-gray-200 dark:border-gray-800">借方 (左)</div>
                <div>貸方 (右)</div>
              </div>
              ${bsText}
            </div>
          </div>
        `
      }
    };
  });
  
  return sortQuestionsBySM2(questions);
};

// 魔導ロードマップ レベルデータ定義 (Lv0〜Lv39)
const roadmapLevels = [
  {
    id: 'lvl_0',
    level: 0,
    title: '簿記の全体像マップ',
    subtitle: '決算までの道のり、5つの勘定科目グループ、借方・貸方の大原則を解説します。',
    url: 'http://localhost:3001/guides/why-boki',
    tags: ['導入', '全体像', '借方', '貸方', '決算', 'ロードマップ'],
    questions: [
      {
        text: '【簿記の基本】取引を記録する際、左側のことを何と呼びますか？',
        choices: ['借方 (左側)', '貸方 (右側)'],
        correct: 0,
        explanation: {
          concept: '借方と貸方の定位置',
          brilliantExplanation: '簿記では、帳簿の<strong>左側を「借方（かりかた）」</strong>、<strong>右側を「貸方（かしかた）」</strong>と呼びます。「り」は左にはらい、「し」は右にはらうと覚えます。'
        }
      }
    ]
  },
  {
    id: 'lvl_1',
    level: 1,
    title: '現金と普通預金',
    subtitle: 'すべての取引の基本となる「資産」。簿記での「現金」の定義と、「普通預金」のルール。',
    url: 'http://localhost:3001/guides/cash-and-deposit',
    tags: ['資産', '現金', '普通預金'],
    questions: [
      {
        text: '【現金預入】現金 10,000円を普通預金口座に預け入れた。正しい仕訳は？',
        choices: [
          '(借) 普通預金 10,000 / (貸) 現金 10,000',
          '(借) 現金 10,000 / (貸) 普通預金 10,000',
          '(借) 当座預金 10,000 / (貸) 現金 10,000'
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
    subtitle: '細かい経費を管理する『小口現金（インプレスト・システム）』の流れをマスターします。',
    url: 'http://localhost:3001/guides/petty-cash',
    tags: ['資産', '小口現金', '旅費交通費'],
    questions: [
      {
        text: '【支払報告】用度係から、旅費交通費 3,000円を小口現金から支払ったとの報告を受けた。',
        choices: [
          '(借) 旅費交通費 3,000 / (貸) 小口現金 3,000',
          '(借) 小口現金 3,000 / (貸) 旅費交通費 3,000'
        ],
        correct: 0,
        explanation: {
          concept: '小口現金の支払',
          brilliantExplanation: '旅費交通費（費用）の発生を借方に、小口現金（資産）の減少を貸方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_3',
    level: 3,
    title: '売上の平原',
    subtitle: '仕入（費用の発生）と売上（収益の発生）の基本ルールと、発送費・諸掛りの処理。',
    url: 'http://localhost:3001/guides/sales-and-purchases',
    tags: ['費用', '収益', '仕入', '売上', '諸掛り'],
    questions: [
      {
        text: '【仕入諸掛り】商品 50,000円を仕入れ、代金は掛けとした。なお当店負担の引取運賃 3,000円は現金で支払った。',
        choices: [
          '(借) 仕入 53,000 / (貸) 買掛金 50,000 , 現金 3,000',
          '(借) 仕入 50,000 , 発送費 3,000 / (貸) 買掛金 50,000 , 現金 3,000'
        ],
        correct: 0,
        explanation: {
          concept: '仕入諸掛り（当店負担）',
          brilliantExplanation: '当店負担の仕入諸掛り（引取運賃など）は、<strong>仕入原価（仕入）に含める</strong>のがルールです。'
        }
      }
    ]
  },
  {
    id: 'lvl_4',
    level: 4,
    title: '掛取引の街道',
    subtitle: '後払い（掛け）の仕組み。権利である「売掛金」と、義務である「買掛金」の増減仕訳。',
    url: 'http://localhost:3001/guides/accounts-receivable-payable',
    tags: ['資産', '負債', '売掛金', '買掛金'],
    questions: [
      {
        text: '【売掛金の回収】売掛金 20,000円が普通預金口座に振り込まれた。',
        choices: [
          '(借) 普通預金 20,000 / (貸) 売掛金 20,000',
          '(借) 売掛金 20,000 / (貸) 普通預金 20,000'
        ],
        correct: 0,
        explanation: {
          concept: '売掛金の減少',
          brilliantExplanation: '普通預金（資産の増加）を借方に、回収された売掛金（資産の減少）を貸方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_5',
    level: 5,
    title: '電子マネーの街',
    subtitle: 'クレジットカード売上と、差し引かれる『支払手数料』の仕訳テクニック。',
    url: 'http://localhost:3001/guides/credit-card-sales',
    tags: ['資産', '費用', 'クレジット売掛金', '支払手数料'],
    questions: [
      {
        text: '【クレジット売上】商品 10,000円をカード決済で売り上げ、手数料（2%）を販売時に計上する。',
        choices: [
          '(借) クレジット売掛金 9,800 , 支払手数料 200 / (貸) 売上 10,000',
          '(借) クレジット売掛金 10,000 / (貸) 売上 10,000'
        ],
        correct: 0,
        explanation: {
          concept: 'クレジットカード売上',
          brilliantExplanation: '代金から差し引かれる手数料を「支払手数料（費用）」として借方に計上します。'
        }
      }
    ]
  },
  {
    id: 'lvl_6',
    level: 6,
    title: '返品の港',
    subtitle: '不良品を返した・返された時の『返品（売上戻り・仕入戻し）』の逆仕訳ルール。',
    url: 'http://localhost:3001/guides/returns-and-shipping',
    tags: ['売上', '仕入', '返品'],
    questions: [
      {
        text: '【売上返品】売り上げた商品 5,000円分が返品され、売掛金から相殺した。',
        choices: [
          '(借) 売上 5,000 / (貸) 売掛金 5,000',
          '(借) 売掛金 5,000 / (貸) 売上 5,000'
        ],
        correct: 0,
        explanation: {
          concept: '売上返品',
          brilliantExplanation: '売上の取り消し（収益の減少）として借方に売上を、売掛金（資産の減少）として貸方に売掛金を記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_7',
    level: 7,
    title: '値引の市場',
    subtitle: '品質不良などによる代金の減額『値引』の仕訳ルール。',
    url: 'http://localhost:3001/guides/sales-purchase-returns',
    tags: ['売上値引', '仕入値引', '値引'],
    questions: [
      {
        text: '【仕入値引】仕入れた商品に汚損があったため、3,000円の値引きを受け、買掛金と相殺した。',
        choices: [
          '(借) 買掛金 3,000 / (貸) 仕入 3,000',
          '(借) 仕入 3,000 / (貸) 買掛金 3,000'
        ],
        correct: 0,
        explanation: {
          concept: '仕入値引',
          brilliantExplanation: '買掛金（負債の減少）を借方に、仕入高（費用の減少）を貸方に記録して仕入を直接減額します。'
        }
      }
    ]
  },
  {
    id: 'lvl_8',
    level: 8,
    title: '貸借の橋',
    subtitle: 'お金の貸し借りと利息（支払利息・受取利息）の計算および手形を用いた取引。',
    url: 'http://localhost:3001/guides/loans-and-interest',
    tags: ['貸付金', '借入金', '手形借入金'],
    questions: [
      {
        text: '【手形借入】100,000円を借り入れ、担保として約束手形を振り出し、当座預金に入金された。',
        choices: [
          '(借) 当座預金 100,000 / (貸) 手形借入金 100,000',
          '(借) 当座預金 100,000 / (貸) 支払手形 100,000'
        ],
        correct: 0,
        explanation: {
          concept: '手形借入金',
          brilliantExplanation: '借入にあたって手形を振り出した場合は「支払手形」ではなく「手形借入金（負債）」を使用します。'
        }
      }
    ]
  },
  {
    id: 'lvl_9',
    level: 9,
    title: '手形の関所',
    subtitle: '約束手形の振出（支払手形）と受取（受取手形）、および裏書譲渡の決済処理。',
    url: 'http://localhost:3001/guides/bills-receivable-payable',
    tags: ['受取手形', '支払手形', '裏書譲渡'],
    questions: [
      {
        text: '【裏書譲渡】買掛金 30,000円の支払いのために、手持ちの取引先振出の約束手形を裏書譲渡した。',
        choices: [
          '(借) 買掛金 30,000 / (貸) 受取手形 30,000',
          '(借) 買掛金 30,000 / (貸) 支払手形 30,000'
        ],
        correct: 0,
        explanation: {
          concept: '手形の裏書譲渡',
          brilliantExplanation: '手持ちの約束手形を他人に引き渡すため、受取手形（資産）の減少として貸方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_10',
    level: 10,
    title: '電子債権の塔',
    subtitle: 'ネット時代の決済『電子記録債権』『電子記録債務』の発生と消滅。',
    url: 'http://localhost:3001/guides/electronically-recorded-monetary-claims',
    tags: ['電子記録債権', '電子記録債務'],
    questions: [
      {
        text: '【電子債権への振替】売掛金 40,000円について、発生記録の請求を行い、電子記録債権となった。',
        choices: [
          '(借) 電子記録債権 40,000 / (貸) 売掛金 40,000',
          '(借) 売掛金 40,000 / (貸) 電子記録債権 40,000'
        ],
        correct: 0,
        explanation: {
          concept: '電子記録債権の発生',
          brilliantExplanation: '売掛金が電子記録債権へ振り替えられたため、電子記録債権（資産）の増加を借方、売掛金（資産）の減少を貸方に書きます。'
        }
      }
    ]
  },
  {
    id: 'lvl_11',
    level: 11,
    title: '固定資産の工場',
    subtitle: '固定資産（建物・土地・備品）の取得と付随費用、後払い時の「未払金」の区別。',
    url: 'http://localhost:3001/guides/fixed-assets-purchase',
    tags: ['建物', '備品', '未払金', '付随費用'],
    questions: [
      {
        text: '【備品購入】備品 50,000円を購入し、代金は翌月払いとした。引取運賃 2,000円は現金で支払った。',
        choices: [
          '(借) 備品 52,000 / (貸) 未払金 50,000 , 現金 2,000',
          '(借) 備品 52,000 / (貸) 買掛金 50,000 , 現金 2,000'
        ],
        correct: 0,
        explanation: {
          concept: '取得原価と未払金',
          brilliantExplanation: '固定資産の付随費用は取得原価に含めます。また、商品以外の購入代金未払いは「未払金（負債）」となります。'
        }
      }
    ]
  },
  {
    id: 'lvl_12',
    level: 12,
    title: '株式会社の財務サイクル',
    subtitle: '出資から配当までの一連の財務サイクルと主要勘定科目の関係。',
    url: 'http://localhost:3001/guides/corporate-finance-cycle',
    tags: ['資本金', '繰越利益剰余金', '配当'],
    questions: [
      {
        text: '【利益配当の決議】株主総会で、繰越利益剰余金から株主配当金 50,000円の支払いと利益準備金 5,000円の積立が決議された。',
        choices: [
          '(借) 繰越利益剰余金 55,000 / (貸) 未払配当金 50,000 , 利益準備金 5,000',
          '(借) 繰越利益剰余金 50,000 / (貸) 未払配当金 50,000'
        ],
        correct: 0,
        explanation: {
          concept: '配当と積立の決議',
          brilliantExplanation: '配当・積立の原資として「繰越利益剰余金（純資産）」を借方に減らし、未払配当金（負債の増加）と利益準備金（純資産の増加）を貸方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_13',
    level: 13,
    title: '株式会社の夜明け',
    subtitle: '株式を発行して設立した際の『資本金』の計上ルール。',
    url: 'http://localhost:3001/guides/capital-stock',
    tags: ['資本金', '租税公課', '設立費用'],
    questions: [
      {
        text: '【設立時の出資】株式を発行し、出資金 500,000円が当座預金に払い込まれた。',
        choices: [
          '(借) 当座預金 500,000 / (貸) 資本金 500,000',
          '(借) 資本金 500,000 / (貸) 当座預金 500,000'
        ],
        correct: 0,
        explanation: {
          concept: '資本金計上',
          brilliantExplanation: '払い込まれた金額は「当座預金（資産）」の増加として借方に、元手は「資本金（純資産）」として貸方に計上します。'
        }
      }
    ]
  },
  {
    id: 'lvl_14',
    level: 14,
    title: '配当の宴',
    subtitle: '株主への利益配当と未払配当金の支払い。',
    url: 'http://localhost:3001/guides/dividends',
    tags: ['未払配当金', '繰越利益剰余金'],
    questions: [
      {
        text: '【配当金の支払】かねて決議されていた株主配当金 50,000円を普通預金から支払った。',
        choices: [
          '(借) 未払配当金 50,000 / (貸) 普通預金 50,000',
          '(借) 繰越利益剰余金 50,000 / (貸) 普通預金 50,000'
        ],
        correct: 0,
        explanation: {
          concept: '未払配当金の支払',
          brilliantExplanation: '配当支払い義務であった「未払配当金（負債）」が減少したため借方に、普通預金（資産）の減少を貸方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_15',
    level: 15,
    title: '法人税の関所',
    subtitle: '中間申告時の『仮払法人税等』と、決算時の確定精算『未払法人税等』の相殺仕訳。',
    url: 'http://localhost:3001/guides/corporate-taxes',
    tags: ['法人税等', '仮払法人税等', '未払法人税等'],
    questions: [
      {
        text: '【決算時の法人税等】法人税等が 80,000円と確定し、中間支払額 30,000円を差し引いた残額を未払いとした。',
        choices: [
          '(借) 法人税等 80,000 / (貸) 仮払法人税等 30,000 , 未払法人税等 50,000',
          '(借) 法人税等 80,000 / (貸) 未払法人税等 80,000'
        ],
        correct: 0,
        explanation: {
          concept: '法人税等の確定仕訳',
          brilliantExplanation: '当期費用として「法人税等」を借方に、中間払いで先に払っていた「仮払法人税等（資産）」を貸方に相殺します。'
        }
      }
    ]
  },
  {
    id: 'lvl_16',
    level: 16,
    title: '消費税の市場',
    subtitle: '仮払消費税、仮受消費税を相殺して未払消費税を計上する決算仕訳。',
    url: 'http://localhost:3001/guides/consumption-tax',
    tags: ['仮払消費税', '仮受消費税', '未払消費税'],
    questions: [
      {
        text: '【消費税の決算精算】当期の仮受消費税 80,000円と仮払消費税 50,000円を相殺し、差額を未払いとした。',
        choices: [
          '(借) 仮受消費税 80,000 / (貸) 仮払消費税 50,000 , 未払消費税 30,000',
          '(借) 未払消費税 30,000 / (貸) 仮受消費税 30,000'
        ],
        correct: 0,
        explanation: {
          concept: '消費税の決算精算',
          brilliantExplanation: '仮受消費税（負債）を借方に、仮払消費税（資産）を貸方に振り替えて相殺し、差額を未払消費税（負債）として計上します。'
        }
      }
    ]
  },
  {
    id: 'lvl_17',
    level: 17,
    title: '社保の病院',
    subtitle: '従業員からの社会保険料天引きと、会社負担分（法定福利費）の納付。',
    url: 'http://localhost:3001/guides/social-insurance',
    tags: ['社会保険料預り金', '法定福利費'],
    questions: [
      {
        text: '【社会保険料の納付】社会保険料 40,000円（従業員負担分 20,000円、会社負担分 20,000円）を現金で納付した。',
        choices: [
          '(借) 社会保険料預り金 20,000 , 法定福利費 20,000 / (貸) 現金 40,000',
          '(借) 法定福利費 40,000 / (貸) 現金 40,000'
        ],
        correct: 0,
        explanation: {
          concept: '社会保険料の納付',
          brilliantExplanation: '預かっていた「社会保険料預り金（負債）」を減らし、会社負担分は「法定福利費（費用）」として計上します。'
        }
      }
    ]
  },
  {
    id: 'lvl_18',
    level: 18,
    title: '給与の金庫',
    subtitle: '給料の総額から税金や保険料などを天引きし、手取額を支払う仕訳。',
    url: 'http://localhost:3001/guides/salary',
    tags: ['給料', '所得税預り金', '社会保険料預り金'],
    questions: [
      {
        text: '【給料の支払】給料 300,000円から所得税預り金 10,000円、社会保険料預り金 25,000円を天引きし、普通預金から支払った。',
        choices: [
          '(借) 給料 300,000 / (貸) 所得税預り金 10,000 , 社会保険料預り金 25,000 , 普通預金 265,000',
          '(借) 給料 300,000 / (貸) 預り金 35,000 , 普通預金 265,000'
        ],
        correct: 0,
        explanation: {
          concept: '給料支払時の天引き',
          brilliantExplanation: '給料総額（費用）を借方に、天引きした所得税と社会保険料はそれぞれ「預り金」として貸方に負債計上します。'
        }
      }
    ]
  },
  {
    id: 'lvl_19',
    level: 19,
    title: '商品券の遊園地',
    subtitle: '他社発行の商品券で売上げた際の「受取商品券」の発生と換金処理。',
    url: 'http://localhost:3001/guides/gift-certificates',
    tags: ['受取商品券', '売上'],
    questions: [
      {
        text: '【商品券の受取】商品 15,000円を売り上げ、代金は他社発行の商品券で受け取った。',
        choices: [
          '(借) 受取商品券 15,000 / (貸) 売上 15,000',
          '(借) 売上 15,000 / (貸) 受取商品券 15,000'
        ],
        correct: 0,
        explanation: {
          concept: '受取商品券の計上',
          brilliantExplanation: '他社商品券は後に換金できる権利（資産）のため、「受取商品券」勘定の借方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_20',
    level: 20,
    title: '過不足の迷宮',
    subtitle: '現金実際額と帳簿額が一致しない場合の「現金過不足」の処理。',
    url: 'http://localhost:3001/guides/cash-over-short',
    tags: ['現金過不足', '雑損', '雑益'],
    questions: [
      {
        text: '【現金過不足の発生】手元現金 50,000円、帳簿残高は 52,000円。原因不明のため帳簿を修正する。',
        choices: [
          '(借) 現金過不足 2,000 / (貸) 現金 2,000',
          '(借) 現金 2,000 / (貸) 現金過不足 2,000'
        ],
        correct: 0,
        explanation: {
          concept: '現金過不足の発生',
          brilliantExplanation: '実際額に帳簿を合わせるため、帳簿上の現金（資産）を2,000円減らし、相手科目は「現金過不足」とします。'
        }
      },
      {
        text: '【現金過不足の決算整理】決算において、現金の帳簿残高（1,000円）より実際有高が300円不足していることが判明した。このうち100円は通信費の記帳漏れであり、残額は原因不明のため雑損として処理する。正しい仕訳を選びなさい。',
        choices: [
          '(借) 通信費 100 , 雑損 200 / (貸) 現金 300',
          '(借) 通信費 100 , 現金過不足 200 / (貸) 現金 300',
          '(借) 現金 300 / (貸) 通信費 100 , 雑益 200',
          '(借) 通信費 100 , 雑益 200 / (貸) 現金 300'
        ],
        correct: 0,
        explanation: {
          concept: '決算日における不一致の整理',
          brilliantExplanation: `
            <div class="space-y-3 font-sans">
              <p class="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                決算日に不一致が判明したため、「現金過不足」勘定は使用せず、直接関連する勘定に振り替えます。
                実際有高に合わせて現金を<strong>300円減少（貸方）</strong>させ、判明した<strong>通信費 100円（借方・費用の発生）</strong>、および原因不明額を<strong>雑損 200円（借方・費用の発生）</strong>として処理します。
              </p>
              <div class="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-gray-50/50 dark:bg-gray-900/30 text-xs">
                <div class="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 font-bold py-1 text-center text-gray-500 dark:text-gray-400">決算整理後残高試算表（一部）</div>
                <table class="w-full text-center">
                  <thead>
                    <tr class="border-b border-gray-200 dark:border-gray-800 text-[10px] text-gray-400">
                      <th class="py-1 w-1/3">借方残高</th>
                      <th class="py-1 w-1/3 border-x border-gray-200 dark:border-gray-800">勘定科目</th>
                      <th class="py-1 w-1/3">貸方残高</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-gray-200 dark:border-gray-800">
                      <td class="py-1 font-mono text-emerald-600 dark:text-emerald-400 font-bold">700</td>
                      <td class="py-1 border-x border-gray-200 dark:border-gray-800">現金</td>
                      <td class="py-1">-</td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-800">
                      <td class="py-1 font-mono text-emerald-600 dark:text-emerald-400 font-bold">600</td>
                      <td class="py-1 border-x border-gray-200 dark:border-gray-800">通信費</td>
                      <td class="py-1">-</td>
                    </tr>
                    <tr>
                      <td class="py-1 font-mono text-emerald-600 dark:text-emerald-400 font-bold">200</td>
                      <td class="py-1 border-x border-gray-200 dark:border-gray-800">雑損</td>
                      <td class="py-1">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `
        }
      },
      {
        text: '【現金過不足の決算整理（類題）】決算において、現金の帳簿残高（2,000円）より実際有高が500円不足していることが判明した。このうち200円は旅費交通費の記帳漏れであり、残額は原因不明のため雑損として処理する。正しい仕訳を選びなさい。',
        choices: [
          '(借) 旅費交通費 200 , 雑損 300 / (貸) 現金 500',
          '(借) 旅費交通費 200 , 現金過不足 300 / (貸) 現金 500',
          '(借) 現金 500 / (貸) 旅費交通費 200 , 雑益 300',
          '(借) 旅費交通費 200 , 雑益 300 / (貸) 現金 500'
        ],
        correct: 0,
        explanation: {
          concept: '決算日における不一致の整理（不足）',
          brilliantExplanation: `
            <div class="space-y-3 font-sans">
              <p class="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                現金の実際有高不足（500円）に対し、判明した<strong>旅費交通費 200円（借方・費用の発生）</strong>、および原因不明額を<strong>雑損 300円（借方・費用の発生）</strong>として仕訳します。実際額に合わせるため、現金は<strong>500円減少（貸方）</strong>させます。
              </p>
              <div class="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-gray-50/50 dark:bg-gray-900/30 text-xs">
                <div class="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 font-bold py-1 text-center text-gray-500 dark:text-gray-400">決算整理後残高試算表（一部）</div>
                <table class="w-full text-center">
                  <thead>
                    <tr class="border-b border-gray-200 dark:border-gray-800 text-[10px] text-gray-400">
                      <th class="py-1 w-1/3">借方残高</th>
                      <th class="py-1 w-1/3 border-x border-gray-200 dark:border-gray-800">勘定科目</th>
                      <th class="py-1 w-1/3">貸方残高</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-gray-200 dark:border-gray-800">
                      <td class="py-1 font-mono text-emerald-600 dark:text-emerald-400 font-bold">1,500</td>
                      <td class="py-1 border-x border-gray-200 dark:border-gray-800">現金</td>
                      <td class="py-1">-</td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-800">
                      <td class="py-1 font-mono text-emerald-600 dark:text-emerald-400 font-bold">200</td>
                      <td class="py-1 border-x border-gray-200 dark:border-gray-800">旅費交通費</td>
                      <td class="py-1">-</td>
                    </tr>
                    <tr>
                      <td class="py-1 font-mono text-emerald-600 dark:text-emerald-400 font-bold">300</td>
                      <td class="py-1 border-x border-gray-200 dark:border-gray-800">雑損</td>
                      <td class="py-1">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `
        }
      },
      {
        text: '【現金過不足の決算整理（超過）】決算において、現金の帳簿残高（1,000円）より実際有高が300円多い（超過している）ことが判明した。このうち100円は受取手数料の記入漏れであり、残額は原因不明のため雑益として処理する。正しい仕訳を選びなさい。',
        choices: [
          '(借) 現金 300 / (貸) 受取手数料 100 , 雑益 200',
          '(借) 現金 300 / (貸) 受取手数料 100 , 現金過不足 200',
          '(借) 受取手数料 100 , 雑損 200 / (貸) 現金 300',
          '(借) 現金 300 / (貸) 受取手数料 100 , 雑損 200'
        ],
        correct: 0,
        explanation: {
          concept: '決算日における不一致 of 整理（超過）',
          brilliantExplanation: `
            <div class="space-y-3 font-sans">
              <p class="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                現金の実際有高が帳簿より多いため、実際額に合わせて現金を<strong>300円増加（借方）</strong>させます。
                判明した記入漏れの<strong>受取手数料 100円（貸方・収益 of 発生）</strong>、および原因不明額を<strong>雑益 200円（貸方・収益 of 発生）</strong>として貸方に計上します。
              </p>
              <div class="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-gray-50/50 dark:bg-gray-900/30 text-xs">
                <div class="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 font-bold py-1 text-center text-gray-500 dark:text-gray-400">決算整理後残高試算表（一部）</div>
                <table class="w-full text-center">
                  <thead>
                    <tr class="border-b border-gray-200 dark:border-gray-800 text-[10px] text-gray-400">
                      <th class="py-1 w-1/3">借方残高</th>
                      <th class="py-1 w-1/3 border-x border-gray-200 dark:border-gray-800">勘定科目</th>
                      <th class="py-1 w-1/3">貸方残高</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-gray-200 dark:border-gray-800">
                      <td class="py-1 font-mono text-emerald-600 dark:text-emerald-400 font-bold">1,300</td>
                      <td class="py-1 border-x border-gray-200 dark:border-gray-800">現金</td>
                      <td class="py-1">-</td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-800">
                      <td class="py-1">-</td>
                      <td class="py-1 border-x border-gray-200 dark:border-gray-800">受取手数料</td>
                      <td class="py-1 font-mono text-emerald-600 dark:text-emerald-400 font-bold">100</td>
                    </tr>
                    <tr>
                      <td class="py-1">-</td>
                      <td class="py-1 border-x border-gray-200 dark:border-gray-800">雑益</td>
                      <td class="py-1 font-mono text-emerald-600 dark:text-emerald-400 font-bold">200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `
        }
      }
    ]
  },
  {
    id: 'lvl_21',
    level: 21,
    title: '訂正の魔法陣',
    subtitle: '過去の誤った仕訳を正しい状態に修正する訂正仕訳。',
    url: 'http://localhost:3001/guides/level-21',
    tags: ['訂正仕訳', '仕訳訂正'],
    questions: [
      {
        text: '【誤記訂正】備品 50,000円を現金購入したが、誤って「仕入 50,000 / 現金 50,000」と起票していた。正しい訂正仕訳は？',
        choices: [
          '(借) 備品 50,000 / (貸) 仕入 50,000',
          '(借) 仕入 50,000 / (貸) 備品 50,000'
        ],
        correct: 0,
        explanation: {
          concept: '訂正仕訳の基本',
          brilliantExplanation: '誤って計上された「仕入」を貸方に減らし、本来あるべき「備品」を借方に計上して修正します。'
        }
      }
    ]
  },
  {
    id: 'lvl_22',
    level: 22,
    title: '固定資産の終焉',
    subtitle: '固定資産の廃棄や除却に伴う『固定資産除却損』の計上。',
    url: 'http://localhost:3001/guides/fixed-asset-disposal',
    tags: ['除却', '固定資産除却損', '備品'],
    questions: [
      {
        text: '【備品の除却】備品（取得原価 120,000円、累計額 100,000円）を除却した。',
        choices: [
          '(借) 減価償却累計額 100,000 , 固定資産除却損 20,000 / (貸) 備品 120,000',
          '(借) 減価償却累計額 100,000 / (貸) 備品 100,000'
        ],
        correct: 0,
        explanation: {
          concept: '固定資産の除却',
          brilliantExplanation: '備品（資産）と累計額（評価）を取り崩し、帳簿価額（差額）は「固定資産除却損（費用）」として借方に計上します。'
        }
      }
    ]
  },
  {
    id: 'lvl_23',
    level: 23,
    title: '減価償却の回廊',
    subtitle: '価値が毎年減る「減価償却」。間接法と累計額のルールを学びます。',
    url: 'http://localhost:3001/guides/depreciation',
    tags: ['減価償却費', '減価償却累計額'],
    questions: [
      {
        text: '【減価償却の計上】備品（取得 100,000円、耐用年数5年、残存ゼロ）の当期減価償却を定額法（間接法）で行う。',
        choices: [
          '(借) 減価償却費 20,000 / (貸) 減価償却累計額 20,000',
          '(借) 減価償却費 20,000 / (貸) 備品 20,000'
        ],
        correct: 0,
        explanation: {
          concept: '減価償却（間接法）',
          brilliantExplanation: '100,000 ÷ 5 ＝ 20,000円。間接法では備品を直接減らさず、「減価償却累計額」を使用します。'
        }
      }
    ]
  },
  {
    id: 'lvl_24',
    level: 24,
    title: '貸倒引当金の壁',
    subtitle: '売掛金の焦げ付きに備える「貸倒引当金」と「貸倒損失」。',
    url: 'http://localhost:3001/guides/bad-debts',
    tags: ['貸倒引当金', '貸倒損失'],
    questions: [
      {
        text: '【貸倒れの発生】前期発生の売掛金 10,000円が回収不能となった。貸倒引当金残高は 15,000円である。',
        choices: [
          '(借) 貸倒引当金 10,000 / (貸) 売掛金 10,000',
          '(借) 貸倒損失 10,000 / (貸) 売掛金 10,000'
        ],
        correct: 0,
        explanation: {
          concept: '貸倒れの発生',
          brilliantExplanation: '前期以前の売上債権の焦げ付きは、設定されている「貸倒引当金」から優先的に取り崩します。'
        }
      }
    ]
  },
  {
    id: 'lvl_25',
    level: 25,
    title: '訂正の魔法陣（応用）',
    subtitle: '誤記を美しく修正する訂正仕訳の実践的なテクニック。',
    url: 'http://localhost:3001/guides/correcting-entries',
    tags: ['訂正仕訳', '売掛金', '現金'],
    questions: [
      {
        text: '【誤記訂正】売掛金 20,000円の現金回収を、誤って「当座預金 20,000 / 売掛金 20,000」としていた。訂正仕訳は？',
        choices: [
          '(借) 現金 20,000 / (貸) 当座預金 20,000',
          '(借) 当座預金 20,000 / (貸) 現金 20,000'
        ],
        correct: 0,
        explanation: {
          concept: '現金と預金の振替訂正',
          brilliantExplanation: '本来借方に増えるはずの「現金」を計上し、誤って借方に増やした「当座預金」を貸方に減らして相殺します。'
        }
      }
    ]
  },
  {
    id: 'lvl_26',
    level: 26,
    title: '経過勘定の4兄弟',
    subtitle: '決算整理で最も配点が高い経過勘定（未払・前払・未収・前受）の総論。',
    url: 'http://localhost:3001/guides/accrual-adjustments',
    tags: ['経過勘定', '決算整理'],
    questions: [
      {
        text: '【家賃の前払い】決算において、支払った家賃のうち翌期分 12,000円を前払いとして処理する。',
        choices: [
          '(借) 前払家賃 12,000 / (貸) 支払家賃 12,000',
          '(借) 支払家賃 12,000 / (貸) 前払家賃 12,000'
        ],
        correct: 0,
        explanation: {
          concept: '費用の繰延べ',
          brilliantExplanation: '当期の家賃（費用）を減らすため貸方に「支払家賃」を、翌期分の権利として借方に「前払家賃（資産）」を計上します。'
        }
      }
    ]
  },
  {
    id: 'lvl_27',
    level: 27,
    title: '消耗品の倉庫',
    subtitle: '消耗品購入時の費用処理と、決算期末の未使用分調整仕訳。',
    url: 'http://localhost:3001/guides/supplies',
    tags: ['消耗品', '消耗品費'],
    questions: [
      {
        text: '【消耗品の決算】期中に消耗品費として処理したうち、期末の未使用分が 2,000円あった。',
        choices: [
          '(借) 消耗品 2,000 / (貸) 消耗品費 2,000',
          '(借) 消耗品費 2,000 / (貸) 消耗品 2,000'
        ],
        correct: 0,
        explanation: {
          concept: '消耗品未使用分の資産計上',
          brilliantExplanation: '未使用分は費用からマイナス（貸方に消耗品費）し、「消耗品（資産）」として借方に計上します。'
        }
      }
    ]
  },
  {
    id: 'lvl_28',
    level: 28,
    title: '前払の時の部屋',
    subtitle: '当期支払った費用の中から、翌期の「未経過分」を資産として持ち越す処理。',
    url: 'http://localhost:3001/guides/prepaid-expenses',
    tags: ['前払費用', '支払保険料'],
    questions: [
      {
        text: '【未経過保険料】支払った保険料のうち翌期分 6,000円を「前払保険料」として処理する。',
        choices: [
          '(借) 前払保険料 6,000 / (貸) 支払保険料 6,000',
          '(借) 支払保険料 6,000 / (貸) 前払保険料 6,000'
        ],
        correct: 0,
        explanation: {
          concept: '支払保険料の前払計上',
          brilliantExplanation: '翌期分は当期の費用からマイナス（貸方に支払保険料）し、前払保険料（資産の増加）を借方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_29',
    level: 29,
    title: '未払の時の部屋',
    subtitle: '当期にすでに発生している未払いの費用を決算で計上する処理。',
    url: 'http://localhost:3001/guides/accrued-expenses',
    tags: ['未払費用', '支払利息'],
    questions: [
      {
        text: '【未払利息】決算において、借入金に対する利息の未払分 4,000円を計上する。',
        choices: [
          '(借) 支払利息 4,000 / (貸) 未払利息 4,000',
          '(借) 未払利息 4,000 / (貸) 支払利息 4,000'
        ],
        correct: 0,
        explanation: {
          concept: '支払利息の未払計上',
          brilliantExplanation: '当期の費用として「支払利息」を借方に、未払分の債務として「未払利息（負債）」を貸方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_30',
    level: 30,
    title: '未収の時の部屋',
    subtitle: '当期中に発生しているが未回収の収益を決算で計上する処理。',
    url: 'http://localhost:3001/guides/accrued-revenues',
    tags: ['未収収益', '受取利息'],
    questions: [
      {
        text: '【未収利息】決算において、貸付金に対する利息の未収分 5,000円を計上する。',
        choices: [
          '(借) 未収利息 5,000 / (貸) 受取利息 5,000',
          '(借) 受取利息 5,000 / (貸) 未収利息 5,000'
        ],
        correct: 0,
        explanation: {
          concept: '受取利息の未収計上',
          brilliantExplanation: '当期の収益として「受取利息」を貸方に、回収権利として「未収利息（資産）」を借方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_31',
    level: 31,
    title: '前受の時の部屋',
    subtitle: '当期に受け取った収益の中から、翌期分を負債として繰り延べる処理。',
    url: 'http://localhost:3001/guides/prepaid-revenues',
    tags: ['前受収益', '受取家賃'],
    questions: [
      {
        text: '【未経過家賃】受け取った家賃のうち翌期分の未経過額 8,000円を「前受家賃」として処理する。',
        choices: [
          '(借) 受取家賃 8,000 / (貸) 前受家賃 8,000',
          '(借) 前受家賃 8,000 / (貸) 受取家賃 8,000'
        ],
        correct: 0,
        explanation: {
          concept: '受取家賃の前受計上',
          brilliantExplanation: '翌期分は当期の収益からマイナス（借方に受取家賃）し、前受家賃（負債の増加）を貸方に記録します。'
        }
      }
    ]
  },
  {
    id: 'lvl_32',
    level: 32,
    title: '貯蔵品の小部屋',
    subtitle: '未使用の切手や印紙などの決算時における「貯蔵品」への振替。',
    url: 'http://localhost:3001/guides/level-32',
    tags: ['貯蔵品', '通信費', '租税公課'],
    questions: [
      {
        text: '【切手印紙の未使用】期中に費用処理した切手 1,500円と印紙 3,000円の未使用分を貯蔵品に振り替える。',
        choices: [
          '(借) 貯蔵品 4,500 / (貸) 通信費 1,500 , 租税公課 3,000',
          '(借) 通信費 1,500 , 租税公課 3,000 / (貸) 貯蔵品 4,500'
        ],
        correct: 0,
        explanation: {
          concept: '貯蔵品への振替',
          brilliantExplanation: '未使用分は費用からマイナス（貸方に通信費・租税公課）し、「貯蔵品（資産）」として借方に振り替えます。'
        }
      }
    ]
  },
  {
    id: 'lvl_33',
    level: 33,
    title: '精算表の玉座',
    subtitle: '決算整理仕訳を集計し、B/SとP/Lを作成する「精算表」の作成手順。',
    url: 'http://localhost:3001/guides/work-sheet',
    tags: ['精算表', '当期純利益', '決算整理'],
    questions: [
      {
        text: '【精算表の計算】精算表の損益計算書（P/L）欄で、費用合計が 450,000円、収益合計が 500,000円のとき、当期純利益は？',
        choices: [
          '当期純利益 50,000円',
          '当期純損失 50,000円'
        ],
        correct: 0,
        explanation: {
          concept: '当期純利益の計算',
          brilliantExplanation: '収益（500,000円）から費用（450,000円）を差し引いた差額 50,000円が当期純利益となります。'
        }
      }
    ]
  },
  {
    id: 'lvl_34',
    level: 34,
    title: '試算表の鏡',
    subtitle: '転記ミスや仕訳誤りを発見する合計試算表・残高試算表。',
    url: 'http://localhost:3001/guides/trial-balance',
    tags: ['試算表', '合計試算表', '残高試算表'],
    questions: [
      {
        text: '【試算表の原則】残高試算表における借方合計額と貸方合計額の関係について、正しいものは？',
        choices: [
          '必ず一致する',
          '必ず一致しない'
        ],
        correct: 0,
        explanation: {
          concept: '貸借平均の原理',
          brilliantExplanation: 'すべての仕訳を正しく転記できていれば、複式簿記の原則（貸借平均の原理）により、借方と貸方の合計額は必ず一致します。'
        }
      }
    ]
  },
  {
    id: 'lvl_35',
    level: 35,
    title: '財務諸表の玉座',
    subtitle: '決算の最終報告書である『貸借対照表（B/S）』と『損益計算書（P/L）』。',
    url: 'http://localhost:3001/guides/financial-statements',
    tags: ['財務諸表', '貸借対照表', '損益計算書'],
    questions: [
      {
        text: '【貸借対照表】貸借対照表（B/S）の右側（貸方）に表示される項目グループはどれですか？',
        choices: [
          '負債 および 純資産',
          '資産 および 費用',
          '資産 および 純資産'
        ],
        correct: 0,
        explanation: {
          concept: '貸借対照表の構成',
          brilliantExplanation: '貸借対照表（B/S）は、左側（借方）に「資産」、右側（貸方）に「負債」と「純資産」を表示します。'
        }
      }
    ]
  },
  {
    id: 'lvl_37',
    level: 37,
    title: '決算整理の書庫',
    subtitle: '減価償却・貸倒引当金・売上原価（し・くり・くり・し）の総まとめ。',
    url: 'http://localhost:3001/guides/year-end-adjustments-summary',
    tags: ['決算整理', '売上原価', '総まとめ'],
    questions: [
      {
        text: '【売上原価の算定】仕入勘定で売上原価を算定する（し・くり・くり・し）決算整理仕訳は？',
        choices: [
          '(借) 仕入 XXX / (貸) 繰越商品 XXX , および (借) 繰越商品 YYY / (貸) 仕入 YYY',
          '(借) 繰越商品 XXX / (貸) 仕入 XXX , および (借) 仕入 YYY / (貸) 繰越商品 YYY'
        ],
        correct: 0,
        explanation: {
          concept: '売上原価の算定仕訳',
          brilliantExplanation: '期首商品残高を「仕入」に振り替えるため「(借) 仕入 / (貸) 繰越商品」、期末商品残高を「仕入」から控除するため「(借) 繰越商品 / (貸) 仕入」とします。'
        }
      }
    ]
  },
  {
    id: 'lvl_38',
    level: 38,
    title: '再振替仕訳',
    subtitle: '経過勘定（前払費用など）を翌期首に逆仕訳で戻す「再振替仕訳」の意味。',
    url: 'http://localhost:3001/guides/reversing-entries',
    tags: ['再振替仕訳', '期首', '経過勘定'],
    questions: [
      {
        text: '【前払保険料の再振替】期首にあたり、前期決算で計上した前払保険料 6,000円の再振替仕訳は？',
        choices: [
          '(借) 支払保険料 6,000 / (貸) 前払保険料 6,000',
          '(借) 前払保険料 6,000 / (貸) 支払保険料 6,000'
        ],
        correct: 0,
        explanation: {
          concept: '再振替仕訳',
          brilliantExplanation: '決算時に繰り延べた資産「前払保険料」を、翌期の費用に戻すため、逆仕訳（(借) 支払保険料 / (貸) 前払保険料）を行います。'
        }
      }
    ]
  },
  {
    id: 'lvl_39',
    level: 39,
    title: '帳簿の締切りと大団円',
    subtitle: '収益・費用を「損益」勘定に振り替え、帳簿を完全に締め切るプロセス。',
    url: 'http://localhost:3001/guides/closing-books',
    tags: ['決算振替仕訳', '損益勘定', '帳簿の締切り', '大団円'],
    questions: [
      {
        text: '【決算振替】当期末決算にて、収益である「売上 500,000円」を損益勘定に振り替える仕訳は？',
        choices: [
          '(借) 売上 500,000 / (貸) 損益 500,000',
          '(借) 損益 500,000 / (貸) 売上 500,000'
        ],
        correct: 0,
        explanation: {
          concept: '決算振替仕訳（収益の振替）',
          brilliantExplanation: '収益勘定（売上など）の残高をゼロにして損益勘定に集計するため、逆側の借方に「売上」を記録し、貸方に「損益」を記録します。'
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
    
    state.roadmapProgress = loaded;
    
    roadmapLevels.forEach(lvl => {
      if (!state.roadmapProgress[lvl.id]) {
        const shouldBeUnlocked = lvl.id === 'lvl_0' || lvl.id === 'lvl_1';
        state.roadmapProgress[lvl.id] = { 
          unlocked: shouldBeUnlocked, 
          completed: false 
        };
      } else {
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
// Services Metadata Configuration
// ==========================================
const servicesData = {
  boki_tutorial: {
    title: '勘定科目マスター',
    subtitle: 'SM-2 + しつこく復習ループで限界突破記憶 (無限ライフ)',
    themeColor: 'cyan',
    get questions() {
      return generateTutorialQuestions();
    }
  },
  boki_shiwake: {
    title: '簿記3級 仕訳クエスト',
    subtitle: '実践的な仕訳取引の4択攻略',
    themeColor: 'indigo',
    questions: []
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
  if (!portalGrid) return;
  
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
        <p class="text-xs text-gray-500 dark:text-gray-400">Lv0〜Lv39のクエストをすごろく形式で攻略</p>
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
  if (!mapContainer) return;
  mapContainer.innerHTML = '';
  
  loadRoadmapProgress();

  roadmapLevels.forEach((lvl, idx) => {
    const isUnlocked = state.roadmapProgress[lvl.id]?.unlocked || false;
    const isCompleted = state.roadmapProgress[lvl.id]?.completed || false;
    
    let alignClass = 'justify-center';
    if (idx % 4 === 1) {
      alignClass = 'justify-start pl-8 md:pl-16';
    } else if (idx % 4 === 3) {
      alignClass = 'justify-end pr-8 md:pr-16';
    }

    const node = document.createElement('div');
    node.className = `flex ${alignClass} w-full relative mb-12 z-10`;
    
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
          ${isCompleted ? '<div class="absolute -top-1 -right-1 w-6 h-6 bg-emerald-600 rounded-full border border-white flex items-center justify-center text-xs">✓</div>' : ''}
          ${!isUnlocked ? '<div class="absolute -top-1 -right-1 w-6 h-6 bg-gray-700 rounded-full border border-gray-600 flex items-center justify-center text-xs"><i data-lucide="lock" class="w-3 h-3 text-gray-400"></i></div>' : ''}
        </button>
        <span class="mt-2 text-xs font-semibold text-center text-gray-800 dark:text-gray-300 max-w-[120px] truncate">${lvl.title}</span>
      </div>
    `;

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
  if (!dialog) return;
  
  document.getElementById('dialog-level-num').innerText = lvl.level;
  document.getElementById('dialog-title').innerText = lvl.title;
  document.getElementById('dialog-subtitle').innerText = lvl.subtitle;
  document.getElementById('dialog-url-link').href = lvl.url;
  
  const tagsContainer = document.getElementById('dialog-tags');
  if (tagsContainer) {
    tagsContainer.innerHTML = '';
    lvl.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-[10px] font-semibold';
      span.innerText = `#${tag}`;
      tagsContainer.appendChild(span);
    });
  }

  const startBtn = document.getElementById('dialog-start-btn');
  if (startBtn) {
    startBtn.onclick = () => {
      state.currentLevelId = lvl.id;
      state.activeQuestions = [...lvl.questions];
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.hearts = 5;
      state.firstTimeWrongCount = 0;
      
      dialog.classList.add('hidden');
      showView('dashboard');
    };
  }

  dialog.classList.remove('hidden');
};

// Dashboard Screen
const renderDashboard = () => {
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
  
  const titleEl = document.getElementById('dash-course-title');
  const streakEl = document.getElementById('dash-streak-count');
  const xpEl = document.getElementById('dash-xp-count');
  const xpProgressEl = document.getElementById('dash-xp-progress');
  const startBtn = document.getElementById('dash-start-btn');
  const leagueList = document.getElementById('dash-league-list');
  
  if (titleEl) titleEl.innerText = title;
  if (streakEl) streakEl.innerText = state.streak;
  if (xpEl) xpEl.innerText = `${state.xp}/300 XP`;
  
  if (xpProgressEl) {
    const xpPercent = Math.min((state.xp / 300) * 100, 100);
    xpProgressEl.style.width = `${xpPercent}%`;
  }
  
  if (startBtn) {
    startBtn.style.backgroundColor = getThemeColorHex(color);
    startBtn.className = `w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 neon-glow-${color}`;
  }
  
  if (leagueList) {
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
  }
  
  safeCreateIcons();
};

// Quiz Screen
const renderQuiz = () => {
  const service = servicesData[state.currentService];
  const question = state.activeQuestions[state.currentQuestionIndex];
  
  if (!question) {
    return showView('result');
  }
  
  const color = state.currentService === 'boki_tutorial' ? 'cyan' : 'indigo';
  const themeHex = getThemeColorHex(color);
  
  const heartsCountEl = document.getElementById('quiz-hearts-count');
  if (heartsCountEl) {
    if (state.currentService === 'boki_tutorial') {
      heartsCountEl.innerHTML = '<span class="text-xs">∞</span>';
    } else {
      heartsCountEl.innerText = state.hearts;
    }
  }
  
  const progressBarEl = document.getElementById('quiz-progress-bar');
  if (progressBarEl) {
    const progressPercent = ((state.currentQuestionIndex) / state.activeQuestions.length) * 100;
    progressBarEl.style.width = `${progressPercent}%`;
    progressBarEl.style.backgroundColor = themeHex;
  }
  
  const questionTextEl = document.getElementById('quiz-question-text');
  if (questionTextEl) {
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
  }
  
  const choicesContainer = document.getElementById('quiz-choices-container');
  if (!choicesContainer) return;
  choicesContainer.innerHTML = '';
  
  state.selectedAnswer = null;
  state.answered = false;
  
  const actionBar = document.getElementById('quiz-action-bar');
  if (actionBar) {
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
  }
  
  const imageContainer = document.getElementById('quiz-image-container');
  if (imageContainer) imageContainer.classList.add('hidden');
  
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
      if (checkBtn) {
        checkBtn.disabled = false;
        checkBtn.classList.remove('bg-gray-200', 'text-gray-400', 'dark:bg-gray-800', 'dark:text-gray-500', 'cursor-not-allowed');
        checkBtn.classList.add('text-white');
        checkBtn.style.backgroundColor = themeHex;
      }
    });
    
    choicesContainer.appendChild(button);
  });
  
  const checkBtn = document.getElementById('quiz-check-btn');
  if (checkBtn) checkBtn.addEventListener('click', checkAnswer);
  
  const skipBtn = document.getElementById('quiz-skip-btn');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
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
  }
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
  if (!actionBar) return;
  
  updateSM2(question, isCorrect);
  
  if (isCorrect) {
    state.score += 10;
    state.xp += 15;
    playSound('correct');
    triggerConfetti();
    
    if (checkedCard) {
      checkedCard.classList.add('correct');
      checkedCard.style.borderColor = '#22c55e';
    }
    
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
    
    if (checkedCard) {
      checkedCard.classList.add('incorrect', 'animate-shake');
      checkedCard.style.borderColor = '#ef4444';
    }
    if (correctCard) {
      correctCard.style.borderColor = '#22c55e';
    }
    
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
  
  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.hearts <= 0 && state.currentService !== 'boki_tutorial') {
        showView('dashboard');
      } else {
        nextQuestion();
      }
    });
  }
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
    
    state.roadmapProgress[lvl.id].completed = true;
    
    const nextLvlIndex = roadmapLevels.findIndex(l => l.id === lvl.id) + 1;
    if (nextLvlIndex < roadmapLevels.length) {
      const nextLvl = roadmapLevels[nextLvlIndex];
      if (state.roadmapProgress[nextLvl.id]) {
        state.roadmapProgress[nextLvl.id].unlocked = true;
      }
    }
    saveRoadmapProgress();
  }

  const nameEl = document.getElementById('res-service-name');
  const scoreEl = document.getElementById('res-score');
  const xpEl = document.getElementById('res-xp-count');
  
  if (nameEl) nameEl.innerText = courseTitle;
  if (scoreEl) scoreEl.innerText = `+${state.score} pt`;
  if (xpEl) xpEl.innerText = `獲得XP: +${state.score * 1.5} XP`;
  
  state.xp += state.score * 1.5;
  if (state.xp >= 300) {
    state.level++;
    state.xp = state.xp - 300;
    state.streak++;
    
    const levelUpModal = document.getElementById('level-up-toast');
    if (levelUpModal) {
      levelUpModal.classList.remove('hidden');
      setTimeout(() => {
        levelUpModal.classList.add('hidden');
      }, 4000);
    }
  }
  
  const reviewBtnContainer = document.getElementById('res-review-container');
  if (reviewBtnContainer) {
    if (state.firstTimeWrongCount > 0) {
      reviewBtnContainer.innerHTML = `
        <div class="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-center">
          <p class="text-xs text-orange-600 dark:text-orange-300">
            このセッションで <strong>${state.firstTimeWrongCount} 回</strong> 間間違えましたが、しつこく復習してすべて克服しました！
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
  }

  const homeBtn = document.getElementById('res-home-btn');
  if (homeBtn) {
    homeBtn.onclick = () => {
      if (state.currentService === 'boki_shiwake') {
        showView('map');
      } else {
        showView('portal');
      }
    };
  }
};

// ==========================================
// Utility Helpers & Visual Effects
// ==========================================
function getThemeColorHex(theme) {
  switch (theme) {
    case 'indigo': return '#6366f1';
    case 'cyan': return '#06b6d4';
    default: return '#6366f1';
  }
}

function safeCreateIcons() {
  try {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  } catch (e) {
    console.warn('Lucide icons failed to render', e);
  }
}

function triggerConfetti() {
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
}

// ==========================================
// Sound Settings Controller
// ==========================================
const initSound = () => {
  const isEnabled = localStorage.getItem('sound_enabled') !== 'false';
  state.soundEnabled = isEnabled;
  updateSoundIcon(isEnabled);
};

const toggleSound = () => {
  state.soundEnabled = !state.soundEnabled;
  localStorage.setItem('sound_enabled', state.soundEnabled);
  updateSoundIcon(state.soundEnabled);
};

const updateSoundIcon = (isEnabled) => {
  const icon = document.getElementById('sound-toggle-icon');
  if (icon) {
    if (isEnabled) {
      icon.innerHTML = `<i data-lucide="volume-2" class="text-indigo-500 dark:text-indigo-400 w-5 h-5"></i>`;
    } else {
      icon.innerHTML = `<i data-lucide="volume-x" class="text-gray-400 dark:text-gray-650 w-5 h-5"></i>`;
    }
    safeCreateIcons();
  }
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

const playSound = (type) => {
  if (!state.soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'select') {
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'correct') {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'incorrect') {
      osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
      osc.frequency.setValueAtTime(196, ctx.currentTime + 0.15); // G3
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'level-up') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.24); // C6
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    }
  } catch (e) {
    console.warn('Audio Context failed', e);
  }
};

// ==========================================
// Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  try {
    initTheme();
    initSound();
    
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', toggleSound);
    }

    const headerLogo = document.getElementById('header-logo');
    if (headerLogo) {
      let clickCount = 0;
      let clickTimer = null;
      headerLogo.addEventListener('click', () => {
        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { clickCount = 0; }, 1500);

        if (clickCount >= 5) {
          // 5回連続クリックで全レベルをアンロック
          roadmapLevels.forEach(lvl => {
            state.roadmapProgress[lvl.id] = { unlocked: true, completed: false };
          });
          saveRoadmapProgress();
          clickCount = 0;
          
          // トースト表示でお知らせ
          const toast = document.getElementById('level-up-toast');
          if (toast) {
            toast.querySelector('h4').innerText = 'DEBUG UNLOCK';
            toast.querySelector('p').innerText = 'すべてのレベルがアンロックされました！';
            toast.classList.remove('hidden');
            setTimeout(() => { toast.classList.add('hidden'); }, 3000);
          }
          
          // マップ再描画
          if (state.currentView === 'map') {
            renderMap();
          }
        } else {
          showView('portal');
        }
      });
    }

    const startBtn = document.getElementById('dash-start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        showView('quiz');
      });
    }
    
    const backBtn = document.getElementById('dash-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (state.currentService === 'boki_shiwake') {
          showView('map');
        } else {
          showView('portal');
        }
      });
    }

    const mapBackBtn = document.getElementById('map-back-btn');
    if (mapBackBtn) {
      mapBackBtn.addEventListener('click', () => {
        showView('portal');
      });
    }

    const dialogCloseBtn = document.getElementById('dialog-close-btn');
    if (dialogCloseBtn) {
      dialogCloseBtn.addEventListener('click', () => {
        const dialog = document.getElementById('map-level-dialog');
        if (dialog) dialog.classList.add('hidden');
      });
    }
    
    showView('portal');
  } catch (err) {
    const debugDiv = document.createElement('div');
    debugDiv.className = 'fixed top-0 left-0 right-0 bg-red-600 text-white p-4 font-mono text-xs z-50 overflow-auto max-h-[50vh] shadow-2xl';
    debugDiv.innerHTML = `
      <div class="font-bold text-sm mb-1">⚠️ Runtime Error Detected:</div>
      <pre class="whitespace-pre-wrap">${err.stack || err.message || err}</pre>
    `;
    document.body.appendChild(debugDiv);
    console.error('Qlearn Init Error:', err);
  }
});
