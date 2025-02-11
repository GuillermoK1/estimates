import { ref } from 'vue'

interface PieceCalculation {
  name: string
  width: number  // en centímetros
  height: number // en centímetros
  pricePerSquareMeter: number
  pricePerPiece?: number
}

export function usePieceCalculator() {
  const calculations = ref<PieceCalculation[]>([])

  const calculatePricePerPiece = (piece: PieceCalculation) => {
    // Convertir cm² a m²
    const areaInSquareMeters = (piece.width * piece.height) / 10000
    return areaInSquareMeters * piece.pricePerSquareMeter
  }

  const addCalculation = (calculation: PieceCalculation) => {
    const pricePerPiece = calculatePricePerPiece(calculation)
    calculations.value.push({
      ...calculation,
      pricePerPiece
    })
  }

  const removeCalculation = (index: number) => {
    calculations.value.splice(index, 1)
  }

  return {
    calculations,
    addCalculation,
    removeCalculation
  }
}