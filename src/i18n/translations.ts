export type Language = 'vi' | 'ja';

export interface Translations {
  // Navigation
  nav: {
    couple: string;
    timeline: string;
    rsvp: string;
    replayDoor: string;
    openMenu: string;
  };
  // Door Intro
  door: {
    groomLabel: string;
    brideLabel: string;
    dearGuest: string;
    touchBowToOpen: string;
    musicNote: string;
    langSwitchNotice: string;
  };
  // Hero Section
  hero: {
    tagline: string;
    invitedPrefix: string;
    generalGreeting: string;
    dateSeparator: string;
    defaultQuote: string;
    personalizedQuotePrefix: string;
    personalizedQuoteSuffix: string;
    scrollHint: string;
  };
  // Countdown
  countdown: {
    tagline: string;
    titleUpcoming: string;
    titlePast: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    eventDateLabel: string;
    addToCalendar: string;
    timeLabel: string;
    waitingMessage: string;
  };
  // Couple
  couple: {
    badge: string;
    title: string;
    defaultStory: string;
    groomBadge: string;
    brideBadge: string;
    groomFamily: string;
    brideFamily: string;
    fatherLabel: string;
    motherLabel: string;
  };
  // Events
  events: {
    badge: string;
    title: string;
    subtitle: string;
    vuQuySubtitle: string;
    thanhHonSubtitle: string;
    groomHouseBadge: string;
    brideHouseBadge: string;
    weddingCeremonyBadge: string;
    openMap: string;
    copyAddress: string;
    addressCopied: string;
    lunarPrefix: string;
    notes: {
      dressCodeVuQuy: string;
      ritualThanhHon: string;
    };
  };
  // RSVP
  rsvp: {
    badge: string;
    title: string;
    subtitle: string;
    successTitle: string;
    successYes: (name: string) => string;
    successNo: (name: string) => string;
    sendAnother: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    attendingLabel: string;
    yesOption: string;
    yesSubtext: string;
    noOption: string;
    noSubtext: string;
    eventSelectLabel: string;
    allEventsOption: string;
    guestCountLabel: string;
    personSuffix: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    adminToggle: (count: number) => string;
    adminTitle: string;
    adminExport: string;
    noRsvpYet: string;
  };
  // Footer
  footer: {
    thankYou: string;
    tagline: string;
    replayDoor: string;
    createLink: string;
    settings: string;
    copyrightNotice: string;
  };
  // Music Player
  music: {
    playingTooltip: string;
    pausedTooltip: string;
    weddingBgm: string;
  };
  // Gallery
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
    slideLeftAria: string;
    slideRightAria: string;
    photoAlt: (idx: number) => string;
    viewHint: string;
    closeLightbox: string;
  };
  // Gift Box
  giftBox: {
    badge: string;
    title: string;
    subtitle: string;
    groomBadge: string;
    brideBadge: string;
    qrHint: string;
    copyAccount: string;
    accountCopied: string;
    thankYouNote: string;
  };
  // Guestbook
  guestbook: {
    badge: string;
    title: string;
    subtitle: string;
    formTitle: string;
    successMessage: string;
    senderNameLabel: string;
    senderNamePlaceholder: string;
    relationshipLabel: string;
    relationships: Record<string, string>;
    contentLabel: string;
    contentPlaceholder: string;
    submitButton: string;
    recentWishesTitle: string;
    emptyWishes: string;
  };
  // Story
  story: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

export const translations: Record<Language, Translations> = {
  vi: {
    nav: {
      couple: 'Cặp Đôi',
      timeline: 'Lịch Trình',
      rsvp: 'Xác Nhận (RSVP)',
      replayDoor: 'Mở lại thiệp',
      openMenu: 'Mở menu',
    },
    door: {
      groomLabel: 'Chú Rể',
      brideLabel: 'Cô Dâu',
      dearGuest: 'Thân mời:',
      touchBowToOpen: 'Chạm vào nơ để mở thiệp nha 💕',
      musicNote: 'Nhạc cưới tự động phát khi mở',
      langSwitchNotice: 'Ngôn ngữ',
    },
    hero: {
      tagline: 'Ngày Chung Đôi • Thư Mời Đám Cưới',
      invitedPrefix: 'Thân mời:',
      generalGreeting: 'Kính mời: Quý anh/chị & cô/chú',
      dateSeparator: '•',
      defaultQuote:
        'Hôn nhân là lời hứa của hai trái tim cùng chung nhịp đập, cùng nhau đi qua mọi thăng trầm của cuộc đời. Chúng mình rất mong sự hiện diện của bạn để ngày vui thêm trọn vẹn và ý nghĩa!',
      personalizedQuotePrefix:
        'Đây là lời mời chân thành của chúng em/con gửi tới',
      personalizedQuoteSuffix:
        '. Vì một vài lý do mà chúng con chưa thể gửi thiệp tận tay, chúng con rất mong tấm thiệp chân tình này sẽ được đón chào quý khách đến chung vui ngày hạnh phúc nhất của tụi con!',
      scrollHint: 'Cuộn xuống để xem chi tiết',
    },
    countdown: {
      tagline: 'Đếm Ngược Tới Khoảnh Khắc Hạnh Phúc',
      titleUpcoming: 'Cùng Đếm Ngược Ngày Chung Đôi',
      titlePast: 'Ngày Trọng Đại Đã Diễn Ra!',
      days: 'Ngày',
      hours: 'Giờ',
      minutes: 'Phút',
      seconds: 'Giây',
      eventDateLabel: 'Chủ Nhật, 06 Tháng 12, 2026',
      addToCalendar: 'Thêm vào Google Lịch',
      timeLabel: '11:00 Sáng',
      waitingMessage: 'Chúng mình rất nóng lòng được đón tiếp quý khách!',
    },
    couple: {
      badge: 'Cô Dâu & Chú Rể',
      title: 'Hai Nửa Yêu Thương',
      defaultStory:
        'Hôn nhân là lời hứa của hai trái tim cùng chung nhịp đập, cùng nhau đi qua mọi thăng trầm của cuộc đời. Chúng mình rất mong sự hiện diện của bạn để ngày vui thêm trọn vẹn và ý nghĩa!',
      groomBadge: 'Chú Rể',
      brideBadge: 'Cô Dâu',
      groomFamily: 'Nhà Trai',
      brideFamily: 'Nhà Gái',
      fatherLabel: 'Ông:',
      motherLabel: 'Bà:',
    },
    events: {
      badge: 'Thời Gian & Địa Điểm',
      title: 'Lịch Trình Hôn Lễ',
      subtitle:
        'Sự hiện diện của quý khách là niềm vinh hạnh đối với gia đình chúng tôi.',
      vuQuySubtitle: 'Lễ Vu Quy (Nhà Gái)',
      thanhHonSubtitle: 'Lễ Thành Hôn (Nhà Trai)',
      groomHouseBadge: 'Nhà Trai',
      brideHouseBadge: 'Nhà Gái',
      weddingCeremonyBadge: 'Hôn Lễ',
      openMap: 'Mở Google Maps Chỉ Đường',
      copyAddress: 'Sao chép địa chỉ',
      addressCopied: 'Đã sao chép địa chỉ',
      lunarPrefix: 'Âm lịch:',
      notes: {
        dressCodeVuQuy: 'Nghi lễ Gia Tiên & Khai tiệc mừng',
        ritualThanhHon: 'Nghi lễ Rước Dâu & Khai tiệc mừng',
      },
    },
    rsvp: {
      badge: 'Xác Nhận Tham Dự (RSVP)',
      title: 'Bạn Sẽ Đến Chung Vui Chứ?',
      subtitle:
        'Để giúp cô dâu và chú rể chuẩn bị đón tiếp chu đáo nhất, xin vui lòng gửi phản hồi trước ngày hôn lễ.',
      successTitle: 'Xác Nhận Thành Công!',
      successYes: (name: string) =>
        `Cảm ơn ${name}! Vợ chồng mình rất háo hức và mong chờ được đón tiếp bạn trong ngày vui!`,
      successNo: (name: string) =>
        `Cảm ơn ${name} đã phản hồi. Thật tiếc khi bạn không thể tham dự, nhưng chúng mình luôn trân trọng tình cảm của bạn!`,
      sendAnother: 'Gửi phản hồi khác',
      fullNameLabel: 'Họ và tên của bạn *',
      fullNamePlaceholder: 'Ví dụ: Nguyễn Văn An',
      phoneLabel: 'Số điện thoại',
      phonePlaceholder: 'Để chúng mình tiện liên hệ và gửi nhắc lịch...',
      attendingLabel: 'Bạn có thể tham dự không? *',
      yesOption: 'Có, tôi chắc chắn sẽ đến!',
      yesSubtext: 'Sẵn sàng nâng ly chúc mừng',
      noOption: 'Rất tiếc, tôi bận mất rồi',
      noSubtext: 'Xin gửi lời chúc từ xa',
      eventSelectLabel: 'Bạn sẽ tham dự buổi nào? *',
      allEventsOption: 'Tất cả các buổi',
      guestCountLabel: 'Số lượng người tham dự (bao gồm bạn)',
      personSuffix: 'người',
      messageLabel: 'Lời nhắn gửi hoặc yêu cầu đặc biệt (chay, dị ứng...)',
      messagePlaceholder: 'Ghi chú thêm cho cô dâu và chú rể...',
      submitButton: 'Gửi Xác Nhận Tham Dự',
      adminToggle: (count: number) =>
        `Dành cho Cô Dâu & Chú Rể: Xem Thống Kê Khách Mời (${count})`,
      adminTitle: 'Danh Sách Khách Đã Phản Hồi',
      adminExport: 'Xuất file CSV',
      noRsvpYet: 'Chưa có khách mời nào xác nhận.',
    },
    footer: {
      thankYou:
        '"Cảm ơn bạn đã luôn là một phần đặc biệt trong thanh xuân và ngày hạnh phúc nhất của chúng mình."',
      tagline: 'Hạnh Phúc Vĩnh Cửu',
      replayDoor: 'Xem lại hiệu ứng mở cửa thiệp',
      createLink: 'Tạo Link Mời',
      settings: 'Cài đặt',
      copyrightNotice:
        'Trang web thiệp cưới lãng mạn & tinh tế dành riêng cho ngày trọng đại.',
    },
    music: {
      playingTooltip: 'Tạm dừng nhạc cưới',
      pausedTooltip: 'Bật nhạc cưới lãng mạn',
      weddingBgm: 'Nhạc cưới lãng mạn',
    },
    gallery: {
      badge: 'Khoảnh Khắc Hạnh Phúc',
      title: 'Album Ảnh Cưới',
      subtitle:
        'Những thước hình lưu giữ từng nụ cười, cái ôm và tình yêu trọn vẹn của chúng mình.',
      slideLeftAria: 'Cuộn ảnh sang trái',
      slideRightAria: 'Cuộn ảnh sang phải',
      photoAlt: (idx: number) => `Ảnh cưới ${idx + 1}`,
      viewHint: 'Chạm vào ảnh để xem toàn màn hình',
      closeLightbox: 'Đóng',
    },
    giftBox: {
      badge: 'Gửi Gắm Yêu Thương',
      title: 'Hộp Mừng Cưới',
      subtitle:
        'Sự hiện diện của bạn là món quà quý giá nhất đối với chúng mình. Nếu bạn muốn gửi lời chúc mừng từ xa, xin gửi qua thông tin tài khoản dưới đây.',
      groomBadge: 'Mừng Chú Rể',
      brideBadge: 'Mừng Cô Dâu',
      qrHint: 'Quét mã VietQR chuyển khoản',
      copyAccount: 'Sao chép số tài khoản',
      accountCopied: 'Đã sao chép số tài khoản vào bộ nhớ tạm!',
      thankYouNote:
        '"Dù là món quà hay lời chúc nhỏ nhất, tấm lòng của bạn đều là niềm hạnh phúc vô bờ bến đối với vợ chồng mình trong ngày trọng đại này!"',
    },
    guestbook: {
      badge: 'Sổ Lưu Bút Online',
      title: 'Gửi Lời Chúc Phúc',
      subtitle:
        'Mỗi lời chúc chân thành của bạn là nguồn động viên và niềm vui to lớn đối với vợ chồng mình.',
      formTitle: 'Viết Lời Chúc Mừng',
      successMessage:
        'Cảm ơn bạn! Lời chúc ngọt ngào của bạn đã được gửi thành công!',
      senderNameLabel: 'Tên của bạn *',
      senderNamePlaceholder: 'Ví dụ: Hoàng Anh, Nhóm bạn Đại học...',
      relationshipLabel: 'Mối quan hệ',
      relationships: {
        'Bạn bè': 'Bạn bè',
        'Bạn thân cô dâu': 'Bạn thân cô dâu',
        'Bạn thân chú rể': 'Bạn thân chú rể',
        'Đồng nghiệp': 'Đồng nghiệp',
        'Người thân / Họ hàng': 'Người thân / Họ hàng',
        'Anh/Chị/Em': 'Anh/Chị/Em',
      },
      contentLabel: 'Lời chúc của bạn *',
      contentPlaceholder:
        'Gửi những lời chúc tốt đẹp nhất tới cô dâu & chú rể...',
      submitButton: 'Gửi Lời Chúc',
      recentWishesTitle: 'Lời Chúc Từ Người Thân & Bạn Bè',
      emptyWishes:
        'Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc tới cặp đôi nhé!',
    },
    story: {
      badge: 'Hành Trình Yêu Thương',
      title: 'Câu Chuyện Tình Yêu',
      subtitle:
        'Mỗi khoảnh khắc đi qua đều là một mảnh ghép ngọt ngào tạo nên chặng đường hạnh phúc của chúng mình.',
    },
  },
  ja: {
    nav: {
      couple: '新郎・新婦',
      timeline: '日時・会場',
      rsvp: 'ご出欠返信 (RSVP)',
      replayDoor: '招待状を開く',
      openMenu: 'メニューを開く',
    },
    door: {
      groomLabel: '新郎 (Chú Rể)',
      brideLabel: '新婦 (Cô Dâu)',
      dearGuest: 'ご案内:',
      touchBowToOpen: 'リボンをタップして開く 💕',
      musicNote: 'タップするとBGMが再生されます',
      langSwitchNotice: '言語 (Language)',
    },
    hero: {
      tagline: 'WEDDING INVITATION • 結婚式のご案内',
      invitedPrefix: 'ご招待:',
      generalGreeting: '謹啓　皆様へご案内申し上げます',
      dateSeparator: '•',
      defaultQuote:
        '結婚とは、同じ鼓動を刻むふたつの心が、人生の喜びや苦楽を共に歩む誓いです。私たちの新たな門出を、皆様と共に迎えられることを心より願っております。',
      personalizedQuotePrefix:
        '遠方などの都合により直接お会いしてお渡しすることが叶わず、略儀ながらウェブ招待状にてご案内申し上げます。',
      personalizedQuoteSuffix:
        ' 様にご出席いただき、共に門出をお祝いできましたら幸いに存じます。',
      scrollHint: '下へスクロールして詳細を見る',
    },
    countdown: {
      tagline: '結婚式までのカウントダウン',
      titleUpcoming: '私たちの特別な日まで',
      titlePast: '特別な日が始まりました！',
      days: '日',
      hours: '時間',
      minutes: '分',
      seconds: '秒',
      eventDateLabel: '2026年12月6日 (日曜日)',
      addToCalendar: 'Googleカレンダーに追加',
      timeLabel: '午前 11:00',
      waitingMessage: '皆様にお会いできることを心より楽しみにしております！',
    },
    couple: {
      badge: '新郎・新婦のご紹介',
      title: 'ふたりの歩み',
      defaultStory:
        '結婚とは、同じ鼓動を刻むふたつの心が、人生の喜びや苦楽を共に歩む誓いです。私たちの新たな門出を、皆様と共に迎えられることを心より願っております。',
      groomBadge: '新郎 (Chú Rể)',
      brideBadge: '新婦 (Cô Dâu)',
      groomFamily: '新郎側ご家族 (Nhà Trai)',
      brideFamily: '新婦側ご家族 (Nhà Gái)',
      fatherLabel: '父:',
      motherLabel: '母:',
    },
    events: {
      badge: '日時 ＆ 会場のご案内',
      title: 'ウェディングスケジュール',
      subtitle: '皆様のご列席を心よりお待ち申し上げております。',
      vuQuySubtitle: 'Lễ Vu Quy (新婦側 挙式・祝宴)',
      thanhHonSubtitle: 'Lễ Thành Hôn (新郎側 挙式・披露宴)',
      groomHouseBadge: 'Nhà Trai (新郎側)',
      brideHouseBadge: 'Nhà Gái (新婦側)',
      weddingCeremonyBadge: '挙式・祝宴',
      openMap: 'Googleマップで道順を見る',
      copyAddress: '住所をコピー',
      addressCopied: '住所をコピーしました',
      lunarPrefix: '旧暦:',
      notes: {
        dressCodeVuQuy: '伝統の先祖儀式 ＆ 祝宴（披露宴）',
        ritualThanhHon: '花嫁迎え儀式（迎親） ＆ 祝宴（披露宴）',
      },
    },
    rsvp: {
      badge: 'ご出欠の返信 (RSVP)',
      title: 'ご出欠をお知らせください',
      subtitle:
        'お手数ではございますが、お席の準備の都合上、期日までにご出欠をお知らせいただけますようお願い申し上げます。',
      successTitle: 'ご返信ありがとうございます！',
      successYes: (name: string) =>
        `${name} 様、ご出席のご返信を誠にありがとうございます！お会いできることを心より楽しみにしております！`,
      successNo: (name: string) =>
        `${name} 様、ご返信いただきありがとうございます。ご欠席とのこと残念ではございますが、温かいお気持ちに深く感謝申し上げます。`,
      sendAnother: 'もう一度回答する',
      fullNameLabel: 'お名前 (氏名) *',
      fullNamePlaceholder: '例: 山田 太郎 / Nguyễn Văn An',
      phoneLabel: 'お電話番号',
      phonePlaceholder: 'ご連絡先電話番号をご入力ください...',
      attendingLabel: 'ご出欠 *',
      yesOption: '喜んで出席いたします！',
      yesSubtext: 'お祝いに駆けつけます',
      noOption: 'あいにく都合がつかず欠席します',
      noSubtext: 'お祝いのお気持ちをお送りします',
      eventSelectLabel: 'ご出席される式典 *',
      allEventsOption: 'すべての式典に出席',
      guestCountLabel: 'ご出席人数 (ご本人様を含む)',
      personSuffix: '名様',
      messageLabel: '新郎新婦へのメッセージ・特別なご要望（アレルギー等）',
      messagePlaceholder: 'お祝いのお言葉やご要望をご記入ください...',
      submitButton: 'ご出欠を送信する',
      adminToggle: (count: number) =>
        `新郎新婦専用: 出席者リストを確認 (${count}名)`,
      adminTitle: 'ご回答いただいたゲスト一覧',
      adminExport: 'CSVファイルをダウンロード',
      noRsvpYet: 'まだご回答がありません。',
    },
    footer: {
      thankYou:
        '「私たちの人生においてかけがえのない皆様へ、心からの感謝を込めて。」',
      tagline: '永遠の幸せ • Forever in Love',
      replayDoor: '扉の演出をもう一度見る',
      createLink: '個別招待リンク作成',
      settings: '設定',
      copyrightNotice: 'ふたりの特別な日のためのウェディング招待状。',
    },
    music: {
      playingTooltip: 'BGMを一時停止',
      pausedTooltip: 'ウェディングBGMを再生',
      weddingBgm: 'ウェディングBGM',
    },
    gallery: {
      badge: '幸せの瞬間',
      title: 'ウェディングフォト',
      subtitle:
        'ふたりの笑顔と温もり、愛にあふれた大切な瞬間を収めたアルバムです。',
      slideLeftAria: '前の写真へ',
      slideRightAria: '次の写真へ',
      photoAlt: (idx: number) => `結婚写真 ${idx + 1}`,
      viewHint: '写真をタップして拡大表示',
      closeLightbox: '閉じる',
    },
    giftBox: {
      badge: '心からの贈り物',
      title: 'ご祝儀・お祝い',
      subtitle:
        '皆様のご臨席こそが私たちにとって最大の贈り物です。遠方よりお祝いをお届けいただける場合は、こちらをご確認ください。',
      groomBadge: '新郎へのお祝い',
      brideBadge: '新婦へのお祝い',
      qrHint: 'VietQRコードをスキャンして送金',
      copyAccount: '口座番号をコピー',
      accountCopied: '口座番号をクリップボードにコピーしました！',
      thankYouNote:
        '「温かいお心遣いとお祝いのお言葉に、心より深く感謝申し上げます。」',
    },
    guestbook: {
      badge: 'オンライン芳名帳',
      title: 'お祝いメッセージ',
      subtitle:
        '皆様からの心温まるメッセージが、ふたりのこれからの歩みの大きな支えとなります。',
      formTitle: 'お祝いメッセージを投稿する',
      successMessage:
        'ありがとうございます！温かいお祝いメッセージを受け付けました！',
      senderNameLabel: 'お名前 *',
      senderNamePlaceholder: '例: 山田 太郎、大学の友人一同...',
      relationshipLabel: 'ご関係',
      relationships: {
        'Bạn bè': 'ご友人',
        'Bạn thân cô dâu': '新婦の親友',
        'Bạn thân chú rể': '新郎の親友',
        'Đồng nghiệp': '同僚・職場関係',
        'Người thân / Họ hàng': 'ご親戚・ご家族',
        'Anh/Chị/Em': '兄弟・姉妹',
      },
      contentLabel: 'メッセージ *',
      contentPlaceholder:
        '新郎新婦へ心温まる祝福の言葉をお送りください...',
      submitButton: 'メッセージを送信',
      recentWishesTitle: '皆様からのお祝いメッセージ',
      emptyWishes:
        'まだメッセージがありません。ぜひ最初のメッセージをお寄せください！',
    },
    story: {
      badge: 'ふたりの軌跡',
      title: 'Love Story',
      subtitle:
        'ふたりで歩んできたひとつひとつの時間が、かけがえのない大切な宝物です。',
    },
  },
};
