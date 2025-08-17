export interface Card {
  code: string;
  name: string;
  char: string;
  icon: string;
  color: 'black' | 'red';
}

export interface betDataLog {
  tu_userid: number;
  tbh_round_id: number;
  tc_id: number;
  tbbh_bet_amount: number;
  tbbh_user_cashBefore: number;
  tbbh_user_cashAfter: number;
  tbbh_reg_datetime: string;
  tbbh_bet_option: string;
}

export interface cashDataLog {
  tu_userid: number;
  iucf_amount: number;
  iucf_cash_before: number;
  iucf_cash_after: number;
  iucf_move_type: string;
  iucf_move_date: string;
  iucf_reason_type: string;
}

export interface CardData {
  id: number;
  tc_id: number;
  td_id: number;
  tbh_status: number;
  tbh_round_id: number;
  tbh_result: string;
  tbh_round_details: string;
  tbh_end_datetime: string;
}

export interface LogData {
  tu_userid: number;
  iull_device: string;
  iull_ipaddr: string;
  iull_datetime: string;
  iull_datetime_old: string;
  iull_ipaddr_old: string;
}

export interface betData {
  tbbh_win_amount: number;
  tbbh_user_cashAfter: number;
  tbbh_netLoss: number;
  tc_id: number;
  tbh_round_id: number;
  tbbh_status: number;
  id: number;
  tbbh_update_datetime: string;
}

export interface ServerAPIResponse<T> {
  code: number;
  message: string;
  data?: T;
  round?: number;
  status: number;
  totalitems?: number;
  totalpage?: number;
  cards?: Deal2;
}

export interface CardData2 {
  tc_id: number;
  td_id: number;
  tbh_round_id: number;
  tbh_status: number;
  tbh_reg_datetime: string;
}

export interface DecodedToken {
  id: number;
  username: string;
  tableid: number;
  type: string;
}

export type QueryParams = Record<string, string | number | boolean | null>;
export type GameType = 'baccarat' | string;
export type GameGroup = 'live' | string;
export type DealType = 'player' | 'banker';

export interface TableData {
  id: number;
  tc_id: number;
  tc_name: string;
  tc_img: string | null;
  td_name: string | undefined;
  td_img: string | undefined;
  tc_logo: string | null | undefined;
  tc_gameType: GameType;
  tc_gameSort: GameGroup;
  tc_gameGroup: GameGroup;
  tc_stream_url: string | null;
  tc_status: number;
  tc_timer: number;
  tc_betMin: number;
  tc_betMax: number;
  tc_reg_datetime: string;
  tc_update_datetime: string;
  tc_gameName: string;
  tc_userCount: number;
  cards: Deal2;
  betlimit: {
    min_bet: number;
    max_bet: number;
  };
  betchips: {
    [key: string]: number;
  };
}

export interface Deal {
  player: Card['code'][];
  player_2?: Card['code'][];
  player_3?: Card['code'][];
  banker: Card['code'][];
}

export interface CardScore {
  playerNeedsThirdCard: boolean;
  bankerNeedsThirdCard: boolean;
  playerScore: number;
  bankerScore: number;
  winner: string;
}
export interface Deal2 {
  cards: {
    banker?: { card: string }[];
    player?: { card: string }[];
    player_2?: { card: string }[];
    player_3?: { card: string }[];
  };
  score: CardScore;
}

export interface CardActions {
  status: CardData2['tbh_status'];
  label: string;
  color: string;
}

export interface User {
  data(data: any): unknown;
  id: number;
  tp_partnerid: number;
  username: string;
  tu_real_username: string;
  password: string;
  tu_withdrawal_password: string;
  tu_balance: number;
  tu_code: string;
  tu_email: string | null;
  tu_real_email: string | null;
  tu_level: number;
  tu_bank: number;
  tu_acc: string;
  tu_name: string;
  tu_nickname: string;
  tu_phone: string;
  tu_point: number | null;
  tu_minipoint: number;
  tu_bonus_point: number;
  tu_last_login: string;
  tu_reg_datetime: string;
  tu_approved_datetime: string | null;
  tu_withdrawn_datetime: string | null;
  tu_status: number;
  tu_last_ip: string;
  tu_memo: string | null;
  tu_reg_ip: string;
  tu_casino_account: string | null;
  login_token: string;
  login_token_expiry: string;
  tu_casino_rg: number;
  tu_casino_rg_mcode: number;
  tu_we_token: string | null;
  tu_rg_balance: number;
  tu_honor: number;
  tu_honor_balance: number;
  tu_honor_token: string | null;
  tu_casino_onoff: number;
  tu_slot_onoff: number;
  tu_sport_onoff: number;
  tu_vinus_token: string | null;
  path: string;
  tu_referral_on_off: number;
  tu_casino_share: number;
  tu_slot_share: number;
  tu_sport_share: number;
  tu_referral_ID: number | null;
  tu_parentid: number | null;
  tu_grade: number;
  tu_honor_partnerid: number;
  tu_vinus_partnerid: number;
}

export interface DealResult {
  player_cards: Deal['player'];
  player_score: number;
  player_pair: boolean;
  banker_cards: Deal['banker'];
  banker_score: number;
  banker_pair: boolean;
  winner: string;
}

export type CardResult = `${'c' | 'd' | 'h' | 's'}_${number}`;

export interface BaccaratResult {
  playerCards: CardResult[];
  playerScore: number;
  playerPair: boolean;
  bankerCards: CardResult[];
  bankerScore: number;
  bankerPair: boolean;
  winner: 'PLAYER' | 'BANKER' | 'TIE';
}

export interface ChipProps {
  chip: string;
  xEnd: number;
  yEnd: number;
  xStart: number;
  yStart: number;
  amount: number;
  area: string;
  area2?: string;
}

export interface BoardResults {
  row: number;
  col: number;
  result: string;
  lastresult: boolean;
}

export type Board = 'BEAD' | 'BIG' | 'BIGEYEBOY' | 'SMALL' | 'COCKROACH' | 'NIUBIG';

export interface BeadPlateItem {
  row: number;
  col: number;
  result: string;
  lastresult: boolean;
}

export interface BigRoadItem extends BeadPlateItem {
  coltmp: number;
  dragontail: boolean;
}

export interface BigEyeBoyItem {
  row?: number;
  col?: number;
  result?: string;
  [key: string]: any;
}

export interface SmallRoadItem {
  row?: number;
  col?: number;
  result?: string;
  [key: string]: any;
}

export interface CockroachPigItem {
  row?: number;
  col?: number;
  result?: string;
  [key: string]: any;
}

export interface ScoreboardSummary {
  banker_pair: number;
  player_pair: number;
  banker: number;
  player: number;
  tie: number;
}

export interface ScoreboardData {
  beadPlate: BeadPlateItem[];
  bigRoad: BigRoadItem[];
  bigEyeBoy: BigEyeBoyItem[];
  smallRoad: SmallRoadItem[];
  cockroachPig: CockroachPigItem[];
  summary: ScoreboardSummary;
  round_number: number;
}

export type BetType = 'TIE' | 'PLAYER' | 'BANKER' | 'BPAIR' | 'PPAIR';

export interface Channel {
  id: number;
  tc_id: number;
  tc_name: string;
  tc_img: string | null;
  tc_logo: string | null;
  tc_gameSort: string;
  tc_gameGroup: string;
  tc_stream_url: string | null;
  tc_status: number;
  tc_reg_datetime: string;
  tc_update_datetime: string;
  tc_timer: number;
  tc_userCount: number;
  tc_betMin: number;
  tc_betMax: number;
  tc_gameName: string;
  td_name: string | undefined;
  td_img: string | undefined;
}

export interface GameCategory {
  tc_name: string;
  tc_gameType: string;
  channels: Channel[];
}

export type PlayerKey = 'banker' | 'player' | 'player_2' | 'player_3';

export type ResultValue = 'Win' | 'Lose' | 'Tie';
export type ScoreValue = string;

export interface BeadPlateItem2 {
  results: Record<PlayerKey, ResultValue>;
  scores: Record<PlayerKey, ScoreValue>;
}

export interface BigRoadNiu {
  player: BoardResults[];
  player_2: BoardResults[];
  player_3: BoardResults[];
}
export interface ScoreboardData2 {
  beadPlate: BeadPlateItem2[];
  bigRoad: BigRoadNiu;
  round_number: number;
  summary?: ScoreboardSummary;
}

export interface CardResults extends Deal {
  playerScore: number;
  bankerScore: number;
  player2Score: number;
  player3Score: number;
  playerNiu: string;
  bankerNiu: string;
  player2Niu: string;
  player3Niu: string;
}

export interface SelectedChip {
  amount: number;
  chip: string;
  x: number;
  y: number;
}

export interface BoundingRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RoundDetails {
  player_cards: string[];
  player_score: number;
  player_pair: boolean;
  banker_cards: string[];
  banker_score: number;
  banker_pair: boolean;
  winner: string;
}

export interface BetHistoryTypes {
  id: number;
  tu_userid: number;
  tbh_round_id: number;
  tc_id: number;
  ts_id: number;
  tbbh_bet_amount: number;
  tbbh_win_amount: number;
  tbbh_status: number;
  tbbh_user_cashBefore: number;
  tbbh_user_cashAfter: number;
  tbbh_netLoss: number;
  tbbh_rolling_percent: number;
  tbbh_rolling_amount: number;
  tbbh_reg_datetime: string;
  tbbh_update_datetime: string;
  tbbh_bet_option: string;
  tc_gameType: string;
  tbbh_bet_status: string;
  username: string;
  tbh_round_details: string;
}

export interface NiuUser {
  name: string;
  avatar: string;
  userid: number;
}

export interface TableSeatMap {
  [seat: string]: NiuUser | null;
}

export interface TableMap {
  [table: string]: TableSeatMap;
}

export interface BetDataEntry {
  sum: number;
}

export interface MyBet {
  data: Record<string, BetDataEntry>;
}

export interface NiuBettingProps {
  setSelectedChips: React.Dispatch<React.SetStateAction<ChipProps[]>>;
  isChipAnimating: boolean;
  setIsChipAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  tableId?: number;
  selectedChip?: SelectedChip;
  selectedSeat?: string;
  setSelectedSeat?: (data: string) => void;
  setSelectedBetOption?: (data: string) => void;
  selectedBetOption?: string;
  tableStatus?: number;
  myBetData?: any;
  seatSummary?: NiuSeatSummary;
}

export interface NiuSeatSummary {
  '1': StatItem;
  '2': StatItem;
  '3': StatItem;
}

export interface StatItem {
  sum: number;
  count: number;
}
export interface Categories {
  tc_gameType: string;
}
