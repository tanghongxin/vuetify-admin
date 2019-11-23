<template>
  <DateTable>
    <template v-slot:search>
      <v-layout
        wrap
      >
        <v-flex
          xs6
          sm4
          md2
        >
          <v-text-field
            placeholder="美疗师姓名"
            clearable
          />
        </v-flex>
        <v-flex
          xs6
          sm4
          md2
        >
          <v-text-field
            placeholder="美疗师手机号"
            clearable
          />
        </v-flex>
        <v-flex
          xs6
          sm4
          md2
        >
          <v-text-field
            placeholder="美疗师ID"
            clearable
          />
        </v-flex>
      </v-layout>
    </template>
  </DateTable>
</template>
<script>
import DateTable from '~~/table/DateTable'

export default {
  components: {
    DateTable,
  },
}
</script>

<style lang="scss">

</style>
