import { useState } from "react";
import "./App.css";

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            /* a태그의 기능을 preventDefault로 막고
            props객체로 받아온 onChangeMode속성의 기능을 실행을 시킨다. */
            event.preventDefault();
            props.clickHeader();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  let topics = [];

  for (let topic of props.topics) {
    topics.push(
      <li key={topic.id}>
        {/* 유니크한 키(식별자)를 주어야한다. (반복문 안에서 고유해야하는 키값이다.) */}
        {/* 리액트에서는 반복 등 자동으로 생성되는 태그들을 추적하기 위해서는 각각의 태그에 유니크한 키를 주겠금 한다. */}
        <a
          id={topic.id}
          href={"/read/" + topic.id}
          onClick={(event) => {
            event.preventDefault();
            /* target은 이벤트가 발생된 주체 즉, a태그를 가르키며 a태그의 id를 가져온다. */
            props.clickID(event.target.id);
            /* props.clickID(topic.id) <= 이런식으로 해도 되지만 반복되는 태그에 식별자를 두어 해당 식별자의 id값을 가져오는게 맞는 방식이다.*/
          }}
        >
          {topic.title}
        </a>
      </li>
    );
  }

  return (
    <nav>
      <ol>{topics}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      <h4>{props.content}</h4>
    </article>
  );
}

function Create(props) {
  return (
    <article>
      <h2>생성합니다.</h2>
      {/* form태그 submit시켰을때 onSubmit 이벤트를 실행시킬수 있다. */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let text = [e.target.title.value, e.target.content.value];
          props.onCreate(text);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="제목"></input>
        </p>
        <p>
          <textarea name="content" placeholder="내용"></textarea>
        </p>
        <p>
          <input type="submit" value="생성"></input>
        </p>
      </form>
    </article>
  );
}

function Update(props) {
  /* input태그에 value는 고정되어 있어서 props.title로만 지정하면 변경되지 않아서 state 초기값으로 잡아주고
  변경될때마다 랜더링을 해줘서 변경된 값을 value에 담아준다. => 즉 props로 넘어온 값을 state로 환승한것이다. */
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.title);

  return (
    <article>
      <h2>수정 합니다.</h2>
      {/* form태그 submit시켰을때 onSubmit 이벤트를 실행시킬수 있다. */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let title = e.target.title.value;
          let body = e.target.content.value;
          props.onUpdate(title, body);
        }}
      >
        <p>
          {/* input태그에 value에 해당 props로 받아온 값을 넣어줬더니 키보드를 입력해도 추가 및 수정이 되지 않았다.
          그래서 state 2개를 더 생성해서 내부에 먼가 동작할때마다 set으로 수정해서 다시 해당 value에 넣어줬다. */}
          <input
            type="text"
            name="title"
            placeholder="제목"
            /* html에서는 onChange이벤트는 값이 바뀌고 마우스가 바깥쪽으로 빠져나갈때 이벤트가 발생되는데
            리액트에서는 값이 입력될때마다 onChage 이벤트가 발생된다. */
            value={title}
            onChange={(event) => {
              /* 콘솔을 찍어보면 입력될때마다 onChange이벤트가 발생되어서 랜더링이 되는모습을 볼수가있다.
              그래서 값을 입력할때마다 state를 사용하여 변경된 값을 담고 value에 변경된 값을 다시 보여줌으로써 입력시킬수가 있다. */
              console.log(event.target.value);
              setTitle(event.target.value);
            }}
          ></input>
        </p>
        <p>
          <textarea
            name="content"
            placeholder="내용"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="수정"></input>
        </p>
      </form>
    </article>
  );
}

/* ================================================================================================================================ */

function App() {
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);

  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "jss", body: "jss is ..." },
  ]);

  let content = null;
  let contextControl = null;

  if (mode === "Welcome") {
    content = <Article title="Welcome" content="Hello, Web" />;
  } else if (mode === "Read") {
    contextControl = (
      /* 이렇게 해당 li태그가 ul안에 있는데 2개의 li를 만들기 위해서는 이런식으로 <>빈 태그를 생성하면
      html상에서는 보이지 않고 2개의 li태그를 하나의 변수에 담을수 있다. */
      <>
        <li>
          <a
            href={"/update/" + id}
            onClick={(e) => {
              e.preventDefault();
              setMode("Update");
            }}
          >
            Update
          </a>
        </li>
        <li>
          <input
            type="button"
            value="삭제"
            onClick={() => {
              const newTopics = [];
              for (let topic of topics) {
                if (topic.id !== Number(id)) {
                  newTopics.push(topic);
                }
              }
              setTopics(newTopics);
              setMode("Welcome");
            }}
          ></input>
        </li>
      </>
    );

    for (let i = 0; i < topics.length; i++) {
      /* useState값으로 set해주면 문자열로 저장된다. 그래서 number()함수를 통해서 정수로 변환시켰다. */
      if (topics[i].id === Number(id)) {
        content = <Article title={topics[i].title} content={topics[i].body} />;
      }
    }
  } else if (mode === "Create") {
    content = (
      <Create
        onCreate={(result) => {
          const newTopic = {
            id: topics.length + 1,
            title: result[0],
            body: result[1],
          };

          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
        }}
      />
    );
  } else if (mode === "Update") {
    let title = null;
    let body = null;

    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === Number(id)) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(title, body) => {
          /* 수정이 완료된 값으로 updatedTopic에 담아준다.*/
          const updatedTopic = { id: Number(id), title: title, body: body };
          const newTopics = [...topics];

          let i = 0;
          for (let topic of newTopics) {
            if (topic.id === Number(id)) {
              newTopics[i] = updatedTopic;
              break;
            }
            i++;
          }
          setTopics(newTopics);
          setMode("Read");
        }}
      />
    );
  } else if ("Delete") {
  }

  return (
    <div>
      <Header
        title="REACT"
        clickHeader={() => {
          setMode("Welcome");
        }}
      />

      <Nav
        topics={topics}
        clickID={(id) => {
          setMode("Read");
          /* 내부 컴포넌트에서 클릭하면 해당 id를 파라미터로 받아서 state 내부 상태값 변경하여 랜더링 */
          setId(id);
        }}
      />

      {content}

      <ul>
        <li>
          <a
            href="/create"
            onClick={(e) => {
              e.preventDefault();
              setMode("Create");
            }}
          >
            Create
          </a>
        </li>

        {contextControl}
      </ul>
    </div>
  );
}

export default App;
