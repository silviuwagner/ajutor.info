import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  ajBack: {
    backgroundColor: '#AFCBD7'
  },
  pickerHome: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  listHome: {
    // flex: 1,
  },
  pickerMain: {
    width: 170,
  },
  judet: {
    backgroundColor: '#92DDCE',
    borderRadius: 15,
    padding: 5,
    marginRight: 5,
  },
  serviciu: {
    backgroundColor: '#FDEAA8',
    borderRadius: 15,
    padding: 5,
  },
  judSvr: {
    flexDirection: 'row',
    padding: 10,
  }
});

export default styles;
