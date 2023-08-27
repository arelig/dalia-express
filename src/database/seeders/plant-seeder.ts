import { Plant } from '../../models/plant';
import plantsData from './plant-data';

async function seedPlants() {
    try {
        for (const plantData of plantsData) {
            await Plant.create({
              name: plantData.name,
              category: plantData.category,
              image: plantData.image,
            });
          }
  
      console.log('Plants seeded successfully');
    } catch (error) {
      console.error('Error seeding plants:', error);
    } finally {
      process.exit();
    }
  }
  
  export default seedPlants;
  
