import {
  CheckCircle2,
  ChevronRight,
  Home,
  MessageCircle,
  MonitorUp,
  MousePointerClick,
  QrCode,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react';
import Image from 'next/image';

function GeekBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 geek-grid-bg" />
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent scan-line" />
      <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute top-4 left-4 hidden text-xs font-mono text-green-500/15 sm:block">
        <div>[00] MINI_APP_ROUTE ... OK</div>
        <div>[01] QR_CHANNEL ...... READY</div>
        <div>[02] WX_AD_SERVICE ... ONLINE</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080c14]">
      <GeekBackground />

      <main className="relative z-10 mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <div className="mb-9 flex justify-center sm:justify-start">
          <a href="https://51use.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 rounded-full border border-white/10 bg-[#0d1520]/80 px-4 py-2 text-xs font-medium tracking-wide text-gray-400 shadow-lg shadow-black/40 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10 hover:text-white sm:text-sm">
            <span className="rounded-full bg-white/5 p-1 transition group-hover:bg-green-500/20"><Home size={14} className="transition group-hover:text-green-400" /></span>
            返回 51USE 工具站
          </a>
        </div>

        <section className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-green-400">Mini Program Service Online</span>
          </div>
          <h1 className="mb-3 text-4xl font-black leading-tight text-white sm:text-5xl">多平台 <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">无水印</span> 解析</h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">支持微信视频号、抖音、Bilibili 三大平台，打开小程序即可解析并保存高清视频。</p>
        </section>

        <section className="relative mt-9 overflow-hidden rounded-3xl border border-green-500/25 bg-[#0d1520]/90 p-5 shadow-2xl shadow-green-950/30 backdrop-blur-xl sm:min-h-[330px] sm:p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-400/70 to-transparent" />
          <div className="grid items-center gap-7 sm:grid-cols-[1fr_264px] sm:gap-9">
            <div className="order-2 text-center sm:order-1 sm:text-left">
              <div className="mb-3 flex items-center justify-center gap-2 sm:justify-start"><Smartphone className="text-green-400" size={21} /><span className="font-mono text-sm font-bold tracking-wide text-green-300">微信扫码访问</span></div>
              <h2 className="text-2xl font-black text-white sm:text-3xl">打开小程序，开始解析</h2>
              <p className="mt-3 text-sm leading-7 text-gray-400">使用手机微信扫一扫右侧小程序码，进入后粘贴各平台的视频分享链接即可解析。无需下载桌面软件。</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
                {['微信视频号', '抖音', 'Bilibili'].map((item) => <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs text-green-300"><CheckCircle2 size={13} />{item}</span>)}
              </div>
            </div>
            <div className="order-1 mx-auto flex h-[232px] w-[232px] shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-[0_0_35px_rgba(74,222,128,0.2)] sm:order-2 sm:h-[264px] sm:w-[264px]">
              <Image src="/51use-miniprogram.jpg" alt="51USE 多平台视频解析微信小程序码，请使用手机微信扫码" width={260} height={260} className="h-full w-full rounded-xl object-contain" priority />
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-5 sm:min-h-[330px] sm:p-8">
          <div className="grid items-center gap-7 sm:grid-cols-[1fr_264px] sm:gap-9">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl border border-cyan-400/25 bg-cyan-400/10 p-2 text-cyan-300"><MessageCircle size={19} /></div>
              <div>
              <h2 className="font-bold text-cyan-100">已经在电脑上打开微信？</h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">可在电脑版微信顶部搜索框搜索小程序名称，再从搜索结果中打开。</p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-[#080c14]/70 px-3 py-2 font-mono text-sm text-cyan-300"><Search size={16} /> 搜索：<strong>51use</strong></div>
              <p className="mt-2 text-xs leading-5 text-gray-500">若未搜到或未适配电脑端，请使用手机微信扫描上方小程序码，这是最稳定的访问方式。</p>
              </div>
            </div>
            <figure className="mx-auto flex h-[232px] w-[232px] flex-col overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#080c14] p-1.5 shadow-lg shadow-cyan-950/30 sm:h-[264px] sm:w-[264px]">
              <Image src="/search.png" alt="电脑版微信搜索 51use 后的小程序结果示例" width={404} height={504} className="min-h-0 flex-1 rounded-lg object-contain" />
              <figcaption className="px-1 pt-1.5 text-center text-[10px] text-cyan-200/70">搜索结果示例</figcaption>
            </figure>
          </div>
        </section>

        <section className="mt-5 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-5 sm:min-h-[330px] sm:p-8">
          <div className="grid items-center gap-7 sm:grid-cols-[1fr_264px] sm:gap-9">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl border border-blue-400/25 bg-blue-400/10 p-2 text-blue-300"><MonitorUp size={19} /></div>
              <div>
                <h2 className="font-bold text-blue-100">扫码后，也能一键在电脑打开</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">手机微信扫码进入小程序后，点击右上角的 <strong className="font-medium text-blue-200">“…”</strong>，在下方菜单选择 <strong className="font-medium text-blue-200">“在电脑上打开”</strong>。</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-blue-400/20 bg-[#080c14]/70 px-3 py-2 font-mono text-sm text-blue-300"><MousePointerClick size={16} /> … &nbsp;→&nbsp; <strong>在电脑上打开</strong></div>
                <p className="mt-2 text-xs leading-5 text-gray-500">适合已用手机扫码进入小程序的用户，可直接把当前小程序同步到电脑版微信。</p>
              </div>
            </div>
            <figure className="mx-auto flex h-[232px] w-[232px] flex-col overflow-hidden rounded-2xl border border-blue-400/20 bg-[#080c14] p-1.5 shadow-lg shadow-blue-950/30 sm:h-[264px] sm:w-[264px]">
              <Image src="/tis.png" alt="小程序右上角菜单中选择在电脑上打开的示例" width={423} height={900} className="min-h-0 flex-1 rounded-lg object-contain" />
              <figcaption className="px-1 pt-1.5 text-center text-[10px] text-blue-200/70">“在电脑上打开”示例</figcaption>
            </figure>
          </div>
        </section>

        <section className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            { icon: <QrCode size={19} />, title: '第一步', desc: '手机微信扫一扫小程序码', color: 'text-green-400' },
            { icon: <MousePointerClick size={19} />, title: '第二步', desc: '粘贴各平台视频分享链接', color: 'text-cyan-400' },
            { icon: <Zap size={19} />, title: '第三步', desc: '解析并保存高清视频', color: 'text-purple-400' },
          ].map((item) => <div key={item.title} className="rounded-xl border border-white/8 bg-white/[0.03] p-4 text-center"><div className={`mb-2 flex justify-center ${item.color}`}>{item.icon}</div><h3 className="text-sm font-bold text-white">{item.title}</h3><p className="mt-1 text-xs text-gray-500">{item.desc}</p></div>)}
        </section>

        <div className="mt-8 flex justify-center"><a href="#" className="group inline-flex items-center gap-2 text-sm font-medium text-green-400 transition hover:text-green-300"><Sparkles size={16} /> 使用微信扫码，立即开始<ChevronRight size={16} className="transition group-hover:translate-x-1" /></a></div>

        <footer className="mt-10 text-center text-xs leading-6 text-gray-600"><div className="mb-2 flex justify-center"><ShieldCheck size={16} className="text-green-500/70" /></div><p>本工具仅供个人学习与研究使用，请勿用于商业或违法用途</p><p className="mt-1">由 51USE 工具站提供 · 视频号解析工具</p></footer>
      </main>
    </div>
  );
}
