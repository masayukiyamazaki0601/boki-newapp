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
      },
      {
        text: '【一部振替と手数料】普通預金口座から当座預金口座へ 800円、定期預金口座へ 500円をそれぞれ預け入れた。その際、振込手数料 20円が普通預金口座から引き落とされた。',
        choices: [
          '(借) 当座預金 800 , 定期預金 500 , 支払手数料 20 / (貸) 普通預金 1,320',
          '(借) 当座預金 800 , 定期預金 500 / (貸) 普通預金 1,300'
        ],
        correct: 0,
        explanation: {
          concept: '資金振替と振込手数料',
          brilliantExplanation: '当座預金・定期預金（資産）の増加を借方に、振込手数料 20円は支払手数料（費用）として借方に、普通預金の減少 1,320円を貸方に記録します。'
        }
      },
      {
        text: '【電気料金の引落】店舗の電気料金 300円が普通預金口座から引き落とされた。',
        choices: [
          '(借) 水道光熱費 300 / (貸) 普通預金 300',
          '(借) 普通預金 300 / (貸) 水道光熱費 300'
        ],
        correct: 0,
        explanation: {
          concept: '公共料金の支払い',
          brilliantExplanation: '水道光熱費（費用）の発生を借方に、普通預金（資産）の減少を貸方に記録します。'
        }
      },
      {
        text: '【普通預金の利息】普通預金口座に利息 200円が入金された。',
        choices: [
          '(借) 普通預金 200 / (貸) 受取利息 200',
          '(借) 受取利息 200 / (貸) 普通預金 200'
        ],
        correct: 0,
        explanation: {
          concept: '受取利息の計上',
          brilliantExplanation: '普通預金（資産）の増加を借方に、受取利息（収益）の発生を貸方に記録します。'
        }
      },
      {
        text: '【自社振出小切手の回収】売掛金 500円の回収のため小切手を受け取った。なお、この小切手は以前当社が振り出した小切手である。',
        choices: [
          '(借) 当座預金 500 / (貸) 売掛金 500',
          '(借) 現金 500 / (貸) 売掛金 500'
        ],
        correct: 0,
        explanation: {
          concept: '自社振出小切手の回収',
          brilliantExplanation: '自社が過去に振り出した小切手の回収は、当座預金の払出を取り消すため「当座預金」の増加として処理します。'
        }
      },
      {
        text: '【小切手の預入】得意先C社に対する売掛金 600円の回収にあたり、同社振出しの小切手を受け取り、ただちに当座預金口座に預け入れた。',
        choices: [
          '(借) 当座預金 600 / (貸) 売掛金 600',
          '(借) 現金 600 / (貸) 売掛金 600'
        ],
        correct: 0,
        explanation: {
          concept: '他人振出小切手の預入',
          brilliantExplanation: '他人振出小切手をただちに預け入れた場合は「当座預金」の増加として処理します（受け取ったままなら現金）。'
        }
      },
      {
        text: '【定期預金の満期】定期預金が満期となり、元本 2,000円と利息 80円が普通預金口座に振り込まれた。',
        choices: [
          '(借) 普通預金 2,080 / (貸) 定期預金 2,000 , 受取利息 80',
          '(借) 普通預金 2,000 / (貸) 定期預金 2,000'
        ],
        correct: 0,
        explanation: {
          concept: '定期預金の満期',
          brilliantExplanation: '元本 2,000円は定期預金（資産の減少）を貸方に、利息 80円は受取利息（収益）として貸方に記録します。'
        }
      },
      {
        text: '【家賃の引落】事務所の今月分家賃 500円が普通預金口座から引き落とされた。',
        choices: [
          '(借) 支払家賃 500 / (貸) 普通預金 500',
          '(借) 普通預金 500 / (貸) 支払家賃 500'
        ],
        correct: 0,
        explanation: {
          concept: '家賃の支払い',
          brilliantExplanation: '支払家賃（費用）の発生を借方に、普通預金（資産）の減少を貸方に記録します。'
        }
      },
      {
        text: '【当座借越契約の利用】仕入先D社に対する買掛金 1,200円を小切手を振り出して支払った。なお、当座預金口座の残高は 1,000円であるが、当社は取引銀行と借越限度額 1,000円の当座借越契約を結んでいる。',
        choices: [
          '(借) 買掛金 1,200 / (貸) 当座預金 1,200',
          '(借) 買掛金 1,200 / (貸) 当座借越 1,200'
        ],
        correct: 0,
        explanation: {
          concept: '当座借越契約',
          brilliantExplanation: '当座借越契約がある場合は、借越限度額内であれば「当座預金」のみで処理します（実際に借越額が確定してから当座借越へ振り替えます）。'
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
      },
      {
        text: '【小口現金の支払報告】週末に、用度係（小口現金係）から次のような支払報告を受けた（定額資金前渡制度を採用）。【支払報告の内容】旅費交通費 400円、消耗品費 500円、雑費 200円',
        choices: [
          '(借) 旅費交通費 400 , 消耗品費 500 , 雑費 200 / (貸) 小口現金 1,100',
          '(借) 小口現金 1,100 / (貸) 旅費交通費 400 , 消耗品費 500 , 雑費 200'
        ],
        correct: 0,
        explanation: {
          concept: '小口現金の支払報告',
          brilliantExplanation: '支払報告にもとづいて、費用の発生を借方に、小口現金（資産）の減少を貸方に記録します。'
        }
      },
      {
        text: '【小口現金の補給】支払報告にもとづいて、小切手を振り出して小口現金を補給した（補給額 1,100円）。',
        choices: [
          '(借) 小口現金 1,100 / (貸) 当座預金 1,100',
          '(借) 当座預金 1,100 / (貸) 小口現金 1,100'
        ],
        correct: 0,
        explanation: {
          concept: '小口現金の補給',
          brilliantExplanation: '当座預金から小切手を振り出して補給するため、小口現金（資産）の増加を借方に、当座預金（資産）の減少を貸方に記録します。'
        }
      },
      {
        text: '営業活動に利用する目的で電車およびバスの料金支払用ICカードに現金 2,000円を入金し、全額費用として処理した。',
        choices: [
          '(借) 旅費交通費 2,000 / (貸) 現金 2,000',
          '(借) 貯蔵品 2,000 / (貸) 現金 2,000'
        ],
        correct: 0,
        explanation: {
          concept: 'ICカードへの入金',
          brilliantExplanation: '営業用のICカードにチャージした金額は、全額費用処理するため「旅費交通費（費用）」として借方に記録します。'
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
      },
      {
        text: '【小切手と掛けの仕入】A社より商品 2,000円を仕入れ、代金のうち 500円は小切手を振り出して支払い、残額は掛けとした。',
        choices: [
          '(借) 仕入 2,000 / (貸) 当座預金 500 , 買掛金 1,500',
          '(借) 仕入 2,000 / (貸) 現金 500 , 買掛金 1,500'
        ],
        correct: 0,
        explanation: {
          concept: '小切手振出と掛け仕入',
          brilliantExplanation: '小切手を振り出した場合は当座預金（資産）の減少として貸方に、残額は買掛金（負債）として貸方に記録します。'
        }
      },
      {
        text: '【小切手受取と掛け売上】B社へ商品 3,000円を売り上げ、代金のうち 1,000円は同社振出しの小切手を受け取り、残額は掛けとした。',
        choices: [
          '(借) 現金 1,000 , 売掛金 2,000 / (貸) 売上 3,000',
          '(借) 当座預金 1,000 , 売掛金 2,000 / (貸) 売上 3,000'
        ],
        correct: 0,
        explanation: {
          concept: '小切手受取と掛け売上',
          brilliantExplanation: '他人振出小切手を受け取ったまま保持する場合は現金（資産）として借方に、売掛金（資産）の発生、売上（収益）を貸方に記録します。'
        }
      },
      {
        text: '中古パソコンを販売している当社は、販売用のパソコン 800円をA社から購入し、代金は後日支払うこととした。また、その際に発生した引取運賃 30円は現金で支払った。',
        choices: [
          '(借) 仕入 830 / (貸) 買掛金 800 , 現金 30',
          '(借) 仕入 800 / (貸) 買掛金 800'
        ],
        correct: 0,
        explanation: {
          concept: '仕入諸掛りと買掛金',
          brilliantExplanation: '販売目的のパソコンは固定資産ではなく商品のため「仕入」勘定を使用します。当店負担の引取運賃は仕入原価に含め、代金未払いは買掛金で処理します。'
        }
      },
      {
        text: '商品 2,000円の注文を行い、その手付金として 500円を現金で支払った。',
        choices: [
          '(借) 前払金 500 / (貸) 現金 500',
          '(借) 仮払金 500 / (貸) 現金 500'
        ],
        correct: 0,
        explanation: {
          concept: '前払金（商品手付金）',
          brilliantExplanation: '商品の注文時に支払う手付金は「前払金（資産）」として処理します。'
        }
      },
      {
        text: '商品 2,000円を受け取り、手付金 500円を差し引いた残額を掛けとした。',
        choices: [
          '(借) 仕入 2,000 / (貸) 前払金 500 , 買掛金 1,500',
          '(借) 仕入 1,500 / (貸) 買掛金 1,500'
        ],
        correct: 0,
        explanation: {
          concept: '前払金の充当と仕入',
          brilliantExplanation: '仕入2,000円を借方に計上し、前払金500円を貸方に取り崩して、残額1,500円は買掛金（負債）とします。'
        }
      },
      {
        text: '商品 3,000円の注文を受け、内金として 1,000円を現金で受け取った。',
        choices: [
          '(借) 現金 1,000 / (貸) 前受金 1,000',
          '(借) 現金 1,000 / (貸) 仮受金 1,000'
        ],
        correct: 0,
        explanation: {
          concept: '前受金（商品内金）',
          brilliantExplanation: '商品の注文時に受け取る内金は「前受金（負債）」として貸方に記録します。'
        }
      },
      {
        text: '商品 3,000円を引き渡し、内金 1,000円を差し引いた残額を掛けとした。',
        choices: [
          '(借) 前受金 1,000 , 売掛金 2,000 / (貸) 売上 3,000',
          '(借) 売掛金 3,000 / (貸) 売上 3,000'
        ],
        correct: 0,
        explanation: {
          concept: '前受金の充当と売上',
          brilliantExplanation: '売上3,000円を貸方に計上し、前受金1,000円を借方に取り崩して、残額2,000円は売掛金（資産）とします。'
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
      },
      {
        text: '得意先に対する売掛金 2,000円について、郵便為替証書を受け取った。',
        choices: [
          '(借) 現金 2,000 / (貸) 売掛金 2,000',
          '(借) 売掛金 2,000 / (貸) 現金 2,000'
        ],
        correct: 0,
        explanation: {
          concept: '郵便為替証書による売掛金の回収',
          brilliantExplanation: '販売取引などで受け取った郵便為替証書や送金小切手などの通貨代用証券は、現金と同じ「現金」勘定で処理します。現金（資産の増加）を借方に、売掛金（資産の減少）を貸方に記録します。'
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
      },
      {
        text: '取引先から借用証書にて 1,000円を借り入れ、利息 100円が差し引かれた残額が普通預金口座に振り込まれた。',
        choices: [
          '(借) 普通預金 900 , 支払利息 100 / (貸) 借入金 1,000',
          '(借) 普通預金 1,000 / (貸) 借入金 1,000'
        ],
        correct: 0,
        explanation: {
          concept: '借用証書による借入（利息差引）',
          brilliantExplanation: '借入金（負債）1,000円を貸方に計上し、利息100円は支払利息（費用）、実際の入金額900円は普通預金（資産）として借方に記録します。'
        }
      },
      {
        text: '借り入れていた 1,000円を普通預金口座から支払った。その際、振込手数料として 50円が同口座から引き落とされた。',
        choices: [
          '(借) 借入金 1,000 , 支払手数料 50 / (貸) 普通預金 1,050',
          '(借) 借入金 1,050 / (貸) 普通預金 1,050'
        ],
        correct: 0,
        explanation: {
          concept: '借入金の返済',
          brilliantExplanation: '借入金（負債）の減少1,000円と振込手数料（費用）50円を借方に、普通預金（資産）の減少1,050円を貸方に記録します。'
        }
      },
      {
        text: '小切手を振り出して取引先に 1,500円を貸し付け、借用証書の代わりに約束手形を受け取った。',
        choices: [
          '(借) 手形貸付金 1,500 / (貸) 当座預金 1,500',
          '(借) 受取手形 1,500 / (貸) 当座預金 1,500'
        ],
        correct: 0,
        explanation: {
          concept: '手形貸付金',
          brilliantExplanation: '貸付金の証券として手形を受け取った場合は「受取手形」ではなく「手形貸付金（資産）」を使用します。'
        }
      },
      {
        text: '貸し付けていた 1,500円が利息 200円とともに当座預金に振り込まれたため、手形を返却した。',
        choices: [
          '(借) 当座預金 1,700 / (貸) 手形貸付金 1,500 , 受取利息 200',
          '(借) 当座預金 1,500 / (貸) 手形貸付金 1,500'
        ],
        correct: 0,
        explanation: {
          concept: '手形貸付金の回収',
          brilliantExplanation: '元本1,500円は手形貸付金（資産）の減少として貸方に、利息200円は受取利息（収益）として貸方に記録します。'
        }
      },
      {
        text: '以前、備品を売却した際の売却代金 2,000円が本日、先方の普通預金口座から当社の当座預金口座に入金された。',
        choices: [
          '(借) 当座預金 2,000 / (貸) 未収入金 2,000',
          '(借) 当座預金 2,000 / (貸) 売掛金 2,000'
        ],
        correct: 0,
        explanation: {
          concept: '未収入金の回収',
          brilliantExplanation: '商品以外の売却代金の未回収分は「未収入金」として計上しているため、入金時には未収入金（資産）を減らして当座預金（資産）を増やします。'
        }
      },
      {
        text: '従業員に出張旅費の概算額として 2,000円を現金で手渡した。',
        choices: [
          '(借) 仮払金 2,000 / (貸) 現金 2,000',
          '(借) 前払金 2,000 / (貸) 現金 2,000'
        ],
        correct: 0,
        explanation: {
          concept: '仮払金（概算払い）',
          brilliantExplanation: '会計処理が確定していない概算払いは「仮払金（資産）」として借方に記録します。'
        }
      },
      {
        text: '従業員が出張から戻り、旅費交通費精算書の提出を受けた（電車代 300円、タクシー代 400円、宿泊代 800円）。残金は現金で受け取った。',
        choices: [
          '(借) 旅費交通費 1,500 , 現金 500 / (貸) 仮払金 2,000',
          '(借) 旅費交通費 2,000 / (貸) 仮払金 2,000'
        ],
        correct: 0,
        explanation: {
          concept: '仮払金の精算',
          brilliantExplanation: '実際の旅費交通費（費用）1,500円を借方に計上し、仮払金2,000円を貸方に取り崩して、残金500円は現金として受け取ります。'
        }
      },
      {
        text: '従業員が出張から戻り、出張旅費 2,500円の領収書の提出を受けた。このうち 2,000円は仮払金で処理していたが、不足分は給料に含めて支払うこととし、未払金として計上した。',
        choices: [
          '(借) 旅費交通費 2,500 / (貸) 仮払金 2,000 , 未払金 500',
          '(借) 旅費交通費 2,000 / (貸) 仮払金 2,000'
        ],
        correct: 0,
        explanation: {
          concept: '仮払金の精算（不足分）',
          brilliantExplanation: '旅費交通費（費用）2,500円を借方に、仮払金2,000円を貸方に取り崩し、不足分500円は未払金（負債）として計上します。'
        }
      },
      {
        text: '本日、普通預金口座に 1,200円の入金があったが、その内容が不明である。',
        choices: [
          '(借) 普通預金 1,200 / (貸) 仮受金 1,200',
          '(借) 普通預金 1,200 / (貸) 前受金 1,200'
        ],
        correct: 0,
        explanation: {
          concept: '仮受金（内容不明の入金）',
          brilliantExplanation: '内容が不明の入金は、原因判明まで「仮受金（負債）」として貸方に記録します。'
        }
      },
      {
        text: '内容不明であった 1,200円について、調査の結果、商品手付金 700円と得意先に対する掛代金の回収額 500円であることが判明した。',
        choices: [
          '(借) 仮受金 1,200 / (貸) 前受金 700 , 売掛金 500',
          '(借) 仮受金 1,200 / (貸) 前受金 1,200'
        ],
        correct: 0,
        explanation: {
          concept: '仮受金の原因判明',
          brilliantExplanation: '商品注文の手付金（前受金）700円と、売掛金の回収500円に振り替えて仮受金勘定をゼロにします。'
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
      },
      {
        text: '営業に使用する目的で土地 2,000円を購入し、仲介手数料 50円と土地の整地費用 150円を含めた代金は後日支払うこととした。',
        choices: [
          '(借) 土地 2,200 / (貸) 未払金 2,200',
          '(借) 土地 2,000 / (貸) 未払金 2,000'
        ],
        correct: 0,
        explanation: {
          concept: '土地取得原価と付随費用',
          brilliantExplanation: '仲介手数料や整地費用などの付随費用は取得原価（土地）に含めます。商品以外の未払いは「未払金」で処理します。'
        }
      },
      {
        text: '営業で使用する目的で購入した土地について、建設業者に整地作業を依頼していたが、これが完了したので代金 300円を現金で支払った。',
        choices: [
          '(借) 土地 300 / (貸) 現金 300',
          '(借) 修繕費 300 / (貸) 現金 300'
        ],
        correct: 0,
        explanation: {
          concept: '土地の整地費用',
          brilliantExplanation: '土地を使用可能な状態にするための整地費用は、取得原価（土地）に含めて資産計上します。'
        }
      },
      {
        text: '2年前に購入した備品（パソコン）が故障したため、その修理費用 150円を現金で支払った。',
        choices: [
          '(借) 修繕費 150 / (貸) 現金 150',
          '(借) 備品 150 / (貸) 現金 150'
        ],
        correct: 0,
        explanation: {
          concept: '修繕費（収益的支出）',
          brilliantExplanation: '既存の固定資産の原状回復や維持のための支出は「修繕費（費用）」として処理します（収益的支出）。'
        }
      },
      {
        text: '建物の改修工事を行い、代金 1,500円は翌月末に支払うこととした。このうち、1,000円は価値を高めるための支出（資本的支出）であり、残りは定期的な修繕のための支出（収益的支出）である。',
        choices: [
          '(借) 建物 1,000 , 修繕費 500 / (貸) 未払金 1,500',
          '(借) 修繕費 1,500 / (貸) 未払金 1,500'
        ],
        correct: 0,
        explanation: {
          concept: '資本的支出と収益的支出',
          brilliantExplanation: '価値を高める支出（資本的支出）は資産（建物）に加算し、定期的な修繕（収益的支出）は修繕費として費用処理します。'
        }
      },
      {
        text: '店舗を1か月あたり 600円で賃借する契約を結んだ。敷金（家賃の2か月分）および不動産会社への仲介手数料（家賃の1か月分）を小切手を振り出して支払った。',
        choices: [
          '(借) 差入保証金 1,200 , 支払手数料 600 / (貸) 当座預金 1,800',
          '(借) 差入保証金 1,200 / (貸) 当座預金 1,200'
        ],
        correct: 0,
        explanation: {
          concept: '敷金と仲介手数料',
          brilliantExplanation: '敷金1,200円（600円×2ヶ月）は後日返還される資産のため「差入保証金」として、仲介手数料600円（600円×1ヶ月）は支払手数料（費用）として借方に記録します。'
        }
      },
      {
        text: '店舗の賃貸借契約が終了し、敷金 1,200円のうち原状回復のために 800円が使用され、残額 400円が当座預金口座に振り込まれた。',
        choices: [
          '(借) 当座預金 400 , 修繕費 800 / (貸) 差入保証金 1,200',
          '(借) 当座預金 400 / (貸) 差入保証金 400'
        ],
        correct: 0,
        explanation: {
          concept: '差入保証金の返還と原状回復',
          brilliantExplanation: '差入保証金1,200円を貸方に取り崩し、返還額400円は当座預金（資産）、原状回復費800円は修繕費（費用）として借方に記録します。'
        }
      },
      {
        text: '会社所有の営業用車両にかかる自動車税 45,000円および印紙税 5,000円を現金で支払った。',
        choices: [
          '(借) 租税公課 50,000 / (貸) 現金 50,000',
          '(借) 自動車税 45,000 , 印紙税 5,000 / (貸) 現金 50,000'
        ],
        correct: 0,
        explanation: {
          concept: '租税公課の支払い',
          brilliantExplanation: '自動車税や印紙税などの税金は、まとめて「租税公課（費用）」として借方に計上し、現金（資産）の減少を貸方に記録します。'
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
      },
      {
        text: '株主総会の決議により、前年度の剰余金から株主に対する配当 500,000円および法令に基づく利益準備金 50,000円を計上することを確定した。',
        choices: [
          '(借) 繰越利益剰余金 550,000 / (貸) 未払配当金 500,000 , 利益準備金 50,000',
          '(借) 繰越利益剰余金 500,000 / (貸) 未払配当金 500,000'
        ],
        correct: 0,
        explanation: {
          concept: '剰余金の配当と準備金積立',
          brilliantExplanation: '配当500,000円と積立50,000円の原資として繰越利益剰余金（純資産）550,000円を借方に減らし、未払配当金（負債）と利益準備金（純資産）を貸方に計上します。'
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
      },
      {
        text: '創業にあたり、出資者より株式 300株を発行して 1株あたり 10,000円の払込みを受け、全額を普通預金口座に入金した。',
        choices: [
          '(借) 普通預金 3,000,000 / (貸) 資本金 3,000,000',
          '(借) 資本金 3,000,000 / (貸) 普通預金 3,000,000'
        ],
        correct: 0,
        explanation: {
          concept: '株式発行による設立',
          brilliantExplanation: '払込額 3,000,000円（300株×10,000円）は普通預金（資産）の増加として借方に、資本金（純資産）として貸方に計上します。'
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
      },
      {
        text: '中間決算に基づき、法人税等 300,000円を前払いとして当座預金口座より引き落とし納付した。',
        choices: [
          '(借) 仮払法人税等 300,000 / (貸) 当座預金 300,000',
          '(借) 法人税等 300,000 / (貸) 当座預金 300,000'
        ],
        correct: 0,
        explanation: {
          concept: '中間納付（仮払法人税等）',
          brilliantExplanation: '中間申告による納付額は、未確定の「仮払法人税等（資産）」として借方に計上し、当座預金（資産）の減少を貸方に記録します。'
        }
      },
      {
        text: '本決算を行い、当期の法人税等の確定額 800,000円を計上した。なお、中間納付済みの 300,000円を控除した残額は未払いとする。',
        choices: [
          '(借) 法人税等 800,000 / (貸) 仮払法人税等 300,000 , 未払法人税等 500,000',
          '(借) 法人税等 800,000 / (貸) 未払法人税等 800,000'
        ],
        correct: 0,
        explanation: {
          concept: '本決算の法人税等確定',
          brilliantExplanation: '法人税等（費用）800,000円を借方に計上し、中間納付済みの仮払法人税等300,000円を貸方に相殺、残額500,000円は未払法人税等（負債）とします。'
        }
      },
      {
        text: '前期決算で未払いとなっていた法人税等 500,000円を普通預金口座から納付した。',
        choices: [
          '(借) 未払法人税等 500,000 / (貸) 普通預金 500,000',
          '(借) 法人税等 500,000 / (貸) 普通預金 500,000'
        ],
        correct: 0,
        explanation: {
          concept: '未払法人税等の納付',
          brilliantExplanation: '前期に未払計上していた「未払法人税等（負債）」を借方に減らし、普通預金（資産）の減少を貸方に記録します。'
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
      },
      {
        text: '事業用の事務用品 220,000円（うち消費税額 20,000円）を外部業者より購入し、代金は翌月払いとした（税抜方式で処理する）。',
        choices: [
          '(借) 消耗品費 200,000 , 仮払消費税 20,000 / (貸) 未払金 220,000',
          '(借) 消耗品費 220,000 / (貸) 未払金 220,000'
        ],
        correct: 0,
        explanation: {
          concept: '税抜方式での仕入',
          brilliantExplanation: '税抜方式では消費税額を本体価格から分離し、仮払消費税（資産）として計上します。本体200,000円は消耗品費、消費税20,000円は仮払消費税、未払い220,000円は未払金とします。'
        }
      },
      {
        text: 'デザイン制作サービスを顧客へ提供し、対価 440,000円（うち消費税額 40,000円）の請求書を送付した（税抜方式で処理する）。',
        choices: [
          '(借) 未収入金 440,000 / (貸) 売上 400,000 , 仮受消費税 40,000',
          '(借) 未収入金 440,000 / (貸) 売上 440,000'
        ],
        correct: 0,
        explanation: {
          concept: '税抜方式での売上',
          brilliantExplanation: '税抜方式では消費税額を本体価格から分離し、仮受消費税（負債）として計上します。本体400,000円は売上、消費税40,000円は仮受消費税、請求額440,000円は未収入金とします。'
        }
      },
      {
        text: '年度末の決算にあたり、預かり分の消費税 40,000円と支払済みの消費税 20,000円を相殺し、納付予定額を確定した。',
        choices: [
          '(借) 仮受消費税 40,000 / (貸) 仮払消費税 20,000 , 未払消費税 20,000',
          '(借) 未払消費税 20,000 / (貸) 仮受消費税 20,000'
        ],
        correct: 0,
        explanation: {
          concept: '消費税の決算精算（相殺）',
          brilliantExplanation: '仮受消費税（負債）40,000円を借方に、仮払消費税（資産）20,000円を貸方に相殺し、差額20,000円は未払消費税（負債）として計上します。'
        }
      },
      {
        text: '確定申告に基づき、消費税の未納分 20,000円を金融機関から振込にて納めた。',
        choices: [
          '(借) 未払消費税 20,000 / (貸) 普通預金 20,000',
          '(借) 仮受消費税 20,000 / (貸) 普通預金 20,000'
        ],
        correct: 0,
        explanation: {
          concept: '未払消費税の納付',
          brilliantExplanation: '決算で未払計上していた「未払消費税（負債）」を借方に減らし、普通預金（資産）の減少を貸方に記録します。'
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
      },
      {
        text: '従業員に給料の前払い 200円を現金で行った。',
        choices: [
          '(借) 従業員立替金 200 / (貸) 現金 200',
          '(借) 前払金 200 / (貸) 現金 200'
        ],
        correct: 0,
        explanation: {
          concept: '給料の前払い',
          brilliantExplanation: '給料の前払いは従業員への立替えとして「従業員立替金（資産）」で処理し、給料支払時に相殺します。'
        }
      },
      {
        text: '給料日となり、給料総額 3,000円から源泉所得税 400円、社会保険料 300円、および前払いしていた 200円を差し引き、残額を普通預金口座から支払った。',
        choices: [
          '(借) 給料 3,000 / (貸) 従業員預り金 700 , 従業員立替金 200 , 普通預金 2,100',
          '(借) 給料 3,000 / (貸) 預り金 700 , 普通預金 2,300'
        ],
        correct: 0,
        explanation: {
          concept: '給料支払と前払いの相殺',
          brilliantExplanation: '給料総額3,000円を借方に、源泉所得税400円+社会保険料300円=700円は従業員預り金、前払い分200円は従業員立替金、残額2,100円は普通預金として貸方に記録します。'
        }
      },
      {
        text: '従業員から預かっていた源泉所得税 400円を現金で納付した。',
        choices: [
          '(借) 従業員預り金 400 / (貸) 現金 400',
          '(借) 租税公課 400 / (貸) 現金 400'
        ],
        correct: 0,
        explanation: {
          concept: '源泉所得税の納付',
          brilliantExplanation: '預かっていた源泉所得税を納付するため、従業員預り金（負債）を借方に減らし、現金（資産）を貸方に減らします。'
        }
      },
      {
        text: '社会保険料 600円を現金で納付した。このうち 300円は従業員から預かっているものである。',
        choices: [
          '(借) 従業員預り金 300 , 法定福利費 300 / (貸) 現金 600',
          '(借) 法定福利費 600 / (貸) 現金 600'
        ],
        correct: 0,
        explanation: {
          concept: '社会保険料の納付',
          brilliantExplanation: '従業員から預かっていた従業員預り金300円と、会社負担分の法定福利費（費用）300円を借方に、現金600円を貸方に記録します。'
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
      },
      {
        text: '商品 1,200円を販売し、代金のうち 800円は信販会社発行の商品券で受け取り、残額は現金で受け取った。',
        choices: [
          '(借) 現金 400 , 受取商品券 800 / (貸) 売上 1,200',
          '(借) 受取商品券 1,200 / (貸) 売上 1,200'
        ],
        correct: 0,
        explanation: {
          concept: '商品券と現金の受取',
          brilliantExplanation: '商品券800円は受取商品券（資産）、現金400円（資産）として借方に、売上1,200円（収益）を貸方に記録します。'
        }
      },
      {
        text: '手許に保有している 800円の商品券を精算し、同額を現金で受け取った。',
        choices: [
          '(借) 現金 800 / (貸) 受取商品券 800',
          '(借) 受取商品券 800 / (貸) 現金 800'
        ],
        correct: 0,
        explanation: {
          concept: '商品券の換金',
          brilliantExplanation: '商品券を精算して現金を受け取るため、受取商品券（資産）を貸方に減らし、現金（資産）を借方に増やします。'
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
      },
      {
        text: '月末に金庫を確認したところ、現金の実際有高は 1,200円であったが、帳簿残高は 1,500円であった。',
        choices: [
          '(借) 現金過不足 300 / (貸) 現金 300',
          '(借) 現金 300 / (貸) 現金過不足 300'
        ],
        correct: 0,
        explanation: {
          concept: '現金不足の計上',
          brilliantExplanation: '実際有高の方が 300円少ないため、帳簿の現金（資産）を300円減らし、相手科目は「現金過不足」とします。'
        }
      },
      {
        text: '現金過不足について原因を調べたところ、400円については通信費の支払いが未記帳であったことが判明した。',
        choices: [
          '(借) 通信費 400 / (貸) 現金過不足 400',
          '(借) 現金過不足 400 / (貸) 通信費 400'
        ],
        correct: 0,
        explanation: {
          concept: '現金過不足の原因判明',
          brilliantExplanation: '通信費の支払い漏れ（費用の発生）を借方に計上し、現金過不足を貸方に減らして原因を解消します。（現金過不足勘定は貸方残高 100円となる）'
        }
      },
      {
        text: '決算日となり、現金過不足残高（残り 100円）について原因が判明しなかったため、適切な勘定へ振り替える。',
        choices: [
          '(借) 現金過不足 100 / (貸) 雑益 100',
          '(借) 雑損 100 / (貸) 現金過不足 100'
        ],
        correct: 0,
        explanation: {
          concept: '現金過不足の決算振替（雑益）',
          brilliantExplanation: '通信費400円を判明後、現金過不足勘定は100円の貸方残高（過剰分）となる。決算時に「雑益（収益）」へ振り替えて現金過不足勘定をゼロにします。'
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
      },
      {
        text: '当期首に、備品（取得原価：2,000円、期首減価償却累計額 300円、間接法で記帳）を 1,500円で売却し、代金は後日受け取ることとした。',
        choices: [
          '(借) 未収入金 1,500 , 備品減価償却累計額 300 , 固定資産売却損 200 / (貸) 備品 2,000',
          '(借) 未収入金 1,500 , 備品減価償却累計額 300 / (貸) 備品 1,800'
        ],
        correct: 0,
        explanation: {
          concept: '固定資産の売却（売却損）',
          brilliantExplanation: '取得原価2,000円から累計額300円を差し引いた帳簿価額1,700円で売却額1,500円は200円の損失。備品と累計額を取り崩し、差額は固定資産売却損として計上します。'
        }
      },
      {
        text: '期中に、備品（取得原価：2,000円、期首減価償却累計額 300円、期首から売却日までの減価償却費：100円、間接法で記帳）を 1,800円で売却し、代金は現金で受け取った。',
        choices: [
          '(借) 現金 1,800 , 備品減価償却累計額 300 , 減価償却費 100 / (貸) 備品 2,000 , 固定資産売却益 200',
          '(借) 現金 1,800 , 備品減価償却累計額 300 / (貸) 備品 2,000 , 固定資産売却益 100'
        ],
        correct: 0,
        explanation: {
          concept: '固定資産の売却（売却益・期中）',
          brilliantExplanation: '期中売却では当期分の減価償却費100円を計上し、帳簿価額1,600円（2,000−300−100）と売却額1,800円の差額200円は固定資産売却益とします。'
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
      },
      {
        text: '×2年3月31日、決算につき、建物（取得日：×1年4月1日、取得原価：2,000円、耐用年数：10年、残存価額：ゼロ、間接法で記帳）の減価償却を行う。',
        choices: [
          '(借) 減価償却費 200 / (貸) 建物減価償却累計額 200',
          '(借) 減価償却費 200 / (貸) 建物 200'
        ],
        correct: 0,
        explanation: {
          concept: '減価償却（通年・間接法）',
          brilliantExplanation: '取得原価2,000円÷耐用年数10年＝200円。満1年使用しているため年額全額を計上し、間接法では建物減価償却累計額（評価勘定）を貸方に記録します。'
        }
      },
      {
        text: '×2年3月31日、決算につき、建物（取得日：×1年10月1日、取得原価：2,000円、耐用年数：10年、残存価額：ゼロ、間接法で記帳）の減価償却を月割りで行う。',
        choices: [
          '(借) 減価償却費 100 / (貸) 建物減価償却累計額 100',
          '(借) 減価償却費 200 / (貸) 建物減価償却累計額 200'
        ],
        correct: 0,
        explanation: {
          concept: '減価償却（月割り・間接法）',
          brilliantExplanation: '年額200円（2,000÷10）を使用月数6ヶ月（×1年10月〜×2年3月）で月割り計算：200円×6/12＝100円。間接法では建物減価償却累計額を使用します。'
        }
      },
      {
        text: '車両運搬具の減価償却費について、月別処理にて11ヶ月分として計上済みの 330,000円に対し、年間見積額 360,000円との不足分を決算月に調整計上した（間接法）。',
        choices: [
          '(借) 減価償却費 30,000 / (貸) 車両運搬具減価償却累計額 30,000',
          '(借) 減価償却費 330,000 / (貸) 車両運搬具減価償却累計額 330,000'
        ],
        correct: 0,
        explanation: {
          concept: '月次決算の期末調整',
          brilliantExplanation: '年間見積額360,000円から既計上額330,000円を差し引いた不足分30,000円を、決算月に追加計上します。'
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
      },
      {
        text: '決算となり、売掛金の残高に対して 800円の貸倒引当金を設定する。なお、貸倒引当金の残高は 500円であり、差額補充法によって処理する。',
        choices: [
          '(借) 貸倒引当金繰入 300 / (貸) 貸倒引当金 300',
          '(借) 貸倒引当金 300 / (貸) 貸倒引当金戻入 300'
        ],
        correct: 0,
        explanation: {
          concept: '貸倒引当金の設定（差額補充法・増加）',
          brilliantExplanation: '必要額800円から既存残高500円を差し引いた差額300円を、貸倒引当金繰入（費用）として追加計上します。'
        }
      },
      {
        text: '決算となり、売掛金の残高に対して 800円の貸倒引当金を設定する。なお、貸倒引当金の残高は 1,000円であり、差額補充法によって処理する。',
        choices: [
          '(借) 貸倒引当金 200 / (貸) 貸倒引当金戻入 200',
          '(借) 貸倒引当金繰入 200 / (貸) 貸倒引当金 200'
        ],
        correct: 0,
        explanation: {
          concept: '貸倒引当金の設定（差額補充法・減少）',
          brilliantExplanation: '必要な引当金800円より既存残高1,000円が200円多いため、貸倒引当金を減らし貸倒引当金戻入（収益）を計上します。'
        }
      },
      {
        text: '得意先が倒産し、同社に対する売掛金（前期発生分）500円が貸倒れとなった。なお、貸倒引当金は設定していない。',
        choices: [
          '(借) 貸倒損失 500 / (貸) 売掛金 500',
          '(借) 貸倒引当金 500 / (貸) 売掛金 500'
        ],
        correct: 0,
        explanation: {
          concept: '貸倒れ（引当金なし）',
          brilliantExplanation: '貸倒引当金を設定していないため、貸倒損失（費用）として借方に計上し、売掛金（資産）を貸方に減らします。'
        }
      },
      {
        text: '得意先が倒産し、同社に対する売掛金（前期発生分）500円が貸倒れとなった。なお、貸倒引当金の残高は 800円であった。',
        choices: [
          '(借) 貸倒引当金 500 / (貸) 売掛金 500',
          '(借) 貸倒損失 500 / (貸) 売掛金 500'
        ],
        correct: 0,
        explanation: {
          concept: '前期発生債権の貸倒れ（引当金が十分）',
          brilliantExplanation: '前期以前発生の債権の貸倒れは、設定中の貸倒引当金（評価勘定）から優先的に取り崩します。'
        }
      },
      {
        text: '得意先が倒産し、同社に対する売掛金（前期発生分）900円が貸倒れとなった。なお、貸倒引当金の残高は 600円であった。',
        choices: [
          '(借) 貸倒引当金 600 , 貸倒損失 300 / (貸) 売掛金 900',
          '(借) 貸倒損失 900 / (貸) 売掛金 900'
        ],
        correct: 0,
        explanation: {
          concept: '前期発生債権の貸倒れ（引当金不足）',
          brilliantExplanation: '貸倒引当金600円を取り崩しても不足する300円は、貸倒損失（費用）として借方に計上します。'
        }
      },
      {
        text: '得意先が倒産し、同社に対する売掛金（当期発生分）600円が貸倒れとなった。なお、貸倒引当金の残高は 800円であった。',
        choices: [
          '(借) 貸倒損失 600 / (貸) 売掛金 600',
          '(借) 貸倒引当金 600 / (貸) 売掛金 600'
        ],
        correct: 0,
        explanation: {
          concept: '当期発生債権の貸倒れ',
          brilliantExplanation: '当期発生分の債権の貸倒れは、引当金残高の有無にかかわらず全額「貸倒損失（費用）」で処理します。'
        }
      },
      {
        text: '前期に貸倒処理していた売掛金 200円を現金で回収した。なお、貸倒引当金の残高は 800円であった。',
        choices: [
          '(借) 現金 200 / (貸) 償却債権取立益 200',
          '(借) 現金 200 / (貸) 貸倒引当金戻入 200'
        ],
        correct: 0,
        explanation: {
          concept: '償却債権の回収',
          brilliantExplanation: '前期以前に貸倒処理した債権の回収は、引当金残高に関係なく「償却債権取立益（収益）」を計上します。'
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
      },
      {
        text: '決算につき、支払利息 2,400円について必要な処理を行う。なお、支払利息は向こう1年分を支払ったものであり、このうち当期に属する金額は 400円、翌期に属する金額は 2,000円である。',
        choices: [
          '(借) 前払利息 2,000 / (貸) 支払利息 2,000',
          '(借) 支払利息 2,000 / (貸) 前払利息 2,000'
        ],
        correct: 0,
        explanation: {
          concept: '費用の繰延べ（前払利息）',
          brilliantExplanation: '翌期分2,000円は当期の費用からマイナス（貸方に支払利息）し、前払利息（資産）として借方に計上します。'
        }
      },
      {
        text: '翌期首、前期の処理について再振替仕訳を行った（前払利息 2,000円）。',
        choices: [
          '(借) 支払利息 2,000 / (貸) 前払利息 2,000',
          '(借) 前払利息 2,000 / (貸) 支払利息 2,000'
        ],
        correct: 0,
        explanation: {
          concept: '前払利息の再振替',
          brilliantExplanation: '決算時に繰り延べた前払利息（資産）を、翌期の費用に戻すため逆仕訳を行います。'
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
      },
      {
        text: '決算につき、支払利息について必要な処理を行う。なお、支払利息はすべて翌期に1年分を後払いする契約であり、このうち当期に属する金額は 400円、翌期に属する金額は 2,000円である。',
        choices: [
          '(借) 支払利息 400 / (貸) 未払利息 400',
          '(借) 未払利息 400 / (貸) 支払利息 400'
        ],
        correct: 0,
        explanation: {
          concept: '費用の見越し（未払利息）',
          brilliantExplanation: '当期に属する未払いの利息400円を、支払利息（費用）として借方に計上し、未払利息（負債）として貸方に記録します。'
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
      },
      {
        text: '決算につき、受取利息について必要な処理を行う。なお、受取利息は翌期に1年分を受け取る契約であり、このうち当期に属する金額は 400円、翌期に属する金額は 2,000円である。',
        choices: [
          '(借) 未収利息 400 / (貸) 受取利息 400',
          '(借) 受取利息 400 / (貸) 未収利息 400'
        ],
        correct: 0,
        explanation: {
          concept: '収益の見越し（未収利息）',
          brilliantExplanation: '当期に属する未収の利息400円を、未収利息（資産）として借方に計上し、受取利息（収益）として貸方に記録します。'
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
      },
      {
        text: '決算につき、受取利息 2,400円について必要な処理を行う。なお、受取利息は向こう1年分を受け取ったものであり、このうち当期に属する金額は 400円、翌期に属する金額は 2,000円である。',
        choices: [
          '(借) 受取利息 2,000 / (貸) 前受利息 2,000',
          '(借) 前受利息 2,000 / (貸) 受取利息 2,000'
        ],
        correct: 0,
        explanation: {
          concept: '収益の繰延べ（前受利息）',
          brilliantExplanation: '翌期分2,000円は当期の収益からマイナス（借方に受取利息）し、前受利息（負債）として貸方に計上します。'
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
      },
      {
        text: '郵便切手 500円、コピー用紙 400円、ボールペン 100円、収入印紙 300円を現金で購入した。',
        choices: [
          '(借) 通信費 500 , 消耗品費 500 , 租税公課 300 / (貸) 現金 1,300',
          '(借) 貯蔵品 1,300 / (貸) 現金 1,300'
        ],
        correct: 0,
        explanation: {
          concept: '切手・文具・印紙の購入',
          brilliantExplanation: '切手500円は通信費、コピー用紙400円+ボールペン100円=500円は消耗品費、収入印紙300円は租税公課として費用処理します。'
        }
      },
      {
        text: '決算日となり調査したところ、郵便切手 250円と収入印紙 150円が未使用で残っていた。',
        choices: [
          '(借) 貯蔵品 400 / (貸) 通信費 250 , 租税公課 150',
          '(借) 通信費 250 , 租税公課 150 / (貸) 貯蔵品 400'
        ],
        correct: 0,
        explanation: {
          concept: '未使用切手・印紙の貯蔵品振替',
          brilliantExplanation: '未使用分は費用からマイナス（貸方に通信費250円・租税公課150円）し、「貯蔵品（資産）400円」として借方に計上します。'
        }
      },
      {
        text: '翌期首、前期末の決算において貯蔵品に計上していた郵便切手 250円と収入印紙 150円について再振替仕訳を行った。',
        choices: [
          '(借) 通信費 250 , 租税公課 150 / (貸) 貯蔵品 400',
          '(借) 貯蔵品 400 / (貸) 通信費 250 , 租税公課 150'
        ],
        correct: 0,
        explanation: {
          concept: '貯蔵品の再振替仕訳',
          brilliantExplanation: '貯蔵品（資産）を借方に取り崩す逆仕訳を行い、通信費・租税公課（費用）として戻します。'
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
    id: 'lvl_36',
    level: 36,
    title: '試算表の試練',
    subtitle: '決算整理を反映した『決算整理後残高試算表』を読み解く応用問題。',
    url: 'http://localhost:3001/guides/trial-balance',
    tags: ['試算表', '現金過不足', '決算整理', '雑益'],
    questions: [
      {
        text: '【原因判明】決算整理前残高試算表で現金過不足の貸方残高 90,000円。このうち 60,000円は売掛金の回収額が未記入だったことが判明した。正しい仕訳は？',
        choices: [
          '(借) 現金過不足 60,000 / (貸) 売掛金 60,000',
          '(借) 売掛金 60,000 / (貸) 現金過不足 60,000',
          '(借) 現金 60,000 / (貸) 売掛金 60,000'
        ],
        correct: 0,
        explanation: {
          concept: '未記入の売掛金回収を修正',
          brilliantExplanation: '回収の未記入を修正するため、現金過不足（貸方残高）を60,000円減らし（借方）、売掛金を60,000円減らします（貸方）。'
        }
      },
      {
        text: '【残額の処理】残りの現金過不足 30,000円は原因が特定できなかった。決算にあたり適切に処理する。正しい仕訳は？',
        choices: [
          '(借) 現金過不足 30,000 / (貸) 雑益 30,000',
          '(借) 雑損 30,000 / (貸) 現金過不足 30,000',
          '(借) 現金過不足 30,000 / (貸) 受取手数料 30,000'
        ],
        correct: 0,
        explanation: {
          concept: '原因不明の現金過不足は雑益へ',
          brilliantExplanation: '現金過不足の貸方残高（受領超過）は、決算時に <strong>雑益 30,000円</strong>（収益）へ振り替えて勘定をゼロにします。'
        }
      },
      {
        text: '【試算表・売掛金】決算整理前の売掛金残高 520,000円。決算整理後残高試算表の売掛金は？',
        choices: [
          '借方残高 460,000円',
          '借方残高 520,000円',
          '貸方残高 460,000円'
        ],
        correct: 0,
        explanation: {
          concept: '売掛金の減少',
          brilliantExplanation: '回収未記入分 60,000円を売掛金から控除：520,000 − 60,000 = <strong>460,000円（借方残高）</strong>。'
        }
      },
      {
        text: '【試算表・雑益】決算整理後残高試算表に表示される雑益の金額は？',
        choices: [
          '貸方残高 30,000円',
          '貸方残高 60,000円',
          '借方残高 30,000円'
        ],
        correct: 0,
        explanation: {
          concept: '雑益の計上',
          brilliantExplanation: '原因不明の現金過不足 30,000円は <strong>雑益（収益）</strong>として貸方残高になります。'
        }
      },
      {
        text: '【期末照合・未記帳分】決算に行った照合の結果、手元実有額が 40,000円不足していた。このうち 25,000円は旅費交通費の未記帳が原因だった。正しい仕訳は？',
        choices: [
          '(借) 旅費交通費 25,000 / (貸) 現金 25,000',
          '(借) 現金 25,000 / (貸) 旅費交通費 25,000',
          '(借) 旅費交通費 25,000 / (貸) 現金過不足 25,000'
        ],
        correct: 0,
        explanation: {
          concept: '期末照合による未記帳分の修正',
          brilliantExplanation: '期中に現金過不足を計上せず、期末の照合で直接処理します。未記帳の旅費交通費を <strong>25,000円（借方）</strong>に計上し、現金を <strong>25,000円（貸方）</strong>に減らします。'
        }
      },
      {
        text: '【期末照合・原因不明分】残りの不足額 15,000円は原因が特定できなかった。適切に処理する。正しい仕訳は？',
        choices: [
          '(借) 雑損 15,000 / (貸) 現金 15,000',
          '(借) 現金 15,000 / (貸) 雑益 15,000',
          '(借) 雑損 15,000 / (貸) 現金過不足 15,000'
        ],
        correct: 0,
        explanation: {
          concept: '原因不明の現金不足は雑損へ',
          brilliantExplanation: '現金不足（損失）で原因不明のため、<strong>雑損 15,000円（借方）</strong>として処理します。現金を <strong>15,000円（貸方）</strong>に減らします。'
        }
      },
      {
        text: '【期末照合・現金】決算整理前残高試算表の現金残高は 840,000円。決算整理後残高試算表の現金は？',
        choices: [
          '借方残高 800,000円',
          '借方残高 840,000円',
          '貸方残高 800,000円'
        ],
        correct: 0,
        explanation: {
          concept: '現金の減少',
          brilliantExplanation: '不足額 40,000円を現金から控除：840,000 − 40,000 = <strong>800,000円（借方残高）</strong>。'
        }
      },
      {
        text: '【期末照合・旅費交通費】決算整理前の旅費交通費残高は 62,000円。決算整理後残高試算表の旅費交通費は？',
        choices: [
          '借方残高 87,000円',
          '借方残高 62,000円',
          '貸方残高 87,000円'
        ],
        correct: 0,
        explanation: {
          concept: '旅費交通費の増加',
          brilliantExplanation: '未記帳の出張旅費 25,000円を加算：62,000 + 25,000 = <strong>87,000円（借方残高）</strong>。'
        }
      },
      {
        text: '【期中照合・超過】月末に現金の帳簿残高と手元実有額を照合したところ、手元実有額が 5,500円超過していた。正しい仕訳は？',
        choices: [
          '(借) 現金 5,500 / (貸) 現金過不足 5,500',
          '(借) 現金過不足 5,500 / (貸) 現金 5,500',
          '(借) 現金 5,500 / (貸) 雑益 5,500'
        ],
        correct: 0,
        explanation: {
          concept: '期中の現金超過を現金過不足で処理',
          brilliantExplanation: '実有額が帳簿より多いため、<strong>現金 5,500円（借方）</strong>を増やし、相手科目は <strong>現金過不足 5,500円（貸方）</strong>とします。'
        }
      },
      {
        text: '【決算振替・収益確定】超過分 5,500円のうち 4,200円は受取手数料の未記帳と判明した。正しい仕訳は？',
        choices: [
          '(借) 現金過不足 4,200 / (貸) 受取手数料 4,200',
          '(借) 受取手数料 4,200 / (貸) 現金過不足 4,200',
          '(借) 現金過不足 4,200 / (貸) 雑益 4,200'
        ],
        correct: 0,
        explanation: {
          concept: '判明した原因を現金過不足から振替',
          brilliantExplanation: '未記帳の受取手数料 <strong>4,200円（収益）</strong>を貸方に計上し、現金過不足（貸方残高）を <strong>4,200円（借方）</strong>に減らします。'
        }
      },
      {
        text: '【決算振替・残額】残りの現金過不足 1,300円は原因不明だった。適切に処理する。正しい仕訳は？',
        choices: [
          '(借) 現金過不足 1,300 / (貸) 雑益 1,300',
          '(借) 雑損 1,300 / (貸) 現金過不足 1,300',
          '(借) 現金過不足 1,300 / (貸) 受取手数料 1,300'
        ],
        correct: 0,
        explanation: {
          concept: '原因不明の現金過不足（貸方残高）',
          brilliantExplanation: '現金過不足の貸方残高（受領超過）1,300円は、決算時に <strong>雑益 1,300円</strong>（収益）へ振り替えて勘定をゼロにします。'
        }
      },
      {
        text: '【記帳過小の修正】決算の照合で手元実有額が 6,800円不足。通信費 25,000円の支払を 20,000円と誤記帳していた。正しい仕訳は？',
        choices: [
          '(借) 通信費 5,000 / (貸) 現金 5,000',
          '(借) 通信費 25,000 / (貸) 現金 25,000',
          '(借) 現金 5,000 / (貸) 通信費 5,000'
        ],
        correct: 0,
        explanation: {
          concept: '記帳過小の修正',
          brilliantExplanation: '通信費 25,000円 − 記帳済み 20,000円 = <strong>5,000円の記帳漏れ</strong>。通信費（費用）を借方に、現金を貸方に計上します。'
        }
      },
      {
        text: '【記帳過小・原因不明分】残りの不足額 1,800円は原因が特定できなかった。正しい仕訳は？',
        choices: [
          '(借) 雑損 1,800 / (貸) 現金 1,800',
          '(借) 現金 1,800 / (貸) 雑益 1,800',
          '(借) 雑損 1,800 / (貸) 現金過不足 1,800'
        ],
        correct: 0,
        explanation: {
          concept: '原因不明の現金不足は雑損へ',
          brilliantExplanation: '現金不足の原因不明分 1,800円は <strong>雑損（損失）</strong>として借方に計上し、現金を貸方に減らします。'
        }
      },
      {
        text: '【記帳過小・一括仕訳】上記2問をまとめた正しい決算整理仕訳は？',
        choices: [
          '(借) 通信費 5,000 , 雑損 1,800 / (貸) 現金 6,800',
          '(借) 通信費 25,000 , 雑損 1,800 / (貸) 現金 26,800',
          '(借) 通信費 5,000 / (貸) 現金 5,000'
        ],
        correct: 0,
        explanation: {
          concept: '決算整理仕訳の一括表示',
          brilliantExplanation: '記帳過小の修正 <strong>通信費 5,000円</strong>と、原因不明の不足 <strong>雑損 1,800円</strong>を借方に、不足総額 <strong>現金 6,800円</strong>を貸方に計上します。'
        }
      },
      {
        text: '【現金の範囲】金庫に紙幣・貨幣 150,000円、郵便為替証書 25,000円、送金小切手 30,000円、他店振出小切手 35,000円、当店振出小切手 18,000円、郵便切手 8,000円、収入印紙 12,000円、他店振出約束手形 60,000円がある。簿記上「現金」に含まれる金額は？',
        choices: [
          '240,000円',
          '330,000円',
          '198,000円'
        ],
        correct: 0,
        explanation: {
          concept: '簿記上の現金の範囲',
          brilliantExplanation: '現金に含まれるのは <strong>紙幣・貨幣 150,000円 + 郵便為替証書 25,000円 + 送金小切手 30,000円 + 他店振出小切手 35,000円 = 240,000円</strong>。当店振出小切手は当座預金、郵便切手は通信費・貯蔵品、収入印紙は租税公課・貯蔵品、他店振出約束手形は受取手形として処理します。'
        }
      },
      {
        text: '【現金の範囲・該当なし】次のうち、簿記上「現金」に含まれないものはどれか？',
        choices: [
          '当店振り出しの小切手',
          '郵便為替証書',
          '送金小切手'
        ],
        correct: 0,
        explanation: {
          concept: '現金に含まれないもの',
          brilliantExplanation: '<strong>当店振出小切手</strong>は当座預金の払出を取り消すため「当座預金」として扱います。郵便為替証書・送金小切手は通貨代用証券として現金に含まれます。'
        }
      },
      {
        text: '【不足額の算定】現金出納帳の帳簿残高は 280,000円。金庫の実際有高（現金の範囲）は 240,000円だった。差額は？',
        choices: [
          '40,000円の不足',
          '40,000円の超過',
          '280,000円の不足'
        ],
        correct: 0,
        explanation: {
          concept: '帳簿残高と実際有高の差額',
          brilliantExplanation: '<strong>280,000 − 240,000 = 40,000円の不足</strong>。帳簿残高を40,000円減らすため、貸方に「現金 40,000円」を計上します。'
        }
      },
      {
        text: '【未記帳の修正】不足額 40,000円のうち 8,500円は通信費の支払いが未記帳だった。正しい仕訳は？',
        choices: [
          '(借) 通信費 8,500 / (貸) 現金 8,500',
          '(借) 現金 8,500 / (貸) 通信費 8,500',
          '(借) 通信費 8,500 / (貸) 現金過不足 8,500'
        ],
        correct: 0,
        explanation: {
          concept: '通信費の未記帳を修正',
          brilliantExplanation: '未記帳の通信費 <strong>8,500円（費用）</strong>を借方に計上し、現金を <strong>8,500円（貸方）</strong>に減らします。'
        }
      },
      {
        text: '【原因不明分の処理】残りの不足額 31,500円は原因が特定できなかった。正しい仕訳は？',
        choices: [
          '(借) 雑損 31,500 / (貸) 現金 31,500',
          '(借) 現金 31,500 / (貸) 雑益 31,500',
          '(借) 雑損 31,500 / (貸) 現金過不足 31,500'
        ],
        correct: 0,
        explanation: {
          concept: '原因不明の現金不足は雑損へ',
          brilliantExplanation: '原因不明の不足額 31,500円（40,000 − 8,500）は <strong>雑損 31,500円</strong>として借方に計上し、現金を貸方に減らします。'
        }
      },
      {
        text: '【金庫保管物・一括仕訳】上記の不足処理をまとめた正しい決算整理仕訳は？',
        choices: [
          '(借) 通信費 8,500 , 雑損 31,500 / (貸) 現金 40,000',
          '(借) 通信費 8,500 , 雑損 31,500 / (貸) 現金過不足 40,000',
          '(借) 通信費 40,000 / (貸) 現金 40,000'
        ],
        correct: 0,
        explanation: {
          concept: '金庫保管物の決算整理仕訳（一括）',
          brilliantExplanation: '未記帳の通信費 <strong>8,500円</strong>と原因不明の <strong>雑損 31,500円</strong>を借方に、不足総額 <strong>現金 40,000円</strong>を貸方に計上します。'
        }
      },
      {
        text: '【発送費の未記帳】現金過不足（貸方残高 22,000円）の原因を調査したところ、発送費 8,000円の支払が未記帳だった。正しい仕訳は？',
        choices: [
          '(借) 発送費 8,000 / (貸) 現金過不足 8,000',
          '(借) 現金過不足 8,000 / (貸) 発送費 8,000',
          '(借) 発送費 8,000 / (貸) 現金 8,000'
        ],
        correct: 0,
        explanation: {
          concept: '発送費の未記帳を修正',
          brilliantExplanation: '未記帳の <strong>発送費 8,000円（費用）</strong>を借方に計上し、現金過不足（貸方残高）を <strong>8,000円増加（貸方）</strong>させます。'
        }
      },
      {
        text: '【受取家賃の未記帳】さらに調査したところ、受取家賃 25,000円の入金が未記帳だった。正しい仕訳は？',
        choices: [
          '(借) 現金過不足 25,000 / (貸) 受取家賃 25,000',
          '(借) 受取家賃 25,000 / (貸) 現金過不足 25,000',
          '(借) 現金 25,000 / (貸) 受取家賃 25,000'
        ],
        correct: 0,
        explanation: {
          concept: '受取家賃の未記帳を修正',
          brilliantExplanation: '未記帳の <strong>受取家賃 25,000円（収益）</strong>を貸方に計上し、現金過不足を <strong>25,000円（借方）</strong>に減らします。'
        }
      },
      {
        text: '【残額の処理】上記の処理後、現金過不足は貸方残高 5,000円となったが原因は不明だった。適切に処理する。正しい仕訳は？',
        choices: [
          '(借) 現金過不足 5,000 / (貸) 雑益 5,000',
          '(借) 雑損 5,000 / (貸) 現金過不足 5,000',
          '(借) 現金過不足 5,000 / (貸) 受取家賃 5,000'
        ],
        correct: 0,
        explanation: {
          concept: '原因不明の現金過不足（貸方残高）を雑益へ',
          brilliantExplanation: '現金過不足の貸方残高（受領超過）<strong>5,000円</strong>は、決算時に <strong>雑益 5,000円</strong>（収益）へ振り替えて勘定をゼロにします。'
        }
      },
      {
        text: '【一括仕訳】上記の処理をまとめた正しい決算整理仕訳は？',
        choices: [
          '(借) 現金過不足 22,000 , 発送費 8,000 / (貸) 受取家賃 25,000 , 雑益 5,000',
          '(借) 発送費 8,000 , 雑益 5,000 / (貸) 現金過不足 13,000',
          '(借) 現金過不足 22,000 / (貸) 受取家賃 22,000'
        ],
        correct: 0,
        explanation: {
          concept: '決算整理仕訳の一括表示',
          brilliantExplanation: '<strong>現金過不足 22,000円</strong>を借方で精算し、<strong>発送費 8,000円（借方）</strong>・<strong>受取家賃 25,000円（貸方）</strong>・差額の <strong>雑益 5,000円（貸方）</strong>を計上します。'
        }
      },
      {
        text: '【試算表・発送費】決算整理前の発送費残高は 120,000円。決算整理後残高試算表の発送費は？',
        choices: [
          '借方残高 128,000円',
          '借方残高 120,000円',
          '貸方残高 128,000円'
        ],
        correct: 0,
        explanation: {
          concept: '発送費の増加',
          brilliantExplanation: '未記帳分 8,000円を加算：120,000 + 8,000 = <strong>128,000円（借方残高）</strong>。'
        }
      },
      {
        text: '【試算表・受取家賃】決算整理前の受取家賃残高は 65,000円。決算整理後残高試算表の受取家賃は？',
        choices: [
          '貸方残高 90,000円',
          '貸方残高 65,000円',
          '借方残高 90,000円'
        ],
        correct: 0,
        explanation: {
          concept: '受取家賃の増加',
          brilliantExplanation: '未記帳分 25,000円を加算：65,000 + 25,000 = <strong>90,000円（貸方残高）</strong>。'
        }
      },
      {
        text: '【試算表・雑益】決算整理後残高試算表に表示される雑益の金額は？',
        choices: [
          '貸方残高 5,000円',
          '貸方残高 22,000円',
          '借方残高 5,000円'
        ],
        correct: 0,
        explanation: {
          concept: '雑益の計上',
          brilliantExplanation: '原因不明の現金過不足（貸方残高 5,000円）は <strong>雑益（収益）</strong>として貸方残高になります。'
        }
      },
      {
        text: '【不足の計上】月末に現金の帳簿残高と手元実有額を照合したところ、手元実有額が 6,000円不足していた。正しい仕訳は？',
        choices: [
          '(借) 現金過不足 6,000 / (貸) 現金 6,000',
          '(借) 現金 6,000 / (貸) 現金過不足 6,000',
          '(借) 雑損 6,000 / (貸) 現金 6,000'
        ],
        correct: 0,
        explanation: {
          concept: '期中の現金不足を現金過不足で処理',
          brilliantExplanation: '実有額が帳簿より少ないため、<strong>現金 6,000円（貸方）</strong>を減らし、相手科目は <strong>現金過不足 6,000円（借方）</strong>とします。'
        }
      },
      {
        text: '【原因判明・費用】決算にあたり、現金過不足の借方残高 6,000円のうち 3,500円は旅費交通費の支払いが未記帳だった。正しい仕訳は？',
        choices: [
          '(借) 旅費交通費 3,500 / (貸) 現金過不足 3,500',
          '(借) 現金過不足 3,500 / (貸) 旅費交通費 3,500',
          '(借) 旅費交通費 3,500 / (貸) 現金 3,500'
        ],
        correct: 0,
        explanation: {
          concept: '費用の未記帳（借方残高を減らす）',
          brilliantExplanation: '未記帳の <strong>旅費交通費 3,500円（費用）</strong>を借方に計上し、現金過不足（借方残高）を <strong>3,500円（貸方）</strong>に減らします。'
        }
      },
      {
        text: '【残額の処理】残りの現金過不足 2,500円は原因が特定できなかった。正しい仕訳は？',
        choices: [
          '(借) 雑損 2,500 / (貸) 現金過不足 2,500',
          '(借) 現金過不足 2,500 / (貸) 雑益 2,500',
          '(借) 雑損 2,500 / (貸) 現金 2,500'
        ],
        correct: 0,
        explanation: {
          concept: '原因不明の現金過不足（借方残高）を雑損へ',
          brilliantExplanation: '現金過不足の借方残高（不足）<strong>2,500円</strong>は、決算時に <strong>雑損 2,500円</strong>（損失）へ振り替えて勘定をゼロにします。'
        }
      },
      {
        text: '【一括仕訳】上記の処理をまとめた正しい決算整理仕訳は？',
        choices: [
          '(借) 旅費交通費 3,500 , 雑損 2,500 / (貸) 現金過不足 6,000',
          '(借) 現金過不足 6,000 / (貸) 旅費交通費 3,500 , 雑益 2,500',
          '(借) 旅費交通費 6,000 / (貸) 現金過不足 6,000'
        ],
        correct: 0,
        explanation: {
          concept: '決算整理仕訳の一括表示',
          brilliantExplanation: '<strong>現金過不足 6,000円（貸方）</strong>を精算し、<strong>旅費交通費 3,500円（借方）</strong>・原因不明の <strong>雑損 2,500円（借方）</strong>を計上します。'
        }
      },
      {
        text: '【類似・一括仕訳】決算整理前残高試算表で現金過不足の借方残高 12,000円。このうち 4,500円は支払手数料の未記帳、残額は原因不明。正しい決算整理仕訳は？',
        choices: [
          '(借) 支払手数料 4,500 , 雑損 7,500 / (貸) 現金過不足 12,000',
          '(借) 現金過不足 12,000 / (貸) 支払手数料 4,500 , 雑益 7,500',
          '(借) 支払手数料 12,000 / (貸) 現金過不足 12,000'
        ],
        correct: 0,
        explanation: {
          concept: '費用の未記帳と雑損の一括処理',
          brilliantExplanation: '未記帳の <strong>支払手数料 4,500円</strong>と原因不明の <strong>雑損 7,500円</strong>（12,000 − 4,500）を借方に、<strong>現金過不足 12,000円</strong>を貸方に計上します。'
        }
      },
      {
        text: '【試算表・支払手数料】決算整理前残高試算表で現金 450,000円、支払手数料 30,000円、現金過不足（借方残高）12,000円。上記の処理後、決算整理後残高試算表の支払手数料は？',
        choices: [
          '借方残高 34,500円',
          '借方残高 30,000円',
          '貸方残高 34,500円'
        ],
        correct: 0,
        explanation: {
          concept: '支払手数料の増加',
          brilliantExplanation: '未記帳分 4,500円を加算：30,000 + 4,500 = <strong>34,500円（借方残高）</strong>。現金 450,000円は変動なし。'
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
      },
      {
        text: '期首商品棚卸高が 200円、当期商品仕入高が 1,800円、期末商品棚卸高が 300円のとき、売上原価を計算するための仕訳を示しなさい。なお、売上原価は仕入勘定で計算する。',
        choices: [
          '(借) 仕入 200 / (貸) 繰越商品 200 , および (借) 繰越商品 300 / (貸) 仕入 300',
          '(借) 繰越商品 200 / (貸) 仕入 200 , および (借) 仕入 300 / (貸) 繰越商品 300'
        ],
        correct: 0,
        explanation: {
          concept: '売上原価の計算（仕入勘定）',
          brilliantExplanation: '「し・くり・くり・し」の手順で、(借) 仕入 200 / (貸) 繰越商品 200（期首）、(借) 繰越商品 300 / (貸) 仕入 300（期末）と仕訳します。売上原価は1,700円（200+1,800-300）です。'
        }
      },
      {
        text: '期首商品棚卸高が 200円、当期商品仕入高が 1,800円、期末商品棚卸高が 300円のとき、売上原価を計算するための仕訳を示しなさい。なお、売上原価は売上原価勘定で計算する。',
        choices: [
          '(借) 売上原価 1,700 / (貸) 仕入 1,700',
          '(借) 売上原価 2,300 / (貸) 繰越商品 200 , 仕入 1,800 , および (借) 繰越商品 300 / (貸) 売上原価 300'
        ],
        correct: 0,
        explanation: {
          concept: '売上原価の計算（売上原価勘定）',
          brilliantExplanation: '売上原価勘定で計算する場合：(1)期首商品 200円と当期仕入 1,800円を売上原価へ振替（借)売上原価2,000/(貸)繰越商品200,仕入1,800）、(2)期末商品300円を売上原価から控除（借)繰越商品300/(貸)売上原価300）。売上原価1,700円となります。'
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
      },
      {
        text: '決算につき、売上 2,000円、仕入（売上原価）1,200円、営業費 300円を損益勘定に振り替えた。',
        choices: [
          '(借) 売上 2,000 , 損益 1,500 / (貸) 損益 2,000 , 仕入 1,200 , 営業費 300',
          '(借) 損益 3,500 / (貸) 売上 2,000 , 仕入 1,200 , 営業費 300'
        ],
        correct: 0,
        explanation: {
          concept: '損益勘定への振替（英式決算法）',
          brilliantExplanation: '収益（売上2,000円）は借方に振り替えて損益の貸方へ、費用（仕入1,200円・営業費300円）は貸方に振り替えて損益の借方へ集約します。'
        }
      },
      {
        text: '当期純利益 500円の振り替えを行う。',
        choices: [
          '(借) 損益 500 / (貸) 繰越利益剰余金 500',
          '(借) 繰越利益剰余金 500 / (貸) 損益 500'
        ],
        correct: 0,
        explanation: {
          concept: '当期純利益の振替',
          brilliantExplanation: '損益勘定の貸方残高（利益）をゼロにするため、借方に損益を記録し、繰越利益剰余金（純資産）を貸方に計上します。'
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
