<template>
  <q-table
    title="Lista utenti"
    :data="data"
    :columns="columns"
    :filter="filter"
    row-key="name"
    bordered
    separator="cell"
  >
  </q-table>
</template>

<script>
export default {
  name: 'LoadedRdo',
  data () {
    return {
      data: []
    }
  },
  methods: {
    getData () {
      if (this.data.length > 0) this.data = []
      this.userRdos.forEach((user) => {
        const obj = {
          user: user
        }
        this.data.push(obj)
      })
    },
    async loadRdos () {
      const { rdos } = await this.fetchUserRdos()
      this.userRdos = rdos
      this.getData()
      this.$q.loading.hide()
    }
  },
  mounted () {
    this.$q.loading.show()
    this.loadRdos()
  }
}
</script>

<style scoped>

</style>
