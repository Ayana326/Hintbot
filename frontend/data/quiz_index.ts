import { QuizType } from "@/types/Project";

export const quizzes: QuizType[] = [
  {
    id: "0000001",
    type: "print",
    title: "print文 1",
    abstract: "Hello Worldの出力",
    content: "「 Hello World 」と出力してください",
  },
  {
    id: "0000002",
    type: "print",
    title: "print文 2",
    abstract: "数値の出力",
    content: "数値の 7 を出力してください",
  },
  {
    id: "0000003",
    type: "print",
    title: "print文 3",
    abstract: "計算結果の出力",
    content: "5 を 2 で割った時の余りを出力してください",
  },
  {
    id: "0000004",
    type: "variable",
    title: "変数 1",
    abstract: "文字列の代入",
    content: "変数 name に文字列「 山田太郎 」を代入して、出力してください",
  },
  {
    id: "0000005",
    type: "variable",
    title: "変数 2",
    abstract: "数値の代入",
    content:
      "変数 num に 1 を足して、変数 numを上書きした結果を出力してください",
  },
  {
    id: "0000006",
    type: "conditional_branch",
    title: "if文 1",
    abstract: "単独の条件分岐",
    content: "変数 age が18以上の場合、「成人です。」と出力してください",
  },
  {
    id: "0000007",
    type: "conditional_branch",
    title: "if文 2",
    abstract: "単独の条件分岐",
    content:
      "変数 age が18以上の場合、「成人です。」, 変数 age が18未満の場合、「未成年です。」と出力してください",
  },
  {
    id: "0000008",
    type: "conditional_branch",
    title: "if文 3",
    abstract: "複数の条件分岐",
    content:
      "変数 age が18以上の場合、「成人です。」 変数 age が18未満の場合、「未成年です。」, 変数 age が65以上の場合、「高齢者です。」と出力してください",
  },
  {
    id: "0000009",
    type: "loop",
    title: "for文 1",
    abstract: "for文を使ったループ処理1",
    content: "ループ処理を用いて0から10まで出力してください",
  },
  {
    id: "0000010",
    type: "loop",
    title: "for文 2",
    abstract: "for文を使ったループ処理2",
    content: "ループ処理を用いて1から10まで出力してください",
  },
  {
    id: "0000011",
    type: "comprehensive",
    title: "FizzBuzz",
    abstract: "出力・数値計算・条件分岐・ループ処理の総合問題",
    content: `1から100までの数字について、以下の条件に合った出力を行ってください。

3の倍数のときは「Fizz」を出力
5の倍数のときは「Buzz」を出力
3の倍数かつ5の倍数のときは「FizzBuzz」を出力
それ以外の場合は数字そのものを出力
    `,
  },
  {
    id: "00000012",
    type: "comprehensive",
    title: "Frog1",
    abstract: "アルゴリズム",
    stdin: "4\n10 30 40 20",
    content: `
    N 個の足場があります。足場には 1,2,…,N と番号が振られています。
    各i(1≤i≤N)について、足場iの高さはh_iです。
    最初、足場1にカエルがいます。カエルは次の行動を何回か繰り返し、足場Nまで辿り着こうとしています。
    ・足場iにいるとき、足場i+1またはi+2へジャンプする。このとき、ジャンプ先の足場をjとすると、コスト|h_i-h_j|を支払う。
    カエルが足場Nに辿り着くまでに支払うコストの総和の最小値を求めてください。\n
    入力は以下の形式で標準入力から与えられる
    N\n
    h_1, h_2, ... , h_N
    `,
    answer: "30"
  },
];
