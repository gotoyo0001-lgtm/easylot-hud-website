
import React, { useState, useEffect } from 'react';
import translations from '../i18n';

type Lang = 'zh-TW' | 'zh-CN' | 'en';

const Home: React.FC = () => {
  // 語言改成 state：預設繁中，並記憶到 localStorage
  const [lang, setLang] = useState<Lang>('zh-TW');
  const t = translations[lang];

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem('lang', l);
  };

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved && (saved === 'zh-TW' || saved === 'zh-CN' || saved === 'en')) {
      setLang(saved);
    }
  }, []);

  const [showAgeGate, setShowAgeGate] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ageVerified = localStorage.getItem('ageVerified');
    if (ageVerified === 'true') {
      setShowAgeGate(false);
    }
  }, []);

  const handleEnterSite = () => {
    localStorage.setItem('ageVerified', 'true');
    setShowAgeGate(false);
  };

  const handleLeaveSite = () => {
    window.close(); // 嘗試關閉當前視窗
    alert('您已選擇離開網站。');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true); // 開始提交，設置為提交中
    setSubmitMessage(''); // 清空之前的訊息

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        setFormSubmitted(true);
        setSubmitMessage(t.home.formSuccess);
        form.reset(); // 清空表單
      } else {
        const data = await response.json();
        if (data.errors) {
          setSubmitMessage(data.errors.map((error: any) => error.message).join(', '));
        } else {
          setSubmitMessage('表單提交失敗，請稍後再試。');
        }
        setFormSubmitted(false); // 即使失敗，也確保 formSubmitted 為 false 以顯示表單
      }
    } catch (error) {
      setSubmitMessage('網路錯誤，請檢查您的連線。');
      setFormSubmitted(false); // 即使失敗，也確保 formSubmitted 為 false 以顯示表單
    } finally {
      setIsSubmitting(false); // 提交結束
    }
  };

  if (showAgeGate) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <select
              value={lang}
              onChange={(e) => changeLang(e.target.value as Lang)}
              className="bg-gray-700 text-gray-200 text-sm font-bold rounded px-3 py-1 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="zh-TW">繁體</option>
              <option value="zh-CN">简体</option>
              <option value="en">EN</option>
            </select>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{t.ageGate.title}</h2>
          <p className="text-gray-300 mb-6">{t.ageGate.description}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleEnterSite}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              {t.ageGate.confirm}
            </button>
            <button
              onClick={handleLeaveSite}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              {t.ageGate.leave}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Navbar */}
      <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-sm p-4 shadow-lg relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white">EasyLot HUD</span>
          </div>
          <div className="flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li><a href="#home" className="hover:text-emerald-400 transition duration-300">{t.navbar.home}</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition duration-300">{t.navbar.features}</a></li>
              <li><a href="#tutorial" className="hover:text-emerald-400 transition duration-300">{t.home.videoTutorialTitle}</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition duration-300">{t.navbar.pricing}</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition duration-300">{t.navbar.contact}</a></li>
            </ul>
            {/* 語言切換（下拉） */}
            <select
              value={lang}
              onChange={(e) => changeLang(e.target.value as Lang)}
              className="bg-gray-700 text-gray-200 text-sm font-bold rounded px-2 py-1 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="zh-TW">繁體</option>
              <option value="zh-CN">简体</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-[80vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/hero-demo.png)' }}>
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 text-center p-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-emerald-400">{t.home.heroHeader}</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">{t.home.heroSubheader}</p>
          <div className="flex flex-col gap-3 mb-10 max-w-2xl mx-auto text-left">
            <div className="flex items-start gap-3 bg-gray-900/50 border border-emerald-700 rounded-lg px-5 py-3">
              <span className="text-emerald-400 text-xl leading-none mt-0.5">✔</span>
              <span className="text-gray-100 text-base md:text-lg">{t.home.hook1}</span>
            </div>
            <div className="flex items-start gap-3 bg-gray-900/50 border border-emerald-700 rounded-lg px-5 py-3">
              <span className="text-emerald-400 text-xl leading-none mt-0.5">✔</span>
              <span className="text-gray-100 text-base md:text-lg">{t.home.hook2}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 transform hover:scale-105"
            >
              {t.home.trialCta}
            </a>
            <a
              href="/EasyLot_HUD_v1.zip"
              download
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 transform hover:scale-105"
            >
              {t.home.downloadButton}
            </a>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-20 relative z-10">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-5xl font-extrabold mb-16 text-white"><span className="text-emerald-400">{t.home.featuresTitle}</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature Card A */}
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded-xl shadow-xl border border-emerald-700 transform hover:scale-105 transition duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md"></div>
              <div className="relative z-10">
                <div className="text-emerald-400 mb-6">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4"><span className="text-emerald-400">{t.home.featureA_title}</span></h3>
                <p className="text-gray-300 text-lg">{t.home.featureA_description}</p>
              </div>
            </div>

            {/* Feature Card B */}
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded-xl shadow-xl border border-emerald-700 transform hover:scale-105 transition duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md"></div>
              <div className="relative z-10">
                <div className="text-emerald-400 mb-6">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4"><span className="text-emerald-400">{t.home.featureB_title}</span></h3>
                <p className="text-gray-300 text-lg">{t.home.featureB_description}</p>
              </div>
            </div>

            {/* Feature Card C */}
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded-xl shadow-xl border border-emerald-700 transform hover:scale-105 transition duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md"></div>
              <div className="relative z-10">
                <div className="text-emerald-400 mb-6">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.279A7.958 7.958 0 0012 4C7.111 4 3.055 7.79 2.321 12.564v0a.75.75 0 00.75.75h18.258a.75.75 0 00.75-.75v0C20.945 7.79 16.889 4 12 4s-4.945 3.79-5.618 8.279z"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4"><span className="text-emerald-400">{t.home.featureC_title}</span></h3>
                <p className="text-gray-300 text-lg">{t.home.featureC_description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tutorial Section */}
      <section id="tutorial" className="py-20 relative z-10">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-5xl font-extrabold mb-16 text-white"><span className="text-emerald-400">{t.home.videoTutorialTitle}</span></h2>
          <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden border-2 border-emerald-700 shadow-emerald-glow mb-12">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/9CABWJs5x-w"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Tutorial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Installation Guide */}
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded-xl shadow-xl border border-emerald-700 transform hover:scale-105 transition duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4"><span className="text-emerald-400">{t.home.installationGuideTitle}</span></h3>
                <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
                  <li>{t.home.installationStep1}</li>
                  <li>{t.home.installationStep2}</li>
                  <li>{t.home.installationStep3}</li>
                  <li>{t.home.installationStep4}</li>
                </ul>
              </div>
            </div>

            {/* Activation */}
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded-xl shadow-xl border border-emerald-700 transform hover:scale-105 transition duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4"><span className="text-emerald-400">{t.home.activationTitle}</span></h3>
                <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
                  <li>{t.home.activationStep1}</li>
                  <li>{t.home.activationStep2}</li>
                  <li>{t.home.activationStep3}</li>
                </ul>
              </div>
            </div>

            {/* Key Operations */}
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded-xl shadow-xl border border-emerald-700 transform hover:scale-105 transition duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4"><span className="text-emerald-400">{t.home.keyOperationsTitle}</span></h3>
                <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
                  <li>{t.home.keyOperationsStep1}</li>
                  <li>{t.home.keyOperationsStep2}</li>
                </ul>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded-xl shadow-xl border border-emerald-700 transform hover:scale-105 transition duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4"><span className="text-emerald-400">{t.home.proTipsTitle}</span></h3>
                <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
                  <li>{t.home.proTipsStep1}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process Section (Pricing) */}
      <section id="pricing" className="py-20 bg-gray-900 relative z-10">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-5xl font-extrabold mb-16 text-white"><span className="text-emerald-400">三步驟申請流程</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded-xl shadow-xl border border-emerald-700 transform hover:scale-105 transition duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md"></div>
              <div className="relative z-10">
                <div className="text-emerald-400 text-6xl font-bold mb-4">1</div>
                <h3 className="text-3xl font-bold text-white mb-4">{t.home.step1}</h3>
                <a
                  href="/EasyLot_HUD_v1.zip"
                  download
                  className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 mt-4 transform hover:scale-105"
                >
                  {t.home.downloadButton}
                </a>
              </div>
            </div>
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded-xl shadow-xl border border-emerald-700 transform hover:scale-105 transition duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md"></div>
              <div className="relative z-10">
                <div className="text-emerald-400 text-6xl font-bold mb-4">2</div>
                <h3 className="text-3xl font-bold text-white mb-4">{t.home.step2}</h3>
                <p className="text-gray-300 text-lg mt-4">確保您已成功安裝並運行軟體。</p>
              </div>
            </div>
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded-xl shadow-xl border border-emerald-700 transform hover:scale-105 transition duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md"></div>
              <div className="relative z-10">
                <div className="text-emerald-400 text-6xl font-bold mb-4">3</div>
                <h3 className="text-3xl font-bold text-white mb-4">{t.home.step3}</h3>
                <p className="text-gray-300 text-lg mt-4">填寫下方的表單，我們將盡快為您處理。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="container mx-auto text-center max-w-3xl px-4">
          <h2 className="text-5xl font-extrabold mb-16 text-white"><span className="text-emerald-400">聯絡我們</span></h2>
          <form action="https://formspree.io/f/xqeraoyg" method="POST" onSubmit={handleSubmit} className="space-y-8 bg-gray-800 bg-opacity-70 p-10 rounded-xl shadow-xl border border-emerald-700 relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md"></div>
            <div className="relative z-10">
              {submitMessage && (
                formSubmitted ? (
                  <div className="text-left text-emerald-200 text-base md:text-lg leading-relaxed whitespace-pre-line mb-6 bg-gray-900/60 border border-emerald-600 rounded-lg p-6">
                    {submitMessage}
                  </div>
                ) : (
                  <p className="text-red-500 text-xl font-bold mb-6">{submitMessage}</p>
                )
              )}
              {!formSubmitted && !isSubmitting && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-left text-gray-300 text-lg font-bold mb-2">
                      {t.home.formName}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-700 border-gray-600"
                      placeholder={t.home.formName}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-left text-gray-300 text-lg font-bold mb-2">
                      {t.home.formEmail}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-700 border-gray-600"
                      placeholder={t.home.formEmail}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="machine_id" className="block text-left text-gray-300 text-lg font-bold mb-2">
                      {t.home.formMachineId}
                    </label>
                    <input
                      type="text"
                      id="machine_id"
                      name="machine_id"
                      className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-700 border-gray-600"
                      placeholder={t.home.formMachineId}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="feedback" className="block text-left text-gray-300 text-lg font-bold mb-2">
                      {t.home.formFeedback}
                    </label>
                    <textarea
                      id="feedback"
                      name="feedback"
                      rows={3}
                      className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-700 border-gray-600 resize-y"
                      placeholder={t.home.formFeedbackPlaceholder}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-10 rounded-full text-xl transition duration-300 transform hover:scale-105 mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '提交中...' : t.home.formSubmit}
                  </button>
                </>
              )}
              {isSubmitting && (
                <p className="text-emerald-400 text-2xl font-bold">提交中...</p>
              )}
            </div>
          </form>

          {/* 升级 / 正式版备注 */}
          <div className="mt-8 text-left bg-gray-800/60 border border-emerald-800 rounded-xl p-6 md:p-8">
            <h3 className="text-emerald-400 font-bold text-lg md:text-xl mb-3">{t.home.upgradeTitle}</h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line">{t.home.upgradeBody}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 p-8 text-center text-gray-400 relative z-10">
        <p>&copy; 2023 EasyLot HUD. All rights reserved.</p>
      </footer>

      {/* Tailwind CSS for animations and custom glow */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .shadow-emerald-glow {
          box-shadow: 0 0 15px rgba(52, 211, 153, 0.7), 0 0 30px rgba(52, 211, 153, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Home;
