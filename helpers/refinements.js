import t from 'tcomb-form-native';

/**
 * Custom refinements for tcomb-form-native
 */

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});

const Password = t.refinement(t.String, pass => {
  return pass && pass.length >= 8;
});

const refinements = {
  Email,
  Password
};

export default refinements;