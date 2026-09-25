import soap from "soap";

const endpoint =
  "https://www.dataaccess.com/webservicesserver/NumberConversion.wso";
const wsdlUrl = `${endpoint}?WSDL`;

const [result] = await (
  await soap.createClientAsync(wsdlUrl, {}, endpoint)
).NumberToWordsAsync({ ubiNum: 500 });

console.log(result);
