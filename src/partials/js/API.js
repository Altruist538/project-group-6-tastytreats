export async function fetchRecipes(id) {
  try {
    const response = await fetch(`/api/recipes/${id}`);
    const recipe = await response.json();
    return recipe;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
}




