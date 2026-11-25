export const INITIAL_DATA = {
  tripTitle: "도쿄 힐링 & 명소 투어 2박 3일",
  destination: "도쿄, 일본 🇯🇵",
  period: "2026.11.25(수) ~ 11.27(금)",
  
  // 1. 상단 공지사항
  notice: {
    id: "notice-1",
    text: "📢 내일 조식은 07:30 2층 레스토랑, 전용 버스 탑승은 08:30 1층 로비 집합입니다. 늦지 않게 나와주세요!",
    updatedAt: "2026-11-25 09:30",
    author: "김인솔 가이드"
  },

  // 2. 일자별 타임라인 (Day 1, 2, 3)
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      date: "11.25(수)",
      title: "도쿄 도착 & 신주쿠 야경 탐방",
      items: [
        {
          id: "item-1-1",
          time: "09:00",
          title: "인천공항 제2터미널 집합 & 출국 수속",
          category: "이동", // 이동, 관광, 식사, 숙소
          memo: "3층 H카운터 앞 집합. 여권 및 수하물 위탁 확인",
          status: "completed" // upcoming, in_progress, completed
        },
        {
          id: "item-1-2",
          time: "11:30",
          title: "대한항공 KE703 도쿄 나리타행 출발",
          category: "이동",
          memo: "기내식 제공 (비행시간 약 2시간 20분)",
          status: "completed"
        },
        {
          id: "item-1-3",
          time: "14:30",
          title: "나리타 공항 입국 & 전용 리무진 버스 탑승",
          category: "이동",
          memo: "입국 심사 및 Visit Japan Web QR 제시",
          status: "in_progress"
        },
        {
          id: "item-1-4",
          time: "16:30",
          title: "호텔 그레이스리 신주쿠 체크인",
          category: "숙소",
          memo: "호텔 로비에서 방 배정 및 룸키 수령, 30분 자유 정비",
          status: "upcoming"
        },
        {
          id: "item-1-5",
          time: "18:00",
          title: "신주쿠 오모이데요코초 & 현지 라멘 석식",
          category: "식사",
          memo: "정통 돈코츠 라멘 & 교자 세트 제공",
          status: "upcoming"
        },
        {
          id: "item-1-6",
          time: "20:00",
          title: "도쿄도청 전망대 야경 관람",
          category: "관광",
          memo: "남쪽 타워 45층 무료 전망대, 도쿄 시내 360도 조망",
          status: "upcoming"
        }
      ]
    },
    {
      id: "day-2",
      dayNumber: 2,
      date: "11.26(목)",
      title: "아사쿠사 전통 & 시부야 트렌드 투어",
      items: [
        {
          id: "item-2-1",
          time: "08:30",
          title: "호텔 로비 집합 & 전용 버스 출발",
          category: "이동",
          memo: "시간 엄수! 버스 내 생수 제공",
          status: "upcoming"
        },
        {
          id: "item-2-2",
          time: "09:30",
          title: "아사쿠사 센소지 & 나카미세도리 거리",
          category: "관광",
          memo: "카미나리몬 앞에서 단체 기념 촬영 후 1시간 자유 산책",
          status: "upcoming"
        },
        {
          id: "item-2-3",
          time: "12:00",
          title: "긴자 명품거리 & 스시 오마카세 중식",
          category: "식사",
          memo: "현지 신선한 제철 해산물 초밥 특선 코스",
          status: "upcoming"
        },
        {
          id: "item-2-4",
          time: "14:30",
          title: "메이지신궁 & 하라주쿠 다케시타도리",
          category: "관광",
          memo: "울창한 도심 숲길 힐링 산책",
          status: "upcoming"
        },
        {
          id: "item-2-5",
          time: "17:00",
          title: "시부야 스카이(SHIBUYA SKY) 전망대",
          category: "관광",
          memo: "일몰 골든아워 예약 완료. 모바일 바우처 QR 준비!",
          status: "upcoming"
        },
        {
          id: "item-2-6",
          time: "19:30",
          title: "시부야 스크램블 교차로 & 자유 석식",
          category: "식사",
          memo: "개별 자유 일정 및 쇼핑, 호텔 복귀 안내",
          status: "upcoming"
        }
      ]
    },
    {
      id: "day-3",
      dayNumber: 3,
      date: "11.27(금)",
      title: "오다이바 해변공원 & 귀국",
      items: [
        {
          id: "item-3-1",
          time: "09:00",
          title: "호텔 체크아웃 & 짐 로비 보관/적재",
          category: "숙소",
          memo: "객실 내 개인 소지품(충전기 등) 두고 나오지 않기",
          status: "upcoming"
        },
        {
          id: "item-3-2",
          time: "10:30",
          title: "오다이바 해변공원 & 실물 크기 건담",
          category: "관광",
          memo: "다이버시티 도쿄 플라자 & 자유 기념품 쇼핑",
          status: "upcoming"
        },
        {
          id: "item-3-3",
          time: "13:00",
          title: "나리타 국제공항 도착 & 출국 수속",
          category: "이동",
          memo: "면세점 이용 및 남은 잔돈/엔화 정리",
          status: "upcoming"
        },
        {
          id: "item-3-4",
          time: "16:20",
          title: "대한항공 KE704 인천행 출발",
          category: "이동",
          memo: "19:00 인천공항 도착 및 해산",
          status: "upcoming"
        }
      ]
    }
  ],

  // 3. 인원 및 준비물 체크리스트 (5건)
  checklists: [
    {
      id: "check-1",
      title: "여권 원본 및 유효기간(6개월 이상) 확인",
      category: "준비물",
      completed: true
    },
    {
      id: "check-2",
      title: "110V 돼지코 어댑터 & 10000mAh 보조배터리",
      category: "준비물",
      completed: true
    },
    {
      id: "check-3",
      title: "일본 현지 e-SIM / 포켓 와이파이 활성화",
      category: "준비물",
      completed: false
    },
    {
      id: "check-4",
      title: "엔화 현금 3만엔 & 해외결제 트래블카드",
      category: "준비물",
      completed: true
    },
    {
      id: "check-5",
      title: "투어 참가자 전원(15명) 집합 및 인원 점검",
      category: "인원",
      completed: false
    }
  ],

  // 4. 디지털 바우처 목록 (3건)
  vouchers: [
    {
      id: "voucher-1",
      type: "flight",
      title: "대한항공 KE703 왕복 항공권",
      issuer: "대한항공 (Korean Air)",
      code: "KE703 / E-TKT 180-294829104",
      details: "ICN 11:30 → NRT 13:50 | 일반석(Economy) 24A, 24B",
      qrPayload: "KE703-ICN-NRT-CONFIRM-94829104",
      badge: "출국 편",
      color: "from-sky-500 to-blue-600"
    },
    {
      id: "voucher-2",
      type: "hotel",
      title: "호텔 그레이스리 신주쿠 2박",
      issuer: "Hotel Gracery Shinjuku",
      code: "RES-TYO-202611-8842",
      details: "스탠다드 트윈룸 (조식 2인 포함) | 체크인 15:00",
      qrPayload: "HOTEL-GRACERY-SHINJUKU-RES-8842",
      badge: "숙소 확정",
      color: "from-brand-600 to-indigo-700"
    },
    {
      id: "voucher-3",
      type: "ticket",
      title: "시부야 스카이(SHIBUYA SKY) 입장권",
      issuer: "SHIBUYA SCRAMBLE SQUARE",
      code: "SKY-20261126-1700-019",
      details: "11.26(목) 17:00 입장 | 루프탑 전망대 관람권",
      qrPayload: "SHIBUYA-SKY-ENTRY-1700-TICKET-019",
      badge: "전망대 티켓",
      color: "from-amber-500 to-accent-500"
    }
  ],

  // 5. 현지어 택시 카드 (Hotel Card)
  hotelCard: {
    nameKo: "호텔 그레이스리 신주쿠",
    nameJa: "ホテルグレイスリー新宿",
    requestKo: "기사님, 호텔 그레이스리 신주쿠로 가주세요.",
    requestJa: "運転手さん、ホテルグレイスリー新宿までお願いします。",
    addressJa: "東京都新宿区歌舞伎町1-19-1",
    addressEn: "1-19-1 Kabukicho, Shinjuku-ku, Tokyo 160-8466",
    tel: "+81 3-6833-1111",
    landmark: "신주쿠 동쪽 출구, 토호 시네마(고질라 머리 빌딩)"
  },

  // 6. 현지 비상연락처
  emergencyContacts: [
    {
      id: "em-1",
      title: "김인솔 가이드 (현지 인솔자)",
      role: "24시간 긴급 지원",
      phone: "+82-10-1234-5678",
      subPhone: "+81-80-9988-7766",
      type: "guide"
    },
    {
      id: "em-2",
      title: "주일본 대한민국 대사관",
      role: "여권 분실 / 사건사고 지원",
      phone: "+81-3-3452-7401",
      subPhone: "+82-2-3210-0404 (외교부 영사콜센터)",
      type: "embassy"
    },
    {
      id: "em-3",
      title: "일본 긴급 신고 (경찰)",
      role: "범죄 / 분실물 / 교통사고",
      phone: "110",
      subPhone: "외국인 통역 안내 연결 지원",
      type: "police"
    },
    {
      id: "em-4",
      title: "일본 긴급 신고 (화재·구급)",
      role: "응급환자 / 화재 발생",
      phone: "119",
      subPhone: "다국어 119 통역 대응",
      type: "ambulance"
    }
  ]
};
