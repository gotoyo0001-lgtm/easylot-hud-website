
import React, { useState, useEffect } from 'react';
import translations from './i18n';

// 假設語言環境為繁體中文，實際應用中應根據用戶瀏覽器或設置動態獲取
const currentLang = 'zh-TW'; // 可以是 'zh-TW', 'zh-CN', 'en'
const t = translations[currentLang];

const Home: React.FC = () => {
  const [showAgeGate, setShowAgeGate] = useState(true);

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
    // 可以導向其他頁面或關閉視窗
    window.close(); // 嘗試關閉當前視窗
    alert('您已選擇離開網站。');
  };

  if (showAgeGate) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
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
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            {/* 科技感閃電 Logo */}
            <svg
              className="w-8 h-8 text-emerald-500 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M11.484 2.367c.07-.097.163-.177.268-.236.106-.06.22-.09.337-.09.117 0 .231.03.337.09.105.059.198.139.268.236l7.126 9.833a1.5 1.5 0 0 1-.268 2.263c-.106.06-.22.09-.337.09H13.5v5.5a.75.75 0 0 1-1.5 0v-5.5H6.94a1.5 1.5 0 0 1-.337-.09 1.5 1.5 0 0 1-.268-2.263l7.126-9.833Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-2xl font-bold">EasyLot HUD 1.0</span>
          </div>
          <ul className="flex space-x-6">
            <li><a href="#home" className="hover:text-emerald-500 transition duration-300">{t.navbar.home}</a></li>
            <li><a href="#features" className="hover:text-emerald-500 transition duration-300">{t.navbar.features}</a></li>
            <li><a href="#pricing" className="hover:text-emerald-500 transition duration-300">{t.navbar.pricing}</a></li>
            <li><a href="#contact" className="hover:text-emerald-500 transition duration-300">{t.navbar.contact}</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-[60vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/hero-demo.png)' }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-extrabold mb-4">EasyLot HUD 1.0</h1>
          <p className="text-xl text-gray-300 mb-8">您的專業金融交易輔助工具</p>
          <a
            href="/EasyLot_HUD_v1.zip"
            download
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
          >
            {t.home.downloadButton}
          </a>
        </div>
      </section>

      {/* Features Section (Placeholder) */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">主要功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-emerald-500 mb-4">即時數據</h3>
              <p className="text-gray-300">提供市場即時數據分析，助您快速決策。</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-emerald-500 mb-4">智能交易</h3>
              <p className="text-gray-300">自動化交易策略，降低人為失誤。</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-emerald-500 mb-4">風險管理</h3>
              <p className="text-gray-300">完善的風險控制機制，保護您的資金。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section id="pricing" className="py-20 bg-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">三步驟申請流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <div className="text-emerald-500 text-5xl font-bold mb-4">1</div>
              <h3 className="text-2xl font-bold mb-2">{t.home.step1}</h3>
              <a
                href="/EasyLot_HUD_v1.zip"
                download
                className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transition duration-300 mt-4"
              >
                {t.home.downloadButton}
              </a>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <div className="text-emerald-500 text-5xl font-bold mb-4">2</div>
              <h3 className="text-2xl font-bold mb-2">{t.home.step2}</h3>
              <p className="text-gray-300 mt-4">確保您已成功安裝並運行軟體。</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <div className="text-emerald-500 text-5xl font-bold mb-4">3</div>
              <h3 className="text-2xl font-bold mb-2">{t.home.step3}</h3>
              <p className="text-gray-300 mt-4">填寫下方的表單，我們將盡快為您處理。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-12">聯絡我們</h2>
          <form action="https://formspree.io/f/gotoyo0001@gmail.com" method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-left text-gray-300 text-sm font-bold mb-2">
                {t.home.formName}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                placeholder={t.home.formName}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-left text-gray-300 text-sm font-bold mb-2">
                {t.home.formEmail}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                placeholder={t.home.formEmail}
                required
              />
            </div>
            <div>
              <label htmlFor="machine_id" className="block text-left text-gray-300 text-sm font-bold mb-2">
                {t.home.formMachineId}
              </label>
              <input
                type="text"
                id="machine_id"
                name="machine_id"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                placeholder={t.home.formMachineId}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              {t.home.formSubmit}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 p-8 text-center text-gray-400">
        <p>&copy; 2023 EasyLot HUD. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
