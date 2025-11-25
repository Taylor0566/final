var ViewState = {
  HOME: "HOME",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  PROFILE: "PROFILE",
  DETAIL: "DETAIL",
  PUBLISH: "PUBLISH",
  STATS: "STATS",
  FEEDBACK: "FEEDBACK",
  CALENDAR: "CALENDAR",
};
var currentView = ViewState.HOME;
var currentUser = null;
var selectedEvent = null;
var searchTerm = "";
var filter = "all";
var LS_EVENTS_KEY = "campushub_events";
var LS_USER_KEY = "campushub_user";
var MOCK_EVENTS = [
  {
    id: "1",
    title: "2025 校园秋季音乐节",
    description:
      "体验最纯粹的音乐现场，集结校园顶尖乐队，为你带来难忘的夜晚。现场将有流行、摇滚、民谣等多种风格的演出。",
    date: "2025-11-15T18:00:00",
    location: "南区大草坪",
    category: "arts",
    imageUrl: "assets/img/event-1.jpg",
    organizer: "校学生会文娱部",
    attendees: 124,
    maxAttendees: 500,
    comments: [
      {
        id: "c1",
        userId: "u2",
        userName: "李明",
        content: "非常期待这次的压轴乐队！",
        date: "2025-10-20",
      },
    ],
    registeredUsers: [],
    favoritedUsers: [],
  },
  {
    id: "2",
    title: "人工智能与未来论坛",
    description:
      "特邀行业专家探讨生成式AI对未来就业的影响。我们将深入讨论大模型技术、伦理挑战以及学生如何应对即将到来的技术变革。",
    date: "2025-11-20T14:00:00",
    location: "科技楼 A101",
    category: "academic",
    imageUrl: "assets/img/event-2.jpg",
    organizer: "计算机学院",
    attendees: 45,
    maxAttendees: 100,
    comments: [],
    registeredUsers: [],
    favoritedUsers: [],
  },
  {
    id: "3",
    title: "春季校园马拉松",
    description:
      "强身健体，挑战自我！全程5公里，终点设有精美奖品。欢迎所有热爱运动的同学报名参加。",
    date: "2025-12-01T08:00:00",
    location: "北区体育场",
    category: "sports",
    imageUrl: "assets/img/event-3.jpg",
    organizer: "体育部",
    attendees: 300,
    maxAttendees: 1000,
    comments: [],
    registeredUsers: [],
    favoritedUsers: [],
  },
  {
    id: "4",
    title: "黑客马拉松编程大赛",
    description:
      "24小时极限编程挑战，寻找最优秀的校园开发者。提供免费餐饮与丰厚奖金。",
    date: "2025-11-25T09:00:00",
    location: "创新中心 B205",
    category: "academic",
    imageUrl: "assets/img/event-4.jpg",
    organizer: "极客社团",
    attendees: 80,
    maxAttendees: 150,
    comments: [],
    registeredUsers: [],
    favoritedUsers: [],
  },
  {
    id: "5",
    title: "国际文化交流夜",
    description:
      "品尝各国美食，欣赏异域风情表演，结识来自世界各地的留学生朋友。",
    date: "2025-11-18T19:00:00",
    location: "国际交流中心",
    category: "social",
    imageUrl: "assets/img/event-5.jpg",
    organizer: "国际学院",
    attendees: 200,
    maxAttendees: 300,
    comments: [],
    registeredUsers: [],
    favoritedUsers: [],
  },
  {
    id: "6",
    title: "当代艺术摄影展",
    description:
      "透过镜头看世界，展示我校学生的优秀摄影作品。主题包含人文、风景与抽象艺术。",
    date: "2025-11-10T10:00:00",
    location: "图书馆一楼展厅",
    category: "arts",
    imageUrl: "assets/img/event-6.jpg",
    organizer: "摄影协会",
    attendees: 50,
    maxAttendees: 200,
    comments: [],
    registeredUsers: [],
    favoritedUsers: [],
  },
  {
    id: "7",
    title: "新生篮球杯决赛",
    description: "热血沸腾的巅峰对决，快来为你支持的学院战队加油助威！",
    date: "2025-11-28T16:00:00",
    location: "体育馆主馆",
    category: "sports",
    imageUrl: "assets/img/event-7.jpg",
    organizer: "篮球协会",
    attendees: 450,
    maxAttendees: 800,
    comments: [],
    registeredUsers: [],
    favoritedUsers: [],
  },
  {
    id: "8",
    title: "草地露天电影节",
    description:
      "放映经典高分电影《星际穿越》。带上你的野餐垫，享受惬意的夜晚。",
    date: "2025-11-22T19:30:00",
    location: "情人坡草坪",
    category: "social",
    imageUrl: "assets/img/event-8.jpg",
    organizer: "电影社",
    attendees: 180,
    maxAttendees: 400,
    comments: [],
    registeredUsers: [],
    favoritedUsers: [],
  },
  {
    id: "9",
    title: "机器人制作工坊",
    description: "零基础入门Arduino开发，亲手制作属于你的第一个智能小车。",
    date: "2025-12-05T14:00:00",
    location: "工程训练中心",
    category: "academic",
    imageUrl: "assets/img/event-9.jpg",
    organizer: "机器人实验室",
    attendees: 30,
    maxAttendees: 30,
    comments: [],
    registeredUsers: [],
    favoritedUsers: [],
  },
  {
    id: "10",
    title: "校园十大歌手大赛",
    description: "全校最受瞩目的文艺盛事，见证校园歌神的诞生。",
    date: "2025-12-10T18:30:00",
    location: "大礼堂",
    category: "arts",
    imageUrl: "assets/img/event-10.jpg",
    organizer: "校团委",
    attendees: 800,
    maxAttendees: 1200,
    comments: [],
    registeredUsers: [],
    favoritedUsers: [],
  },
  {
    id: "11",
    title: "冥想与瑜伽体验课",
    description: "在繁忙的学业中寻找内心的宁静，专业教练指导。",
    date: "2025-11-17T07:00:00",
    location: "体育馆形体房",
    category: "sports",
    imageUrl: "assets/img/event-11.jpg",
    organizer: "心理健康中心",
    attendees: 20,
    maxAttendees: 25,
    comments: [],
    registeredUsers: [],
    favoritedUsers: [],
  },
  {
    id: "12",
    title: "英语辩论公开赛",
    description: "思辨的火花，语言的艺术。探讨全球热点议题。",
    date: "2025-11-29T15:00:00",
    location: "文科楼 B102",
    category: "academic",
    imageUrl: "assets/img/event-12.jpg",
    organizer: "外语学院",
    attendees: 60,
    maxAttendees: 100,
    comments: [],
    registeredUsers: [],
    favoritedUsers: [],
  },
];
var events = MOCK_EVENTS.slice();
function loadState() {
  try {
    var es = localStorage.getItem(LS_EVENTS_KEY);
    if (es) {
      events = JSON.parse(es);
    }
  } catch (e) {}
  try {
    var us = localStorage.getItem(LS_USER_KEY);
    if (us) {
      currentUser = JSON.parse(us);
    }
  } catch (e) {}
}
function saveEvents() {
  try {
    localStorage.setItem(LS_EVENTS_KEY, JSON.stringify(events));
  } catch (e) {}
}
function saveUser() {
  try {
    if (currentUser) {
      localStorage.setItem(LS_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(LS_USER_KEY);
    }
  } catch (e) {}
}
function navigate(view, params) {
  var map = {
    HOME: "index.html",
    LOGIN: "login.html",
    REGISTER: "register.html",
    PROFILE: "profile.html",
    DETAIL: "detail.html",
    PUBLISH: "publish.html",
    STATS: "stats.html",
    FEEDBACK: "feedback.html",
    CALENDAR: "calendar.html",
  };
  var url = map[view] || "index.html";
  if (view === ViewState.DETAIL && params && params.id) {
    url += "?id=" + encodeURIComponent(params.id);
  }
  if (view === ViewState.HOME && params && params.anchor === "activities") {
    url += "#activities";
  }
  saveUser();
  saveEvents();
  window.location.href = url;
}
function setView(view) {
  navigate(view);
}
function renderAuth() {
  var area = $("#auth-area");
  var mArea = $("#m-auth-area");
  area.empty();
  mArea.empty();
  if (currentUser) {
    area.append(
      '<div id="nav-avatar" class="rounded-circle" style="width:32px;height:32px;border:1px solid #666;display:flex;align-items:center;justify-content:center;background:#0D8ABC;color:#fff;font-weight:700">' +
        (currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "?") +
        "</div>",
    );
    mArea.append(
      '<button class="btn btn-dark rounded-3" id="m-go-profile">个人中心</button>',
    );
  } else {
    area.append(
      '<button class="btn btn-outline-light rounded-pill fw-bold" id="nav-login">登录</button><button class="btn btn-light rounded-pill fw-bold" id="nav-register">注册</button>',
    );
    mArea.append(
      '<button class="btn btn-outline-light rounded-pill" id="m-login">登录</button><button class="btn btn-light rounded-3" id="m-register">注册账户</button>',
    );
  }
  $("#nav-login,#m-login")
    .off()
    .on("click", function () {
      navigate(ViewState.LOGIN);
    });
  $("#nav-register,#m-register")
    .off()
    .on("click", function () {
      navigate(ViewState.REGISTER);
    });
  $("#nav-avatar")
    .off()
    .on("click", function () {
      navigate(ViewState.PROFILE);
    });
  $("#m-go-profile")
    .off()
    .on("click", function () {
      navigate(ViewState.PROFILE);
    });
}
function bindNav() {
  $(".nav-item")
    .off()
    .on("click", function () {
      var v = $(this).data("view");
      var anchor = $(this).data("anchor");
      if (anchor === "activities") {
        navigate(ViewState.HOME, { anchor: "activities" });
      } else {
        navigate(v);
      }
    });
  $("#footer-feedback")
    .off()
    .on("click", function () {
      navigate(ViewState.FEEDBACK);
    });
  $("#mobile-menu-btn")
    .off()
    .on("click", function () {
      $("#mobile-menu").toggleClass("d-none");
    });
  $("#btn-explore")
    .off()
    .on("click", function () {
      var el = document.getElementById("activities");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    });
}
function updateSearchInput() {
  var term = searchTerm.toLowerCase();
  var list = events
    .filter(function (e) {
      return (
        e.title.toLowerCase().indexOf(term) > -1 ||
        e.category.indexOf(term) > -1
      );
    })
    .slice(0, 5);
  var box = $("#search-suggest");
  box.empty();
  if (term && list.length) {
    list.forEach(function (ev) {
      var item = $('<div class="suggest-item"></div>');
      item.append(
        '<div style="width:32px;height:32px;border-radius:8px;overflow:hidden"><img src="' +
          ev.imageUrl +
          '" style="width:32px;height:32px;object-fit:cover"></div>',
      );
      item.append(
        '<div class="flex-grow-1"><div>' +
          ev.title +
          '</div><div class="text-secondary" style="font-size:12px">' +
          ev.date.split("T")[0] +
          "</div></div>",
      );
      item.on("click", function () {
        navigate(ViewState.DETAIL, { id: ev.id });
        $("#search-input").val("");
        searchTerm = "";
        box.addClass("d-none");
      });
      box.append(item);
    });
    box.removeClass("d-none");
  } else {
    box.addClass("d-none");
  }
}
function bindSearch() {
  var w = $("#search-wrapper");
  $(document).on("mousedown", function (e) {
    if (!w[0].contains(e.target)) {
      $("#search-suggest").addClass("d-none");
    }
  });
  $("#search-input").on("focus input", function () {
    searchTerm = $(this).val();
    updateSearchInput();
  });
  $("#m-search-input").on("input", function () {
    searchTerm = $(this).val();
    setTimeout(function () {
      navigate(ViewState.HOME);
    }, 0);
  });
}
function replaceBrand() {
  try {
    $("body *").each(function () {
      var h = $(this).html();
      if (h) {
        h = h.replace(/CampusVerse/g, "CampusHub").replace(/2024/g, "2025");
        $(this).html(h);
      }
      var ph = $(this).attr("placeholder");
      if (ph) {
        $(this).attr(
          "placeholder",
          ph.replace(/CampusVerse/g, "CampusHub").replace(/2024/g, "2025"),
        );
      }
    });
  } catch (e) {}
}
function renderHome() {
  var promos = [
    "assets/img/promo (1).jpg",
    "assets/img/promo (2).jpg",
    "assets/img/promo (3).jpg",
    "assets/img/promo (4).jpg",
    "assets/img/promo (5).jpg",
    "assets/img/promo (6).jpg",
  ];
  var track = $("#continuous-slider");
  track.empty();
  var display = promos.concat(promos).concat(promos);
  display.forEach(function (src) {
    var card = $('<div class="slider-card"></div>');
    card.append(
      '<div class="rounded-2xl shadow-soft" style="width:22rem;height:13rem;overflow:hidden"><img src="' +
        src +
        '" style="width:100%;height:100%;object-fit:cover"></div>',
    );
    track.append(card);
  });
  var cf = $("#category-filter");
  cf.empty();
  ["all", "academic", "arts", "sports", "social"].forEach(function (cat) {
    var txt =
      cat === "all"
        ? "全部"
        : cat === "academic"
          ? "学术"
          : cat === "arts"
            ? "艺术"
            : cat === "sports"
              ? "体育"
              : "社交";
    var active = filter === cat;
    var btn = $(
      '<button class="btn btn-pill ' +
        (active ? "btn-dark" : "btn-light") +
        '"></button>',
    );
    btn.text(txt);
    btn.on("click", function () {
      filter = cat;
      renderHome();
    });
    cf.append(btn);
  });
  var grid = $("#event-grid");
  grid.empty();
  var term = searchTerm.toLowerCase();
  var filtered = events.filter(function (e) {
    var m =
      e.title.toLowerCase().indexOf(term) > -1 ||
      e.description.toLowerCase().indexOf(term) > -1;
    var c = filter === "all" || e.category === filter;
    return m && c;
  });
  if (filtered.length === 0) {
    grid.append(
      '<div class="col-12"><div class="text-center text-secondary py-5">没有找到相关活动</div></div>',
    );
  } else {
    filtered.forEach(function (event) {
      var col = $('<div class="col-12 col-sm-6 col-lg-3"></div>');
      var card = $('<div class="card-evt"></div>');
      var imgWrap = $('<div class="card-evt-img"></div>');
      imgWrap.append('<img src="' + event.imageUrl + '">');
      imgWrap.append(
        '<div class="badge-cat">' + event.category.toUpperCase() + "</div>",
      );
      card.append(imgWrap);
      var body = $('<div class="p-3"></div>');
      body.append('<h6 class="fw-semibold mb-2">' + event.title + "</h6>");
      var date = new Date(event.date).toLocaleDateString();
      body.append(
        '<div class="evt-meta">' +
          date +
          '<span class="dot">•</span>' +
          event.location +
          '<span class="dot">•</span>' +
          event.attendees +
          " / " +
          event.maxAttendees +
          " 已报名</div>",
      );
      card.append(body);
      card.on("click", function () {
        navigate(ViewState.DETAIL, { id: event.id });
      });
      col.append(card);
      grid.append(col);
    });
  }
}
function renderDetail() {
  if (!selectedEvent) {
    var q = window.location.search;
    var m = /[?&]id=([^&]+)/.exec(q);
    if (m && m[1]) {
      var id = decodeURIComponent(m[1]);
      selectedEvent = events.find(function (e) {
        return e.id === id;
      });
    }
  }
  if (!selectedEvent) {
    navigate(ViewState.HOME);
    return;
  }
  var ev = selectedEvent;
  var wrap = $("#detail-container");
  wrap.empty();
  var hero = $('<div class="detail-hero"></div>');
  hero.append('<img src="' + ev.imageUrl + '" class="hero-bg">');
  hero.append('<div class="detail-overlay"></div>');
  var back = $(
    '<button class="btn btn-light btn-pill" style="position:absolute;top:2rem;left:2rem">返回列表</button>',
  );
  back.on("click", function () {
    navigate(ViewState.HOME);
  });
  hero.append(back);
  var bottom = $('<div class="detail-bottom"></div>');
  var cat = '<span class="badge bg-primary">' + ev.category + "</span>";
  var title = '<h1 class="text-white fw-bold">' + ev.title + "</h1>";
  var meta =
    '<div class="d-flex gap-3 text-white-50 fw-medium"><span>' +
    new Date(ev.date).toLocaleString() +
    "</span><span>" +
    ev.location +
    "</span></div>";
  bottom.append('<div class="container">' + cat + title + meta + "</div>");
  hero.append(bottom);
  wrap.append(hero);
  var main = $('<div class="container py-4"></div>');
  var row = $('<div class="row g-4"></div>');
  var colMain = $('<div class="col-lg-8"></div>');
  var intro = $("<div></div>");
  intro.append('<h4 class="fw-bold mb-3">活动介绍</h4>');
  intro.append('<p class="text-secondary">' + ev.description + "</p>");
  var gallery = $('<div class="row g-3 mt-2"></div>');
  gallery.append(
    '<div class="col-6"><img src="assets/img/gallery-' +
      ev.id +
      '-1.jpg" class="rounded-2xl" style="width:100%;height:12rem;object-fit:cover"></div>',
  );
  gallery.append(
    '<div class="col-6"><img src="assets/img/gallery-' +
      ev.id +
      '-2.jpg" class="rounded-2xl" style="width:100%;height:12rem;object-fit:cover"></div>',
  );
  intro.append(gallery);
  var comments = $('<div class="mt-4"></div>');
  comments.append('<h4 class="fw-bold mb-3">讨论区</h4>');
  if (ev.comments.length === 0) {
    comments.append(
      '<div class="text-center py-4 bg-light rounded-2xl">暂无评论，快来抢沙发！</div>',
    );
  } else {
    ev.comments.forEach(function (c) {
      var item = $('<div class="d-flex gap-2 mb-3"></div>');
      item.append(
        '<div class="rounded-circle" style="width:40px;height:40px;background:linear-gradient(135deg,#60a5fa,#a78bfa);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700">' +
          c.userName[0] +
          "</div>",
      );
      var bubble = $(
        '<div class="bg-light p-3 rounded-2xl" style="flex:1"></div>',
      );
      bubble.append(
        '<div class="d-flex justify-content之间 mb-1"><span class="fw-semibold">' +
          c.userName +
          '</span><span class="text-secondary" style="font-size:12px">' +
          c.date +
          "</span></div>",
      );
      bubble.append("<div>" + c.content + "</div>");
      item.append(bubble);
      comments.append(item);
    });
  }
  var form = $('<div class="mt-3"></div>');
  if (currentUser) {
    var ta = $(
      '<textarea class="form-control rounded-3" rows="3" placeholder="发表你的看法..."></textarea>',
    );
    var btn = $('<button class="btn btn-dark btn-pill mt-2">发送</button>');
    btn.on("click", function () {
      var v = ta.val();
      if (v && v.trim()) {
        var nc = {
          id: Date.now() + "",
          userId: currentUser.id,
          userName: currentUser.name,
          content: v.trim(),
          date: new Date().toLocaleDateString(),
        };
        events = events.map(function (e) {
          if (e.id === ev.id) {
            e.comments = e.comments.concat([nc]);
          }
          return e;
        });
        selectedEvent.comments = selectedEvent.comments.concat([nc]);
        saveEvents();
        renderDetail();
      }
    });
    form.append(ta).append(btn);
  } else {
    form.append('<div class="alert alert-primary">请登录后参与评论</div>');
  }
  comments.append(form);
  colMain.append(intro).append(comments);
  var colSide = $('<div class="col-lg-4"></div>');
  var card = $(
    '<div class="p-4 rounded-4 shadow-soft border" style="position:sticky;top:2rem"></div>',
  );
  var now = new Date();
  var diff = new Date(ev.date) - now;
  var leftText = "活动进行中或已结束";
  if (diff > 0) {
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((diff / 1000 / 60) % 60);
    leftText = days + "天 " + hours + "小时 " + minutes + "分钟";
  }
  card.append(
    '<div class="text-center mb-3 pb-3 border-bottom"><div class="text-secondary text-uppercase fw-bold" style="font-size:12px">距离活动开始</div><div class="text-primary fw-bold" style="font-family:monospace;font-size:20px">' +
      leftText +
      "</div></div>",
  );
  card.append(
    '<div class="d-flex justify内容-between mb-2"><span class="text-secondary">主办方</span><span class="fw-medium bg-light rounded-pill px-2">' +
      ev.organizer +
      "</span></div>",
  );
  card.append(
    '<div class="d-flex justify内容-between mb-2"><span class="text-secondary">热度</span><span class="fw-medium">🔥 ' +
      (ev.attendees * 15 + 200) +
      "</span></div>",
  );
  var percent = Math.min((ev.attendees / ev.maxAttendees) * 100, 100);
  card.append(
    '<div class="mb-3"><div class="d-flex justify内容-between text-secondary"><span>报名进度</span><span>' +
      ev.attendees +
      " / " +
      ev.maxAttendees +
      '</span></div><div class="progress-wrap"><div class="progress-bar-apple" style="width:' +
      percent +
      '%"></div></div></div>',
  );
  var isReg = currentUser
    ? ev.registeredUsers.indexOf(currentUser.id) > -1
    : false;
  var regBtn = $(
    '<button class="btn btn-pill w-100 mb-2 ' +
      (isReg ? "btn-success" : "btn-primary") +
      '">' +
      (isReg ? "已报名" : "立即报名") +
      "</button>",
  );
  regBtn.on("click", function () {
    if (!currentUser) {
      alert("请先登录");
      return;
    }
    events = events.map(function (e) {
      if (e.id === ev.id) {
        var idx = e.registeredUsers.indexOf(currentUser.id);
        if (idx > -1) {
          e.registeredUsers = e.registeredUsers.filter(function (i) {
            return i !== currentUser.id;
          });
          e.attendees = Math.max(0, e.attendees - 1);
        } else {
          e.registeredUsers = e.registeredUsers.concat([currentUser.id]);
          e.attendees = e.attendees + 1;
        }
      }
      return e;
    });
    selectedEvent = events.find(function (e) {
      return e.id === ev.id;
    });
    saveEvents();
    renderDetail();
  });
  var isFav = currentUser
    ? ev.favoritedUsers.indexOf(currentUser.id) > -1
    : false;
  var favBtn = $(
    '<button class="btn btn-outline-danger btn-pill w-50 me-2">' +
      (isFav ? "已收藏" : "收藏") +
      "</button>",
  );
  favBtn.on("click", function () {
    if (!currentUser) {
      alert("请先登录");
      return;
    }
    events = events.map(function (e) {
      if (e.id === ev.id) {
        var idx = e.favoritedUsers.indexOf(currentUser.id);
        if (idx > -1) {
          e.favoritedUsers = e.favoritedUsers.filter(function (i) {
            return i !== currentUser.id;
          });
        } else {
          e.favoritedUsers = e.favoritedUsers.concat([currentUser.id]);
        }
      }
      return e;
    });
    selectedEvent = events.find(function (e) {
      return e.id === ev.id;
    });
    saveEvents();
    renderDetail();
  });
  var shareBtn = $(
    '<button class="btn btn-outline-secondary btn-pill w-50">分享</button>',
  );
  shareBtn.on("click", function () {
    var url = window.location.href;
    if (navigator.share) {
      navigator
        .share({ title: ev.title, text: ev.description, url: url })
        .catch(function () {});
    } else {
      var shareBox =
        '<div class="text-break small p-2 bg-light rounded-2">' +
        url +
        "</div>";
      var modal = $(
        '<div class="modal-dark position-fixed start-0 top-0 end-0 bottom-0 d-flex align-items-center justify内容-center" style="z-index:1050"></div>',
      );
      var inner = $(
        '<div class="bg-white p-4 rounded-4 text-center" style="max-width:380px;width:100%"></div>',
      );
      inner.append('<h5 class="fw-bold mb-3">分享活动</h5>');
      inner.append(shareBox);
      inner.append(
        '<button class="btn btn-primary btn-pill mt-2" id="copy-link-btn">复制链接</button>',
      );
      inner.append(
        '<div class="text-secondary small mt-2">扫码分享给好友</div>',
      );
      inner.append('<button class="btn btn-light mt-3">关闭</button>');
      inner.find("#copy-link-btn").on("click", function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).catch(function () {});
        }
      });
      inner.find("button").on("click", function () {
        modal.remove();
      });
      modal.append(inner);
      $("body").append(modal);
    }
  });
  var icsBtn = $(
    '<button class="btn btn-link w-100">添加到日历 (ICS)</button>',
  );
  icsBtn.on("click", function () {
    var start = new Date(ev.date);
    var end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    function fmt(d) {
      return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    }
    var ics =
      "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//CampusHub//Event//CN\nBEGIN:VEVENT\nUID:" +
      ev.id +
      "@campushub.com\nDTSTAMP:" +
      fmt(new Date()) +
      "\nDTSTART:" +
      fmt(start) +
      "\nDTEND:" +
      fmt(end) +
      "\nSUMMARY:" +
      ev.title +
      "\nDESCRIPTION:" +
      ev.description +
      "\nLOCATION:" +
      ev.location +
      "\nEND:VEVENT\nEND:VCALENDAR";
    var blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = ev.title + ".ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
  card.append(regBtn);
  var actions = $('<div class="d-flex"></div>');
  actions.append(favBtn).append(shareBtn);
  card.append(actions);
  card.append(icsBtn);
  colSide.append(card);
  row.append(colMain).append(colSide);
  main.append(row);
  wrap.append(main);
}
function renderPublish() {
  var wrap = $("#publish-form-wrap");
  wrap.empty();
  var title =
    '<h1 class="fw-bold">发布活动</h1><p class="text-muted">填写活动详情，我们将协助您推广给全校师生。</p>';
  wrap.append(title);
  var form = $('<form class="mt-3"></form>');
  form.append(
    '<label class="form-label fw-bold">活动标题</label><input required type="text" name="title" class="form-control form-control-lg rounded-3 mb-3" placeholder="例如：2024 秋季校园黑客松">',
  );
  var grid = $('<div class="row g-3"></div>');
  grid.append(
    '<div class="col-md-6"><label class="form-label fw-bold">时间</label><input required type="datetime-local" name="date" class="form-control rounded-3"></div>',
  );
  grid.append(
    '<div class="col-md-6"><label class="form-label fw-bold">地点</label><input required type="text" name="location" class="form-control rounded-3" placeholder="例如：科技楼 A101"></div>',
  );
  var grid2 = $('<div class="row g-3 mt-1"></div>');
  grid2.append(
    '<div class="col-md-6"><label class="form-label fw-bold">活动类型</label><select name="category" class="form-select rounded-3"><option value="academic">学术讲座</option><option value="sports">体育赛事</option><option value="arts">文艺演出</option><option value="social">社交聚会</option></select></div>',
  );
  grid2.append(
    '<div class="col-md-6"><label class="form-label fw-bold">最大人数</label><input required type="number" name="maxAttendees" class="form-control rounded-3" value="50"></div>',
  );
  var descWrap = $('<div class="mt-2"></div>');
  descWrap.append('<label class="form-label fw-bold mb-0">活动详情</label>');
  descWrap.append(
    '<textarea required name="description" rows="8" class="form-control rounded-3" placeholder="请描述活动的具体流程、嘉宾介绍及参与须知..."></textarea>',
  );
  var org = $('<div class="mt-2"></div>');
  org.append(
    '<label class="form-label fw-bold">主办方</label><input required type="text" name="organizer" class="form-control rounded-3" placeholder="例如：校学生会">',
  );
  var actions = $('<div class="pt-3 border-top d-flex gap-2"></div>');
  var cancel = $(
    '<button type="button" class="btn btn-light rounded-pill">取消</button>',
  );
  var submit = $(
    '<button type="submit" class="btn btn-primary rounded-pill flex-grow-1">立即发布</button>',
  );
  actions.append(cancel).append(submit);
  form.append(grid).append(grid2).append(descWrap).append(org).append(actions);
  wrap.append(form);
  $("#publish-back")
    .off()
    .on("click", function () {
      setView(ViewState.HOME);
    });
  form.on("submit", function (e) {
    e.preventDefault();
    var fd = {
      title: $("input[name=title]").val(),
      location: $("input[name=location]").val(),
      date: $("input[name=date]").val(),
      category: $("select[name=category]").val(),
      description: $("textarea[name=description]").val(),
      organizer: $("input[name=organizer]").val(),
      maxAttendees: parseInt($("input[name=maxAttendees]").val(), 10) || 50,
    };
    var newEvent = {
      id: Date.now() + "",
      title: fd.title,
      description: fd.description,
      date: fd.date,
      location: fd.location,
      category: fd.category,
      imageUrl:
        "assets/img/event-" + (Math.floor(Math.random() * 12) + 1) + ".jpg",
      organizer: fd.organizer,
      attendees: 0,
      maxAttendees: fd.maxAttendees,
      comments: [],
      registeredUsers: [],
      favoritedUsers: [],
    };
    events = [newEvent].concat(events);
    setView(ViewState.HOME);
  });
}
function renderStats() {
  var container = $("#metric-cards");
  container.empty();
  var totalAtt = events.reduce(function (a, c) {
    return a + c.attendees;
  }, 0);
  function mostCat() {
    var acc = {};
    events.forEach(function (e) {
      acc[e.category] = (acc[e.category] || 0) + 1;
    });
    var keys = Object.keys(acc);
    if (!keys.length) return "无";
    keys.sort(function (a, b) {
      return acc[b] - acc[a];
    });
    var m = keys[0];
    return m === "academic"
      ? "学术"
      : m === "sports"
        ? "体育"
        : m === "arts"
          ? "艺术"
          : "社交";
  }
  var cards = [
    { title: "活动总量", value: events.length, accent: "primary" },
    { title: "总参与", value: totalAtt, accent: "success" },
    { title: "热门类型", value: mostCat(), accent: "purple" },
    { title: "本月新增", value: "+8", accent: "warning" },
  ];
  cards.forEach(function (c) {
    var col = $('<div class="col-12 col-md-6 col-lg-3"></div>');
    var card = $('<div class="bg-white p-4 rounded-4 shadow-sm h-100"></div>');
    card.append(
      '<div class="text-secondary text-uppercase fw-bold" style="font-size:12px">' +
        c.title +
        "</div>",
    );
    card.append('<div class="fs-3 fw-bold">' + c.value + "</div>");
    col.append(card);
    container.append(col);
  });
  var catCount = {};
  events.forEach(function (e) {
    catCount[e.category] = (catCount[e.category] || 0) + 1;
  });
  var pieData = Object.keys(catCount).map(function (k) {
    return {
      value: catCount[k],
      name:
        k === "academic"
          ? "学术"
          : k === "sports"
            ? "体育"
            : k === "arts"
              ? "艺术"
              : "社交",
    };
  });
  var pie = echarts.init(document.getElementById("echarts-pie"));
  pie.setOption({
    tooltip: { trigger: "item" },
    legend: { bottom: "5%", left: "center" },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        label: { show: false },
        labelLine: { show: false },
        data: pieData,
        color: ["#0071e3", "#34c759", "#ff9500", "#af52de"],
      },
    ],
  });
  var line = echarts.init(document.getElementById("echarts-line"));
  line.setOption({
    tooltip: {},
    xAxis: { type: "category", data: ["9月", "10月", "11月", "12月", "1月"] },
    yAxis: { type: "value" },
    series: [
      {
        type: "line",
        data: [120, 280, 450, 520, 180],
        smooth: true,
        lineStyle: { width: 3, color: "#0071e3" },
        itemStyle: { color: "#0071e3" },
      },
    ],
  });
  var barData = []
    .concat(events)
    .sort(function (a, b) {
      return b.attendees - a.attendees;
    })
    .slice(0, 5)
    .map(function (e) {
      return {
        name: e.title.length > 6 ? e.title.substring(0, 6) + "..." : e.title,
        value: e.attendees,
      };
    });
  var bar = echarts.init(document.getElementById("echarts-bar"));
  bar.setOption({
    tooltip: {},
    xAxis: {
      type: "category",
      data: barData.map(function (d) {
        return d.name;
      }),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: barData.map(function (d) {
          return d.value;
        }),
        itemStyle: { color: "#34c759" },
      },
    ],
  });
  var radar = echarts.init(document.getElementById("echarts-radar"));
  radar.setOption({
    tooltip: {},
    radar: {
      indicator: [
        { name: "学术", max: 150 },
        { name: "艺术", max: 150 },
        { name: "体育", max: 150 },
        { name: "社交", max: 150 },
        { name: "公益", max: 150 },
        { name: "创新", max: 150 },
      ],
    },
    series: [
      {
        type: "radar",
        data: [{ value: [120, 98, 86, 99, 85, 65], name: "活力指数" }],
        itemStyle: { color: "#ff9500" },
        lineStyle: { color: "#ff9500" },
        areaStyle: { color: "rgba(255,149,0,.3)" },
      },
    ],
  });
  window.addEventListener("resize", function () {
    pie.resize();
    line.resize();
    bar.resize();
    radar.resize();
  });
}
function renderLogin() {
  var wrap = $("#login-form-wrap");
  wrap.empty();
  var box = $('<div class="mx-auto" style="max-width:480px"></div>');
  box.append(
    '<h1 class="fw-bold">欢迎回来</h1><p class="text-muted">请输入您的账号信息以继续。</p>',
  );
  var form = $("<form></form>");
  form.append(
    '<label class="form-label fw-semibold">学号 / 邮箱</label><input type="text" class="form-control rounded-3 mb-2" placeholder="请输入您的学号" required>',
  );
  form.append(
    '<div class="d-flex justify-content-between align-items-center"><label class="form-label fw-semibold mb-0">密码</label><a href="#" class="small text-primary">忘记密码?</a></div><input type="password" class="form-control rounded-3 mb-3" placeholder="••••••••" required>',
  );
  var btn = $(
    '<button type="submit" class="btn btn-primary rounded-pill w-100">登录</button>',
  );
  form.append(btn);
  box.append(form);
  box.append(
    '<div class="mt-3 text-center text-muted">还没有账号? <button class="btn btn-link p-0" id="to-register">立即注册</button></div>',
  );
  wrap.append(box);
  $("#to-register").on("click", function () {
    setView(ViewState.REGISTER);
  });
  form.on("submit", function (e) {
    e.preventDefault();
    currentUser = {
      id: "user_123",
      name: "梁升富",
      email: "LiangShengFu_2023152006@university.edu",
      avatar: "assets/img/avatar.jpg",
      role: "student",
    };
    setView(ViewState.HOME);
    renderAuth();
  });
}
function renderRegister() {
  var wrap = $("#register-form-wrap");
  wrap.empty();
  var box = $('<div class="mx-auto" style="max-width:520px"></div>');
  box.append(
    '<h1 class="fw-bold">创建账户</h1><p class="text-muted">填写以下信息以完成注册。</p>',
  );
  var form = $("<form></form>");
  var row = $('<div class="row g-3"></div>');
  row.append(
    '<div class="col-md-6"><label class="form-label fw-semibold">姓名</label><input type="text" class="form-control rounded-3" placeholder="张三"></div>',
  );
  row.append(
    '<div class="col-md-6"><label class="form-label fw-semibold">学号</label><input type="text" class="form-control rounded-3" placeholder="10位学号"></div>',
  );
  form.append(row);
  form.append(
    '<label class="form-label fw-semibold">校园邮箱</label><input type="email" class="form-control rounded-3 mb-2" placeholder="name@university.edu">',
  );
  form.append(
    '<label class="form-label fw-semibold">设置密码</label><input type="password" class="form-control rounded-3 mb-3" placeholder="至少8位字符">',
  );
  form.append(
    '<button type="submit" class="btn btn-dark rounded-pill w-100">立即注册</button>',
  );
  box.append(form);
  box.append(
    '<div class="mt-3 text-center text-muted">已有账号? <button class="btn btn-link p-0" id="to-login">直接登录</button></div>',
  );
  wrap.append(box);
  $("#to-login").on("click", function () {
    setView(ViewState.LOGIN);
  });
  form.on("submit", function (e) {
    e.preventDefault();
    currentUser = {
      id: "user_123",
      name: "梁升富",
      email: "LiangShengFu_2023152006@university.edu",
      avatar: "assets/img/avatar.jpg",
      role: "student",
    };
    setView(ViewState.HOME);
    renderAuth();
  });
}
function renderProfile() {
  if (!currentUser) {
    renderGuestProfile();
    return;
  }
  var wrap = $("#profile-wrap");
  wrap.empty();
  var cover = $(
    '<div class="position-relative" style="height:260px;overflow:hidden"></div>',
  );
  cover.append(
    '<img src="assets/img/hero-bg.jpg" style="width:100%;height:100%;object-fit:cover">',
  );
  cover.append(
    '<div class="position-absolute" style="inset:0;background:linear-gradient(to top,rgba(0,0,0,.6),transparent)"></div>',
  );
  wrap.append(cover);
  var info = $(
    '<div class="container position-relative" style="margin-top:-64px"></div>',
  );
  var row = $('<div class="d-flex align-items-end gap-3"></div>');
  row.append(
    '<img src="' +
      currentUser.avatar +
      '" class="rounded-circle border" style="width:120px;height:120px;border:6px solid #fff">',
  );
  var right = $(
    '<div class="d-flex justify-content-between flex-grow-1 align-items-end"></div>',
  );
  var nameBlock = $("<div></div>");
  nameBlock.append(
    '<h2 class="fw-bold" style="color:gray">' + currentUser.name + "</h2>",
  );
  nameBlock.append(
    '<div class="text-muted">@' +
      currentUser.email.split("@")[0] +
      " • 计算机科学学院</div>",
  );
  nameBlock.append(
    '<div class="text-secondary" style="max-width:560px">热爱编程与设计的全栈开发者。喜欢参与黑客马拉松和各类创意市集。CampusVerse 早期核心贡献者。</div>',
  );
  var actions = $('<div class="d-flex gap-2"></div>');
  var edit = $('<button class="btn btn-dark btn-pill">编辑资料</button>');
  var share = $('<button class="btn btn-light btn-pill">分享</button>');
  var logout = $(
    '<button class="btn btn-outline-danger btn-pill">退出登录</button>',
  );
  logout.on("click", function () {
    currentUser = null;
    saveUser();
    navigate(ViewState.HOME);
    renderAuth();
  });
  actions.append(edit).append(share).append(logout);
  right.append(nameBlock).append(actions);
  row.append(right);
  info.append(row);
  wrap.append(info);
  var statWrap = $('<div class="container border-bottom py-3 mb-3"></div>');
  var myEvents = events.filter(function (e) {
    return currentUser && e.registeredUsers.indexOf(currentUser.id) > -1;
  });
  var myFavs = events.filter(function (e) {
    return currentUser && e.favoritedUsers.indexOf(currentUser.id) > -1;
  });
  statWrap.append(
    '<div class="d-flex gap-4"><div><div class="fs-4 fw-bold">' +
      myEvents.length +
      '</div><div class="text-secondary small">参与活动</div></div><div><div class="fs-4 fw-bold">' +
      myFavs.length +
      '</div><div class="text-secondary small">收藏活动</div></div><div><div class="fs-4 fw-bold">980</div><div class="text-secondary small">社区声望</div></div></div>',
  );
  wrap.append(statWrap);
  var tabs = $('<div class="container d-flex gap-4 border-bottom"></div>');
  var t1 = $(
    '<button class="btn btn-link fw-bold">我的活动 (' +
      myEvents.length +
      ")</button>",
  );
  var t2 = $(
    '<button class="btn btn-link fw-bold">收藏 (' +
      myFavs.length +
      ")</button>",
  );
  var t3 = $('<button class="btn btn-link fw-bold">动态与评论</button>');
  var t4 = $('<button class="btn btn-link fw-bold">荣誉徽章</button>');
  tabs.append(t1).append(t2).append(t3).append(t4);
  wrap.append(tabs);
  var content = $('<div class="container py-3" id="profile-content"></div>');
  wrap.append(content);
  function showAct() {
    content.empty();
    if (myEvents.length) {
      var row = $('<div class="row g-3"></div>');
      myEvents.forEach(function (ev) {
        var col = $('<div class="col-md-4"></div>');
        var card = $('<div class="card-evt"></div>');
        card.append(
          '<div class="card-evt-img"><img src="' +
            ev.imageUrl +
            '"><div class="badge-cat">已报名</div></div>',
        );
        card.append(
          '<div class="p-3"><div class="fw-bold">' +
            ev.title +
            '</div><div class="text-secondary" style="font-size:12px">' +
            new Date(ev.date).toLocaleDateString() +
            " • " +
            ev.location +
            "</div></div>",
        );
        card.on("click", function () {
          selectedEvent = ev;
          navigate(ViewState.DETAIL, { id: ev.id });
        });
        col.append(card);
        row.append(col);
      });
      content.append(row);
    } else {
      content.append(
        '<div class="text-center text-secondary py-4 bg-light rounded-2xl">你还没有报名任何活动。</div>',
      );
    }
  }
  function showFav() {
    content.empty();
    if (myFavs.length) {
      var row = $('<div class="row g-3"></div>');
      myFavs.forEach(function (ev) {
        var col = $('<div class="col-md-4"></div>');
        var card = $('<div class="card-evt"></div>');
        card.append(
          '<div class="card-evt-img"><img src="' +
            ev.imageUrl +
            '"><div class="badge-cat">❤</div></div>',
        );
        card.append(
          '<div class="p-3"><div class="fw-bold">' +
            ev.title +
            '</div><div class="text-secondary" style="font-size:12px">' +
            new Date(ev.date).toLocaleDateString() +
            " • " +
            ev.location +
            "</div></div>",
        );
        card.on("click", function () {
          selectedEvent = ev;
          setView(ViewState.DETAIL);
        });
        col.append(card);
        row.append(col);
      });
      content.append(row);
    } else {
      content.append(
        '<div class="text-center text-secondary py-4 bg-light rounded-2xl">你还没有收藏任何活动。</div>',
      );
    }
  }
  function showMoments() {
    content.empty();
    var list = $(
      '<div class="d-flex flex-column gap-3" style="max-width:760px"></div>',
    );
    [1, 2].forEach(function (i) {
      var item = $('<div class="d-flex gap-2 p-3 bg-light rounded-2xl"></div>');
      item.append(
        '<img src="' +
          currentUser.avatar +
          '" class="rounded-circle border" style="width:40px;height:40px">',
      );
      var text = $("<div></div>");
      text.append(
        '<div class="d-flex align-items-center gap-2 mb-1"><span class="fw-bold">' +
          currentUser.name +
          '</span><span class="text-secondary small">2天前</span></div>',
      );
      text.append(
        "<div>这次的活动组织得非常棒，特别是最后的嘉宾分享环节，受益匪浅！希望下次能增加更多的互动时间。</div>",
      );
      text.append(
        '<div class="text-secondary small border rounded-pill px-2 py-1 mt-2 d-inline-block"># 2025 秋季创新论坛</div>',
      );
      item.append(text);
      list.append(item);
    });
    content.append(list);
  }
  function showBadges() {
    content.empty();
    var row = $('<div class="row g-3"></div>');
    var badges = [
      { icon: "🌟", name: "早期用户", desc: "注册超过1年" },
      { icon: "🔥", name: "活动达人", desc: "单月参与5场活动" },
      { icon: "🎓", name: "学术之星", desc: "参与10场学术讲座" },
      { icon: "📸", name: "记录者", desc: "发布了20条评论" },
    ];
    badges.forEach(function (b) {
      var col = $('<div class="col-6 col-md-3"></div>');
      var card = $(
        '<div class="p-3 rounded-2xl border text-center bg-light"></div>',
      );
      card.append('<div style="font-size:40px">' + b.icon + "</div>");
      card.append('<div class="fw-bold">' + b.name + "</div>");
      card.append('<div class="text-secondary small">' + b.desc + "</div>");
      col.append(card);
      row.append(col);
    });
    row.append(
      '<div class="col-6 col-md-3"><div class="border border-dashed p-3 rounded-2xl text-center text-secondary"><div class="rounded-circle bg-light" style="width:48px;height:48px;margin:0 auto 6px;display:flex;align-items:center;justify-content:center">?</div><div class="small">更多成就待解锁</div></div></div>',
    );
    content.append(row);
  }
  t1.on("click", showAct);
  t2.on("click", showFav);
  t3.on("click", showMoments);
  t4.on("click", showBadges);
  showAct();
}
function renderGuestProfile() {
  var wrap = $("#profile-wrap");
  wrap.empty();
  var hero = $('<div class="py-5 text-center"></div>');
  hero.append(
    '<h1 class="fw-bold" style="font-size:3rem">你的校园生活，<br><span class="text-apple-blue">由此开启。</span></h1>',
  );
  hero.append(
    '<p class="text-secondary" style="max-width:56ch;margin:0 auto">登录 CampusVerse 个人中心，管理你的活动日程，追踪志愿工时，展示你的校园成就。</p>',
  );
  var actions = $(
    '<div class="d-flex justify-content-center gap-2 mt-3"></div>',
  );
  actions.append(
    '<button class="btn btn-dark btn-pill" id="gp-login">登录账户</button>',
  );
  actions.append(
    '<button class="btn btn-light btn-pill" id="gp-register">注册新用户</button>',
  );
  hero.append(actions);
  wrap.append(hero);
  $("#gp-login").on("click", function () {
    setView(ViewState.LOGIN);
  });
  $("#gp-register").on("click", function () {
    setView(ViewState.REGISTER);
  });
  var features = $('<div class="bg-apple-gray py-5"></div>');
  var container = $('<div class="container"></div>');
  var row = $('<div class="row g-3"></div>');
  function feature(icon, color, title, desc) {
    var col = $('<div class="col-md-4"></div>');
    var card = $('<div class="text-center"></div>');
    card.append(
      '<div class="rounded-2xl shadow-sm bg-white d-inline-flex align-items-center justify-content-center" style="width:64px;height:64px;color:' +
        color +
        '">' +
        icon +
        "</div>",
    );
    card.append('<h5 class="fw-bold mt-3">' + title + "</h5>");
    card.append('<div class="text-secondary">' + desc + "</div>");
    col.append(card);
    row.append(col);
  }
  feature(
    "📈",
    "#0d6efd",
    "活动追踪",
    "一站式管理所有已报名活动。自动同步日历，不再错过任何精彩瞬间。",
  );
  feature(
    "🛡️",
    "#198754",
    "权益保障",
    "实名认证系统确保活动真实可靠。官方背书，保障每一位参与者的权益。",
  );
  feature(
    "🏆",
    "#6f42c1",
    "成就徽章",
    "记录你的每一次参与。积累志愿时长，解锁专属校园成就徽章。",
  );
  container.append(row);
  features.append(container);
  wrap.append(features);
}
function renderFeedback() {
  var wrap = $("#feedback-form-wrap");
  wrap.empty();
  var card = $(
    '<div class="bg-white rounded-2xl shadow-soft p-4 p-md-5 animate-fade-in"></div>',
  );
  var form = $("<form></form>");
  var types = ["功能建议", "Bug 报告", "活动投诉", "其他"];
  var field = $('<div class="mb-3"></div>');
  field.append('<label class="form-label fw-semibold">反馈类型</label>');
  var group = $('<div class="row g-2"></div>');
  types.forEach(function (t, i) {
    var col = $('<div class="col-6 col-md-3"></div>');
    var label = $('<label class="seg-item w-100"></label>');
    var input = $(
      '<input type="radio" name="fb-type" class="seg-input" value="' + t + '">',
    );
    if (i === 0) {
      input.attr("checked", true);
    }
    var seg = $('<div class="seg-card">' + t + "</div>");
    label.append(input).append(seg);
    col.append(label);
    group.append(col);
  });
  field.append(group);
  form.append(field);
  form.append(
    '<label class="form-label fw-semibold">标题</label><input type="text" class="input-soft mb-3" placeholder="简要描述您的问题">',
  );
  form.append(
    '<label class="form-label fw-semibold">详细描述</label><textarea rows="6" class="textarea-soft mb-3" placeholder="请详细描述您遇到的情况或建议..."></textarea>',
  );
  form.append(
    '<label class="form-label fw-semibold">联系方式 <span class="text-secondary">(选填)</span></label><input type="text" class="input-soft mb-4" placeholder="邮箱或电话，方便我们联系您">',
  );
  form.append(
    '<button class="w-100 py-3 btn btn-apple btn-pill shadow-soft">提交反馈</button><div class="text-center text-secondary small mt-2">我们通常会在 24 小时内阅读并处理您的反馈。</div>',
  );
  card.append(form);
  wrap.append(card);
}
function renderCalendar() {
  var wrap = $("#calendar-wrap");
  wrap.empty();
  var now = window.__calDate || new Date();
  var y = now.getFullYear();
  var m = now.getMonth();
  var header = $(
    '<div class="d-flex justify-content-between align-items-center mb-3"></div>',
  );
  header.append(
    '<div><h2 class="fw-bold">活动日历</h2><div class="text-secondary">规划您的校园生活日程。</div></div>',
  );
  var nav = $(
    '<div class="d-flex align-items-center gap-2 bg-white rounded-pill px-3 py-2 border"></div>',
  );
  var prev = $('<button class="btn btn-light btn-pill">‹</button>');
  var title = $('<div class="fw-bold">' + y + "年 " + (m + 1) + "月</div>");
  var next = $('<button class="btn btn-light btn-pill">›</button>');
  nav.append(prev).append(title).append(next);
  header.append(nav);
  wrap.append(header);
  prev.on("click", function () {
    window.__calDate = new Date(y, m - 1, 1);
    renderCalendar();
  });
  next.on("click", function () {
    window.__calDate = new Date(y, m + 1, 1);
    renderCalendar();
  });
  var grid = $('<div class="bg-white rounded-4 border overflow-hidden"></div>');
  var daysHeader = $(
    '<div class="calendar-grid border-bottom bg-light"></div>',
  );
  ["日", "一", "二", "三", "四", "五", "六"].forEach(function (d) {
    daysHeader.append(
      '<div class="py-2 text-center text-secondary fw-bold">' + d + "</div>",
    );
  });
  grid.append(daysHeader);
  var body = $('<div class="calendar-grid" style="height:70vh"></div>');
  var daysInMonth = new Date(y, m + 1, 0).getDate();
  var firstDay = new Date(y, m, 1).getDay();
  for (var i = 0; i < firstDay; i++) {
    body.append('<div class="calendar-cell bg-light"></div>');
  }
  for (var d = 1; d <= daysInMonth; d++) {
    var cell = $('<div class="calendar-cell"></div>');
    var today = new Date();
    var isToday =
      d === today.getDate() &&
      m === today.getMonth() &&
      y === today.getFullYear();
    cell.append(
      '<div class="d-flex justify-content-between"><div class="calendar-day ' +
        (isToday ? "bg-primary text-white" : "") +
        '">' +
        d +
        "</div></div>",
    );
    var list = $("<div></div>");
    var dayEvents = events.filter(function (e) {
      var de = new Date(e.date);
      return (
        de.getDate() === d && de.getMonth() === m && de.getFullYear() === y
      );
    });
    dayEvents.forEach(function (ev) {
      var item = $('<div class="calendar-event"></div>');
      item.append(
        '<div class="fw-bold" style="font-size:12px">' + ev.title + "</div>",
      );
      item.append(
        '<div class="text-secondary" style="font-size:10px">' +
          new Date(ev.date).getHours() +
          ":00</div>",
      );
      item.on("click", function (e) {
        e.stopPropagation();
        selectedEvent = ev;
        setView(ViewState.DETAIL);
      });
      list.append(item);
    });
    cell.append(list);
    body.append(cell);
  }
  grid.append(body);
  wrap.append(grid);
}
function fixPublishPlaceholder() {
  var input = $("#publish-form-wrap input[name=title]");
  if (input.length) {
    input.attr("placeholder", "例如：2025 秋季校园黑客松");
  }
}
function fixBrandTexts() {
  $("#profile-wrap .text-secondary").each(function () {
    var t = $(this).html();
    if (t && t.indexOf("CampusVerse") > -1) {
      $(this).html(t.replace(/CampusVerse/g, "CampusHub"));
    }
  });
  fixProfileAvatar();
  var tabs = $("#profile-wrap .container.d-flex.gap-4.border-bottom button");
  if (tabs.length >= 3) {
    tabs
      .eq(2)
      .off("click.fix")
      .on("click.fix", function () {
        setTimeout(fixMomentsAvatars, 0);
      });
  }
}
function fixProfileAvatar() {
  if (!currentUser) return;
  var img = $("#profile-wrap img.rounded-circle.border").first();
  if (img.length) {
    var letter = currentUser.name
      ? currentUser.name.charAt(0).toUpperCase()
      : "?";
    var el = $('<div class="rounded-circle border"></div>');
    el.attr(
      "style",
      "width:120px;height:120px;border:6px solid #fff;display:flex;align-items:center;justify-content:center;background:#0D8ABC;color:#fff;font-size:48px;font-weight:800",
    );
    el.text(letter);
    img.replaceWith(el);
  }
}
function fixMomentsAvatars() {
  if (!currentUser) return;
  $("#profile-content img.rounded-circle.border").each(function () {
    var letter = currentUser.name
      ? currentUser.name.charAt(0).toUpperCase()
      : "?";
    var el = $('<div class="rounded-circle border"></div>');
    el.attr(
      "style",
      "width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:#0D8ABC;color:#fff;font-weight:700",
    );
    el.text(letter);
    $(this).replaceWith(el);
  });
}
function init() {
  loadState();
  bindNav();
  renderAuth();
  bindSearch();
  var page = $("body").data("page") || "HOME";
  if (page === ViewState.HOME) {
    renderHome();
  } else if (page === ViewState.DETAIL) {
    renderDetail();
  } else if (page === ViewState.PUBLISH) {
    renderPublish();
    fixPublishPlaceholder();
  } else if (page === ViewState.STATS) {
    renderStats();
  } else if (page === ViewState.LOGIN) {
    renderLogin();
  } else if (page === ViewState.REGISTER) {
    renderRegister();
  } else if (page === ViewState.PROFILE) {
    renderProfile();
    fixBrandTexts();
  } else if (page === ViewState.FEEDBACK) {
    renderFeedback();
  } else if (page === ViewState.CALENDAR) {
    renderCalendar();
  }
}
$(init);
