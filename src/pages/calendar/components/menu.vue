<template>
  <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </div>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          link
          @click.stop="$emit(item.emit)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
export default {
 data: () => ({
      items: [
        { title: 'Ação 1', emit: 'acao1' },
        { title: 'Ação 2' },
        { title: 'Ação 3' },
        { title: 'Ação 4' },
      ],
    }),
}
</script>

<style>

</style>