import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle, Shield, Zap, BarChart3, Lock, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

/**
 * EasyLot HUD 1.0 - Professional Trading Dashboard Landing Page
 * Design: Dark theme with Emerald Green (#10b981) for profit/long and Rose Red (#f43f5e) for risk/short
 * Typography: Poppins for headings, Inter for body, JetBrains Mono for trading metrics
 * Visual Language: Bloomberg Terminal / TradingView Pro inspired HUD aesthetic
 */

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    atasId: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.atasId) {
      toast.error("請填寫電子信箱和 ATAS 帳號");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("申請已提交！我們將在 24 小時內與您聯繫。");
      setFormData({ email: "", atasId: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/manus-storage/easylot-logo_c273bf6b.png"
              alt="EasyLot HUD Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold font-poppins">EasyLot HUD</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              功能特點
            </a>
            <a
              href="#security"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              安全性
            </a>
            <a
              href="#trial"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              免費試用
            </a>
          </nav>
          <button className="btn-primary text-sm">申請 7 天試用</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-border/50">
        {/* Background gradient with HUD grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-rose-500/5 pointer-events-none" />
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(16, 185, 129, 0.1) 25%, rgba(16, 185, 129, 0.1) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.1) 75%, rgba(16, 185, 129, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(16, 185, 129, 0.1) 25%, rgba(16, 185, 129, 0.1) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.1) 75%, rgba(16, 185, 129, 0.1) 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px'
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 w-fit">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400">LIVE TRADING HUD</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-poppins leading-tight">
                  EasyLot HUD 1.0
                  <br />
                  <span className="text-gradient">
                    專業交易者的即時風險管家
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  即時紅綠線盈虧預估、智慧手數自動計算、風險預設一鍵切換
                  <br />
                  支援 <span className="font-mono text-emerald-400">$100 / $200 / $500 / $640</span> 風險快捷鍵，並可自訂
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="btn-primary flex items-center justify-center gap-2">
                  立即申請試用
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="btn-secondary flex items-center justify-center gap-2">
                  了解更多
                </button>
              </div>

              {/* Trust badges with trading metrics */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground font-mono">TRIAL</div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-semibold">7 天免費</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground font-mono">AUTH</div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-semibold">RSA 離線</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground font-mono">LATENCY</div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-semibold">零延遲</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Product Image */}
            <div className="relative">
              <div className="card-glass glow-emerald border-emerald-500/30">
                <img
                  src="/manus-storage/trading-chart-placeholder_b1ed5151.png"
                  alt="EasyLot HUD 產品展示"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              {/* Decorative HUD corners */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-emerald-500/30 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-2 border-rose-500/30 rounded-full" />
              <div className="absolute top-8 -right-8 w-1 h-16 bg-gradient-to-b from-emerald-500/50 to-transparent" />
              <div className="absolute bottom-8 -left-8 w-1 h-16 bg-gradient-to-t from-rose-500/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-card/30 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 mb-4">
              <span className="text-xs font-mono text-emerald-400">CORE FEATURES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              四大智慧功能
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              為專業交易者設計，讓複雜的下單邏輯變得簡單直觀
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature Card 1 */}
            <div className="card-glass group animate-fade-in-up border-l-4 border-l-emerald-500/50 hover:border-l-emerald-500" style={{animationDelay: '0ms'}}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold font-poppins">即時盈虧視覺化</h3>
                    <span className="text-xs font-mono px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">PROFIT</span>
                  </div>
                  <p className="text-muted-foreground">
                    紅線止損、綠線止盈，拖動時即時顯示金額與 R 倍數。直觀掌握每筆交易的風險收益比。
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="card-glass group animate-fade-in-up border-l-4 border-l-emerald-500/50 hover:border-l-emerald-500" style={{animationDelay: '50ms'}}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold font-poppins">一鍵切換與自訂</h3>
                    <span className="text-xs font-mono px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">QUICK</span>
                  </div>
                  <p className="text-muted-foreground">
                    支援 <span className="font-mono">$100 / $200 / $500 / $640</span> 風險快捷鍵。無需重複計算，一鍵切換風險等級。
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="card-glass group animate-fade-in-up border-l-4 border-l-emerald-500/50 hover:border-l-emerald-500" style={{animationDelay: '100ms'}}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                    <BarChart3 className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold font-poppins">智慧手數計算</h3>
                    <span className="text-xs font-mono px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">AUTO</span>
                  </div>
                  <p className="text-muted-foreground">
                    自動依風險算手數 vs 固定手數防護。系統自動匹配最適合的下單手數。
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="card-glass group animate-fade-in-up border-l-4 border-l-rose-500/50 hover:border-l-rose-500" style={{animationDelay: '150ms'}}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-rose-500/20 group-hover:bg-rose-500/30 transition-colors">
                    <Shield className="w-6 h-6 text-rose-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold font-poppins">Tick Size 防禦</h3>
                    <span className="text-xs font-mono px-2 py-1 rounded bg-rose-500/20 text-rose-400">RISK</span>
                  </div>
                  <p className="text-muted-foreground">
                    自動驗算防範平台抓錯規格。確保每筆交易都符合交易所規則。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-20 md:py-32 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 mb-4">
              <span className="text-xs font-mono text-emerald-400">DEMO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              1 分鐘快速上手
            </h2>
            <p className="text-lg text-muted-foreground">
              觀看操作示範，了解如何使用 EasyLot HUD 進行智慧下單
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="card-glass glow-emerald aspect-video flex items-center justify-center border-emerald-500/30">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="EasyLot HUD 操作示範"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
            {/* HUD corner markers */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500/50" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500/50" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500/50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500/50" />
          </div>
        </div>
      </section>

      {/* Security / Licensing Section */}
      <section id="security" className="py-20 md:py-32 bg-card/30 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="card-glass border-l-4 border-l-emerald-500">
              <div className="flex items-start gap-4">
                <Lock className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold font-poppins">
                      RSA 離線授權保障
                    </h2>
                    <span className="text-xs font-mono px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">SECURE</span>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex gap-3">
                      <div className="w-1 bg-emerald-500/50 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground mb-1">零連線延遲</p>
                        <p>授權完全離線運行，無需依賴網路連線，確保交易系統的穩定性和速度。</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-1 bg-emerald-500/50 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground mb-1">極致隱私保護</p>
                        <p>您的交易數據、帳號資訊完全保存在本地，不上傳到任何雲端伺服器。</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-1 bg-emerald-500/50 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground mb-1">專人重新簽發保障</p>
                        <p>如需更新或遷移，我們提供專人服務重新簽發授權，確保您的使用權益。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Form Section */}
      <section id="trial" className="py-20 md:py-32 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="card-glass border-t-2 border-t-emerald-500">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-3xl font-bold font-poppins">申請 7 天免費試用</h2>
                <span className="text-xs font-mono px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">TRIAL</span>
              </div>
              <p className="text-muted-foreground mb-8">
                填寫下方表單，我們將在 24 小時內為您開通試用帳號
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <span className="font-mono text-xs text-emerald-400">EMAIL</span>
                    您的電子信箱 <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="bg-input border-border focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <span className="font-mono text-xs text-emerald-400">ATAS ID</span>
                    ATAS 帳號 / 用戶 ID <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="atasId"
                    placeholder="例: user123"
                    value={formData.atasId}
                    onChange={handleFormChange}
                    className="bg-input border-border focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">MSG</span>
                    想對我說的話
                  </label>
                  <Textarea
                    name="message"
                    placeholder="例: 我主要交易期貨，希望了解更多功能..."
                    value={formData.message}
                    onChange={handleFormChange}
                    className="bg-input border-border focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 min-h-24"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "提交中..." : "提交申請"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  我們尊重您的隱私。您的信息僅用於試用帳號開通和產品支援。
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold font-poppins mb-4 flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400">ABOUT</span>
                關於 EasyLot
              </h3>
              <p className="text-sm text-muted-foreground">
                為專業交易者打造的即時風險管家，讓複雜的下單邏輯變得簡單直觀。
              </p>
            </div>
            <div>
              <h3 className="font-semibold font-poppins mb-4 flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400">LINKS</span>
                快速連結
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    功能特點
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:text-foreground transition-colors">
                    安全性
                  </a>
                </li>
                <li>
                  <a href="#trial" className="hover:text-foreground transition-colors">
                    免費試用
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold font-poppins mb-4 flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400">CONTACT</span>
                聯絡我們
              </h3>
              <p className="text-sm text-muted-foreground">
                support@easylot.com
                <br />
                +886 (02) 1234-5678
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>
              © 2026 EasyLot HUD. <span className="font-mono text-emerald-400">v1.0.0</span> 保留所有權利。
            </p>
            <p>
              免責聲明：EasyLot HUD 為輔助交易工具，不構成投資建議。交易涉及風險，請自行評估。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
