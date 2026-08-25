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
  title: "多平台无水印解析 | 微信小程序高清提取工具",
  description:
    "支持微信视频号、抖音、Bilibili 三大平台视频解析；手机微信扫码即可使用，无需下载安装桌面软件。",
  keywords: "微信视频号,抖音,Bilibili,无水印,下载,解析,视频解析,微信小程序,高清视频",
  openGraph: {
    title: "多平台无水印解析 | 微信小程序高清提取工具",
    description: "支持微信视频号、抖音、Bilibili 三大平台视频解析，手机微信扫码即可使用",
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
