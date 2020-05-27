/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { Link } from 'core/routes';
import { urlHelper } from 'utils';
import data from 'mockData/question.json';
import AiLaTrieuPhuMp3 from 'assets/sounds/AiLaTrieuPhu-VA_43vp2.mp3';

const prefix = 'instructionPage';
export const c = classPrefixor(prefix);
// import { c } from '..';
const InstructionPage = () => {
  const [currentIndex, updateCurrentIndex] = useState(4);
  useEffect(() => {
    if (currentIndex < 39) {
      updateCurrentIndex(currentIndex + 5);
    } else {
      updateCurrentIndex(4);
    }
  }, []);

  useEffect(() => {
    let myInterval = null;
    myInterval = setInterval(() => {
      if (currentIndex < 39) {
        updateCurrentIndex(currentIndex + 5);
      } else {
        updateCurrentIndex(4);
      }
    }, 500);

    return () => clearInterval(myInterval);
  }, [currentIndex]);

  return (
    <div className={prefix}>
      <audio src={AiLaTrieuPhuMp3} autoPlay loop />
      <div className="questions-btnback">
        <Link {...urlHelper.getUrlHomePage().route}>
          <button className="btn-back">Trở về</button>
        </Link>
        <div className="list-question">
          {data.map((item, index) => (
            <button
              className={
                currentIndex === index
                  ? 'important-question'
                  : 'normal-question'
              }
              key={`answer${index}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="instruction">
        <p>Mỗi đội chơi lần lượt trả lời 40 câu hỏi.</p>
        <p>
          Có các mốc câu hỏi quan trọng lần lượt là 5, 10, 15, 20, 25, 30, 35,
          40.
        </p>
        <p>Trả lời đúng được cộng điểm.</p>
        <p>Trả lời sai không bị trừ điểm.</p>
        <p>Mỗi câu hỏi trả lời đúng được cộng 100 điểm.</p>
        <p>Các mốc câu hỏi quan trọng nếu trả lời đúng được cộng 500 điểm.</p>
        <p>Sau 40 câu, đội có điểm số cao nhất là đội dành chiến thắng.</p>
      </div>
    </div>
  );
};

export default InstructionPage;
