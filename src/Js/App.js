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
import TSX from '../IMG/TaskIcon/TSX.png';
import galo4ka from '../IMG/All_Logo/galol4ka.png';
import Ellipse from '../IMG/All_Logo/Ellipse.png';

import tgLogo from '../IMG/All_Logo/TgComunity.png';
import XLogo from '../IMG/All_Logo/XCominity.png';
import Block1 from '../IMG/All_Logo/Block1.png';
import Block2 from '../IMG/All_Logo/Block2.png';

import IconHome from '../IMG/LowerIcon/Home.png';
import IconLeaderboard from '../IMG/LowerIcon/Leaderboard.png';
import IconFriends from '../IMG/LowerIcon/Friends.png';

import Logo from '../IMG/All_Logo/Logo.png';
import Play from '../IMG/All_Logo/Play.png';
import Octo from '../IMG/All_Logo/Octo.png';
import invite from '../IMG/All_Logo/Invite_png.png';
import Join from '../IMG/All_Logo/Join.png';

const REACT_APP_BACKEND_URL = 'https://testfrontckecksub-production.up.railway.app';
const userId = new URLSearchParams(window.location.search).get('userId');

function App() {
  if (!localStorage.getItem('Galka')) {localStorage.setItem('Galka', 'false');}
  const Galo4ka = localStorage.getItem('Galka') === 'true';
  if (!localStorage.getItem('Knopka')) {localStorage.setItem('Knopka', 'true');}
  const Knopka = localStorage.getItem('Knopka') === 'true';
  if (!localStorage.getItem('GalkaX')) {localStorage.setItem('GalkaX', 'false');}
  const Galo4kaX = localStorage.getItem('GalkaX') === 'true';
  if (!localStorage.getItem('KnopkaX')) {localStorage.setItem('KnopkaX', 'true');}
  const KnopkaX = localStorage.getItem('KnopkaX') === 'true';

  if (!localStorage.getItem('GalkaBlock1')) {localStorage.setItem('GalkaBlock1', 'false');}
  const Galo4kaBlock1 = localStorage.getItem('GalkaBlock1') === 'true';
  if (!localStorage.getItem('KnopkaBlock1')) {localStorage.setItem('KnopkaBlock1', 'true');}
  const KnopkaBlock1 = localStorage.getItem('KnopkaBlock1') === 'true';
  
  if (!localStorage.getItem('GalkaBlock2')) {localStorage.setItem('GalkaBlock2', 'false');}
  const Galo4kaBlock2 = localStorage.getItem('GalkaBlock2') === 'true';
  if (!localStorage.getItem('KnopkaBlock2')) {localStorage.setItem('KnopkaBlock2', 'true');}
  const KnopkaBlock2 = localStorage.getItem('KnopkaBlock2') === 'true';

  if (!localStorage.getItem('GalkaBlock3')) {localStorage.setItem('GalkaBlock3', 'false');}
  const Galo4kaBlock3 = localStorage.getItem('GalkaBlock3') === 'true';
  if (!localStorage.getItem('KnopkaBlock3')) {localStorage.setItem('KnopkaBlock3', 'true');}
  const KnopkaBlock3 = localStorage.getItem('KnopkaBlock3') === 'true';

  const [coinOnlyYears, setcoinOnlyYears] = useState(0);
  const [VisibleInvite, setVisibleInvite] = useState(false);
  const [VisibleTelegramPremium, setVisibleTelegramPremium] = useState(false);
  const [coins, setCoins] = useState(0);
  const [referralCoins, setReferralCoins] = useState(0);
  const [hasTelegramPremium, setHasTelegramPremium] = useState(false);
  const [accountAgeCoins, setAccountAgeCoins] = useState(0);
  const [subscriptionCoins, setSubscriptionCoins] = useState(0);
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
  const TG_CHANNEL_LINK = "https://t.me/test_sub_check2";
  const X_LINK = "https://x.com/Octies_GameFI";

  const blockRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const [blockVisibility, setBlockVisibility] = useState([false, false, false, false, false]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        const index = blockRefs.findIndex(ref => ref.current === entry.target);
        if (index !== -1) {
          setBlockVisibility(prevVisibility => {
            const newVisibility = [...prevVisibility];
            newVisibility[index] = entry.isIntersecting;
            return newVisibility;
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    blockRefs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      blockRefs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, );

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
      if (response.status === 200) {
        const data = response.data;
        setCoins(data.coins);

        if (data.hasCheckedSubscription) {
          localStorage.setItem('Galka', 'true');
          localStorage.setItem('Knopka', 'false');
          setSubscriptionCoins(1000);
        } else {
          localStorage.setItem('Galka', 'false');
          localStorage.setItem('Knopka', 'true');
          setSubscriptionCoins(0);
        }

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
       
        if (hasTelegramPremium === true) {
          setVisibleTelegramPremium(true);
        }
  
        if (referralCoins > 0) {
          setVisibleInvite(true);
        }

        if (data.hasCheckedSubscription) {
          localStorage.setItem('Galka', 'true');
          localStorage.setItem('Knopka', 'false');
          setSubscriptionCoins(1000);
        } else {
          localStorage.setItem('Galka', 'false');
          localStorage.setItem('Knopka', 'true');
          setSubscriptionCoins(0);
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
        const data = response.data;
        setCoins(data.coins);

        if (data.hasCheckedSubscription) {
          localStorage.setItem('Galka', 'true');
          localStorage.setItem('Knopka', 'false');
          setSubscriptionCoins(1000);
        } else {
          localStorage.setItem('Galka', 'false');
          localStorage.setItem('Knopka', 'true');
          setSubscriptionCoins(0);
        }
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

  const addUserCoins = async (amount) => {
    try {
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/add-coins`, { userId, amount });
      if (response.status === 200) {
        console.log('Coins added successfully:', response.data);
        setCoins(response.data.coins);
      } else {
        console.error('Error adding coins:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding coins:', error);
    }
  };

  const Tg_Channel_Open_X = () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
    window.open(X_LINK, '_blank');
    setTimeout(() => {
      if (localStorage.getItem('KnopkaX') === 'true') {
        localStorage.setItem('KnopkaX', 'false');
        localStorage.setItem('GalkaX', 'true');
        addUserCoins(500); // Добавляем 500 монет
      }
    }, 5000);
  };

  const Tg_Channel_Open_chek = () => {
    const userId = new URLSearchParams(window.location.search).get('userId');
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
    window.open(TG_CHANNEL_LINK, '_blank');
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

  const getRandomColor = useCallback(() => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);
  
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
      <div className="main" onClick={(event) => {  localStorage.clear(); }}>
        <img src={Octo} alt='Octo' />
      </div>
      <div className='MainCoin'>
        <p>{coins} $OCTIES</p>
      </div>
      <div className='Menu'>
        <div className='Skroll_Menu_Border'>

          <div className='MenuBorder' ref={blockRefs[0]}>
            <div className='flex_menu_border'>
              <div className='rightFlex'>
                <p id='up'>OCTIES COMMUNITY</p>
                <p id='dp'>Home for Telegram OCs</p>
                <div className='MenuBtn'>
                  {Knopka && <img onClick={Tg_Channel_Open_chek} src={Join} alt='Join' />}
                  <p> {Knopka && <p id="plus">+</p>}1000 $OCTIES</p>
                  {Galo4ka && <img id="galo4ka" src={galo4ka} alt='galo4ka' />}
                </div>
              </div>
              <div className='leftFlex'>
                <img src={tgLogo} alt='tgLogo'/>
              </div>
            </div>
          </div>

          <div className='MenuBorder' ref={blockRefs[1]}>
            <div className='flex_menu_border'>
              <div className='rightFlex'>
                <p id='up'>OCTIES X</p>
                <p id='dp'>Home for X OCs</p>
                <div className='MenuBtn'>
                  {KnopkaX && <img onClick={Tg_Channel_Open_X} src={Join} alt='Join' />}
                  <p> {KnopkaX && <p id="plus">+</p>}500 $OCTIES</p>
                  {Galo4kaX && <img id="galo4ka" src={galo4ka} alt='galo4ka' />}
                </div>
              </div>
              <div className='leftFlex'>
                <img src={XLogo} alt='XLogo'/>
              </div>
            </div>
          </div>

          <div className='MenuBorder' ref={blockRefs[2]}>
            <div className='flex_menu_border'  id='Cryptospace'>
              <div className='rightFlex'>
                <p id='up'>Тапаем </p>
                <p id='dp'>Потыкать и стать миллионером!</p>
                <div className='MenuBtn'>
                  {KnopkaBlock1 && <img onClick={Tg_Channel_Open_X} src={Join} alt='Join' />}
                  <p> {KnopkaBlock1 && <p id="plus">+</p>}750 $OCTIES</p>
                  {Galo4kaBlock1 && <img id="galo4ka" src={galo4ka} alt='galo4ka' />}
                </div>
              </div>
              <div className='leftFlex'>
                <img src={Block1} alt='Block1'/>
              </div>
             </div> 
          </div>

          <div className='MenuBorder' ref={blockRefs[3]}>
            <div className='flex_menu_border'  id='Cryptospace'>
              <div className='rightFlex'>
                <p id='up'>Hamster TapSwap Uzbekistan</p>
                <p id='dpp'>⚡️ Bu kanalda siz TapSwap va Hamster <br/> Kombat Tezkor Yangiliklarni bilib olasiz</p>
                <div className='MenuBtn'>
                  {KnopkaBlock2 && <img onClick={Tg_Channel_Open_X} src={Join} alt='Join' />}
                  <p> {KnopkaBlock2 && <p id="plus">+</p>}750 $OCTIES</p>
                  {Galo4kaBlock2 && <img id="galo4ka" src={galo4ka} alt='galo4ka' />}
                </div>
              </div>
              <div className='leftFlex'>
                <img src={Block2} alt='Block2'/>
              </div>
            </div>  
          </div>

          <div className='MenuBorder' ref={blockRefs[4]} >
            <div className='flex_menu_border' id='Cryptospace'>
              <div className='rightFlex'>
                <p id='up'>Block3</p>
                <p id='dp'>Description Block3</p>
                <div className='MenuBtn'>
                  {KnopkaBlock3 && <img onClick={Tg_Channel_Open_X} src={Join} alt='Join' />}
                  <p> {KnopkaBlock3 && <p id="plus">+</p>}50 $OCTIES</p>
                  {Galo4kaBlock3 && <img id="galo4ka" src={galo4ka} alt='galo4ka' />}
                </div>
              </div>
            </div>  
          </div>

        </div>
        <div className='Reward'>
          <div className='EllipsSkroll'>
            <img src={Ellipse} alt='Ellips' className={blockVisibility[0] ? '' : 'img-dark'} />
            <img src={Ellipse} alt='Ellips' className={blockVisibility[1] ? '' : 'img-dark'} />
            <img src={Ellipse} alt='Ellips' className={blockVisibility[2] ? '' : 'img-dark'} />
            <img src={Ellipse} alt='Ellips' className={blockVisibility[3] ? '' : 'img-dark'} />
            <img src={Ellipse} alt='Ellips' className={blockVisibility[4] ? '' : 'img-dark'} />
          </div>
          <p>Your Rewards</p>
        </div>
        <div className='Tasks'>
          <div className='TS'>
            <div className='tsPhoto'>
              <img src={TS1} alt='TS1' /> <p id='txt'>Account age</p>
            </div>
            <div className='tsPhoto'>
              <p>+{accountAgeCoins} $OCTIES</p>
            </div>
          </div>

          {VisibleTelegramPremium && <div className='TS'>
            <div className='tsPhoto'>
              <img src={TS2} alt='TS2' /> <p id='txt'>Telegram Premium</p>
            </div>
            <div className='tsPhoto'>
              <p>+{hasTelegramPremium ? 500 : 0} $OCTIES</p>
            </div>
          </div>}

          {Galo4ka && <div className='TS'>
            <div className='tsPhoto'>
              <img src={TS3} alt='TS3' /> <p id='txt'>Channel Subscription</p>
            </div>
            <div className='tsPhoto'>
              <p>+{subscriptionCoins} $OCTIES</p>
            </div>
          </div>}

          {Galo4kaX && <div className='TS'>
          <div className='tsPhoto'>
            <img src={TSX} alt='TSX' /> <p id='txt'>X Channel Subscription</p>
          </div>
          <div className='tsPhoto'>
            <p>+ 500 $OCTIES</p>
          </div>
        </div>}

          {VisibleInvite && <div className='TS'>
            <div className='tsPhoto'>
              <img src={TS4} alt='TS4' /> <p id='txt'>Invites</p>
            </div>
            <div className='tsPhoto'>
              <p>+{referralCoins} $OCTIES</p>
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

      {isLeaderboardOpen && (<Leaderboard LeaderboardAnim={LeaderboardAnim} userId={userId} coins={coinmain} getRandomColor={getRandomColor}/>)}

      {isFrendsOpen && (<Friends FriendsAnim={FriendsAnim} invite={invite} referralCode={referralCode} telegramLink={telegramLink} getRandomColor={getRandomColor} />)}

    </div>
  );
}

export default App;
