import { ref, reactive } from 'vue'

type Material = {
  name: string;
  width: number; // en cm
  height: number; // en cm
  price: number; // precio unitario
};

type Surface = {
  width: number; // en cm
  height: number; // en cm
};

type Combination = {
  material: Material;
  quantity: number;
  totalPrice: number;
};

export function useEstimates() {
  const surface = reactive<Surface>({
    width: 0,
    height: 0
  })

  const materials = ref<Material[]>([])
  const combinations = ref<Combination[]>([])

  const setSurfaceDimensions = (width: number, height: number) => {
    surface.width = width
    surface.height = height
  }

  const addMaterial = (material: Material) => {
    materials.value.push(material)
  }

  const calculateCombinations = () => {
    combinations.value = materials.value.map(material => {
      const tilesPerRow = Math.ceil(surface.width / material.width)
      const tilesPerColumn = Math.ceil(surface.height / material.height)
      const quantity = tilesPerRow * tilesPerColumn
      const totalPrice = quantity * material.price
      
      return { material, quantity, totalPrice }
    })
  }

  const clearMaterials = () => {
    materials.value = []
    combinations.value = []
  }

  return {
    surface,
    materials,
    combinations,
    setSurfaceDimensions,
    addMaterial,
    calculateCombinations,
    clearMaterials
  }
}