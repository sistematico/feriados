<script setup>
import { ref, computed, onMounted } from 'vue'
import { carregaJson, transformaJson, transformaData, proximoFeriado, formatDate } from './js/feriados'

const titulo = ref('')
const data = ref('')

onMounted(async () => {
  titulo.value = 'Carregando'
  data.value = ''

  const response = await carregaJson();
  
  if (response) {
    const jsonConv = transformaJson(response);
    const dataConv = await transformaData(jsonConv);
    const proxFeriado = await proximoFeriado(dataConv);
    titulo.value = proxFeriado[0].nome
    // data.value = proxFeriado[0].data
    data.value = formatDate(proxFeriado[0].data, 'pt-BR')
  }
})
</script>
<template>
  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <header class="mb-auto">
      <div>
        <h3 class="float-md-start mb-0 text-center">Feriados</h3>
        <nav class="nav nav-masthead justify-content-center float-md-end">
          <a class="nav-link active">Sobre</a>
        </nav>
      </div>
    </header>
    <main class="px-3">
      <h1>{{ titulo }}</h1>
      <p class="lead">{{ data }}</p>
    </main>
    <footer class="mt-auto text-white-50">
      <p>Projeto criado por <a href="https://lucasbrum.net/" class="text-white" target="_blank">Lucas Saliés Brum</a>, fontes no <a href="https://github.com/sistematico/feriados" class="text-white" target="_blank">Github</a>.</p>
    </footer>
  </div>
</template>