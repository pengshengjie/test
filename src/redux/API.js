import axios from "axios";
import store from "@redux/store";
import _ from "lodash";
import request from '@redux/request'
import {openNotificationWithIcon} from "@components/help";

// example of using api
export const api = {
    getTest: (query) => {
      return axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
    },
    getTest2 : async (params) => {
      try {
        const result = await request.get(
          `${
            process.env.NODE_ENV === 'development' ? '' : ''
          }/api/v1/services/payment_approval/rules`,
          params
        )
        const code = _.get(result, 'code')
        console.log(result)
        if (code === 200) {
          return _.get(result, 'data')
        } else {
          return openNotificationWithIcon('error', _.get(result, 'errorMessage'))
        }
      } catch (e) {
        return e
      }
    },
}

// authentication

export const RequestAuthMeta = async (
    con,
    entity,
    contactid,
    currentuserid
) => {
    var result = [];
  try {
    let connection = con ? con : store.getState().Auth.connection;
    if (entity) {
      result = connection
        .sobject("accloud__Community__c")
        .select(
          "Id, Name, accloud__Client_Id__c,accloud__Client_Secret__c, accloud__Remote_Api_Domain__c, accloud__Network_ID__c"
        )
        .where({
          name: entity,
        })
        .execute(function (err, data) {
          if (err) {
            return err;
          } else {
            return PassExtAuth(data, entity, contactid, currentuserid);
          }
        });
    } else {
      result = connection
        .sobject("accloud__Community__c")
        .select(
          "Id, Name, accloud__Client_Id__c,accloud__Client_Secret__c, accloud__Remote_Api_Domain__c, accloud__Network_ID__c"
        )
        .where({
          accloud__Internal_Site__c: true,
        })
        .execute(function (err, data) {
          if (err) {
            return err;
          } else {
            return PassExtAuth(data, entity, contactid, currentuserid);
          }
        });
    }

    return result;
  } catch (e) {
    result = e;
  }
  return result;
};

export const PassExtAuth = async (meta, network, contactid, currentuserid) => {
  if (meta.length === 0) {
    return openNotificationWithIcon(
      "error",
      "No Authorization",
      "Please contact administrator to set up authorization"
    );
  }
  var result = [];
  try {
    let client_id = _.get(meta[0], "accloud__Client_Id__c");
    let client_secret = _.get(meta[0], "accloud__Client_Secret__c");
    let domain = _.get(meta[0], "accloud__Remote_Api_Domain__c");
    let entity = _.get(
      meta[0],
      "accloud_Payment__Money_Movement_Entity_Name__c"
    );
    let auth = window.btoa(client_id + ":" + client_secret);
    // console.log('auth', meta[0])
    var form = new FormData();
    form.append("grant_type", "client_credentials");
    form.append("scope", "crm");

    let selectId = contactid ? contactid : currentuserid;
    result = await axios
      .post(
        domain + "/api/v1/auth/tenant/oauth2/token?username=" + selectId,
        form,
        {
          headers: {
            Authorization: "Basic " + auth,
          },
        }
      )
      .then(function (response) {
        // console.log('response'+response)
        let res = [];
        if (_.get(response, "status") === 200) {
          res = _.get(response, "data.data.accessToken");
        } else {
          res = [];
        }
        return res;
      });
    // console.log('auth2', result);
    return { result: result, domain: domain, entity: entity, network: network };
  } catch (e) {
    result = e;
  }
  return result;
};


