/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { connect } from 'react-redux';
import * as Actions from 'actions/index';
import { Link } from 'core/routes';
import { urlHelper } from 'utils';
import AiLaTrieuPhuMp3 from 'assets/sounds/AiLaTrieuPhu-VA_43vp2.mp3';

const prefix = 'winPage';
export const c = classPrefixor(prefix);
// import { c } from '..';

const WinPage = props => {
  const { state } = props;
  const { groups } = state;
  const [colorTitle, updateColorTitle] = useState('#f9bc60');
  const maxScore = groups ? Math.max(...groups.map(item => item.score)) : 0;
  const winningTeams = groups
    ? groups.filter(item => item.score === maxScore)
    : undefined;

  useEffect(() => {
    updateColorTitle('#e16162');
  }, []);

  useEffect(() => {
    let myInterval = null;
    myInterval = setInterval(() => {
      if (colorTitle === '#f9bc60') {
        updateColorTitle('#e16162');
      } else {
        updateColorTitle('#f9bc60');
      }
    }, 200);

    return () => clearInterval(myInterval);
  }, [colorTitle]);
  return (
    <div className={prefix}>
      <audio src={AiLaTrieuPhuMp3} autoPlay loop />
      <h1>ĐỘI THẮNG CUỘC</h1>
      {winningTeams.map((winningTeam, index) => (
        <h1 style={{ color: colorTitle }} key={`winningTeam${index}`}>
          {`${winningTeam ? winningTeam.name : 'Không có tên'}: ${
            winningTeam ? winningTeam.score : 0
          } điểm`}
        </h1>
      ))}
      <div>
        <Link {...urlHelper.getUrlHomePage().route}>
          <button className="btnBack">Về trang chủ</button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  state: state.index
});

const mapDispatchToProps = {
  addGroup: Actions.addGroup,
  removeGroup: Actions.removeGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(WinPage);
