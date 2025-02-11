<script setup lang="ts">
import { ref } from 'vue';
import { useEstimates } from '../composables/UseEstimates';
import { usePieceCalculator } from '../composables/UsePieceCalculator';

const { calculations, addCalculation, removeCalculation } = usePieceCalculator();
const pieceInput = ref({ name: '', width: 0, height: 0, pricePerSquareMeter: 0 });

const calculateNewPiece = () => {
  if (pieceInput.value.name && 
      pieceInput.value.width > 0 && 
      pieceInput.value.height > 0 && 
      pieceInput.value.pricePerSquareMeter > 0) {
    addCalculation(pieceInput.value);
    pieceInput.value = { name: '', width: 0, height: 0, pricePerSquareMeter: 0 };
  }
};

const { surface, materials, combinations, setSurfaceDimensions, addMaterial, calculateCombinations, clearMaterials } = useEstimates();

const materialInput = ref({ name: '', width: 0, height: 0, price: 0 });
const editingIndex = ref(null);

const addOrUpdateMaterial = () => {
  if (materialInput.value.name && materialInput.value.width > 0 && materialInput.value.height > 0) {
    if (editingIndex.value !== null) {
      materials.value[editingIndex.value] = { ...materialInput.value };
      editingIndex.value = null;
    } else {
      addMaterial(materialInput.value);
    }
    materialInput.value = { name: '', width: 0, height: 0, price: 0 };
    calculateCombinations();
  }
};

const editMaterial = (index) => {
  materialInput.value = { ...materials.value[index] };
  editingIndex.value = index;
};

const deleteMaterial = (index) => {
  materials.value.splice(index, 1);
  calculateCombinations();
};

const updateSurface = () => {
  setSurfaceDimensions(surface.width, surface.height);
  calculateCombinations();
};
</script>

<template>
  <UContainer>
    <h2 class="text-lg font-bold">Calculadora de Precio por Pieza</h2>
    
    <UCard class="mb-4">
      <div class="mb-4">
        <label>Cálculo de precio por pieza:</label>
        <div class="flex gap-2 mt-2">
          <input v-model="pieceInput.name" 
                 placeholder="Nombre" 
                 class="border p-2" 
                 type="text" />
          <input v-model.number="pieceInput.width" 
                 placeholder="Ancho (cm)" 
                 class="border p-2" 
                 type="number" />
          <input v-model.number="pieceInput.height" 
                 placeholder="Alto (cm)" 
                 class="border p-2" 
                 type="number" />
          <input v-model.number="pieceInput.pricePerSquareMeter" 
                 placeholder="$/m²" 
                 class="border p-2" 
                 type="number" />
          <button @click="calculateNewPiece" 
                  class="bg-green-500 text-white px-4 py-2">
            Calcular
          </button>
        </div>
      </div>

      <div v-if="calculations.length > 0">
        <h3 class="font-bold mb-2">Cálculos realizados:</h3>
        <ul class="space-y-2">
          <li v-for="(calc, index) in calculations" 
              :key="index"
              class="flex justify-between items-center bg-gray-500 p-2 rounded">
            <span>
              {{ calc.name }} ({{ calc.width }}x{{ calc.height }}cm) - 
              {{ calc.pricePerSquareMeter }}$/m² = 
              <strong>${{ calc.pricePerPiece?.toFixed(2) }}</strong>/pieza
            </span>
            <button @click="removeCalculation(index)" 
                    class="bg-red-500 text-white px-2 py-1 text-sm">
              Eliminar
            </button>
          </li>
        </ul>
      </div>
    </UCard>

    <h2 class="text-lg font-bold mt-8">Cálculo de Presupuesto</h2>

    <UCard class="mb-4">
      <label>Superficie a cubrir (cm):</label>
      <input v-model.number="surface.width" 
             placeholder="Ancho" 
             class="border p-2 mr-2" 
             type="number" 
             @change="updateSurface" />
      <input v-model.number="surface.height" 
             placeholder="Alto" 
             class="border p-2" 
             type="number" 
             @change="updateSurface" />
    </UCard>

    <UCard class="mb-4">
      <label>Material:</label>
      <input v-model="materialInput.name" 
             placeholder="Nombre" 
             class="border p-2 mr-2" 
             type="text" />
      <input v-model.number="materialInput.width" 
             placeholder="Ancho" 
             class="border p-2 mr-2" 
             type="number" />
      <input v-model.number="materialInput.height" 
             placeholder="Alto" 
             class="border p-2 mr-2" 
             type="number" />
      <input v-model.number="materialInput.price" 
             placeholder="Precio" 
             class="border p-2" 
             type="number" />
      <button @click="addOrUpdateMaterial" 
              class="bg-blue-500 text-white px-4 py-2 ml-2">
        {{ editingIndex !== null ? 'Actualizar' : 'Agregar' }}
      </button>
    </UCard>

    <h3 class="text-md font-bold">Materiales Añadidos</h3>
    <ul>
      <li v-for="(mat, index) in materials" 
          :key="index" 
          class="flex justify-between items-center mb-2">
        <span>{{ mat.name }} ({{ mat.width }}x{{ mat.height }}) - ${{ mat.price }}</span>
        <div>
          <button @click="editMaterial(index)" 
                  class="bg-yellow-500 text-white px-2 py-1 mr-2">
            Editar
          </button>
          <button @click="deleteMaterial(index)" 
                  class="bg-red-500 text-white px-2 py-1">
            Eliminar
          </button>
        </div>
      </li>
    </ul>

    <h3 class="text-md font-bold mt-4">Combinaciones Calculadas</h3>
    <UCard>
      <ul>
        <li v-for="(comb, index) in combinations" :key="index">
          {{ comb.material.name }} - {{ comb.quantity }} piezas - Total: ${{ comb.totalPrice }}
        </li>
      </ul>
    </UCard>
  </UContainer>
</template>

<style scoped>
input { max-width: 100px; }
</style>
