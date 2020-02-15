import { StyleSheet } from 'react-native';

export const headerStyles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0, 153, 237, 1)',
    zIndex: 100
  },
  headerTitle: {
    fontFamily: 'scdreamBold',
    fontSize: 17,
    color: '#fff'
  },
  gearIcon: {
    width: 25,
    height: 25
  }
});
