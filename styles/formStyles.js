import { StyleSheet } from 'react-native';
import Colors from "../constants/Colors";

const formStyles = StyleSheet.create({
  hidden: {
    display: 'none'
  },
  title: {
    fontFamily: 'montserrat',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 24,
    backgroundColor: Colors.primary,
    color: Colors.white,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  subTitle: {
    marginLeft: 10,
    marginTop: 5
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10
  },
  errorDiv: {
    backgroundColor: Colors.errorBackground,
    color: Colors.errorText,
    fontSize: 18,
    padding: 3,
    marginBottom: 5,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 4,
  },
  successDiv: {
    backgroundColor: Colors.successBackground,
    color: Colors.successText,
    fontSize: 18,
    padding: 3,
    marginBottom: 5,
    borderRadius: 4,
  },
  buttonDiv: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  formBtnContainer: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
    padding: 5,
    margin: 5
  },
  formBtn: {
    color: Colors.white
  },
  dateRangeContainer: {
    flexDirection: 'row',
    paddingBottom: 5
  },
  textField: {
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    padding: 5,
    marginBottom: 5
  }
});

export default formStyles;