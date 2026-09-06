const ASSET_HOST = 'https://res.cloudinary.com/dehfdnxul/image/authenticated'

const FOLDER_CALCETTO = 'calcetto'
const FOLDER_TEAMS = 'calcetto/Teams'

export const Assets = {
  logo: `${ASSET_HOST}/s--_sOGsXex--/v1788246050/${FOLDER_CALCETTO}/m6dkghmvc5xv0b8vgf7t.png`,

  DEFAULT_PHOTO: `${ASSET_HOST}/s--UNdaEJF2--/v1788177943/${FOLDER_CALCETTO}/wtqa3zjx6taf2hkfcoix.png`,

  BRONZE_CARD_BG: `${ASSET_HOST}/s--xaONZWdD--/v1788177943/${FOLDER_CALCETTO}/nt5iwthyfqzqgxnlvldq.png`,

  SILVER_CARD_BG: `${ASSET_HOST}/s--cAT1cZS2--/v1788177943/${FOLDER_CALCETTO}/dltiidrlu71t5buc8o6r.png`,

  GOLD_CARD_BG: `${ASSET_HOST}/s--s1fFmJ49--/v1788177944/${FOLDER_CALCETTO}/ycxumex2pxl2pvtllqj2.png`,

  CAMPO_CALCIO_BG: `${ASSET_HOST}/s--Iczp7z7v--/v1788177944/${FOLDER_CALCETTO}/upmsk5fbjgh60j13lt5g.jpg`
} as const

export const Teams = {
  fiorentina: `${ASSET_HOST}/s--W83pPFcL--/v1788246158/${FOLDER_TEAMS}/qlq5bvbrrczntjdkzh6j.png`,

  inter: `${ASSET_HOST}/s--n_iWbJNR--/v1788246157/${FOLDER_TEAMS}/eejdzz2mydwr527izxzm.png`,

  juventus: `${ASSET_HOST}/s--QkKYV8eO--/v1788246156/${FOLDER_TEAMS}/ytemy2wadugwjznlimio.png`,

  lazio: `${ASSET_HOST}/s--JaDy8ZSd--/v1788246157/${FOLDER_TEAMS}/kcw8bvbkxnyvmy0euatt.png`,

  milan: `${ASSET_HOST}/s--uQR6tS4j--/v1788246156/${FOLDER_TEAMS}/clwupnenmr25l8hng8kj.png`,

  napoli: `${ASSET_HOST}/s--zmwhCzgZ--/v1788246156/${FOLDER_TEAMS}/yvshsapiw5m9lw8vxbtb.png`,

  roma: `${ASSET_HOST}/s--uJoy5bDZ--/v1788246157/${FOLDER_TEAMS}/jnnnt9odp2r5xbmbllxn.png`
} as const
