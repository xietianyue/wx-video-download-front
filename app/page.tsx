'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Download,
  Play,
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  Lock,
  Eye,
  EyeOff,
  Terminal,
  Cpu,
  Radio,
  Package,
  ChevronRight,
  X,
} from 'lucide-react';

// ============================================================
// 配置常量（部署前修改这两个值）
// ============================================================
const TODAY_TOKEN = '51use888';
const WORKER_API_URL = 'https://wx-video-api.51use.cn/api/parse';
const PRO_DOWNLOAD_LINK = 'https://tooldown.51use.cn/wx_video_download_20260601.zip';
const WECHAT_OA_NAME = '51use';

// ============================================================
// 类型定义
// ============================================================
type ParseStatus = 'idle' | 'loading' | 'success' | 'error';

interface ParseResult {
  videoUrl: string;
  title?: string;
  thumb?: string;
}

// ============================================================
// 子组件：极客背景
// ============================================================
function GeekBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* 网格背景 */}
      <div className="absolute inset-0 geek-grid-bg" />

      {/* 扫描线 */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent scan-line" />

      {/* 左上角装饰 */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
      {/* 右下角装饰 */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      {/* 中心晕光 */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/3 rounded-full blur-3xl" />

      {/* 角落代码装饰 */}
      <div className="absolute top-4 left-4 text-green-500/10 text-xs font-mono select-none">
        {['SYS_INIT', 'NET_SCAN', 'PKT_CAP', 'DEC_URL'].map((t, i) => (
          <div key={i} style={{ animationDelay: `${i * 0.5}s` }}>
            [{String(i).padStart(2, '0')}] {t}... <span className="text-green-400/20">OK</span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-4 text-green-500/10 text-xs font-mono select-none text-right">
        {['v2.4.1', 'NODE:CN-SH-01', 'LATENCY:12ms', 'STATUS:ONLINE'].map((t, i) => (
          <div key={i}>{t}</div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 子组件：通行证 Modal
// ============================================================
function AuthModal({
  onSuccess,
  onClose,
}: {
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [input, setInput] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleVerify = useCallback(() => {
    if (input === TODAY_TOKEN) {
      localStorage.setItem('sph_token', TODAY_TOKEN);
      onSuccess();
    } else {
      setError('通行证错误，请重新获取');
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      setInput('');
      inputRef.current?.focus();
    }
  }, [input, onSuccess]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleVerify();
    if (e.key === 'Escape') onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal 主体 */}
      <div className="relative modal-enter w-full max-w-md">
        {/* 边框光效 */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-green-500/40 via-green-500/10 to-transparent" />

        <div className="relative bg-[#0d1520] rounded-2xl p-6 border border-green-500/20 shadow-2xl shadow-black/50">
          {/* 关闭按钮 */}
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
          >
            <X size={18} />
          </button>

          {/* 顶部图标 */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
              <Shield className="text-yellow-400" size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">系统安全验证</h3>
              <p className="text-gray-500 text-xs">Anti-Bot Protection</p>
            </div>
            {/* 状态指示灯 */}
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-yellow-400/70 text-xs font-mono">LOCKED</span>
            </div>
          </div>

          {/* 警告提示 */}
          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 mb-5">
            <div className="flex gap-2.5">
              <AlertTriangle className="text-yellow-400 shrink-0 mt-0.5" size={16} />
              <p className="text-yellow-200/80 text-sm leading-relaxed">
                ⚠️ 系统检测：为防止接口被恶意机器滥用，请输入今日免费通行证后继续使用。
              </p>
            </div>
          </div>

          {/* 获取引导 */}
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4 mb-5">
            <div className="flex gap-2.5 items-start">
              <Radio className="text-green-400 shrink-0 mt-0.5" size={16} />
              <div className="text-sm text-gray-300 leading-relaxed">
                <p>📱 微信搜索并关注公众号</p>
                <p className="font-bold text-green-400 my-1">
                  【{WECHAT_OA_NAME}】
                </p>
                <p>
                  回复关键字{' '}
                  <span className="bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded font-mono text-xs">
                    视频号
                  </span>{' '}
                  即可自动获取今日最新通行证
                </p>
              </div>
            </div>
          </div>

          {/* 输入区 */}
          <div className={`space-y-3 ${shaking ? 'animate-bounce' : ''}`}>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={16}
              />
              <input
                ref={inputRef}
                id="token-input"
                type={showPwd ? 'text' : 'password'}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError('');
                }}
                onKeyDown={handleKeyDown}
                placeholder="请输入今日通行证..."
                className="w-full bg-[#0a0f1a] border border-gray-700/50 focus:border-green-500/60 rounded-xl px-10 py-3 text-white placeholder-gray-600 outline-none transition-all text-sm font-mono tracking-widest"
              />
              <button
                id="toggle-pwd-btn"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <XCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <button
              id="verify-btn"
              onClick={handleVerify}
              disabled={!input}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-green-900/30"
            >
              <CheckCircle size={16} />
              验证通行证
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 子组件：Pro 极客版 Banner
// ============================================================
function ProBanner({ flashing }: { flashing: boolean }) {
  return (
    <div
      id="pro-banner"
      className={`relative rounded-2xl border overflow-hidden transition-all duration-300 ${flashing
        ? 'pro-flash border-yellow-400'
        : 'border-yellow-500/30 hover:border-yellow-500/60'
        }`}
    >
      {/* 渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/20 via-amber-900/15 to-orange-900/20" />

      {/* 顶部光条 */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />

      <div className="relative p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* 左侧图标区 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center shrink-0 pulse-glow">
              <Cpu className="text-yellow-400" size={24} />
            </div>
            <div className="sm:hidden">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-400 font-black text-base">Pro 极客版</span>
                <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-0.5 rounded-full font-bold border border-yellow-500/30">
                  推荐
                </span>
              </div>
            </div>
          </div>

          {/* 中间文字区 */}
          <div className="flex-1">
            <div className="hidden sm:flex items-center gap-2 mb-1.5">
              <span className="text-yellow-400 font-black text-lg">网页版解析失败或遇到私密视频？</span>
            </div>
            <div className="sm:hidden text-yellow-200/70 text-sm leading-relaxed">
              网页版解析失败或遇到私密视频时推荐使用
            </div>
            <p className="hidden sm:block text-gray-300/80 text-sm leading-relaxed">
              请使用{' '}
              <span className="text-yellow-300 font-bold">Pro 极客版（Windows 桌面端）</span>
              ，采用本地网卡底层物理抓包技术，<span className="text-green-400 font-bold">成功率 100%</span>。
            </p>

            {/* 特性标签 */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                { icon: <Zap size={11} />, label: '底层网卡抓包' },
                { icon: <Shield size={11} />, label: '支持私密视频' },
                { icon: <Terminal size={11} />, label: '无需Root权限' },
              ].map((tag, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-300/80 text-xs px-2.5 py-1 rounded-full"
                >
                  {tag.icon}
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          {/* 右侧下载按钮 */}
          <a
            id="pro-download-btn"
            href={PRO_DOWNLOAD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black text-sm px-5 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-yellow-900/40 hover:shadow-yellow-900/60 hover:scale-105 active:scale-95"
          >
            <Package size={16} />
            <span className="whitespace-nowrap">下载 Pro 极客版 (ZIP)</span>
            <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 主页面组件
// ============================================================
export default function HomePage() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<ParseStatus>('idle');
  const [result, setResult] = useState<ParseResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [proFlashing, setProFlashing] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 触发 Pro Banner 闪烁
  const triggerProFlash = useCallback(() => {
    setProFlashing(true);
    setTimeout(() => setProFlashing(false), 4000);
    // 平滑滚动到 Banner
    setTimeout(() => {
      document.getElementById('pro-banner')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 300);
  }, []);

  // 核心解析函数
  const doParse = useCallback(async (targetUrl: string) => {
    setStatus('loading');
    setResult(null);
    setErrorMsg('');

    try {
      const res = await fetch(WORKER_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
        signal: AbortSignal.timeout(30000),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || `服务器返回错误 (${res.status})`);
      }

      setResult({
        videoUrl: data.videoUrl,
        title: data.title,
        thumb: data.thumb,
      });
      setStatus('success');
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.name === 'TimeoutError'
            ? '解析超时，请稍后重试'
            : err.message
          : '未知错误，请稍后重试';
      setErrorMsg(message);
      setStatus('error');
      triggerProFlash();
    }
  }, [triggerProFlash]);

  // 点击解析按钮
  const handleParse = useCallback(() => {
    if (!url.trim()) return;
    const token = localStorage.getItem('sph_token');
    if (token === TODAY_TOKEN) {
      doParse(url.trim());
    } else {
      setShowModal(true);
    }
  }, [url, doParse]);

  // 通行证验证成功回调
  const handleAuthSuccess = useCallback(() => {
    setShowModal(false);
    doParse(url.trim());
  }, [url, doParse]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleParse();
  };

  // 统计数字（仅展示用）
  const stats = [
    { label: '累计解析', value: '128,491', unit: '次' },
    { label: '今日成功', value: '2,847', unit: '次' },
    { label: '平均耗时', value: '1.2', unit: 's' },
    { label: '服务可用', value: '99.9', unit: '%' },
  ];

  return (
    <div className="relative min-h-screen text-gray-100 overflow-x-hidden">
      <GeekBackground />

      {/* 通行证 Modal */}
      {showModal && (
        <AuthModal
          onSuccess={handleAuthSuccess}
          onClose={() => setShowModal(false)}
        />
      )}

      <main className="relative z-10 max-w-3xl mx-auto px-4 py-10 sm:py-16">

        {/* ── 顶部 LOGO / 标题区 ── */}
        <div className="text-center mb-10">
          {/* 徽章 */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/25 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-mono tracking-widest uppercase">
              Cloud Parser Online
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
            视频号{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              无水印
            </span>{' '}
            解析
          </h1>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            纯云端解析 · 免安装 · 提取{' '}
            <span className="text-cyan-400 font-semibold">高清视频</span>
          </p>

          {/* 统计数字栏 */}
          <div className="grid grid-cols-4 gap-3 mt-8">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white/3 border border-white/8 rounded-xl py-3 px-2"
              >
                <div className="text-white font-black text-lg sm:text-xl font-mono">
                  {s.value}
                  <span className="text-green-400 text-sm">{s.unit}</span>
                </div>
                <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 核心操作区 ── */}
        <div className="relative mb-6">
          {/* 外层卡片 */}
          <div
            className={`relative rounded-2xl border transition-all duration-300 ${inputFocused
              ? 'border-green-500/50 shadow-lg shadow-green-900/20'
              : 'border-white/10'
              } bg-[#0d1520]/80 backdrop-blur-xl p-5 sm:p-6`}
          >
            {/* 顶部光条 */}
            <div
              className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent transition-opacity duration-300 ${inputFocused ? 'opacity-100' : 'opacity-0'
                }`}
            />

            {/* 输入框 */}
            <div className="relative mb-4">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Play size={16} />
              </div>
              <input
                id="url-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder="请输入微信视频号分享链接 (如 https://weixin.qq.com/sph/...)"
                className="w-full bg-[#080c14] border border-gray-700/40 focus:border-green-500/50 rounded-xl pl-10 pr-4 py-4 text-white placeholder-gray-600 outline-none transition-all text-sm"
              />
              {url && (
                <button
                  onClick={() => setUrl('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* 解析按钮 */}
            <button
              id="parse-btn"
              onClick={handleParse}
              disabled={!url.trim() || status === 'loading'}
              className="w-full py-4 rounded-xl font-black text-base transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg shadow-green-900/30 hover:shadow-green-900/50 hover:scale-[1.01] active:scale-[0.99]"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="spin-slow" size={20} />
                  正在云端解析真实地址，请稍候...
                </>
              ) : (
                <>
                  <Zap size={20} />
                  立即解析
                </>
              )}
            </button>

            {/* 底部提示 */}
            <p className="text-center text-gray-600 text-xs mt-3 font-mono">
              支持 weixin.qq.com / channels.weixin.qq.com 链接格式
            </p>
          </div>
        </div>

        {/* ── 解析结果区 ── */}
        {status === 'loading' && (
          <div className="rounded-2xl border border-green-500/20 bg-[#0d1520]/80 backdrop-blur-xl p-8 mb-6 text-center fade-in-up">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-green-500/20" />
              <div className="absolute inset-0 rounded-full border-t-2 border-green-400 spin-slow" />
              <div className="absolute inset-2 rounded-full border-t border-cyan-400/50" style={{ animation: 'spin-slow 1s linear infinite reverse' }} />
              <Cpu className="absolute inset-0 m-auto text-green-400" size={20} />
            </div>
            <p className="text-green-400 font-mono text-sm">正在云端解析真实地址，请稍候...</p>
            <p className="text-gray-600 text-xs mt-1 font-mono">Fetching video metadata from CDN...</p>
          </div>
        )}

        {status === 'success' && result && (
          <div className="rounded-2xl border border-green-500/30 bg-[#0d1520]/80 backdrop-blur-xl overflow-hidden mb-6 fade-in-up success-glow">
            {/* 成功头部 */}
            <div className="flex items-center gap-2.5 px-5 py-3.5 bg-green-500/10 border-b border-green-500/20">
              <CheckCircle className="text-green-400" size={16} />
              <span className="text-green-400 text-sm font-bold">解析成功 · 高清视频就绪</span>
              <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>

            {/* 视频播放器 */}
            <div className="p-5">
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video mb-4 border border-white/5">
                <video
                  ref={videoRef}
                  src={result.videoUrl}
                  poster={result.thumb}
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                  crossOrigin="anonymous"
                />
              </div>

              {/* 视频标题 */}
              {result.title && (
                <p className="text-gray-300 text-sm font-medium mb-4 line-clamp-2 px-1">
                  {result.title}
                </p>
              )}

              {/* 下载按钮 */}
              <a
                id="download-video-btn"
                href={result.videoUrl}
                download="wechat-video.mp4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-green-900/30 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Download size={18} />
                下载高清视频 (MP4)
              </a>

              <p className="text-center text-gray-600 text-xs mt-3 font-mono">
                ⚠️ 如下载受阻，请右键视频播放器 → 另存为
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-2xl border border-red-500/30 bg-red-900/10 backdrop-blur-xl p-5 mb-6 fade-in-up">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <XCircle className="text-red-400" size={16} />
              </div>
              <div className="flex-1">
                <p className="text-red-300 font-bold text-sm mb-1">解析失败</p>
                <p className="text-gray-400 text-sm">{errorMsg}</p>
                <p className="text-gray-500 text-xs mt-2 font-mono">
                  建议：请检查链接格式，或使用下方 Pro 极客版重试
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Pro 极客版 Banner ── */}
        <ProBanner flashing={proFlashing} />

        {/* ── 底部说明 ── */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: <Shield size={18} className="text-green-400" />, title: '隐私安全', desc: '链接仅用于解析，不作任何存储' },
            { icon: <Zap size={18} className="text-cyan-400" />, title: '极速解析', desc: '全球 CDN 节点加速，秒级响应' },
            { icon: <Terminal size={18} className="text-purple-400" />, title: '纯云端', desc: '无需安装插件或客户端' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/2 border border-white/6 rounded-xl p-4 hover:border-white/12 transition-colors"
            >
              <div className="flex justify-center mb-2">{item.icon}</div>
              <div className="text-white text-xs font-bold mb-1">{item.title}</div>
              <div className="text-gray-600 text-xs leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-gray-700 text-xs font-mono space-y-1">
          <p>本工具仅供个人学习与研究使用，请勿用于商业或违法用途</p>
          <p className="text-gray-800">
            © 2025 SPH Parser · Powered by Cloudflare Workers
          </p>
        </div>
      </main>
    </div>
  );
}
