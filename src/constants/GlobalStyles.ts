import { StyleSheet, Dimensions } from 'react-native';
const height = Dimensions.get('screen').height;
// $akroma-gold-darker: 	#E25D00;
// $akroma-gold-dark: 		#F17100;
// $akroma-gold-base: 		#FFA600;
// $akroma-red-darker: 	#AF0000;
// $akroma-red-dark:		#CF0000;
// $akroma-red-base: 		#F10000;
// $akroma-purple-darker:	#930077;
// $akroma-purple-dark: 	#C2009D;
// $akroma-purple-base: 	#AA0087;
// $akroma-gray-darker: 	#CCCCCC;
// $akroma-gray-dark: 		#E6E6E6;
// $akroma-white: 			#FFFFFF;
// $akroma-dark: 			#1A1A1A;
// $akroma-dark-base:      #343a40;

const GlobalStyles = StyleSheet.create({
  actions: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-end',
  },
  backdrop: {},
  body: {
    flex: 1,
  },
  button: {
    marginBottom: 20,
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
    borderBottomWidth: 1,
  },
  error: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 30,
    color: 'white',
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: '#343a40',
  },
  headerTintColor: {
    color: 'white',
  },
  iconRight: {
    marginRight: 15,
    height: 30,
    width: 30,
  },
  iconLeft: {
    marginLeft: 15,
    height: 30,
    width: 30,
  },
  input: {
    paddingBottom: 20,
  },
  label: {
    paddingVertical: 5,
    paddingLeft: 5,
  },
  list: {
    marginHorizontal: -24,
    marginVertical: -16,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoImage: {
    width: 240,
    height: 240,
    borderRadius: 0,
    marginVertical: 16,
  },
  marginBottom20: {
    marginBottom: 20,
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
  rowSpaceBetween: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#fff',
  },
  mt20: {
    marginTop: 20,
  },
  p10: {
    padding: 10,
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fba304',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    height: '12%',
  },

  exportBtn: {
    marginTop: 10,
    marginHorizontal: 5,
  },
  exportModalBtn: {
    marginTop: 15,
    marginHorizontal: '15%',
  },
  generalBackground: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  bgTransparent: {
    backgroundColor: '#1C1C1E',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletsList: {
    maxHeight: 400,
  },
  copyIcon: {
    height: 23,
    with: 22,
    flex: 1,
  },
  copyIconContainer: {
    width: 22,
  },
  transferButton: {
    backgroundColor: '#fff',
    borderRadius: 24,
    width: 152,
    height: 48,
    color: 'black',
  },
  transferButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'space-between',
    paddingLeft: 34,
    paddingRight: 34,
    height: '13%',
  },
  textButton: {
    fontWeight: '700',
    fontSize: 16,
    paddingLeft: 10,
  },
  buttonIconContent: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  walletsContainer: {
    display: 'flex',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#fff',
    height: 'auto',
    minHeight: height * 0.61,
  },
  generalText: {
    fontSize: 14,
    color: '#1C1C1E',
  },
  smallText: {
    fontSize: 12,
    color: '#676768',
    fontWeight: '400',
  },
  textBold: {
    fontWeight: '700',
  },
  walletCard: {
    minHeight: 70,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GlobalStyles;
