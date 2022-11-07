import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { ConfigProvider, Result } from 'antd'

import App from './app'
import rootAuth from './rootAuth'
import store from './redux/store';
import './index.css'
import 'antd/dist/antd.css';
import './assets/styles/tailwind.min.css'

ConfigProvider.config({
  theme: {
    primaryColor: '#0c2d54',
    linkColor: '#0c2d54',
  },
})

const init = () => {
  return rootAuth().then(status => {
    return status
  })
}
const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

init().then(status => {
  const result = <Result status="warning" title="There is something wrong with token" />
  let render = status ? <RootApp /> : result;
  ReactDOM.render(render, document.getElementById("acform_root"));
}).catch((err) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err)
  }
})

/* for test
// ReactDOM.render(
//   <RootApp/>,
//   document.getElementById('root')
// );
*/

