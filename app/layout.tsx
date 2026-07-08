import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "视频号无水印解析 | 纯云端高清提取工具",
  description:
    "免费在线解析微信视频号视频，无水印高清下载，纯云端解析无需安装任何软件。遇到私密视频可使用视频号下载桌面版，本地网卡抓包，成功率 100%。",
  keywords: "微信视频号,无水印,下载,解析,视频号下载,高清视频",
  openGraph: {
    title: "视频号无水印解析 | 纯云端高清提取工具",
    description: "免费在线解析微信视频号视频，无水印高清下载",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#080c14]">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4GL746SRLS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-4GL746SRLS');
          `}
        </Script>
      </body>
    </html>
  );
}
