import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
  actions: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-end',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  body: {
    flex: 1,
  },
  button: {
    height: 30,
  },
  colorWhite: {
    color: 'white',
  },
  center: {
    textAlign: 'center',
  },
  centerCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
  },
  cardTitle: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 20,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  error: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    color: 'white',
    backgroundColor: 'red',
  },
  flex: {
    flex: 1,
  },
  header: {},
  iconRight: {
    marginRight: 15,
    height: 30,
    width: 30,
  },
  input: {
    paddingBottom: 20,
  },
  label: {
    paddingVertical: 5,
    paddingLeft: 5,
    color: 'gray',
  },
  list: {
    marginHorizontal: -24,
    marginVertical: -16,
  },
  main: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mainnp: {
    flex: 1,
    alignContent: 'center',
  },
  or: {
    padding: 15,
    textAlign: 'center',
  },
  p: {
    paddingBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default GlobalStyles;
