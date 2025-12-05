# OAuth 登入系統

一個支援一般帳號密碼登入與 Microsoft OAuth 登入的 Next.js 網站專案。

## 功能特色

- 🔐 一般帳號密碼登入
- 🪟 Microsoft OAuth 登入整合
- 📱 響應式設計（支援桌面與行動裝置）
- 🌙 深色模式支援
- 🔒 安全的 Session 管理
- 🚀 基於 Next.js 16 與 TypeScript

## 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 環境變數設定

複製環境變數範本並填入您的設定：

```bash
# 開發環境
cp .env.development .env.local
```

編輯 `.env.local` 填入您的 Microsoft Azure 設定：

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Microsoft OAuth 設定
AZURE_AD_CLIENT_ID=your-azure-client-id
AZURE_AD_CLIENT_SECRET=your-azure-client-secret
AZURE_AD_TENANT_ID=your-azure-tenant-id
```

### 3. 執行開發伺服器

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

## 環境變數

### `.env.development` - 開發環境
### `.env.production` - 正式環境

| 變數名稱 | 說明 |
|---------|------|
| `NEXTAUTH_URL` | 應用程式的基礎 URL |
| `NEXTAUTH_SECRET` | NextAuth.js 的加密金鑰 |
| `AZURE_AD_CLIENT_ID` | Microsoft Azure AD 應用程式 ID |
| `AZURE_AD_CLIENT_SECRET` | Microsoft Azure AD 應用程式密鑰 |
| `AZURE_AD_TENANT_ID` | Microsoft Azure AD 租用戶 ID |

## 測試帳號

開發環境內建測試帳號：

| Email | 密碼 |
|-------|------|
| admin@example.com | password123 |
| user@example.com | user123 |

## 專案結構

```
├── app/                    # Next.js App Router 頁面
│   ├── api/auth/          # NextAuth.js API 路由
│   ├── dashboard/         # 登入後的儀表板頁面
│   ├── login/             # 登入頁面
│   └── page.tsx           # 首頁
├── components/            # React 元件
├── lib/                   # 工具函式與設定
│   └── auth.ts           # NextAuth.js 設定
├── types/                 # TypeScript 類型定義
├── .env.development       # 開發環境變數
└── .env.production        # 正式環境變數
```

## Microsoft OAuth 設定步驟

1. 前往 [Azure Portal](https://portal.azure.com/)
2. 建立或選擇 Azure Active Directory
3. 進入「應用程式註冊」
4. 新增應用程式
5. 設定重新導向 URI：`https://your-domain.com/api/auth/callback/microsoft-entra-id`
6. 複製 Application (client) ID 到 `AZURE_AD_CLIENT_ID`
7. 建立 Client Secret 並複製到 `AZURE_AD_CLIENT_SECRET`
8. 複製 Directory (tenant) ID 到 `AZURE_AD_TENANT_ID`

## 部署

### Vercel 部署

1. 將專案推送到 GitHub
2. 在 [Vercel](https://vercel.com) 匯入專案
3. 設定環境變數
4. 部署

## 技術棧

- [Next.js 16](https://nextjs.org/) - React 框架
- [NextAuth.js](https://authjs.dev/) - 認證解決方案
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [TypeScript](https://www.typescriptlang.org/) - 類型安全
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - 密碼加密
