This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 準備
1. Firebaseの準備
    - Firebaseプロジェクトを作成しアプリを登録。そこで認証及びWebアプリを追加する。
        - [参考](https://firebase.google.com/docs/web/setup?hl=ja&authuser=0) 
    - Firebaseプロジェクトの設定 > サービスアカウント > 秘密鍵の作成 を行う
2. 1.及び[.devcontainer.env.template](./.devcontainer/.env.template)を参考に[.devcontainer/.env](./.devcontainer/.env)ファイルを作成する。
3. 実行(以下のいずれか)
    - DevContainerで動かす
    - 環境変数[.devcontainer/.env](./.devcontainer/.env)をセットしたのち、[Getting Started](#getting-started)を参考に動かす
    ```環境変数をセット.sh
    #!/bin/bash

    # .envファイルのパスを指定
    ENV_FILE="./.devcontainer/.env"

    # .envファイルが存在するか確認
    if [ -f "$ENV_FILE" ]; then
        # .envファイルを読み込み、各行をエクスポート
        while IFS= read -r line || [ -n "$line" ]; do
            # コメント行や空行を無視
            if [[ $line == \#* ]] || [[ -z $line ]]; then
                continue
            fi
            
            # 変数名と値に分割
            IFS='=' read -r key value <<< "$line"
            
            # 変数をエクスポート
            export "$key=$value"
        done < "$ENV_FILE"
    else
        echo "$ENV_FILE ファイルが見つかりません"
    fi
    ```
    

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
