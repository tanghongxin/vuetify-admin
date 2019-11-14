<template>
  <v-dialog
    :value="true"
    content-class="VMDIconPicker"
    :max-width="1440"
  >
    <v-card
      flat
    >
      <v-card-title>图标选择</v-card-title>
      <v-divider />
      <v-card-text class="VMDIconPicker_content d-flex">
        <v-tabs
          center-active
          vertical
          v-model="tabIndex"
          :slider-size="3"
        >
          <v-tab
            v-for="(category, key) in collection"
            :key="key"
            @change="currentCategory = key"
          >
            {{ translate(key) }}
          </v-tab>
        </v-tabs>

        <v-divider vertical />

        <v-tabs-items
          vertical
          v-model="tabIndex"
        >
          <v-tab-item
            v-for="(category, key, index) in collection"
            :key="key"
            :value="index"
          >
            <!-- :transition="false"
              :reverse-transition="false" -->
            <v-container
              v-if="index === tabIndex"
              fluid
            >
              <v-row>
                <v-col
                  v-for="icon in collection[key]"
                  :key="icon"
                  cols="4"
                  sm="3"
                  md="2"
                  lg="1"
                  class="text-center"
                >
                  <v-btn
                    depressed
                    fab
                    icon
                    ripple
                  >
                    <v-icon
                      x-large 
                    >
                      {{ icon }}
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
        <v-divider vertical />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import collection from './materialDesignIcons'

export default {
  name:'VMDIconPicker',
  components: {},
  props: {},
  data: () => ({
    tabIndex: null,
    shaking: false,
  }),
  computed: {
    collection: {
      get : () => collection,
    },
  },
  methods: {
    translate (str) {
      switch (`${str}`) {
        case 'maps':
          return '地标'
        case 'action':
          return '行为'
        case 'av':
          return '音视频'
        case 'places':
          return '场所'
        case 'device':
          return '设备'
        case 'notification':
          return '通知'
        case 'content':
          return '内容'
        case 'image':
          return '图像'
        case 'alert':
          return '警告'
        case 'editor':
          return '编辑'
        case 'navigation':
          return '导航'
        case 'file':
          return '文件'
        case 'communication':
          return '通讯'
        case 'social':
          return '社交'
        case 'hardware':
          return '硬件'
        case 'toggle':
          return '切换'
        default:
          return str
      }
    },
  },
}
</script>

<style lang="scss">
.VMDIconPicker {

  .v-card__text {
    padding: 0 !important;
  }

  .v-tabs--vertical {
    width: auto;
  }

  .v-tabs-items {
    width: 100%;
    overflow-y: scroll;

    .v-window-item {
      height: 768px;
    }
  }

}
</style>
