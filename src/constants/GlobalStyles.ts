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
  transparentHeaderContainer: {
    backgroundColor: '#00000000',
    position: 'absolute',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowBackContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: 10,
    paddingTop: 20,
  },
  titleTransparentContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  transparentHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFFFFF',
  },
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
  pt100: {
    paddingTop: 100,
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
  akromaRedButton: {
    borderRadius: 8,
    backgroundColor: '#DB0000',
    color: 'white',
    borderColor: '#DB0000',
  },
  akromaRedButtonDisabled: {
    borderRadius: 8,
    backgroundColor: '#DC9A9A',
    color: 'white',
    borderColor: '#DC9A9A',
  },
  akromaWhiteButton: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    color: 'white',
    borderColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
  },
  akromaButtonIcon: {
    height: 20,
  },
  grayTextAkromaButton: {
    color: '#676768',
    fontSize: 16,
    fontWeight: '400',
  },
  grayTextAkromaButtonSelected: {
    color: '#1C1C1E',
    fontSize: 16,
    fontWeight: '600',
  },
  grayTextAkromaButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
  },
  grayTextAkromaButtonContainerSelected: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    paddingLeft: 60,
    paddingRight: 10,
  },
  ml20: {
    marginLeft: 20,
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
  pt10: {
    paddingTop: 10,
  },
  pt50: {
    paddingTop: 50,
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
  mt50: {
    marginTop: 20,
  },
  p10: {
    padding: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1C1C1E',
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
    width: 22,
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
    paddingHorizontal: 20,
  },
  transferButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: '13%',
    width: 344,
  },
  textButton: {
    fontWeight: '700',
    fontSize: 16,
    paddingLeft: 10,
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
  smallTextWhite: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  textWhite: {
    color: '#FFFFFF',
  },
  menuOptionText: {
    fontFamily: 'SF Pro Text',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    color: '#1C1C1E',
  },
  mr5: {
    marginRight: 5,
  },
  mr10: {
    marginRight: 10,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
  },
  mb20: {
    marginBottom: 20,
  },
  mb25: {
    marginBottom: 25,
  },
  mb30: {
    marginBottom: 30,
  },
  textBold: {
    fontWeight: '700',
  },
  walletCard: {
    minHeight: 70,
    maxHeight: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    top: 10,
    left: 24,
  },
  alingItemsCenter: {
    alignItems: 'center',
  },
  pt8: {
    paddingTop: 8,
  },
  pv24: {
    paddingVertical: 24,
  },
  displayFlex: {
    display: 'flex',
  },
  alingItemsStart: {
    alignItems: 'flex-start',
  },
  greenColor: {
    color: '#0F8400',
  },
  textRight: {
    textAlign: 'right',
  },
  ph24: {
    paddingHorizontal: 24,
  },
  walletLogoNotice: {
    width: 175,
    height: 172,
    marginBottom: 20,
  },
  titleContainer: {
    marginBottom: 15,
  },
  noticeWhiteTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    fontFamily: 'SF Pro Display',
  },
  noticeWhiteTextContent: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: 'SF Pro Text',
    textAlign: 'justify',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  noticeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: 700,
    padding: 20,
  },
  fullWidth: {
    width: '100%',
  },
  continueButton: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'baseline',
    flexDirection: 'row',
    marginTop: 70,
  },
  mt100: {
    marginTop: 100,
  },
  themedPicker: {
    backgroundColor: 'rgb(237, 241, 247)',
    bordercolor: 'rgb(237, 241, 247)',
    borderWidth: 1,
    borderRadius: 4,
  },
  themedPickerContainer: {
    overflow: 'hidden',
    borderRadius: 8,
    width: '100%',
  },
  menuModal: {
    marginLeft: 0,
    marginBottom: 0,
  },
});

interface dynamicStylesProps {
  viewHeight?: number;
  viewWidth?: number;
}

const defaultValues = {
  viewHeight: 1,
  viewWidth: 1,
};

export const DymanicStyles = ({ viewHeight, viewWidth }: dynamicStylesProps = defaultValues) =>
  StyleSheet.create({
    walletsContainer: {
      display: 'flex',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      backgroundColor: '#fff',
      height: 'auto',
      minHeight: viewHeight * 0.61,
    },
    menuCard: {
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      width: viewWidth,
      position: 'absolute',
      left: 0,
      bottom: 0,
    },
  });
export default GlobalStyles;
