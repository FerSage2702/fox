
const ranks = [
  {
    name: "Keykon",
    sub: "ПЕРВАЯ СТУПЕНЬ · ЗНАКОМСТВО С ОТРЯДОМ",
    tasks: [
      "Создать из магии крови свой клинок.",
      "Пройти обучение клановому МК."
    ]
  },
  {
    name: "Hofuma",
    sub: "СОЗДАНИЕ СОБСТВЕННОГО ОБРАЗА",
    tasks: [
      "Добыть шерсть, применить магию крови и создать собственный хвост.",
      "Истребить 10 истребителей демонов",
      "Подчинить одну территорию на карте."
    ]
  },
  {
    name: "Chisuma",
    sub: "ИДЕОЛОГИЯ И КЛАНОВАЯ ПОДГОТОВКА",
    groups: [
      {
        label: "ОБЯЗАТЕЛЬНО",
        tasks: [
          "Пройти обучение оружию клана и его идеологии."
        ]
      },
      {
        label: "ВЫБЕРИ ОДИН ВАРИАНТ",
        options: [
          [
            "Помочь одному из поглощённых кланов внутри своего Великого клана."
          ],
          [
            "Принять участие в любых двух тренировках."
          ]
        ]
      }
    ]
  },
  {
    name: "Chikuma",
    sub: "СЛУЖЕНИЕ И РАЗВИТИЕ ОТРЯДА",
    tasks: [
      "Истребить 15 истребителей демонов.",
      "Выполнить поручение Смотрящей Низшей Луны.",
      "Как-либо помочь Великому клану",
      "Принять участие в демоническом событии: ивенте, тренировке или межфракционном мероприятии."
    ]
  },
  {
    name: "Asakuma",
    sub: "ПРОВЕРКА СИЛЫ И ВНУТРЕННЕГО ЕДИНСТВА",
    tasks: [
      "Вызвать и нанести 300 HP КМД отряда.",
      "Принять участие в совершенствовании навыков внутри отряда: внутренний сбор, тренировка или внутреннее RP.",
      "Захватить 3 точки."
    ]
  },
  {
    name: "Hobura",
    sub: "ИСПЫТАНИЕ ПЕРЕД СТАРШИМИ",
    tasks: [
      "Выполнить личное задание Высшей Луны клана.",
      "Истребить 20 истребителей демонов."
    ],
    groups: [
      {
        label: "ВЫБЕРИ ОДИН ВАРИАНТ",
        options: [
          [
            "Нанести 400 урона Низшей Смотрящей Луне."
          ],
          [
            "Выполнить два поручения Низших Лун."
          ]
        ]
      },
      {
        label: "ДОПОЛНИТЕЛЬНОЕ УСЛОВИЕ",
        tasks: [
          "Получить одобрение Низшей Луны для перехода на следующий ранг."
        ]
      }
    ]
  },
  {
    name: "Shateigashira",
    sub: "ТАКТИКА И ДИВЕРСИОННАЯ РАБОТА",
    tasks: [
      "Устроить диверсию как минимум в нескольких зонах — не менее 20 RP-действий в каждой.",
      "Вызвать Смотрящую Высшую Луну и нанести ей 300 HP.",
      "Принять участие в глобальном мероприятии."
    ]
  },
  {
    name: "Wakagashira",
    sub: "ПРИЗНАНИЕ СИЛЫ И АВТОРИТЕТА",
    tasks: [
      "Выстоять против Высшей Луны в бою не менее 1 минуты.",
      "Получить одобрение Высшей Луны на переход на следующий ранг.",
      "Продемонстрировать навыки и знания Смотрящей Низшей Луне и КМД.",
      "Выполнить разные поручения от 3 Высших Лун.",
      "Поучаствовать в 3 мероприятиях демонов."
    ]
  },
  {
    name: "Tsukomon",
    sub: "ВЕРШИНА ОТРЯДНОЙ ВЫУЧКИ",
    tasks: [
      "Истребить 25 истребителей демонов.",
      "Получить одобрение на повышение от КМД, Низшей и Высшей Смотрящих Лун.",
      "Истребить 3 столпов",
      "Захватить 10 точек."
    ],
    groups: [
      {
        label: "ВЫБЕРИ ОДИН ВАРИАНТ",
        options: [
          ["Принять участие в мероприятии отряда."],
          ["Выполнить поручение от Смотрящей Высшей Луны."],
          ["Провести RP-файт с истребителем."]
        ]
      }
    ]
  },
  {
    name: "Shiko",
    sub: "ПОСЛЕДНИЙ ШАГ · РАЗРЕШЕНИЕ МУДЗАНА",
    tasks: [
      "Вежливо попросить разрешение на Битву Крови Мудзана."
    ]
  }
];

const list = document.getElementById('rank-list');

const storageKey = 'foxSquadPromotionProgressV1';

let checked = {};

try {
  checked = JSON.parse(localStorage.getItem(storageKey) || '{}');
} catch {
  checked = {};
}

function taskId(rankIndex, path) {
  return `${rankIndex}-${path}`;
}

function addTask(rankIndex, text, path, parent) {
  const label = document.createElement('label');
  label.className = 'task';

  const input = document.createElement('input');
  input.type = 'checkbox';

  input.checked = Boolean(
    checked[taskId(rankIndex, path)]
  );

  const span = document.createElement('span');
  span.textContent = text;

  if (input.checked) {
    label.classList.add('done');
  }

  input.addEventListener('change', () => {
    checked[taskId(rankIndex, path)] = input.checked;

    label.classList.toggle('done', input.checked);

    localStorage.setItem(
      storageKey,
      JSON.stringify(checked)
    );

    updateProgress();
  });

  label.append(input, span);
  parent.append(label);
}

function addGroup(rankIndex, group, groupIndex, content) {
  const wrapper = document.createElement('div');
  wrapper.className = 'task-group';

  const heading = document.createElement('p');
  heading.className = 'task-group-label';

  heading.textContent = group.label || 'ТРЕБОВАНИЯ';

  wrapper.append(heading);

  (group.tasks || []).forEach((task, i) => {
    addTask(
      rankIndex,
      task,
      `g${groupIndex}-t${i}`,
      wrapper
    );
  });

  (group.options || []).forEach((option, optionIndex) => {
    const optionWrap = document.createElement('div');
    optionWrap.className = 'task-group';

    const optionTitle = document.createElement('p');
    optionTitle.className = 'task-note';

    optionTitle.textContent = `Вариант ${optionIndex + 1}`;

    optionWrap.append(optionTitle);

    option.forEach((task, i) => {
      addTask(
        rankIndex,
        task,
        `g${groupIndex}-o${optionIndex}-t${i}`,
        optionWrap
      );
    });

    wrapper.append(optionWrap);
  });

  content.append(wrapper);
}

ranks.forEach((rank, index) => {
  const card = document.createElement('article');
  card.className = 'rank-card';

  const toggle = document.createElement('button');
  toggle.className = 'rank-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');

  const number = document.createElement('span');
  number.className = 'rank-number';
  number.textContent = String(index + 1).padStart(2, '0');

  const nameWrap = document.createElement('span');

  const name = document.createElement('span');
  name.className = 'rank-name';
  name.textContent = rank.name;

  const sub = document.createElement('small');
  sub.className = 'rank-sub';
  sub.textContent = rank.sub;

  nameWrap.append(name, sub);

  const status = document.createElement('span');
  status.className = 'rank-status';
  status.textContent = 'ОТКРЫТЬ ИСПЫТАНИЯ';

  const arrow = document.createElement('span');
  arrow.className = 'rank-arrow';
  arrow.textContent = '+';

  toggle.append(number, nameWrap, status, arrow);

  const content = document.createElement('div');
  content.className = 'rank-content';

  if (rank.tasks) {
    addGroup(
      index,
      {
        label: 'ОБЯЗАТЕЛЬНЫЕ ИСПЫТАНИЯ',
        tasks: rank.tasks
      },
      0,
      content
    );
  }

  (rank.groups || []).forEach((group, i) => {
    addGroup(index, group, i + 1, content);
  });

  toggle.addEventListener('click', () => {
    const open = card.classList.toggle('open');

    toggle.setAttribute(
      'aria-expanded',
      String(open)
    );

    status.textContent = open
      ? 'ИСПЫТАНИЯ ОТКРЫТЫ'
      : 'ОТКРЫТЬ ИСПЫТАНИЯ';
  });

  card.append(toggle, content);
  list.append(card);
});

function updateProgress() {
  const boxes = [
    ...document.querySelectorAll('.task input')
  ];

  const done = boxes.filter(x => x.checked).length;

  const pct = boxes.length
    ? Math.round(done / boxes.length * 100)
    : 0;

  document.getElementById('progress-label').textContent =
    pct + '%';

  document.getElementById('progress-bar').style.width =
    pct + '%';

  document.getElementById('progress-count').textContent =
    `${done} из ${boxes.length} заданий отмечено`;
}

updateProgress();

document
  .getElementById('reset-progress')
  .addEventListener('click', () => {
    if (!confirm('Сбросить все отметки о выполнении заданий?')) {
      return;
    }

    checked = {};

    localStorage.removeItem(storageKey);

    document.querySelectorAll('.task input').forEach(input => {
      input.checked = false;

      input.closest('.task').classList.remove('done');
    });

    updateProgress();
  });

document
 
  .addEventListener('change', event => {
    const file = event.target.files &&
      event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите файл изображения.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      document.getElementById('backdrop').style.backgroundImage =
        `linear-gradient(90deg,rgba(13,10,15,.93),rgba(16,12,17,.78)),url("${reader.result}")`;
    };

    reader.readAsDataURL(file);
  });
