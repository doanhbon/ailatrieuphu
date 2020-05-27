/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React from 'react';
import { Modal } from 'antd';

const listImgs = [
  require('assets/img/28423320_563461587353028_7523200284370332905_o.jpg'),
  require('assets/img/798c6e926b21917fc830.jpg'),
  require('assets/img/a0177e7f88b062ee3ba1.jpg')
];

const ModalDetailTeam = props => {
  let indexImg = -1;
  return (
    <div>
      <Modal
        visible={props.isShowModalTeam}
        onOk={() => props.updateShowModalTeam(false)}
        onCancel={() => props.updateShowModalTeam(false)}
        footer={false}
        destroyOnClose
        width="80vw"
        zIndex={100}
      >
        <div className="info-team">
          {props.data.map((item, index) => {
            // const imgUrl = require(`${item.imageUrl}`);
            indexImg++;

            return (
              <div key={`member${index}`} className="item">
                <div>
                  <img src={listImgs[indexImg]} />
                </div>
                <div className="info-piece">{item.name}</div>
                <div className="info-piece">{item.mssv}</div>
                <div className="info-piece">{item.phoneNumber}</div>
                <div className="info-piece">{item.birthDay}</div>
                <div className="info-piece">{item.class}</div>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default ModalDetailTeam;
