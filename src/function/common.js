/**
 * バリエーション・メールアドレス
 * @param email
 * @returns {boolean}
 */
export const isValidEmailFormat = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

/**
 * バリエーション・入力チェック
 * @param args Required input values
 * @returns {boolean}
 */
export const isValidRequiredInput = (...args) => {
  let validator = true;
  for (let i = 0; i < args.length; i = (i + 1) | 0) {
    if (args[i] === "") {
      validator = false;
    }
  }
  return validator;
};
