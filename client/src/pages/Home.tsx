import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle, Shield, Zap, BarChart3, Lock, TrendingUp, TrendingDown, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { translations, Language } from "../i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const [lang, setLang] = useState<Language>("zh");
  const t = translations[lang];

  const [formData, setFormData] = useState({
    email: "",
    atasId: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize language from browser preference
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("en")) {
      setLang("en");
    } else if (browserLang.includes("cn") || browserLang.includes("hans")) {
      setLang("sc");
    } else {
      setLang("zh");
    }
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openMailto = (customMessage?: string) => {
    const subject = encodeURIComponent(t.emailSubject);
    let bodyText = t.emailBodyBase;
    
    if (customMessage) {
      bodyText = customMessage;
    } else {
      bodyText += `\n\n${lang === 'en' ? 'Email' : '電子信箱'}：\n${lang === 'en' ? 'ATAS ID' : 'ATAS 帳號'}：\n\n${lang === 'en' ? 'Looking forward to your reply, thank you!' : '期待您的回覆，謝謝！'}`;
    }
    
    const body = encodeURIComponent(bodyText);
    window.open(`mailto:support@easylot.com?subject=${subject}&body=${body}`, "_blank");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.atasId) {
      toast.error(t.toastError);
      return;
    }
    setIsSubmitting(true);
    
    const customBody = `${t.emailBodyBase}\n\n${lang === 'en' ? 'Email' : '電子信箱'}：${formData.email}\n${lang === 'en' ? 'ATAS ID' : 'ATAS 帳號'}：${formData.atasId}\n\n${formData.message ? `${lang === 'en' ? 'Message' : '留言'}：${formData.message}\n\n` : ""}${lang === 'en' ? 'Looking forward to your reply, thank you!' : '期待您的回覆，謝謝！'}`;
    
    openMailto(customBody);
    toast.success(t.toastSuccess);
    setFormData({ email: "", atasId: "", message: "" });
    setIsSubmitting(false);
  };

  const LanguageSwitcher = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <Globe className="w-4 h-4" />
          <span className="text-xs uppercase">{lang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        <DropdownMenuItem onClick={() => setLang("zh")} className="cursor-pointer">繁體中文</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("sc")} className="cursor-pointer">简体中文</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("en")} className="cursor-pointer">English</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-emerald-500"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              <path d="M12 22l-4-2v-6l4-2 4 2v6l-4 2z" />
            </svg>
            <span className="text-xl font-bold font-poppins">EasyLot HUD</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.navFeatures}
            </a>
            <a href="#security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.navSecurity}
            </a>
            <a href="#trial" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.navTrial}
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button className="btn-primary text-sm hidden sm:block" onClick={() => openMailto()}>
              {t.applyTrial}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-rose-500/5 pointer-events-none" />
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(16, 185, 129, 0.1) 25%, rgba(16, 185, 129, 0.1) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.1) 75%, rgba(16, 185, 129, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(16, 185, 129, 0.1) 25%, rgba(16, 185, 129, 0.1) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.1) 75%, rgba(16, 185, 129, 0.1) 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px'
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 w-fit">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400">{t.liveTradingHud}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-poppins leading-tight">
                  {t.title}
                  <br />
                  <span className="text-gradient">{t.subtitle}</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.heroDescription}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="btn-primary flex items-center justify-center gap-2" onClick={() => openMailto()}>
                  {t.applyTrial}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="btn-secondary flex items-center justify-center gap-2">
                  {t.learnMore}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground font-mono uppercase">TRIAL</div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-semibold">{t.trial7Days}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground font-mono uppercase">AUTH</div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-semibold">{t.rsaOffline}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground font-mono uppercase">LATENCY</div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-semibold">{t.zeroLatency}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="card-glass glow-emerald border-emerald-500/30">
                <img
                  src="/easylot-hud-screenshot.png"
                  alt="EasyLot HUD Demo"
                  className="w-full h-auto rounded-lg"
                />
              </div>
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
              <span className="text-xs font-mono text-emerald-400 uppercase">{t.coreFeatures}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">{t.coreFeatures}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-glass group border-l-4 border-l-emerald-500/50 hover:border-l-emerald-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/20">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold font-poppins mb-2">{t.feature1Title}</h3>
                  <p className="text-muted-foreground">{t.feature1Desc}</p>
                </div>
              </div>
            </div>
            <div className="card-glass group border-l-4 border-l-emerald-500/50 hover:border-l-emerald-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/20">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold font-poppins mb-2">{t.feature2Title}</h3>
                  <p className="text-muted-foreground">{t.feature2Desc}</p>
                </div>
              </div>
            </div>
            <div className="card-glass group border-l-4 border-l-emerald-500/50 hover:border-l-emerald-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/20">
                    <BarChart3 className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold font-poppins mb-2">{t.feature3Title}</h3>
                  <p className="text-muted-foreground">{t.feature3Desc}</p>
                </div>
              </div>
            </div>
            <div className="card-glass group border-l-4 border-l-rose-500/50 hover:border-l-rose-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-rose-500/20">
                    <Shield className="w-6 h-6 text-rose-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold font-poppins mb-2">{t.feature4Title}</h3>
                  <p className="text-muted-foreground">{t.feature4Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 md:py-32 border-b border-border/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">{t.demoTitle}</h2>
          <p className="text-lg text-muted-foreground mb-12">{t.demoDesc}</p>
          <div className="relative max-w-4xl mx-auto">
            <div className="card-glass aspect-video border-emerald-500/30">
              <iframe
                width="100%" height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Demo" frameBorder="0" allowFullScreen className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 md:py-32 bg-card/30 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="card-glass border-l-4 border-l-emerald-500">
            <div className="flex items-start gap-4">
              <Lock className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-6">{t.securityTitle}</h2>
                <div className="space-y-6 text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground mb-1">{t.securityPoint1Title}</p>
                    <p>{t.securityPoint1Desc}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">{t.securityPoint2Title}</p>
                    <p>{t.securityPoint2Desc}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">{t.securityPoint3Title}</p>
                    <p>{t.securityPoint3Desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trial Section */}
      <section id="trial" className="py-20 md:py-32 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="card-glass border-t-2 border-t-emerald-500">
            <h2 className="text-3xl font-bold font-poppins mb-2">{t.formTitle}</h2>
            <p className="text-muted-foreground mb-8">{t.formDesc}</p>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t.emailLabel} *</label>
                <Input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleFormChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.atasIdLabel} *</label>
                <Input type="text" name="atasId" placeholder="user123" value={formData.atasId} onChange={handleFormChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.msgLabel}</label>
                <Textarea name="message" placeholder={t.msgPlaceholder} value={formData.message} onChange={handleFormChange} className="min-h-24" />
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2">
                {isSubmitting ? t.submitting : t.submitBtn}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
              <p className="text-xs text-muted-foreground text-center">{t.privacyNote}</p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold font-poppins mb-4 uppercase text-xs text-emerald-400">{t.aboutTitle}</h3>
              <p className="text-sm text-muted-foreground">{t.aboutDesc}</p>
            </div>
            <div>
              <h3 className="font-semibold font-poppins mb-4 uppercase text-xs text-emerald-400">{t.linksTitle}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">{t.navFeatures}</a></li>
                <li><a href="#security" className="hover:text-foreground">{t.navSecurity}</a></li>
                <li><a href="#trial" className="hover:text-foreground">{t.navTrial}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold font-poppins mb-4 uppercase text-xs text-emerald-400">{t.contactTitle}</h3>
              <p className="text-sm text-muted-foreground">support@easylot.com<br />+886 (02) 1234-5678</p>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>{t.copyright}</p>
            <p className="mt-2 md:mt-0">{t.disclaimer}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
