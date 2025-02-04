import React from "react";
import s from "./Footer.module.css";
import instagramImg from './../../photos/instagram_icon.png'
import telegramImg from './../../photos/telegram_icon.png'
import gmailImg from './../../photos/gmail_icon.png'
import githubImg from './../../photos/github_icon.png'
import whatsappImg from './../../photos/whatsapp_icon.png'


const Footer = (props) => {
  return <div className={s.footer}>
      <div className={s.authorContacts}>
<div className={s.contsctDiv}>
<img className={`${s.instagramImg} ${s.iconImg}`} src={instagramImg} alt="instagram"/>
<a target={'_blank'}  rel="noreferrer" href={'https://www.instagram.com/thisisrashidov/'} className={s.nickName}>thisisrashisov</a>
</div>
<div className={s.contsctDiv}>
<img className={`${s.telegramImg} ${s.iconImg}`} src={telegramImg} alt="telegram"/>
<a target={'_blank'}  rel="noreferrer" className={s.nickName} href={'https://t.me/EfedyaR'}>EfedyaR</a>

</div>
<div className={s.contsctDiv}>
<img className={`${s.gmailImg} ${s.iconImg}`} src={gmailImg} alt="gmail"/>
<p target={'_blank'}  rel="noreferrer" className={`${s.nickName} ${s.email}`} href={'sedredinovich@gmail.com'}>sedredinovich@gmail.com</p>

</div>

      </div>
      <div className={s.authorContacts}>
<div className={s.contsctDiv}>
<img className={`${s.whatsappImg} ${s.iconImg}`} src={whatsappImg} alt="whatsapp"/>
<a target={'_blank'}  rel="noreferrer" href={'https://wa.me/79289763997'} className={s.nickName}>+7 928 976 39 97</a>
</div>
<div className={s.contsctDiv}>
<img className={`${s.githubImg} ${s.iconImg}`} src={githubImg} alt="github"/>
<a target={'_blank'}  rel="noreferrer" href={'https://github.com/Sdredinovich'} className={s.nickName}>Sdredinovich</a>
</div>


      </div>


  </div>;
};
export default Footer;
