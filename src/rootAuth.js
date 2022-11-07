import { openNotificationWithIcon } from "@components/help";
import { RequestAuthMeta } from "@redux/API";
import { jsforceResponse } from "@/config/httpService";
import { Connection } from "jsforce";
import _ from 'lodash'
import store from "@redux/store";
import AuthActions from "@redux/Auth/actions";

const readMessage = async (e) => {
  console.log("readMessage0", e);
  if (e.data.session && e.isTrusted && e.data.type === 'AcForm') {
    console.log("readMessage", e);
    if (e.data.platform === 'bubbleDev') {
      return readMessageForBubble(e)
    } else {
      // salefource
      return readMessageForNormal(e)
    }

  }
}
const readMessageForNormal = async (e) => {
  let token = e.data?.session;
  let instance_url = e.data?.instance_url;
  let entity = e.data?.entity;

  const devConfig = {
    accessToken: token,
    instanceUrl: instance_url,
    proxyUrl: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PROXY_INSTANCE : '',
  }
  const connectConfig = devConfig
  const connection = new Connection(connectConfig);
  let internalContactId = e.data?.internalcontactid;
  let contactId = e.data?.usercontactid;
  let user_result = [];

  if (internalContactId) {
    user_result = internalContactId;
  } else if (contactId) {
    user_result = contactId;
  } else {
    return openNotificationWithIcon("error", "Missing UserId or ContactId")
  }
  let result = await RequestAuthMeta(
    connection,
    entity,
    user_result,
    user_result
  );
  console.log('stepOne', result)
  const domain = _.get(result, "domain") || 'https://api-dev.fintechautomation.com'
  result = jsforceResponse(result, "", false, true);
  result = _.get(result, "result");
  


  let tokenData = {
    connection: connection,
    meta: result,
    domain: domain,
    instance_url: instance_url,
    contactid: internalContactId,
  };

  store.dispatch(AuthActions.AuthMetaSuccess(tokenData))
  return result
}

const readMessageForBubble = async (e) => {
  let instance_url = e.data?.instance_url;
  let internalContactId = e.data?.internalcontactid;
  let contactId = e.data?.usercontactid;
  let user_result = [];

  if (internalContactId) {
    user_result = internalContactId;
  } else if (contactId) {
    user_result = contactId;
  } else {
    return openNotificationWithIcon("error", "Missing UserId or ContactId")
  }
  const token = e.data?.session
  const domain = e.data?.server_url
  let tokenData = {
    meta: token,
    domain: domain,
    instance_url: instance_url,
    contactid: internalContactId,
  };

  store.dispatch(AuthActions.AuthMetaSuccess(tokenData))
  return true
}


const rootAuth = async () => {
  if (process.env.NODE_ENV === 'development') {
    const message = {
      isTrusted: true,
      data: {
        session: process.env.REACT_APP_TOKEN,
        // session: 'eyJraWQiOiItcmdFcnZkUW9QYmlWS3ZwZm5kU1JUTUNtNFBYaUZ5aXlxdDI5d0JyQkxvIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnVnb19tQnZIYmNJQ1c4NUx5cnZVLWVuZ2VIajBIbjlLSDhUd09zQmYxeWciLCJpc3MiOiJodHRwczovL2ZpbnRlY2hhdXRvbWF0aW9uc3NvLm9rdGFwcmV2aWV3LmNvbS9vYXV0aDIvYXVzM2JyenZic2trb1lkZmExZDciLCJhdWQiOiJhcGk6Ly90ZW5hbnQiLCJpYXQiOjE2Njc1NjkwNjAsImV4cCI6MTY2NzU3NjI2MCwiY2lkIjoiMG9hM2JzZGRqaEFMd1BadzcxZDciLCJzY3AiOlsiZGVmYXVsdCJdLCJzdWIiOiIwb2EzYnNkZGpoQUx3UFp3NzFkNyIsImNsaWVudElkIjoiMG9hM2JzZGRqaEFMd1BadzcxZDcifQ.GMaVnPM_CISpPBpS6Fx71dkFujflb9RRzLkhoaYoZ2O25RLv3M_qtU6laBk7dd-ZcCxpUwTWLxupdclrnOhDQ5B2lFAb56KehYsyI6Oo1Ba0B786iOXyRtD5d8dCBXgYNSHvvNt_huDAVkiHTZnm1_faRQn5E5pJg9Ebi3s8WLrCM_eEBX14BpF46a2cJEcG53_SNSd5EPCA2-UcGLqOYGTRckRUln-tbV1FYuEhM7fA-O8laxfcE4qjfAjctiPsiOfDvxdgdlfTd1TJri-jvsGTm63hNq--L7rZjLbscLxX97thKxzkoPoip04RthLBQn0p5vvMjctKA1sL90BPKQ',
        instance_url: process.env.REACT_APP_INSTANCE,
        internalcontactid: '0038c00002lQanwAAC',
        server_url: process.env.REACT_APP_BACKEND_URL,
        type: 'AcForm',
        userId: '0038c00002lQanwAAC',
        platform: 'bubbleDev',
      }
    }
    return new Promise(async (resolve, reject) => {
      const result = await readMessage(message)
      console.log('stepTwo', result)
      if ((result ?? '') !== '') {
        resolve(message.data)
      } else {
        reject(false)
      }
    })

  }

  return new Promise((resolve, reject) => {
    const settimeout = setTimeout(() => {
      reject(false)
    }, 150000)
    window.postMessage({ isLoaded: true }, '*')
    const judgeStatus = async (e) => {
      const result = await readMessage(e)
      console.log('stepTwo', result, e)
      if ((result ?? '') !== '') {
        clearTimeout(settimeout)
        window.removeEventListener('message', judgeStatus)
        resolve(true)
      }
    }
    window.addEventListener('message', judgeStatus)
  })
}



export default rootAuth;
