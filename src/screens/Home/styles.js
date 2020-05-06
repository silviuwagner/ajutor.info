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
    // flex: 1,
    // flexDirection: 'row'
  },
  listHome: {
    // flex: 1,
  }
});

export default styles;
