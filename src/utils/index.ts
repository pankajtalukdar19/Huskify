type convertObjToStringProps = { [k: string]: any } | undefined;

export const convertObjToString = (payload: convertObjToStringProps) => {
  if (payload && Object.keys(payload).length > 0) {
    const newpayload: convertObjToStringProps = {};

    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        const element = payload[key];
        if (element && element !== "undefined" && element !== "null") {
          newpayload[key] = element;
        }
      }
    }
    let params: string | undefined = new URLSearchParams(newpayload).toString();
    if (params) {
      params = "?" + params;
    } else {
      params = undefined;
    }
    return params;
  }
  return undefined;
};
