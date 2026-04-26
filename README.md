# かんたん寄せ書き

退職・送別・誕生日・結婚祝いなどの寄せ書きをオンラインで集めて、PDFとして出力できるWebサービス。

仕様書: [docs/03_kantan_yosegaki.md](docs/03_kantan_yosegaki.md)

## MVP機能

- 寄せ書き作成(タイトル・贈る相手・締切・幹事名)
- 幹事用URL / 参加者用URL の発行
- メッセージ投稿(名前・本文・カード色)
- メッセージ一覧表示(レスポンシブグリッド)
- PDFダウンロード(@react-pdf/renderer)
- メッセージ削除(自分のものは投稿時のlocalStorageで識別 / 幹事は全件)

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数

```bash
cp .env.example .env.local
```

[Supabaseのダッシュボード](https://supabase.com/dashboard) で新規プロジェクトを作成し、以下を設定:

- `NEXT_PUBLIC_SUPABASE_URL` — Project Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Project Settings → API → anon public
- `SUPABASE_SERVICE_ROLE_KEY` — Project Settings → API → service_role(**シークレット**)
- `NEXT_PUBLIC_SITE_URL` — 共有URLの組み立てに使用(ローカルは `http://localhost:3000`)

### 3. データベースマイグレーション

[supabase/migrations/](supabase/migrations/) のSQLをSupabaseのSQL Editorで順に実行してください。

```
0001_create_boards.sql
0002_create_messages.sql
```

または Supabase CLI を使う場合:

```bash
npx supabase db push
```

### 4. 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 を開く。

## スクリプト

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番サーバー起動 |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript型チェック |
| `npm test` | ユニットテスト(vitest) |

## ディレクトリ構成

```
src/
├── app/                    # Next.js App Router
│   ├── api/                # APIルート(boards, messages, pdf)
│   ├── new/                # 寄せ書き作成
│   ├── boards/[id]/        # 参加者ビュー
│   └── admin/[adminToken]/ # 幹事ビュー
├── components/             # React コンポーネント
├── features/               # ドメイン別ロジック (boards / messages / pdf)
├── lib/                    # supabase / id生成 / utils
└── types/                  # DB型定義

supabase/migrations/        # SQL マイグレーション
tests/unit/                 # ユニットテスト
```

## デプロイ

Vercelにそのままデプロイ可能。Project Settings で `.env.local` と同じ環境変数を設定してください。

## ライセンス

MIT
