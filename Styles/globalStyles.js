import {StyleSheet} from 'react-native';
import colors from '../src/assets/theme/colors';

export default globalStyles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  inputWrapper: {
    paddingVertical: 12,
  },

  inputContainer: {
    height: 42,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    alignItems: 'center',
    marginTop: 5,
  },

  textInput: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  error: {
    color: colors.danger,
    paddingTop: 4,
    fontSize: 12,
  },

  customButton: {
    height: 42,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    justifyContent: 'center',
  },
  loaderSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 21,
    textAlign: 'center',
    fontWeight: '500',
    paddingTop: 20,
  },
  subTitle: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '500',
    paddingVertical: 20,
  },
  form: {
    paddingTop: 20,
  },
  createSection: {
    flexDirection: 'row',
  },
  linkBtn: {
    fontSize: 16,
    color: colors.primary,
    paddingLeft: 17,
  },
  infoText: {
    fontSize: 16,
  },
});
