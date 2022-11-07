import styled from 'styled-components';

const WidgetBox = styled.div`
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 8px;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 30px;
  background-color: #ffffff;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

const WidgetWrapper = styled.div`
  margin: 0 10px;
  .ant-card {
    min-width: 240px;
    height: 150px;
    textAlign: center;
    display: flex;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px
  }

  .ant-card-body {
    margin: auto
  }

  
  .blue {
    background-color: #2298F1;
    color: #ffffff;
  }

  .green {
    background-color: #66B92E;
    color: #ffffff;
  }

  .orange {
    background-color: #DA932C;
    color: #ffffff;
  }

  .red {
    background-color: #D65B4A;
    color: #ffffff;
  }

  .padding-bottom{
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;


export {WidgetBox, WidgetWrapper};
