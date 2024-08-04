import React, { useState, useEffect } from 'react';
import '../Css/Friends.css';
import axios from 'axios';

const Friends = ({ FriendsAnim, invite, referralCode, telegramLink, getRandomColor }) => {
    const [referredUsers, setReferredUsers] = useState([]);
    const [colorsF, setColorsF] = useState([]);
    const REACT_APP_BACKEND_URL = 'https://testfrontckecksub-production.up.railway.app';

    useEffect(() => {
        const fetchReferredUsers = async () => {
            try {
                const response = await axios.post(`${REACT_APP_BACKEND_URL}/get-referred-users`, { referralCode });
                setReferredUsers(response.data.referredUsers);
                const newColorsF = response.data.leaderboard.map(() => getRandomColor());
                setColorsF(newColorsF);
            } catch (error) {
                console.error('Ошибка при получении данных о рефералах:', error);
            }
        };

        fetchReferredUsers();
    }, [referralCode, getRandomColor]);

  

    const handleShareLink = () => {
        const messageText = 'Meow, lets see who is OG 🐱'; // Текст сообщения
        const referralUrl = telegramLink; // URL для реферальной ссылки
        
        // Конкатенация сообщения и ссылки
        const telegramMessage = `${messageText}\n${referralUrl}`;
        window.open(`https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent(telegramMessage)}`, '_blank');
        
        window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
    };
    
    

    return (
        <div className={`Fr_Window ${FriendsAnim ? 'fade-out' : ''}`}>
            <div className='Fr_Info'>
                <p>Invite friends <br/> and get more $OCTIES</p>
            </div>
            <div className='Fr_Main'>
                <img src={invite} alt='invite'/>
            </div>
            <div className='Fr_InviteBtn'>
                <div className='BTNInvete' onClick={handleShareLink}>
                    <p>Invite friends</p>
                    <p id='Fr_dark'>+10% of your <br/>friend’s age</p>
                </div>
            </div>
            <div className='Fr_Friends'>
                <p>{referredUsers.length} friends</p>
            </div>
            <div className='Fr_list'>
                {referredUsers.map((user, index) => (
                    <div key={index} className='Lb_Lider'>
                        <div className='LbPhoto'  
                        style={{ backgroundColor: colorsF[index],
                            borderRadius: '50%',
                            aspectRatio: '1', 
                            height: '5.5vh', 
                            display: 'flex',
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontSize: '20px', 
                            marginRight:'2vh', 
                            color: 'white' }}>
                            <p style={{margin: '0'}}>{user.nickname.slice(0, 2).toUpperCase()}</p>
                        </div>
                        
                        <div className='NameLb'>
                            <p>{user.nickname}</p>
                        </div>

                        <div className='LbPhoto' id='FR_Coins_frend'>
                           
                        <p>+{user.earnedCoins} $OCTIES</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Friends;
