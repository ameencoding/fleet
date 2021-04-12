const prog = getDocument('.progress');
const container = getDocument('.container');
const card = getDocument('.card');
const cardNew = getDocument('.new');
const reaction = getDocument('.reaction');
const post = getDocument('.statusCard textarea');
const postBtn = getDocument('.postBtn');

let count = 15;
let page = 0;

const users = [
  { message: 'I am very happy to see you again!' },
  {
    message: 'It was hourable what happened yesterday!',
  },
  { message: 'Tomorrow will be a big day!' },
  { message: 'how many people are online!' },
  { message: 'I love javascript 💕!' },
  { message: 'I hate PHP 😠' },
];

// progress should start the offsetLeft of the card.
prog.style.marginLeft = card.offsetLeft + 'px';

for (let i = 0; i < page + 1; i++) {
  pushTocard(users[i]);
}

card.addEventListener('mouseenter', stop);
card.addEventListener('mouseleave', start);

card.addEventListener('dblclick', function () {
  createHeart('fa-heart');
});
postBtn.addEventListener('click', Posts);

handleTimer();

// create heart
function createHeart(icon) {
  const heart = document.createElement('i');
  heart.style.position = 'absolute';
  heart.style.left = card.offsetWidth / 2 + 'px';
  heart.style.top = card.offsetHeight / 2 + -25 + 'px';
  heart.classList.add('fa', icon, 'clickedIconShow');
  reaction.appendChild(heart);

  setTimeout(() => heart.remove(), 800);
}

function handleTimer(bool = true) {
  if (bool) {
    timer = setInterval(() => {
      count += 1;
      progress();
    }, 10);
  } else {
    clearInterval(timer);
  }
}

// progress
function progress() {
  if (count === card.offsetWidth) {
    displayFleet();
    count = 15;
  }
  prog.style.width = count + 'px';
}

function getDocument(type) {
  return document.querySelector(type);
}

// update fleet playground.
function pushTocard(data) {
  const text = document.querySelector('#post');

  cardNew.textContent = '';
  text.textContent = data.message;

  if (data.isNew) {
    cardNew.textContent = 'new';
  }
}

// display Next fleet.
function displayFleet() {
  page == users.length - 1 ? (page = 0) : (page += 1);

  for (let i = page; i < page + 1; i++) {
    pushTocard(users[i]);
  }

  if (page > users.length) {
    console.log('Fleet Ended!');
  }
}

// stop the fleet progress when mouseenter the card.
function stop() {
  if (count <= card.offsetWidth) {
    handleTimer(false);
  }
}

// start the fleet progress when mouseleave the card.
function start() {
  if (count === card.offsetWidth) {
    handleTimer(false);
  } else {
    handleTimer();
  }
}

// handle new posts. && push to them the existing one's.
function Posts() {
  if (!post.value == '' && post.value.length < 400) {
    postBtn.style.backgroundColor = '';
    noticePosted();

    const newPost = { isNew: true, message: post.value };
    users.push(newPost);
    post.value = '';
  } else {
    postBtn.style.backgroundColor = 'lightcoral';
  }
}

// create a notice after adding new fleet.
function noticePosted() {
  const div = document.createElement('div');
  div.style.left = container.offsetWidth / 2 - 30 + 'px';
  div.style.top = container.offsetHeight / 2 + -30 + 'px';
  div.classList.add('noticePost');
  div.textContent = 'Posted successfully';
  document.body.appendChild(div);

  setTimeout(() => div.remove(), 2000);
}
