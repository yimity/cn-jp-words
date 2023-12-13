import { Component } from '@angular/core';
import { read, utils, writeFile, writeFileXLSX } from 'xlsx';
import { RowKey, Word, WordType } from '../../service/search/search.service';
import { NgForOf } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NsAutoHeightTableDirective } from '../../directive/ns-auto-height-table.directive';

const WordTypeMap = {
  词义扩大: 1 as WordType,
  词义缩小: 2 as WordType,
  词义转移: 3 as WordType,
};

type WordTypeKey = keyof typeof WordTypeMap;

@Component({
  selector: 'app-excel',
  standalone: true,
  imports: [NgForOf, NzDividerModule, NzTableModule, NzUploadModule, NzButtonModule, NzIconModule, NsAutoHeightTableDirective],
  templateUrl: './excel.component.html',
  styleUrl: './excel.component.scss',
})
export class ExcelComponent {
  words: Word[] = [
    {
      "type": 3,
      "japanese": "愛人",
      "hiragana": "あいじん ",
      "meanOfChinese": "情人",
      "chinese": "爱人",
      "phonetic": "àiren",
      "chineseMeaning": "中国語の‘爱人àiren’は男女を問わず「正規の配偶者」を指す."
    },
    {
      "type": 3,
      "japanese": "案",
      "hiragana": "あん ",
      "meanOfChinese": "方案",
      "chinese": "案",
      "phonetic": "àn",
      "chineseMeaning": "中国語の‘案àn’は「事件」あるいは「公文書」を指す.▸ 殺人事件 命案 mìng'àn "
    },
    {
      "type": 3,
      "japanese": "案件",
      "hiragana": "あんけん ",
      "meanOfChinese": "议案",
      "chinese": "案件",
      "phonetic": "ànjiàn",
      "chineseMeaning": "中国語の‘案件ànjiàn’は「訴訟事件」を指す."
    },
    {
      "type": 3,
      "japanese": "暗算",
      "hiragana": "あんざん ",
      "meanOfChinese": "心算",
      "chinese": "暗算",
      "phonetic": "ànsuàn",
      "chineseMeaning": "中国語の‘暗算ànsuàn’は「人を陥れようとたくらむ」の意."
    },
    {
      "type": 3,
      "japanese": "拝見",
      "hiragana": "はいけん ",
      "meanOfChinese": "看",
      "chinese": "拜见",
      "phonetic": "bàijiàn",
      "chineseMeaning": "中国語の‘拜见bàijiàn’は「お目にかかる」という意味の丁寧語."
    },
    {
      "type": 3,
      "japanese": "白酒",
      "hiragana": "しろざけ ",
      "meanOfChinese": "白甜酒",
      "chinese": "白酒",
      "phonetic": "báijiǔ",
      "chineseMeaning": "中国語の‘白酒báijiǔ’は‘茅台酒máotáijiǔ’など無色透明の蒸留酒をいう."
    },
    {
      "type": 3,
      "japanese": "頒布",
      "hiragana": "はんぷ ",
      "meanOfChinese": "分发",
      "chinese": "颁布",
      "phonetic": "bānbù",
      "chineseMeaning": "中国語の‘颁布bānbù’は「公布する」ことを指す."
    },
    {
      "type": 3,
      "japanese": "暴発",
      "hiragana": "ぼうはつ ",
      "meanOfChinese": "走火",
      "chinese": "暴发",
      "phonetic": "bàofā",
      "chineseMeaning": "中国語の‘暴发bàofā’は「成り上がる」こと."
    },
    {
      "type": 3,
      "japanese": "覇気",
      "hiragana": "はき ",
      "meanOfChinese": "雄心",
      "chinese": "霸气",
      "phonetic": "bàqì",
      "chineseMeaning": "中国語の‘霸气bàqì’は「傍若無人な態度」を指す."
    },
    {
      "type": 3,
      "japanese": "把握",
      "hiragana": "はあく ",
      "meanOfChinese": "掌握",
      "chinese": "把握",
      "phonetic": "bǎwò",
      "chineseMeaning": "中国語の‘把握bǎwò’は「握る」「（機会などを）つかむ」, また「自信」「見込み」という意味である."
    },
    {
      "type": 3,
      "japanese": "卑下",
      "hiragana": "ひげ ",
      "meanOfChinese": "自卑",
      "chinese": "卑下",
      "phonetic": "bēixià",
      "chineseMeaning": "中国語の‘卑下bēixià’は「下品である」こと, 「地位が低い」ことをいう."
    },
    {
      "type": 3,
      "japanese": "本",
      "hiragana": "ほん ",
      "meanOfChinese": "书",
      "chinese": "本",
      "phonetic": "běn",
      "chineseMeaning": "中国語では‘本běn’は本を数える「1冊, 2冊」の単位を表し, 本そのものは‘书（書）shū’で表す."
    },
    {
      "type": 3,
      "japanese": "本職",
      "hiragana": "ほんしょく ",
      "meanOfChinese": "本行",
      "chinese": "本职",
      "phonetic": "běnzhí",
      "chineseMeaning": "中国語の‘本职běnzhí’は「自分の仕事」のこと."
    },
    {
      "type": 3,
      "japanese": "閉口",
      "hiragana": "へいこう ",
      "meanOfChinese": "为难",
      "chinese": "闭口",
      "phonetic": "bìkǒu",
      "chineseMeaning": "中国語の‘闭口bìkǒu’は「口をつぐむ」こと."
    },
    {
      "type": 3,
      "japanese": "餅",
      "hiragana": "もち ",
      "meanOfChinese": "糍粑",
      "chinese": "饼",
      "phonetic": "bǐng",
      "chineseMeaning": "中国語の‘饼bǐng’は小麦粉をのばして焼くか蒸した食物のことである.▸ かぼちゃ入りのピン 南瓜饼 nánguābǐng ▸ 月餅 月饼 yuèbǐng ▸ シャオピン 烧饼 shāobǐng "
    },
    {
      "type": 3,
      "japanese": "逼迫",
      "hiragana": "ひっぱく ",
      "meanOfChinese": "紧迫",
      "chinese": "逼迫",
      "phonetic": "bīpò",
      "chineseMeaning": "中国語の‘逼迫bīpò’は「無理強いする」こと."
    },
    {
      "type": 3,
      "japanese": "筆頭",
      "hiragana": "ひっとう ",
      "meanOfChinese": "首位",
      "chinese": "笔头",
      "phonetic": "bǐtóu",
      "chineseMeaning": "中国語の‘笔头bǐtóu’は「ペン先」のこと."
    },
    {
      "type": 3,
      "japanese": "部",
      "hiragana": "ぶ ",
      "meanOfChinese": "部门",
      "chinese": "部",
      "phonetic": "bù",
      "chineseMeaning": "中国語の‘部bù’は中央の行政機関であれば日本の「省」に相当する."
    },
    {
      "type": 3,
      "japanese": "不覚",
      "hiragana": "ふかく ",
      "meanOfChinese": "过失",
      "chinese": "不觉",
      "phonetic": "bùjué",
      "chineseMeaning": "中国語の‘不觉bùjué’は「思わず」という意味."
    },
    {
      "type": 3,
      "japanese": "部署",
      "hiragana": "ぶしょ ",
      "meanOfChinese": "工作岗位",
      "chinese": "部署",
      "phonetic": "bùshǔ",
      "chineseMeaning": "中国語の‘部署bùshǔ’は「人員などを計画的に配置する」こと."
    },
    {
      "type": 3,
      "japanese": "部長",
      "hiragana": "ぶちょう ",
      "meanOfChinese": "处长",
      "chinese": "部长",
      "phonetic": "bùzhǎng",
      "chineseMeaning": "中国語で中央の‘部长bùzhǎng’は「大臣」や「長官」のこと."
    },
    {
      "type": 3,
      "japanese": "裁縫",
      "hiragana": "さいほう ",
      "meanOfChinese": "缝纫",
      "chinese": "裁缝",
      "phonetic": "cáifeng",
      "chineseMeaning": "中国語の‘裁缝’は‘cáifeng’と読むと「仕立て屋」のこと."
    },
    {
      "type": 3,
      "japanese": "裁判",
      "hiragana": "さいばん ",
      "meanOfChinese": "审判",
      "chinese": "裁判",
      "phonetic": "cáipàn",
      "chineseMeaning": "中国語の‘裁判cáipàn’はスポーツの「審判」のこと."
    },
    {
      "type": 3,
      "japanese": "差別",
      "hiragana": "さべつ ",
      "meanOfChinese": "歧视",
      "chinese": "差别",
      "phonetic": "chābié",
      "chineseMeaning": "中国語の‘差别chābié’は主に「ちがい」を表す語で, 見下す意味では‘歧视qíshì’などがよく使われる."
    },
    {
      "type": 3,
      "japanese": "抄本",
      "hiragana": "しょうほん ",
      "meanOfChinese": "摘录本",
      "chinese": "抄本",
      "phonetic": "chāoběn",
      "chineseMeaning": "中国語の‘抄本chāoběn’は「写本」のこと."
    },
    {
      "type": 3,
      "japanese": "茶碗",
      "hiragana": "ちゃわん ",
      "meanOfChinese": "饭碗",
      "chinese": "茶碗",
      "phonetic": "cháwǎn",
      "chineseMeaning": "中国語の‘茶碗cháwǎn’は「湯呑」のこと."
    },
    {
      "type": 3,
      "japanese": "査証",
      "hiragana": "さしょう ",
      "meanOfChinese": "签证",
      "chinese": "查证",
      "phonetic": "cházhèng",
      "chineseMeaning": "中国語の‘查证cházhèng’は「調べて証明する」という意味の動詞である."
    },
    {
      "type": 3,
      "japanese": "城",
      "hiragana": "しろ ",
      "meanOfChinese": "城堡",
      "chinese": "城",
      "phonetic": "chéng",
      "chineseMeaning": "中国語の‘城chéng’は「都市」や「市街地」を指す."
    },
    {
      "type": 3,
      "japanese": "重重",
      "hiragana": "じゅうじゅう ",
      "meanOfChinese": "深深",
      "chinese": "重重",
      "phonetic": "chóngchóng",
      "chineseMeaning": "中国語の‘重重chóngchóng’は「幾重にも重なっている」ことをいう. なお中国語で「々」は用いない.▸ 問題が山積みである 问题重重 wèntí chóngchóng "
    },
    {
      "type": 3,
      "japanese": "床",
      "hiragana": "とこ ",
      "meanOfChinese": "床铺",
      "chinese": "床",
      "phonetic": "chuáng",
      "chineseMeaning": "中国語の‘床chuáng’は「ベッド」という意味."
    },
    {
      "type": 3,
      "japanese": "床",
      "hiragana": "ゆか ",
      "meanOfChinese": "地板",
      "chinese": "床",
      "phonetic": "chuáng",
      "chineseMeaning": "中国語の‘床chuáng’は「ベッド」のこと."
    },
    {
      "type": 3,
      "japanese": "喘息",
      "hiragana": "ぜんそく ",
      "meanOfChinese": "气喘",
      "chinese": "喘息",
      "phonetic": "chuǎnxī",
      "chineseMeaning": "中国語の‘喘息chuǎnxī’は「息を切らす」ことを指す."
    },
    {
      "type": 3,
      "japanese": "伝言",
      "hiragana": "でんごん ",
      "meanOfChinese": "口信儿",
      "chinese": "传言",
      "phonetic": "chuányán",
      "chineseMeaning": "中国語の‘传言chuányán’は「噂」「話を伝える」「言いふらす」という意味である."
    },
    {
      "type": 3,
      "japanese": "出産",
      "hiragana": "しゅっさん ",
      "meanOfChinese": "分娩",
      "chinese": "出产",
      "phonetic": "chūchǎn",
      "chineseMeaning": "中国語の‘出产chūchǎn’は「産出する」「生産する」ことを指す."
    },
    {
      "type": 3,
      "japanese": "出品",
      "hiragana": "しゅっぴん ",
      "meanOfChinese": "展出作品",
      "chinese": "出品",
      "phonetic": "chūpǐn",
      "chineseMeaning": "中国語の‘出品chūpǐn’は「製品」を指す."
    },
    {
      "type": 3,
      "japanese": "出世",
      "hiragana": "しゅっせ ",
      "meanOfChinese": "成功",
      "chinese": "出世",
      "phonetic": "chūshì",
      "chineseMeaning": "中国語の‘出世chūshì’は「生まれ出る」ことをいう."
    },
    {
      "type": 3,
      "japanese": "出頭",
      "hiragana": "しゅっとう ",
      "meanOfChinese": "到某机关去",
      "chinese": "出头",
      "phonetic": "chūtóu",
      "chineseMeaning": "中国語の‘出头chūtóu’は「困難を脱する」ことを指す."
    },
    {
      "type": 3,
      "japanese": "出走",
      "hiragana": "しゅっそう ",
      "meanOfChinese": "参赛",
      "chinese": "出走",
      "phonetic": "chūzǒu",
      "chineseMeaning": "中国語の‘出走chūzǒu’は「家出する」ことである."
    },
    {
      "type": 3,
      "japanese": "粗大",
      "hiragana": "そだい ",
      "meanOfChinese": "笨重",
      "chinese": "粗大",
      "phonetic": "cūdà",
      "chineseMeaning": "中国語の‘粗大cūdà’は「太く大きい」ことを指す."
    },
    {
      "type": 3,
      "japanese": "粗略",
      "hiragana": "そりゃく ",
      "meanOfChinese": "疏忽",
      "chinese": "粗略",
      "phonetic": "cūlüè",
      "chineseMeaning": "中国語の‘粗略cūlüè’は「おおざっぱに」という意味である."
    },
    {
      "type": 3,
      "japanese": "大変",
      "hiragana": "たいへん ",
      "meanOfChinese": "不得了",
      "chinese": "大变",
      "phonetic": "dàbiàn",
      "chineseMeaning": "中国語の‘大变dàbiàn’は「大いに変わる」ことをいう."
    },
    {
      "type": 3,
      "japanese": "怠慢",
      "hiragana": "たいまん ",
      "meanOfChinese": "懈怠",
      "chinese": "怠慢",
      "phonetic": "dàimàn",
      "chineseMeaning": "中国語の‘怠慢dàimàn’は「そっけなくする」, もてなしが「行き届かない」という意味である."
    },
    {
      "type": 3,
      "japanese": "大家",
      "hiragana": "おおや ",
      "meanOfChinese": "房东",
      "chinese": "大家",
      "phonetic": "dàjiā",
      "chineseMeaning": "中国語では家主としての大家は‘房东fángdōng’という. 中国語で‘大家dàjiā’というと「全員」あるいは「大家たいか」という意味になる."
    },
    {
      "type": 3,
      "japanese": "大名",
      "hiragana": "だいみょう ",
      "meanOfChinese": "诸侯",
      "chinese": "大名",
      "phonetic": "dàmíng",
      "chineseMeaning": "中国語の‘大名dàmíng’は「御高名」という意味の尊敬語."
    },
    {
      "type": 3,
      "japanese": "大男",
      "hiragana": "おおおとこ ",
      "meanOfChinese": "大汉",
      "chinese": "大男",
      "phonetic": "dànán",
      "chineseMeaning": "中国語の‘大男dànán’は‘大女’と対で‘大男大女dànán dànǚ’となると「結婚適齢期を過ぎた男女」のことを表す."
    },
    {
      "type": 3,
      "japanese": "単車",
      "hiragana": "たんしゃ ",
      "meanOfChinese": "摩托车",
      "chinese": "单车",
      "phonetic": "dānchē",
      "chineseMeaning": "中国語の‘单车dānchē’は自動車・バスなど「単独で運行する車両」や「自転車」の意."
    },
    {
      "type": 3,
      "japanese": "当面",
      "hiragana": "とうめん ",
      "meanOfChinese": "当前",
      "chinese": "当面",
      "phonetic": "dāngmiàn",
      "chineseMeaning": "中国語の‘当面dāngmiàn’は「面と向かって」という意味."
    },
    {
      "type": 3,
      "japanese": "到底",
      "hiragana": "とうてい ",
      "meanOfChinese": "怎么也",
      "chinese": "到底",
      "phonetic": "dàodǐ",
      "chineseMeaning": "中国語の‘到底dàodǐ’には「最後までやる」という動詞の意味と, 「結局のところ」「いったい」などの副詞の意味がある."
    },
    {
      "type": 3,
      "japanese": "大手",
      "hiragana": "おおで ",
      "meanOfChinese": "(with) open arms",
      "chinese": "大手",
      "phonetic": "dàshǒu",
      "chineseMeaning": "中国語の‘大手dàshǒu’は‘大手大脚dàshǒu dàjiǎo’の形で「金遣いが荒い」ことを意味する."
    },
    {
      "type": 3,
      "japanese": "打算",
      "hiragana": "ださん ",
      "meanOfChinese": "盘算",
      "chinese": "打算",
      "phonetic": "dǎsuan",
      "chineseMeaning": "中国語の‘打算dǎsuan’は「考え」「思案」「…するつもりだ」という意味."
    },
    {
      "type": 3,
      "japanese": "大意",
      "hiragana": "たいい ",
      "meanOfChinese": "大意",
      "chinese": "大意",
      "phonetic": "dàyi",
      "chineseMeaning": "中国語の‘大意’は‘dàyi’と読めば「不注意である」ことをいう."
    },
    {
      "type": 3,
      "japanese": "大丈夫",
      "hiragana": "だいじょうぶ ",
      "meanOfChinese": "不要紧",
      "chinese": "大丈夫",
      "phonetic": "dàzhàngfu",
      "chineseMeaning": "中国語の‘大丈夫dàzhàngfu’は「一人前の男」を表す."
    },
    {
      "type": 3,
      "japanese": "登場",
      "hiragana": "とうじょう ",
      "meanOfChinese": "登台",
      "chinese": "登场",
      "phonetic": "dēngcháng",
      "chineseMeaning": "中国語の‘登场’は‘dēngcháng’と読めば収穫した穀物を「脱穀場へ運ぶ」ことを指す."
    },
    {
      "type": 3,
      "japanese": "得手",
      "hiragana": "えて ",
      "meanOfChinese": "拿手",
      "chinese": "得手",
      "phonetic": "déshǒu",
      "chineseMeaning": "中国語の‘得手déshǒu’は「順調に運ぶ」という意味である."
    },
    {
      "type": 3,
      "japanese": "得体",
      "hiragana": "えたい ",
      "meanOfChinese": "来路、本质",
      "chinese": "得体",
      "phonetic": "détǐ",
      "chineseMeaning": "中国語の‘得体détǐ’は言葉や行動が「適切である」ことをいう."
    },
    {
      "type": 3,
      "japanese": "調度",
      "hiragana": "ちょうど ",
      "meanOfChinese": "陈设",
      "chinese": "调度",
      "phonetic": "diàodù",
      "chineseMeaning": "中国語の‘调度diàodù’は「管理調整」することを指す."
    },
    {
      "type": 3,
      "japanese": "地道",
      "hiragana": "じみち ",
      "meanOfChinese": "踏实",
      "chinese": "地道",
      "phonetic": "dìdao",
      "chineseMeaning": "中国語の‘地道dìdao’は「本場の」という意味である."
    },
    {
      "type": 3,
      "japanese": "低調",
      "hiragana": "ていちょう ",
      "meanOfChinese": "萧条",
      "chinese": "低调",
      "phonetic": "dīdiào",
      "chineseMeaning": "中国語の‘低调dīdiào’は「控えめである」ことを表す."
    },
    {
      "type": 3,
      "japanese": "地方",
      "hiragana": "ちほう ",
      "meanOfChinese": "地域",
      "chinese": "地方",
      "phonetic": "dìfang",
      "chineseMeaning": "中国語の‘地方’は‘dìfang’と発音すれば「場所」「部分」という意味である."
    },
    {
      "type": 3,
      "japanese": "丁寧",
      "hiragana": "ていねい ",
      "meanOfChinese": "礼貌",
      "chinese": "丁宁",
      "phonetic": "dīngníng",
      "chineseMeaning": "中国語の‘丁宁dīngníng’は「繰り返し言い聞かせる」ことである."
    },
    {
      "type": 3,
      "japanese": "的確",
      "hiragana": "てきかく ",
      "meanOfChinese": "准确",
      "chinese": "的确",
      "phonetic": "díquè",
      "chineseMeaning": "中国語の‘的确díquè’は「確かに, 間違いなく」という副詞."
    },
    {
      "type": 3,
      "japanese": "低下",
      "hiragana": "ていか ",
      "meanOfChinese": "降低",
      "chinese": "低下",
      "phonetic": "dīxià",
      "chineseMeaning": "中国語の‘低下dīxià’は「レベルが低い」という意味."
    },
    {
      "type": 3,
      "japanese": "東洋",
      "hiragana": "とうよう ",
      "meanOfChinese": "东方",
      "chinese": "东洋",
      "phonetic": "Dōngyáng",
      "chineseMeaning": "中国語の‘东洋Dōngyáng’は「日本」のこと. 特に清末から民国初の時代にそう呼んだ."
    },
    {
      "type": 3,
      "japanese": "多少",
      "hiragana": "たしょう ",
      "meanOfChinese": "（1）数量多少（2）有一点",
      "chinese": "多少",
      "phonetic": "duōshao",
      "chineseMeaning": "中国語の‘多少’は‘duōshao’と発音すれば数量を問う疑問詞となる."
    },
    {
      "type": 3,
      "japanese": "多事",
      "hiragana": "たじ ",
      "meanOfChinese": "事情多",
      "chinese": "多事",
      "phonetic": "duōshì",
      "chineseMeaning": "中国語の‘多事duōshì’は口語では「余計なことをする」の意."
    },
    {
      "type": 3,
      "japanese": "発覚",
      "hiragana": "はっかく ",
      "meanOfChinese": "暴露",
      "chinese": "发觉",
      "phonetic": "fājué",
      "chineseMeaning": "中国語の‘发觉fājué’は「気づく」ことを指す."
    },
    {
      "type": 3,
      "japanese": "一番",
      "hiragana": "いちばん ",
      "meanOfChinese": "最",
      "chinese": "一番",
      "phonetic": "yīfān",
      "chineseMeaning": "中国語の‘番fān’は量詞で, 時間のかかる動作や味わい・心境・言葉などを数える. 付きうる数字は‘一’だけなので‘一番’という形になる."
    },
    {
      "type": 3,
      "japanese": "翻案",
      "hiragana": "ほんあん ",
      "meanOfChinese": "改编",
      "chinese": "翻案",
      "phonetic": "fān'àn",
      "chineseMeaning": "中国語の‘翻案fān'àn’は判決や評価などを「覆す」こと."
    },
    {
      "type": 3,
      "japanese": "方便",
      "hiragana": "ほうべん ",
      "meanOfChinese": "权宜之计",
      "chinese": "方便",
      "phonetic": "fāngbiàn",
      "chineseMeaning": "中国語の‘方便fāngbiàn’は「便利である」こと."
    },
    {
      "type": 3,
      "japanese": "放浪",
      "hiragana": "ほうろう ",
      "meanOfChinese": "流浪",
      "chinese": "放浪",
      "phonetic": "fànglàng",
      "chineseMeaning": "中国語の‘放浪fànglàng’は「勝手気ままな」「世俗にとらわれない」という意味."
    },
    {
      "type": 3,
      "japanese": "放心",
      "hiragana": "ほうしん ",
      "meanOfChinese": "精神恍惚",
      "chinese": "放心",
      "phonetic": "fàngxīn",
      "chineseMeaning": "中国語の‘放心fàngxīn’は「安心する」こと."
    },
    {
      "type": 3,
      "japanese": "放映",
      "hiragana": "ほうえい ",
      "meanOfChinese": "播送",
      "chinese": "放映",
      "phonetic": "fàngyìng",
      "chineseMeaning": "中国語の‘放映fàngyìng’は「上映する」こと."
    },
    {
      "type": 3,
      "japanese": "飯盒",
      "hiragana": "はんごう ",
      "meanOfChinese": "(野外用的)饭盒",
      "chinese": "饭盒",
      "phonetic": "fànhé",
      "chineseMeaning": "中国語の‘饭盒fànhé’は通常「弁当箱」を指す."
    },
    {
      "type": 3,
      "japanese": "風潮",
      "hiragana": "ふうちょう ",
      "meanOfChinese": "风气",
      "chinese": "风潮",
      "phonetic": "fēngcháo",
      "chineseMeaning": "中国語の‘风潮fēngcháo’は「騒動」のこと."
    },
    {
      "type": 3,
      "japanese": "分派",
      "hiragana": "ぶんぱ ",
      "meanOfChinese": "帮派",
      "chinese": "分派",
      "phonetic": "fēnpài",
      "chineseMeaning": "中国語の‘分派fēnpài’は「配属する」こと, 「割り当てる」こと."
    },
    {
      "type": 3,
      "japanese": "分岐",
      "hiragana": "ぶんき ",
      "meanOfChinese": "分岔",
      "chinese": "分歧",
      "phonetic": "fēnqí",
      "chineseMeaning": "中国語の‘分歧fēnqí’は意見や記載などの「不一致」を指す."
    },
    {
      "type": 3,
      "japanese": "分身",
      "hiragana": "ぶんしん ",
      "meanOfChinese": "化身",
      "chinese": "分身",
      "phonetic": "fēnshēn",
      "chineseMeaning": "中国語の‘分身fēnshēn’は「仕事から手を離す」こと."
    },
    {
      "type": 3,
      "japanese": "夫",
      "hiragana": "おっと ",
      "meanOfChinese": "男人、丈夫",
      "chinese": "夫",
      "phonetic": "fu",
      "chineseMeaning": "中国語では夫を指して‘丈夫zhàngfu’という. 従って中国語の‘丈夫’は日本語の「丈夫だ」という意味はない. 最近の中国では, 夫を指すのに建国前に使われていた‘先生xiānsheng’が復活し, こちらもよく使われる."
    },
    {
      "type": 3,
      "japanese": "敷衍",
      "hiragana": "ふえん ",
      "meanOfChinese": "细说",
      "chinese": "敷衍",
      "phonetic": "fūyan",
      "chineseMeaning": "中国語の‘敷衍’は‘fūyan’と軽声に読めば「ごまかす」「いい加減にやる」ことを指す."
    },
    {
      "type": 3,
      "japanese": "該当",
      "hiragana": "がいとう ",
      "meanOfChinese": "符合",
      "chinese": "该当",
      "phonetic": "gāidāng",
      "chineseMeaning": "中国語の‘该当gāidāng’は助動詞で「…すべきだ」という意味."
    },
    {
      "type": 3,
      "japanese": "改行",
      "hiragana": "かいぎょう ",
      "meanOfChinese": "提行",
      "chinese": "改行",
      "phonetic": "gǎiháng",
      "chineseMeaning": "中国語の‘改行gǎiháng’は「職業を変える」ことをいう."
    },
    {
      "type": 3,
      "japanese": "告白",
      "hiragana": "こくはく ",
      "meanOfChinese": "交代",
      "chinese": "告白",
      "phonetic": "gàobái",
      "chineseMeaning": "中国語の‘告白gàobái’は「声明する, 説明する」ことを指す."
    },
    {
      "type": 3,
      "japanese": "高等学校",
      "hiragana": "こうとうがっこう ",
      "meanOfChinese": "高中",
      "chinese": "高等学校",
      "phonetic": "gāoděng xuéxiào",
      "chineseMeaning": "中国語の‘高等学校gāoděng xuéxiào’は「高等教育機関」全般を指す."
    },
    {
      "type": 3,
      "japanese": "告訴",
      "hiragana": "こくそ ",
      "meanOfChinese": "打官司",
      "chinese": "告诉",
      "phonetic": "gàosu",
      "chineseMeaning": "中国語の‘告诉gàosu’は「言う」「告げる」という意味である."
    },
    {
      "type": 3,
      "japanese": "高校",
      "hiragana": "こうこう ",
      "meanOfChinese": "高中",
      "chinese": "高校",
      "phonetic": "gāoxiào",
      "chineseMeaning": "中国語の‘高校gāoxiào’は‘高等学校gāoděng xuéxiào’の略であり, ‘大学dàxué’など「高等教育機関」全般を指す."
    },
    {
      "type": 3,
      "japanese": "格式",
      "hiragana": "かくしき ",
      "meanOfChinese": "排场",
      "chinese": "格式",
      "phonetic": "géshì",
      "chineseMeaning": "中国語の‘格式géshì’は「文章の形式」を言う."
    },
    {
      "type": 3,
      "japanese": "工程",
      "hiragana": "こうてい ",
      "meanOfChinese": "工序",
      "chinese": "工程",
      "phonetic": "gōngchéng",
      "chineseMeaning": "中国語の‘工程gōngchéng’は「（大規模な）工事」および「プロジェクト」を意味する."
    },
    {
      "type": 3,
      "japanese": "工夫",
      "hiragana": "くふう ",
      "meanOfChinese": "设法",
      "chinese": "工夫",
      "phonetic": "gōngfu",
      "chineseMeaning": "中国語の‘工夫gōngfu’は「時間」を表す."
    },
    {
      "type": 3,
      "japanese": "工事",
      "hiragana": "こうじ ",
      "meanOfChinese": "工程",
      "chinese": "工事",
      "phonetic": "gōngshì",
      "chineseMeaning": "中国語の‘工事gōngshì’は軍事上の「防御施設」を指す."
    },
    {
      "type": 3,
      "japanese": "供養",
      "hiragana": "くよう ",
      "meanOfChinese": "供养",
      "chinese": "供养",
      "phonetic": "gōngyǎng",
      "chineseMeaning": "中国語の‘供养’は‘gōngyǎng’と読むと「扶養する」こと, ‘gòngyǎng’と読めば「供養する」ことを意味する."
    },
    {
      "type": 3,
      "japanese": "工作",
      "hiragana": "こうさく ",
      "meanOfChinese": "（1）制作 （2）行动",
      "chinese": "工作",
      "phonetic": "gōngzuò",
      "chineseMeaning": "中国語の‘工作gōngzuò’は広く「働くこと」「仕事」を指す. 日本語の「裏で活動すること」「図工」の意味はない."
    },
    {
      "type": 3,
      "japanese": "勾引",
      "hiragana": "こういん ",
      "meanOfChinese": "拘捕",
      "chinese": "勾引",
      "phonetic": "gōuyǐn",
      "chineseMeaning": "中国語の‘勾引gōuyǐn’は「異性を引きつける」の意."
    },
    {
      "type": 3,
      "japanese": "姑",
      "hiragana": "しゅうとめ ",
      "meanOfChinese": "婆婆、丈母娘",
      "chinese": "姑",
      "phonetic": "gū",
      "chineseMeaning": "中国語の‘姑gū’は‘姑姑’の形で「父の姉妹」を指す."
    },
    {
      "type": 3,
      "japanese": "怪我",
      "hiragana": "けが ",
      "meanOfChinese": "创伤",
      "chinese": "怪我",
      "phonetic": "guài wǒ",
      "chineseMeaning": "中国語の‘怪我guài wǒ’は「私をとがめる」「私のせいだ」の意味になる. ‘怪我一生guài wǒ yìshēng’とは「生涯私の非をとがめよ」の意."
    },
    {
      "type": 3,
      "japanese": "関門",
      "hiragana": "かんもん ",
      "meanOfChinese": "关口",
      "chinese": "关门",
      "phonetic": "guānmén",
      "chineseMeaning": "中国語の‘关门guānmén’は「ドアを閉める」こと, あるいは「閉館する」ことを言う."
    },
    {
      "type": 3,
      "japanese": "帰還",
      "hiragana": "きかん ",
      "meanOfChinese": "回归",
      "chinese": "归还",
      "phonetic": "guīhuán",
      "chineseMeaning": "中国語の‘归还guīhuán’は金銭やものを「持ち主に返還する」こと."
    },
    {
      "type": 3,
      "japanese": "国文",
      "hiragana": "こくぶん ",
      "meanOfChinese": "国文、日本语文",
      "chinese": "国文",
      "phonetic": "guówén",
      "chineseMeaning": "中国語の‘国文guówén’は「中国の文字・文章」を指す."
    },
    {
      "type": 3,
      "japanese": "国学",
      "hiragana": "こくがく ",
      "meanOfChinese": "the study of Japanese classical literature",
      "chinese": "国学",
      "phonetic": "guóxué",
      "chineseMeaning": "中国語の‘国学guóxué’は, 哲学や歴史学などを含む「中国の伝統的学問」や‘国子监guózǐjiàn’などの「旧時, 国が設立した学校」を指す."
    },
    {
      "type": 3,
      "japanese": "故事",
      "hiragana": "こじ ",
      "meanOfChinese": "典故",
      "chinese": "故事",
      "phonetic": "gùshi",
      "chineseMeaning": "中国語の‘故事gùshi’は「物語」の意味である."
    },
    {
      "type": 3,
      "japanese": "姑息",
      "hiragana": "こそく ",
      "meanOfChinese": "权宜",
      "chinese": "姑息",
      "phonetic": "gūxī",
      "chineseMeaning": "中国語の‘姑息gūxī’は「原則を曲げて大目に見る」ことを言う."
    },
    {
      "type": 3,
      "japanese": "合計",
      "hiragana": "ごうけい ",
      "meanOfChinese": "统共",
      "chinese": "合计",
      "phonetic": "héji",
      "chineseMeaning": "中国語の‘合计héji’は「思案する」を意味する. ‘héjì’と読めば「合計する」意味となる."
    },
    {
      "type": 3,
      "japanese": "横幅",
      "hiragana": "よこはば ",
      "meanOfChinese": "宽",
      "chinese": "横幅",
      "phonetic": "héngfú",
      "chineseMeaning": "中国語の‘横幅héngfú’は「横長の軸物」のこと."
    },
    {
      "type": 3,
      "japanese": "合算",
      "hiragana": "がっさん ",
      "meanOfChinese": "合计",
      "chinese": "合算",
      "phonetic": "hésuàn",
      "chineseMeaning": "中国語の‘合算hésuàn’は「割に合う」という意味である."
    },
    {
      "type": 3,
      "japanese": "合同",
      "hiragana": "ごうどう ",
      "meanOfChinese": "联合",
      "chinese": "合同",
      "phonetic": "hétong",
      "chineseMeaning": "中国語の‘合同hétong’は「契約」という意味である."
    },
    {
      "type": 3,
      "japanese": "合意",
      "hiragana": "ごうい ",
      "meanOfChinese": "同意",
      "chinese": "合意",
      "phonetic": "héyì",
      "chineseMeaning": "中国語の‘合意héyì’は「気に入る」ことをいう.▸ 性格が私の気に入った 性格合我的意 xìnggé hé wǒ de yì "
    },
    {
      "type": 3,
      "japanese": "合作",
      "hiragana": "がっさく ",
      "meanOfChinese": "联合制作",
      "chinese": "合作",
      "phonetic": "hézuò",
      "chineseMeaning": "中国語の‘合作hézuò’は「協力する」ことや「提携する」ことを言う."
    },
    {
      "type": 3,
      "japanese": "恍惚",
      "hiragana": "こうこつ ",
      "meanOfChinese": "ecstasy",
      "chinese": "恍惚",
      "phonetic": "huǎnghū",
      "chineseMeaning": "中国語の‘恍惚huǎnghū’は「意識が朦朧としている」ことを指す."
    },
    {
      "type": 3,
      "japanese": "環視",
      "hiragana": "かんし ",
      "meanOfChinese": "围观",
      "chinese": "环视",
      "phonetic": "huánshì",
      "chineseMeaning": "中国語の‘环视huánshì’は「回りを見まわす」こと."
    },
    {
      "type": 3,
      "japanese": "回転",
      "hiragana": "かいてん ",
      "meanOfChinese": "转",
      "chinese": "回转",
      "phonetic": "huízhuǎn",
      "chineseMeaning": "中国語の‘回转huízhuǎn’は「帰る」「向きを変える」「考えを改める」という意味である."
    },
    {
      "type": 3,
      "japanese": "戸口",
      "hiragana": "とぐち ",
      "meanOfChinese": "门口",
      "chinese": "户口",
      "phonetic": "hùkǒu",
      "chineseMeaning": "中国語の‘户口hùkǒu’は「戸籍」のこと."
    },
    {
      "type": 3,
      "japanese": "火気",
      "hiragana": "かき ",
      "meanOfChinese": "烟火",
      "chinese": "火气",
      "phonetic": "huǒqì",
      "chineseMeaning": "中国語の‘火气huǒqì’は「怒気」を意味する."
    },
    {
      "type": 3,
      "japanese": "糊塗",
      "hiragana": "こと ",
      "meanOfChinese": "敷衍",
      "chinese": "糊涂",
      "phonetic": "hútu",
      "chineseMeaning": "中国語の‘糊涂hútu’は「間抜けな, でたらめな」の意."
    },
    {
      "type": 3,
      "japanese": "餞別",
      "hiragana": "せんべつ ",
      "meanOfChinese": "临别礼物",
      "chinese": "饯别",
      "phonetic": "jiànbié",
      "chineseMeaning": "中国語の‘饯别jiànbié’は「壮行会を開く」という意味."
    },
    {
      "type": 3,
      "japanese": "煎餅",
      "hiragana": "せんべい ",
      "meanOfChinese": "酥脆薄片饼干",
      "chinese": "煎饼",
      "phonetic": "jiānbǐng",
      "chineseMeaning": "中国語の‘煎饼jiānbǐng’は小麦粉などを薄くのばして焼いた食品."
    },
    {
      "type": 3,
      "japanese": "見地",
      "hiragana": "けんち ",
      "meanOfChinese": "见解",
      "chinese": "见地",
      "phonetic": "jiàndì",
      "chineseMeaning": "中国語の‘见地jiàndì’は「見識」を意味する."
    },
    {
      "type": 3,
      "japanese": "講義",
      "hiragana": "こうぎ ",
      "meanOfChinese": "讲学",
      "chinese": "讲义",
      "phonetic": "jiǎngyì",
      "chineseMeaning": "中国語の‘讲义jiǎngyì’は「講義録」のことをいう."
    },
    {
      "type": 3,
      "japanese": "検挙",
      "hiragana": "けんきょ ",
      "meanOfChinese": "拘捕",
      "chinese": "检举",
      "phonetic": "jiǎnjǔ",
      "chineseMeaning": "中国語の‘检举jiǎnjǔ’は「犯罪を告発する」「密告する」という意味である."
    },
    {
      "type": 3,
      "japanese": "交差",
      "hiragana": "こうさ ",
      "meanOfChinese": "相交",
      "chinese": "交差",
      "phonetic": "jiāochāi",
      "chineseMeaning": "中国語の‘交差jiāochāi’は「報告・復命する」ことを指す."
    },
    {
      "type": 3,
      "japanese": "教頭",
      "hiragana": "きょうとう ",
      "meanOfChinese": "副校长",
      "chinese": "教頭",
      "phonetic": "jiàotóu",
      "chineseMeaning": "現代中国で「教頭」という職名はなく, 中国人にこの字面を見せると水滸傳の林冲を連想するであろう. 林冲は「林教頭」と呼ばれるが, それは「教頭」が兵隊に武術を教える昔の官名だったことによる."
    },
    {
      "type": 3,
      "japanese": "潔白",
      "hiragana": "けっぱく ",
      "meanOfChinese": "清白",
      "chinese": "洁白",
      "phonetic": "jiébái",
      "chineseMeaning": "中国語の‘洁白jiébái’は「真っ白だ」「汚れていない」という意味."
    },
    {
      "type": 3,
      "japanese": "街道",
      "hiragana": "かいどう ",
      "meanOfChinese": "交通干线",
      "chinese": "街道",
      "phonetic": "jiēdào",
      "chineseMeaning": "中国語で‘街道jiēdào’というと都市の中の街路あるいは町内会的な組織を指し, 都市と都市を繋ぐ道路を指すわけではない."
    },
    {
      "type": 3,
      "japanese": "階段",
      "hiragana": "かいだん ",
      "meanOfChinese": "楼梯",
      "chinese": "阶段",
      "phonetic": "jiēduàn",
      "chineseMeaning": "中国語の‘阶段jiēduàn’は, 字順をひっくり返した「段階」という意味. 日本語の「階段」は中国語では‘台阶táijiē’ , ‘楼梯lóutī’という."
    },
    {
      "type": 3,
      "japanese": "結構",
      "hiragana": "けっこう ",
      "meanOfChinese": "还、相当地、可以了",
      "chinese": "结构",
      "phonetic": "jiégòu",
      "chineseMeaning": "中国語の‘结构jiégòu’は「構造」を表す."
    },
    {
      "type": 3,
      "japanese": "結局",
      "hiragana": "けっきょく ",
      "meanOfChinese": "最后",
      "chinese": "结局",
      "phonetic": "jiéjú",
      "chineseMeaning": "中国語の‘结局jiéjú’は「ものごとの結末」のこと."
    },
    {
      "type": 3,
      "japanese": "接客",
      "hiragana": "せっきゃく ",
      "meanOfChinese": "接待客人",
      "chinese": "接客",
      "phonetic": "jiēkè",
      "chineseMeaning": "中国語の‘接客jiēkè’は妓女が「客を取る」ことをいう."
    },
    {
      "type": 3,
      "japanese": "節目",
      "hiragana": "ふしめ ",
      "meanOfChinese": "转折点",
      "chinese": "节目",
      "phonetic": "jiémù",
      "chineseMeaning": "中国語の‘节目jiémù’は「番組」や「プログラム」のこと."
    },
    {
      "type": 3,
      "japanese": "結実",
      "hiragana": "けつじつ ",
      "meanOfChinese": "结果",
      "chinese": "结实",
      "phonetic": "jiēshi",
      "chineseMeaning": "中国語の‘结实jiēshi’は身体やものが「丈夫である」ことを指す."
    },
    {
      "type": 3,
      "japanese": "結束",
      "hiragana": "けっそく ",
      "meanOfChinese": "团结",
      "chinese": "结束",
      "phonetic": "jiéshù",
      "chineseMeaning": "中国語の‘结束jiéshù’は「終わる」という意味."
    },
    {
      "type": 3,
      "japanese": "矜持",
      "hiragana": "きょうじ ",
      "meanOfChinese": "自尊",
      "chinese": "矜持",
      "phonetic": "jīnchí",
      "chineseMeaning": "中国語の‘矜持jīnchí’は「緊張している」「かしこまっている」という意味である."
    },
    {
      "type": 3,
      "japanese": "進出",
      "hiragana": "しんしゅつ ",
      "meanOfChinese": "进入",
      "chinese": "进出",
      "phonetic": "jìnchū",
      "chineseMeaning": "中国語の‘进出jìnchū’は「出入りする」ことをいう."
    },
    {
      "type": 3,
      "japanese": "経理",
      "hiragana": "けいり ",
      "meanOfChinese": "财务",
      "chinese": "经理",
      "phonetic": "jīnglǐ",
      "chineseMeaning": "中国語の‘经理jīnglǐ’は「支配人」「部門の責任者」を指す."
    },
    {
      "type": 3,
      "japanese": "境内",
      "hiragana": "けいだい ",
      "meanOfChinese": "寺庙的院落",
      "chinese": "境内",
      "phonetic": "jìngnèi",
      "chineseMeaning": "中国語の‘境内jìngnèi’は「境界の内側」「領土」を意味する."
    },
    {
      "type": 3,
      "japanese": "精神",
      "hiragana": "せいしん ",
      "meanOfChinese": "精神（医学）",
      "chinese": "精神",
      "phonetic": "jīngshen",
      "chineseMeaning": "中国語の‘精神’は‘jīngshen’と読めば「元気である」ことを意味する."
    },
    {
      "type": 3,
      "japanese": "激怒",
      "hiragana": "げきど ",
      "meanOfChinese": "大发雷霆",
      "chinese": "激怒",
      "phonetic": "jīnù",
      "chineseMeaning": "中国語の‘激怒jīnù’は「人の感情を傷つけて怒らせる」ことを指す."
    },
    {
      "type": 3,
      "japanese": "舅",
      "hiragana": "しゅうと ",
      "meanOfChinese": "公公、岳父",
      "chinese": "舅",
      "phonetic": "jiù",
      "chineseMeaning": "中国語の‘舅jiù’は‘舅舅’の形で「母の兄弟」を指す."
    },
    {
      "type": 3,
      "japanese": "就職",
      "hiragana": "しゅうしょく ",
      "meanOfChinese": "就业",
      "chinese": "就职",
      "phonetic": "jiùzhí",
      "chineseMeaning": "中国語の‘就职jiùzhí’は「高いポストに就く」ことをいう."
    },
    {
      "type": 3,
      "japanese": "急用",
      "hiragana": "きゅうよう ",
      "meanOfChinese": "急事",
      "chinese": "急用",
      "phonetic": "jíyòng",
      "chineseMeaning": "中国語の‘急用jíyòng’は「差し迫って（金が）必要である」ことを言う."
    },
    {
      "type": 3,
      "japanese": "脚色",
      "hiragana": "きゃくしょく ",
      "meanOfChinese": "编剧",
      "chinese": "脚色",
      "phonetic": "juésè",
      "chineseMeaning": "中国語の‘脚色juésè’は‘角色juésè’と同じで「劇の中の役」をいう."
    },
    {
      "type": 3,
      "japanese": "覚悟",
      "hiragana": "かくご ",
      "meanOfChinese": "决心",
      "chinese": "觉悟",
      "phonetic": "juéwù",
      "chineseMeaning": "中国語の‘觉悟juéwù’は「悟る」こと, 「自覚する」ことをいう."
    },
    {
      "type": 3,
      "japanese": "軍属",
      "hiragana": "ぐんぞく ",
      "meanOfChinese": "军队里的文职人员",
      "chinese": "军属",
      "phonetic": "jūnshǔ",
      "chineseMeaning": "中国語の‘军属jūnshǔ’は「現役の軍人の家族」を言う."
    },
    {
      "type": 3,
      "japanese": "拘束",
      "hiragana": "こうそく ",
      "meanOfChinese": "管束",
      "chinese": "拘束",
      "phonetic": "jūshù",
      "chineseMeaning": "中国語の‘拘束jūshù’には「束縛する」という意味と「人前でぎこちない」「堅苦しい」という意味がある."
    },
    {
      "type": 3,
      "japanese": "開場",
      "hiragana": "かいじょう ",
      "meanOfChinese": "开门",
      "chinese": "开场",
      "phonetic": "kāichǎng",
      "chineseMeaning": "中国語の‘开场kāichǎng’は「芝居, 試合などが始まる」ことを指す."
    },
    {
      "type": 3,
      "japanese": "開通",
      "hiragana": "かいつう ",
      "meanOfChinese": "通车",
      "chinese": "开通",
      "phonetic": "kāitong",
      "chineseMeaning": "中国語の‘开通’は‘kāitong’と軽声に読むと思想が「開明的である」こと, 「進んでいる」ことを言う."
    },
    {
      "type": 3,
      "japanese": "看病",
      "hiragana": "かんびょう ",
      "meanOfChinese": "看护",
      "chinese": "看病",
      "phonetic": "kànbìng",
      "chineseMeaning": "中国語の‘看病kànbìng’は医者が「診察する」ことを言う."
    },
    {
      "type": 3,
      "japanese": "可憐",
      "hiragana": "かれん ",
      "meanOfChinese": "可爱",
      "chinese": "可憐",
      "phonetic": "kělián",
      "chineseMeaning": "日本語で「可憐」といえば「かわいらしい」という意味になるが, 「可憐」は中国文字では‘可怜kělián’となり, 「憐れむ可し」という意味で「相手の境遇に同情する」「かわいそうだ」という感情を表す."
    },
    {
      "type": 3,
      "japanese": "控訴",
      "hiragana": "こうそ ",
      "meanOfChinese": "上诉",
      "chinese": "控诉",
      "phonetic": "kòngsù",
      "chineseMeaning": "中国語の‘控诉kòngsù’は「告発・糾弾する」ことを指す."
    },
    {
      "type": 3,
      "japanese": "口",
      "hiragana": "くち ",
      "meanOfChinese": "嘴",
      "chinese": "口",
      "phonetic": "kǒu",
      "chineseMeaning": "中国語では人か鳥かその他の動物かを問わず, 「口」に相当する器官はみな‘嘴zuǐ’で表す. 中国語の‘口kǒu’は「話す器官」「口に似た作用をする物」の意味に重きがあり, またこれ一文字だけでは滅多に使わない."
    },
    {
      "type": 3,
      "japanese": "口角",
      "hiragana": "こうかく ",
      "meanOfChinese": "嘴角",
      "chinese": "口角",
      "phonetic": "kǒujué",
      "chineseMeaning": "中国語の‘口角kǒujué’は「口論」を表す. ‘kǒujiǎo’と読むと「口もと」の意味."
    },
    {
      "type": 3,
      "japanese": "快楽",
      "hiragana": "かいらく ",
      "meanOfChinese": "享乐",
      "chinese": "快楽",
      "phonetic": "kuàilè",
      "chineseMeaning": "日本語で「快楽」というと肉体的な楽しみに偏りがちだが, 中国語の‘快乐kuàilè’にはそのようなニュアンスはなく, 精神的な楽しさについてのみいう."
    },
    {
      "type": 3,
      "japanese": "狂言",
      "hiragana": "きょうげん ",
      "meanOfChinese": "（1）狂言艺术（2）骗局",
      "chinese": "狂言",
      "phonetic": "kuángyán",
      "chineseMeaning": "中国語の‘狂言kuángyán’は「ほら話」や「妄言」のこと."
    },
    {
      "type": 3,
      "japanese": "老婆",
      "hiragana": "ろうば ",
      "meanOfChinese": "老太婆",
      "chinese": "老婆",
      "phonetic": "lǎopo",
      "chineseMeaning": "中国語の‘老婆lǎopo’は「女房」をいう. また‘老婆儿lǎopór’といえば「老婦人」となる."
    },
    {
      "type": 3,
      "japanese": "労作",
      "hiragana": "ろうさく ",
      "meanOfChinese": "精心的创作",
      "chinese": "劳作",
      "phonetic": "láozuò",
      "chineseMeaning": "中国語の‘劳作láozuò’は「肉体労働」のこと."
    },
    {
      "type": 3,
      "japanese": "裏面",
      "hiragana": "りめん ",
      "meanOfChinese": "内幕",
      "chinese": "里面",
      "phonetic": "lǐmiàn",
      "chineseMeaning": "中国語の‘里面（裏面）lǐmiàn’は「中」のこと.▸ ポケットの中 口袋里面 kǒudài lǐmiàn "
    },
    {
      "type": 3,
      "japanese": "理屈",
      "hiragana": "りくつ ",
      "meanOfChinese": "道理",
      "chinese": "理屈",
      "phonetic": "lǐqū",
      "chineseMeaning": "中国語の‘理屈lǐqū’は「筋が通らない」ことを指す."
    },
    {
      "type": 3,
      "japanese": "竜頭",
      "hiragana": "りゅうず ",
      "meanOfChinese": "表冠",
      "chinese": "龙头",
      "phonetic": "lóngtóu",
      "chineseMeaning": "中国語の‘龙头lóngtóu’は水道の「蛇口」をいう."
    },
    {
      "type": 3,
      "japanese": "馬鹿",
      "hiragana": "ばか ",
      "meanOfChinese": "傻",
      "chinese": "马鹿",
      "phonetic": "mǎlù",
      "chineseMeaning": "中国語の‘马鹿mǎlù’は「赤鹿」という動物."
    },
    {
      "type": 3,
      "japanese": "漫談",
      "hiragana": "まんだん ",
      "meanOfChinese": "闲谈",
      "chinese": "漫谈",
      "phonetic": "màntán",
      "chineseMeaning": "中国語の‘漫谈màntán’は「雑談する」ことや「自由討論する」ことを指す."
    },
    {
      "type": 3,
      "japanese": "饅頭",
      "hiragana": "まんじゅう ",
      "meanOfChinese": "包子",
      "chinese": "馒头",
      "phonetic": "mántou",
      "chineseMeaning": "中国語の‘馒头mántou’は具の入っていない中国式の「蒸しパン」のこと."
    },
    {
      "type": 3,
      "japanese": "門",
      "hiragana": "もん ",
      "meanOfChinese": "大门",
      "chinese": "门",
      "phonetic": "mén",
      "chineseMeaning": "中国語では「出入り口」はすべて‘门mén’という. 必ずしも日本語の「門」のような建築を必要としない. 家の玄関, バスの乗降口も‘门mén’."
    },
    {
      "type": 3,
      "japanese": "綿",
      "hiragana": "めん ",
      "meanOfChinese": "棉",
      "chinese": "绵",
      "phonetic": "mián",
      "chineseMeaning": "中国語の‘绵mián’は「真綿」を意味する."
    },
    {
      "type": 3,
      "japanese": "勉励",
      "hiragana": "べんれい ",
      "meanOfChinese": "勤奋",
      "chinese": "勉励",
      "phonetic": "miǎnlì",
      "chineseMeaning": "中国語の‘勉励miǎnlì’は「励ます」こと."
    },
    {
      "type": 3,
      "japanese": "勉強",
      "hiragana": "べんきょう ",
      "meanOfChinese": "学习",
      "chinese": "勉强",
      "phonetic": "miǎnqiǎng",
      "chineseMeaning": "中国語の‘勉强miǎnqiǎng’は「強制する」という動詞, 「むりやり…」という副詞である."
    },
    {
      "type": 3,
      "japanese": "迷惑",
      "hiragana": "めいわく ",
      "meanOfChinese": "麻烦",
      "chinese": "迷惑",
      "phonetic": "míhuò",
      "chineseMeaning": "中国語の‘迷惑míhuò’は「迷う」こと, 「惑わす」ことを意味する."
    },
    {
      "type": 3,
      "japanese": "名人",
      "hiragana": "めいじん ",
      "meanOfChinese": "高手",
      "chinese": "名人",
      "phonetic": "míngrén",
      "chineseMeaning": "中国語の‘名人míngrén’は「有名人」を指す."
    },
    {
      "type": 3,
      "japanese": "名字",
      "hiragana": "みょうじ ",
      "meanOfChinese": "姓",
      "chinese": "名字",
      "phonetic": "míngzi",
      "chineseMeaning": "中国語の‘名字míngzi’は「フルネーム」のこと."
    },
    {
      "type": 3,
      "japanese": "末代",
      "hiragana": "まつだい ",
      "meanOfChinese": "后世",
      "chinese": "末代",
      "phonetic": "mòdài",
      "chineseMeaning": "中国語の‘末代mòdài’は「王朝最後の君主」を指す."
    },
    {
      "type": 3,
      "japanese": "漠然",
      "hiragana": "ばくぜん ",
      "meanOfChinese": "模糊",
      "chinese": "漠然",
      "phonetic": "mòrán",
      "chineseMeaning": "中国語の‘漠然mòrán’は「冷淡である」ことを指す."
    },
    {
      "type": 3,
      "japanese": "目前",
      "hiragana": "もくぜん ",
      "meanOfChinese": "眉睫",
      "chinese": "目前",
      "phonetic": "mùqián",
      "chineseMeaning": "中国語の‘目前mùqián’は「目下」という意味."
    },
    {
      "type": 3,
      "japanese": "模様",
      "hiragana": "もよう ",
      "meanOfChinese": "花纹",
      "chinese": "模样",
      "phonetic": "múyàng",
      "chineseMeaning": "中国語の‘模样múyàng’は「容貌」や「身なり」のこと."
    },
    {
      "type": 3,
      "japanese": "南方",
      "hiragana": "なんぽう ",
      "meanOfChinese": "南方",
      "chinese": "南方",
      "phonetic": "nánfāng",
      "chineseMeaning": "中国語の‘南方nánfāng’は主として長江流域およびそれ以南の地域をいう."
    },
    {
      "type": 3,
      "japanese": "難聴",
      "hiragana": "なんちょう ",
      "meanOfChinese": "耳背",
      "chinese": "难听",
      "phonetic": "nántīng",
      "chineseMeaning": "中国語の‘难听nántīng’は音や言葉が「聞くに耐えない」こと."
    },
    {
      "type": 3,
      "japanese": "男装",
      "hiragana": "だんそう ",
      "meanOfChinese": "女扮男装",
      "chinese": "男装",
      "phonetic": "nánzhuāng",
      "chineseMeaning": "中国語の‘男装nánzhuāng’は「メンズウエア」のこと."
    },
    {
      "type": 3,
      "japanese": "納入",
      "hiragana": "のうにゅう ",
      "meanOfChinese": "缴",
      "chinese": "纳入",
      "phonetic": "nàrù",
      "chineseMeaning": "中国語の‘纳入nàrù’は抽象的なものを取り入れることを指す.▸ 中国語を中等学校の言語教育に導入する 把汉语纳入中学语言教育 bǎ Hànyǔ nàrù zhōngxué yǔyán jiàoyù "
    },
    {
      "type": 3,
      "japanese": "鮎",
      "hiragana": "アユ ",
      "meanOfChinese": "香鱼",
      "chinese": "鲇",
      "phonetic": "nián",
      "chineseMeaning": "中国語の‘鲇nián’は「なまず」の意."
    },
    {
      "type": 3,
      "japanese": "お嬢さん",
      "hiragana": "おじょうさん ",
      "meanOfChinese": "小姐",
      "chinese": "孃",
      "phonetic": "niáng",
      "chineseMeaning": "中国語の‘孃niáng’は, ‘娘niáng’と同じであり, 「おかあさん」「おばさん」をいう."
    },
    {
      "type": 3,
      "japanese": "娘",
      "hiragana": "むすめ ",
      "meanOfChinese": "女孩儿",
      "chinese": "娘",
      "phonetic": "niáng",
      "chineseMeaning": "中国語の‘娘niáng’は「母親」のこと."
    },
    {
      "type": 3,
      "japanese": "念書",
      "hiragana": "ねんしょ ",
      "meanOfChinese": "字据",
      "chinese": "念书",
      "phonetic": "niànshū",
      "chineseMeaning": "中国語の‘念书niànshū’は「学校へ上がって勉強する」ことを指す."
    },
    {
      "type": 3,
      "japanese": "年頭",
      "hiragana": "ねんとう ",
      "meanOfChinese": "岁首",
      "chinese": "年头",
      "phonetic": "niántóu",
      "chineseMeaning": "中国語の‘年头niántóu’は「長い年月」のこと."
    },
    {
      "type": 3,
      "japanese": "逆子",
      "hiragana": "さかご ",
      "meanOfChinese": "逆产",
      "chinese": "逆子",
      "phonetic": "nìzǐ",
      "chineseMeaning": "中国語の‘逆子nìzǐ’は「親不孝な子」のことをいう."
    },
    {
      "type": 3,
      "japanese": "暖房",
      "hiragana": "だんぼう ",
      "meanOfChinese": "暖气",
      "chinese": "暖房",
      "phonetic": "nuǎnfáng",
      "chineseMeaning": "中国語の‘暖房nuǎnfáng’は, 友人や親戚の結婚前に新居を訪れてお祝いをする古い習慣をいう."
    },
    {
      "type": 3,
      "japanese": "女将",
      "hiragana": "おかみ ",
      "meanOfChinese": "女老板",
      "chinese": "女将",
      "phonetic": "nǚjiàng",
      "chineseMeaning": "中国語の‘女将nǚjiàng’は「ある分野でリーダーシップを取る有能な女性」を指す."
    },
    {
      "type": 3,
      "japanese": "女装",
      "hiragana": "じょそう ",
      "meanOfChinese": "男扮女装",
      "chinese": "女装",
      "phonetic": "nǚzhuāng",
      "chineseMeaning": "中国語の‘女装nǚzhuāng’はメンズに対する「レディースウエア」のこと."
    },
    {
      "type": 3,
      "japanese": "配合",
      "hiragana": "はいごう ",
      "meanOfChinese": "调配",
      "chinese": "配合",
      "phonetic": "pèihé",
      "chineseMeaning": "中国語の‘配合pèihé’は「協力する」ことをいう."
    },
    {
      "type": 3,
      "japanese": "匹",
      "hiragana": "ひき ",
      "meanOfChinese": "只",
      "chinese": "匹",
      "phonetic": "pǐ",
      "chineseMeaning": "中国語の‘匹pǐ’は動物では馬やろばを数える単位."
    },
    {
      "type": 3,
      "japanese": "片面",
      "hiragana": "かためん ",
      "meanOfChinese": "一面",
      "chinese": "片面",
      "phonetic": "piànmiàn",
      "chineseMeaning": "中国語の‘片面piànmiàn’は「一方的な」「偏った」という意味."
    },
    {
      "type": 3,
      "japanese": "便宜",
      "hiragana": "べんぎ ",
      "meanOfChinese": "方便",
      "chinese": "便宜",
      "phonetic": "piányi",
      "chineseMeaning": "中国語の‘便宜piányi’は「値段が安い」こと. また‘biànyí’と読めば「臨機応変に」という意味である."
    },
    {
      "type": 3,
      "japanese": "平服",
      "hiragana": "へいふく ",
      "meanOfChinese": "便服",
      "chinese": "平服",
      "phonetic": "píngfú",
      "chineseMeaning": "中国語の‘平服píngfú’は「気持ちが落ち着く」こと."
    },
    {
      "type": 3,
      "japanese": "平和",
      "hiragana": "へいわ ",
      "meanOfChinese": "和平",
      "chinese": "平和",
      "phonetic": "pínghé",
      "chineseMeaning": "中国語の‘平和pínghé’は言行や薬効が「穏やかである」ことをいう."
    },
    {
      "type": 3,
      "japanese": "評判",
      "hiragana": "ひょうばん ",
      "meanOfChinese": "评价",
      "chinese": "评判",
      "phonetic": "píngpàn",
      "chineseMeaning": "中国語の‘评判píngpàn’は「判定する」こと."
    },
    {
      "type": 3,
      "japanese": "平手",
      "hiragana": "ひらて ",
      "meanOfChinese": "手掌",
      "chinese": "平手",
      "phonetic": "píngshǒu",
      "chineseMeaning": "中国語の‘平手píngshǒu’は「引き分け」という意味."
    },
    {
      "type": 3,
      "japanese": "皮肉",
      "hiragana": "ひにく ",
      "meanOfChinese": "讽刺",
      "chinese": "皮肉",
      "phonetic": "píròu",
      "chineseMeaning": "中国語の‘皮肉píròu’は「肉体」を指す.▸ 腰の右側の部分がしびれる 腰右侧皮肉麻木 yāo yòucè píròu mámù "
    },
    {
      "type": 3,
      "japanese": "破滅",
      "hiragana": "はめつ ",
      "meanOfChinese": "毁灭",
      "chinese": "破灭",
      "phonetic": "pòmiè",
      "chineseMeaning": "中国語の‘破灭pòmiè’は「水泡に帰する」ことを指す."
    },
    {
      "type": 3,
      "japanese": "破綻",
      "hiragana": "はたん ",
      "meanOfChinese": "失败",
      "chinese": "破绽",
      "phonetic": "pòzhàn",
      "chineseMeaning": "中国語の‘破绽pòzhàn’は「馬脚」や「衣服のほころび」を意味する.▸ ぼろが出まくりの大嘘 破绽百出的欺世谎言 pòzhàn bǎichū de qīshì huǎngyán "
    },
    {
      "type": 3,
      "japanese": "妻",
      "hiragana": "つま ",
      "meanOfChinese": "妻子",
      "chinese": "妻",
      "phonetic": "qī",
      "chineseMeaning": "中国語では‘爱人àiren’は「正妻」を指し, 「愛人」の意味はない. 最近の中国では「妻」を指すのに建国前に使われていた‘太太tàitai’が復活し, こちらも使われている."
    },
    {
      "type": 3,
      "japanese": "襁褓",
      "hiragana": "おしめ ",
      "meanOfChinese": "尿布",
      "chinese": "襁褓",
      "phonetic": "qiǎngbǎo",
      "chineseMeaning": "中国語の‘襁褓qiǎngbǎo’は, 赤ん坊の「おくるみ」「うぶぎ」のこと."
    },
    {
      "type": 3,
      "japanese": "前年",
      "hiragana": "ぜんねん ",
      "meanOfChinese": "前一年",
      "chinese": "前年",
      "phonetic": "qiánnián",
      "chineseMeaning": "中国語の‘前年qiánnián’は「おととし」を指す."
    },
    {
      "type": 3,
      "japanese": "鍬",
      "hiragana": "くわ ",
      "meanOfChinese": "锄头",
      "chinese": "锹",
      "phonetic": "qiāo",
      "chineseMeaning": "中国語の‘锹qiāo’は「すき（鋤）」をいう."
    },
    {
      "type": 3,
      "japanese": "汽車",
      "hiragana": "きしゃ ",
      "meanOfChinese": "火车",
      "chinese": "汽车",
      "phonetic": "qìchē",
      "chineseMeaning": "中国語の‘汽车qìchē’は「自動車」のこと."
    },
    {
      "type": 3,
      "japanese": "気短",
      "hiragana": "きみじか ",
      "meanOfChinese": "性急",
      "chinese": "气短",
      "phonetic": "qìduǎn",
      "chineseMeaning": "中国語の‘气短qìduǎn’は「息が続かない」こと, 「息づかいが荒い」ことを言う."
    },
    {
      "type": 3,
      "japanese": "切り口",
      "hiragana": "きりくち ",
      "meanOfChinese": "切面",
      "chinese": "切口",
      "phonetic": "qiēkǒu",
      "chineseMeaning": "中国語の‘切口qiēkǒu’は「本の小口こぐち」つまり本の紙の切り口あるいは本の小口側の余白部分を指す. ‘qièkǒu’と読めば, 「旧時の同業者間などの隠語」をいう."
    },
    {
      "type": 3,
      "japanese": "切実",
      "hiragana": "せつじつ ",
      "meanOfChinese": "迫切",
      "chinese": "切实",
      "phonetic": "qièshí",
      "chineseMeaning": "中国語の‘切实qièshí’は「実情に合う」ことを表す."
    },
    {
      "type": 3,
      "japanese": "情報",
      "hiragana": "じょうほう ",
      "meanOfChinese": "信息",
      "chinese": "情报",
      "phonetic": "qíngbào",
      "chineseMeaning": "中国語の‘情报qíngbào’は今日では多く「機密情報」の意味で使われる."
    },
    {
      "type": 3,
      "japanese": "清楚",
      "hiragana": "せいそ ",
      "meanOfChinese": "素净",
      "chinese": "清楚",
      "phonetic": "qīngchu",
      "chineseMeaning": "中国語の‘清楚qīngchu’は「はっきりしている」という意味."
    },
    {
      "type": 3,
      "japanese": "傾倒",
      "hiragana": "けいとう ",
      "meanOfChinese": "专注",
      "chinese": "倾倒",
      "phonetic": "qīngdǎo",
      "chineseMeaning": "中国語の‘倾倒’は‘qīngdǎo’と読むと「傾いて倒れる」こと, ‘qīngdào’と読むと「容器の中身を空ける」ことを意味する."
    },
    {
      "type": 3,
      "japanese": "請求",
      "hiragana": "せいきゅう ",
      "meanOfChinese": "要求",
      "chinese": "请求",
      "phonetic": "qǐngqiú",
      "chineseMeaning": "中国語の‘请求qǐngqiú’は「申請する」ことをいう."
    },
    {
      "type": 3,
      "japanese": "情事",
      "hiragana": "じょうじ ",
      "meanOfChinese": "风流韵事",
      "chinese": "情事",
      "phonetic": "qíngshì",
      "chineseMeaning": "中国語の‘情事qíngshì’は「事情」「事例」を意味する."
    },
    {
      "type": 3,
      "japanese": "情緒",
      "hiragana": "じょうちょ ",
      "meanOfChinese": "情趣",
      "chinese": "情绪",
      "phonetic": "qíngxù",
      "chineseMeaning": "中国語の‘情绪qíngxù’はある活動に対する「意欲」「気持ち」を表す."
    },
    {
      "type": 3,
      "japanese": "親切",
      "hiragana": "しんせつ ",
      "meanOfChinese": "好意",
      "chinese": "亲切",
      "phonetic": "qīnqiè",
      "chineseMeaning": "中国語の‘亲切qīnqiè’は「心のこもった」「親しみのこもった」という意味であり, 日本語のような「相手のことを思いやる」というニュアンスはない."
    },
    {
      "type": 3,
      "japanese": "親身",
      "hiragana": "しんみ ",
      "meanOfChinese": "亲骨肉",
      "chinese": "亲身",
      "phonetic": "qīnshēn",
      "chineseMeaning": "中国語の‘亲身qīnshēn’は「身をもって」という意味である."
    },
    {
      "type": 3,
      "japanese": "親友",
      "hiragana": "しんゆう ",
      "meanOfChinese": "好朋友",
      "chinese": "亲友",
      "phonetic": "qīnyǒu",
      "chineseMeaning": "中国語の‘亲友qīnyǒu’は「親類と友達」のことを指す."
    },
    {
      "type": 3,
      "japanese": "奇特",
      "hiragana": "きとく ",
      "meanOfChinese": "难能可贵",
      "chinese": "奇特",
      "phonetic": "qítè",
      "chineseMeaning": "中国語の‘奇特qítè’は人間の心理や容貌, 景色や現象などが「特異である」ことをいう."
    },
    {
      "type": 3,
      "japanese": "球技",
      "hiragana": "きゅうぎ ",
      "meanOfChinese": "球赛",
      "chinese": "球技",
      "phonetic": "qiújì",
      "chineseMeaning": "中国語の‘球技qiújì’は「球技のテクニック」を意味する."
    },
    {
      "type": 3,
      "japanese": "求人",
      "hiragana": "きゅうじん ",
      "meanOfChinese": "招聘人员",
      "chinese": "求人",
      "phonetic": "qiúrén",
      "chineseMeaning": "中国語の‘求人qiúrén’は「人にすがる」という動詞."
    },
    {
      "type": 3,
      "japanese": "気味",
      "hiragana": "きみ ",
      "meanOfChinese": "情绪",
      "chinese": "气味",
      "phonetic": "qìwèi",
      "chineseMeaning": "中国語の‘气味qìwèi’は「におい」や「香り」のこと."
    },
    {
      "type": 3,
      "japanese": "妻子",
      "hiragana": "さいし ",
      "meanOfChinese": "妻子",
      "chinese": "妻子",
      "phonetic": "qīzi",
      "chineseMeaning": "中国語の‘妻子qīzi’は「妻」という意味である. ‘qīzǐ’と読めば「妻子さいし」の意味になる."
    },
    {
      "type": 3,
      "japanese": "駆使",
      "hiragana": "くし ",
      "meanOfChinese": "操纵",
      "chinese": "驱使",
      "phonetic": "qūshǐ",
      "chineseMeaning": "中国語の‘驱使qūshǐ’は「酷使する」「心が駆り立てられる」という意味である."
    },
    {
      "type": 3,
      "japanese": "趣味",
      "hiragana": "しゅみ ",
      "meanOfChinese": "爱好",
      "chinese": "趣味",
      "phonetic": "qùwèi",
      "chineseMeaning": "中国語の‘趣味qùwèi’は「人を引きつける要因」「味わい」のことである."
    },
    {
      "type": 3,
      "japanese": "曲芸",
      "hiragana": "きょくげい ",
      "meanOfChinese": "杂技",
      "chinese": "曲艺",
      "phonetic": "qǔyì",
      "chineseMeaning": "中国語の‘曲艺qǔyì’は民間に伝わる地方色豊かな大衆演芸のことを言う. ‘弹词táncí（語り物）’ ‘快板kuàibǎn（拍子をとりながらの歌）’ ‘相声xiàngshēng（漫才）’など."
    },
    {
      "type": 3,
      "japanese": "人家",
      "hiragana": "じんか ",
      "meanOfChinese": "人家",
      "chinese": "人家",
      "phonetic": "rénjia",
      "chineseMeaning": "中国語の‘人家’は‘rénjia’と発音すれば「他人」, また「特定の他人」のことである. ‘rénjiā’と発音すれば「人の住む家」「家庭」の意味になる."
    },
    {
      "type": 3,
      "japanese": "人参",
      "hiragana": "ニンジン ",
      "meanOfChinese": "胡萝卜",
      "chinese": "人参",
      "phonetic": "rénshēn",
      "chineseMeaning": "中国語の‘人参rénshēn’は「朝鮮人参」を指す."
    },
    {
      "type": 3,
      "japanese": "洒落",
      "hiragana": "しゃれ ",
      "meanOfChinese": "俏皮话",
      "chinese": "洒落",
      "phonetic": "sǎluò",
      "chineseMeaning": "中国語の‘洒落sǎluò’は「垢抜けしている」こと, 容器から「こぼれる」ことをいう."
    },
    {
      "type": 3,
      "japanese": "散発",
      "hiragana": "さんぱつ ",
      "meanOfChinese": "零散",
      "chinese": "散发",
      "phonetic": "sànfā",
      "chineseMeaning": "中国語の‘散发sànfā’は「配布する」こと, 「香りなどを発する」ことをいう."
    },
    {
      "type": 3,
      "japanese": "上場",
      "hiragana": "じょうじょう ",
      "meanOfChinese": "上市",
      "chinese": "上场",
      "phonetic": "shàngchǎng",
      "chineseMeaning": "中国語の‘上场shàngchǎng’は役者や選手が「登場する」ことをいう."
    },
    {
      "type": 3,
      "japanese": "商会",
      "hiragana": "しょうかい ",
      "meanOfChinese": "商行",
      "chinese": "商会",
      "phonetic": "shānghuì",
      "chineseMeaning": "中国語の‘商会shānghuì’は「同業組合」「商業連合会」などを言う."
    },
    {
      "type": 3,
      "japanese": "上手",
      "hiragana": "じょうず ",
      "meanOfChinese": "善于",
      "chinese": "上手",
      "phonetic": "shàngshǒu",
      "chineseMeaning": "中国語の‘上手shàngshǒu’は「始める」ことをいう."
    },
    {
      "type": 3,
      "japanese": "商談",
      "hiragana": "しょうだん ",
      "meanOfChinese": "商务谈判",
      "chinese": "商谈",
      "phonetic": "shāngtán",
      "chineseMeaning": "中国語の‘商谈shāngtán’とは「話し合うこと」「協議すること」である."
    },
    {
      "type": 3,
      "japanese": "椹",
      "hiragana": "サワラ ",
      "meanOfChinese": "花柏",
      "chinese": "葚",
      "phonetic": "shèn",
      "chineseMeaning": "日本語の「サワラ」は日本特産の常緑高木. 中国語の‘椹＝葚shèn’は「桑の実」をいう."
    },
    {
      "type": 3,
      "japanese": "生地",
      "hiragana": "きじ ",
      "meanOfChinese": "衣料",
      "chinese": "生地",
      "phonetic": "shēngdì",
      "chineseMeaning": "中国語の‘生地shēngdì’は「整地されていない土地」のこと."
    },
    {
      "type": 3,
      "japanese": "生身",
      "hiragana": "なまみ ",
      "meanOfChinese": "活人",
      "chinese": "生身",
      "phonetic": "shēngshēn",
      "chineseMeaning": "中国語の‘生身shēngshēn’は「実の親」を指す."
    },
    {
      "type": 3,
      "japanese": "生涯",
      "hiragana": "しょうがい ",
      "meanOfChinese": "一生",
      "chinese": "生涯",
      "phonetic": "shēngyá",
      "chineseMeaning": "日本語の「生涯」は「一生」を表すが, 中国語の‘生涯shēngyá’は「一生のうち, ある仕事や活動に従事する期間」を意味する.▸ 何年かの舞台生活 几年的舞台生涯 jǐnián de wǔtái shēngyá "
    },
    {
      "type": 3,
      "japanese": "生育",
      "hiragana": "せいいく ",
      "meanOfChinese": "生长",
      "chinese": "生育",
      "phonetic": "shēngyù",
      "chineseMeaning": "中国語の‘生育shēngyù’は「生む」ことである."
    },
    {
      "type": 3,
      "japanese": "深刻",
      "hiragana": "しんこく ",
      "meanOfChinese": "严重",
      "chinese": "深刻",
      "phonetic": "shēnkè",
      "chineseMeaning": "中国語の‘深刻shēnkè’は「印象などが深い」ことを指す."
    },
    {
      "type": 3,
      "japanese": "審判",
      "hiragana": "しんぱん ",
      "meanOfChinese": "裁判",
      "chinese": "审判",
      "phonetic": "shěnpàn",
      "chineseMeaning": "中国語の‘审判shěnpàn’は「裁判」を表す. 日本語と中国語で「裁判」と「審判」の意味は逆になる."
    },
    {
      "type": 3,
      "japanese": "身上",
      "hiragana": "しんしょう ",
      "meanOfChinese": "财产",
      "chinese": "身上",
      "phonetic": "shēnshang",
      "chineseMeaning": "中国語の‘身上shēnshang’は「体に」という意味を表す."
    },
    {
      "type": 3,
      "japanese": "社長",
      "hiragana": "しゃちょう ",
      "meanOfChinese": "总经理",
      "chinese": "社长",
      "phonetic": "shèzhǎng",
      "chineseMeaning": "「社長」は中国語では‘总经理zǒngjīnglǐ’という. 単に‘经理jīnglǐ’といえばマネージャーを指す. したがって「経理」は中国では各部門あるいは会社そのものを預かる人間を表す. なお過去に‘人民公社rénmín gōngshè’のトップを‘社长shèzhǎng’といった."
    },
    {
      "type": 3,
      "japanese": "市電",
      "hiragana": "しでん ",
      "meanOfChinese": "市内有轨电车",
      "chinese": "市电",
      "phonetic": "shìdiàn",
      "chineseMeaning": "中国語の‘市电shìdiàn’は「住宅用の電気」のこと. なお中国の電圧は普通220ボルト."
    },
    {
      "type": 3,
      "japanese": "十分",
      "hiragana": "じゅうぶん ",
      "meanOfChinese": "充足",
      "chinese": "十分",
      "phonetic": "shífēn",
      "chineseMeaning": "中国語の‘十分shífēn’は「非常に」という副詞."
    },
    {
      "type": 3,
      "japanese": "失神",
      "hiragana": "しっしん ",
      "meanOfChinese": "昏迷",
      "chinese": "失神",
      "phonetic": "shīshén",
      "chineseMeaning": "中国語の‘失神shīshén’は「うっかりする」ことを指す."
    },
    {
      "type": 3,
      "japanese": "石頭",
      "hiragana": "いしあたま ",
      "meanOfChinese": "死脑筋",
      "chinese": "石头",
      "phonetic": "shítou",
      "chineseMeaning": "中国語の‘石头shítou’とは「石」のこと.▸ じゃんけんぽん！(それぞれグー, チョキ, パーを指す) 石头, 剪子, 布！ Shítou, jiǎnzi, bù "
    },
    {
      "type": 3,
      "japanese": "実在",
      "hiragana": "じつざい ",
      "meanOfChinese": "客观存在",
      "chinese": "实在",
      "phonetic": "shízài",
      "chineseMeaning": "中国語の‘实在’は‘shízài’と読むと「本物の」「本当に」「実際には」という意味になる.▸ 確かな腕前 实在的本事 shízài de běnshi ▸ 時間は本当に限られている 时间实在有限 shíjiān shízài yǒuxiàn また ‘shízai’と読むと「着実である」という意味になる.▸ 彼は仕事ぶりが着実だ 他干活实在 tā gànhuó shízai "
    },
    {
      "type": 3,
      "japanese": "失職",
      "hiragana": "しっしょく ",
      "meanOfChinese": "失业",
      "chinese": "失职",
      "phonetic": "shīzhí",
      "chineseMeaning": "中国語の‘失职shīzhí’は「職務を果たさない」ことを指す."
    },
    {
      "type": 3,
      "japanese": "手軽",
      "hiragana": "てがる ",
      "meanOfChinese": "简单",
      "chinese": "手轻",
      "phonetic": "shǒu qīng",
      "chineseMeaning": "中国語の‘手轻shǒu qīng’は「そっと扱う」ことをいう."
    },
    {
      "type": 3,
      "japanese": "手柄",
      "hiragana": "てがら ",
      "meanOfChinese": "功劳",
      "chinese": "手柄",
      "phonetic": "shǒubǐng",
      "chineseMeaning": "中国語の‘手柄shǒubǐng’は「取っ手」を指す."
    },
    {
      "type": 3,
      "japanese": "手心",
      "hiragana": "てごころ ",
      "meanOfChinese": "酌情",
      "chinese": "手心",
      "phonetic": "shǒuxīn",
      "chineseMeaning": "中国語の‘手心shǒuxīn’は「手のひら」のこと."
    },
    {
      "type": 3,
      "japanese": "手芸",
      "hiragana": "しゅげい ",
      "meanOfChinese": "手工艺",
      "chinese": "手艺",
      "phonetic": "shǒuyì",
      "chineseMeaning": "中国語の‘手艺shǒuyì’は「職人の腕前」を指す."
    },
    {
      "type": 3,
      "japanese": "手紙",
      "hiragana": "てがみ ",
      "meanOfChinese": "信",
      "chinese": "手纸",
      "phonetic": "shǒuzhǐ",
      "chineseMeaning": "中国語の‘手纸shǒuzhǐ’は「トイレットペーパー」を指す. なお中国語では‘手shǒu’は用便の婉曲な表現として使われる. 例えば‘解手jiěshǒu’（トイレに行く）, ‘洗手间xǐshǒujiān’（トイレ）."
    },
    {
      "type": 3,
      "japanese": "手足",
      "hiragana": "てあし ",
      "meanOfChinese": "手脚",
      "chinese": "手足",
      "phonetic": "shǒuzú",
      "chineseMeaning": "中国語の‘手足shǒuzú’は「（手足の）動作」「兄弟」という意味である."
    },
    {
      "type": 3,
      "japanese": "順路",
      "hiragana": "じゅんろ ",
      "meanOfChinese": "路线",
      "chinese": "顺路",
      "phonetic": "shùnlù",
      "chineseMeaning": "中国語の‘顺路shùnlù’は「道すがら」という意味である."
    },
    {
      "type": 3,
      "japanese": "説法",
      "hiragana": "せっぽう ",
      "meanOfChinese": "说法",
      "chinese": "说法",
      "phonetic": "shuōfa",
      "chineseMeaning": "中国語の‘说法’は‘shuōfa’と読むと「言い方」「見解」を表す."
    },
    {
      "type": 3,
      "japanese": "説話",
      "hiragana": "せつわ ",
      "meanOfChinese": "故事",
      "chinese": "说话",
      "phonetic": "shuōhuà",
      "chineseMeaning": "中国語の‘说话shuōhuà’は「話す」ことを意味する."
    },
    {
      "type": 3,
      "japanese": "送還",
      "hiragana": "そうかん ",
      "meanOfChinese": "遣返",
      "chinese": "送还",
      "phonetic": "sònghuán",
      "chineseMeaning": "中国語の‘送还sònghuán’は「ものを返す」という意味."
    },
    {
      "type": 3,
      "japanese": "送信",
      "hiragana": "そうしん ",
      "meanOfChinese": "发送",
      "chinese": "送信",
      "phonetic": "sòngxìn",
      "chineseMeaning": "中国語の‘送信sòngxìn’は「手紙を配達する」こと. また‘送信儿sòngxìnr’と発音すれば「知らせる」という意味になる."
    },
    {
      "type": 3,
      "japanese": "俗語",
      "hiragana": "ぞくご ",
      "meanOfChinese": "俚语",
      "chinese": "俗语",
      "phonetic": "súyǔ",
      "chineseMeaning": "中国語の‘俗语súyǔ’は「ことわざ」を表す."
    },
    {
      "type": 3,
      "japanese": "湯",
      "hiragana": "ゆ ",
      "meanOfChinese": "开水",
      "chinese": "汤",
      "phonetic": "tāng",
      "chineseMeaning": "中国語の‘汤tāng’は「スープ」のこと."
    },
    {
      "type": 3,
      "japanese": "特技",
      "hiragana": "とくぎ ",
      "meanOfChinese": "专长",
      "chinese": "特技",
      "phonetic": "tèjì",
      "chineseMeaning": "中国語の‘特技tèjì’は曲芸的な「離れ業」を言う."
    },
    {
      "type": 3,
      "japanese": "特派員",
      "hiragana": "とくはいん ",
      "meanOfChinese": "特派员",
      "chinese": "特派员",
      "phonetic": "tèpàiyuán",
      "chineseMeaning": "中国語の‘特派员tèpàiyuán’は記者に限らず特派された人全般を指す."
    },
    {
      "type": 3,
      "japanese": "特務",
      "hiragana": "とくむ ",
      "meanOfChinese": "特务",
      "chinese": "特务",
      "phonetic": "tèwu",
      "chineseMeaning": "‘特务’は‘tèwu’と軽声に読むと「スパイや諜報員」を指す."
    },
    {
      "type": 3,
      "japanese": "天狗",
      "hiragana": "てんぐ ",
      "meanOfChinese": "自傲的人",
      "chinese": "天狗",
      "phonetic": "tiāngǒu",
      "chineseMeaning": "中国語の‘天狗tiāngǒu’は「神話の犬」である."
    },
    {
      "type": 3,
      "japanese": "天井",
      "hiragana": "てんじょう ",
      "meanOfChinese": "顶棚、天花板",
      "chinese": "天井",
      "phonetic": "tiānjǐng",
      "chineseMeaning": "中国語の‘天井tiānjǐng’は一般的に四方を家の建物に囲まれた「中庭」を指す."
    },
    {
      "type": 3,
      "japanese": "調理",
      "hiragana": "ちょうり ",
      "meanOfChinese": "烹调",
      "chinese": "调理",
      "phonetic": "tiáolǐ",
      "chineseMeaning": "中国語の‘调理tiáolǐ’は「保養する」ことをいう."
    },
    {
      "type": 3,
      "japanese": "体裁",
      "hiragana": "ていさい ",
      "meanOfChinese": "外表",
      "chinese": "体裁",
      "phonetic": "tǐcái",
      "chineseMeaning": "中国語の‘体裁tǐcái’は文学作品の「ジャンル」を指す."
    },
    {
      "type": 3,
      "japanese": "提出",
      "hiragana": "ていしゅつ ",
      "meanOfChinese": "提交",
      "chinese": "提出",
      "phonetic": "tíchū",
      "chineseMeaning": "中国語の‘提出tíchū’は主に「口頭や文書で（要求や意見を）表明する」ことを指す.▸ 提案する 提出建议 tíchū jiànyì "
    },
    {
      "type": 3,
      "japanese": "提携",
      "hiragana": "ていけい ",
      "meanOfChinese": "合作",
      "chinese": "提携",
      "phonetic": "tíxié",
      "chineseMeaning": "中国語の‘提携tíxié’は「手を引いて歩く」こと, 「後進を育てる」ことを指す."
    },
    {
      "type": 3,
      "japanese": "通達",
      "hiragana": "つうたつ ",
      "meanOfChinese": "通告",
      "chinese": "通达",
      "phonetic": "tōngdá",
      "chineseMeaning": "中国語の‘通达tōngdá’は「ものの道理に通じている」ことをいう."
    },
    {
      "type": 3,
      "japanese": "痛恨",
      "hiragana": "つうこん ",
      "meanOfChinese": "痛心",
      "chinese": "痛恨",
      "phonetic": "tònghèn",
      "chineseMeaning": "中国語の‘痛恨tònghèn’は「深く憎む」ことを指す."
    },
    {
      "type": 3,
      "japanese": "投身",
      "hiragana": "とうしん ",
      "meanOfChinese": "投水",
      "chinese": "投身",
      "phonetic": "tóushēn",
      "chineseMeaning": "中国語の‘投身tóushēn’は「運動などに身を投じる」ことを指す."
    },
    {
      "type": 3,
      "japanese": "脱皮",
      "hiragana": "だっぴ ",
      "meanOfChinese": "蜕化",
      "chinese": "脱皮",
      "phonetic": "tuōpí",
      "chineseMeaning": "中国語の‘脱皮tuōpí’は「皮膚がむける」ことをいう."
    },
    {
      "type": 3,
      "japanese": "屠殺",
      "hiragana": "とさつ ",
      "meanOfChinese": "屠宰",
      "chinese": "屠杀",
      "phonetic": "túshā",
      "chineseMeaning": "中国語の‘屠杀túshā’は「虐殺する」こと."
    },
    {
      "type": 3,
      "japanese": "土台",
      "hiragana": "どだい ",
      "meanOfChinese": "foundations",
      "chinese": "土台",
      "phonetic": "tǔtái",
      "chineseMeaning": "中国語の‘土台tǔtái’は「土」のこと.▸ 土砂の崩落事故 土台倒塌事故 tǔtái dǎotā shìgù "
    },
    {
      "type": 3,
      "japanese": "外地",
      "hiragana": "がいち ",
      "meanOfChinese": "国外",
      "chinese": "外地",
      "phonetic": "wàidì",
      "chineseMeaning": "中国語の‘外地wàidì’は「よその土地」のこと."
    },
    {
      "type": 3,
      "japanese": "外人",
      "hiragana": "がいじん ",
      "meanOfChinese": "外国人",
      "chinese": "外人",
      "phonetic": "wàirén",
      "chineseMeaning": "中国語の‘外人wàirén’は「赤の他人」のこと."
    },
    {
      "type": 3,
      "japanese": "腕",
      "hiragana": "うで ",
      "meanOfChinese": "臂膊",
      "chinese": "腕",
      "phonetic": "wàn",
      "chineseMeaning": "中国語の‘腕wàn’は「手首」のこと. なお‘腕儿wànr’というと「業界の大物」を指す.▸ 大スター 大腕儿 dàwànr "
    },
    {
      "type": 3,
      "japanese": "温存",
      "hiragana": "おんぞん ",
      "meanOfChinese": "保存",
      "chinese": "温存",
      "phonetic": "wēncún",
      "chineseMeaning": "中国語の‘温存wēncún’は「異性に対して優しくする」意."
    },
    {
      "type": 3,
      "japanese": "斡旋",
      "hiragana": "あっせん ",
      "meanOfChinese": "介绍",
      "chinese": "斡旋",
      "phonetic": "wòxuán",
      "chineseMeaning": "中国語の‘斡旋wòxuán’は主に書き言葉で「争いを調停する」ことを言う."
    },
    {
      "type": 3,
      "japanese": "無法",
      "hiragana": "むほう ",
      "meanOfChinese": "无赖",
      "chinese": "无法",
      "phonetic": "wúfǎ",
      "chineseMeaning": "中国語の‘无法wúfǎ’は「…のしようがない」という意味."
    },
    {
      "type": 3,
      "japanese": "無論",
      "hiragana": "むろん ",
      "meanOfChinese": "当然",
      "chinese": "无论",
      "phonetic": "wúlùn",
      "chineseMeaning": "中国語の‘无论wúlùn’は「…にかかわらず」「…であろうとあるまいと」という意味."
    },
    {
      "type": 3,
      "japanese": "無心",
      "hiragana": "むしん ",
      "meanOfChinese": "天真",
      "chinese": "无心",
      "phonetic": "wúxīn",
      "chineseMeaning": "中国語の‘无心wúxīn’は「…する気になれない」「何気なく…」という意味."
    },
    {
      "type": 3,
      "japanese": "下落",
      "hiragana": "げらく ",
      "meanOfChinese": "下跌",
      "chinese": "下落",
      "phonetic": "xiàluò",
      "chineseMeaning": "中国語の‘下落xiàluò’は飛行機などが「降下する」という意味に加え, 探している人や物の「行方」「所在」を意味する.▸ 行方不明 下落不明 xiàluò bùmíng "
    },
    {
      "type": 3,
      "japanese": "降伏",
      "hiragana": "こうふく ",
      "meanOfChinese": "降服",
      "chinese": "降伏",
      "phonetic": "xiángfú",
      "chineseMeaning": "中国語の‘降伏xiángfú’は「降伏させる」こと, 「制圧する」ことを指す."
    },
    {
      "type": 3,
      "japanese": "相好",
      "hiragana": "そうごう ",
      "meanOfChinese": "表情",
      "chinese": "相好",
      "phonetic": "xiānghǎo",
      "chineseMeaning": "中国語の‘相好xiānghǎo’は「仲良し」, また「仲がいい」ことを指す."
    },
    {
      "type": 3,
      "japanese": "線路",
      "hiragana": "せんろ ",
      "meanOfChinese": "铁路",
      "chinese": "线路",
      "phonetic": "xiànlù",
      "chineseMeaning": "中国語の‘线路xiànlù’は「路線」のことである."
    },
    {
      "type": 3,
      "japanese": "閑散",
      "hiragana": "かんさん ",
      "meanOfChinese": "冷落",
      "chinese": "闲散",
      "phonetic": "xiánsǎn",
      "chineseMeaning": "中国語の‘闲散xiánsǎn’は「暇でぶらぶらしている」こと, 「ものが利用されていない」ことを言う."
    },
    {
      "type": 3,
      "japanese": "小康",
      "hiragana": "しょうこう ",
      "meanOfChinese": "暂时平稳",
      "chinese": "小康",
      "phonetic": "xiǎokāng",
      "chineseMeaning": "中国語の‘小康xiǎokāng’は家が「比較的裕福である」ことをいう."
    },
    {
      "type": 3,
      "japanese": "小心",
      "hiragana": "しょうしん ",
      "meanOfChinese": "胆小",
      "chinese": "小心",
      "phonetic": "xiǎoxīn",
      "chineseMeaning": "中国語の‘小心xiǎoxīn’は「気をつける」ことを指す."
    },
    {
      "type": 3,
      "japanese": "下品",
      "hiragana": "げひん ",
      "meanOfChinese": "下流",
      "chinese": "下品",
      "phonetic": "xiàpǐn",
      "chineseMeaning": "中国語の‘下品xiàpǐn’は品質や等級が「最下等である」ことを指す."
    },
    {
      "type": 3,
      "japanese": "下手",
      "hiragana": "したて ",
      "meanOfChinese": "下风",
      "chinese": "下手",
      "phonetic": "xiàshǒu",
      "chineseMeaning": "中国語の‘下手xiàshǒu’は「着手する」ことをいう."
    },
    {
      "type": 3,
      "japanese": "下手",
      "hiragana": "へた ",
      "meanOfChinese": "笨拙",
      "chinese": "下手",
      "phonetic": "xiàshǒu",
      "chineseMeaning": "中国語の‘下手xiàshǒu’は「手を付ける」こと."
    },
    {
      "type": 3,
      "japanese": "邪魔",
      "hiragana": "じゃま ",
      "meanOfChinese": "干扰",
      "chinese": "邪魔",
      "phonetic": "xiémó",
      "chineseMeaning": "中国語の‘邪魔xiémó’は「悪魔」のこと."
    },
    {
      "type": 3,
      "japanese": "心得",
      "hiragana": "こころえ ",
      "meanOfChinese": "素养、常识",
      "chinese": "心得",
      "phonetic": "xīndé",
      "chineseMeaning": "中国語の‘心得xīndé’は「学習や実践を通じて体得した知識・収穫」を指す.▸ 学習レポート 学习心得 xuéxí xīndé "
    },
    {
      "type": 3,
      "japanese": "心地",
      "hiragana": "ここち ",
      "meanOfChinese": "心情",
      "chinese": "心地",
      "phonetic": "xīndì",
      "chineseMeaning": "中国語の‘心地xīndì’は「気性」や「気持ち」を意味する."
    },
    {
      "type": 3,
      "japanese": "刑事",
      "hiragana": "けいじ ",
      "meanOfChinese": "刑警",
      "chinese": "刑事",
      "phonetic": "xíngshì",
      "chineseMeaning": "中国語の‘刑事xíngshì’は警察官の役職名としては使われず, 「民事」に対する「刑事」の意味でのみ使われる."
    },
    {
      "type": 3,
      "japanese": "行事",
      "hiragana": "ぎょうじ ",
      "meanOfChinese": "活动",
      "chinese": "行事",
      "phonetic": "xíngshì",
      "chineseMeaning": "中国語の‘行事xíngshì’は「ものごとを処理する」ことを言う."
    },
    {
      "type": 3,
      "japanese": "新手",
      "hiragana": "あらて ",
      "meanOfChinese": "新手法",
      "chinese": "新手",
      "phonetic": "xīnshǒu",
      "chineseMeaning": "中国語の‘新手xīnshǒu’は「新人」「新米」の意."
    },
    {
      "type": 3,
      "japanese": "新聞",
      "hiragana": "しんぶん ",
      "meanOfChinese": "报纸",
      "chinese": "新闻",
      "phonetic": "xīnwén",
      "chineseMeaning": "中国語の‘新闻xīnwén’は「ニュース」のことである.▸ ニュース番組 新闻节目 xīnwén jiémù "
    },
    {
      "type": 3,
      "japanese": "信心",
      "hiragana": "しんじん ",
      "meanOfChinese": "信仰",
      "chinese": "信心",
      "phonetic": "xìnxīn",
      "chineseMeaning": "中国語の‘信心xìnxīn’は「自信」を指す."
    },
    {
      "type": 3,
      "japanese": "兄弟",
      "hiragana": "きょうだい ",
      "meanOfChinese": "兄弟",
      "chinese": "兄弟",
      "phonetic": "xiōngdi",
      "chineseMeaning": "中国語の‘兄弟’は‘xiōngdi’と軽声に読むと「弟」を意味する. ‘xiōngdì’と発音すれば「兄弟」のまま."
    },
    {
      "type": 3,
      "japanese": "戯曲",
      "hiragana": "ぎきょく ",
      "meanOfChinese": "剧本",
      "chinese": "戏曲",
      "phonetic": "xìqǔ",
      "chineseMeaning": "中国語の‘戏曲xìqǔ’は京劇など伝統形式の芝居をいう."
    },
    {
      "type": 3,
      "japanese": "修士",
      "hiragana": "しゅうし ",
      "meanOfChinese": "硕士",
      "chinese": "修士",
      "phonetic": "xiūshì",
      "chineseMeaning": "中国語の‘修士xiūshì’とは「修道士」のこと."
    },
    {
      "type": 3,
      "japanese": "喧嘩",
      "hiragana": "けんか ",
      "meanOfChinese": "打架",
      "chinese": "喧哗",
      "phonetic": "xuānhuá",
      "chineseMeaning": "中国語の‘喧哗xuānhuá’は「騒がしい」ことをいう."
    },
    {
      "type": 3,
      "japanese": "学部",
      "hiragana": "がくぶ ",
      "meanOfChinese": "系",
      "chinese": "学部",
      "phonetic": "xuébù",
      "chineseMeaning": "中国語の‘学部xuébù’とは中国科学院の各分野における諮問機関である."
    },
    {
      "type": 3,
      "japanese": "学長",
      "hiragana": "がくちょう ",
      "meanOfChinese": "大学校长",
      "chinese": "学长",
      "phonetic": "xuézhǎng",
      "chineseMeaning": "中国語の‘学长xuézhǎng’は学校の先輩に対する敬称である."
    },
    {
      "type": 3,
      "japanese": "巡査",
      "hiragana": "じゅんさ ",
      "meanOfChinese": "巡警",
      "chinese": "巡查",
      "phonetic": "xúnchá",
      "chineseMeaning": "中国語の‘巡查xúnchá’は「巡回する」ことを指す."
    },
    {
      "type": 3,
      "japanese": "歯",
      "hiragana": "は ",
      "meanOfChinese": "人的牙",
      "chinese": "牙",
      "phonetic": "yá",
      "chineseMeaning": "日本語では人の歯を「歯」, 動物の犬歯を「牙」として区別するが, 中国語ではすべて区別なく口語で‘牙yá’, 書き言葉で‘牙齿yáchǐ’という. 従って歯を治療する診療科は‘牙科yákē’となる."
    },
    {
      "type": 3,
      "japanese": "演出",
      "hiragana": "えんしゅつ ",
      "meanOfChinese": "导演",
      "chinese": "演出",
      "phonetic": "yǎnchū",
      "chineseMeaning": "中国語の‘演出yǎnchū’は「上演する」ことを指す."
    },
    {
      "type": 3,
      "japanese": "養成",
      "hiragana": "ようせい ",
      "meanOfChinese": "培养",
      "chinese": "养成",
      "phonetic": "yǎngchéng",
      "chineseMeaning": "中国語の‘养成yǎngchéng’は習慣などを「身につける」ことを指す."
    },
    {
      "type": 3,
      "japanese": "洋行",
      "hiragana": "ようこう ",
      "meanOfChinese": "去欧美留学",
      "chinese": "洋行",
      "phonetic": "yángháng",
      "chineseMeaning": "中国語の‘洋行yángháng’は旧時の対外貿易商社, および旧時に外国資本が中国に開いた貿易商社をいう."
    },
    {
      "type": 3,
      "japanese": "洋洋",
      "hiragana": "ようよう ",
      "meanOfChinese": "辽阔",
      "chinese": "洋洋",
      "phonetic": "yángyáng",
      "chineseMeaning": "中国語の‘洋洋yángyáng’は「盛んな様」を表す.▸ 喜びにあふれている 喜洋洋 xǐyángyáng "
    },
    {
      "type": 3,
      "japanese": "眼目",
      "hiragana": "がんもく ",
      "meanOfChinese": "要点",
      "chinese": "眼目",
      "phonetic": "yǎnmù",
      "chineseMeaning": "中国語の‘眼目yǎnmù’は「目」のこと."
    },
    {
      "type": 3,
      "japanese": "顔色",
      "hiragana": "かおいろ ",
      "meanOfChinese": "脸色",
      "chinese": "颜色",
      "phonetic": "yánsè",
      "chineseMeaning": "中国語の‘颜色yánsè’は「色」「色彩」のこと."
    },
    {
      "type": 3,
      "japanese": "言語",
      "hiragana": "げんご ",
      "meanOfChinese": "语言",
      "chinese": "言语",
      "phonetic": "yányu",
      "chineseMeaning": "中国語の‘言语yányu’は‘yuányi’とも読まれ, 否定形で「口をきかない」ことをいう. ‘yányǔ’と読めば「口から出る言葉」を意味する."
    },
    {
      "type": 3,
      "japanese": "妖精",
      "hiragana": "ようせい ",
      "meanOfChinese": "仙女",
      "chinese": "妖精",
      "phonetic": "yāojing",
      "chineseMeaning": "中国語の‘妖精yāojing’は「化け物」や「妖婦」を指す."
    },
    {
      "type": 3,
      "japanese": "薬味",
      "hiragana": "やくみ ",
      "meanOfChinese": "作料",
      "chinese": "药味",
      "phonetic": "yàowèi",
      "chineseMeaning": "中国語の‘药味yàowèi’は「薬の味やにおい」のこと."
    },
    {
      "type": 3,
      "japanese": "要員",
      "hiragana": "よういん ",
      "meanOfChinese": "人员",
      "chinese": "要员",
      "phonetic": "yàoyuán",
      "chineseMeaning": "中国語の‘要员yàoyuán’は「要人」を指す."
    },
    {
      "type": 3,
      "japanese": "一旦",
      "hiragana": "いったん ",
      "meanOfChinese": "once",
      "chinese": "一旦",
      "phonetic": "yídàn",
      "chineseMeaning": "中国語の‘一旦yídàn’は四字句中では「一瞬」を意味する.▸ 会社が百年かけて築いた信用と名声が一瞬で失われた 公司的百年信誉毁于一旦 gōngsī de bǎi nián xìnyù huǐyú yídàn "
    },
    {
      "type": 3,
      "japanese": "依頼",
      "hiragana": "いらい ",
      "meanOfChinese": "委托",
      "chinese": "依赖",
      "phonetic": "yīlài",
      "chineseMeaning": "中国語の‘依赖yīlài’とは「頼る」こと."
    },
    {
      "type": 3,
      "japanese": "引導",
      "hiragana": "いんどう ",
      "meanOfChinese": "引导死者往生净土",
      "chinese": "引导",
      "phonetic": "yǐndǎo",
      "chineseMeaning": "中国語の‘引导yǐndǎo’は「引率する」ことである."
    },
    {
      "type": 3,
      "japanese": "応酬",
      "hiragana": "おうしゅう ",
      "meanOfChinese": "say in retort",
      "chinese": "应酬",
      "phonetic": "yìngchou",
      "chineseMeaning": "中国語の‘应酬yìngchou’は「人づきあい」「応対すること」を指す."
    },
    {
      "type": 3,
      "japanese": "隠居",
      "hiragana": "いんきょ ",
      "meanOfChinese": "养老",
      "chinese": "隐居",
      "phonetic": "yǐnjū",
      "chineseMeaning": "中国語の‘隐居yǐnjū’は政治的あるいは思想的理由から「隠棲する」こと."
    },
    {
      "type": 3,
      "japanese": "意思",
      "hiragana": "いし ",
      "meanOfChinese": "意见",
      "chinese": "意思",
      "phonetic": "yìsi",
      "chineseMeaning": "中国語の‘意思yìsi’は「意味」のこと."
    },
    {
      "type": 3,
      "japanese": "一同",
      "hiragana": "いちどう ",
      "meanOfChinese": "全体",
      "chinese": "一同",
      "phonetic": "yìtóng",
      "chineseMeaning": "中国語の‘一同yìtóng’は「一緒に」という意味."
    },
    {
      "type": 3,
      "japanese": "一向",
      "hiragana": "いっこう ",
      "meanOfChinese": "一点儿也",
      "chinese": "一向",
      "phonetic": "yíxiàng",
      "chineseMeaning": "中国語の‘一向yíxiàng’は「かねてから」の意味."
    },
    {
      "type": 3,
      "japanese": "一応",
      "hiragana": "いちおう ",
      "meanOfChinese": "基本上",
      "chinese": "一应",
      "phonetic": "yìyīng",
      "chineseMeaning": "中国語の‘一应yìyīng’は「すべて」を意味する."
    },
    {
      "type": 3,
      "japanese": "用心",
      "hiragana": "ようじん ",
      "meanOfChinese": "留神",
      "chinese": "用心",
      "phonetic": "yòngxīn",
      "chineseMeaning": "中国語の‘用心yòngxīn’は「心をこめる」「身を入れる」ことをいう.▸ 注意深く観察する 用心观察 yòngxīn guānchá "
    },
    {
      "type": 3,
      "japanese": "用意",
      "hiragana": "ようい ",
      "meanOfChinese": "准备",
      "chinese": "用意",
      "phonetic": "yòngyì",
      "chineseMeaning": "中国語の‘用意yòngyì’は「意図」のこと."
    },
    {
      "type": 3,
      "japanese": "柚",
      "hiragana": "ユズ ",
      "meanOfChinese": "香橙",
      "chinese": "柚",
      "phonetic": "yòu",
      "chineseMeaning": "中国語の‘柚yòu’は「ザボン, ボンタン」のこと."
    },
    {
      "type": 3,
      "japanese": "有数",
      "hiragana": "ゆうすう ",
      "meanOfChinese": "屈指可数",
      "chinese": "有数",
      "phonetic": "yǒushù",
      "chineseMeaning": "中国語の‘有数yǒushù’は「よく分かっている」こと, 「見通しが立っている」ことを指す."
    },
    {
      "type": 3,
      "japanese": "縁故",
      "hiragana": "えんこ ",
      "meanOfChinese": "关系",
      "chinese": "缘故",
      "phonetic": "yuángù",
      "chineseMeaning": "中国語の‘缘故yuángù’は「原因」「理由」という意味である."
    },
    {
      "type": 3,
      "japanese": "遠慮",
      "hiragana": "えんりょ ",
      "meanOfChinese": "辞让、谢绝",
      "chinese": "远虑",
      "phonetic": "yuǎnlǜ",
      "chineseMeaning": "中国語の‘远虑yuǎnlǜ’は「先々の考え」を意味する."
    },
    {
      "type": 3,
      "japanese": "浴場",
      "hiragana": "よくじょう ",
      "meanOfChinese": "浴池、澡堂",
      "chinese": "浴场",
      "phonetic": "yùchǎng",
      "chineseMeaning": "中国語の‘浴场yùchǎng’は屋外の遊泳場を指す."
    },
    {
      "type": 3,
      "japanese": "約束",
      "hiragana": "やくそく ",
      "meanOfChinese": "诺言",
      "chinese": "约束",
      "phonetic": "yuēshù",
      "chineseMeaning": "中国語の‘约束yuēshù’は「束縛する」こと."
    },
    {
      "type": 3,
      "japanese": "運転",
      "hiragana": "うんてん ",
      "meanOfChinese": "驾驶",
      "chinese": "运转",
      "phonetic": "yùnzhuǎn",
      "chineseMeaning": "中国語の‘运转yùnzhuǎn’は衛星などが「軌道上を回る」, 機械が「回転する」, 仕事などが「回る」ことを指す."
    },
    {
      "type": 3,
      "japanese": "在外",
      "hiragana": "ざいがい ",
      "meanOfChinese": "在国外",
      "chinese": "在外",
      "phonetic": "zàiwài",
      "chineseMeaning": "中国語の‘在外zàiwài’は「不在である」「…を除く」という意味である."
    },
    {
      "type": 3,
      "japanese": "造成",
      "hiragana": "ぞうせい ",
      "meanOfChinese": "develop",
      "chinese": "造成",
      "phonetic": "zàochéng",
      "chineseMeaning": "中国語の‘造成zàochéng’は「結果をもたらす」ことを指す."
    },
    {
      "type": 3,
      "japanese": "造作",
      "hiragana": "ぞうさく ",
      "meanOfChinese": "装修",
      "chinese": "造作",
      "phonetic": "zàozuò",
      "chineseMeaning": "中国語の‘造作zàozuò’は「わざとらしいことをする」の意味."
    },
    {
      "type": 3,
      "japanese": "雑文",
      "hiragana": "ざつぶん ",
      "meanOfChinese": "小文章",
      "chinese": "杂文",
      "phonetic": "záwén",
      "chineseMeaning": "中国の‘杂文záwén’は文芸形式の一つ. 戦闘性を帯びた社会時評を主たる内容とする."
    },
    {
      "type": 3,
      "japanese": "増長",
      "hiragana": "ぞうちょう ",
      "meanOfChinese": "滋长",
      "chinese": "增长",
      "phonetic": "zēngzhǎng",
      "chineseMeaning": "中国語の‘增长zēngzhǎng’は「増大させる」ことを指す."
    },
    {
      "type": 3,
      "japanese": "丈夫",
      "hiragana": "じょうぶ ",
      "meanOfChinese": "健康",
      "chinese": "丈夫",
      "phonetic": "zhàngfu",
      "chineseMeaning": "中国語の‘丈夫zhàngfu’は「夫」を指す."
    },
    {
      "type": 3,
      "japanese": "兆",
      "hiragana": "ちょう ",
      "meanOfChinese": "（1）兆头 （2）万亿",
      "chinese": "兆",
      "phonetic": "zhào",
      "chineseMeaning": "現代中国では, ‘兆zhào’は「メガ」（100万倍の意）を表す.→ メガ"
    },
    {
      "type": 3,
      "japanese": "照会",
      "hiragana": "しょうかい ",
      "meanOfChinese": "询问",
      "chinese": "照会",
      "phonetic": "zhàohuì",
      "chineseMeaning": "中国語の‘照会zhàohuì’は「外交上の覚書」をいう."
    },
    {
      "type": 3,
      "japanese": "招致",
      "hiragana": "しょうち ",
      "meanOfChinese": "聘请",
      "chinese": "招致",
      "phonetic": "zhāozhì",
      "chineseMeaning": "中国語の‘招致zhāozhì’は「ある結果を引き起こす」「人材を求める」という意味である."
    },
    {
      "type": 3,
      "japanese": "正当",
      "hiragana": "せいとう ",
      "meanOfChinese": "合理",
      "chinese": "正当",
      "phonetic": "zhèngdāng",
      "chineseMeaning": "中国語の‘正当’は‘zhèngdāng’と読めば「ちょうど…の時に当たる」という意味になる."
    },
    {
      "type": 3,
      "japanese": "正気",
      "hiragana": "しょうき ",
      "meanOfChinese": "头脑清醒",
      "chinese": "正气",
      "phonetic": "zhèngqì",
      "chineseMeaning": "中国語の‘正气zhèngqì’は「正しい気風」を指す."
    },
    {
      "type": 3,
      "japanese": "正月",
      "hiragana": "しょうがつ ",
      "meanOfChinese": "正月",
      "chinese": "正月",
      "phonetic": "Zhēngyuè",
      "chineseMeaning": "中国語の‘正月Zhēngyuè’は「旧暦の元日」を指す. ‘Zhèngyuè’ではないことに注意."
    },
    {
      "type": 3,
      "japanese": "質問",
      "hiragana": "しつもん ",
      "meanOfChinese": "提问",
      "chinese": "质问",
      "phonetic": "zhìwèn",
      "chineseMeaning": "中国語の‘质问zhìwèn’は「詰問する」ことを指す."
    },
    {
      "type": 3,
      "japanese": "指摘",
      "hiragana": "してき ",
      "meanOfChinese": "指出",
      "chinese": "指摘",
      "phonetic": "zhǐzhāi",
      "chineseMeaning": "中国語の‘指摘zhǐzhāi’は「誤りを指摘し非難する」ことをいう."
    },
    {
      "type": 3,
      "japanese": "重責",
      "hiragana": "じゅうせき ",
      "meanOfChinese": "重任",
      "chinese": "重责",
      "phonetic": "zhòngzé",
      "chineseMeaning": "中国語の‘重责zhòngzé’は「厳しく処罰する」こと."
    },
    {
      "type": 3,
      "japanese": "重鎮",
      "hiragana": "じゅうちん ",
      "meanOfChinese": "重要人物",
      "chinese": "重镇",
      "phonetic": "zhòngzhèn",
      "chineseMeaning": "中国語の‘重镇zhòngzhèn’は軍事・経済などで「重要な都市」のこと."
    },
    {
      "type": 3,
      "japanese": "壮大",
      "hiragana": "そうだい ",
      "meanOfChinese": "宏伟",
      "chinese": "壮大",
      "phonetic": "zhuàngdà",
      "chineseMeaning": "中国語の‘壮大zhuàngdà’は「強大になる」ことをいう."
    },
    {
      "type": 3,
      "japanese": "転身",
      "hiragana": "てんしん ",
      "meanOfChinese": "改变职业",
      "chinese": "转身",
      "phonetic": "zhuǎnshēn",
      "chineseMeaning": "中国語の‘转身zhuǎnshēn’は「体の向きを変える」ことをいう."
    },
    {
      "type": 3,
      "japanese": "着実",
      "hiragana": "ちゃくじつ ",
      "meanOfChinese": "塌实、稳步",
      "chinese": "着实",
      "phonetic": "zhuóshí",
      "chineseMeaning": "中国語の‘着实zhuóshí’は「確かに」「こっぴどく」という意味である."
    },
    {
      "type": 3,
      "japanese": "着想",
      "hiragana": "ちゃくそう ",
      "meanOfChinese": "设想",
      "chinese": "着想",
      "phonetic": "zhuóxiǎng",
      "chineseMeaning": "中国語の‘着想zhuóxiǎng’は前置詞‘为wèi’などとともに使われ「…のためを思う」という意味になる."
    },
    {
      "type": 3,
      "japanese": "注文",
      "hiragana": "ちゅうもん ",
      "meanOfChinese": "订购",
      "chinese": "注文",
      "phonetic": "zhùwén",
      "chineseMeaning": "中国語の‘注文zhùwén’はテキストに加えられた「注釈」のこと."
    },
    {
      "type": 3,
      "japanese": "主宰",
      "hiragana": "しゅさい ",
      "meanOfChinese": "主持",
      "chinese": "主宰",
      "phonetic": "zhǔzǎi",
      "chineseMeaning": "中国語の‘主宰zhǔzǎi’は「支配すること」および「支配する者」."
    },
    {
      "type": 3,
      "japanese": "左右",
      "hiragana": "さゆう ",
      "meanOfChinese": "（1）左右侧（2）支配",
      "chinese": "左右",
      "phonetic": "zuǒyòu",
      "chineseMeaning": "中国語の‘左右zuǒyòu’は数量の後につくと「…くらい」という意味を表す."
    },
    {
      "type": 1,
      "japanese": "曖昧",
      "hiragana": "あいまい ",
      "meanOfChinese": "含糊",
      "chinese": "暧昧",
      "phonetic": "àimèi",
      "chineseMeaning": "中国語の‘暧昧àimèi’は「明確さに欠ける」という意味の他, 「男女関係が疑われる」という意味にも使う."
    },
    {
      "type": 1,
      "japanese": "安心",
      "hiragana": "あんしん ",
      "meanOfChinese": "放心",
      "chinese": "安心",
      "phonetic": "ānxīn",
      "chineseMeaning": "中国語の‘安心ānxīn’は「心が落ち着く」という意味の他「下心を持つ」意味にも使われる.▸ どんな魂胆なのだ？ 安的是什么心？ ān de shì shénme xīn？ "
    },
    {
      "type": 1,
      "japanese": "白地",
      "hiragana": "しろじ ",
      "meanOfChinese": "白地",
      "chinese": "白地",
      "phonetic": "báidì",
      "chineseMeaning": "中国語の‘白地báidì’は「作付けをしていない田畑」をも意味する."
    },
    {
      "type": 1,
      "japanese": "班",
      "hiragana": "はん ",
      "meanOfChinese": "小组",
      "chinese": "班",
      "phonetic": "bān",
      "chineseMeaning": "中国語の‘班bān’は「クラス」をも指す.▸ 2年1組 二年级一班 èr niánjí yì bān "
    },
    {
      "type": 1,
      "japanese": "爆発",
      "hiragana": "ばくはつ ",
      "meanOfChinese": "爆炸",
      "chinese": "爆发",
      "phonetic": "bàofā",
      "chineseMeaning": "中国語の‘爆发bàofā’は「爆発する」他に事件が「勃発する」ことをも指す."
    },
    {
      "type": 1,
      "japanese": "包括",
      "hiragana": "ほうかつ ",
      "meanOfChinese": "包括",
      "chinese": "包括",
      "phonetic": "bāokuò",
      "chineseMeaning": "中国語の‘包括bāokuò’は「包括する」の他に, ある範囲の中に「含む」ことをも意味する.▸ 私も含めて… 也包括我自已 yě bāokuò wǒ zìjǐ "
    },
    {
      "type": 1,
      "japanese": "保留",
      "hiragana": "ほりゅう ",
      "meanOfChinese": "保留",
      "chinese": "保留",
      "phonetic": "bǎoliú",
      "chineseMeaning": "中国語の‘保留bǎoliú’は「保留する」他に「原状を保つ」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "保険",
      "hiragana": "ほけん ",
      "meanOfChinese": "保险行业",
      "chinese": "保险",
      "phonetic": "bǎoxiǎn",
      "chineseMeaning": "中国語の‘保险bǎoxiǎn’は「保険」の他に「安全確実である」ことをもいう.▸ (小型)金庫 保险箱 bǎoxiǎnxiāng "
    },
    {
      "type": 1,
      "japanese": "保養",
      "hiragana": "ほよう ",
      "meanOfChinese": "保养",
      "chinese": "保养",
      "phonetic": "bǎoyǎng",
      "chineseMeaning": "中国語の‘保养bǎoyǎng’は「保養する」他に「手入れする」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "本土",
      "hiragana": "ほんど ",
      "meanOfChinese": "本土",
      "chinese": "本土",
      "phonetic": "běntǔ",
      "chineseMeaning": "中国語の‘本土běntǔ’は「主な国土」の他に「郷里」のことを意味する."
    },
    {
      "type": 1,
      "japanese": "本文",
      "hiragana": "ほんもん ",
      "meanOfChinese": "本文",
      "chinese": "本文",
      "phonetic": "běnwén",
      "chineseMeaning": "中国語の‘本文běnwén’は「主な文章」「元の文章」の他に「この文章」という意味をも持つ."
    },
    {
      "type": 1,
      "japanese": "標榜",
      "hiragana": "ひょうぼう ",
      "meanOfChinese": "标榜",
      "chinese": "标榜",
      "phonetic": "biāobǎng",
      "chineseMeaning": "中国語の‘标榜biāobǎng’は「標榜する」他に「吹聴する」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "表現",
      "hiragana": "ひょうげん ",
      "meanOfChinese": "表达",
      "chinese": "表现",
      "phonetic": "biǎoxiàn",
      "chineseMeaning": "中国語の‘表现biǎoxiàn’は「表現する」という意味の他に「態度」「行動」という意味もある."
    },
    {
      "type": 1,
      "japanese": "閉塞",
      "hiragana": "へいそく ",
      "meanOfChinese": "闭塞",
      "chinese": "闭塞",
      "phonetic": "bìsè",
      "chineseMeaning": "中国語の‘闭塞bìsè’は「閉じられた状態」の他に「交通が不便である」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "不用",
      "hiragana": "ふよう ",
      "meanOfChinese": "不需要",
      "chinese": "不用",
      "phonetic": "bú yòng",
      "chineseMeaning": "中国語の‘不用bú yòng’は「…しなくてよい」という意味にもなる. また‘不要bú yào’は「…してはならない」という意味にもなる."
    },
    {
      "type": 1,
      "japanese": "不時",
      "hiragana": "ふじ ",
      "meanOfChinese": "不时",
      "chinese": "不时",
      "phonetic": "bùshí",
      "chineseMeaning": "中国語の‘不时bùshí’は「思いがけない時」の他に「たびたび」という意味をも持つ."
    },
    {
      "type": 1,
      "japanese": "料理",
      "hiragana": "りょうり ",
      "meanOfChinese": "菜",
      "chinese": "料理",
      "phonetic": "cài",
      "chineseMeaning": "「料理」を中国語では一般に‘菜cài’という. 新語として日本語から‘料理liàolǐ’という単語も入っているが, まだ一般的ではない. 中国語の‘料理liàolǐ’は基本的には動詞で, 「ものごとを処理する」という意味."
    },
    {
      "type": 1,
      "japanese": "菜",
      "hiragana": "な ",
      "meanOfChinese": "青菜",
      "chinese": "菜",
      "phonetic": "cài",
      "chineseMeaning": "中国語の‘菜cài’は「野菜」の他「料理」をも指す."
    },
    {
      "type": 1,
      "japanese": "材料",
      "hiragana": "ざいりょう ",
      "meanOfChinese": "原料",
      "chinese": "材料",
      "phonetic": "cáiliào",
      "chineseMeaning": "中国語の‘材料cáiliào’は「資材」「題材」という意味のほかに「適役」という意味も有する."
    },
    {
      "type": 1,
      "japanese": "策略",
      "hiragana": "さくりゃく ",
      "meanOfChinese": "策略",
      "chinese": "策略",
      "phonetic": "cèlüè",
      "chineseMeaning": "中国語の‘策略cèlüè’は「はかりごと」という意味の他に形容詞として「機転がきく」ことをも表す."
    },
    {
      "type": 1,
      "japanese": "産業",
      "hiragana": "さんぎょう ",
      "meanOfChinese": "产业",
      "chinese": "产业",
      "phonetic": "chǎnyè",
      "chineseMeaning": "中国語の‘产业chǎnyè’は「商品・サービスを提供するための経済活動」という意味の他に「資産」の意味にもなる."
    },
    {
      "type": 1,
      "japanese": "成分",
      "hiragana": "せいぶん ",
      "meanOfChinese": "成分",
      "chinese": "成分",
      "phonetic": "chéngfen",
      "chineseMeaning": "中国語の‘成分chéngfen’は「構成している要素」という意味の他に, 出身家庭の「階級区分」（貧農, 労働者, 地主, 資本家など）をも意味する."
    },
    {
      "type": 1,
      "japanese": "城郭",
      "hiragana": "じょうかく ",
      "meanOfChinese": "城郭",
      "chinese": "城郭",
      "phonetic": "chéngguō",
      "chineseMeaning": "中国語の‘城郭chéngguō’は「都市」をも言う."
    },
    {
      "type": 1,
      "japanese": "成年",
      "hiragana": "せいねん ",
      "meanOfChinese": "成年",
      "chinese": "成年",
      "phonetic": "chéngnián",
      "chineseMeaning": "中国語の‘成年chéngnián’は「一人前と認められる年齢」という意味の他に「一年中」という意味も持つ."
    },
    {
      "type": 1,
      "japanese": "伝票",
      "hiragana": "でんぴょう ",
      "meanOfChinese": "发票",
      "chinese": "传票",
      "phonetic": "chuánpiào",
      "chineseMeaning": "中国語の‘传票chuánpiào’は「会計伝票」の他に「召喚状」をも意味する."
    },
    {
      "type": 1,
      "japanese": "出口",
      "hiragana": "でぐち ",
      "meanOfChinese": "出口",
      "chinese": "出口",
      "phonetic": "chūkǒu",
      "chineseMeaning": "中国語の‘出口chūkǒu’は「外へ出るところ」という意味の他に「輸出する」ことをも意味する."
    },
    {
      "type": 1,
      "japanese": "処理",
      "hiragana": "しょり ",
      "meanOfChinese": "处理、对付、办理",
      "chinese": "处理",
      "phonetic": "chǔlǐ",
      "chineseMeaning": "中国語の‘处理chǔlǐ’には「物事をさばいて始末をつける」という意味の他に「安く売り払う」という意味もある."
    },
    {
      "type": 1,
      "japanese": "初恋",
      "hiragana": "はつこい ",
      "meanOfChinese": "初恋",
      "chinese": "初恋",
      "phonetic": "chūliàn",
      "chineseMeaning": "中国語の‘初恋chūliàn’には「初めての恋」の他に「恋愛の初期」という意味もある."
    },
    {
      "type": 1,
      "japanese": "大敗",
      "hiragana": "たいはい ",
      "meanOfChinese": "大败",
      "chinese": "大败",
      "phonetic": "dàbài",
      "chineseMeaning": "中国語の‘大败dàbài’には「大差で負ける」という意味の他に「徹底的に打ち負かす」という意味もある."
    },
    {
      "type": 1,
      "japanese": "達成",
      "hiragana": "たっせい ",
      "meanOfChinese": "成就",
      "chinese": "达成",
      "phonetic": "dáchéng",
      "chineseMeaning": "中国語の‘达成dáchéng’には「なしとげる」という意味の他に「協議などがまとまる」という意味もある."
    },
    {
      "type": 1,
      "japanese": "単純",
      "hiragana": "たんじゅん ",
      "meanOfChinese": "单纯、简单",
      "chinese": "单纯",
      "phonetic": "dānchún",
      "chineseMeaning": "中国語の‘单纯dānchún’は「込み入っていない」という意味の他に「ただ単に」という意味ももつ."
    },
    {
      "type": 1,
      "japanese": "単位",
      "hiragana": "たんい ",
      "meanOfChinese": "单位",
      "chinese": "单位",
      "phonetic": "dānwèi",
      "chineseMeaning": "中国語の‘单位dānwèi’は「基準とする量」の他に「勤務先」をもいう."
    },
    {
      "type": 1,
      "japanese": "大事",
      "hiragana": "だいじ ",
      "meanOfChinese": "要紧",
      "chinese": "大事",
      "phonetic": "dàshì",
      "chineseMeaning": "中国語の‘大事dàshì’は「重大な事柄」という意味の他に「大々的に」という副詞の意味もある."
    },
    {
      "type": 1,
      "japanese": "大作",
      "hiragana": "たいさく ",
      "meanOfChinese": "大作",
      "chinese": "大作",
      "phonetic": "dàzuò",
      "chineseMeaning": "中国語の‘大作dàzuò’には「大型の作品」という意味の他に, 敬称としての「御著書」と「大いに起こる」という二つの意味もある."
    },
    {
      "type": 1,
      "japanese": "登録",
      "hiragana": "とうろく ",
      "meanOfChinese": "登记",
      "chinese": "登录",
      "phonetic": "dēnglù",
      "chineseMeaning": "中国語の‘登录dēnglù’には「帳簿に載せる」という意味の他に「ログインする」という意味もある."
    },
    {
      "type": 1,
      "japanese": "調子",
      "hiragana": "ちょうし ",
      "meanOfChinese": "（1）音调（2）状态",
      "chinese": "调子",
      "phonetic": "diàozi",
      "chineseMeaning": "中国語の‘调子diàozi’は「音調」以外に「メロディー」や「口調」をも指す."
    },
    {
      "type": 1,
      "japanese": "第三者",
      "hiragana": "だいさんしゃ ",
      "meanOfChinese": "第三者",
      "chinese": "第三者",
      "phonetic": "dìsānzhě",
      "chineseMeaning": "中国語の‘第三者dìsānzhě’には「不倫相手」の意味もある."
    },
    {
      "type": 1,
      "japanese": "動静",
      "hiragana": "どうせい ",
      "meanOfChinese": "动态",
      "chinese": "动静",
      "phonetic": "dòngjìng",
      "chineseMeaning": "中国語の‘动静dòngjìng’には「活動の様子」という意味の他に「物音」という意味もある."
    },
    {
      "type": 1,
      "japanese": "東西",
      "hiragana": "とうざい ",
      "meanOfChinese": "东西",
      "chinese": "东西",
      "phonetic": "dōngxi",
      "chineseMeaning": "中国語の‘东西’は‘dōngxi’と軽声に読むと「物」という意味になる. また「こいつ」「あやつ」など人間にも使う."
    },
    {
      "type": 1,
      "japanese": "対象",
      "hiragana": "たいしょう ",
      "meanOfChinese": "对象",
      "chinese": "对象",
      "phonetic": "duìxiàng",
      "chineseMeaning": "中国語の‘对象duìxiàng’は「めあて」という意味の他に「結婚相手」という意味もある."
    },
    {
      "type": 1,
      "japanese": "発揮",
      "hiragana": "はっき ",
      "meanOfChinese": "发挥",
      "chinese": "发挥",
      "phonetic": "fāhuī",
      "chineseMeaning": "中国語の‘发挥fāhuī’は「発揮する」他に理論や思考を「展開する」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "発火",
      "hiragana": "はっか ",
      "meanOfChinese": "起火",
      "chinese": "发火",
      "phonetic": "fāhuǒ",
      "chineseMeaning": "中国語の‘发火fāhuǒ’は「発火する」他に「怒る」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "放置",
      "hiragana": "ほうち ",
      "meanOfChinese": "搁置",
      "chinese": "放置",
      "phonetic": "fàngzhì",
      "chineseMeaning": "中国語の‘放置fàngzhì’は「放置する」の他に, 単に「置く」ことも意味する."
    },
    {
      "type": 1,
      "japanese": "翻訳",
      "hiragana": "ほんやく ",
      "meanOfChinese": "翻译",
      "chinese": "翻译",
      "phonetic": "fānyì",
      "chineseMeaning": "中国語の‘翻译fānyì’は「通訳」「通訳する」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "発作",
      "hiragana": "ほっさ ",
      "meanOfChinese": "发作",
      "chinese": "发作",
      "phonetic": "fāzuò",
      "chineseMeaning": "中国語の‘发作fāzuò’は「症状が突発的に起こる」他に「かんしゃくを起こす」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "肥大",
      "hiragana": "ひだい ",
      "meanOfChinese": "肥大",
      "chinese": "肥大",
      "phonetic": "féidà",
      "chineseMeaning": "中国語の‘肥大féidà’は「異常に大きくなる」という意味の他に, 服のサイズが「大きすぎる」という意味をも持つ."
    },
    {
      "type": 1,
      "japanese": "風格",
      "hiragana": "ふうかく ",
      "meanOfChinese": "风格",
      "chinese": "风格",
      "phonetic": "fēnggé",
      "chineseMeaning": "中国語の‘风格fēnggé’は人や店などの「品格」以外に芸術上の「個性」をも指す."
    },
    {
      "type": 1,
      "japanese": "風化",
      "hiragana": "ふうか ",
      "meanOfChinese": "风化",
      "chinese": "风化",
      "phonetic": "fēnghuà",
      "chineseMeaning": "中国語の‘风化fēnghuà’は「風化する」他に「よい風俗」をも意味する."
    },
    {
      "type": 1,
      "japanese": "風流",
      "hiragana": "ふうりゅう ",
      "meanOfChinese": "风雅",
      "chinese": "风流",
      "phonetic": "fēngliú",
      "chineseMeaning": "中国語の‘风流fēngliú’は「優雅である」「趣がある」他に「人物が傑出している」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "分解",
      "hiragana": "ぶんかい ",
      "meanOfChinese": "分解",
      "chinese": "分解",
      "phonetic": "fēnjiě",
      "chineseMeaning": "中国語の‘分解fēnjiě’は「分解する」他に「調停する」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "分配",
      "hiragana": "ぶんぱい ",
      "meanOfChinese": "分配",
      "chinese": "分配",
      "phonetic": "fēnpèi",
      "chineseMeaning": "中国語の‘分配fēnpèi’は「分配する」意味の他に「配属する」こと, 「割り当てる」ことをも意味する."
    },
    {
      "type": 1,
      "japanese": "浮動",
      "hiragana": "ふどう ",
      "meanOfChinese": "浮动",
      "chinese": "浮动",
      "phonetic": "fúdòng",
      "chineseMeaning": "中国語の‘浮动fúdòng’は「漂って動く」「揺れ動く」他に「上下に変動する」ことをもいう.▸ 変動為替相場制 浮动汇率制度 fúdòng huìlǜ zhìdù "
    },
    {
      "type": 1,
      "japanese": "改装",
      "hiragana": "かいそう ",
      "meanOfChinese": "改装",
      "chinese": "改装",
      "phonetic": "gǎizhuāng",
      "chineseMeaning": "中国語の‘改装gǎizhuāng’は「模様替え」という意味の他, 「身なりや化粧, 物の包装を変える」ことをも言う."
    },
    {
      "type": 1,
      "japanese": "感情",
      "hiragana": "かんじょう ",
      "meanOfChinese": "情感",
      "chinese": "感情",
      "phonetic": "gǎnqíng",
      "chineseMeaning": "中国語の‘感情gǎnqíng’は人や物に対する「情愛」をも表す."
    },
    {
      "type": 1,
      "japanese": "感染",
      "hiragana": "かんせん ",
      "meanOfChinese": "传染、沾染",
      "chinese": "感染",
      "phonetic": "gǎnrǎn",
      "chineseMeaning": "中国語の‘感染gǎnrǎn’は「病気がうつる」という意味の他, 「共感を呼ぶ」という意味でも使われる."
    },
    {
      "type": 1,
      "japanese": "工芸",
      "hiragana": "こうげい ",
      "meanOfChinese": "手工艺",
      "chinese": "工艺",
      "phonetic": "gōngyì",
      "chineseMeaning": "中国語の‘工艺gōngyì’は「美術的な作品を作ること」という意味の他に「工業技術」をも指す."
    },
    {
      "type": 1,
      "japanese": "広大",
      "hiragana": "こうだい ",
      "meanOfChinese": "浩瀚",
      "chinese": "广大",
      "phonetic": "guǎngdà",
      "chineseMeaning": "中国語の‘广大guǎngdà’は「広く大きい」という意味の他に「人数がおびただしい」という意味も持つ."
    },
    {
      "type": 1,
      "japanese": "規律",
      "hiragana": "きりつ ",
      "meanOfChinese": "规律",
      "chinese": "规律",
      "phonetic": "guīlǜ",
      "chineseMeaning": "中国語の‘规律guīlǜ’には「行為の基準」という意味の他に「法則」「（生活などの）習慣, リズム」の意味がある."
    },
    {
      "type": 1,
      "japanese": "固執",
      "hiragana": "こしつ ",
      "meanOfChinese": "固执",
      "chinese": "固执",
      "phonetic": "gùzhí",
      "chineseMeaning": "中国語の‘固执gùzhí’は「自分の考えにこだわる」という意味の他に「頑固である」という意味もある."
    },
    {
      "type": 1,
      "japanese": "花",
      "hiragana": "はな ",
      "meanOfChinese": "花、插花、精华",
      "chinese": "花",
      "phonetic": "huā",
      "chineseMeaning": "中国語の‘花huā’は草木の「花」の他に, 動詞として時間や金銭を「使う」ことをも指す."
    },
    {
      "type": 1,
      "japanese": "荒廃",
      "hiragana": "こうはい ",
      "meanOfChinese": "荒芜",
      "chinese": "荒废",
      "phonetic": "huāngfèi",
      "chineseMeaning": "中国語の‘荒废huāngfèi’には「すさむ」という意味の他に「勉強などをおろそかにする」という意味もある."
    },
    {
      "type": 1,
      "japanese": "黄色",
      "hiragana": "きいろ ",
      "meanOfChinese": "黄颜色",
      "chinese": "黄色",
      "phonetic": "huángsè",
      "chineseMeaning": "中国語の‘黄色huángsè’は「堕落した」「ポルノの」という意味の形容詞にもなる.▸ ポルノサイト 黄色网站 huángsè wǎngzhàn "
    },
    {
      "type": 1,
      "japanese": "花瓶",
      "hiragana": "かびん ",
      "meanOfChinese": "花瓶",
      "chinese": "花瓶",
      "phonetic": "huāpíng",
      "chineseMeaning": "中国語の‘花瓶huāpíng’は「花をさす器」という意味の他, 「お飾りとしての女性や物」の意味も持つ."
    },
    {
      "type": 1,
      "japanese": "回復",
      "hiragana": "かいふく ",
      "meanOfChinese": "恢复",
      "chinese": "回复",
      "phonetic": "huífù",
      "chineseMeaning": "中国語の‘回复huífù’は「よい状態に戻る」という意味の他, 「文書で回答する」ことをも言う."
    },
    {
      "type": 1,
      "japanese": "活動",
      "hiragana": "かつどう ",
      "meanOfChinese": "行动",
      "chinese": "活动",
      "phonetic": "huódòng",
      "chineseMeaning": "中国語の‘活动huódòng’には「積極的に行動する」という意味の他, 「健康のため体を動かす」という意味もある."
    },
    {
      "type": 1,
      "japanese": "火星",
      "hiragana": "かせい ",
      "meanOfChinese": "火星",
      "chinese": "火星",
      "phonetic": "huǒxīng",
      "chineseMeaning": "中国語の‘火星huǒxīng’には「天体の火星」以外に「火花」や「火の粉」という意味もある."
    },
    {
      "type": 1,
      "japanese": "検査",
      "hiragana": "けんさ ",
      "meanOfChinese": "检查",
      "chinese": "检查",
      "phonetic": "jiǎnchá",
      "chineseMeaning": "中国語の‘检查jiǎnchá’は「注意して調べる」という意味の他に「自己批判する」という意味も持つ."
    },
    {
      "type": 1,
      "japanese": "健全",
      "hiragana": "けんぜん ",
      "meanOfChinese": "健康",
      "chinese": "健全",
      "phonetic": "jiànquán",
      "chineseMeaning": "中国語の‘健全jiànquán’は「元気である」「堅実である」という意味の他に, 「ものが完備している」ことも指す."
    },
    {
      "type": 1,
      "japanese": "尖鋭",
      "hiragana": "せんえい ",
      "meanOfChinese": "尖锐",
      "chinese": "尖锐",
      "phonetic": "jiānruì",
      "chineseMeaning": "中国語の‘尖锐jiānruì’は音が「甲高い」ことや感覚などが「鋭い」ことも指す."
    },
    {
      "type": 1,
      "japanese": "検討",
      "hiragana": "けんとう ",
      "meanOfChinese": "研究",
      "chinese": "检讨",
      "phonetic": "jiǎntǎo",
      "chineseMeaning": "中国語の‘检讨jiǎntǎo’は「調べ考える」という意味の他に「反省する」ことも指す."
    },
    {
      "type": 1,
      "japanese": "検閲",
      "hiragana": "けんえつ ",
      "meanOfChinese": "审阅",
      "chinese": "检阅",
      "phonetic": "jiǎnyuè",
      "chineseMeaning": "中国語の‘检阅jiǎnyuè’は「基準などに合っているかを確認する」という意味の他に「資料を調べる」意味をも持つ."
    },
    {
      "type": 1,
      "japanese": "脚気",
      "hiragana": "かっけ ",
      "meanOfChinese": "脚气症",
      "chinese": "脚气",
      "phonetic": "jiǎoqì",
      "chineseMeaning": "中国語の‘脚气jiǎoqì’は「脚気かっけ」の他, 「水虫」をも指す."
    },
    {
      "type": 1,
      "japanese": "教訓",
      "hiragana": "きょうくん ",
      "meanOfChinese": "教训",
      "chinese": "教训",
      "phonetic": "jiàoxun",
      "chineseMeaning": "中国語の‘教训jiàoxun’には「将来への指針」という意味の他, 「説教する」「叱る」という動詞用法もある."
    },
    {
      "type": 1,
      "japanese": "激動",
      "hiragana": "げきどう ",
      "meanOfChinese": "急剧变化",
      "chinese": "激动",
      "phonetic": "jīdòng",
      "chineseMeaning": "中国語の‘激动jīdòng’は「感激する」「興奮する」ことを指す. 他動詞にもなる."
    },
    {
      "type": 1,
      "japanese": "解釈",
      "hiragana": "かいしゃく ",
      "meanOfChinese": "理解",
      "chinese": "解释",
      "phonetic": "jiěshì",
      "chineseMeaning": "中国語の‘解释jiěshì’は「理解する」という意味の他, 「言い訳する」ことや「説明する」ことも意味する."
    },
    {
      "type": 1,
      "japanese": "接収",
      "hiragana": "せっしゅう ",
      "meanOfChinese": "接收",
      "chinese": "接收",
      "phonetic": "jiēshōu",
      "chineseMeaning": "中国語の‘接收jiēshōu’には「所有物を取り上げる」という意味の他に「受け取る」という意味もある."
    },
    {
      "type": 1,
      "japanese": "解脱",
      "hiragana": "げだつ ",
      "meanOfChinese": "解脱",
      "chinese": "解脱",
      "phonetic": "jiětuō",
      "chineseMeaning": "中国語の‘解脱jiětuō’はある状況から「ぬけ出る」「逃れる」意味でも使う."
    },
    {
      "type": 1,
      "japanese": "接着",
      "hiragana": "せっちゃく ",
      "meanOfChinese": "黏着",
      "chinese": "接着",
      "phonetic": "jiēzhe",
      "chineseMeaning": "中国語の‘接着jiēzhe’は命令文で「受け止める」という意味になる他, 「続けて」「引き続いて」という意味にもなる."
    },
    {
      "type": 1,
      "japanese": "機関",
      "hiragana": "きかん ",
      "meanOfChinese": "机器",
      "chinese": "机关",
      "phonetic": "jīguān",
      "chineseMeaning": "中国語の‘机关jīguān’には「特定の働きを担う組織」という意味の他, 「からくり」や「計略」という意味もある."
    },
    {
      "type": 1,
      "japanese": "境界",
      "hiragana": "きょうかい ",
      "meanOfChinese": "境界",
      "chinese": "境界",
      "phonetic": "jìngjiè",
      "chineseMeaning": "中国語の‘境界jìngjiè’は「境目」を意味する他, 思想あるいは芸術の面で達する「境地」をも意味する."
    },
    {
      "type": 1,
      "japanese": "近日",
      "hiragana": "きんじつ ",
      "meanOfChinese": "改日",
      "chinese": "近日",
      "phonetic": "jìnrì",
      "chineseMeaning": "中国語の‘近日jìnrì’はごく近い過去をもいう."
    },
    {
      "type": 1,
      "japanese": "進行",
      "hiragana": "しんこう ",
      "meanOfChinese": "进展",
      "chinese": "进行",
      "phonetic": "jìnxíng",
      "chineseMeaning": "中国語の‘进行jìnxíng’は「前へ進む」という意味の他に「行う」ことも指す.▸ 協議を行う 进行洽商 jìnxíng qiàshāng "
    },
    {
      "type": 1,
      "japanese": "緊張",
      "hiragana": "きんちょう ",
      "meanOfChinese": "紧张",
      "chinese": "紧张",
      "phonetic": "jǐnzhāng",
      "chineseMeaning": "中国語の‘紧张jǐnzhāng’には「気分が張りつめる」「争いが起こりそうである」という意味の他, 「品不足である」という意味もある.▸ 住宅不足 住房紧张 zhùfáng jǐnzhāng "
    },
    {
      "type": 1,
      "japanese": "開花",
      "hiragana": "かいか ",
      "meanOfChinese": "花开",
      "chinese": "开花",
      "phonetic": "kāihuā",
      "chineseMeaning": "中国語の‘开花kāihuā’は「花が開く」という意味の他, 「うれしさで笑みがこぼれる」こともいう."
    },
    {
      "type": 1,
      "japanese": "開票",
      "hiragana": "かいひょう ",
      "meanOfChinese": "揭开选票结果",
      "chinese": "开票",
      "phonetic": "kāipiào",
      "chineseMeaning": "中国語の‘开票kāipiào’は「投票結果を調べる」という意味の他, 「伝票を切ってもらう」ことも意味する."
    },
    {
      "type": 1,
      "japanese": "課",
      "hiragana": "か ",
      "meanOfChinese": "课",
      "chinese": "课",
      "phonetic": "kè",
      "chineseMeaning": "中国語の‘课kè’は「教科書の区切り」以外に「授業」のことも言う."
    },
    {
      "type": 1,
      "japanese": "客車",
      "hiragana": "きゃくしゃ ",
      "meanOfChinese": "客车",
      "chinese": "客车",
      "phonetic": "kèchē",
      "chineseMeaning": "中国語の‘客车kèchē’には「旅客用の鉄道車両」という意味の他, 「バス」という意味もある."
    },
    {
      "type": 1,
      "japanese": "快活",
      "hiragana": "かいかつ ",
      "meanOfChinese": "快活",
      "chinese": "快活",
      "phonetic": "kuàihuo",
      "chineseMeaning": "中国語の‘快活kuàihuo’は「きびきびしている」という意味の他, 「楽しい」「愉快だ」という意味がある."
    },
    {
      "type": 1,
      "japanese": "冷気",
      "hiragana": "れいき ",
      "meanOfChinese": "冷气",
      "chinese": "冷气",
      "phonetic": "lěngqì",
      "chineseMeaning": "中国語の‘冷气lěngqì’は「冷たい空気」の他に「冷房装置」をも指す."
    },
    {
      "type": 1,
      "japanese": "連夜",
      "hiragana": "れんや ",
      "meanOfChinese": "连夜",
      "chinese": "连夜",
      "phonetic": "liányè",
      "chineseMeaning": "中国語の‘连夜liányè’は「毎晩」の他に「その晩すぐ」という意味もある."
    },
    {
      "type": 1,
      "japanese": "了解",
      "hiragana": "りょうかい ",
      "meanOfChinese": "谅解",
      "chinese": "了解",
      "phonetic": "liǎojiě",
      "chineseMeaning": "中国語の‘了解liǎojiě’は「理解する」他に「調べる」ことをも指す."
    },
    {
      "type": 1,
      "japanese": "流動",
      "hiragana": "りゅうどう ",
      "meanOfChinese": "流动、变化",
      "chinese": "流动",
      "phonetic": "liúdòng",
      "chineseMeaning": "中国語の‘流动liúdòng’は「流動する」他に「移動する」ことをもいう.▸ 旅回り公演 流动演出 liúdòng yǎnchū "
    },
    {
      "type": 1,
      "japanese": "流転",
      "hiragana": "るてん ",
      "meanOfChinese": "流转",
      "chinese": "流转",
      "phonetic": "liúzhuǎn",
      "chineseMeaning": "中国語の‘流转liúzhuǎn’は「流転する」他に商品や資金が「回転する」ことをも指す."
    },
    {
      "type": 1,
      "japanese": "満月",
      "hiragana": "まんげつ ",
      "meanOfChinese": "满月",
      "chinese": "满月",
      "phonetic": "mǎnyuè",
      "chineseMeaning": "中国語の‘满月mǎnyuè’は赤ん坊が生後一ヶ月になることをもいう."
    },
    {
      "type": 1,
      "japanese": "麻雀",
      "hiragana": "マージャン ",
      "meanOfChinese": "麻将",
      "chinese": "麻雀",
      "phonetic": "máquè",
      "chineseMeaning": "中国語の‘麻雀máquè’は「雀」を意味する（地域によっては「マージャン」をも指す）."
    },
    {
      "type": 1,
      "japanese": "面",
      "hiragana": "めん ",
      "meanOfChinese": "假面、脸",
      "chinese": "面",
      "phonetic": "miàn",
      "chineseMeaning": "中国語の‘面miàn’には「麺」や「粉」の意味もある."
    },
    {
      "type": 1,
      "japanese": "面目",
      "hiragana": "めんぼく ",
      "meanOfChinese": "脸面",
      "chinese": "面目",
      "phonetic": "miànmù",
      "chineseMeaning": "中国語の‘面目miànmù’は「名誉」や「様相」の他に「顔つき」や「状態」をもいう."
    },
    {
      "type": 1,
      "japanese": "密会",
      "hiragana": "みっかい ",
      "meanOfChinese": "偷情",
      "chinese": "密会",
      "phonetic": "mìhuì",
      "chineseMeaning": "中国語の‘密会mìhuì’は「密会する」他に「秘密会議」のことをもいう."
    },
    {
      "type": 1,
      "japanese": "迷路",
      "hiragana": "めいろ ",
      "meanOfChinese": "迷途",
      "chinese": "迷路",
      "phonetic": "mílù",
      "chineseMeaning": "中国語の‘迷路mílù’は「正しい方向を見失う」ことをも意味する."
    },
    {
      "type": 1,
      "japanese": "命",
      "hiragana": "いのち ",
      "meanOfChinese": "生命",
      "chinese": "命",
      "phonetic": "mìng",
      "chineseMeaning": "中国語の‘命mìng’には「運命」という意味もある."
    },
    {
      "type": 1,
      "japanese": "明白",
      "hiragana": "めいはく ",
      "meanOfChinese": "明白",
      "chinese": "明白",
      "phonetic": "míngbai",
      "chineseMeaning": "中国語の‘明白míngbai’は「はっきりしていて疑いようがない」という意味の他に「分かる」という意味をも持つ."
    },
    {
      "type": 1,
      "japanese": "明朗",
      "hiragana": "めいろう ",
      "meanOfChinese": "明朗",
      "chinese": "明朗",
      "phonetic": "mínglǎng",
      "chineseMeaning": "中国語の‘明朗mínglǎng’には光が満ちて「明るい」という意味もある.▸ 明るい晴れの日 明朗的晴天 mínglǎng de qíngtiān "
    },
    {
      "type": 1,
      "japanese": "末世",
      "hiragana": "まっせ ",
      "meanOfChinese": "末世",
      "chinese": "末世",
      "phonetic": "mòshì",
      "chineseMeaning": "中国語の‘末世mòshì’はある時代の「晩期」をも指す."
    },
    {
      "type": 1,
      "japanese": "内線",
      "hiragana": "ないせん ",
      "meanOfChinese": "内线电话",
      "chinese": "内线",
      "phonetic": "nèixiàn",
      "chineseMeaning": "中国語の‘内线nèixiàn’は「内線電話」の他に「スパイ」のことをもいう."
    },
    {
      "type": 1,
      "japanese": "徘徊",
      "hiragana": "はいかい ",
      "meanOfChinese": "徘徊",
      "chinese": "徘徊",
      "phonetic": "páihuái",
      "chineseMeaning": "中国語の‘徘徊páihuái’は「徘徊する」他に「ためらう」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "拍子",
      "hiragana": "ひょうし ",
      "meanOfChinese": "节拍",
      "chinese": "拍子",
      "phonetic": "pāizi",
      "chineseMeaning": "中国語の‘拍子pāizi’は「拍子ひょうし」の他に「ラケット」をも表す."
    },
    {
      "type": 1,
      "japanese": "培養",
      "hiragana": "ばいよう ",
      "meanOfChinese": "（1）栽培 （2）养成思想",
      "chinese": "培养",
      "phonetic": "péiyǎng",
      "chineseMeaning": "中国語の‘培养péiyǎng’は「培養する」他に「人材を養成する」ことをも指す."
    },
    {
      "type": 1,
      "japanese": "偏食",
      "hiragana": "へんしょく ",
      "meanOfChinese": "偏食",
      "chinese": "偏食",
      "phonetic": "piānshí",
      "chineseMeaning": "中国語の‘偏食piānshí’には「部分月食, 部分日食」という意味もある."
    },
    {
      "type": 1,
      "japanese": "貧乏",
      "hiragana": "びんぼう ",
      "meanOfChinese": "穷",
      "chinese": "贫乏",
      "phonetic": "pínfá",
      "chineseMeaning": "中国語の‘贫乏pínfá’は「経済的ゆとりがない」という意味の他に「貧弱である」という意味をも持つ."
    },
    {
      "type": 1,
      "japanese": "平生",
      "hiragana": "へいぜい ",
      "meanOfChinese": "平时",
      "chinese": "平生",
      "phonetic": "píngshēng",
      "chineseMeaning": "中国語の‘平生píngshēng’には「ふだん」の他に「生まれてこのかた」「一生」という意味もある."
    },
    {
      "type": 1,
      "japanese": "平穏",
      "hiragana": "へいおん ",
      "meanOfChinese": "安宁",
      "chinese": "平稳",
      "phonetic": "píngwěn",
      "chineseMeaning": "中国語の‘平稳píngwěn’は「穏やかである」ことの他に「揺れない」ことをも指す.▸ 安定した血圧 平稳血压 píngwěn xuèyā "
    },
    {
      "type": 1,
      "japanese": "平易",
      "hiragana": "へいい ",
      "meanOfChinese": "浅显",
      "chinese": "平易",
      "phonetic": "píngyì",
      "chineseMeaning": "中国語の‘平易píngyì’は「易しい」他に人が「穏和である」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "品質",
      "hiragana": "ひんしつ ",
      "meanOfChinese": "物品的质量",
      "chinese": "品质",
      "phonetic": "pǐnzhì",
      "chineseMeaning": "中国語の‘品质pǐnzhì’は「品物の性質」の他に人の「品性」をも指す."
    },
    {
      "type": 1,
      "japanese": "批評",
      "hiragana": "ひひょう ",
      "meanOfChinese": "批评",
      "chinese": "批评",
      "phonetic": "pīpíng",
      "chineseMeaning": "中国語の‘批评pīpíng’は「物事の価値を評価する」という意味の他に「批判する」という意味をも持つ."
    },
    {
      "type": 1,
      "japanese": "破門",
      "hiragana": "はもん ",
      "meanOfChinese": "开除",
      "chinese": "破门",
      "phonetic": "pòmén",
      "chineseMeaning": "中国語の‘破门pòmén’は「破門する」他に「戸を破る」, サッカーなどで「ゴールを割る」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "撲滅",
      "hiragana": "ぼくめつ ",
      "meanOfChinese": "扑灭",
      "chinese": "扑灭",
      "phonetic": "pūmiè",
      "chineseMeaning": "中国語の‘扑灭pūmiè’は「撲滅する」の他に「火を消し止める」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "千金",
      "hiragana": "せんきん ",
      "meanOfChinese": "千两黄金（大额金钱）",
      "chinese": "千金",
      "phonetic": "qiānjīn",
      "chineseMeaning": "中国語の‘千金qiānjīn’には「多額のお金」という意味の他, 他人の娘をていねいに言う「令嬢, お嬢様」の意味もある."
    },
    {
      "type": 1,
      "japanese": "前言",
      "hiragana": "ぜんげん ",
      "meanOfChinese": "前言",
      "chinese": "前言",
      "phonetic": "qiányán",
      "chineseMeaning": "中国語の‘前言qiányán’は「前に言った言葉」の他, 「序文, 前書き」をも指す."
    },
    {
      "type": 1,
      "japanese": "気力",
      "hiragana": "きりょく ",
      "meanOfChinese": "魄力",
      "chinese": "气力",
      "phonetic": "qìlì",
      "chineseMeaning": "中国語の‘气力qìlì’は「精神力」だけではなく「体力」をも意味する."
    },
    {
      "type": 1,
      "japanese": "勤務",
      "hiragana": "きんむ ",
      "meanOfChinese": "工作",
      "chinese": "勤务",
      "phonetic": "qínwù",
      "chineseMeaning": "中国語の‘勤务qínwù’は「特定の組織で働く」という意味の他に「公的な業務」をいう."
    },
    {
      "type": 1,
      "japanese": "啓示",
      "hiragana": "けいじ ",
      "meanOfChinese": "启示",
      "chinese": "启示",
      "phonetic": "qǐshì",
      "chineseMeaning": "中国語の‘启示qǐshì’は「神のさとし」という意味の他に「啓発する」こと, またその内容をいう."
    },
    {
      "type": 1,
      "japanese": "気象",
      "hiragana": "きしょう ",
      "meanOfChinese": "气象",
      "chinese": "气象",
      "phonetic": "qìxiàng",
      "chineseMeaning": "中国語の‘气象qìxiàng’には「大気の現象」という意味の他, 「様子」や「状況」といった意味もある."
    },
    {
      "type": 1,
      "japanese": "人選",
      "hiragana": "じんせん ",
      "meanOfChinese": "人选",
      "chinese": "人选",
      "phonetic": "rénxuǎn",
      "chineseMeaning": "中国語の‘人选rénxuǎn’は「適当な人を選ぶ」という意味の他に, 「ある基準に合った候補者」という意味も持つ."
    },
    {
      "type": 1,
      "japanese": "熱情",
      "hiragana": "ねつじょう ",
      "meanOfChinese": "热情",
      "chinese": "热情",
      "phonetic": "rèqíng",
      "chineseMeaning": "中国語の‘热情rèqíng’は「熱心な気持ち」を指す他に「心がこもっている」「親切である」ことをも指す."
    },
    {
      "type": 1,
      "japanese": "熱心",
      "hiragana": "ねっしん ",
      "meanOfChinese": "热心",
      "chinese": "热心",
      "phonetic": "rèxīn",
      "chineseMeaning": "中国語の‘热心rèxīn’には「熱心である」という意味の他に「親切である」という意味もある."
    },
    {
      "type": 1,
      "japanese": "入手",
      "hiragana": "にゅうしゅ ",
      "meanOfChinese": "得到",
      "chinese": "入手",
      "phonetic": "rùshǒu",
      "chineseMeaning": "中国語の‘入手rùshǒu’は「手に入れる」他に「着手する」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "掃除",
      "hiragana": "そうじ ",
      "meanOfChinese": "打扫",
      "chinese": "扫除",
      "phonetic": "sǎochú",
      "chineseMeaning": "中国語の‘扫除sǎochú’には「汚れをなくしきれいにする」という意味の他に「取り除く」という意味もある."
    },
    {
      "type": 1,
      "japanese": "生気",
      "hiragana": "せいき ",
      "meanOfChinese": "朝气",
      "chinese": "生气",
      "phonetic": "shēngqì",
      "chineseMeaning": "中国語の‘生气shēngqì’は「活気」の他に「怒る」ことも意味する."
    },
    {
      "type": 1,
      "japanese": "世代",
      "hiragana": "せだい ",
      "meanOfChinese": "一代、辈",
      "chinese": "世代",
      "phonetic": "shìdài",
      "chineseMeaning": "中国語の‘世代shìdài’には「年齢層」という意味の他に「長い間」「代々」という意味がある."
    },
    {
      "type": 1,
      "japanese": "釈放",
      "hiragana": "しゃくほう ",
      "meanOfChinese": "释放",
      "chinese": "释放",
      "phonetic": "shìfàng",
      "chineseMeaning": "中国語の‘释放shìfàng’は「拘禁を解く」という意味の他に「放出する」という意味もある."
    },
    {
      "type": 1,
      "japanese": "是非",
      "hiragana": "ぜひ ",
      "meanOfChinese": "by all means",
      "chinese": "是非",
      "phonetic": "shìfēi",
      "chineseMeaning": "中国語の‘是非shìfēi’には「是と非」という意味の他に「いざこざ」「トラブル」という意味もある."
    },
    {
      "type": 1,
      "japanese": "収斂",
      "hiragana": "しゅうれん ",
      "meanOfChinese": "收缩",
      "chinese": "收敛",
      "phonetic": "shōuliǎn",
      "chineseMeaning": "中国語の‘收敛shōuliǎn’は「縮める」「縮まる」という意味の他に「表情や光が消えてなくなる」こと, 「行いをおとなしくする」ことをいう."
    },
    {
      "type": 1,
      "japanese": "収拾",
      "hiragana": "しゅうしゅう ",
      "meanOfChinese": "收拾",
      "chinese": "收拾",
      "phonetic": "shōushi",
      "chineseMeaning": "中国語の‘收拾shōushi’は「混乱した状態を収める」という意味の他に, 「片づける」という意味もある.▸ 部屋を片づける 收拾房子 shōushi fángzi "
    },
    {
      "type": 1,
      "japanese": "首席",
      "hiragana": "しゅせき ",
      "meanOfChinese": "首席、第一位",
      "chinese": "首席",
      "phonetic": "shǒuxí",
      "chineseMeaning": "中国語の‘首席shǒuxí’には「最上位」という意味の他に「主賓席」という意味もある."
    },
    {
      "type": 1,
      "japanese": "手下",
      "hiragana": "てした ",
      "meanOfChinese": "手下",
      "chinese": "手下",
      "phonetic": "shǒuxià",
      "chineseMeaning": "中国語の‘手下shǒuxià’は「指図されて動く人」の他に「支配下」「手元」をも意味する."
    },
    {
      "type": 1,
      "japanese": "爽快",
      "hiragana": "そうかい ",
      "meanOfChinese": "清爽",
      "chinese": "爽快",
      "phonetic": "shuǎngkuài",
      "chineseMeaning": "中国語の‘爽快shuǎngkuài’には「さわやかで気持ちがよい」という意味の他に「性格がさっぱりしている」という意味もある."
    },
    {
      "type": 1,
      "japanese": "輸出",
      "hiragana": "ゆしゅつ ",
      "meanOfChinese": "出口",
      "chinese": "输出",
      "phonetic": "shūchū",
      "chineseMeaning": "中国語の‘输出shūchū’は「輸出する」他に「出力する」ことをも指す."
    },
    {
      "type": 1,
      "japanese": "水",
      "hiragana": "みず ",
      "meanOfChinese": "水、water",
      "chinese": "水",
      "phonetic": "shuǐ",
      "chineseMeaning": "中国語の‘水shuǐ’は「水」も「湯」も指す."
    },
    {
      "type": 1,
      "japanese": "水性",
      "hiragana": "すいせい ",
      "meanOfChinese": "水性",
      "chinese": "水性",
      "phonetic": "shuǐxìng",
      "chineseMeaning": "中国語の‘水性shuǐxìng’は「水溶性」という意味の他に「泳ぎの心得」のこともいう.▸ 泳げない 水性不好 shuǐxìng bù hǎo "
    },
    {
      "type": 1,
      "japanese": "輸入",
      "hiragana": "ゆにゅう ",
      "meanOfChinese": "进口",
      "chinese": "输入",
      "phonetic": "shūrù",
      "chineseMeaning": "中国語の‘输入shūrù’は「輸入する」他に「入力する」ことをも指す."
    },
    {
      "type": 1,
      "japanese": "疎通",
      "hiragana": "そつう ",
      "meanOfChinese": "沟通",
      "chinese": "疏通",
      "phonetic": "shūtōng",
      "chineseMeaning": "中国語の‘疏通shūtōng’には「相手によく理解される」という意味の他に「溝をさらって流れをよくする」という意味もある."
    },
    {
      "type": 1,
      "japanese": "鎖",
      "hiragana": "くさり ",
      "meanOfChinese": "链",
      "chinese": "锁",
      "phonetic": "suǒ",
      "chineseMeaning": "中国語の‘锁suǒ’は「くさり」という意味の他に「錠前」「錠をかける」という意味ももつ."
    },
    {
      "type": 1,
      "japanese": "所有",
      "hiragana": "しょゆう ",
      "meanOfChinese": "有",
      "chinese": "所有",
      "phonetic": "suǒyǒu",
      "chineseMeaning": "中国語の‘所有suǒyǒu’は「自分のものとして持つ」という意味がある他「すべての」という形容詞でもある."
    },
    {
      "type": 1,
      "japanese": "探訪",
      "hiragana": "たんぼう ",
      "meanOfChinese": "采访",
      "chinese": "探访",
      "phonetic": "tànfǎng",
      "chineseMeaning": "中国語の‘探访tànfǎng’は「その地を訪ねる」という意味の他に「人を訪ねる」という意味もある."
    },
    {
      "type": 1,
      "japanese": "探索",
      "hiragana": "たんさく ",
      "meanOfChinese": "探索",
      "chinese": "探索",
      "phonetic": "tànsuǒ",
      "chineseMeaning": "中国語の‘探索tànsuǒ’には「探究する」という意味もある."
    },
    {
      "type": 1,
      "japanese": "特別",
      "hiragana": "とくべつ ",
      "meanOfChinese": "特殊的",
      "chinese": "特别",
      "phonetic": "tèbié",
      "chineseMeaning": "中国語の‘特别tèbié’には「一般と異なる」という意味の他に「わざわざ」という意味もある."
    },
    {
      "type": 1,
      "japanese": "題",
      "hiragana": "だい ",
      "meanOfChinese": "题",
      "chinese": "题",
      "phonetic": "tí",
      "chineseMeaning": "中国語の‘题tí’は「タイトル」という意味の他に「署名する」ことも意味する."
    },
    {
      "type": 1,
      "japanese": "調和",
      "hiragana": "ちょうわ ",
      "meanOfChinese": "和谐",
      "chinese": "调和",
      "phonetic": "tiáohe",
      "chineseMeaning": "中国語の‘调和tiáohe’には「つりあいが取れる」という意味の他に「とりなす」「妥協する」という意味もある."
    },
    {
      "type": 1,
      "japanese": "体面",
      "hiragana": "たいめん ",
      "meanOfChinese": "面子",
      "chinese": "体面",
      "phonetic": "tǐmiàn",
      "chineseMeaning": "中国語の‘体面tǐmiàn’には「面目」という意味の他に「光栄である」という意味もある."
    },
    {
      "type": 1,
      "japanese": "題名",
      "hiragana": "だいめい ",
      "meanOfChinese": "题名",
      "chinese": "题名",
      "phonetic": "tímíng",
      "chineseMeaning": "中国語の‘题名tímíng’には「タイトル」という意味の他に「名前を書きつける」という意味もある."
    },
    {
      "type": 1,
      "japanese": "停車",
      "hiragana": "ていしゃ ",
      "meanOfChinese": "停车",
      "chinese": "停车",
      "phonetic": "tíngchē",
      "chineseMeaning": "中国語の‘停车tíngchē’は「車両を一時的に止める」という意味の他に「駐車・駐輪する」ことをも指す."
    },
    {
      "type": 1,
      "japanese": "通風",
      "hiragana": "つうふう ",
      "meanOfChinese": "通风透气",
      "chinese": "通风",
      "phonetic": "tōngfēng",
      "chineseMeaning": "中国語の‘通风tōngfēng’には「風を通す」という意味の他に「秘密を漏らす」という意味もある."
    },
    {
      "type": 1,
      "japanese": "痛快",
      "hiragana": "つうかい ",
      "meanOfChinese": "痛快",
      "chinese": "痛快",
      "phonetic": "tòngkuai",
      "chineseMeaning": "中国語の‘痛快tòngkuai’には「非常に愉快である」という意味の他に「率直である」という意味もある."
    },
    {
      "type": 1,
      "japanese": "同情",
      "hiragana": "どうじょう ",
      "meanOfChinese": "哀怜",
      "chinese": "同情",
      "phonetic": "tóngqíng",
      "chineseMeaning": "中国語の‘同情tóngqíng’は「同情する」他に「共感する」ことをも指す."
    },
    {
      "type": 1,
      "japanese": "同志",
      "hiragana": "どうし ",
      "meanOfChinese": "同志",
      "chinese": "同志",
      "phonetic": "tóngzhì",
      "chineseMeaning": "中国語の‘同志tóngzhì’は「同じ考えを持つ人」の他に「同性愛者」をも指す."
    },
    {
      "type": 1,
      "japanese": "頭脳",
      "hiragana": "ずのう ",
      "meanOfChinese": "头脑",
      "chinese": "头脑",
      "phonetic": "tóunǎo",
      "chineseMeaning": "中国語の‘头脑tóunǎo’は「頭の働き」という意味の他に集団の「かしら」も指す."
    },
    {
      "type": 1,
      "japanese": "頭上",
      "hiragana": "ずじょう ",
      "meanOfChinese": "头上",
      "chinese": "头上",
      "phonetic": "tóushàng",
      "chineseMeaning": "中国語の‘头上tóushàng’は「頭に」という意味にもなる."
    },
    {
      "type": 1,
      "japanese": "退避",
      "hiragana": "たいひ ",
      "meanOfChinese": "退避",
      "chinese": "退避",
      "phonetic": "tuìbì",
      "chineseMeaning": "中国語の‘退避tuìbì’は「そこから離れ危険を避ける」という意味の他に「回避する」という意味もある."
    },
    {
      "type": 1,
      "japanese": "退出",
      "hiragana": "たいしゅつ ",
      "meanOfChinese": "离开",
      "chinese": "退出",
      "phonetic": "tuìchū",
      "chineseMeaning": "中国語の‘退出tuìchū’は「外へ出る」という意味の他に「脱退・引退する」という意味もある."
    },
    {
      "type": 1,
      "japanese": "亡命",
      "hiragana": "ぼうめい ",
      "meanOfChinese": "政治避难",
      "chinese": "亡命",
      "phonetic": "wángmìng",
      "chineseMeaning": "中国語の‘亡命wángmìng’は「亡命する」の他に「命知らず」という意味をも持つ."
    },
    {
      "type": 1,
      "japanese": "萎縮",
      "hiragana": "いしゅく ",
      "meanOfChinese": "萎缩",
      "chinese": "萎缩",
      "phonetic": "wěisuō",
      "chineseMeaning": "中国語の‘萎缩wěisuō’は「縮こまる」という意味の他, 草木が「枯れる」「しおれる」ことも意味する."
    },
    {
      "type": 1,
      "japanese": "文化",
      "hiragana": "ぶんか ",
      "meanOfChinese": "文化、culture",
      "chinese": "文化",
      "phonetic": "wénhuà",
      "chineseMeaning": "中国語の‘文化wénhuà’には「学問」や「教養」という意味もある."
    },
    {
      "type": 1,
      "japanese": "文明",
      "hiragana": "ぶんめい ",
      "meanOfChinese": "文明、civilization",
      "chinese": "文明",
      "phonetic": "wénmíng",
      "chineseMeaning": "中国語の‘文明wénmíng’は「文化程度が高い」ことをも指す."
    },
    {
      "type": 1,
      "japanese": "温暖",
      "hiragana": "おんだん ",
      "meanOfChinese": "温和",
      "chinese": "温暖",
      "phonetic": "wēnnuǎn",
      "chineseMeaning": "中国語の‘温暖wēnnuǎn’は「気候が穏やかである」という意味の他に「気持ちや雰囲気が温かい」ことをも指す."
    },
    {
      "type": 1,
      "japanese": "文書",
      "hiragana": "ぶんしょ ",
      "meanOfChinese": "公文",
      "chinese": "文书",
      "phonetic": "wénshū",
      "chineseMeaning": "中国語の‘文书wénshū’は「書類」の他に「書記」をも指す."
    },
    {
      "type": 1,
      "japanese": "文体",
      "hiragana": "ぶんたい ",
      "meanOfChinese": "文体",
      "chinese": "文体",
      "phonetic": "wéntǐ",
      "chineseMeaning": "中国語の‘文体wéntǐ’は「文章の様式・特徴」の他に, ‘文娱和体育wényú hé tǐyù’すなわち文化とスポーツの総称としても使う."
    },
    {
      "type": 1,
      "japanese": "文字",
      "hiragana": "もじ ",
      "meanOfChinese": "字",
      "chinese": "文字",
      "phonetic": "wénzì",
      "chineseMeaning": "中国語の‘文字wénzì’は「文章」をも意味する."
    },
    {
      "type": 1,
      "japanese": "下流",
      "hiragana": "かりゅう ",
      "meanOfChinese": "下游",
      "chinese": "下流",
      "phonetic": "xiàliú",
      "chineseMeaning": "中国語の‘下流xiàliú’は「下品である」ことも意味する."
    },
    {
      "type": 1,
      "japanese": "項目",
      "hiragana": "こうもく ",
      "meanOfChinese": "项目",
      "chinese": "项目",
      "phonetic": "xiàngmù",
      "chineseMeaning": "中国語の‘项目xiàngmù’は「個々の細目」という意味の他に「種目」や「プロジェクト」をもいう.▸ 陸上競技種目 田径项目 tiánjìng xiàngmù ▸ プロジェクトマネージャー 项目经理 xiàngmù jīnglǐ "
    },
    {
      "type": 1,
      "japanese": "小品",
      "hiragana": "しょうひん ",
      "meanOfChinese": "小品",
      "chinese": "小品",
      "phonetic": "xiǎopǐn",
      "chineseMeaning": "中国語の‘小品xiǎopǐn’は演芸の「コント」をも言う."
    },
    {
      "type": 1,
      "japanese": "校長",
      "hiragana": "こうちょう ",
      "meanOfChinese": "校长",
      "chinese": "校长",
      "phonetic": "xiàozhǎng",
      "chineseMeaning": "中国語の‘校长xiàozhǎng’は小中高の「校長」だけでなく大学の「学長」のこともいう."
    },
    {
      "type": 1,
      "japanese": "下水",
      "hiragana": "げすい ",
      "meanOfChinese": "污水",
      "chinese": "下水",
      "phonetic": "xiàshuǐ",
      "chineseMeaning": "中国語の‘下水xiàshuǐ’は「水に入る」こと, 「船が進水する」ことを指す."
    },
    {
      "type": 1,
      "japanese": "修理",
      "hiragana": "しゅうり ",
      "meanOfChinese": "修理",
      "chinese": "修理",
      "phonetic": "xiūlǐ",
      "chineseMeaning": "中国語の‘修理xiūlǐ’は「壊れたところを直す」という意味の他に「剪定する」という意味もある."
    },
    {
      "type": 1,
      "japanese": "懸念",
      "hiragana": "けねん ",
      "meanOfChinese": "挂念",
      "chinese": "悬念",
      "phonetic": "xuánniàn",
      "chineseMeaning": "中国語の‘悬念xuánniàn’は「先行きを心配する」という意味の他に, 「読者や観客のはらはらする気持ち」をも指す."
    },
    {
      "type": 1,
      "japanese": "学会",
      "hiragana": "がっかい ",
      "meanOfChinese": "学会",
      "chinese": "学会",
      "phonetic": "xuéhuì",
      "chineseMeaning": "中国語の‘学会xuéhuì’は「研究団体」という意味の他に, 動詞句として「習得する」「マスターする」ことを指す."
    },
    {
      "type": 1,
      "japanese": "牙",
      "hiragana": "きば ",
      "meanOfChinese": "獠牙",
      "chinese": "牙",
      "phonetic": "yá",
      "chineseMeaning": "中国語の‘牙yá’は動物の「きば」だけでなく人間の「歯」をも指す."
    },
    {
      "type": 1,
      "japanese": "厳重",
      "hiragana": "げんじゅう ",
      "meanOfChinese": "严重",
      "chinese": "严重",
      "phonetic": "yánzhòng",
      "chineseMeaning": "中国語の‘严重yánzhòng’は「抜かりなく注意する」という意味の他, 好ましくない物事についてその状態が「深刻である」ことを指す."
    },
    {
      "type": 1,
      "japanese": "要害",
      "hiragana": "ようがい ",
      "meanOfChinese": "险隘",
      "chinese": "要害",
      "phonetic": "yàohài",
      "chineseMeaning": "中国語の‘要害yàohài’は「人体の急所」をも指す."
    },
    {
      "type": 1,
      "japanese": "夭折",
      "hiragana": "ようせつ ",
      "meanOfChinese": "夭折",
      "chinese": "夭折",
      "phonetic": "yāozhé",
      "chineseMeaning": "中国語の‘夭折yāozhé’は「夭折する」他に物事が「挫折する」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "異常",
      "hiragana": "いじょう ",
      "meanOfChinese": "异常",
      "chinese": "异常",
      "phonetic": "yìcháng",
      "chineseMeaning": "中国語の‘异常yìcháng’には「普通と違う」という意味の他, 「非常に」という意味もある."
    },
    {
      "type": 1,
      "japanese": "一定",
      "hiragana": "いってい ",
      "meanOfChinese": "一定",
      "chinese": "一定",
      "phonetic": "yídìng",
      "chineseMeaning": "中国語の‘一定yídìng’は「いつも決まった状態である」という意味の他, 「必ず」という意味も持つ."
    },
    {
      "type": 1,
      "japanese": "議論",
      "hiragana": "ぎろん ",
      "meanOfChinese": "争论、谈论",
      "chinese": "议论",
      "phonetic": "yìlùn",
      "chineseMeaning": "中国語の‘议论yìlùn’には「論じ合う」という意味の他に「取りざたする」意味もある."
    },
    {
      "type": 1,
      "japanese": "一気",
      "hiragana": "いっき ",
      "meanOfChinese": "一股劲儿",
      "chinese": "一气",
      "phonetic": "yíqì",
      "chineseMeaning": "中国語の‘一气yíqì’には「いっぺんに」という意味の他, 「悪い仲間」「ぐる」という意味もある."
    },
    {
      "type": 1,
      "japanese": "意味",
      "hiragana": "いみ ",
      "meanOfChinese": "意义",
      "chinese": "意味",
      "phonetic": "yìwèi",
      "chineseMeaning": "中国語の‘意味yìwèi’は「深い意味」を表す他, 「趣」という意味も持つ."
    },
    {
      "type": 1,
      "japanese": "由来",
      "hiragana": "ゆらい ",
      "meanOfChinese": "由来",
      "chinese": "由来",
      "phonetic": "yóulái",
      "chineseMeaning": "中国語の‘由来yóulái’は「来歴」の他に「始まりから現在までの時間」をもいう."
    },
    {
      "type": 1,
      "japanese": "魚肉",
      "hiragana": "ぎょにく ",
      "meanOfChinese": "鱼肉",
      "chinese": "鱼肉",
      "phonetic": "yúròu",
      "chineseMeaning": "中国語の‘鱼肉yúròu’は「魚肉」「魚と肉」の意味の他, 動詞として「人を魚や肉のように切り刻む」, つまり「ひどい目に遭わせる」という意味も持つ."
    },
    {
      "type": 1,
      "japanese": "余興",
      "hiragana": "よきょう ",
      "meanOfChinese": "游艺",
      "chinese": "余兴",
      "phonetic": "yúxìng",
      "chineseMeaning": "中国語の‘余兴yúxìng’は「つきない興味」のことをもいう."
    },
    {
      "type": 1,
      "japanese": "再会",
      "hiragana": "さいかい ",
      "meanOfChinese": "再会",
      "chinese": "再会",
      "phonetic": "zàihuì",
      "chineseMeaning": "中国語の‘再会zàihuì’は「再び会う」という意味を持つ他「さようなら」というあいさつでもある."
    },
    {
      "type": 1,
      "japanese": "栽培",
      "hiragana": "さいばい ",
      "meanOfChinese": "种植",
      "chinese": "栽培",
      "phonetic": "zāipéi",
      "chineseMeaning": "中国語の‘栽培zāipéi’は植物だけでなく人材を「育てる」ことについてもいう."
    },
    {
      "type": 1,
      "japanese": "雑種",
      "hiragana": "ざっしゅ ",
      "meanOfChinese": "杂交种",
      "chinese": "杂种",
      "phonetic": "zázhǒng",
      "chineseMeaning": "中国語の‘杂种zázhǒng’は「交配・交雑により生まれたもの」という意味を持つ他, 「ろくでなし」を意味する罵り言葉にもなる."
    },
    {
      "type": 1,
      "japanese": "招待",
      "hiragana": "しょうたい ",
      "meanOfChinese": "邀请",
      "chinese": "招待",
      "phonetic": "zhāodài",
      "chineseMeaning": "中国語の‘招待zhāodài’は「客として来てもらう」という意味の他に「もてなす」ことをもいう."
    },
    {
      "type": 1,
      "japanese": "質量",
      "hiragana": "しつりょう ",
      "meanOfChinese": "质量",
      "chinese": "质量",
      "phonetic": "zhìliàng",
      "chineseMeaning": "中国語の‘质量zhìliàng’は「物体が有する物質の量」という意味の他に「品質」をも表す."
    },
    {
      "type": 1,
      "japanese": "支配",
      "hiragana": "しはい ",
      "meanOfChinese": "统治",
      "chinese": "支配",
      "phonetic": "zhīpèi",
      "chineseMeaning": "中国語の‘支配zhīpèi’は「勢力下に置いて治めたり制約を加えたりする」という意味の他に「配分する」意味も持つ."
    },
    {
      "type": 1,
      "japanese": "製造",
      "hiragana": "せいぞう ",
      "meanOfChinese": "生产",
      "chinese": "制造",
      "phonetic": "zhìzào",
      "chineseMeaning": "中国語の‘制造zhìzào’には, 「製品を作る」という意味の他に「でっちあげる」という意味もある."
    },
    {
      "type": 1,
      "japanese": "中心",
      "hiragana": "ちゅうしん ",
      "meanOfChinese": "核心",
      "chinese": "中心",
      "phonetic": "zhōngxīn",
      "chineseMeaning": "中国語の‘中心zhōngxīn’は「中央」「主要な部分」という意味の他に「センター」という意味も持つ.▸ 救急センター 急救中心 jíjiù zhōngxīn "
    },
    {
      "type": 1,
      "japanese": "転機",
      "hiragana": "てんき ",
      "meanOfChinese": "转机",
      "chinese": "转机",
      "phonetic": "zhuǎnjī",
      "chineseMeaning": "中国語の‘转机zhuǎnjī’には「転換期」という意味の他に「飛行機を乗り換える」という意味もある."
    },
    {
      "type": 1,
      "japanese": "専門",
      "hiragana": "せんもん ",
      "meanOfChinese": "专科",
      "chinese": "专门",
      "phonetic": "zhuānmén",
      "chineseMeaning": "中国語の‘专门zhuānmén’には「そのことのみ研究・担当すること」という意味の他に「もっぱら」「わざわざ」という意味もある."
    },
    {
      "type": 1,
      "japanese": "転向",
      "hiragana": "てんこう ",
      "meanOfChinese": "转变方向",
      "chinese": "转向",
      "phonetic": "zhuǎnxiàng",
      "chineseMeaning": "中国語の‘转向zhuǎnxiàng’は「政治的立場を変える」という意味の他に「方向を変える」という意味もある. ‘zhuànxiàng’と読めば「方角を見失う」ことを意味する."
    },
    {
      "type": 1,
      "japanese": "追求",
      "hiragana": "ついきゅう ",
      "meanOfChinese": "追求",
      "chinese": "追求",
      "phonetic": "zhuīqiú",
      "chineseMeaning": "中国語の‘追求zhuīqiú’には「異性を追い求める」という意味もある."
    },
    {
      "type": 1,
      "japanese": "準備",
      "hiragana": "じゅんび ",
      "meanOfChinese": "预备",
      "chinese": "准备",
      "phonetic": "zhǔnbèi",
      "chineseMeaning": "中国語の‘准备zhǔnbèi’は「用意する」という意味の他に「…するつもりである」という意味もある."
    },
    {
      "type": 1,
      "japanese": "主席",
      "hiragana": "しゅせき ",
      "meanOfChinese": "主席",
      "chinese": "主席",
      "phonetic": "zhǔxí",
      "chineseMeaning": "中国語の‘主席zhǔxí’は「その政府の最高責任者」を意味する他に「会議の司会」「議長」をも意味する."
    },
    {
      "type": 1,
      "japanese": "自負",
      "hiragana": "じふ ",
      "meanOfChinese": "自负、自命 ",
      "chinese": "自负",
      "phonetic": "zìfù",
      "chineseMeaning": "中国語の‘自负zìfù’は「自分の能力・仕事に自信を持つ」という意味の他に「うぬぼれる」ことも表す."
    },
    {
      "type": 1,
      "japanese": "宗派",
      "hiragana": "しゅうは ",
      "meanOfChinese": "宗派",
      "chinese": "宗派",
      "phonetic": "zōngpài",
      "chineseMeaning": "中国語の‘宗派zōngpài’は「宗教の中での分派」という意味の他に「セクト」という意味も持つ."
    },
    {
      "type": 1,
      "japanese": "組合",
      "hiragana": "くみあい ",
      "meanOfChinese": "工会",
      "chinese": "组合",
      "phonetic": "zǔhé",
      "chineseMeaning": "中国語の‘组合zǔhé’は「組み合わせる」「構成する」という意味である. また音楽における「ユニット」も意味する."
    },
    {
      "type": 1,
      "japanese": "最近",
      "hiragana": "さいきん ",
      "meanOfChinese": "近来",
      "chinese": "最近",
      "phonetic": "zuìjìn",
      "chineseMeaning": "中国語の‘最近zuìjìn’は「近い過去」の他, 近い将来の「近々」をも表す."
    },
    {
      "type": 1,
      "japanese": "作為",
      "hiragana": "さくい ",
      "meanOfChinese": "作为",
      "chinese": "作为",
      "phonetic": "zuòwéi",
      "chineseMeaning": "中国語の‘作为zuòwéi’は「つくりごと」という意味を持つ他, 「…として」という介詞の働きも持つ.▸ 教師として… 作为教师… zuòwéi jiàoshī… "
    },
    {
      "type": 1,
      "japanese": "作業",
      "hiragana": "さぎょう ",
      "meanOfChinese": "工作",
      "chinese": "作业",
      "phonetic": "zuòyè",
      "chineseMeaning": "中国語の‘作业zuòyè’は主に軍事・生産関連の「作業」を指す他, 「宿題」をも指す."
    },
    {
      "type": 1,
      "japanese": "餡",
      "hiragana": "あん ",
      "meanOfChinese": "豆沙",
      "chinese": "馅",
      "phonetic": "xiàn",
      "chineseMeaning": "中国語の‘馅xiàn’は「餃子や中華まんなどの中身」を指す."
    },
    {
      "type": 1,
      "japanese": "中学",
      "hiragana": "ちゅうがく ",
      "meanOfChinese": "初中",
      "chinese": "中学",
      "phonetic": "zhōngxué",
      "chineseMeaning": "中国語の‘中学zhōngxué’は‘初级中学chūjí zhōngxué’（中学）と‘高级中学gāojí zhōngxué’（高校）を合わせた「中等教育機関」のこと."
    },
    {
      "type": 1,
      "japanese": "医院",
      "hiragana": "いいん ",
      "meanOfChinese": "医院",
      "chinese": "医院",
      "phonetic": "yīyuàn",
      "chineseMeaning": "日本語の「医院」が主に開業医の診療所であるのに対して, 中国語の‘医院yīyuàn’は一般に病院を指す."
    },
    {
      "type": 1,
      "japanese": "先生",
      "hiragana": "せんせい ",
      "meanOfChinese": "老师、大夫",
      "chinese": "先生",
      "phonetic": "xiānsheng",
      "chineseMeaning": "中国語では‘先生xiānsheng’は男性一般への敬称として使う. たとえ相手が教員や医者などでなくても「李先生」「王先生」などと呼ぶ."
    },
    {
      "type": 1,
      "japanese": "職工",
      "hiragana": "しょっこう ",
      "meanOfChinese": "工人",
      "chinese": "职工",
      "phonetic": "zhígōng",
      "chineseMeaning": "中国語の‘职工zhígōng’は ‘职员zhíyuán’（事務職員）と ‘工人gōngrén’（肉体労働者）の総称."
    },
    {
      "type": 1,
      "japanese": "風味",
      "hiragana": "ふうみ ",
      "meanOfChinese": "口味",
      "chinese": "风味",
      "phonetic": "fēngwèi",
      "chineseMeaning": "中国語の‘风味fēngwèi’には「地方色」の意味もあり, こちらで使われることが多い."
    },
    {
      "type": 1,
      "japanese": "簡単",
      "hiragana": "かんたん ",
      "meanOfChinese": "容易",
      "chinese": "简单",
      "phonetic": "jiǎndān",
      "chineseMeaning": "中国語の‘简单jiǎndān’は「平凡だ」という意味をもち, ‘不简单bù jiǎndān’で「大したものだ」という感嘆を表す."
    },
    {
      "type": 2,
      "japanese": "病院",
      "hiragana": "びょういん ",
      "meanOfChinese": "医院",
      "chinese": "病院",
      "phonetic": "bìngyuàn",
      "chineseMeaning": "中国語で一般的に「病院」を指す言葉は‘医院yīyuàn’. 中国語の‘病院bìngyuàn’は‘精神病院jīngshén bìngyuàn’や‘结核病院jiéhé bìngyuàn’のような「専門病院」を指し, 普通, ‘病院’と単独では使えない."
    },
    {
      "type": 2,
      "japanese": "道具",
      "hiragana": "どうぐ ",
      "meanOfChinese": "工具",
      "chinese": "道具",
      "phonetic": "dàojù",
      "chineseMeaning": "中国語の‘道具dàojù’は「舞台用の道具」を指す."
    },
    {
      "type": 2,
      "japanese": "大学",
      "hiragana": "だいがく ",
      "meanOfChinese": "所有大学",
      "chinese": "大学",
      "phonetic": "dàxué",
      "chineseMeaning": "中国語で‘大学dàxué’といえば「総合大学」を指す. ‘学院xuéyuàn’は「単科大学」あるいは大学内の「学部」を意味する. 一般的に「大学」といいたいときは‘大学’が使われる."
    },
    {
      "type": 2,
      "japanese": "幹部",
      "hiragana": "かんぶ ",
      "meanOfChinese": "领导",
      "chinese": "干部",
      "phonetic": "gànbù",
      "chineseMeaning": "中国語の‘干部gànbù’は「党や政府で公職にある人」, とくに「役職者」を言う."
    },
    {
      "type": 2,
      "japanese": "謹慎",
      "hiragana": "きんしん ",
      "meanOfChinese": "（1）谨慎（2）禁闭",
      "chinese": "谨慎",
      "phonetic": "jǐnshèn",
      "chineseMeaning": "中国語の‘谨慎jǐnshèn’は「慎重である」ことを言い, 「処分」の意味はない."
    },
    {
      "type": 2,
      "japanese": "卵",
      "hiragana": "たまご ",
      "meanOfChinese": "（1）蛋（2）卵",
      "chinese": "卵",
      "phonetic": "luǎn",
      "chineseMeaning": "‘卵luǎn’に「食用の鶏卵」の意味はない. 地方によっては人間の「睾丸, ペニス」を指す."
    },
    {
      "type": 2,
      "japanese": "脱落",
      "hiragana": "だつらく ",
      "meanOfChinese": "（1）掉队（2）脱漏、落下",
      "chinese": "脱落",
      "phonetic": "tuōluò",
      "chineseMeaning": "中国語の‘脱落tuōluò’は「くっついているものが落ちる」ことをいう. 集団からの脱落については使えない."
    },
    {
      "type": 2,
      "japanese": "先輩",
      "hiragana": "せんぱい ",
      "meanOfChinese": "前辈、高年级同学、上级同事",
      "chinese": "先輩",
      "phonetic": "xiānbèi",
      "chineseMeaning": "中国語の‘辈bèi’は世代の意味であるため, 一つ二つの年齢差で「先輩」「後輩」と称することはない. 中国語の‘先辈xiānbèi’は自分の親の, ‘后辈hòubèi’は自分の子供の世代を指す."
    },
    {
      "type": 2,
      "japanese": "協約",
      "hiragana": "きょうやく ",
      "meanOfChinese": "协议",
      "chinese": "协约",
      "phonetic": "xiéyuē",
      "chineseMeaning": "中国語の'协约xiéyuē'は通常国家間の条約をいう."
    },
    {
      "type": 2,
      "japanese": "写真",
      "hiragana": "しゃしん ",
      "meanOfChinese": "照片",
      "chinese": "写真",
      "phonetic": "xiězhēn",
      "chineseMeaning": "中国語の‘写真xiězhēn’は名詞として「肖像画」, 動詞として「肖像画を描く」ことをいう."
    },
    {
      "type": 2,
      "japanese": "靴",
      "hiragana": "くつ ",
      "meanOfChinese": "鞋",
      "chinese": "靴",
      "phonetic": "xuē",
      "chineseMeaning": "中国語の‘靴xuē’は「長靴」や「ブーツ」を指す."
    },
    {
      "type": 2,
      "japanese": "学院",
      "hiragana": "がくいん ",
      "meanOfChinese": "学院 institute",
      "chinese": "学院",
      "phonetic": "xuéyuàn",
      "chineseMeaning": "中国語の‘学院xuéyuàn’はcollegeに相当し, 「単科大学」を指す.▸ 演劇大学 戏剧学院 xìjù xuéyuàn "
    },
    {
      "type": 2,
      "japanese": "野菜",
      "hiragana": "やさい ",
      "meanOfChinese": "菜",
      "chinese": "野菜",
      "phonetic": "yěcài",
      "chineseMeaning": "中国語の‘野菜yěcài’は「野生の食用植物」「山菜」のこと."
    }
  ];

  get tableClass(): string {
    return this.words.length !== 0 ? 'full-height-table' : '';
  }

  constructor(private msg: NzMessageService) {}

  handleBeforeUpload = (file: NzUploadFile): boolean => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      let words: Word[] = [];
      const result = e?.target?.result;

      if (result) {
        const wb = read(e.target.result);

        wb.SheetNames.map(sheetName => {
          const ws = wb.Sheets[sheetName];
          const type = WordTypeMap[sheetName as WordTypeKey];
          const json = utils.sheet_to_json<RowKey>(ws);
          const wordList = json.map(word => {
            return {
              type,
              japanese: word['日语单词'],
              hiragana: word['日语读音'],
              meanOfChinese: word['日语词意'],
              chinese: word['中文单词'],
              phonetic: word['中文读音'],
              chineseMeaning: word['中文词意'],
            };
          });

          words = words.concat(wordList);
        });
      }

      this.words = words;
      console.log('json: ', words);
    };
    reader.readAsArrayBuffer(file as any);
    return false;
  };

  handleFileChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }
}
