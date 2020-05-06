import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  ajBack: {
    backgroundColor: '#82BDD7'
  },
  pickerHome: {
    flexDirection: 'row',
  },
  listHome: {
    // flex: 1,
  },
  pickerMain: {
    width: 150,
  }
});

export default styles;
