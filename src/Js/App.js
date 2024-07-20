import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../Css/App.css'; 
import axios from 'axios';

import Friends from './Friends';
import Leaderboard from './Leaderboard';
import First from './Firstpage';
import Check from './Checking';
import Years from './Years';
import Oct from './Oct';

import TS1 from '../IMG/TaskIcon/TS1.png';
import TS2 from '../IMG/TaskIcon/TS2.png';
import TS3 from '../IMG/TaskIcon/TS3.png';
import TS4 from '../IMG/TaskIcon/TS4.png';
import galo4ka from '../IMG/All_Logo/galol4ka.png';
import Ellipse from '../IMG/All_Logo/Ellipse.png';

import IconHome from '../IMG/LowerIcon/Home.png';
import IconLeaderboard from '../IMG/LowerIcon/Leaderboard.png';
import IconFriends from '../IMG/LowerIcon/Friends.png';

import Logo from '../IMG/All_Logo/Logo.png';
import Play from '../IMG/All_Logo/Play.png';
import Octo from '../IMG/All_Logo/Octo.png';
import invite from '../IMG/All_Logo/Invite_png.png';
import Join from '../IMG/All_Logo/Join.png';

const REACT_APP_BACKEND_URL = 'https://octiesback-production.up.railway.app';
const userId = new URLSearchParams(window.location.search).get('userId');

function App() {
  const [isFirstBlockVisible, setIsFirstBlockVisible] = useState(false);
  const [isSecondBlockVisible, setIsSecondBlockVisible] = useState(false);

  const firstBlockRef = useRef(null);
  const secondBlockRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, 
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.target === firstBlockRef.current) {
          setIsFirstBlockVisible(entry.isIntersecting);
        } else if (entry.target === secondBlockRef.current) {
          setIsSecondBlockVisible(entry.isIntersecting);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const currentFirstBlockRef = firstBlockRef.current;
    const currentSecondBlockRef = secondBlockRef.current;

    if (currentFirstBlockRef) observer.observe(currentFirstBlockRef);
    if (currentSecondBlockRef) observer.observe(currentSecondBlockRef);

    return () => {
      if (currentFirstBlockRef) observer.unobserve(currentFirstBlockRef);
      if (currentSecondBlockRef) observer.unobserve(currentSecondBlockRef);
    };
  }, []);

  function handleHomeWithVibration() {
    handleHome();
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
  }

  function handleLeaderboardWithVibration() {
    handleLeaderboard();
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
  }

  function handleFrendsWithVibration() {
    handleFrends();
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
  }

  function handleOpenStoryWithVibration() {
    setYearsOpen(true);
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
  }

  const checkSubscription = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/check-subscription-and-update`, { userId });
      const data = response.data;
      if (response.status === 200) {
        if (data.isSubscribed) {
          localStorage.setItem('Galka', 'true');
          localStorage.setItem('Knopka', 'false');
        } else {
          localStorage.setItem('Galka', 'false');
          localStorage.setItem('Knopka', 'true');
        }
        setCoins(response.data.coins);
      } else {
        console.error('Ошибка при проверке подписки:', response.data.message);
      }
    } catch (error) {
      console.error('Ошибка при проверке подписки:', error);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const intervalId = setInterval(() => {
        checkSubscription();
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [checkSubscription]);

  if (!localStorage.getItem('Galka')) {
    localStorage.setItem('Galka', 'false');
  }
  const Galo4ka = localStorage.getItem('Galka') === 'true';
  if (!localStorage.getItem('Knopka')) {
    localStorage.setItem('Knopka', 'true');
  }
  const Knopka = localStorage.getItem('Knopka') === 'true';

  const [coinOnlyYears, setcoinOnlyYears] = useState(0);
  const [VisibleInvite, setVisibleInvite] = useState(false);
  const [VisibleTelegramPremium, setVisibleTelegramPremium] = useState(false);
  const [coins, setCoins] = useState(0);
  const [referralCoins, setReferralCoins] = useState(0);
  const [hasTelegramPremium, setHasTelegramPremium] = useState(false);
  const [accountAgeCoins, setAccountAgeCoins] = useState(0);
  const [subscriptionCoins, setSubscriptionCoins] = useState(0);
  const [subscriptionCoins2, setSubscriptionCoins2] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const coinmain = coins - referralCoins;

  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isFrendsOpen, setIsFrendsOpen] = useState(false);
  const [FPage, setFPage] = useState(() => localStorage.getItem('FPage') !== 'false');
  const [CheckOpen, setCheckOpen] = useState(false);
  const [YearsOpen, setYearsOpen] = useState(false);
  const [OctOpen, setOctOpen] = useState(false);
  const [Yearr, setYearr] = useState(0);

  const [FriendsAnim, setFriendsAnim] = useState(false);
  const [LeaderboardAnim, setLeaderboardAnim] = useState(false);
  const [app, setApp] = useState(false);
  const TG_CHANNEL_LINK = "https://t.me/octies_channel";
  const TG_CHANNEL_LINK1 = "https://t.me/octies_channel";

  const fetchUserData = useCallback(async (userId) => {
    try {
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/get-coins`, { userId });
      const data = response.data;
      if (response.status === 200) {
        setCoins(data.coins);
        setReferralCoins(data.referralCoins);
        setHasTelegramPremium(data.hasTelegramPremium);
  
        const accountCreationDate = new Date(data.accountCreationDate);
        const currentYear = new Date().getFullYear();
        const accountYear = accountCreationDate.getFullYear();
        const yearsOld = currentYear - accountYear;
        setYearr(yearsOld);
        const accountAgeCoins = yearsOld * 500;
        setcoinOnlyYears(accountAgeCoins);
  
        if (data.hasCheckedSubscription) {
          localStorage.setItem('Galka', 'true');
          localStorage.setItem('Knopka', 'false');
          setSubscriptionCoins(1000);
        } else {
          localStorage.setItem('Galka', 'false');
          localStorage.setItem('Knopka', 'true');
          setSubscriptionCoins(0);
        }
  
        if (data.hasCheckedSubscription2) {
          localStorage.setItem('Galka2', 'true');
          localStorage.setItem('Knopka2', 'false');
          setSubscriptionCoins2(750);
        } else {
          localStorage.setItem('Galka2', 'false');
          localStorage.setItem('Knopka2', 'true');
          setSubscriptionCoins2(0);
        }
  
        if (hasTelegramPremium === true) {
          setVisibleTelegramPremium(true);
        }
  
        if (referralCoins > 0) {
          setVisibleInvite(true);
        }
  
        setAccountAgeCoins(accountAgeCoins);
  
        const referralResponse = await axios.post(`${REACT_APP_BACKEND_URL}/generate-referral`, { userId });
        const referralData = referralResponse.data;
        if (referralResponse.status === 200) {
          setReferralCode(referralData.referralCode);
          setTelegramLink(referralData.telegramLink);
        } else {
          console.error('Ошибка при получении реферальных данных:', referralData.message);
        }
      } else {
        console.error('Ошибка при получении данных пользователя:', data.error);
      }
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    }
  }, [hasTelegramPremium, referralCoins]);
  
  const checkSubscriptionAndUpdate = async (userId) => {
    try {
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/check-subscription-and-update`, { userId });
      if (response.status === 200) {
        setCoins(response.data.coins);
        setSubscriptionCoins(response.data.isSubscribed ? 1000 : 0);
        setSubscriptionCoins2(response.data.isSubscribed2 ? 750 : 0);
      } else {
        console.error('Ошибка при проверке подписки:', response.data.error);
      }
    } catch (error) {
      console.error('Ошибка при проверке подписки:', error);
    }
  };
  

  useEffect(() => {
    const userId = new URLSearchParams(window.location.search).get('userId');
    if (userId) {
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          checkSubscription(userId);
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    } else {
      console.error('userId не найден в URL');
    }
  }, [checkSubscription]);

  useEffect(() => {
    const userId = new URLSearchParams(window.location.search).get('userId');
    if (userId) {
      fetchUserData(userId).then(() => {
        checkSubscription(userId).then(() => {
          fetchUserData(userId);
        });
      });
    } else {
      console.error('userId не найден в URL');
    }
  }, [fetchUserData, checkSubscription]);

  // const checkSubscriptionAndUpdate = async (userId) => {
  //   try {
  //     const response = await axios.post(`${REACT_APP_BACKEND_URL}/check-subscription-and-update`, { userId });
  //     if (response.status === 200) {
  //       setCoins(response.data.coins);
  //       setSubscriptionCoins(response.data.isSubscribed ? 1000 : 0);
  //     } else {
  //       console.error('Ошибка при проверке подписки:', response.data.error);
  //     }
  //   } catch (error) {
  //     console.error('Ошибка при проверке подписки:', error);
  //   }
  // };

  const Tg_Channel_Open_chek = () => {
    const userId = new URLSearchParams(window.location.search).get('userId');
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
    window.open(TG_CHANNEL_LINK, '_blank');
    setTimeout(() => {
      checkSubscriptionAndUpdate(userId);
    }, 3000);
  };

  const Tg_Channel_Open_chek1 = () => {
    const userId = new URLSearchParams(window.location.search).get('userId');
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
    window.open(TG_CHANNEL_LINK1, '_blank');
    setTimeout(() => {
      checkSubscriptionAndUpdate(userId);
    }, 3000);
  };

  useEffect(() => {
    if (window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand();
    }
  }, []);

  const handleHome = () => {
    setIsLeaderboardOpen(false);
    setIsFrendsOpen(false);
    setFriendsAnim(true);
    setLeaderboardAnim(true);
    setApp(false);
  };

  const handleFrends = () => {
    setIsFrendsOpen(true);
    setFriendsAnim(false);
    setLeaderboardAnim(true);
    setIsLeaderboardOpen(false);
    setApp(true);
  };

  const handleLeaderboard = () => {
    setIsLeaderboardOpen(true);
    setFriendsAnim(true);
    setLeaderboardAnim(false);
    setIsFrendsOpen(false);
    setApp(true);
  };

  const handleFirstPageClose = () => {
    setFPage(false);
    localStorage.setItem('FPage', 'false');
  };

  return (
    <div className="App">
      {app && <div className='blk'></div>}
      <div className="info">
        <img src={Logo} alt='Logo' />
        <div className='Txt' onClick={handleOpenStoryWithVibration}>
          <img src={Play} alt='Play' />
          <p>Your Score</p>
        </div>
      </div>
      <div className="main">
        <img src={Octo} alt='Octo' />
      </div>
      <div className='MainCoin'>
        <p>{coinmain} OCTIES</p>
      </div>
      <div className='Menu'>
        <div className='Skroll_Menu_Border'>

          <div className='MenuBorder' ref={firstBlockRef}>
            <div className='flex_menu_border'>
              <p id='up'>OCTIES COMMUNITY</p>
              <p id='dp'>Home for Telegram OCs</p>
              <div className='MenuBtn'>
                {Knopka && <img onClick={Tg_Channel_Open_chek} src={Join} alt='Join' />}
                <p> {Knopka && <p id="plus">+</p>} 1000 OCTIES</p>
                {Galo4ka && <img id="galo4ka" src={galo4ka} alt='galo4ka' />}
              </div>
            </div>
          </div>

          <div className='MenuBorder' ref={secondBlockRef}>
            <div className='flex_menu_border' id='Cryptospace'>
              <p id='up'>CryptoSpace</p>
              <p id='dp'>Уникальные крипто-проекты / Web3 Игры</p>
              <div className='MenuBtn'>
                <img onClick={Tg_Channel_Open_chek1} src={Join} alt='Join' />
                <p>+ 750 OCTIES</p>
              </div>
            </div>
          </div>

        </div>
        <div className='Reward'>
          <div className='EllipsSkroll'>
            <img src={Ellipse} alt='Ellips' className={isFirstBlockVisible ? '' : 'img-dark'} />
            <img src={Ellipse} alt='Ellips' className={isSecondBlockVisible ? '' : 'img-dark'} />
          </div>
          <p>Your Rewards</p>
        </div>
        <div className='Tasks'>
          <div className='TS'>
            <div className='tsPhoto'>
              <img src={TS1} alt='TS1' /> <p id='txt'>Account age</p>
            </div>
            <div className='tsPhoto'>
              <p>+{accountAgeCoins} OCTIES</p>
            </div>
          </div>

          {VisibleTelegramPremium && <div className='TS'>
            <div className='tsPhoto'>
              <img src={TS2} alt='TS2' /> <p id='txt'>Telegram Premium</p>
            </div>
            <div className='tsPhoto'>
              <p>+{hasTelegramPremium ? 500 : 0} OCTIES</p>
            </div>
          </div>}

          {Galo4ka && <div className='TS'>
            <div className='tsPhoto'>
              <img src={TS3} alt='TS3' /> <p id='txt'>Channel Subscription</p>
            </div>
            <div className='tsPhoto'>
              <p>+{subscriptionCoins} OCTIES</p>
            </div>
          </div>}

          {localStorage.getItem('Galka2') === 'true' && <div className='TS'>
          <div className='tsPhoto'>
            <img src={TS3} alt='TS3' /> <p id='txt'>CryptoSpace Subscription</p>
          </div>
          <div className='tsPhoto'>
            <p>+{subscriptionCoins2} OCTIES</p>
          </div>
        </div>}

          {VisibleInvite && <div className='TS'>
            <div className='tsPhoto'>
              <img src={TS4} alt='TS4' /> <p id='txt'>Invites</p>
            </div>
            <div className='tsPhoto'>
              <p>+{referralCoins} OCTIES</p>
            </div>
          </div>}
        </div>
      </div>

      <div className='BTNLow'>
        <div className='LowerBTN'>
          <div className={`BTN ${(isLeaderboardOpen || isFrendsOpen) ? 'img-dark' : ''}`} onClick={handleHomeWithVibration}>
            <img src={IconHome} alt='IconHome' />
          </div>
          <div className={`BTN ${!isLeaderboardOpen ? 'img-dark' : ''}`} onClick={handleLeaderboardWithVibration}>
            <img src={IconLeaderboard} alt='IconLeaderboard' />
          </div>
          <div className={`BTN ${!isFrendsOpen ? 'img-dark' : ''}`} onClick={handleFrendsWithVibration}>
            <img src={IconFriends} alt='IconFriends' />
          </div>
        </div>
      </div>

      {FPage && (<First onClose={handleFirstPageClose} setCheckOpen={setCheckOpen} />)}

      {CheckOpen && (<Check setCheckOpen={setCheckOpen} setYearsOpen={setYearsOpen} />)}

      {YearsOpen && (<Years onClose={setYearsOpen} setOctOpen={setOctOpen} Yearr={Yearr} />)}

      {OctOpen && (<Oct onClose={setOctOpen} setYearsOpen={setYearsOpen} coinOnlyYears={coinOnlyYears} />)}

      {isLeaderboardOpen && (<Leaderboard LeaderboardAnim={LeaderboardAnim} userId={userId} coins={coinmain} />)}

      {isFrendsOpen && (<Friends FriendsAnim={FriendsAnim} invite={invite} referralCode={referralCode} telegramLink={telegramLink} />)}

    </div>
  );
}

export default App;
