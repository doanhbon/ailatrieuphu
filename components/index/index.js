/* eslint-disable jsx-a11y/media-has-caption */
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
import ModalDetailTeam from 'components/index/ModalDetailTeam';
import infoMembers from 'mockData/infoMembers.json';

const prefix = 'indexPage';
export const c = classPrefixor(prefix);
// import { c } from '..';

const Index = props => {
  const { state } = props;
  const { groups } = state;
  const [value, updateValue] = useState('');
  const [colorTitle, updateColorTitle] = useState('#f9bc60');
  const [isHasAudio, updateHaveAudio] = useState(false);
  const [isShowModalTeam, updateShowModalTeam] = useState(false);
  // updateHaveAudio(true);
  const onSearchTextChange = e => {
    updateValue(e.target.value);
  };
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
  // console.log('groups = ', groups);

  const updateGroups = e => {
    if (e.key === 'Enter') {
      props.addGroup(value);
      updateValue('');
    }
  };

  return (
    <div className={prefix}>
      {isHasAudio && <audio src={AiLaTrieuPhuMp3} autoPlay loop />}
      <h1
        onClick={() => updateHaveAudio(!isHasAudio)}
        className="title"
        style={{ color: colorTitle }}
      >
        Ai là nhà tâm lý học
      </h1>
      <div className="input">
        <div>Thêm đội chơi: </div>
        <input
          value={value}
          onChange={e => onSearchTextChange(e)}
          type="text"
          size={50}
          onKeyPress={e => updateGroups(e)}
        />
      </div>
      <div className="groups">
        {groups.map((item, index) => {
          return (
            <div key={`group${index}`} className="group">
              <span>{item.name}</span>
              <button onClick={e => props.removeGroup(index)}>xóa</button>
            </div>
          );
        })}
      </div>
      <div>
        <Link {...urlHelper.getUrlGamePage().route}>
          <button className="btnStart">Bắt đầu</button>
        </Link>
      </div>
      <div>
        <Link {...urlHelper.getUrlInstructionPage().route}>
          <button className="btnStart">Hướng dẫn</button>
        </Link>
      </div>
      <div>
        <button onClick={e => updateShowModalTeam(true)} className="btnStart">
          Thành viên thực hiện
        </button>
      </div>
      <ModalDetailTeam
        isShowModalTeam={isShowModalTeam}
        updateShowModalTeam={updateShowModalTeam}
        data={infoMembers}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);
