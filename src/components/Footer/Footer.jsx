import React from "react";
import s from "./Footer.module.css";
import instagramImg from './../../photos/instagram_icon.svg'
import telegramImg from './../../photos/telegram_icon.svg'
import gmailImg from './../../photos/gmail_icon.svg'
import githubImg from './../../photos/gitlogo_icon.svg'
import whatsappImg from './../../photos/whatsapp_icon.svg'


const Footer = (props) => {
  return <div className={s.footer}>
      <div className={s.authorContacts}>
<div className={s.contsctDiv}>
<img className={`${s.instagramImg} ${s.iconImg}`} src={instagramImg}/>
<a target={'_blank'} href={'https://www.instagram.com/thisisrashidov/'} className={s.nickName}>thisisrashisov</a>
</div>
<div className={s.contsctDiv}>
<img className={`${s.telegramImg} ${s.iconImg}`} src={telegramImg}/>
<a target={'_blank'} className={s.nickName} href={'https://t.me/EfedyaR'}>EfedyaR</a>

</div>
<div className={s.contsctDiv}>
<img className={`${s.gmailImg} ${s.iconImg}`} src={gmailImg}/>
<p target={'_blank'} className={`${s.nickName} ${s.email}`} href={'sedredinovich@gmail.com'}>sedredinovich@gmail.com</p>

</div>

      </div>
      <div className={s.authorContacts}>
<div className={s.contsctDiv}>
<img className={`${s.whatsappImg} ${s.iconImg}`} src={whatsappImg}/>
<a target={'_blank'} href={'https://wa.me/79289763997'} className={s.nickName}>+7 928 976 39 97</a>
</div>
<div className={s.contsctDiv}>
<img className={`${s.githubImg} ${s.iconImg}`} src={githubImg}/>
<a target={'_blank'} href={'https://github.com/Sdredinovich'} className={s.nickName}>Sdredinovich</a>
</div>


      </div>


  </div>;
};
export default Footer;
