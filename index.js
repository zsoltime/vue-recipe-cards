const stringToArray = string => string.split(',')
  .map(s => s.trim())
  .filter(s => s);

const RecipeStorage = {
  get: function() {
    const strRecipes = localStorage.getItem('zsVueRecipes');
    let recipes;

    try {
      recipes = JSON.parse(strRecipes);
    } catch (e) {
      console.error(e.message);
    }

    return Array.isArray(recipes) ? recipes : [];
  },
  set: function(newRecipes) {
    if (Array.isArray(newRecipes)) {
      localStorage.setItem('zsVueRecipes', JSON.stringify(newRecipes));
      return newRecipes;
    }
    return undefined;
  },
  wipe: function() {
    localStorage.removeItem('zsVueRecipes');
  },
};

const defaultRecipes = [{
    id: 1,
    name: 'Apple Pie',
    image: 'http://media.istockphoto.com/photos/homemade-organic-apple-pie-dessert-picture-id450752471?k=6&m=450752471&s=612x612&w=0&h=ye2J_VZk0e5K3gx4SbzQDMkBZOPOnRJVEX9U1aGI72M=',
    time: 50,
    calories: 420,
    ingredients: [
      'apple',
      'cinnamon',
      'flour',
      'milk',
      'egg',
      'sugar',
    ],
  }, {
    id: 2,
    name: 'Chocolate Muffin',
    image: 'http://media.istockphoto.com/photos/delicious-homemade-chocolate-muffins-picture-id497522904?k=6&m=497522904&s=612x612&w=0&h=c0lTSWxefqaDVZFlfs9XFSzQNxy7-ie5PVCF8Nbf4sI=',
    time: 45,
    calories: 330,
    ingredients: [
      'cocoa powder',
      'dark chocolate',
      'sugar',
      'flour',
      'baking soda',
      'milk',
      'egg',
      'vegetable oil',
    ],
  }, {
    id: 3,
    name: 'Panna Cotta',
    image: 'http://media.istockphoto.com/photos/pannacotta-with-pomegranate-jelly-picture-id465504682?k=6&m=465504682&s=612x612&w=0&h=iyK5EOI-Xmw5TPbaFEE3FHm0suc4D5usNxVg-91jE2I=',
    time: 12,
    calories: 210,
    ingredients: [
      'heavy cream',
      'sugar',
      'gelatine',
      'milk',
      'vanilla extract',
    ],
  }, {
    id: 4,
    name: 'Carrot Cake',
    image: 'http://media.istockphoto.com/photos/healthy-homemade-carrot-cake-picture-id466724142?k=6&m=466724142&s=612x612&w=0&h=KhYXqOoNNURwKyyCFk8NM0yf1HamK8IsPxsNtTXGlsE=',
    time: 75,
    calories: 420,
    ingredients: [
      'flour',
      'baking soda',
      'carrots',
      'cinnamon',
      'sugar',
      'milk',
      'vanilla extract',
    ],
  }, {
    id: 5,
    name: 'Lemon Muffin',
    image: 'http://media.istockphoto.com/photos/vegan-banana-carrot-muffins-picture-id492498175?k=6&m=492498175&s=612x612&w=0&h=iIHq15KxcUGjf-Azz0uQngR5Tf7OwmoFsG8gcsIqRCc=',
    time: 35,
    calories: 275,
    ingredients: [
      'flour',
      'baking soda',
      'egg',
      'lemon',
      'sugar',
      'vanilla extract',
    ],
  }, {
    id: 6,
    name: 'Classic Hamburger',
    image: 'http://media.istockphoto.com/photos/burger-and-french-fries-picture-id498612256?k=6&m=498612256&s=612x612&w=0&h=S8datmc_QxQFJf5kgGuWXetWvJde6IR4NxnaA4blN7s=',
    time: 25,
    calories: 300,
    ingredients: [
      'ground beef',
      'onion',
      'garlic',
      'mustard',
      'salt',
      'pepper',
    ],
  }, {
    id: 7,
    name: 'Baked Beans',
    image: 'http://media.istockphoto.com/photos/baked-beans-picture-id184942645?k=6&m=184942645&s=612x612&w=0&h=srIa1NuTg1STAuMNErjQw_vt3jtYwaGgD9pChtVzt0U=',
    time: 100,
    calories: 400,
    ingredients: [
      'white beans',
      'bacon',
      'onion',
      'cloves',
      'tomatoes',
      'sugar',
      'vinegar',
      'pepper',
      'salt',
    ],
  }, {
    id: 8,
    name: 'Fish and Chips',
    image: 'http://media.istockphoto.com/photos/homemade-fish-chips-and-sauce-picture-id179035570?k=6&m=179035570&s=612x612&w=0&h=SdjgCYcpSC8Z5C3HgXlimfkCK2kJbW8CKXcvVG4oNRU=',
    time: 55,
    calories: 820,
    ingredients: [
      'fish fillets',
      'flour',
      'baking powder',
      'beer',
      'salt',
      'pepper',
      'oil',
      'potatoes',
    ],
  }, {
    id: 9,
    name: 'Dutch Baby Pancake',
    image: 'http://media.istockphoto.com/photos/sweet-berry-skillet-dutch-baby-pancake-picture-id637916884?k=6&m=637916884&s=612x612&w=0&h=0yvY1tcc4eC9qH_zf0tloFiOhKyQ5CoW3KIAQVFSOgM=',
    time: 45,
    calories: 535,
    ingredients: [
      'flour',
      'butter',
      'eggs',
      'milk',
      'sugar',
      'salt',
      'lemon juice',
    ],
  }];

Vue.component('modal', {
  template: '#modal-template',
});

new Vue({
  el: '#app',
  data: {
    activeModal: null,
    activeRecipe: 3,
    calories: null,
    image: null,
    ingredients: null,
    name: null,
    recipes: [],
    showModal: false,
    time: null,
  },
  mounted: function() {
    const recipes = RecipeStorage.get();
    this.recipes = recipes.length ? recipes : defaultRecipes;
  },
  watch: {
    recipes: function(val) {
      RecipeStorage.set(val);
    },
  },
  methods: {
    deleteRecipe: function(id) {
      this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    },
    handleFormSubmit: function() {
      if (this.activeModal === 'add') {
        this.add();
      } else if (this.activeModal === 'edit') {
        this.edit();
      }
    },
    openAddRecipe: function() {
      this.showModal = true;
      this.activeModal = 'add';
    },
    add: function() {
      const recipe = {
        id: Math.random(),
        name: this.name,
        ingredients: stringToArray(this.ingredients),
        image: this.image,
        time: this.time,
        calories: this.calories,
      };
      this.recipes.push(recipe);
      this.resetForm();
      this.showModal = false;
    },
    openEditRecipe: function(id) {
      const recipe = this.recipes.find(recipe => recipe.id === id);

      this.showModal = true;
      this.activeModal = 'edit';
      this.activeRecipe = id;
      this.calories = recipe.calories;
      this.image = recipe.image;
      this.ingredients = recipe.ingredients.join(', ');
      this.name = recipe.name;
      this.time = recipe.time;
    },
    edit: function() {
      this.recipes = this.recipes.map((recipe) => {
        if (recipe.id === this.activeRecipe) {
          return {
            id: this.activeRecipe,
            name: this.name,
            ingredients: stringToArray(this.ingredients),
            image: this.image,
            time: this.time,
            calories: this.calories,
          };
        }
        return recipe;
      });
      this.resetForm();
      this.showModal = false;
    },
    resetForm: function() {
      this.name = null;
      this.ingredients = null;
      this.image = null;
      this.time = null;
      this.calories = null;
    },
  },
});
