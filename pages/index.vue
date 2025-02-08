<template>
  <UContainer>
    <UCard>
      <h2 class="text-lg font-bold">Bienvenido</h2>
      <p class="p-2">
        Esta aplicación te permite calcular el presupuesto de materiales necesarios para cubrir una superficie determinada.<br>
        Puede ser útil para proyectos de pintura, revestimiento, o cualquier otro que requiera cubrir una superficie con materiales de dimensiones específicas. <br>
        Si desea puede probar la aplicación sin iniciar sesión. <br>
        Pero si desea guardar sus cálculos, es necesario iniciar sesión con Google.
      </p>
    </UCard>
    <UCard>
      <NuxtLink to="/estimates" class="shadow-xl shadow-black z-10 w-64 m-3">
        <UButton
          icon="i-heroicons-calculator"
          label="Ir al Calculador"
          size="xl"
          color="blue"
        />
      </NuxtLink>
    </UCard>
    <UCard>
      <p class="p-2">
        No almacenamos información personal.
      </p>
      <UButton
        class="shadow-xl shadow-black z-10 w-64 m-3"
        to="/api/auth/google"
        icon="i-simple-icons-google"
        label="Continuar con Google"
        size="xl"
        external
        color="blue"
      />
    </UCard>
  </UContainer>
</template>
