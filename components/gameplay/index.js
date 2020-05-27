/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable react/style-prop-object */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { connect } from 'react-redux';
import * as Actions from 'actions/index';
import { Radio, Icon, Tooltip } from 'antd';
import Chart from 'react-chartjs-2';
import { urlHelper } from 'utils';
import { useRouter } from 'next/router';
import data from 'mockData/question.json';
import AiLaTrieuPhuMp3 from 'assets/sounds/AiLaTrieuPhu2.mp3';
import correctAnswerSound from 'assets/sounds/C7_12_dung.mp3';
import { Link } from 'core/routes';
import Clock from './clock';

const prefix = 'gamePage';
export const c = classPrefixor(prefix);
// import { c } from '..';

const GamePage = props => {
  const router = useRouter();
  const [isShowSlide, updateShowSlide] = useState(false);
  const [time, updateTime] = useState(15);
  const [answersChoosen, updateAnswers] = useState(
    props.state.length !== 0 ? props.state.map(item => '') : []
  );
  const [indexOfQuestion, updateIndexOfQuestion] = useState(0);
  const currentQuestion = data[indexOfQuestion];
  const trueIndexOfAnswer = currentQuestion.answers.findIndex(item => {
    return Object.keys(item)[0] === currentQuestion.exactAns;
  });
  const [isShowTrueAnswer, updateShowAnswer] = useState(false);

  const start = () => {
    setTimeout(() => {
      updateTime(time - 1);
    }, 1000);
  };

  const [dataChart, updateDataChart] = useState({
    datasets: [
      {
        label: 'Thống kê điểm số',
        data: props.state.map(item => item.score),
        backgroundColor: '#e16162'
      }
    ],
    labels: props.state.map(item => item.name)
  });

  const onChange = (e, index) => {
    const temp = [...answersChoosen];
    temp[index] = e.target.value;
    updateAnswers(temp);
  };

  const handleChangeIndexOfQuestion = () => {
    if (indexOfQuestion < data.length - 1) {
      updateIndexOfQuestion(indexOfQuestion + 1);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    const strQuery = { ...urlHelper.getUrlWinPage().route };
    router.push(strQuery.to, strQuery.to, { shallow: true });
  };

  useEffect(() => {
    if (time !== 15) {
      let myInterval = null;
      if (time !== 0) {
        myInterval = setInterval(() => {
          updateTime(time - 1);
        }, 1000);
      } else {
        clearInterval(myInterval);
      }

      return () => clearInterval(myInterval);
    }
  }, [time]);

  useEffect(() => {
    if (isShowTrueAnswer === true) {
      props.checkAnswer({
        listAnswer: answersChoosen,
        index: indexOfQuestion,
        exactAnwser: currentQuestion.exactAns
      });
      let myInterval = null;
      const element = document.getElementById(`answer${trueIndexOfAnswer}`);
      if (isShowTrueAnswer) {
        myInterval = setInterval(() => {
          if (element.className === 'true-answer') {
            element.className = 'answer';
          } else {
            element.className = 'true-answer';
          }
        }, 200);
      } else {
        element.className = 'answer';
        clearInterval(myInterval);
      }

      return () => clearInterval(myInterval);
    }
    for (let i = 0; i < currentQuestion.answers.length; i++) {
      document.getElementById(`answer${i}`).className = 'answer';
    }
  }, [isShowTrueAnswer]);

  useEffect(() => {
    updateTime(15);
    updateShowAnswer(false);
    updateAnswers(props.state.length !== 0 ? props.state.map(item => '') : []);
  }, [indexOfQuestion]);

  useEffect(() => {
    updateDataChart({
      datasets: [
        {
          label: 'Thống kê điểm số',
          data: props.state.map(item => item.score),
          backgroundColor: '#e16162'
        }
      ],
      labels: props.state.map(item => item.name)
    });
  }, [props.state]);

  // console.log('state = ', props.state);

  return (
    <div>
      <div className={prefix}>
        {!isShowTrueAnswer ? (
          <audio src={AiLaTrieuPhuMp3} autoPlay loop />
        ) : (
          <audio src={correctAnswerSound} autoPlay />
        )}
        <div className="question-comp">
          <div className="question">{currentQuestion.question}</div>
          <div className="answers">
            {currentQuestion.answers.map((item, index) => {
              const key = Object.keys(item)[0];
              return (
                <div key={`answer${index}`} id={`answer${index}`}>
                  {`${key}. ${item[key]}`}
                </div>
              );
            })}
          </div>
          <button className="btn-check" onClick={e => updateShowAnswer(true)}>
            Kiểm tra đáp án
          </button>
        </div>
        <div className="table">
          <table style={{ width: '100%' }}>
            <tr>
              <th>Nhóm</th>
              <th colSpan={4}>Đáp án</th>
            </tr>
            <>
              {props.state.map((item, index) => {
                return (
                  <tr key={`row${index}`}>
                    <td>{item.name}</td>
                    <td colSpan={4}>
                      {' '}
                      <Radio.Group
                        onChange={e => onChange(e, index)}
                        value={answersChoosen[index]}
                      >
                        <Radio value="A">A</Radio>
                        <Radio value="B">B</Radio>
                        <Radio value="C">C</Radio>
                        <Radio value="D">D</Radio>
                      </Radio.Group>
                    </td>
                  </tr>
                );
              })}
            </>
          </table>
        </div>
      </div>
      <div className="countdown-clock" onClick={start}>
        <Clock time={time} />
      </div>
      <div className="list-question">
        {data.map((item, index) => (
          <button
            className={
              indexOfQuestion === index
                ? 'current-question'
                : (index + 1) % 5 === 0
                ? 'important-question'
                : 'normal-question'
            }
            key={`answer${index}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="btn-out">
        <Link {...urlHelper.getUrlHomePage().route}>
          <Tooltip title="Trở về trang chủ">
            <button>
              <Icon type="home" />
            </button>
          </Tooltip>
        </Link>
      </div>
      <div className="btn-exit">
        <Tooltip title="Kết thúc">
          <button onClick={endGame}>
            <Icon type="logout" />
          </button>
        </Tooltip>
      </div>
      <div className="btn-next">
        <Tooltip title="Câu tiếp theo">
          <button onClick={handleChangeIndexOfQuestion}>
            <Icon type="double-right" />
          </button>
        </Tooltip>
      </div>
      <div className="btn-chart">
        <Tooltip title="Xem điểm">
          <button onClick={e => updateShowSlide(!isShowSlide)}>
            <Icon type="bar-chart" />
          </button>
        </Tooltip>
      </div>
      <div
        className={!isShowSlide ? 'statistics-comp' : 'statistics-comp-show'}
      >
        <button
          onClick={e => updateShowSlide(!isShowSlide)}
          className="backward-btn"
        >
          Đóng
        </button>
        <div className="chart">
          <Chart
            type="bar"
            data={dataChart}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

// export default GamePage;

const mapStateToProps = state => ({
  state: state.index.groups || []
});

const mapDispatchToProps = {
  addGroup: Actions.addGroup,
  removeGroup: Actions.removeGroup,
  checkAnswer: Actions.checkAnswer
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
