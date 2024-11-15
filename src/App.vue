<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="errorMessage">{{ errorMessage }}</div>

    <div class="container">
        <h3 id="today" class="my-5">
          {{ `Menu: ${currentDayOfWeek} ${todayDate}, ${currentTime}` }}
        </h3>
        <div class="row g-3 mb-5">
            <div class="col-12 col-md-6">
                <div id="viva-menu" class="restaurant-box shadow p-4 rounded h-100">
                    <a
                        class="restaurant-link text-decoration-none"
                        href="https://www.pizzerie-viva.cz/"
                        target="_blank"
                    >
                        Viva Restaurant
                    </a>
                    <p
                        v-if="vivaMenu.menuItems"
                        class="mb-1 mt-1"
                    >
                        {{ `Polévka: ${vivaMenu.menuItems[0].name.replace('polévka ', '')}`}}
                        <i>(v ceně menu)</i>
                    </p>
                    <ul class="list-unstyled p-0 mt-2 mb-0">
                        <li
                            v-for="item in (vivaCorrectedMenu)"
                            :key="item.name"
                            class="mb-2"
                        >
                            {{ item.name }} - {{ item.price }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div id="selepka-menu" class="restaurant-box shadow p-4 rounded h-100">
                    <a
                        class="restaurant-link text-decoration-none"
                        href="https://www.selepova.cz/denni-menu/"
                        target="_blank"
                    >
                        Šelepka
                    </a>
                    <!-- <p class="mb-1 mt-1">
                        {{ todaySelepkaMenu.soup }}
                    </p> -->
                    <ul class="list-unstyled p-0 mt-2 mb-0">
                        <li
                            v-for="item in (selepkaCorrectedMenu)"
                            :key="item.name"
                            class="mb-2"
                        >
                            {{ item.name }} - {{ item.price }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div id="sono-menu" class="restaurant-box shadow p-4 rounded h-100">
                    <a
                        class="restaurant-link text-decoration-none"
                        href="https://www.pizzerie-viva.cz/"
                        target="_blank"
                    >
                        Sono - Flames Grill
                    </a>
                    <!-- <p
                        v-if="vivaMenu.menuItems"
                        class="mb-1 mt-1"
                    >
                        {{ `Polévka: ${vivaMenu.menuItems[0].name.replace('polévka ', '')}`}}
                        <i>(v ceně menu)</i>
                    </p> -->
                    <template v-if="sonoCorrectedMenu">
                        <ul class="list-unstyled p-0 mt-2 mb-0">
                            <li
                                v-for="item in (sonoCorrectedMenu)"
                                :key="item.name"
                                class="mb-2"
                            >
                                {{ item.name }} - {{ item.price }}
                            </li>
                        </ul>
                    </template>
                    <p else>
                        <i>Sono pro dnešek nemá k dispozici žádné menu.</i>
                    </p>

                </div>
            </div>

            <div class="col-12 col-md-6">
                <div id="kocka-menu" class="restaurant-box shadow p-4 rounded h-100">
                    <a
                        class="restaurant-link text-decoration-none"
                        href="https://www.menicka.cz/3185-zelen-koka.html"
                        target="_blank"
                    >
                        Zelená kočka
                    </a>
                    <!-- <p class="mb-1 mt-1">
                        {{ `Polévka: ${kockaMenu.menuItems[0].name.replace('Polévka: ', '')} `}}
                        <i>(v ceně menu)</i>
                    </p> -->
                    <ul class="list-unstyled p-0 mt-2 mb-0">
                        <li
                            v-for="item in (kockaCorrectedMenu)"
                            :key="item.name"
                            class="mb-2"
                        >
                            {{ item.name }} - {{ item.price }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div id="seven-menu" class="restaurant-box shadow p-4 rounded h-100">
                    <a
                        class="restaurant-link text-decoration-none"
                        href="https://www.menicka.cz/4838-seven-food.html"
                        target="_blank"
                    >
                        Seven Food
                    </a>
                    <!-- <p class="mb-1 mt-1">
                        {{ `Polévka: ${sevenMenu.menuItems[0].name.replace('Polévka: ', '')} `}}
                        <i>(v ceně menu)</i>
                    </p> -->
                    <ul class="list-unstyled p-0 mt-2 mb-0">
                        <li
                            v-for="item in (sevenCorrectedMenu)"
                            :key="item.name"
                            class="mb-2"
                        >
                            {{ item.name }} - {{ item.price }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div id="dvur-menu" class="restaurant-box shadow p-4 rounded h-100">
                    <a
                        class="restaurant-link text-decoration-none"
                        href="https://www.menicka.cz/2724-plzensky-dvur.html"
                        target="_blank"
                    >
                        Plzeňský Dvůr
                    </a>
                    <!-- <p class="mb-1 mt-1">
                        {{ `Polévka: ${kockaMenu.menuItems[0].name.replace('Polévka: ', '')} `}}
                        <i>(v ceně menu)</i>
                    </p> -->
                    <ul class="list-unstyled p-0 mt-2 mb-0">
                        <li
                            v-for="item in (dvurCorrectedMenu)"
                            :key="item.name"
                            class="mb-2"
                        >
                            {{ item.name }} - {{ item.price }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div id="uprimu-menu" class="restaurant-box shadow p-4 rounded h-100">
                    <a
                        class="restaurant-link text-decoration-none"
                        href="https://www.menicka.cz/2724-plzensky-dvur.html"
                        target="_blank"
                    >
                        U Primů
                    </a>
                    <!-- <p class="mb-1 mt-1">
                        {{ `Polévka: ${kockaMenu.menuItems[0].name.replace('Polévka: ', '')} `}}
                        <i>(v ceně menu)</i>
                    </p> -->
                    <ul class="list-unstyled p-0 mt-2 mb-0">
                        <li
                            v-for="item in (uPrimuCorrectedMenu)"
                            :key="item.name"
                            class="mb-2"
                        >
                            {{ item.name }} - {{ item.price }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div id="uprimu-menu" class="restaurant-box shadow p-4 rounded h-100">
                    <a
                        class="restaurant-link text-decoration-none"
                        href="https://korzar.com/obedove-menu"
                        target="_blank"
                    >
                        Korzár
                    </a>
                    <!-- <p class="mb-1 mt-1">
                        {{ `Polévka: ${kockaMenu.menuItems[0].name.replace('Polévka: ', '')} `}}
                        <i>(v ceně menu)</i>
                    </p> -->
                    <ul class="list-unstyled p-0 mt-2 mb-0">
                        <li
                            v-for="item in (korzarCorrectedMenu)"
                            :key="item.name"
                            class="mb-2"
                        >
                            {{ item.name }} - {{ item.price }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const date = new Date();
const daysOfWeek = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota']
const currentDayOfWeek = daysOfWeek[date.getDay()]
const todayDate = date.toLocaleDateString()
const currentTime = date.toLocaleTimeString()

// Define the reactive variable to store the menu data
const todayAllMenus = ref({})
const vivaMenu = ref({})
const selepkaMenu = ref({})
const sevenMenu = ref({})
const kockaMenu = ref({})
const dvurMenu = ref({})
const uPrimuMenu = ref({})
const korzarMenu = ref({})
const sonoMenu = ref({})

const isLoading = ref(false)
const errorMessage = ref('')

const todayIndex = daysOfWeek.indexOf(currentDayOfWeek) - 1
const todaySelepkaMenu = computed(() => selepkaMenu.value[todayIndex] || null)

onMounted(() => {
    fetchAndGenerateMenu()
    console.log('App mounted', todayAllMenus.value)
})

// Function to fetch and scrape menu data from your backend
async function fetchAndGenerateMenu() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('http://localhost:3000/api/menu')  // Your backend URL
    // console.log(response)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    todayAllMenus.value = data
    vivaMenu.value = data.vivaMenu[0]
    selepkaMenu.value = data.selepkaMenu
    sevenMenu.value = data.sevenMenu[0]
    kockaMenu.value = data.zelenaKockaMenu[0]
    dvurMenu.value = data.plzenskyDvurMenu[0]
      uPrimuMenu.value = data.uPrimuMenu[0]
    korzarMenu.value = data.korzarMenu[0]

  } catch (error) {
    errorMessage.value = `Failed to fetch menu data: ${error.message}`
  } finally {
    isLoading.value = false
  }
}

const vivaCorrectedMenu = computed(() => {
  return vivaMenu.value.menuItems
    ? vivaMenu.value.menuItems.slice(1).map(item => ({
        ...item,
        price: item.price.replace(',-', ' Kč') // replace ,- to Kč
      }))
    : []
})

const selepkaCorrectedMenu = computed(() => {
    return todaySelepkaMenu.value && todaySelepkaMenu.value.menuItems
        ? todaySelepkaMenu.value.menuItems.map(item => ({
            ...item,
            name: item.name.replace(/\([^)]*\)|\b\d+\b(?!\.| g)|[(),]/g, '')
        }))
        : []
})

const sevenCorrectedMenu = computed(() => {
    return sevenMenu.value.menuItems
        ? sevenMenu.value.menuItems.slice(1).map(item => ({
        ...item,
        name: item.name.replace(/\([^)]*\)|\b\d+\b(?!\.| g)|[(),]/g, '')
    })) : []

})

const kockaCorrectedMenu = computed(() => {
    return kockaMenu.value.menuItems
        ? kockaMenu.value.menuItems.slice(1).map(item => ({
        ...item,
        name: item.name.replace(/\([^)]*\)|\b\d+\b(?!\.| g)|[(),]/g, '')
    })) : []

})

const dvurCorrectedMenu = computed(() => {
    return dvurMenu.value.menuItems
        ? dvurMenu.value.menuItems.slice(1).map(item => ({
        ...item,
        name: item.name.replace(/\([^)]*\)|\b\d+\b(?!\.| g)|[(),]/g, '')
    })) : []

})

const uPrimuCorrectedMenu = computed(() => {
    return uPrimuMenu.value.menuItems
        ? uPrimuMenu.value.menuItems.slice(1).map(item => ({
        ...item,
        name: item.name.replace(/\([^)]*\)|\b\d+\b(?!\.| g)|[(),]/g, '')
    })) : []

})

const korzarCorrectedMenu = computed(() => {
    return korzarMenu.value.menuItems
        ? korzarMenu.value.menuItems.slice(1).map(item => ({
        ...item,
        name: item.name.replace(/\([^)]*\)|\b\d+\b(?!\.| g)|[(),]/g, '')
    })) : []

})

const sonoCorrectedMenu = computed(() => {
    return sonoMenu.value.menuItems
        ? sonoMenu.value.menuItems.slice(1).map(item => ({
        ...item,
        name: item.name.replace(/\([^)]*\)|\b\d+\b(?!\.| g)|[(),]/g, '')
    })) : []

})

</script>

<style>
body {
    background-color: #EAF4F4 !important;
}

#today {
    text-align: center;
}

.restaurant-box {
    background-color: #fff;
}

.restaurant-link {
    color: #33658A;
    font-size: 1.5em;
    transition: all 0.3s;

}

.restaurant-link:hover {
    color: #86BBD8;
    transition: all 0.3s;
}
</style>
