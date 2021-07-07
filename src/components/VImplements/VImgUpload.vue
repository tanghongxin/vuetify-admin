<template>
  <!-- auto-upload -->
  <!-- action="//jsonplaceholder.typicode.com/posts/" -->
  <VueImgInputer
    :class="flat ? 'elevation-0' : ''"
    ref="vueImgInputer"
    v-model="file"
    icon="img"
    accept="image/*"
    :img-src="imgSrc"
    :max-size="maxSize"
    :on-start="onUploadStart"
    :on-progress="onUploadSProgress"
    :on-success="onUploadSuccess"
    :on-error="onUploadError"
    :no-hover-effect="readonly"
    :placeholder="`${placeholder}（最大${maxMB}M）`"
    :readonly="readonly"
    readonly-tip-text=""
    :size="size"
    theme="material"
    @onExceed="overMaxSize"
    @onChange="fileChange"
  />
</template>

<script>
import 'vue-img-inputer/dist/index.css'
import VueImgInputer from 'vue-img-inputer'
import toast from '@/utils/toast'

export default {
  name:'VImgUpload',
  components: {
    VueImgInputer,
  },
  props: {
    flat: {
      type: Boolean,
      default: false,
    },
    imgSrc: {
      type: String,
      default: '',
    },
    maxSize: {
      type: Number,
      default: 1024,
    },
    placeholder: {
      type: String,
      default: '点击或拖拽上传图片',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'normal',
      validator: size => ['small', 'normal', 'large'].includes(size),
    },
  },
  data: () => ({
    file: null,
  }),
  computed: {
    maxMB () {
      return this.maxSize / 1024
    },
  },
  methods: {
    /**
     * 文件超出指定大小
     * fileChange 之前触发
     * @param {File} e
     * @event
     */
    overMaxSize (e) {
      toast.error({ message: `图片大小超出${this.maxMB}兆` })
      this.reset()
      throw e
    },
    /**
     * 选中文件
     * overMaxSize 之后触发
     * @param {File} e
     * @event
     */
    fileChange (e) {
      if (!/image/.test(e.type)) {
        toast.error({ message: '上传文件非图片' })
        this.reset()
        throw e
      }
    },
    onUploadStart () {},
    onUploadSProgress () {},
    onUploadSuccess () {},
    onUploadError () {},
    reset () {
      this.$refs['vueImgInputer'].reset()
      this.$refs['vueImgInputer'].$refs['inputer'].value = ''
    },
  },
}
</script>

<style lang="scss">
</style>
