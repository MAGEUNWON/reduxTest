//각 DOM 엘리먼트에 대한 레퍼런스 만들어줌
const elNumber = document.getElementById('number');
const btnIncrement = document.getElementById('increment');
const btnDecrement = document.getElementById('decrement');

//액션 타입을 정의해 줌
const INCREMENT = 'INCREMENT';
const DECREMETN = 'DECREMENT';

//액션 객체를 만들어주는 액션 생성 함수(액션 객체는 필수적으로 type이라는 값을 가지고 있어야 함. type:INCREMENT라는 객체를 전달 받으면 리덕스 스토어는 상태에 값을 더해야 하는 구나하고 액션을 참조하게 됨, 추가적으로 상태값에 2를 더해야 한다면 diff:2를 만들면 나중에 이 diff값을 참고하여 기존 값에 2를 더함. type을 제회한 값은 옵션임.)
const increment = (diff)=>({type: INCREMENT, diff:diff});
const decrement = () => ({type: DECREMETN});

//초기값을 설정. 상태의 형태는 개발자 맘대로
const initialState = {
  number: 0
};

// 이것은  리듀서 함수. state와 action을 파라미터로 받아옴. (리듀서 함수란 액션 객체를 받으면 전달받은 액션 타입에 따라 어떻게 상태를 업테이트 해야할 지 로직을 정의하는 함수임)
// 그리고 그에 따라 다음의 상태를 정의 한 다음 반환해 줌

//여기에 state = initialState는, 파라미터의 기본값을 지정해줌.(리듀서 함수는 두가지 파라미터를 받음. 1. state: 현재 상태, 2. action: 액션 객체 이 두가지 파라미터를 참조하여 새로운 상태 객체를 만들어서 이를 반환 함.)
const counter = (state = initialState, action) => {
  console.log(action);
  switch(action.type){
    case INCREMENT:
      return {
        number: state.number + action.diff
      };
      case DECREMETN:
        return {
          number: state.number - 1
        }
      default:
        return state;
  }
}

//스토어를 만들 땐 createStore에 리듀서 함수를 넣어서 호출함
const {createStore} = Redux;
const store = createStore(counter);

//상태가 변경 될 때마다 호출 시킬 Listener 함수임
const render = () =>{
  elNumber.innerText = store.getState().number;
  console.log('내가 실행됨');
}

//스토어에 저장을하고 뭔가 변화가 있으면 render 함수를 실행함
store.subscribe(render);

//초기렌더링을 위해 직접 실행시켜줌
render();

//버튼에 이벤트를 달아줌
//스토어에 변화를 주라고 할 때는 dispatch 함수에 액션 객체를 넣어서 호출함(dispatch 함수를 통해 액션(변화)을 스토어에 알려줌)
btnIncrement.addEventListener('click', () => {
  store.dispatch(increment(25));
})

btnDecrement.addEventListener('click', () => {
  store.dispatch(decrement());
})

//위의 내용 정리하면 

// 1. 액션타입을 만들어 줌
// 2. 액션타입들을 위한 액션 생성 함수를 만듬. 액션 생성 함수를 만드는 이유는 그때 그때 액션을 만들 때마다 직접 {이러한 객체} 형식ㅇ로 객체를 일일히 생성하는 것이 번거롭기 때문에 이를 함수화 한 것. 나중에는 특히 액션에 다양한 파라미터가 필요해 질 때 유용함
// 3. 변화를 주는 함수, 리듀서를 정의해 줌. 이 함수에서는 각 액션타입마다, 액션이 들어오면 어떠한 변화를 줄지 정의함. 지금의 경우에는 상태 객체에 number라는 값이 들어져 있음. 변화를 줄 때에는 불변성을 유지시켜주어야 함.
// 4. 스토어를 만듬. 스토어를 만들 땐 createStore를 사용하여 만듬. createStore에는 리듀서가 들어감(스토어의 초기 상태, 그리고 미들웨어도 넣을 수 있음)
// 5. 스토어에 변화가 생길 때 마다 실행시킬 리스너 함수 render를 만들어주고 store.subscribe를 통해 등록해 줌
// 6. 각 버튼의 클릭이벤스에 store.dispatch를 사용하여 액션을 넣어줌. 