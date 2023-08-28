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
		console.log("✅ Seeded plants successfully...");
	} catch (error) {
		console.error("❌ Error seeding plants:", error);
		throw error;
	}
}
  
export default seedPlants;
  
