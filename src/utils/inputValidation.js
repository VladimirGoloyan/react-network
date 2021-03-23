class inputValidation {
  checkCred(credentials) {
    const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const rePassword = /(?=.{8,})/;
    const reDisplayName = /^([^0-9]*)$/;
    const mailRes = reEmail.test(String(credentials.email).toLowerCase());
    const passRes = rePassword.test(String(credentials.password));
    const nameRes = !reDisplayName.test(String(credentials.name));

    console.log(mailRes);
    console.log(passRes);
    console.log(nameRes);
    if (mailRes && passRes && !nameRes) {
      return 1;
    } else if (nameRes) {
      return 0.3;
    } else if (!mailRes) {
      return 0.1;
    } else if (!passRes) {
      return 0.2;
    }
  }
}
const iVal = new inputValidation();
export default iVal;
