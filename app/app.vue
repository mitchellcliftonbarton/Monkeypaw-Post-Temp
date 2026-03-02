<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const initLazyImages = () => {
  // get all images that are not already loaded
  const allImages = document.querySelectorAll('img[loading="lazy"]:not(.loaded)')

  // if no images are found, return
  if (allImages.length === 0) {
    return
  }

  // loop through all images
  allImages.forEach((image) => {
    // check if image is already loaded, if not, add listener
    if (image.complete) {
      image.classList.add('loaded')
      return
    }

    image.addEventListener(
      'load',
      () => {
        image.classList.add('loaded')
      },
      { once: true },
    )
  })
}

// on mounted and on each route change
onMounted(() => {
  const router = useRouter()

  // initial run
  initLazyImages()

  // run after every navigation so new images are handled
  router.afterEach(() => {
    nextTick(() => {
      initLazyImages()
    })
  })
})
</script>
