<template>
  <div>
    <p class="p-2">
      · No almacenamos contraseñas. <br>
      · Por seguridad, es necesario iniciar sesión con Google para continuar. <br>
      · Iniciar sesión no implica registrarse. <br>
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
  </div>
</template>